const Razorpay = require('razorpay');
const crypto = require('crypto');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require('../config');
const { supabase } = require('../supabaseClient');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

// Create payment order
const createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', order_id, receipt } = req.body;
    const user_id = req.user.id;

    // Validate required fields
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: 'Amount is required'
      });
    }

    // Validate amount (should be positive and in paise for INR)
    const amountInPaise = Math.round(parseFloat(amount) * 100);
    if (amountInPaise <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    // Create Razorpay order options
    const options = {
      amount: amountInPaise, // Amount in paise
      currency: currency.toUpperCase(),
      receipt: receipt || `order_${Date.now()}`,
      notes: {
        user_id: user_id,
        order_id: order_id || null,
        created_at: new Date().toISOString()
      }
    };

    // Create order with Razorpay
    const razorpayOrder = await razorpay.orders.create(options);

    // Store payment order in database
    const paymentData = {
      user_id,
      razorpay_order_id: razorpayOrder.id,
      order_id: order_id || null,
      amount: parseFloat(amount),
      currency: currency.toUpperCase(),
      status: 'created',
      receipt: options.receipt,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: payment, error: dbError } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (dbError) {
      console.error('Database error while storing payment:', dbError);
      // Continue even if DB storage fails, as Razorpay order is created
    }

    // Return success response with Razorpay order details
    res.status(200).json({
      success: true,
      message: 'Payment order created successfully',
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        amount_paid: razorpayOrder.amount_paid,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
        status: razorpayOrder.status,
        created_at: razorpayOrder.created_at
      },
      key_id: RAZORPAY_KEY_ID // Send key_id for frontend integration
    });

  } catch (error) {
    console.error('Create payment order error:', error);
    
    // Handle specific Razorpay errors
    if (error.error && error.error.code) {
      return res.status(400).json({
        success: false,
        message: error.error.description || 'Razorpay error occurred',
        error_code: error.error.code
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
};

// Verify payment signature
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id
    } = req.body;

    const user_id = req.user.id;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification parameters'
      });
    }

    // Create signature verification string
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    
    // Generate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    // Verify signature
    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      // Update payment status to failed
      await supabase
        .from('payments')
        .update({
          status: 'failed',
          failure_reason: 'Invalid signature',
          updated_at: new Date().toISOString()
        })
        .eq('razorpay_order_id', razorpay_order_id)
        .eq('user_id', user_id);

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature'
      });
    }

    // Fetch payment details from Razorpay to get additional information
    let paymentDetails = null;
    try {
      paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    } catch (fetchError) {
      console.error('Error fetching payment details:', fetchError);
    }

    // Update payment status in database
    const updateData = {
      razorpay_payment_id,
      razorpay_signature,
      status: 'completed',
      payment_method: paymentDetails?.method || null,
      bank: paymentDetails?.bank || null,
      wallet: paymentDetails?.wallet || null,
      vpa: paymentDetails?.vpa || null,
      verified_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: updatedPayment, error: updateError } = await supabase
      .from('payments')
      .update(updateData)
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('user_id', user_id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating payment status:', updateError);
      return res.status(500).json({
        success: false,
        message: 'Payment verified but failed to update database'
      });
    }

    // If order_id is provided, update the print order status to 'paid'
    if (order_id) {
      const { error: orderUpdateError } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          payment_id: updatedPayment.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', order_id)
        .eq('user_id', user_id);

      if (orderUpdateError) {
        console.error('Error updating order status:', orderUpdateError);
        // Continue even if order update fails
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment: {
        id: updatedPayment.id,
        razorpay_order_id: updatedPayment.razorpay_order_id,
        razorpay_payment_id: updatedPayment.razorpay_payment_id,
        amount: updatedPayment.amount,
        currency: updatedPayment.currency,
        status: updatedPayment.status,
        payment_method: updateData.payment_method,
        verified_at: updateData.verified_at
      }
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while verifying payment'
    });
  }
};

// Get payment history for user
const getPaymentHistory = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { page = 1, limit = 20, status } = req.query;

    // Build query
    let query = supabase
      .from('payments')
      .select(`
        *,
        orders(id, file_name, status)
      `)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    // Filter by status if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: payments, error } = await query;

    if (error) {
      console.error('Get payment history error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch payment history'
      });
    }

    // Calculate summary
    const completedPayments = payments.filter(p => p.status === 'completed');
    const totalSpent = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);

    res.status(200).json({
      success: true,
      message: 'Payment history retrieved successfully',
      payments,
      summary: {
        total_payments: payments.length,
        completed_payments: completedPayments.length,
        total_spent: totalSpent,
        currency: payments[0]?.currency || 'INR'
      },
      pagination: {
        current_page: parseInt(page),
        per_page: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching payment history'
    });
  }
};

// Get payment by ID
const getPaymentStatus = async (req, res) => {
  try {
    const { payment_id } = req.params;
    const user_id = req.user.id;

    if (!payment_id) {
      return res.status(400).json({
        success: false,
        message: 'Payment ID is required'
      });
    }

    const { data: payment, error } = await supabase
      .from('payments')
      .select(`
        *,
        orders(id, file_name, status, created_at)
      `)
      .eq('id', payment_id)
      .eq('user_id', user_id)
      .single();

    if (error) {
      console.error('Get payment by ID error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch payment details'
      });
    }

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment details retrieved successfully',
      payment
    });

  } catch (error) {
    console.error('Get payment by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching payment details'
    });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getPaymentStatus
};
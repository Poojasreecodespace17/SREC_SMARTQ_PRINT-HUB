const supabase = require('../supabaseClient');

const createOrder = async (req, res) => {
  // We get the location from the printOptions in the body
  const { specs } = req.body; 
  const location = specs.location; // Extract location from specs
  const file = req.file;
  // const { userId } = req.user; // Assuming JWT middleware adds user info

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Create a unique file name
  const fileName = `${Date.now()}-${file.originalname}`;

  // Upload file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('uploads')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (uploadError) {
    return res.status(500).json({ error: 'Failed to upload file.', details: uploadError });
  }

  // Get public URL of the uploaded file
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(fileName);
  
  const file_url = urlData.publicUrl;
  
  // Save order details to the database, now including the location
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([
      { 
        user_id: 1, // Placeholder: replace with real user_id from JWT
        file_url: file_url,
        specs: specs,
        location: location, // Save the selected location
        status: 'in_queue'
      }
    ])
    .select();

  if (orderError) {
    return res.status(500).json({ error: 'Failed to create order.', details: orderError });
  }

  res.status(201).json({ message: 'Order created successfully!', order: orderData });
};

const getOrdersByLocation = async (req, res) => {
  // The location is passed as a query parameter in the URL
  // e.g., /api/orders?location=library
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location query parameter is required.' });
  }

  // Fetch orders that are in the queue and match the location
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('location', location)
    .eq('status', 'in_queue')
    .order('created_at', { ascending: true });

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch orders.', details: error });
  }

  res.status(200).json(data);
};

// Keep other placeholder functions if you need them
const updateOrderStatus = async (req, res) => { /* ... */ };
const getOrderHistory = async (req, res) => { /* ... */ };


module.exports = {
  createOrder,
  getOrdersByLocation,
  updateOrderStatus,
  getOrderHistory
};
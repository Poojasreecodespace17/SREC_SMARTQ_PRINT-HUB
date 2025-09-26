const express = require('express');
const { 
  createPaymentOrder, 
  verifyPayment, 
  getPaymentHistory,
  getPaymentStatus 
} = require('../controllers/paymentController');
const { verifyToken } = require('../controllers/authController');

// Create Express router
const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// POST /create - Create new payment order
router.post('/create', createPaymentOrder);

// POST /verify - Verify payment signature
router.post('/verify', verifyPayment);

// GET /history - Get user's payment history (bonus route)
router.get('/history', getPaymentHistory);

// GET /status/:payment_id - Get payment status by ID (bonus route)
router.get('/status/:payment_id', getPaymentStatus);

// GET / - Get payment history (alternative endpoint)
router.get('/', getPaymentHistory);

module.exports = router;
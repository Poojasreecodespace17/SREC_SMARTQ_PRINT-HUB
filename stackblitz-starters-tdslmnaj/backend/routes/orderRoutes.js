const express = require('express');
const router = express.Router();
const multer = require('multer');
const orderController = require('../controllers/orderController');

// Set up multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Apply the 'upload' middleware only to the 'create' route
router.post('/create', upload.single('file'), orderController.createOrder);

router.get('/', orderController.getOrdersByLocation);
router.put('/:id', orderController.updateOrderStatus);
router.get('/history', orderController.getOrderHistory);

module.exports = router;
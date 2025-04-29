const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require('../controllers/OrdersController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route to create a new order (protected)
router.post('/orders', authenticateUser, createOrder);

// Route to get all orders (protected)
router.get('/orders', authenticateUser, getAllOrders);

// Route to get a single order by ID (protected)
router.get('/orders/:id', authenticateUser, getOrderById);

// Route to update an order by ID (protected)
router.put('/orders/:id', authenticateUser, updateOrder);

// Route to delete an order by ID (protected)
router.delete('/orders/:id', authenticateUser, deleteOrder);

module.exports = router;
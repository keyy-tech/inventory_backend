const express = require('express');
const router = express.Router();
const {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} = require('../controllers/PaymentController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route to create a new payment (protected)
router.post('/payments', authenticateUser, createPayment);

// Route to get all payments (protected)
router.get('/payments', authenticateUser, getAllPayments);

// Route to get a single payment by ID (protected)
router.get('/payments/:id', authenticateUser, getPaymentById);

// Route to update a payment by ID (protected)
router.put('/payments/:id', authenticateUser, updatePayment);

// Route to delete a payment by ID (protected)
router.delete('/payments/:id', authenticateUser, deletePayment);

module.exports = router;
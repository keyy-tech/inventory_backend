const express = require('express');
const router = express.Router();
const {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/Inventory_TransactionController');
const authenticateUser = require('../middleware/authMiddleware');

// Route to create a new inventory transaction (protected)
router.post('/inventory-transactions', authenticateUser, createTransaction);

// Route to get all inventory transactions (protected)
router.get('/inventory-transactions', authenticateUser, getAllTransactions);

// Route to get a single inventory transaction by ID (protected)
router.get('/inventory-transactions/:id', authenticateUser, getTransactionById);

// Route to update an inventory transaction by ID (protected)
router.put('/inventory-transactions/:id', authenticateUser, updateTransaction);

// Route to delete an inventory transaction by ID (protected)
router.delete('/inventory-transactions/:id', authenticateUser, deleteTransaction);

module.exports = router;
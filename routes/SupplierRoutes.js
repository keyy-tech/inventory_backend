const express = require('express');
const router = express.Router();
const {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require('../controllers/SupplierController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route to create a new supplier (protected)
router.post('/suppliers', authenticateUser, createSupplier);

// Route to get all suppliers (protected)
router.get('/suppliers', authenticateUser, getAllSuppliers);

// Route to get a supplier by ID (protected)
router.get('/suppliers/:id', authenticateUser, getSupplierById);

// Route to update a supplier (protected)
router.put('/suppliers/:id', authenticateUser, updateSupplier);

// Route to delete a supplier (protected)
router.delete('/suppliers/:id', authenticateUser, deleteSupplier);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/InvoiceController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route to create a new invoice (protected)
router.post('/invoices', authenticateUser, createInvoice);

// Route to get all invoices (protected)
router.get('/invoices', authenticateUser, getAllInvoices);

// Route to get a single invoice by ID (protected)
router.get('/invoices/:id', authenticateUser, getInvoiceById);

// Route to update an invoice by ID (protected)
router.put('/invoices/:id', authenticateUser, updateInvoice);

// Route to delete an invoice by ID (protected)
router.delete('/invoices/:id', authenticateUser, deleteInvoice);

module.exports = router;
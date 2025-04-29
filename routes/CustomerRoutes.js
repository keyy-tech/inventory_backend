const express = require('express');
const router = express.Router();
const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    bulkWriteCustomers,
} = require('../controllers/CustomersController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route to create a new customer (protected)
router.post('/customers', authenticateUser, createCustomer);

// Route to get all customers (protected)
router.get('/customers', authenticateUser, getAllCustomers);

// Route to get a single customer by ID (protected)
router.get('/customers/:id', authenticateUser, getCustomerById);

// Route to update a customer by ID (protected)
router.put('/customers/:id', authenticateUser, updateCustomer);

// Route to delete a customer by ID (protected)
router.delete('/customers/:id', authenticateUser, deleteCustomer);

// Route to perform bulk write operations on customers (protected)
router.post('/customers/bulk', authenticateUser, bulkWriteCustomers);

module.exports = router;
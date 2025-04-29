const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

const router = express.Router();

// Product CRUD routes (protected)
router.post('/products', authenticateUser, createProduct);       // Create a new product
router.get('/products', authenticateUser, getAllProducts);        // Get all products
router.get('/products/:id', authenticateUser, getProductById);    // Get single product
router.put('/products/:id', authenticateUser, updateProduct);     // Update a product
router.delete('/products/:id', authenticateUser, deleteProduct);  // Delete a product

module.exports = router;
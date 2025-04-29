const express = require('express');
const router = express.Router();
const {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder
} = require('../controllers/PurchaseOrderController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route to create a new purchase order (protected)
router.post('/purchase-orders', authenticateUser, createPurchaseOrder);

// Route to get all purchase orders (protected)
router.get('/purchase-orders', authenticateUser, getAllPurchaseOrders);

// Route to get a single purchase order by ID (protected)
router.get('/purchase-orders/:id', authenticateUser, getPurchaseOrderById);

// Route to update a purchase order by ID (protected)
router.put('/purchase-orders/:id', authenticateUser, updatePurchaseOrder);

// Route to delete a purchase order by ID (protected)
router.delete('/purchase-orders/:id', authenticateUser, deletePurchaseOrder);

module.exports = router;
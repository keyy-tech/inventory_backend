const mongoose = require('mongoose');
const withAuditHooks = require('../utils/AuditHooks');

// Define the inventory transaction schema
const InventoryTransactionSchema = new mongoose.Schema(
    {
        transaction_date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        transaction_type: {
            type: String,
            enum: ['Purchase', 'Sale', 'Return', 'Adjustment'],
            required: true,
        },
        reason: {
            type: String,
        },
        related_order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false,
    }
);

// Apply audit hooks to the inventory transaction schema
withAuditHooks(InventoryTransactionSchema, 'InventoryTransaction');

// Create the inventory transaction model
const InventoryTransaction = mongoose.model('InventoryTransaction', InventoryTransactionSchema);

// Export the inventory transaction model
module.exports = InventoryTransaction;
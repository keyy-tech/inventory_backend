const mongoose = require('mongoose');

// Define the purchase order schema
const PurchaseOrderSchema = new mongoose.Schema(
    {
        supplier_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
            required: true,
        },
        order_date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        delivery_date: {
            type: Date,
        },
        total_price: {
            type: Number,
            required: true,
        },
        products: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false,
    }
);

// Create the purchase order model
const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);

// Export the purchase order model
module.exports = PurchaseOrder;
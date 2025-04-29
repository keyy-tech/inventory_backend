// Connecting to MongoDB
const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            unique: true,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity_in_stock: {
            type: Number,
            required: true,
        },
        reorder_level: {
            type: Number,
            default: 0,
        },
        supplier_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
        },
        status: {
            type: String,
            enum: ['Active', 'Discontinued'],
            default: 'Active',
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false,
    }
);

// Create the product model
const Product = mongoose.model('Product', productSchema);

// Export the product model
module.exports = Product;
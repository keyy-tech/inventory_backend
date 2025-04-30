// Connecting to MongoDB
const mongoose = require('mongoose');
const withAuditHooks = require('../utils/AuditHooks');

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

// Create indexes to optimize search and filter queries
productSchema.index({name: 1}); // Index for product name
productSchema.index({category: 1}); // Index for category
productSchema.index({sku: 1}); // Index for SKU (unique field)
productSchema.index({supplier_id: 1}); // Index for supplier_id
productSchema.index({price: 1}); // Index for price (if you filter or sort by price)
productSchema.index({status: 1}); // Index for product status (Active/Discontinued)

// Optional: Create a text index for full-text search on name and description
productSchema.index({name: 'text', description: 'text'});

// Add the audit hooks to the product schema
withAuditHooks(productSchema, 'Product');

// Create the product model
const Product = mongoose.model('Product', productSchema);

// Export the product model
module.exports = Product;
// Connecting the MongoDB
const mongoose = require('mongoose');
const withAuditHooks = require('../utils/AuditHooks');

// Define the supplier schema
const supplierSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contact_info: {
            phone: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
        payment_terms: {
            type: String,
            required: true,
        },
        delivery_terms: {
            type: String,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false,
    }
);

// Add audit hooks to the supplier schema
withAuditHooks(supplierSchema, 'Supplier');

// Create the supplier model
const Supplier = mongoose.model('Supplier', supplierSchema);

// Export the supplier model
module.exports = Supplier;
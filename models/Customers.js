// Connecting to MongoDB
const mongoose = require('mongoose');

// Define the customer schema
const customerSchema = new mongoose.Schema(
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
        order_history: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false,
    }
);

// Create the customer model
const Customer = mongoose.model('Customer', customerSchema);

// Export the customer model
module.exports = Customer;
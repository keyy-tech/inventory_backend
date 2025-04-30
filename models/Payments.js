const mongoose = require('mongoose');
const withAuditHooks = require('../utils/AuditHooks');

// Define the payment schema
const PaymentSchema = new mongoose.Schema(
    {
        payment_date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        payment_amount: {
            type: Number,
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
            enum: ['Credit Card', 'Bank Transfer', 'Cash', 'Other'], // Example methods
        },
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        status: {
            type: String,
            required: true,
            enum: ['Paid', 'Pending', 'Failed'],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false,
    }
);

// Apply audit hooks to the payment schema
withAuditHooks(PaymentSchema, 'Payment');

// Create the payment model
const Payment = mongoose.model('Payment', PaymentSchema);

// Export the payment model
module.exports = Payment;
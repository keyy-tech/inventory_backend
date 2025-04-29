const mongoose = require('mongoose');

// Define the order schema
const OrderSchema = new mongoose.Schema(
    {
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        order_date: {
            type: Date,
            default: Date.now,
        },
        shipping_date: {
            type: Date,
        },
        total_price: {
            type: Number,
            required: true,
        },
        order_status: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered'],
            default: 'Pending',
        },
        payment_status: {
            type: String,
            enum: ['Paid', 'Unpaid', 'Partially Paid'],
            default: 'Unpaid',
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

// Create the order model
const Order = mongoose.model('Order', OrderSchema);

// Export the order model
module.exports = Order;
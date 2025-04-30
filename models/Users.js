// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['Admin', 'Staff'], // Allowed roles
            default: 'Staff',
        },
        isActive: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        versionKey: false, // Disables the __v field
    }
);

// Export the User model
module.exports = mongoose.model('User', userSchema);
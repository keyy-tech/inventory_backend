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
            enum: ['Admin', 'Staff'],
            default: 'Staff'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: false // Make optional
        },
        phone: {
            type: String,
            required: false // Make optional
        },
        address: {
            type: String,
            required: false // Make optional
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('User', userSchema);
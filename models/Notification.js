// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'recipientType', // Dynamic reference based on recipientType
            required: true
        },
        recipientType: {
            type: String,
            enum: ['User', 'Customer', 'Supplier'], // Specify the possible recipient types
            required: true
        },
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['Info', 'Warning', 'Error', 'Success'],
            default: 'Info'
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Notification', notificationSchema);
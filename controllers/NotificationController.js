// controllers/NotificationController.js
const Notification = require('../models/Notification');

class NotificationController {
    // Create a new notification
    static async createNotification(req, res) {
        try {
            const {recipient, recipientType, message, type} = req.body;

            const newNotification = new Notification({
                recipient,
                recipientType,
                message,
                type
            });

            await newNotification.save();
            res.status(201).json({message: 'Notification created successfully', notification: newNotification});
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }

    // Get all notifications for a specific recipient
    static async getNotifications(req, res) {
        try {
            const {recipientId, recipientType} = req.params;
            const notifications = await Notification.find({
                recipient: recipientId,
                recipientType
            }).sort({createdAt: -1});
            res.status(200).json(notifications);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    // Mark a notification as read
    static async markAsRead(req, res) {
        try {
            const {id} = req.params;
            const updatedNotification = await Notification.findByIdAndUpdate(id, {isRead: true}, {new: true});
            if (!updatedNotification) {
                return res.status(404).json({message: 'Notification not found'});
            }
            res.status(200).json({message: 'Notification marked as read', notification: updatedNotification});
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }

    // Delete a notification
    static async deleteNotification(req, res) {
        try {
            const {id} = req.params;
            const deletedNotification = await Notification.findByIdAndDelete(id);
            if (!deletedNotification) {
                return res.status(404).json({message: 'Notification not found'});
            }
            res.status(200).json({message: 'Notification deleted successfully'});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = NotificationController;
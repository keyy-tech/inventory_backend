// routes/NotificationRoutes.js
const express = require('express');
const router = express.Router();
const {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification
} = require('../controllers/NotificationController');
const authenticateUser = require('../middleware/authMiddleware'); // Import the authentication middleware

// Route to create a new notification (protected)
router.post('/notifications', authenticateUser, createNotification);

// Route to get all notifications for a specific recipient (protected)
router.get('/notifications/:recipientId/:recipientType', authenticateUser, getNotifications);

// Route to mark a notification as read (protected)
router.put('/notifications/:id/read', authenticateUser, markAsRead);

// Route to delete a notification (protected)
router.delete('/notifications/:id', authenticateUser, deleteNotification);

module.exports = router;
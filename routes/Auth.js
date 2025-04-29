const express = require('express');
const {
    registerUser,
    loginUser,
    updateUser,
    listAllUsers,
    deleteUser,
    viewProfile
} = require('../controllers/UsersController');
const authenticateUser = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/users', authenticateUser, listAllUsers); // Admin only
router.put('/users/:id', authenticateUser, updateUser); // Admin/Staff
router.delete('/users/:id', authenticateUser, deleteUser); // Admin only
router.get('/profile', authenticateUser, viewProfile); // Staff

module.exports = router;
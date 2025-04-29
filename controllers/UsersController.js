const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

        // Create the new user with the hashed password
        const user = new User({username, email, password: hashedPassword, role});

        // Save the user to the database
        await user.save();

        res.status(201).json({message: 'User registered successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: 'User not found'});

        // Compare the entered password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credentials'});

        // Generate JWT token
        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, {new: true, runValidators: true});
        if (!updatedUser) return res.status(404).json({message: 'User not found'});

        res.json({message: 'User updated successfully', updatedUser});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// List all users (Admin only)
exports.listAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({message: 'Access denied'});
        }

        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Delete a user (Admin only)
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({message: 'Access denied'});
        }

        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({message: 'User not found'});

        res.json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Staff-specific feature: View own profile
exports.viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({message: 'User not found'});

        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

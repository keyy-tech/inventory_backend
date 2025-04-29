const express = require('express');
const AuditLog = require('../models/AuditLog');

const router = express.Router();

// Get all audit logs
router.get('/audit-logs', async (req, res) => {
    try {
        const logs = await AuditLog.find().populate('user', 'name email'); // Populate user details
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get a specific audit log by ID
router.get('/audit-logs/:id', async (req, res) => {
    try {
        const log = await AuditLog.findById(req.params.id).populate('user', 'name email');
        if (!log) {
            return res.status(404).json({message: 'Audit log not found.'});
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
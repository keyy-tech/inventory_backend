const AuditLog = require('../models/AuditLog');

// Generic function to log an action
const logAction = async (action, userId, details = {}) => {
    try {
        const log = new AuditLog({
            action,
            user: userId,
            details,
        });
        await log.save();
    } catch (error) {
        console.error('Error logging action:', error.message);
    }
};

// Log a create action
const logCreate = async (userId, details) => {
    await logAction('CREATE', userId, details);
};

// Log an update action
const logUpdate = async (userId, details) => {
    await logAction('UPDATE', userId, details);
};

// Log a delete action
const logDelete = async (userId, details) => {
    await logAction('DELETE', userId, details);
};

module.exports = {
    logCreate,
    logUpdate,
    logDelete,
};
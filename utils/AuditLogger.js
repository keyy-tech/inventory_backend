const AuditLog = require('../models/AuditLog');

async function logAudit({action, user, doc, model}) {
    try {
        await AuditLog.create({
            action,
            user,
            details: {
                model,
                documentId: doc._id,
                data: doc.toObject(),
            },
        });
    } catch (err) {
        console.error('Failed to write audit log:', err);
    }
}

module.exports = logAudit;
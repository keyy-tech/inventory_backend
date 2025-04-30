const logAudit = require('./auditLogger');

/**
 * Attaches create, update, and delete audit hooks to a Mongoose schema.
 * @param {mongoose.Schema} schema - The schema to attach hooks to.
 * @param {string} modelName - The name of the model (used in audit logs).
 * @returns {mongoose.Schema} The same schema with hooks attached.
 */
function withAuditHooks(schema, modelName) {
    // CREATE or UPDATE
    schema.post('save', async function (doc) {
        const action = doc.isNew ? 'create' : 'update';
        const user = doc.user || this.options?._user;
        if (user) {
            try {
                await logAudit({
                    action,
                    user,
                    doc,
                    model: modelName,
                });
            } catch (err) {
                console.error('Failed to log audit for save:', err);
            }
        }
    });

    // DELETE
    schema.post('findOneAndDelete', async function (doc) {
        const user = doc?.user || this.options?._user;
        if (doc && user) {
            try {
                await logAudit({
                    action: 'delete',
                    user,
                    doc,
                    model: modelName,
                });
            } catch (err) {
                console.error('Failed to log audit for delete:', err);
            }
        }
    });

    return schema;
}

module.exports = withAuditHooks;
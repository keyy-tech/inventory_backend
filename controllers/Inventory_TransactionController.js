const InventoryTransaction = require('../models/Inventory_Transaction');

// Create a new inventory transaction
const createTransaction = async (req, res) => {
    try {
        const {transaction_date, product_id, quantity, transaction_type, reason, related_order_id} = req.body;
        if (!product_id || !quantity || !transaction_type) {
            return res.status(400).json({message: 'Required fields are missing.'});
        }
        const transaction = new InventoryTransaction({
            transaction_date,
            product_id,
            quantity,
            transaction_type,
            reason,
            related_order_id,
        });
        await transaction.save();
        res.status(201).json({message: 'Transaction created successfully!', transaction});
    } catch (error) {
        res.status(500).json({message: `Error creating transaction: ${error.message}`});
    }
};

// Get all inventory transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await InventoryTransaction.find()
            .populate('product_id', 'name')
            .populate('related_order_id', 'order_date total_price');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({message: `Error fetching transactions: ${error.message}`});
    }
};

// Get a single inventory transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const transaction = await InventoryTransaction.findById(req.params.id)
            .populate('product_id', 'name')
            .populate('related_order_id', 'order_date total_price');
        if (!transaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({message: `Error fetching transaction: ${error.message}`});
    }
};

// Update an inventory transaction
const updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await InventoryTransaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if (!updatedTransaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }
        res.status(200).json({message: 'Transaction updated successfully', updatedTransaction});
    } catch (error) {
        res.status(500).json({message: `Error updating transaction: ${error.message}`});
    }
};

// Delete an inventory transaction
const deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await InventoryTransaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }
        res.status(200).json({message: 'Transaction deleted successfully'});
    } catch (error) {
        res.status(500).json({message: `Error deleting transaction: ${error.message}`});
    }
};


module.exports = {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
};
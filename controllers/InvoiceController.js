// controllers/InvoiceController.js
const Invoice = require('../models/Invoice');

class InvoiceController {
    // Create a new invoice
    static async createInvoice(req, res) {
        try {
            const {invoiceNumber, customer, items, totalAmount, dueDate} = req.body;

            const newInvoice = new Invoice({
                invoiceNumber,
                customer,
                items,
                totalAmount,
                dueDate
            });

            await newInvoice.save();
            res.status(201).json({message: 'Invoice created successfully', invoice: newInvoice});
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }

    // Get all invoices
    static async getAllInvoices(req, res) {
        try {
            const invoices = await Invoice.find().populate('customer').populate('items.product');
            res.status(200).json(invoices);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    // Get a single invoice by ID
    static async getInvoiceById(req, res) {
        try {
            const {id} = req.params;
            const invoice = await Invoice.findById(id).populate('customer').populate('items.product');
            if (!invoice) {
                return res.status(404).json({message: 'Invoice not found'});
            }
            res.status(200).json(invoice);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }

    // Update an invoice
    static async updateInvoice(req, res) {
        try {
            const {id} = req.params;
            const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {new: true});
            if (!updatedInvoice) {
                return res.status(404).json({message: 'Invoice not found'});
            }
            res.status(200).json({message: 'Invoice updated successfully', invoice: updatedInvoice});
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }

    // Delete an invoice
    static async deleteInvoice(req, res) {
        try {
            const {id} = req.params;
            const deletedInvoice = await Invoice.findByIdAndDelete(id);
            if (!deletedInvoice) {
                return res.status(404).json({message: 'Invoice not found'});
            }
            res.status(200).json({message: 'Invoice deleted successfully'});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}

module.exports = InvoiceController;
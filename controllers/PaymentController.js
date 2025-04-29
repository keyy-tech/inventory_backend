const Payment = require('../models/Payments');

class PaymentController {
    // Create a new payment
    static async createPayment(req, res) {
        try {
            const {payment_date, payment_amount, payment_method, order_id, status} = req.body;
            if (!payment_amount || !payment_method || !status) {
                return res.status(400).json({message: 'Required fields are missing.'});
            }
            const payment = new Payment({
                payment_date,
                payment_amount,
                payment_method,
                order_id,
                status,
            });
            await payment.save();
            res.status(201).json({message: 'Payment created successfully!', payment});
        } catch (error) {
            res.status(500).json({message: `Error creating payment: ${error.message}`});
        }
    }

    // Get all payments
    static async getAllPayments(req, res) {
        try {
            const payments = await Payment.find().populate('order_id', 'order_date total_price');
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({message: `Error fetching payments: ${error.message}`});
        }
    }

    // Get a single payment by ID
    static async getPaymentById(req, res) {
        try {
            const payment = await Payment.findById(req.params.id).populate('order_id', 'order_date total_price');
            if (!payment) {
                return res.status(404).json({message: 'Payment not found'});
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({message: `Error fetching payment: ${error.message}`});
        }
    }

    // Update a payment
    static async updatePayment(req, res) {
        try {
            const updatedPayment = await Payment.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true, runValidators: true}
            );
            if (!updatedPayment) {
                return res.status(404).json({message: 'Payment not found'});
            }
            res.status(200).json({message: 'Payment updated successfully', updatedPayment});
        } catch (error) {
            res.status(500).json({message: `Error updating payment: ${error.message}`});
        }
    }

    // Delete a payment
    static async deletePayment(req, res) {
        try {
            const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
            if (!deletedPayment) {
                return res.status(404).json({message: 'Payment not found'});
            }
            res.status(200).json({message: 'Payment deleted successfully'});
        } catch (error) {
            res.status(500).json({message: `Error deleting payment: ${error.message}`});
        }
    }
}

module.exports = PaymentController;
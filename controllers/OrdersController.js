const Order = require('../models/Orders');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const {customer_id, total_price, products} = req.body;
        if (!customer_id || !total_price || !products || products.length === 0) {
            return res.status(400).json({message: 'Required fields are missing.'});
        }
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({message: 'Order created successfully!', order});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedOrder) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json({message: 'Order updated successfully', updatedOrder});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json({message: 'Order deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong.'});
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
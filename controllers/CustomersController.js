const Customer = require('../models/Customers');

// Create a new customer
const createCustomer = async (req, res) => {
    try {
        const {name, contact_info, order_history} = req.body;
        if (!name || !contact_info || !contact_info.phone || !contact_info.email || !contact_info.address) {
            return res.status(400).json({message: 'Required fields are missing.'});
        }
        const customer = new Customer({name, contact_info, order_history});
        await customer.save();
        res.status(201).json({message: 'Customer created successfully!', customer});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('order_history', 'order_date total_price');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get a single customer by ID
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('order_history', 'order_date total_price');
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json(customer);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid customer ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

// Update a customer
const updateCustomer = async (req, res) => {
    try {
        const {name, contact_info, order_history} = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            {name, contact_info, order_history},
            {new: true, runValidators: true}
        ).populate('order_history', 'order_date total_price');
        if (!updatedCustomer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json({message: 'Customer updated successfully', updatedCustomer});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid customer ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json({message: 'Customer deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid customer ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

const bulkWriteCustomers = async (req, res) => {
    try {
        const operations = req.body.map((customer) => {
            if (!customer.name || !customer.contact_info || !customer.contact_info.phone || !customer.contact_info.email) {
                throw new Error('Each customer must have a name and valid contact information for bulk insert operations.');
            }

            return {
                insertOne: {
                    document: customer, // Insert the customer as a new document
                },
            };
        });

        const result = await Customer.bulkWrite(operations);

        res.status(200).json({
            message: 'Bulk insert operation completed successfully.',
            result,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    bulkWriteCustomers,
};
const Supplier = require('../models/Suppliers');

// Create a new supplier
const createSupplier = async (req, res) => {
    try {
        const {name, contact_info, payment_terms, delivery_terms} = req.body;
        if (!name || !contact_info || !contact_info.phone || !contact_info.email || !contact_info.address || !payment_terms) {
            return res.status(400).json({message: 'Required fields are missing.'});
        }
        const supplier = new Supplier({name, contact_info, payment_terms, delivery_terms});
        await supplier.save();
        res.status(201).json({message: 'Supplier created successfully!', supplier});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get all suppliers
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get a single supplier by ID
const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({message: 'Supplier not found'});
        }
        res.status(200).json(supplier);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid supplier ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

// Update a supplier
const updateSupplier = async (req, res) => {
    try {
        const {name, contact_info, payment_terms, delivery_terms} = req.body;
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            {name, contact_info, payment_terms, delivery_terms},
            {new: true, runValidators: true}
        );
        if (!updatedSupplier) {
            return res.status(404).json({message: 'Supplier not found'});
        }
        res.status(200).json({message: 'Supplier updated successfully', updatedSupplier});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid supplier ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

// Delete a supplier
const deleteSupplier = async (req, res) => {
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
        if (!deletedSupplier) {
            return res.status(404).json({message: 'Supplier not found'});
        }
        res.status(200).json({message: 'Supplier deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid supplier ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};
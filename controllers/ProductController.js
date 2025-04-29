const Product = require('../models/Products');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            sku,
            price,
            quantity_in_stock,
            reorder_level,
            supplier_id,
            status
        } = req.body;
        if (!name || !description || !category || !sku || !price || !quantity_in_stock) {
            return res.status(400).json({message: 'Required fields are missing.'});
        }
        const product = new Product({
            name,
            description,
            category,
            sku,
            price,
            quantity_in_stock,
            reorder_level,
            supplier_id,
            status
        });
        await product.save();
        res.status(201).json({message: 'Product created successfully!', product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('supplier_id', 'name contact_info');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('supplier_id', 'name contact_info');
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid product ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            sku,
            price,
            quantity_in_stock,
            reorder_level,
            supplier_id,
            status
        } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {name, description, category, sku, price, quantity_in_stock, reorder_level, supplier_id, status},
            {new: true, runValidators: true}
        );
        if (!updatedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product updated successfully', updatedProduct});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid product ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({message: 'Invalid product ID format.'});
        }
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
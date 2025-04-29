const Product = require('../models/Products');
const paginate = require('../services/pagination');
const buildQuery = require('../services/filtering');

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

// Get all products with filtering, sorting, and pagination
const getAllProducts = async (req, res) => {
    try {
        const {skip, limit} = paginate(req.query);
        const {filter, sort} = buildQuery(req.query);

        // Fetch filtered, sorted, and paginated products
        const products = await Product.find(filter)
            .skip(skip)
            .limit(limit)
            .populate('supplier_id', 'name contact_info')
            .sort(sort);

        // Get total count for pagination metadata
        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            data: products,
            meta: {
                total: totalProducts,
                page: Math.ceil(skip / limit) + 1,
                pageSize: limit,
            },
        });
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

// Bulk write products (insert only)
const bulkWriteProducts = async (req, res) => {
    try {
        const operations = req.body.map((product) => {
            if (!product.sku || !product.name || !product.price || !product.quantity_in_stock) {
                throw new Error('Each product must have an SKU, name, price, and quantity_in_stock for bulk insert operations.');
            }

            return {
                insertOne: {
                    document: product, // Insert the product as a new document
                },
            };
        });

        const result = await Product.bulkWrite(operations);

        res.status(200).json({
            message: 'Bulk insert operation completed successfully.',
            result,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Advanced querying and aggregation
const advancedQueryProducts = async (req, res) => {
    try {
        const {category, minPrice, maxPrice, groupBy, sortBy} = req.query;

        // Build aggregation pipeline
        const pipeline = [];

        // Filtering stage
        const matchStage = {};
        if (category) matchStage.category = category;
        if (minPrice || maxPrice) {
            matchStage.price = {};
            if (minPrice) matchStage.price.$gte = parseFloat(minPrice);
            if (maxPrice) matchStage.price.$lte = parseFloat(maxPrice);
        }
        if (Object.keys(matchStage).length > 0) {
            pipeline.push({$match: matchStage});
        }

        // Grouping stage
        if (groupBy) {
            pipeline.push({
                $group: {
                    _id: `$${groupBy}`, // Group by the specified field
                    totalProducts: {$sum: 1},
                    averagePrice: {$avg: '$price'},
                    totalStock: {$sum: '$quantity_in_stock'},
                },
            });
        }

        // Sorting stage
        if (sortBy) {
            const sortFields = {};
            sortBy.split(',').forEach((field) => {
                const order = field.startsWith('-') ? -1 : 1;
                const fieldName = field.replace(/^-/, '');
                sortFields[fieldName] = order;
            });
            pipeline.push({$sort: sortFields});
        }

        // Projection stage (optional)
        pipeline.push({
            $project: {
                _id: 0, // Exclude the `_id` field
                group: '$_id',
                totalProducts: 1,
                averagePrice: 1,
                totalStock: 1,
            },
        });

        // Execute aggregation pipeline
        const result = await Product.aggregate(pipeline);

        res.status(200).json({data: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    bulkWriteProducts,
    advancedQueryProducts,
};
const PurchaseOrder = require('../models/PurchaseOrder');

class PurchaseOrderController {
    // Create a new purchase order
    static async createPurchaseOrder(req, res) {
        try {
            const {supplier_id, order_date, delivery_date, total_price, products} = req.body;
            if (!supplier_id || !total_price || !products || products.length === 0) {
                return res.status(400).json({message: 'Required fields are missing.'});
            }
            const purchaseOrder = new PurchaseOrder({
                supplier_id,
                order_date,
                delivery_date,
                total_price,
                products,
            });
            await purchaseOrder.save();
            res.status(201).json({message: 'Purchase order created successfully!', purchaseOrder});
        } catch (error) {
            res.status(500).json({message: `Error creating purchase order: ${error.message}`});
        }
    }

    // Get all purchase orders
    static async getAllPurchaseOrders(req, res) {
        try {
            const purchaseOrders = await PurchaseOrder.find()
                .populate('supplier_id', 'name')
                .populate('products.product_id', 'name');
            res.status(200).json(purchaseOrders);
        } catch (error) {
            res.status(500).json({message: `Error fetching purchase orders: ${error.message}`});
        }
    }

    // Get a single purchase order by ID
    static async getPurchaseOrderById(req, res) {
        try {
            const purchaseOrder = await PurchaseOrder.findById(req.params.id)
                .populate('supplier_id', 'name')
                .populate('products.product_id', 'name');
            if (!purchaseOrder) {
                return res.status(404).json({message: 'Purchase order not found'});
            }
            res.status(200).json(purchaseOrder);
        } catch (error) {
            res.status(500).json({message: `Error fetching purchase order: ${error.message}`});
        }
    }

    // Update a purchase order
    static async updatePurchaseOrder(req, res) {
        try {
            const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true, runValidators: true}
            );
            if (!updatedPurchaseOrder) {
                return res.status(404).json({message: 'Purchase order not found'});
            }
            res.status(200).json({message: 'Purchase order updated successfully', updatedPurchaseOrder});
        } catch (error) {
            res.status(500).json({message: `Error updating purchase order: ${error.message}`});
        }
    }

    // Delete a purchase order
    static async deletePurchaseOrder(req, res) {
        try {
            const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
            if (!deletedPurchaseOrder) {
                return res.status(404).json({message: 'Purchase order not found'});
            }
            res.status(200).json({message: 'Purchase order deleted successfully'});
        } catch (error) {
            res.status(500).json({message: `Error deleting purchase order: ${error.message}`});
        }
    }
}

module.exports = PurchaseOrderController;
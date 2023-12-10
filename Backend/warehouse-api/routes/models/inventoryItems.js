const mongoose = require('mongoose');

const InventoryItemsSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
});

InventoryItemsSchema.index({ item_name: 1, category: 1 }, { unique: true });

module.exports = Items = mongoose.model('inventoryItems', InventoryItemsSchema);

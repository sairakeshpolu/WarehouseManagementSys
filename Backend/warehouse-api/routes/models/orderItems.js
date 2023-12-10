const mongoose = require('mongoose');

const OrderItemsSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
    },
    item_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'inventoryItems',
        required: true,
    },
    quantity: {
        type: Number,
    },
    askedQuantity: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = List = mongoose.model('orderItems', OrderItemsSchema);

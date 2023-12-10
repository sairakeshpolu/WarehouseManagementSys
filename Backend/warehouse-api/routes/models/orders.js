const mongoose = require('mongoose');
const validStatuses = ['Order created', 'Order packing started', 'Order packing completed',
    'Out for Delivery','Order delivery in progress', 'Order delivered'];
const validOrderTypes = ['PO', 'SO'];
const validTerms = ["COD Cheque", "COD Cash", "B To B"];

const OrdersSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: validOrderTypes,
        default: validOrderTypes[0],
        required: true,
    },
    status: {
        type: String,
        enum: validStatuses,
        default: validStatuses[0],
        required: true,
    },
    acceptedTerm: {
        type: String,
        enum: validTerms
    },
    customer_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    packer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    modified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    modified_time: {
        type: Date,
        default: Date.now
    },
    routeOrder: {
        type: Number,
    },
    routeNumber: {
        type: Number,
    },
    amountPaid: {
        type: Number,
    },
    orderAmount: {
        type: Number,
    },
    comments: {
        type: String
    },
    settled: {
        type: Boolean
    }
});

const Orders = mongoose.model('orders', OrdersSchema);
module.exports = {
    Orders,
    validStatuses,
    validOrderTypes,
    validTerms
};

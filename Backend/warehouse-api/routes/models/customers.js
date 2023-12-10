const mongoose = require('mongoose');
const validTerms = ["COD Cheque", "COD Cash", "B To B"];

const CustomersSchema = new mongoose.Schema({
    customer_firstName: {
        type: String,
        required: true,
    },
    customer_lastName: {
        type: String,
        required: true,
    },
    store_name: {
        type: String,
        required: true,
        unique: true,
    },
    customer_type: {
        type: String,
        required: true,
    },
    tax_id: {
        type: String,
    },
    terms: {
        type: String,
        enum: validTerms,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact_person: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    created_time: {
        type: Date,
        default: Date.now
    },
});
const Customer = mongoose.model('customers', CustomersSchema);
module.exports = {
    Customer,
    validTerms
}
const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true,
        unique: true,
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
    tax_id: {
        type: String,
        required: true,
    },
    terms: {
        type: String,
        required: true,
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

module.exports = List = mongoose.model('customers', CustomersSchema);

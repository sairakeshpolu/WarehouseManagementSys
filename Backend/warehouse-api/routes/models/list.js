const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = List = mongoose.model('list', ListSchema);

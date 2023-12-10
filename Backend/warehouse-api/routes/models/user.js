const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const validUserTypes = ['Manager', 'SalesPerson', 'Packer', 'Driver', 'Accountant'];

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: {
        type: String,
        enum: validUserTypes,
        required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};
const User = mongoose.model("users", userSchema);

module.exports = {
    User,
    validUserTypes
}
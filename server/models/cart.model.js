const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    _id: Number,
    userId: Number,
    createdDate: Date,
    status: String
});

module.exports = mongoose.model('Cart', CartSchema);
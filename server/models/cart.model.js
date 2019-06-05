const Product = require('./product.model');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    _id: Number,
    userId: Number,
    products: [Product],
    createdDate: Date
});

module.exports = mongoose.model('Cart', CartSchema);
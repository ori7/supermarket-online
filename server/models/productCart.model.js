const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCartSchema = new Schema({
    _id: Number,
    productId: Number,
    quantity: Number,
    price: Number,
    cartId: Number
});

module.exports = mongoose.model('ProductCart', ProductCartSchema);
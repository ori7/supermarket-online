const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: Number,
    name: String,
    categoryId: Number,
    price: Number,
    picture: String
});

module.exports = mongoose.model('Product', ProductSchema);
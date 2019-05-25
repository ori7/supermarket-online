const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: String,
    seq: Number
});

module.exports = mongoose.model('Counter', CounterSchema);
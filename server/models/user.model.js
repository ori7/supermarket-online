const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Number,
    name: String,
    lastName: String,
    email: String,
    password: String,
    city: String,
    street: String,
    role: Number
});

module.exports = mongoose.model('User', UserSchema);
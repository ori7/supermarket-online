const User = require('../models/user.model');
const ProductCart = require('../models/productCart.model');
const Cart = require('../models/cart.model');
const Counter = require('../models/counter.model');
const Product = require('../models/product.model');

const fs = require('fs-extra');

function getUserById(req, res) {

    User.findOne({ id: req.params.id }).exec(function (error, result) {
        if (error) {
            res.sendStatus(404);
        }
        else {
            res.json(result);
        }
    });
}

function getTotalPrice(req, res) {

    ProductCart.find({ cartId: req.params.cartId }).select('price').exec(function (error, result) {
        if (error) {
            res.sendStatus(404);
        }
        else {
            const sum = getTotalPrice(result);
            res.json(sum);
        }
    });
}

function makeOrder(req, res) {

    removeOldCart(req.params.userId, function (error, result) {
        Cart.findOneAndUpdate({ _id: req.params.cartId }, { $set: { status: 'close' } }).exec(function (e, r) { // This should be done after deletion
            if (e) {
                res.sendStatus(404);
            }
            else {
                updateSequence('orderId', function (er, re) {
                    /*  TODO:  If error - Notify the manager that the counter is not being updated!   */
                    res.json(true);   //   Even if the counter has not been updated, we will refund the buyer that the purchase completed
                })
            }
        })
    });
}

function removeOldCart(userId, callback) {

    Cart.findOneAndDelete({ userId: userId, status: 'close' }, (err, doc) => {
        callback(null, 'done');
        if (doc) {
            ProductCart.deleteMany({ cartId: doc._id }).exec();
        }
    })
}

function updateSequence(name, callback) {

    Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        (err, doc) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, doc);
            }
        }
    );
}

function createReceipt(req, res) {

    ProductCart.find({ cartId: req.params.cartId }).exec(async function (error, result) {
        if (error) {
            res.sendStatus(404);
        }
        else {
            const receipt = await builtReceipt(result, function (e, r) {
                if (e)
                    res.sendStatus(500);
            });
            const path = require('path');
            res.sendFile(path.resolve(__dirname + '/../files/receipt.txt'));
        }
    })
}

function builtReceipt(products, callback) {

    fs.truncate(__dirname + '/../files/receipt.txt', 0, function () { });
    fs.appendFile(__dirname + '/../files/receipt.txt', 'Receipt:' + "\n", function () { });
    for (let i = 0; i < products.length; i++) {
        Product.findOne({ _id: products[i].productId }).exec(function (error, result) {
            if (error) {
                callback(error);
            }
            const line = '  Product: ' + result.name + ', Quantity: ' + products[i].quantity + ', Price: ' + products[i].price + '$';
            fs.appendFile(__dirname + '/../files/receipt.txt', line + "\n", function () {
                if (i === (products.length - 1)) {   //   This is the last product
                    const totalPrice = getTotalPrice(products);
                    fs.appendFile(__dirname + '/../files/receipt.txt', 'TotalPrice: ' + totalPrice + '$' + "\n");
                }
            })
        });
    }
    return;   //    this is for 'await' in 'createReceipt' function.
}

function getTotalPrice(products) {

    var sum = 0;
    for (let i = 0; i < products.length; i++) {
        sum += products[i].price;
    }
    return sum;

}

module.exports.getUserById = getUserById;
module.exports.getTotalPrice = getTotalPrice;
module.exports.makeOrder = makeOrder;
module.exports.createReceipt = createReceipt;
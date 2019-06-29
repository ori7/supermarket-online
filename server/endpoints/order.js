const User = require('../models/user.model');
const ProductCart = require('../models/productCart.model');
const Cart = require('../models/cart.model');
const Counter = require('../models/counter.model');

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
            var sum = 0;
            for (let i = 0; i < result.length; i++) {
                sum += result[i].price;
            }
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

module.exports.getUserById = getUserById;
module.exports.getTotalPrice = getTotalPrice;
module.exports.makeOrder = makeOrder;
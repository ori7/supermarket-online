const Cart = require('../models/cart.model');
const ProductCart = require('../models/productCart.model');
const Counter = require('../models/counter.model');

function getCart(req, res) {

    Cart.findOne({ userId: req.params.id }).exec(function (error, result) {
        if (result) {
            saveCart(result, function (e, r) {
                if (e)
                    res.status(404);
                else
                    res.send(r);
            });
        }
        else {
            createCart(req.params.id, function (error, result) {
                if (error)
                    res.status(404);
                else {
                    saveCart(result, function (e, r) {
                        if (e)
                            res.status(404);
                        else
                            res.send(r);
                    });
                }
            });
        }
    });
}

function saveCart(cart, callback) {

    cart.save(function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, res);
        }
    });
}

function createCart(userId, callback) {

    let newCart = new Cart;
    newCart.userId = userId;
    newCart.createdDate = new Date;
    getId('cartId', async function (error, result) {
        if (result) {
            console.log('rrr' + result);
            newCart._id = result.seq;
            await updateSequence('cartId', function (e, r) {
                if (e)
                    callback(e);
            })
            callback(null, newCart);
        }
        else {
            console.log('eee');
            callback(error);
        }
    })
}

function buildNewCounter() {

    newDocument = new Counter;
    newDocument._id = 'cartId';
    newDocument.seq = 0;
    return newDocument;
}

function getId(name, callback) {
    console.log(name);

    Counter.findOne({ _id: name }).exec(async function (error, result) {
        console.log(result);
        if (result)
            callback(null, result);
        else {
            const newCounter = await buildNewCounter();
            newCounter.save(function (err, res) {
                console.log('cc' + res);
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, res);
                }
            });
        }
    });
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

function getCartItems(req, res) {

    ProductCart.find({ cartId: req.params.id }).exec(function (error, result) {
        if (error) {
            res.status(404);
        }
        else {
            res.send(result);
        }
    });
}

function deleteCartItem(req, res) {

    console.log(req.params.cartId);
    console.log(req.params.itemId);
}

module.exports.getCart = getCart;
module.exports.getCartItems = getCartItems;
module.exports.deleteCartItem = deleteCartItem;
const Cart = require('../models/cart.model');
const ProductCart = require('../models/productCart.model');
const Counter = require('../models/counter.model');

function getCart(req, res) {

    Cart.findOne({ userId: req.params.id }).exec(function (error, result) {
        if (result) {
            saveObject(result, function (e, r) {
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
                    saveObject(result, function (e, r) {
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

function saveObject(object, callback) {

    object.save(function (err, res) {
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
            newCart._id = result.seq;
            await updateSequence('cartId', function (e, r) {
                if (e)
                    callback(e);
            })
            callback(null, newCart);
        }
        else {
            callback(error);
        }
    })
}

function buildNewCounter(id) {

    newDocument = new Counter;
    newDocument._id = id;
    newDocument.seq = 0;
    return newDocument;
}

function getId(name, callback) {

    Counter.findOne({ _id: name }).exec(async function (error, result) {
        if (result)
            callback(null, result);
        else {
            const newCounter = await buildNewCounter(name);
            newCounter.save(function (err, res) {
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

function buildProductCart(productCart) {

    newProductCart = new ProductCart;
    newProductCart.productId = productCart.productId;
    newProductCart.quantity = productCart.quantity;
    newProductCart.price = productCart.price;
    newProductCart.cartId = productCart.cartId;
    return newProductCart;
}

function addToCart(req, res) {

    let newProductCart = buildProductCart(req.body);
    getId('ProductCartId', async function (error, result) {
        if (result) {
            newProductCart._id = result.seq;
            await updateSequence('ProductCartId', function (e, r) {
                if (e)
                    res.status(404);
            })
            saveObject(newProductCart, function (e, r) {
                if (e)
                    res.status(404);
                else
                    res.send(r);
            });
        }
        else {
            res.status(404);
        }
    })
}

function deleteCartItem(req, res) {

    ProductCart.findOneAndDelete(
        { _id: req.params.itemId },
        (err, doc) => {
            if (err) {
                res.status(404);
            }
            else {
                res.send(doc);
            }
        }
    );
}

module.exports.getCart = getCart;
module.exports.getCartItems = getCartItems;
module.exports.addToCart = addToCart;
module.exports.deleteCartItem = deleteCartItem;
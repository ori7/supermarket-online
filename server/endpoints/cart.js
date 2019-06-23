const Cart = require('../models/cart.model');
const ProductCart = require('../models/productCart.model');
const Counter = require('../models/counter.model');

function getCart(req, res) {console.log('g'+req.params.userId);console.log('g'+req.body.status);

    Cart.findOne({ userId: req.params.userId, status: req.body.status }).exec(function (error, result) {
        if (result) 
            res.send(result);
        else
            res.status(404);
    })
}

async function createCart(req, res) {console.log('c'+req.params.userId);

    let newCart = await buildNewCart(req.params.userId);
    getId('cartId', async function (error, result) {
        if (result) {
            await updateSequence('cartId', function (e, r) {
                if (e)
                    res.status(404);
                else {
                    newCart._id = result.seq;
                    res.send(newCart);
                }
            })
        }
        else
            res.status(404);
    })
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

function buildNewCart(userId) {

    let newCart = new Cart;
    newCart.userId = userId;
    newCart.createdDate = new Date;
    newCart.status = 'open';
    return newCart;
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
module.exports.createCart = createCart;
module.exports.getCartItems = getCartItems;
module.exports.addToCart = addToCart;
module.exports.deleteCartItem = deleteCartItem;
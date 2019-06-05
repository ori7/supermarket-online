const Cart = require('../models/cart.model');
const ProductCart = require('../models/productCart.model');

function getCart(req, res) {

    Cart.find({ userId: req.params.id }).exec(function (error, result) {
        if (error) {
            res.send(404);
        }
        else {
            getCartItems(result._id, function (e, r) {
                if (r) {
                    result.products = r;
                }
                res.send(result);
            })
            res.send(result);
        }
    });
}

function getCartItems(cartId, callback) {

    ProductCart.find({ cartId: cartId }).exec(function (error, result) {
        if (error) {
            callback(error);
        }
        else {
            callback(null, result);
        }
    });
}

function deleteCartItem(req, res) {

    console.log(req.params.cartId);
    console.log(req.params.itemId);
}

module.exports.getCart = getCart;
module.exports.deleteCartItem = deleteCartItem;
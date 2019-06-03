const Product = require('../models/product.model');
const Counter = require('../models/counter.model');

async function insertNewProduct(req, res) {

    const newDocument = await buildProduct(req.body);
    getId('productId', function (error, result) {
        if (result) {
            newDocument._id = result.seq;
            newDocument.save(function (e, r) {
                if (e)
                    res.status(404);
                else {
                    updateSequence('productId', function (error, result) {
                        if (result)
                            res.json(newDocument.name);
                        else
                            res.status(404);
                    });
                }
            });
        }
        else
            res.status(404);
    });
}

function buildProduct(product) {

    newDocument = new Product;
    newDocument.name = product.name;
    newDocument.categoryId = product.categoryId;
    newDocument.price = product.price;
    newDocument.picture = product.picture;
    return newDocument;
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

function getId(name, callback) {

    Counter.findOneAndUpdate({ _id: name }).exec(async function (error, result) {
        if (result)
            callback(null, result);
        else {
            const newCounter = await buildNewCounter();
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

function buildNewCounter() {

    newDocument = new Counter;
    newDocument._id = 'productId';
    newDocument.seq = 0;
    return newDocument;
}

/*
Now, there's no delite option in the app,
Therefore the caunter can also be used as ID of the products, and also as their sum.
If this option is added, 
we will have to split the roles: one variable that updates each deletion that will be the sum of the products, 
and another that is not updated with the deletions - that will give ID to the next product.
*/

function updateProduct(req, res) {

    const updated = buildProduct(req.body);
    updated._id = req.body._id;
    Product.findOneAndUpdate(
        { _id: req.body._id },
        { $set: updated },
        { new: true }
    ).exec(function (error, result) {
        if (result)
            res.json(result.name);
        else
            res.status(401);
    });
}
module.exports.insertNewProduct = insertNewProduct;
module.exports.updateProduct = updateProduct;
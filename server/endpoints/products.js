const Product = require('../models/product.model');
const Counter = require('../models/counter.model');

async function insertNewproduct(req, res) {

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

    Counter.findOne({ _id: name }).exec(function (error, result) {
        if (result)
            callback(null, result);
        else
            callback(error);
    });
}

module.exports.insertNewproduct = insertNewproduct;
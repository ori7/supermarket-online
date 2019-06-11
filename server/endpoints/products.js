const Product = require('../models/product.model');

function getProducts(req, res) {

    Product.find({}).exec(function (error, result) {
        if (error) {
            res.send(404);
        }
        else {
            res.send(result);
        }
    });
}

function getProductById(req, res) {

    Product.findOne({ _id: req.params.id }).exec(function (error, result) {
        if (result) {
            res.send(result);
        }
        else {
            res.status(401);
        }
    });
}

function getProductsWithfilter(req, res) {

    const filter = buildFilter(req.body);

    Product.find(filter).exec(function (error, result) {
        if (error) {
            res.send(404);
        }
        else {
            res.send(result);
        }
    });
}

function buildFilter(params) {

    let filter = {};
    if (params.products && params.category)
        filter = { name: { "$regex": params.products, $options: "i" },categoryId: params.category };
    else if (params.products)
        filter = { name: { "$regex": params.products, $options: "i" } };
    else if (params.category >= 0)
        filter = { categoryId: params.category };
    return filter;
}

module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
module.exports.getProductsWithfilter = getProductsWithfilter;
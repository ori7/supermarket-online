const Product = require('../models/product.model');
const Counter = require('../models/counter.model');
/*
async function insertNewproduct(req, res) {

    const newDocument = await buildProduct(req.body);
    newDocument.save(function (err, product) {
        console.log('1' + newDocument);
        if (err) {
            console.log('err');
            res.status(404);
        }
        else {
            console.log('good');
            res.json(newDocument.name);
        }
    });
}

function buildProduct(product) {

    newDocument = new Product;
    getNextSequence('productId', function (error, result) {
        if (result)
            newDocument._id = result;
        else
            res.status(404)
    });
    newDocument.name = product.name;
    newDocument.categoryId = product.categoryId;
    newDocument.price = product.price;
    newDocument.picture = product.picture; console.log('2' + newDocument);
    return newDocument;
}

function getNextSequence(name, callback) {

    Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        (err, doc) => {
            if (err)
                callback(err);
            else
                callback(null, doc.seq);
        }
    );
}
*/
async function insertNewproduct(req, res) {

    const newDocument = await buildProduct(req.body);

    getNextSequence('productId', function (error, result) {
        if (result) {
            newDocument._id = result;
            newDocument.save(function (e, r) {
                if (e) {
                    res.status(404);
                }
                else {
                    res.json(newDocument.name);
                }
            });
        }
        else
            res.status(404)
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

function getNextSequence(name, callback) {

    Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        (err, doc) => {
            if (err)
                callback(err);
            else
                callback(null, doc.seq);
        }
    );
}

module.exports.insertNewproduct = insertNewproduct;

/*
function Newproduct(req, res) {

    const newDocument = await buildProduct(req.body);

    getNextSequence('productId', function (error, result) {
        if (result) {
            newDocument._id = result;
            insertNewproduct(newDocument);
        }
        else
            res.status(404)
    }); console.log('3' + newDocument);
    //return newDocument;
}

function buildProduct(product) {

    newDocument = new Product;
    newDocument.name = product.name;
    newDocument.categoryId = product.categoryId;
    newDocument.price = product.price;
    newDocument.picture = product.picture; console.log('2' + newDocument);
    return newDocument;
}



insertNewproduct(newDocument) {
    newDocument.save(function (err, product) {
        console.log('1' + newDocument);
        if (err) {
            console.log('err');
            res.status(404);
        }
        else {
            console.log('good');
            res.json(newDocument.name);
        }
    });
}

function buildProduct(product) {

    newDocument = new Product;
    newDocument.name = product.name;
    newDocument.categoryId = product.categoryId;
    newDocument.price = product.price;
    newDocument.picture = product.picture; console.log('2' + newDocument);
    return newDocument;
}

function getNextSequence(name, callback) {

    Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        (err, doc) => {
            if (err)
                callback(err);
            else
                callback(null, doc.seq);
        }
    );
}

*/
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwtKey = 'sdfj&*dfg-dlga#$dp3#bnjbg@$84bf4xc/5';

function registerNewUser(req, res) {

    const check = checkUser(req.body);
    if (check) {
        const newDocument = buildUser(req.body);
        newDocument.save(function (err, user) {
            if (err) {
                res.status(404);
            }
            else {
                const token = jwt.sign({ user: newDocument.name, id: newDocument.id }, jwtKey);
                res.json(token);
            }
        });
    }
    else
        res.status(404);
}

function buildUser(user) {

    newDocument = new User;
    newDocument.id = user.id;
    newDocument.name = user.name;
    newDocument.lastName = user.lastNam;
    newDocument.email = user.email;
    newDocument.password = user.password;
    newDocument.city = user.city;
    newDocument.street = user.street;
    return newDocument;
}

function checkUser(user) {

    if (Number.isInteger(user.id) &&
        typeof user.name === 'string' &&
        typeof user.lastName === 'string' &&
        typeof user.email === 'string' &&
        typeof user.password === 'string' &&
        typeof user.city === 'string' &&
        typeof user.street === 'string'
    )
        return true;
    else
        return false;
}

function checkEmail(req, res) {

    User.findOne({ email: req.body.email }).exec(function (error, result) {
        if (result)
            res.send(false);
        else
            res.send(true);
    });
}

function checkId(req, res) {

    User.findOne({ id: req.body.id }).exec(function (error, result) {
        if (result)
            res.send(false);
        else
            res.send(true);
    });
}

module.exports.registerNewUser = registerNewUser;
module.exports.checkEmail = checkEmail;
module.exports.checkId = checkId;

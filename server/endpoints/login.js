const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwtKey = 'sdfj&*dfg-dlga#$dp3#bnjbg@$84bf4xc/5';
var bcrypt = require('bcryptjs');

function loginUser(req, res) {

    User.findOne({ email: req.body.email }).exec(function (error, result) {
        if (result) {
            console.log(result);
            checkPassword(req.body.password, result, function (error, token) {
                if (token)
                    res.json(token);
                else
                    res.status(401).json('no authorized');
            });
        }
        else
            res.status(401).json('no authorized');
    });
};

function checkPassword(password, user, callback) {

    bcrypt.compare(password, user.password, function (err, success) {
        if (success) {
            console.log('success');
            var token = createToken(user);
            callback(null, token);
        }
        else
            callback('error', null);
    });
}

function createToken(user) {

    if (user.role)
        var token = jwt.sign({ user: user.name, id: user.id, role: user.role }, jwtKey);
    else
        var token = jwt.sign({ user: user.name, id: user.id }, jwtKey);
    return token;
}

module.exports.loginUser = loginUser;
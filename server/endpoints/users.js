const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwtKey = 'sdfj&*dfg-dlga#$dp3#bnjbg@$84bf4xc/5';

function registerNewUser(req, res) {

    const newDocument = buildUser(req.body);
    console.log(newDocument);
    newDocument.save(function (err, user) {
        if (err) {
            console.log(err);
            res.status(404);
        }
        else {
            console.log(user);
            const token = jwt.sign({ user: newDocument.email, id: newDocument.id }, jwtKey);
            res.json(token);
        }
    });
}

function buildUser(user){

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

function loginUser(req, res) {

    User.find({ email: req.body.email, id: req.body.password }).exec(function (error, result) {
        if (error) {
            res.status(401).json('no authorized');
        }
        else {
            const token = jwt.sign({ user: result.email, id: result.id }, jwtKey);
            res.json(token);
        }
    });
};

module.exports.registerNewUser = registerNewUser;
module.exports.loginUser = loginUser;
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwtKey = 'sdfj&*dfg-dlga#$dp3#bnjbg@$84bf4xc/5';

function registerNewUser(req, res) {

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

function checkEmail(req, res) {console.log(req.body);

    User.find({ email: req.body.email }).exec(function (error, result) {console.log(result);
        if (result)
            res.send(false);
        else
            res.send(true);
    });
}

module.exports.registerNewUser = registerNewUser;
module.exports.checkEmail = checkEmail;

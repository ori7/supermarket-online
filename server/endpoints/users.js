const User = require('../models/user.model');

function registerNewUser(req, res) {

    const newDocument = new User;
    console.log(req);
    newDocument.save(function (err, user) {
        if (err) {
            console.log(err);
            res.status(404);
        }
        else {
            console.log(user);
            const token = jwt.sign({ username: 'user', id: 'id' }, jwtKey);
            res.json(token);
        }
    });
}

function loginUser(req, res) {

    User.find({ username: 'user', id: 'id' }).exec(function (error, result) {
        if (error) {
            res.status(401).json('no authorized');
        }
        else
            const token = jwt.sign({ username: 'user', id: 'id' }, jwtKey);
        res.json(token);
    });
};

module.exports.registerNewUser = registerNewUser;
module.exports.loginUser = loginUser;
const User = require('../models/user.model');

function getUserById(req, res) {console.log('id');

    User.findOne({ id: req.params.id }).exec(function (error, result) {console.log(result);
        if (error) {
            res.status(404);
        }
        else {
            res.json(result);
        }
    });
}

module.exports.getUserById = getUserById;
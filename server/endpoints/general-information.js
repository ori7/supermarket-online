const Counter = require('../models/counter.model')

function getQuantity(req, res) {

    Counter.findOne({ _id: req.body.id }).exec(function (error, result) {
        if (result) {
            res.json(result.seq);
        }
        else {
            res.sendStatus(401);
        }
    });

}

module.exports.getQuantity = getQuantity;
const Counter = require('../models/counter.model')

function getQuantity(req, res) {

    Counter.findOne({ _id: req.body.id }).exec(function (error, result) {console.log(1);
        if (result) {console.log(result.seq);
            res.json(result.seq);
        }
        else {console.log(3);
            res.sendStatus(401);
        }
    });

}

module.exports.getQuantity = getQuantity;
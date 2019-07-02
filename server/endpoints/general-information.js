const Counter = require('../models/counter.model')

function getQuantity(req, res) {

    Counter.findOne({ _id: req.body.id }).exec(function (error, result) {
        if (result) {
            res.json(result.seq);
        }
        else {
            const newCounter = buildNewCounter(req.body.id);
            newCounter.save(function (e, r) {
                if (e) {
                    res.status(404);
                }
                else {
                    res.json(r.seq);
                }
            })
        }
    });
}

function buildNewCounter(id) {

    newDocument = new Counter;
    newDocument._id = id;
    newDocument.seq = 0;
    return newDocument;
}

module.exports.getQuantity = getQuantity;
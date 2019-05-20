const Categories = require ('../models/categoty.model');

function getCategories(req, res) {

    Categories.find({}).exec(function (error, result) {
        if (error) {
            res.send(404);
        }
        else {console.log(result);
            res.send(result);
        }
    });
}

module.exports.getCategories = getCategories;

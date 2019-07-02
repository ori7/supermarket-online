const Categories = require('../models/categoty.model');

function getCategories(req, res) {

    Categories.find({}).exec(function (error, result) {
        if (result.length) {   
            res.send(result);
        }
        else {  //   Threr is no categories. We need to put them in.
            Categories.insertMany(categories).then(
                r => { res.send(r) }
            )
        }
    });
}

const categories = [
    { id: 0, name: 'Drinks & Wine' },
    { id: 1, name: 'Bread & Pastries' },
    { id: 2, name: 'Fruits & Vegetables' },
    { id: 3, name: 'Toilet' },
    { id: 4, name: 'Milk & Eggs' },
    { id: 5, name: 'Meats & Fish' }
]

module.exports.getCategories = getCategories;

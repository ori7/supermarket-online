const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const loginCtrl = require('./endpoints/login');
const registerCtrl = require('./endpoints/register');
const categoriesCtrl = require('./endpoints/categories');
const productsCtrl = require('./endpoints/products');
mongoose.set('useFindAndModify', false);

var db = 'mongodb://127.0.0.1/supermarket';
mongoose.connect(db, { useNewUrlParser: true });
var con = mongoose.connection;

con.on('error', console.error.bind(console, 'connection error:'));

con.once('open', function () {
    console.log("connection created");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 6789;

app.use(function (req, res, next) {

    if (req.path === '/login' || '/register')
        next();

    else if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    else {
        try {
            jwt.verify(req.headers.authorization.replace('Bearer ', ''), jwtKey);
            next();
        }
        catch (err) {
            return res.status(403).json({ error: 'Bad credentials' });
        }
    }
})

app.post('/register', registerCtrl.registerNewUser);
app.post('/register/email', registerCtrl.checkEmail);
app.post('/register/id', registerCtrl.checkId);
app.post('/login', loginCtrl.loginUser);
app.get('/categories', categoriesCtrl.getCategories);
app.post('/products', productsCtrl.insertNewProduct);
app.get('/products', productsCtrl.getProducts);
app.post('/products/id', productsCtrl.getProductById);
app.post('/products/update', productsCtrl.updateProduct);

app.listen(PORT, () => {
    console.log('Listening on ',PORT);
});
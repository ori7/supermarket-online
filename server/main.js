const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtKey = 'sdfj&*dfg-dlga#$dp3#bnjbg@$84bf4xc/5';
const loginCtrl = require('./endpoints/login');
const registerCtrl = require('./endpoints/register');
const categoriesCtrl = require('./endpoints/categories');
const productsCtrl = require('./endpoints/products');
const adminCtrl = require('./endpoints/admin');
const infoCtrl = require('./endpoints/general-information');
const cartCtrl = require('./endpoints/cart');

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

    if (req.path.startsWith( '/login') || req.path.startsWith( '/register') || req.path.startsWith( '/info')) {
        next();
    }
    else if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    else {
        try {           
            var decoded = jwt.verify(req.headers.authorization.replace('Bearer ', ''), jwtKey);
            if (!decoded.role === 1  && req.path.startsWith( '/admin')) {
                return res.status(403).json({ error: 'No credentials sent!' });        
            }
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
app.post('/admin/insert', adminCtrl.insertNewProduct);
app.get('/products', productsCtrl.getProducts);
app.post('/products/id', productsCtrl.getProductById);
app.post('/admin/update', adminCtrl.updateProduct);
app.post('/products/filter', productsCtrl.getProductsWithfilter);
app.post('/info/quantity', infoCtrl.getQuantity);
app.delete('cart/cartItem/:cartId/:itemId', cartCtrl.deleteCartItem);

app.listen(PORT, () => {
    console.log('Listening on ',PORT);
});
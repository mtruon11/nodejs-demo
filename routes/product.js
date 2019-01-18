const express = require('express');
const router = express.Router();
const shuffle = require('shuffle-array');

//Load Product model
const Product = require('../models/Product');

//All Products
router.get('/', (req, res) =>{

    Product.find({status: true}, (err, products) => {
        if(err){
            console.log('Error while loading products')
        } else {
            res.status(200).render('./home/products', {
                user: req.user,
                products: shuffle(products)
            })
        }
    });

});

//Specific Product
router.get('/:sku', (req, res) => {

    Product.find({sku: req.params.sku}, (err, product) => {
        if(err) {
            console.log('Error while loading product')
        } else {
            res.status(200).render('./home/product-detail', {
                user: req.user,
                product: product
            })
        }
    });
});


//Sale
router.get('/onSale', (req, res) => res.render('./home/products'));

module.exports = router;
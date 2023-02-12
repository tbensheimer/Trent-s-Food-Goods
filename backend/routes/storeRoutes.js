const express = require('express');
const {getAllProducts, getProductDetails, createProduct} = require("../controllers/storeController");


const router = express.Router();

router.get('/products', getAllProducts)

router.get('/products/product/:id', getProductDetails)

router.post('/products', createProduct)

module.exports = router;

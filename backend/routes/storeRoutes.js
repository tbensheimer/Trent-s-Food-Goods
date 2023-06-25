const express = require('express');
const {getAllProducts, getProductDetails, createProduct, updateProduct } = require("../controllers/storeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// router.use(requireAuth);

router.get('/products', getAllProducts)

router.get('/products/product/:id', getProductDetails)

router.post('/products', createProduct)

router.post('/edit-product/:id', updateProduct)

module.exports = router;

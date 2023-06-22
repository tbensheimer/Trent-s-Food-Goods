const express = require('express');
const {getAllProducts, getProductDetails, createProduct, getAdminList, updateAdminList, updateProduct } = require("../controllers/storeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// router.use(requireAuth);

router.get('/products', getAllProducts)

router.get('/products/product/:id', getProductDetails)

router.post('/products', createProduct)

router.post('/edit-product/:id', updateProduct)

router.get('/admins', getAdminList)

router.post('/adminList', updateAdminList)

// router.get('/home', getHomeDetails)

// router.post('/home', updateHomePage);

// router.get('/about', getAboutDetails)

// router.post('/about', updateAboutPage);

module.exports = router;

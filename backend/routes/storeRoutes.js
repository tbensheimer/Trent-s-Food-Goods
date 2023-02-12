const express = require('express');
const requireAuth = require("../middleware/requireAuth");


const router = express.Router();

router.get('/products', {})

router.get('/products/product/:id', {})

router.post('/products', {})

module.exports = router;

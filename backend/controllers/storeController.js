const Product = require('../models/Product');
const mongoose = require('mongoose')

const getAllProducts = async (req, res) => {
try {
const products = await Product.find();

res.status(200).json({products});
} 
catch (error) {
    res.status(400).json({error: error.message})
}
}

module.exports = {
    getAllProducts
}

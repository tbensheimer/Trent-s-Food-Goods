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

const getProductDetails = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such workout with given Id"});
    }
    const product = await Product.findById(id);

    if(!product) {
        return res.status(400).json({error: "Product could not be found"})
    }
    res.status(200).json(product)
}

const createProduct = async (req, res) => {
    const {title, description, price, image} = req.body;

    try {
        const product = await Product.create({name: title, description, price, image})
        res.status(200).json(product);
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllProducts,
    getProductDetails,
    createProduct
}

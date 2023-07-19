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
        return res.status(400).json({error: "No such product with given Id"});
    }
    const product = await Product.findById(id);

    if(!product) {
        return res.status(400).json({error: "Product could not be found"})
    }
    res.status(200).json(product)
}

const createProduct = async (req, res) => {
    const {name, description, price, stripeId, image, fat, protein, salt, carbs, storage } = req.body;

    try {
        Product.validateProduct(name, description, price, stripeId, fat, protein, salt, carbs, storage);

        const product = await Product.create({name, description, price, price_id: stripeId, image, fat, protein, salt, carbs, storage});

        if(product) {
        res.status(200).json({success: true, _id: product._id});
        }
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateProduct = async (req, res) => {
    const {id, name, description, price, stripeId, image, fat, protein, salt, carbs, storage } = req.body;

    try {
        Product.validateProduct(name, description, price, stripeId, fat, protein, salt, carbs, storage);

        const product = await Product.findById(id);

        product.name = name;
        product.description = description;
        product.price = price;
        product.price_id = stripeId;
        product.image = image;
        product.fat = fat;
        product.protein = protein;
        product.salt = salt;
        product.carbs = carbs;
        product.storage = storage;

        const updatedProduct = await Product.findByIdAndUpdate(id, product);

        if(updatedProduct) {
            res.status(200).json({success: true, _id: product._id});
        }
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const removeProduct = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.id.trim());

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such product with given Id"});
    }

    try {
    const product = await Product.findByIdAndRemove(id);

    if(product) {
        res.status(200).json({success: "Product removed successfully!"})
    } 
} catch (error) {
    res.status(400).json({error: error.message});
}
}

module.exports = {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    removeProduct
}

const validator = require('validator');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    price_id: {
        type: String,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    salt: {
        type: Number,
        required: true
    },
    storage: {
        type: String,
        required: true,
    }
});

productSchema.statics.validateProduct = function(name, description, price, stripeId, fat, protein, salt, carbs, storage) {
        if(!name || !description || !price || !stripeId || !fat || !protein || !salt || !carbs || !storage) {
            throw Error("Please fill all fields");
        }

        if(!validator.isNumeric(price.toString()) || !validator.isNumeric(fat.toString()) || !validator.isNumeric(protein.toString()) || !validator.isNumeric(carbs.toString()) || !validator.isNumeric(salt.toString())) {
            throw Error("Please enter only number values for the fields: price, fat, protein, salt, carbs");
        }
}

module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String,
    required: true
}
});

module.exports = mongoose.model('User', userSchema);

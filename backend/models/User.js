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
},
admin: {
    type: Boolean
}
});

userSchema.statics.signup = async function (email, password) {

    if(!email || !password) {
        throw Error("Please fill all fields");
    }

    if(!validator.isEmail(email)) {
        throw Error("Please enter valid email");
    }
    if(!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }

const isMatch = await this.findOne({email})

if(isMatch) {
    throw Error("An account exists for this email");
}

const salt = await bcrypt.genSalt(12);

const hashed = await bcrypt.hash(password, salt);

const user = await this.create({email, password: hashed});

if(user) {
    return user;
}
else {
    throw Error("There was an error creating user");
}
}

userSchema.statics.login = async function (email, password) {

    if(!email || !password) {
        throw Error("Please fill all fields");
    }

    if(!validator.isEmail(email)) {
        throw Error("Please enter valid email");
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error("Wrong Email or Password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch) {
        return user;
    }
    else {
        throw Error("Wrong Email or Password");
    }

}

module.exports = mongoose.model('User', userSchema);

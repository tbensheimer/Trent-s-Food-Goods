const User = require("../models/User");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

const signupUser = async (req, res) => {
    
    try {
    const {email, password} = req.body;

    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({email, token});
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token, admin: user.admin});
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}


const getUserList = async (req, res) => {
    try {
        const users = await User.find().sort({"admin": -1});
        
        res.status(200).json({users});
        } 
        catch (error) {
            res.status(400).json({error: error.message})
        }
}

const updateUserList = async (req, res) => {
    const id = mongoose.Types.ObjectId(req.body);

    try {
    let user = await User.findById(id);

    if(user) {
        user.admin = !user.admin;

        await User.findByIdAndUpdate(id, user);

        const users = await User.find().sort({"admin": -1});

        res.status(200).json({users});
    }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginUser, signupUser, getUserList, updateUserList};

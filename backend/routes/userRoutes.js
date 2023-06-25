const express = require('express');
const {loginUser, signupUser, getUserList, updateUserList} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get('/users', getUserList)

router.post('/admin', updateUserList)

module.exports = router;

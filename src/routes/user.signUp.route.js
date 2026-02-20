const express = require('express');
const router = express.Router();

const { userSignUp } = require("../controllers/user.signup.controller");

router.post('/register', userSignUp);

module.exports = router;
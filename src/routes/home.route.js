const {verifyToken} = require("../middlewares/user.checkToken.middleware");
const app = require("express");
const router = app.Router();
const {homeController} = require("../controllers/home.controller");

router.get('/home', verifyToken, homeController);

module.exports = router ;
const app = require("express");
const router = app.Router();
const {userLogin} = require("../controllers/user.login.controller");
const {verifyToken} = require("../middlewares/user.checkToken.middleware");

router.post('/login' , userLogin);

module.exports = router ;

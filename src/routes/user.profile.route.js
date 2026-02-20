const {verifyToken} = require("../middlewares/user.checkToken.middleware");
const app = require("express");
const {userProfileController} = require("../controllers/user.profile.controller");
const router = app.Router();

router.get('/profile', verifyToken, userProfileController);

module.exports = router ;
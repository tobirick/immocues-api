const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const checkAdmin = require("../middleware/checkAdmin");

const UserController = require("../controllers/users");

router.post("/signup", checkAuth, checkAdmin, UserController.signUpUser);
router.post("/login", UserController.loginUser);
router.post("/validate_token", UserController.validateJWTToken);

module.exports = router;

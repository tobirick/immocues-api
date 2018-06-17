const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");

router.post("/signup", UserController.signUpUser);
router.post("/login", UserController.loginUser);
router.post("/validate_token", UserController.validateJWTToken);

module.exports = router;

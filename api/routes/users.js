const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const checkAdmin = require("../middleware/checkAdmin");

const UserController = require("../controllers/users");

router.get("/", checkAuth, checkAdmin, UserController.getAllUsers);
router.post("/signup", checkAuth, checkAdmin, UserController.signUpUser);
router.post("/login", UserController.loginUser);
router.post("/validate_token", UserController.validateJWTToken);
router.put("/:userId", checkAuth, checkAdmin, UserController.updateUserByID);
router.delete("/:userId", checkAuth, checkAdmin, UserController.deleteUserByID);

module.exports = router;

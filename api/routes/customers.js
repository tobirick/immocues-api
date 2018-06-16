const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/customers");

router.get("/", CustomerController.getAllCustomers);
router.post("/", CustomerController.createCustomer);

module.exports = router;

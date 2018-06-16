const express = require("express");
const router = express.Router();

const CustomerController = require("../controllers/customers");

router.get("/", CustomerController.getAllCustomers);
router.post("/", CustomerController.createCustomer);
router.get("/:customerId", CustomerController.getCustomerByID);
router.put("/:customerId", CustomerController.updateCustomerByID);
router.delete("/:customerId", CustomerController.deleteCustomerByID);

module.exports = router;

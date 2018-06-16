const mongoose = require("mongoose");
const Customer = require("../models/customer");

exports.getAllCustomers = (req, res, next) => {
  Customer.find()
    .select("-__v")
    .exec()
    .then(customers => {
      const response = {
        customers
      };
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
};

exports.createCustomer = (req, res, next) => {
  console.log(req.body);
  const customer = new Customer({
    ...req.body.customer,
    _id: new mongoose.Types.ObjectId()
  });

  customer
    .save()
    .then(customer => {
      const response = {
        message: "Customer successfully created!",
        customer
      };
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

exports.getCustomerByID = (req, res, next) => {
  const id = req.params.customerId;
  Customer.findById(id)
    .select("-__v")
    .exec()
    .then(customer => {
      if (customer) {
        const response = {
          customer
        };
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

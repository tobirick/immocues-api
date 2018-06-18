const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signUpUser = (req, res, next) => {
  User.find({ email: req.body.user.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "E-Mail already exists"
        });
      } else {
        bcrypt.hash(req.body.user.password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({ error });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              ...req.body.user,
              password: hash,
              createdBy: req.currentUser.userId
            });
            user
              .save()
              .then(userData => {
                const { password, __v, ...user } = userData._doc;
                const response = {
                  user
                };

                res.status(201).json(response);
              })
              .catch(error => {
                res.status(500).json({ error });
              });
          }
        });
      }
    });
};

exports.loginUser = (req, res, next) => {
  User.find({ email: req.body.credentials.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      } else {
        bcrypt.compare(
          req.body.credentials.password,
          user[0].password,
          (error, result) => {
            if (error) {
              return res.status(401).json({
                message: "Auth failed"
              });
            }
            if (result) {
              const loggedInUser = {
                email: user[0].email,
                userId: user[0]._id,
                isAdmin: user[0].isAdmin,
                firstName: user[0].firstName,
                lastName: user[0].lastName
              };
              const token = jwt.sign(loggedInUser, process.env.JWT_KEY, {
                expiresIn: "1h"
              });
              const response = {
                message: "Auth successful",
                token,
                user: loggedInUser
              };
              return res.status(200).json(response);
            }
            res.status(401).json({
              message: "Auth failed"
            });
          }
        );
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

exports.validateJWTToken = (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWT_KEY, err => {
    if (err) {
      res.status(401).json({
        message: "Invalid token"
      });
    } else {
      res.json({
        message: "Valid token"
      });
    }
  });
};

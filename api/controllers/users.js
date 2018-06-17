const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signUpUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "E-Mail already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({ error });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(user => {
                const response = {
                  user: {
                    _id: user._id,
                    email: user.email
                  }
                };

                res.status(201).json(response);
              })
              .catch(error => {
                res.status(500).json(error);
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
              const token = jwt.sign(
                { email: user[0].email, userId: user[0]._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
              );
              const response = {
                message: "Auth successful",
                token,
                user: {
                  _id: user[0]._id,
                  email: user[0].email
                }
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
      res.status(500).json(error);
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

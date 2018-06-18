const User = require("../models/user");

module.exports = (req, res, next) => {
  const id = req.body.currentUser._id;
  User.find({ _id: id })
    .exec()
    .then(user => {
      if (!user.isAdmin) {
        return res.status(401).json({
          message: "No Authorization to do that!"
        });
      } else if (user.isAdmin) {
        next();
      }
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};

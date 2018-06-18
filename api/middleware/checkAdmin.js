const User = require("../models/user");

module.exports = (req, res, next) => {
  const id = req.currentUser.userId;
  User.find({ _id: id })
    .exec()
    .then(user => {
      if (!user[0].isAdmin) {
        return res.status(401).json({
          message: "No Authorization to do that!"
        });
      } else if (user[0].isAdmin) {
        next();
      }
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    test: "hey was geht"
  });
});

module.exports = router;

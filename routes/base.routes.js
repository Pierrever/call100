const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("base");
  res.redirect("/products");
});

module.exports = router;

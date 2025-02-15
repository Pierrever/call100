const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("base");
  res.redirect("/products");
});

router.get("/401", (req, res) => {
  res.render("shared/401");
});

router.get("/403", (req, res) => {
  res.render("shared/403");
});

module.exports = router;

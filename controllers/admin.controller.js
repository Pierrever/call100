const Product = require("../models/product.model");
function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res) {
  const product = new Product({ ...req.body, image: req.file.filename });

  res.redirect("/admin/products");
  await product.save();
}

module.exports = {
  getProducts,
  createNewProduct,
  getNewProduct,
};

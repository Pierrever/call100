const Product = require("../models/product.model");

async function getProducts(req, res) {
  const products = await Product.findAll();
  res.render("admin/products/all-products", { products: products });
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

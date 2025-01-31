const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products });
  } catch (err) {
    next(err);
  }
}

async function getProductDetails(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("customer/products/product-details", { product });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProducts, getProductDetails };

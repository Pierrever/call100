const db = require("../data/database");

class Product {
  constructor(product) {
    this.title = product.title;
    this.summary = product.summary;
    this.price = +product.price;
    this.description = product.description;
    this.image = product.image;
    this.imagepath = `product-data/images/${product.image}`;
    this.imageurl = `/products/assets/images/${product.image}`;
  }
  async save() {
    const productData = {
      title: this.title,
      image: this.image,
      price: this.price,
      description: this.description,
      summary: this.summary,
    };
    db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;

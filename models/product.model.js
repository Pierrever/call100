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
    if (product._id) {
      this.id = product._id.toString();
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    console.log("xuxu " + products);
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }
  async save() {
    const productData = {
      title: this.title,
      image: this.image,
      price: this.price,
      description: this.description,
      summary: this.summary,
    };
    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;

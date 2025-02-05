const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  constructor(product) {
    this.title = product.title;
    this.summary = product.summary;
    this.price = +product.price;
    this.description = product.description;
    this.image = product.image;
    this.updateImageData();
    if (product._id) {
      this.id = product._id.toString();
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("bad bad");
      throw error;
    }
    return new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    console.log("xuxu " + products);
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });
    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();
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

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }
      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: productId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  updateImageData() {
    this.imagepath = `product-data/images/${this.image}`;
    this.imageurl = `/products/assets/images/${this.image}`;
  }
  f;
  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  remove() {
    const prId = new mongodb.ObjectId(this.id);
    console.log("del " + prId);
    return db.getDb().collection("products").deleteOne({ _id: prId });
  }
}

module.exports = Product;

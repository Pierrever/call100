const express = require("express");
const adminController = require("../controllers/admin.controller");
const imageUploadMiddleware = require("../middlewares/image-upload");

const router = express.Router();

router.get("/products", adminController.getProducts);
router.get("/products/new-product", adminController.getNewProduct);
router.get("/products/:id", adminController.getUpdateProduct);
router.post(
  "/products/:id",
  imageUploadMiddleware,
  adminController.updateProduct
);
router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

router.delete("/products/:id", adminController.deleteProduct);

router.get("/orders", adminController.getOrders);

router.patch("/orders/:id", adminController.updateOrder);

module.exports = router;

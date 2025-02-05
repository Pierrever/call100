const express = require("express");
const csurf = require("csurf");
const path = require("path");
const expressSession = require("express-session");
const authRoutes = require("./routes/auth.routes");
const prodsRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const baseRoutes = require("./routes/base.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");
const checkAuthStatusMw = require("./middlewares/check-auth");
const protectRoutes = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");

const db = require("./data/database");
const addCsrfTokenMw = require("./middlewares/csrf-token");
const errorHandleMw = require("./middlewares/error-handler");
const createSessionConfig = require("./config/session");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csurf());
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(addCsrfTokenMw);
app.use(checkAuthStatusMw);

app.use(baseRoutes);
app.use(authRoutes);
app.use(prodsRoutes);
app.use("/cart", cartRoutes);

app.use(protectRoutes);
app.use("/admin", adminRoutes);
app.use("/orders", ordersRoutes);

app.use(errorHandleMw);

db.connectToDatabase()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

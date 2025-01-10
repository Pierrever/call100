const express = require("express");
const csurf = require("csurf");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const db = require("./data/database");
const addCsrfTokenMw = require("./middlewares/csrf-token");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(csurf());
app.use(addCsrfTokenMw);
app.use(authRoutes);

db.connectToDatabase()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

const Order = require("../models/orders.model");
const User = require("../models/user.model");

function getOrders(req, res) {
  res.render("customer/orders/all-orders");
}

async function addOrder(req, res) {
  const cart = res.locals.cart;
  const userDoc = await User.findById(res.locals.uid);
  const order = new Order(cart, userDoc);

  order.save();

  res.redirect("/orders");
}

module.exports = { addOrder, getOrders };

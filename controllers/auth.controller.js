const User = require("../models/user.model");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.pw,
    req.body.fullname,
    req.body.street
  );
  await user.signup();
  res.redirect("./login");
}

function getUserWithSameEmail() {
  return db.getDb().collection("users").findOne({ email: this.email });
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.pw);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    res.redirect("/login");
    return;
  }
  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.pw);

  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
};

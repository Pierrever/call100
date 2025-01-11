const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  const user = new User(
    req.body.email,
    req.body.pw,
    req.body.fullname,
    req.body.street
  );
  if (
    !validation.uCrValid(req.body.email, req.body.pw, req.body.fullname) ||
    !validation.emailConfirmed(req.body.email, req.body.cfemail)
  ) {
    res.redirect("/signup");
    return;
  }

  try {
    const eA = await user.existsAlready();
    if (eA) {
      res.redirect("/signup");
      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("./login");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

function logout(req, res) {
  authUtil.destroyUSession(req);
  res.redirect("/");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.pw);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

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
  logout,
};

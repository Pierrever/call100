const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSession(req);

  if (!sessionData) {
    sessionData = { email: "", pw: "", street: "", name: "" };
  }
  // console.log(">>> " + sessionData.pw);
  res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    pw: req.body.pw,

    name: req.body.fullname,
    street: req.body.street,
  };
  console.log(req.body.street);
  const user = new User(
    req.body.email,
    req.body.pw,
    req.body.street,
    req.body.fullname
  );
  console.log(`${req.body.email}---${req.body.cfemail}`);
  if (
    !validation.uDetailsValid(req.body.email, req.body.pw, req.body.fullname) ||
    !validation.emailConfirmed(req.body.email, req.body.cfemail)
  ) {
    console.log(`${req.body.email}---${req.body.cfemail}`);
    sessionFlash.flashDataToSession(
      req,
      { errorMessage: "Check your input, different pw", ...enteredData },
      () => res.redirect("/signup")
    );

    return;
  }

  try {
    const eA = await user.existsAlready();
    if (eA) {
      sessionFlash.flashDataToSession(
        req,
        { errorMessage: "User exists already", ...enteredData },
        () => res.redirect("/signup")
      );

      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSession(req);
  if (!sessionData) {
    sessionData = { email: "", pw: "" };
  }

  res.render("customer/auth/login", { inputData: sessionData });
}

function logout(req, res) {
  authUtil.destroyUSession(req);
  res.redirect("/");
}

async function login(req, res) {
  console.log(`___ ${req.body.email} ${req.body.pw}`);
  const user = new User(req.body.email, req.body.pw);
  let existingUser;
  console.log("dlfjdalfkjdaslkjfdas");
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  const sessionEData = {
    message: "User doesn't exist",
    email: user.email,
    pw: user.pw,
  };

  if (!existingUser) {
    console.log("not exist");
    sessionFlash.flashDataToSession(req, sessionEData, () =>
      res.redirect("/login")
    );

    return;
  }
  console.log("nnn" + existingUser.pw);
  const passwordIsCorrect = await user.hasMatchingPassword(existingUser.pw);

  if (!passwordIsCorrect) {
    sessionEData.message = "Bad password";
    sessionFlash.flashDataToSession(req, sessionEData, () =>
      res.redirect("/login")
    );

    return;
  }

  console.log("hello " + existingUser.email);

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

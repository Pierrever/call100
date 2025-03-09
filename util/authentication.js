function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  console.log({ ...user });
  req.session.isAdmin = user.isAdmin;
  console.log(req.session.uid + " login");
  req.session.save(action);
}

function destroyUSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession,
  destroyUSession,
};

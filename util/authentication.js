function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.isAdmin = user.isAdmin;
  console.log(req.session.uid + " hulic");
  req.session.save(action);
}

function destroyUSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession,
  destroyUSession,
};

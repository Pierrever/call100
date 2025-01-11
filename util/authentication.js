function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
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

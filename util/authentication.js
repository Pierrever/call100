function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  console.log(req.session.uid + " hulic");
  req.session.save(action);
}

module.exports = {
  createUserSession,
};

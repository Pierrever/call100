const db = require("../data/database");
class User {
  constructor(email, pw, fullname, street) {
    this.email = email;
    this.pw = pw;
    this.fullname = fullname;
    this.street = street;
  }

  signup() {
    db.getDb()
      .collection("users")
      .insertOne({
        email: this.email,
        pw: this.pw,
        fullname: this.fullname,
        street: this.street,
      });
  }
}

const db = require("../data/database");
const bcrypt = require("bcryptjs");

class User {
  constructor(email, pw, fullname, street) {
    this.email = email;
    this.pw = pw;
    this.fullname = fullname;
    this.street = street;
  }

  async signup() {
    const hPw = await bcrypt.hash(this.pw, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      pw: hPw,
      fullname: this.fullname,
      street: this.street,
    });
  }
}

module.exports = User;

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
    console.log(this.pw);
    // this.pw = "kuk";
    console.log(await bcrypt.compare(this.pw, await bcrypt.hash(this.pw, 12)));
    const hPw = await bcrypt.hash(this.pw, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      pw: hPw,
      fullname: this.fullname,
      street: this.street,
    });
  }

  async hasMatchingPassword(hashedPw) {
    console.log("jurik" + this.pw + (await bcrypt.compare(this.pw, hashedPw)));
    return await bcrypt.compare(this.pw, hashedPw);
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    return await this.getUserWithSameEmail();
  }
}

module.exports = User;

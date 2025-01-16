function uDetailsValid(email, pw, name) {
  return (
    email &&
    email.includes("@") &&
    pw &&
    pw.trim().length > 5 &&
    name &&
    name !== ""
  );
}

function emailConfirmed(email, cfEmail) {
  console.log("ddd> " + cfEmail === email);
  return cfEmail === email;
}

module.exports = { emailConfirmed, uDetailsValid };

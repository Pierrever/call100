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
  return cfEmail === email;
}

module.exports = { emailConfirmed, uDetailsValid };

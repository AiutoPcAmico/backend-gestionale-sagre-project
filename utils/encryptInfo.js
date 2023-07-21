import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALTROUNDS);

async function encryptPassword(plainPassword) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainPassword, salt);

  return { salt, hash };
  // Store hash in your password DB.
}

async function verifyPassword(plainPassword, hashedDBPassword) {
  const state = await bcrypt
    .compare(plainPassword, hashedDBPassword)
    .catch((err) => console.error("[ERR] - Error during check Password"));
  return state;
}

export { encryptPassword, verifyPassword };

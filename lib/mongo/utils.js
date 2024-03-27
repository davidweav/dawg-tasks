import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const saltRounds = 10; // Can change the # of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

import bcrypt from 'bcrypt';
import { decrypt } from 'dotenv';
import { format } from "date-fns";

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function hashPassword(password) {
  const saltRounds = 10; // Can change the # of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

export default function formatDate(dateString) {
  // Parse the MongoDB date string into a Date object
  const date = new Date(dateString);
  
  // Format the date using date-fns
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}
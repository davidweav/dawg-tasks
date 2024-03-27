import { UserModel } from '../../../models';
import bcrypt from 'bcrypt';

export async function signIn(usernameOrEmail, password) {
  // Check if usernameOrEmail is an email or username
  const query = usernameOrEmail.includes('@') ? { email: usernameOrEmail } : { username: usernameOrEmail };

  // Find the user by email or username
  const user = await UserModel.findOne(query);
  if (!user) {
    throw new Error('User not found.');
  }

  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password.');
  }

  // Return the authenticated user
  return user;
}
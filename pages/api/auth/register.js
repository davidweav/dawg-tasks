import UserModel from '../models';

export async function register(req, res) {
  // Validate email format
  console.log('Email:', email);

  // Check if the user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists.');
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create a new user document
  const newUser = new UserModel({ username, email, password: hashedPassword });
  await newUser.save();
}
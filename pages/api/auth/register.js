import UserModel from '../models';

export async function register(username, email, password) {
  // Validate email format
  console.log('Email:', email);
  if (!email.match(/^[a-zA-Z0-9._%+-]+@uga\.edu$/)) {
    throw new Error('Please use a valid uga.edu email address for registration.');
  }

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
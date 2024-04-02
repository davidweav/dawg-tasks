import UserModel from '../../models/user.js';
import connectToDatabase from './mongo.js';
import { hashPassword } from './utils.js';

connectToDatabase()
  .then(() => { 
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

export async function register(username, email, password) {
  // Validate email format
  if (!email.match(/.*uga\.edu$/)) {
    throw new Error('Please use a valid uga.edu email address for registration.');
  }

  // Create a new user document
  const hashedPassword = await hashPassword(password);
  const newUser = new UserModel({ username, email, hashedPassword });
  console.log(newUser.username, newUser.email, newUser.hashedPassword);
  await newUser.save();
}

export async function signIn(usernameOrEmail, password) {
  // Check if usernameOrEmail is an email or username
  const query = usernameOrEmail.includes('@') ? { email: usernameOrEmail } : { username: usernameOrEmail };

  // Find the user by email or username
  const user = await UserModel.findOne(query);

  if (!user) {
    throw new Error('User not found.');
  }

  // Check if the password matches
  if (user.password !== password) {
    throw new Error('Incorrect password.');
  }

  // User authentication successful
  return user;
}
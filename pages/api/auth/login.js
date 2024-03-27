import { UserModel } from '../../../models';
import connectToDatabase from '../../../lib/mongo/mongo.js';
import jwt from 'jsonwebtoken';
import { comparePasswords } from './utils.js';

connectToDatabase()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

export async function logIn(usernameOrEmail, password) {
  try {
    if (req.method === 'POST') {
      // Check if usernameOrEmail is an email or username
      const query = usernameOrEmail.includes('@')
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail };

      // Find the user by email or username
      const user = await UserModel.findOne(query);
      if (!user) {
        throw new Error('User not found.');
      }

      // Compare passwords
      const passwordMatch = await comparePasswords(password, user.password);
      if (!passwordMatch) {
        throw new Error('Incorrect password.');
      }

      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      

      // Return the authenticated user
      res.status(200).json({ token });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
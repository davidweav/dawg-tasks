import { UserModel } from '../../../models';
import connectToDatabase, { disconnectFromDatabase } from '../../../lib/mongo/mongo.js';
import jwt from 'jsonwebtoken';
import { comparePasswords } from '../../../lib/mongo/utils';


await connectToDatabase()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      
      // Extract user data from request body
      const { username, password } = req.body;
      console.log(username, password);

      const user = await UserModel.findOne({username});

      if (!user) {
        throw new Error('User not found');
      }

    
      const passwordsMatch = await comparePasswords(password, user.password);
      
      console.log(password)
      console.log(user.password)
      if (passwordsMatch) {
        const token = jwt.sign({ username: user.username}, 'key');
      
        // Calculate expiration time for the cookie (5 minutes from now)
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + (5 * 60 * 1000)); // 5 minutes in milliseconds

        res.setHeader('Set-Cookie', `token=${token}; Expires=${expirationTime.toUTCString()}; Path=/; HttpOnly; SameSite=Strict`)
        // Registration successful response
        res.status(200).json({ message: 'User signed in successfully'});
        console.log("user signed in successfully");
      }
      else {
        // Passwords Dont match
        res.status(400).json({ message: 'Passwords do not match'});
        console.log("Password mismatch");
      }
    
    } catch (error) {
      
      console.error(error);
      res.status(400).json({ message: error.message }); // Handle registration errors
    
    }
  } else {
    
    // Handle other HTTP methods (optional)
    res.status(405).json({ message: 'Method not allowed' });
  }
}

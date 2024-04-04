import UserModel from '../../../models/user.js';
import connectToDatabase from '../../../lib/mongo/mongo.js';
import { hashPassword } from '../../../lib/mongo/utils.js';
import jwt from 'jsonwebtoken'


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
      const { username, email, password } = req.body;
      console.log(username, email, password);
      
      // Validate email format
      if (!email.match(/.*uga\.edu$/)) {
        throw new Error('Please use a valid uga.edu email address for registration.');
      }

      // Hash the password using the imported function
      const hashedPassword = await hashPassword(password);
      const newUser = new UserModel({ username, email, password: hashedPassword });
      
      // Save the new user to the database
      console.log("saving user");
      await newUser.save();


      const token = jwt.sign({ username: newUser.username}, 'key');
      
      // Calculate expiration time for the cookie (5 minutes from now)
       const expirationTime = new Date();
       expirationTime.setTime(expirationTime.getTime() + (5 * 60 * 1000)); // 5 minutes in milliseconds

      res.setHeader('Set-Cookie', `token=${token}; Expires=${expirationTime.toUTCString()}; Path=/; HttpOnly; SameSite=Strict`)
      // Registration successful response
      res.status(200).json({ message: 'User registered successfully'});
      console.log("user registered successfully");
    
    } catch (error) {
      
      console.error(error);
      res.status(400).json({ message: error.message }); // Handle registration errors
    
    }
  } else {
    
    // Handle other HTTP methods (optional)
    res.status(405).json({ message: 'Method not allowed' });
  }
}

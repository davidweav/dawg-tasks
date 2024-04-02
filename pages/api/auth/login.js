import { UserModel } from '../../../models';
import connectToDatabase, { disconnectFromDatabase } from '../../../lib/mongo/mongo.js';
import jwt from 'jsonwebtoken';
import { comparePasswords } from '../../../lib/mongo/utils';



// export default async function login(res, req) {
//   try {
//     if (req.method === 'POST') {
//       print(res);
//       const { username, password } = req.body;
//       console.log("test");
//       // Find the user by email or username
//       const user = await UserModel.findOne(username);
//       if (!user) {
//         throw new Error('User not found.');
//       }

//       // Compare passwords
//       const passwordMatch = await comparePasswords(password, user.password);
//       if (!passwordMatch) {
//         throw new Error('Incorrect password.');
//       }
//       res.statusCode = 200;
//       res.json({ message: 'User registered successfully'});
//     } else {
//       res.status(400).json({ message: error.message }); // Handle registration errors
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ message: error.message }); // Handle registration errors

//   }
// }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // await connectToDatabase()
      //   .then(() => {
      //     console.log('Connected to the database');
      //   })
      //   .catch((error) => {
      //     console.error('Error connecting to the database:', error);
      //     process.exit(1);
      //   });
      // Extract user data from request body
      const { username, password } = req.body;
      console.log(username, password);
      
      // // Validate email format
      // if (!email.match(/.*uga\.edu$/)) {
      //   throw new Error('Please use a valid uga.edu email address for registration.');
      // }

      

      // Registration successful response
      res.status(200).json({ message: 'User registered successfully'});
      console.log("user registered successfully");
      // await disconnectFromDatabase();
    
    } catch (error) {
      
      console.error(error);
      res.status(400).json({ message: error.message }); // Handle registration errors
    
    }
  } else {
    
    // Handle other HTTP methods (optional)
    res.status(405).json({ message: 'Method not allowed' });
  }
}

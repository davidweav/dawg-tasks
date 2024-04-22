import PostModel from '../../../models/post.js';
import connectToDatabase from '../../../lib/mongo/mongo.js';
import jwt from 'jsonwebtoken';

await connectToDatabase()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  });

console.log("hello");
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      
        // Extract post data from request body
        const { subject, body, dueDate, price } = req.body;

      
        // Retrieve session token from request cookies
        const token = req.cookies.token;

        // Verify and decode the token
        const decodedToken = jwt.verify(token, 'key');

        // Extract user data from the token payload
        const { username, userId } = decodedToken;
        const newPost = new PostModel({ subject, body, dueDate, price, user: userId, status: "Unclaimed", statusMsg: "No Message"});
      
        // Save the new user to the database
        console.log("saving post");
        await newPost.save();


        // Registration successful response
        res.status(200).json({ message: 'Post created successfully'});
        console.log("Post created successfully");
    
    } catch (error) {
      
      console.error(error);
      res.status(400).json({ message: error.message }); // Handle registration errors
    
    }
  } else {
    
    // Handle other HTTP methods (optional)
    res.status(405).json({ message: 'Method not allowed' });
  }
}

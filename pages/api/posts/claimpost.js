import PostModel from "@/models/post";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {
          
            // Extract post data from request body
            const {reqMsg, post} = req.body;

            // Retrieve session token from request cookies
            const token = req.cookies.token;

            // Verify and decode the token
            const decodedToken = jwt.verify(token, 'key');

            // Extract user data from the token payload
            const { username, userId } = decodedToken;

            const updatePost = await PostModel.findByIdAndUpdate(
                post,
                { $set: {status: 'requested', statusMsg: reqMsg, requestingUser: userId }},
                { new: true }
            )
            
            if (!updatePost) {
                return res.status(404).json({ success: false, message: 'Post not found' });
              }
          
            // Return the updated post
 
            res.status(200).json({ success: true, data: updatePost });
        
        } catch (error) {
          
          console.error(error);
          res.status(400).json({ message: error.message }); // Handle registration errors
        
        }
      } else {
        
        // Handle other HTTP methods (optional)
        res.status(405).json({ message: 'Method not allowed' });
      }
}
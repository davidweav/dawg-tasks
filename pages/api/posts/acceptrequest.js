import PostModel from "@/models/post";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {

    if (req.method === 'POST') {
        try {
          
            // Extract post data from request body
            const {postId, isAccepted} = req.body;

        
            if (!isAccepted) {
              const updatePost = await PostModel.findByIdAndUpdate(
                postId,
                { $set: {status: 'Unclaimed', statusMsg: ""}},
                { new: true }
              )
              return res.status(200).json({ success: true, data: updatePost });
            }
            else {
              const updatePost = await PostModel.findByIdAndUpdate(
                postId,
                { $set: {status: 'claimed', statusMsg: ""}},
                { new: true }
            )
            
            if (!updatePost) {
                return res.status(404).json({ success: false, message: 'Post not found' });
              }
          
            // Return the updated post
            return res.status(200).json({ success: true, data: updatePost });

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
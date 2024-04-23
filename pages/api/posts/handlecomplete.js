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

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { reqMsg, post } = req.body;
      const token = req.cookies.token;
      const decodedToken = jwt.verify(token, 'key');
      const { username, userId } = decodedToken;
      // Delete the post if completed

      const deletePost = await PostModel.findByIdAndDelete(post);

      if (!deletePost) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      res.status(200).json({ success: true, message: 'Post deleted successfully' });

      if (!updatePost) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      res.status(200).json({ success: true, data: updatePost });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
}
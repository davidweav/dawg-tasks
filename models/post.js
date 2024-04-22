import mongoose from 'mongoose';
import User from './user';
const { Schema } = mongoose;

let PostModel;

if (mongoose.models.Post) {
  PostModel = mongoose.model('Post');
} else {
  const PostSchema = new mongoose.Schema({
    subject: { 
      type: String, 
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'Credential', // Link to the User schema
        required: true,
    },
    status: {
      type: String,
      required: true
    },
    statusMsg: {
      type: String, // Optional field for status message
      required: true,
    },
    requestingUser: {
        type: Schema.Types.ObjectId, 
        ref: 'Credential', // Link to the User schema
    
    }
  });

  PostModel = mongoose.model('Post', PostSchema);

}

export default PostModel;
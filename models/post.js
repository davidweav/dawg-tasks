import mongoose from 'mongoose';

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
        type: String,
        required: true,
    },
    status: {
      type: String,
      required: true
    },
    
  });

  PostModel = mongoose.model('Post', PostSchema);

}

export default PostModel;
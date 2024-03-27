import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define user schema
const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.*uga\.edu$/
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 30 },
});


const UserModel = mongoose.model('Credential', UserSchema);

export default UserModel;

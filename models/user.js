import mongoose from 'mongoose';

const { Schema } = mongoose;

let UserModel;

if (mongoose.models.Credential) {
  UserModel = mongoose.model('Credential');
} else {
  const UserSchema = new mongoose.Schema({
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
      required: true
    },
    
  });

  UserModel = mongoose.model('Credential', UserSchema);

}
export default UserModel;

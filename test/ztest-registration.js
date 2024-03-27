import { register } from '../lib/mongo/auth.js';
import connectToDatabase from '../lib/mongo/mongo.js';

// Example registration data
const username = 'davidweav';
const email = 'example@uga.edu';
const password = 'password123';

// Register user
async function testRegistration() {
  try {
    
    await register(username, email, password);
    console.log('User registered successfully');

    // Verification using findOne
    const user = await UserModel.findOne({ email });
    if (user) {
      console.log('User found in database:', user.username, user.email);
    } else {
      console.error('Error verifying user in database');
    }
  } catch (error) {
    console.error('Error registering user:', error.message);
  }
}

await connectToDatabase()
// Call the registration function
testRegistration();
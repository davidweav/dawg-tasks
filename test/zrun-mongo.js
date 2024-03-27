import connectToDatabase from '../lib/mongo/mongo.js';

// Connect to MongoDB
async function runMongo() {
  try {
    await connectToDatabase();
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the MongoDB connection function
runMongo();
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import mongoose from 'mongoose';
config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please add your Mongo URI to .env.local');


async function connectToDatabase() {
  await mongoose.connect(MONGODB_URI);
  return mongoose.connection;
}

export default connectToDatabase;

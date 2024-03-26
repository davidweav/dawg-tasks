import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please add your Mongo URI to .env.local');


async function connectToDatabase(dbName, collectionName) {
  const client = new MongoClient(MONGODB_URI);

  if (process.env.NODE_ENV !== 'production') {
    if (!global._mongoClientPromise) {
      // if there is a connection established, use that connection
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise.then((client) => client.db(dbName).collection(collectionName));
    
  } else {
    return client.connect().then((client) => client.db(dbName).collection(collectionName));
  }
}

export default connectToDatabase;

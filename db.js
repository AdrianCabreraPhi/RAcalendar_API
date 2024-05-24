const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'birthdays';
const collectionName = 'birthdays';

async function connectToDatabase() {
    const client = new MongoClient(mongoURI);
  
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      return { client, collection };
    } catch (error) {
      console.error('Error connect to database:', error);
      throw error;
    }
  }
  
  module.exports = { connectToDatabase };
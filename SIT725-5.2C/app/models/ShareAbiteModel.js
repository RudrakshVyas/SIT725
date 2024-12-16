const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const dbName = 'ShareAbiteDB';

let client;

// Function to connect to the MongoDB database
const getDb = async () => {
    if (!client) {
        client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
    }
    return client.db(dbName);
};

// Function to insert food waste data into MongoDB
const insertFoodWaste = async (foodWaste) => {
    try {
        const db = await getDb();
        const collection = db.collection('foodWaste');
        const result = await collection.insertOne(foodWaste);
        console.log('Inserted food waste entry:', result);
        return result;
    } catch (error) {
        console.error('Error inserting food waste entry:', error);
        throw error;
    }
};

module.exports = { insertFoodWaste };

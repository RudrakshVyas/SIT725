// Importing the Express for creating the application
const express = require('express');

const app = express();

//The port where my website is running
const PORT = 1414; 

app.use(express.static('public'));

// Rooting the route to render the index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// For Calculating the addition of two numbers which is passed in the url.
app.get('/add', (req, res) => {

    const { num1, num2 } = req.query;
    

    const result = parseFloat(num1) + parseFloat(num2);
    
    // Giving the result.
    res.send(`The total of ${num1} & ${num2} is ${result}`);
});

// Starting the server to assigned port
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
}); 


const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myDatabase';

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);

    // Example: Access a collection
    const collection = db.collection('myCollection');

    // Example: Insert a document
    const insertResult = await collection.insertOne({ name: 'John', age: 30 });
    console.log('Inserted document:', insertResult);

    // Example: Find documents
    const findResult = await collection.find({}).toArray();
    console.log('Found documents:', findResult);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Ensure the client will close when you finish
    await client.close();
  }
}

main().catch(console.error);

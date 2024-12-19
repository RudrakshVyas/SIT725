const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let foodWasteEntries = []; // Simple in-memory data structure for mock DB

// Root route for home page (fixes "Cannot GET /" error)
app.get('/', (req, res) => {
    res.send('Welcome to the Food Waste Management API');
});

// Route to add food waste
app.post('/api/food-waste', (req, res) => {
    const { hotelName, foodDescription, location } = req.body;

    if (!hotelName || !foodDescription || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newEntry = { hotelName, foodDescription, location };
    foodWasteEntries.push(newEntry);

    res.status(201).json({ message: 'Food waste entry added successfully.', entry: newEntry });
});

// Route to get food waste entries
app.get('/api/food-waste', (req, res) => {
    res.status(200).json(foodWasteEntries);
});

// Catch-all route for invalid paths
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Add the listen function to start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

module.exports = app;

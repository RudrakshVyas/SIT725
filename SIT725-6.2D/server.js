const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Mock database (stored in-memory for simplicity)
app.locals.foodWasteEntries = [];

// Root route for home page
app.get('/', (req, res) => {
    res.send('Welcome to the Food Waste Management API');
});

// Route to add a food waste entry
app.post('/api/food-waste', (req, res) => {
    const { hotelName, foodDescription, location } = req.body;

    // Validate request body
    if (!hotelName || !foodDescription || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new entry and add it to the "database"
    const newEntry = { hotelName, foodDescription, location };
    app.locals.foodWasteEntries.push(newEntry);

    res.status(201).json({ message: 'Food waste entry added successfully.', entry: newEntry });
});

// Route to get all food waste entries
app.get('/api/food-waste', (req, res) => {
    res.status(200).json(app.locals.foodWasteEntries);
});

// Catch-all route for invalid paths
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Configure server to listen on a specified port
const PORT = process.env.PORT || 3000;

// Start the server unless in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Export the app for testing purposes
module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path for serving static files
const app = express();

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route serves the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let foodWasteEntries = []; // Simple in-memory data structure for mock DB

// Route to add food waste
app.post('/api/food-waste', (req, res) => {
    const { hotelName, foodDescription, location } = req.body;

    if (!hotelName || !foodDescription || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newEntry = { hotelName, foodDescription, location };
    foodWasteEntries.push(newEntry);

    // Emit real-time update using Socket.IO
    io.emit('newFoodEntry', newEntry);

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

// Initialize Socket.IO
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
http.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

module.exports = app;

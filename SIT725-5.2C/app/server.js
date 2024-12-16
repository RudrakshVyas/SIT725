const express = require('express');
const path = require('path');
const ShareAbiteRoutes = require('./routes/ShareAbiteRoutes'); 

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 

// Routes
app.use('/api/food-waste', ShareAbiteRoutes); 

// To start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

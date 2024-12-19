const express = require('express');
const router = express.Router();

// Import the mock model
const ShareAbiteModel = require('../models/ShareAbiteModel');

// POST route to create a food waste entry
router.post('/api/food-waste', async (req, res) => {
    const { hotelName, foodDescription, location } = req.body;

    // Validate input
    if (!hotelName || !foodDescription || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Insert the food waste entry into the mock "database"
        const newEntry = await ShareAbiteModel.insertFoodWaste({
            hotelName,
            foodDescription,
            location
        });

        res.status(201).json({
            message: 'Food waste entry added successfully.',
            data: newEntry,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

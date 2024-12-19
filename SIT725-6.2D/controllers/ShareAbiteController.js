const ShareAbiteModel = require('../models/ShareAbiteModel');

const addFoodWaste = async (req, res) => {
    const { hotelName, foodDescription, location } = req.body;

    // Validate required fields
    if (!hotelName || !foodDescription || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const foodWaste = { hotelName, foodDescription, location };

        // Insert food waste entry into the database
        const result = await ShareAbiteModel.insertFoodWaste(foodWaste);

        // Send success response
        res.status(201).json({ message: 'Food waste entry added successfully.', foodWasteId: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the food waste entry.' });
    }
};

module.exports = { addFoodWaste };

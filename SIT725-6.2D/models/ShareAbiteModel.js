const mongoose = require('mongoose');

const foodWasteSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    foodDescription: { type: String, required: true },
    location: { type: String, required: true },
});

const ShareAbiteModel = mongoose.model('ShareAbite', foodWasteSchema);

ShareAbiteModel.insertFoodWaste = async function (foodWaste) {
    const newFoodWaste = new this(foodWaste);
    await newFoodWaste.save();
    return newFoodWaste;
};

ShareAbiteModel.findFoodWaste = async function (id) {
    return await this.findById(id);
};

module.exports = ShareAbiteModel;

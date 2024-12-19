const { expect } = require('chai');

// Mock database array
let mockDatabase = [];

const ShareAbiteModel = {
    // Simulate the insertion of food waste into the "database"
    insertFoodWaste: async (foodWaste) => {
        const newEntry = { ...foodWaste, _id: mockDatabase.length + 1 };
        mockDatabase.push(newEntry);
        return newEntry;
    },

    // Simulate finding food waste by ID
    findFoodWaste: async (id) => {
        return mockDatabase.find(entry => entry._id === id);
    },
};

describe('ShareAbiteModel', () => {
    it('should insert a food waste entry into the "database"', async () => {
        const mockFoodWaste = {
            hotelName: 'Test Hotel',
            foodDescription: 'Test Description',
            location: 'Test Location',
        };

        const result = await ShareAbiteModel.insertFoodWaste(mockFoodWaste);
        expect(result).to.have.property('_id');
        expect(result.hotelName).to.equal('Test Hotel');
    });

    it('should retrieve a food waste entry from the "database"', async () => {
        const mockFoodWaste = {
            hotelName: 'Test Hotel',
            foodDescription: 'Test Description',
            location: 'Test Location',
        };

        const createdFoodWaste = await ShareAbiteModel.insertFoodWaste(mockFoodWaste);
        const retrievedFoodWaste = await ShareAbiteModel.findFoodWaste(createdFoodWaste._id);

        expect(retrievedFoodWaste).to.have.property('hotelName', 'Test Hotel');
    });
});

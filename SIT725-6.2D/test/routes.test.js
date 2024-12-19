const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import the Express app

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /api/food-waste', () => {
    it('should add a food waste entry and return success', (done) => {
        const foodWaste = {
            hotelName: 'Test Hotel',
            foodDescription: 'Test Description',
            location: 'Test Location',
        };

        chai.request(app)
            .post('/api/food-waste')
            .send(foodWaste)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message', 'Food waste entry added successfully.');
                done();
            });
    });

    it('should return an error if fields are missing', (done) => {
        const incompleteData = { hotelName: 'Test Hotel' };

        chai.request(app)
            .post('/api/food-waste')
            .send(incompleteData)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error', 'All fields are required.');
                done();
            });
    });

    it('should return an error if fields are empty strings', (done) => {
        const emptyFields = {
            hotelName: '',
            foodDescription: '',
            location: '',
        };

        chai.request(app)
            .post('/api/food-waste')
            .send(emptyFields)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error', 'All fields are required.');
                done();
            });
    });
});

describe('GET /api/food-waste', () => {
    // Reset the data before each test to ensure no interference
    beforeEach(() => {
        // Reset the foodWasteEntries array to avoid data contamination between tests
        app.locals.foodWasteEntries = []; // Clear the entries before each test
    });

    it('should return all food waste entries', (done) => {
        const foodWaste = {
            hotelName: 'Test Hotel',
            foodDescription: 'Test Description',
            location: 'Test Location',
        };

        // Add an entry first
        chai.request(app)
            .post('/api/food-waste')
            .send(foodWaste)
            .end(() => {
                // Now fetch the entries
                chai.request(app)
                    .get('/api/food-waste')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array').that.has.lengthOf(1); // Expect 1 entry
                        expect(res.body[0]).to.deep.include(foodWaste);
                        done();
                    });
            });
    });

    it('should return an empty array if no entries exist', (done) => {
        chai.request(app)
            .get('/api/food-waste')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.is.empty; // Expect an empty array
                done();
            });
    });
});

describe('Invalid Routes', () => {
    it('should return 404 for an invalid route', (done) => {
        chai.request(app)
            .get('/invalid-route')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Import the Express app

chai.use(chaiHttp);
const { expect } = chai;

// Group tests for POST /api/food-waste
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

// Group tests for GET /api/food-waste
describe('GET /api/food-waste', () => {
    beforeEach(() => {
        // Ensure `foodWasteEntries` is reset before each test
        if (!app.locals.foodWasteEntries) {
            app.locals.foodWasteEntries = [];
        } else {
            app.locals.foodWasteEntries.length = 0; // Clear the array
        }
        console.log('Reset foodWasteEntries:', app.locals.foodWasteEntries); // Debugging
    });

    it('should return all food waste entries', (done) => {
        const foodWaste = {
            hotelName: 'Test Hotel',
            foodDescription: 'Test Description',
            location: 'Test Location',
        };

        chai.request(app)
            .post('/api/food-waste')
            .send(foodWaste)
            .end((err) => {
                if (err) return done(err);

                console.log('After POST:', app.locals.foodWasteEntries); // Debugging

                chai.request(app)
                    .get('/api/food-waste')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array').that.has.lengthOf(1); // Expect 1 entry
                        expect(res.body[0]).to.deep.include(foodWaste);
                        console.log('GET response:', res.body); // Debugging
                        done();
                    });
            });
    });

    it('should return an empty array if no entries exist', (done) => {
        console.log('State before GET:', app.locals.foodWasteEntries); // Debugging

        chai.request(app)
            .get('/api/food-waste')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array').that.is.empty; // Expect an empty array
                console.log('GET response:', res.body); // Debugging
                done();
            });
    });
});

// Test for invalid routes
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

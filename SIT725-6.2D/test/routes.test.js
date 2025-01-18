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
                expect(res.body.entry).to.deep.include(foodWaste);
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

    it('should handle large input data gracefully', (done) => {
        const largeData = {
            hotelName: 'A'.repeat(1000),
            foodDescription: 'B'.repeat(1000),
            location: 'C'.repeat(1000),
        };

        chai.request(app)
            .post('/api/food-waste')
            .send(largeData)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.entry).to.deep.include(largeData);
                done();
            });
    });
});

// Group tests for GET /api/food-waste
describe('GET /api/food-waste', () => {
    beforeEach(() => {
        // Clear foodWasteEntries before each test
        app.locals.foodWasteEntries = [];
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
            .end(() => {
                chai.request(app)
                    .get('/api/food-waste')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array').that.has.lengthOf(1);
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
                expect(res.body).to.be.an('array').that.is.empty;
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

    it('should return 404 for a POST to an invalid route', (done) => {
        chai.request(app)
            .post('/invalid-route')
            .send({ random: 'data' })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});

// Edge Case Tests
describe('Edge Cases', () => {
    it('should handle large numbers of entries efficiently', (done) => {
        const entries = Array.from({ length: 100 }, (_, i) => ({
            hotelName: `Hotel ${i}`,
            foodDescription: `Description ${i}`,
            location: `Location ${i}`,
        }));

        Promise.all(
            entries.map(entry => chai.request(app).post('/api/food-waste').send(entry))
        ).then(() => {
            chai.request(app)
                .get('/api/food-waste')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.has.lengthOf(100);
                    done();
                });
        });
    });

    it('should gracefully handle duplicate entries', (done) => {
        const foodWaste = {
            hotelName: 'Duplicate Hotel',
            foodDescription: 'Duplicate Description',
            location: 'Duplicate Location',
        };

        chai.request(app)
            .post('/api/food-waste')
            .send(foodWaste)
            .end(() => {
                chai.request(app)
                    .post('/api/food-waste')
                    .send(foodWaste)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body.entry).to.deep.include(foodWaste);
                        done();
                    });
            });
    });
});

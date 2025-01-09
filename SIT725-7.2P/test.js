const Mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server'); // Import your Express app

// Setup Chai
chai.use(chaiHttp);
const { expect } = chai;

// Create a Mocha instance
const mocha = new Mocha();

// Add test files to Mocha instance
mocha.addFile('./test/routes.test.js'); // Adjust this path to match your actual test file

// Run the tests
mocha.run(failures => {
    process.exit(failures); // Exit with a non-zero code if there are test failures
});

const Mocha = require('mocha');
const app = require('./server');
const http = require('http');

const mocha = new Mocha();
mocha.addFile('./test/routes.test.js');
mocha.addFile('./test/model.test.js');

const TEST_PORT = 4000; // Use a different port for testing
let server;

try {
    server = http.createServer(app).listen(TEST_PORT, () => {
        console.log(`Test server running on http://localhost:${TEST_PORT}`);
        mocha.run((failures) => {
            server.close(() => {
                console.log('Test server stopped.');
                process.exitCode = failures ? 1 : 0;
            });
        });
    });
} catch (error) {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${TEST_PORT} is already in use. Please free it and try again.`);
        process.exit(1);
    } else {
        throw error;
    }
}

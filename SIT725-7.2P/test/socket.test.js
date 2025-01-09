const { expect } = require('chai');
const io = require('socket.io-client');
const http = require('http');
const socketIo = require('socket.io');
const PORT = 4000;

let server, ioServer;

describe('Socket.IO Tests', () => {
    before((done) => {
        const app = http.createServer();
        ioServer = socketIo(app);
        app.listen(PORT, () => {
            console.log(`Test server running on http://localhost:${PORT}`);
            done();
        });

        ioServer.on('connection', (socket) => {
            socket.on('newListing', (data) => {
                ioServer.emit('updateListings', data);
            });
        });
    });

    after((done) => {
        ioServer.close();
        done();
    });

    it('should broadcast new listing updates', (done) => {
        const client1 = io(`http://localhost:${PORT}`);
        const client2 = io(`http://localhost:${PORT}`);

        client2.on('updateListings', (data) => {
            expect(data.foodName).to.equal('Pasta');
            expect(data.quantity).to.equal('5 servings');
            client1.disconnect();
            client2.disconnect();
            done();
        });

        client1.emit('newListing', { foodName: 'Pasta', quantity: '5 servings' });
    });
});

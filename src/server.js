const path = require('path');
const express = require("express");
const sockets = require('socket.io');
const config = require("../config");
const logger = require("./logger").getLogger();

const app = express();

// Web page server - Start

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile('index.html', {
    root: './'
}));

const server = app.listen(process.env.PORT || config.port, () => {
    logger.debug(`Web server is running on port ${server.address().port}`);
});

// Web page server - End

// Socket io server - Start

const io = sockets(server).sockets;
io.on('connection', socket => {
    const userName = 'Server';
    socket.emit('server-message', { user: userName, content: 'Hello you are connected' });

    socket.on('client-name', data => {
        socket.emit('server-message', data);
    });

    socket.on('client-message', data => {
        socket.emit('server-message', data);
    });
});

logger.info('After initializing Socket io server');

// Socket io server - End
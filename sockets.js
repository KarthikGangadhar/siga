'use strict';
module.exports = function sockets(io) {
    // define sockets' behavior
    io.sockets.on('connection', function (socket) {
        socket.emit('connected to a teapot');
    });
};

'use strict';
// server module
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
module.exports = function startServer(port, cookies) {
    // start and configure server
    // return server + app & io
    app.use(express.compress());
    app.use(express.favicon('./public/img/gear_blue.png'));
    app.use(express['static']('./public'));
    app.use(express.bodyParser());
    if (cookies) {
        app.use(require('client-sessions')(cookies));
    }
    if (app.get('env') === 'development') {
        app.use(express.errorHandler({
            stack: true,
            dump: true
        }));
    }
    if (app.get('env') === 'production') {
        app.use(express.errorHandler());
    }
    server.app = app;
    io.set('transports', ['websocket']);
    io.set('log level', 2);
    io.enable('browser client minification');
    io.enable('browser client etag');
    io.enable('browser client gzip');
    server.io = io;
    server.listen(port, function onListening() {
        console.log('Server listening on port %d in %s mode!', this.address().port, app.settings.env);
    });
    return server;
};

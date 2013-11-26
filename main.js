/*jslint node: true */
'use strict';

// start and configure server
// return server + app & io
var server = require('./modules/server')(8001);

// define routes & sockets' behavior
require('./routes')(server.app);
require('./sockets')(server.io);

"use strict";

// start and configure server
// return server + app & io
var server = require('./server')(8001);

// define routes & sockets' behavior
require('./routes')(server.app);
require('./sockets')(server.io);

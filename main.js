'use strict';
// start and configure server
// return server + app & io
var server = require('./modules/server')(8002, require('./settings').cookies);
// define routes & sockets' behavior
require('./routes')(server.app);
require('./sockets')(server.io);

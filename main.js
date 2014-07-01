'use strict';
// creating the one who logs
var logbook = new (require('log'))('debug'),
    // start and configure server
    // return server + app & io
    server = require('./modules/server')(8002, require('./settings').cookies),
    // starting models
    models = {
        inscricao: require('./models/inscricao')(logbook),
        pagamento: require('./models/pagamento')(logbook),
        usuario: require('./models/usuario')(logbook)
    };
// define routes & sockets' behavior
require('./routes')(models, server.app, logbook);
require('./sockets')(server.io);

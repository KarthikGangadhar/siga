'use strict';
module.exports = function sessionController(models, app, logbook) {
    var pagamento = models.pagamento,
    inscricao = models.inscricao,
    dadosDePagamento = require('../settings').dadosDePagamento,
    q = require('q'),
    querystring = require('querystring');
    app.get('/api/pagamento', function (request, response) {
        pagamento
        .read(request.authentication.inscricao)
        .then(
            function resolve(value) {
                response.send(value)
            },
            function reject(reason) {
                logbook.error(reason, '\nat: ' + __filename);
                response.send(500);
            }
        );
    });
    app.post('/api/pagamento', function (request, response) {
    });
};

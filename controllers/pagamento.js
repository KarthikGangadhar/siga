'use strict';
module.exports = function sessionController(models, app, logbook) {
    var pagamento = models.pagamento,
        inscricao = models.inscricao,
        usuario = models.usuario,
        dadosDePagamento = require('../settings').dadosDePagamento,
        q = require('q'),
        querystring = require('querystring');
    app.get('/api/pagamento', function (request, response) {
        pagamento
            .read(request.authentication.inscricao)
            .then(
                function resolve(value) {
                    value.dadosDePagamento = dadosDePagamento;
                    response.send(value);
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    response.send(500);
                }
            );
    });
    app.get('/api/pagamento/:id', function (request, response) {
        if (
            +request.authentication.inscricao !== +request.params.id &&
                usuario.mayNot('VIEW_OTHERS', request.authentication.permissions)
        ) {
            response.send(401);
            return;
        }
        pagamento
            .read(request.params.id)
            .then(
                function resolve(value) {
                    value.dadosDePagamento = dadosDePagamento;
                    response.send(value);
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    response.send(500);
                }
            );
    });
    app.post('/api/pagamento/status', function (request, response) {
        console.log(request.authentication.permissions)
        if (
            +request.authentication.inscricao !== +request.params.id &&
                usuario.mayNot('CONFIRM', request.authentication.permissions)
        ) {
            response.send(401);
            return;
        }
        pagamento
            .update(request.body.id, request.body.valor, request.body.data)
            .then(
                function resolve(value) {
                    response.send(value);
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    response.send(500);
                }
            );
    });
};

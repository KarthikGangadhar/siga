'use strict';
module.exports = function inscricaoController(models, app, logbook) {
    var inscricao = models.inscricao,
        usuario = models.usuario,
        pagamento = models.pagamento,
        settings = require('../settings').dadosDePagamento,
        q = require('q');
    app.get('/api/inscricao/:id?', function (request, response) {
        if (
            +request.authentication.inscricao !== +request.params.id &&
                usuario.mayNot('VIEW_OTHERS', request.authentication.permissions)
        ) {
            response.send(401);
            return;
        }
        inscricao
            .read(request.params.id)
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
    app.post('/api/inscricao', function (request, response) {
        if (
            request.authentication.email !== request.body.email &&
                usuario.mayNot('MULTIPLE', request.authentication.permissions)
        ) {
            response.send(401);
            return;
        }
        inscricao
            .verifyCPF(request.body.cpf)
            .then(
                function resolve(value) {
                    if (value.length) {
                        response.send({
                            message: 'CPF Existente.'
                        });
                        return false;
                    }
                    inscricao
                        .create(request.body)
                        .then(
                            function resolve(value) {
                                return value.insertId;
                            },
                            function reject(reason) {
                                logbook.error(reason, '\nat: ' + __filename);
                                response.send(500);
                            }
                        )
                        .then(
                            function resolve(insertId) {
                                request.authentication.inscricao = insertId;
                                q
                                    .all([
                                        usuario
                                            .update(request.authentication),
                                        pagamento
                                            .create({
                                                inscricao: insertId,
                                                valor: settings.valores[request.body.categoria],
                                                sacado: request.body.nome_completo,
                                                status: 0
                                            })
                                    ])
                                    .then(
                                        function resolve() {
                                            insertId += '';
                                            response.send(insertId);
                                        }
                                    );
                            }
                        );
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    response.send(500);
                }
            );
    });
    app.put('/api/inscricao/:id', function (request, response) {
        if (
            request.authentication.email !== request.body.email &&
                usuario.mayNot('MULTIPLE', request.authentication.permissions)
        ) {
            response.send(401);
            return;
        }
        inscricao
            .update(request.body)
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
    app['delete']('/api/inscricao/:id', function (request, response) {
        if (
            usuario.mayNot('DELETE', request.authentication.permissions)
        ) {
            response.send(401);
            return;
        }
        inscricao
            .destroy(request.params.id)
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

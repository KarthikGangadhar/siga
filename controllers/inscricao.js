'use strict';
module.exports = function inscricaoController(models, app, logbook) {
    var inscricao = models.inscricao,
        usuario = models.usuario;
    app.get('/api/inscricao/:id?', function (request, response, next) {
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
    app.post('/api/inscricao', function (request, response, next) {
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
                    usuario
                        .update(request.authentication)
                        .then(
                            function resolve() {
                                // function resolve(value)
                                response.send('' + insertId);
                            }
                        );
                }
            );
    });
    app.put('/api/inscricao/:id', function (request, response, next) {
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
    app['delete']('/api/inscricao/:id', function (request, response, next) {
        inscricao
            .destroy(id)
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

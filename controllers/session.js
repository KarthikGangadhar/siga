'use strict';
module.exports = function sessionController(models, app, logbook) {
    var assertionVerifier = require('../modules/assertionVerifier'),
        audience = require('../settings').audience,
        usuario = models.usuario;
    app.get('/api/session', function (request, response) {
        // function (request, response, next)
        response.send(request.authentication);
    });
    app.post('/api/session', function (request, response) {
        // function (request, response, next)
        assertionVerifier(request.body.assertion, audience[app.settings.env])
            .then(function resolve(value) {
                var email = value.email;
                usuario
                    .read(email)
                    .then(
                        function resolve(value) {
                            request.authentication.email = value.email;
                            request.authentication.clearence = value.clearence;
                            request.authentication.inscricao = value.inscricao;
                            response.send(request.authentication);
                        },
                        function reject(reason) {
                            logbook.error(reason, '\nat: ' + __filename);
                            response.send(500);
                            throw reason;
                        }
                    );
            }, function reject(reason) {
                logbook.error(reason, '\nat: ' + __filename);
                response.send(500);
                throw reason;
            });
    });
    app['delete']('/api/session', function (request, response) {
        // function (request, response, next)
        delete request.authentication.email;
        delete request.authentication.clearence;
        delete request.authentication.inscricao;
        response.send(200);
    });
};

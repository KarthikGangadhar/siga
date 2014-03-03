'use strict';
var assertionVerifier = require('../modules/assertionVerifier'),
    audience = require('../settings').audience;
module.exports = function sessionController(app) {
    app.get('/api/session', function (request, response) {
        // function (request, response, next)
        response.send(request.authentication);
    });
    app.post('/api/session/login', function (request, response) {
        // function (request, response, next)
        assertionVerifier(
            request.body.assertion,
            audience[app.settings.env]
        )
            .then(function resolve(value) {
                request.authentication.email = value.email;
                response.send(200, value);
            }, function reject(reason) {
                response.send(500, reason);
            });
    });
    app['delete']('/api/session/logout', function (request, response) {
        // function (request, response, next)
        request.authentication = {};
        response.send(200);
    });
};

'use strict';
var inscricao = require('../models/inscricao');
module.exports = function inscricaoController(app) {
    app.get('/api/inscricao/:id?', function (request, response, next) {
        inscricao
            .read(request.params.id)
            .then(
                function resolve(value) {
                    response.send(value);
                },
                function reject(reason) {
                    response.send(reason);
                }
            );
    });
    app.post('/api/inscricao', function (request, response, next) {
        inscricao
            .create(request.body)
            .then(
                function resolve(value) {
                    response.send(value);
                },
                function reject(reason) {
                    response.send(reason);
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
                    response.send(reason);
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
                    response.send(reason);
                }
            );
    });
};

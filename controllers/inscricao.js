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
                    console.warn(reason)
                    response.send(500);
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
                    console.warn(reason)
                    response.send(500);
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
                    console.warn(reason)
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
                    console.warn(reason)
                    response.send(500);
                }
            );
    });
};

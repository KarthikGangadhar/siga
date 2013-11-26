/*jslint node: true */
'use strict';

module.exports = function routes(app) {

    // define routes

    app.get('*', function getAll(request, response) {
        response.sendfile('./public/index.html');
    });

};

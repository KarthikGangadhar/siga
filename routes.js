'use strict';

module.exports = function routes(app) {

    // define routes

    app.get('*', function(request, response) {
        response.sendfile('./public/index.html');
    });

};

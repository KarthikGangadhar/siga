/*jslint node: true */
'use strict';
module.exports = function routes(app) {
    // define routes
    require('./controllers/inscricao')(app);
    app.get('*', function (request, response) {
        response.sendfile('./public/index.html');
    });
};

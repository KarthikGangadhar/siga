'use strict';
module.exports = function routes(models, app, logbook) {
    // define routes
    require('./controllers/session')(models, app, logbook);
    require('./controllers/inscricao')(models, app, logbook);
    require('./controllers/trabalho')(models, app, logbook);
    require('./controllers/pagamento')(models, app, logbook);
    app.get('*', function (request, response) {
        response.sendfile('./public/index.html');
    });
};

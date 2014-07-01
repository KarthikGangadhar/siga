'use strict';
/*
    https://www.nodejitsu.com/documentation/faq/#how-do-i-force-my-clients-to-use-https-with-my-application

    How do I force my clients to use HTTPS with my application?

    You'll need to redirect your clients to the HTTPS address when they make a request with HTTP. See the following code for an example:

    // http
    var http = require('http');

    var server = http.createServer(function (req, res) {
      // optional, for HSTS
      // see https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
      res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');

      if (req.headers['x-forwarded-proto'] !== 'https') {
        var url = 'https://' + req.headers.host + '/';
        res.writeHead(301, {'location': url});
        return res.end('Redirecting to <a href="' + url + '">' + url + '</a>.');
      }
    });

    server.listen(8080);

    //express
    var express = require('express');

    var app = express();

    app.use(function (req, res, next) {
      // see above
      res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');

      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(301, 'https://' + req.headers.host + '/');
      }

      next();
    })

    app.listen(8090);
*/
var
    productionHost;
productionHost = require('../settings').audience['production'].split('//')[1];
module.exports = function redirectToHTTPS(request, response, next) {
    if (request.headers.host === productionHost) {
        response.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
        if (request.headers['x-forwarded-proto'] !== 'https') {
            return response.redirect(301, 'https://' + request.headers.host + '/');
        }
    }
    next();
};

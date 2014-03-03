'use strict';
var https = require('https'),
    q = require('q'),
    querystring = require('querystring');
module.exports = function assertionVerifier(assertion, audience) {
    var deferred = q.defer(),
        data = querystring.stringify({
            assertion: assertion,
            audience: audience
        }),
        verifyAssertionRequestConfigurationObject = {
            host: 'verifier.login.persona.org',
            path: '/verify',
            method: 'POST'
        },
        verifyAssertionRequestCallbackFunction = function verifyAssertionRequestCallbackFunction(verifyAssertionResponse) {
            var responseBody = '';
            verifyAssertionResponse.on('data', function onData(chunk) {
                responseBody += chunk;
            });
            verifyAssertionResponse.on('end', function onEnd() {
                try {
                    responseBody = JSON.parse(responseBody);
                    deferred.resolve(responseBody);
                } catch (error) {
                    deferred.reject({
                        error: error
                    });
                }
            });
        },
        verifyAssertionRequest;
    verifyAssertionRequest = https.request(verifyAssertionRequestConfigurationObject, verifyAssertionRequestCallbackFunction);
    verifyAssertionRequest.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    verifyAssertionRequest.setHeader('Content-Length', data.length);
    verifyAssertionRequest.write(data);
    verifyAssertionRequest.end();
    return deferred.promise;
};

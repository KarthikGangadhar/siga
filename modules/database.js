'use strict';
// database module
var q = require('q'),
    mysql = require('mysql'),
    underscore = require('underscore');
module.exports = function database(settings) {
    var engine = {
        processSettings: function processSettings(settings) {
            var notObject = !underscore.isObject(settings),
                emptyObject = underscore.isEmpty(settings);
            if (notObject || emptyObject) {
                throw 'Invalid settings';
            }
            engine.settings = settings;
        },
        settings: {},
        formatError: function formatError(error) {
            var errorIsObject = underscore.isObject(error),
                errorIsNotEmpty = !underscore.isEmpty(error);
            if (error) {
                if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                    return error.code;
                }
                return error.code + '[' + error.errno + ']';
            }
            throw 'No error object to format';
        },
        makeConnection: function makeConnection() {
            engine.connection = mysql.createConnection(engine.settings);
            engine.connection.on('error', function onError(error) {
                console.log(engine.formatError(error));
            });
            engine.connection.connect(function onConnect(error) {
                if (error) {
                    console.log(engine.formatError(error));
                }
            });
        },
        connection: {},
        handleConfiguration: function handleConfiguration(configuration) {
            var queryIsNotString = !underscore.isString(configuration.query),
                queryIsEmpty = underscore.isEmpty(configuration.query),
                arrayIsArray = underscore.isArray(configuration.array),
                arrayIsNotEmpty = !underscore.isEmpty(configuration.array),
                dataIsObject = underscore.isObject(configuration.data),
                dataIsNotEmpty = !underscore.isEmpty(configuration.data)
            if (queryIsNotString || queryIsEmpty) {
                throw 'Invalid query';
            }
            if (arrayIsArray && arrayIsNotEmpty && dataIsObject && dataIsNotEmpty) {
                configuration.array.forEach(function (element, index, array) {
                    array[index] = configuration.data[element];
                });
            }
        },
        execute: function execute(configuration) {
            var deferred = q.defer();
            engine.handleConfiguration(configuration);
            engine.makeConnection();
            engine.connection.query(configuration.query, configuration.array, function onResult(error, rows_or_result) {
                if (error) {
                    deferred.reject(engine.formatError(error));
                    return;
                }
                deferred.resolve(rows_or_result);
            });
            engine.connection.end(function onEnd(error) {
                if (error) {
                    console.log(engine.formatError(error));
                }
            });
            return deferred.promise;
        }
    };
    engine.processSettings(settings);
    return engine.execute;
};

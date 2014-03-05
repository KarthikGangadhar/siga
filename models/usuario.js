'use strict';
module.exports = function usuarioModel(logbook) {
    var db = require('../modules/database')(require('../settings').database),
        clearences = require('../settings').clearences;
    return {
        create: function create(usuario) {
            usuario.clearence = clearences[usuario.email] || 0;
            return db({
                query: 'INSERT INTO usuario ( ' +
                        'email, ' +
                        'clearence, ' +
                        '__status__ ' +
                    ') ' +
                    'VALUES ( ' +
                        '?, ' +
                        '?, ' +
                        '1 ' +
                    ') ',
                array: [
                    'email',
                    'clearence'
                ],
                data: usuario
            }).then(
                function resolve(value) {
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        read: function read(email) {
            if (email) {
                return db({
                    query: 'SELECT * FROM usuario ' +
                        'WHERE __status__ = 1 ' +
                        'AND email = ? ' +
                        'ORDER BY email ',
                    array: [
                        email
                    ]
                }).then(
                    function resolve(value) {
                        if (value.length === 0) {
                            var usuario = {
                                email: email
                            };
                            return this
                                .create(usuario)
                                .then(
                                    function resolve(value) {
                                        return usuario;
                                    },
                                    function reject(reason) {
                                        logbook.error(reason, '\nat: ' + __filename);
                                        throw reason;
                                    }
                                );
                        }
                        return value[0];
                    }.bind(this),
                    function reject(reason) {
                        logbook.error(reason, '\nat: ' + __filename);
                        throw reason;
                    }
                );
            }
            return db({
                query: 'SELECT * FROM usuario ' +
                    'WHERE __status__ = 1 ' +
                    'ORDER BY email '
            }).then(
                function resolve(value) {
                    if (value.length === 0) {
                        return {
                            message: 'Há nenhum usuário.'
                        };
                    }
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        update: function update(usuario) {
            return db({
                query: 'UPDATE usuario SET ' +
                        'inscricao = ? ' +
                    'WHERE email = ? ',
                array: [
                    'inscricao',
                    'email'
                ],
                data: usuario
            }).then(
                function resolve(value) {
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        destroy: function destroy(email) {
            return db({
                query: 'UPDATE usuario SET ' +
                        '__status__ = 0 ' +
                    'WHERE email = ? ',
                array: [
                    email
                ]
            }).then(
                function resolve(value) {
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        }
    };
};

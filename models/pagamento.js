'use strict';
module.exports = function usuarioModel(logbook) {
    var db = require('../modules/database')(require('../settings').database),
    settings = require('../settings').dadosDePagamento,
    querystring = require('querystring');
    return {
        create: function create(pagamento) {
            return db({
                query: 'INSERT INTO pagamento ( ' +
                    'inscricao, ' +
                    'valor, ' +
                    'sacado, ' +
                    'status, ' +
                    '__status__ ' +
                    ') ' +
            'VALUES ( ' +
                '?, ' +
                '?, ' +
                '?, ' +
                '?, ' +
                '1 ' +
                ') ',
            array: [
                'inscricao',
                'valor',
                'sacado',
                'status'
            ],
            data: pagamento
        })
            .then(
                function resolve(value) {
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
                );
        },
        read: function read(inscricao) {
            return db({
                query: 'SELECT * FROM pagamento ' +
                'WHERE __status__ = 1 ' +
                'AND inscricao = ? ',
                array: [
                inscricao
                ]
            })
            .then(
                function resolve(value) {
                    var params = {
                            dv: settings.primeiroVencimento,
                            v: value[0].valor,
                            nn: value[0].inscricao,
                            nd: value[0].id,
                            s: value[0].sacado// + ' ' + value[0].cpf
                        },
                        url = settings.baseURL + querystring.stringify(params);
                    return {
                        status: value[0].status,
                        url: url
                    };
                }
            );
        },
        update: function update(id, valor) {
            return db({
                query: 'UPDATE pagamento SET ' +
                        'valor = ?, ' +
                        'status = 1 ' +
                    'WHERE id = ? ',
                array: [
                    valor,
                    id
                ]
            })
            .then(
                function resolve(value) {
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
                );
        },
        destroy: function destroy() {
        }
    };
};

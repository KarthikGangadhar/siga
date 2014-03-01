'use strict';
var moment = require('moment'),
    db = require('../modules/database')(require('../settings').database);
module.exports = {
    create: function create(inscricao) {
        inscricao.data_de_nascimento = moment.utc(inscricao.data_de_nascimento, 'DD/MM/YYYY').format();
        return db({
            query: 'INSERT INTO inscricao ( ' +
                    'nome_completo, ' +
                    'data_de_nascimento, ' +
                    'sexo, ' +
                    'email, ' +
                    'cpf, ' +
                    'nome_do_documento, ' +
                    'numero_do_documento, ' +
                    'telefones, ' +
                    'logradouro, ' +
                    'numero, ' +
                    'complemento, ' +
                    'bairro, ' +
                    'localidade, ' +
                    'uf, ' +
                    'cep, ' +
                    'endereco, ' +
                    'nome_no_cracha, ' +
                    'categoria, ' +
                    'curso_ou_formacao, ' +
                    'acronimo_da_instituicao_ou_empresa, ' +
                    'nome_da_instituicao_ou_empresa ' +
                ') ' +
                'VALUES ( ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '?, ' +
                    '? ' +
                ') ',
            array: [
                'nome_completo',
                'data_de_nascimento',
                'sexo',
                'email',
                'cpf',
                'nome_do_documento',
                'numero_do_documento',
                'telefones',
                'logradouro',
                'numero',
                'complemento',
                'bairro',
                'localidade',
                'uf',
                'cep',
                'endereco',
                'nome_no_cracha',
                'categoria',
                'curso_ou_formacao',
                'acronimo_da_instituicao_ou_empresa',
                'nome_da_instituicao_ou_empresa'
            ],
            data: inscricao
        }).then(
            function resolve(value) {
                return value;
            },
            function reject(reason) {
                return reason;
            }
        );
    },
    read: function read(id) {
        if (id) {
            return db({
                query: 'SELECT * FROM inscricao ' +
                    'WHERE id = ? ' +
                    'ORDER BY nome_completo ',
                array: [id]
            }).then(
                function resolve(value) {
                    value[0].data_de_nascimento = moment(value[0].data_de_nascimento).format('DD/MM/YYYY');
                    return value[0];
                },
                function reject(reason) {
                    return reason;
                }
            );
        }
        return db({
            query: 'SELECT * FROM inscricao ' +
                'ORDER BY nome_completo '
        }).then(
            function resolve(value) {
                value.forEach(function forEach(element) {
                    // forEach(element, index, array)
                    element.data_de_nascimento = moment(element.data_de_nascimento).format('DD/MM/YYYY');
                });
                return value;
            },
            function reject(reason) {
                return reason;
            }
        );
    },
    update: function update(inscricao) {
        inscricao.id = parseInt(inscricao.id, 10);
        inscricao.data_de_nascimento = moment.utc(inscricao.data_de_nascimento, 'DD/MM/YYYY').format();
        return db({
            query: 'UPDATE inscricao SET ' +
                    'nome_completo = ?, ' +
                    'data_de_nascimento = ?, ' +
                    'sexo = ?, ' +
                    'email = ?, ' +
                    'cpf = ?, ' +
                    'nome_do_documento = ?, ' +
                    'numero_do_documento = ?, ' +
                    'telefones = ?, ' +
                    'logradouro = ?, ' +
                    'numero = ?, ' +
                    'complemento = ?, ' +
                    'bairro = ?, ' +
                    'localidade = ?, ' +
                    'uf = ?, ' +
                    'cep = ?, ' +
                    'endereco = ?, ' +
                    'nome_no_cracha = ?, ' +
                    'categoria = ?, ' +
                    'curso_ou_formacao = ?, ' +
                    'acronimo_da_instituicao_ou_empresa = ?, ' +
                    'nome_da_instituicao_ou_empresa = ? ' +
                'WHERE id = ? ',
            array: [
                'nome_completo',
                'data_de_nascimento',
                'sexo',
                'email',
                'cpf',
                'nome_do_documento',
                'numero_do_documento',
                'telefones',
                'logradouro',
                'numero',
                'complemento',
                'bairro',
                'localidade',
                'uf',
                'cep',
                'endereco',
                'nome_no_cracha',
                'categoria',
                'curso_ou_formacao',
                'acronimo_da_instituicao_ou_empresa',
                'nome_da_instituicao_ou_empresa',
                'id'
            ],
            data: inscricao
        }).then(
            function resolve(value) {
                return value;
            },
            function reject(reason) {
                return reason;
            }
        );
    },
    destroy: function destroy(id) {
        return db({
            query: 'UPDATE inscricao SET ' +
                    '__status__ = 0 ' +
                'WHERE id = ? ',
            array: [id]
        }).then(
            function resolve(value) {
                return value;
            },
            function reject(reason) {
                return reason;
            }
        );
    }
};

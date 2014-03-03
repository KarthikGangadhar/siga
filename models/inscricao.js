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
                    'estrangeiro, ' +
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
                    'nome_da_instituicao_ou_empresa, ' +
                    '__status__ ' +
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
                    '?, ' +
                    '?, ' +
                    '1 ' +
                ') ',
            array: [
                'nome_completo',
                'data_de_nascimento',
                'sexo',
                'email',
                'estrangeiro',
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
                throw reason;
            }
        );
    },
    read: function read(id) {
        if (id) {
            return db({
                query: 'SELECT * FROM inscricao ' +
                    'WHERE __status__ = 1 ' +
                    'AND id = ? ' +
                    'ORDER BY nome_completo ',
                array: [id]
            }).then(
                function resolve(value) {
                    if (value.length === 0) {
                        throw 'ID Inexistente!';
                    }
                    value[0].data_de_nascimento = moment(value[0].data_de_nascimento).format('DD/MM/YYYY');
                    return value[0];
                },
                function reject(reason) {
                    throw reason;
                }
            );
        }
        return db({
            query: 'SELECT * FROM inscricao ' +
                'WHERE __status__ = 1 ' +
                'ORDER BY nome_completo '
        }).then(
            function resolve(value) {
                if (value.length === 0) {
                    return {
                        message: 'Há nenhuma inscrição!'
                    };
                }
                value.forEach(function forEach(element) {
                    // forEach(element, index, array)
                    element.data_de_nascimento = moment(element.data_de_nascimento).format('DD/MM/YYYY');
                });
                return value;
            },
            function reject(reason) {
                throw reason;
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
                    'estrangeiro = ?, ' +
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
                'estrangeiro',
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
                throw reason;
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
                throw reason;
            }
        );
    }
};

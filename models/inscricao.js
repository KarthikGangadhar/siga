'use strict';
module.exports = function inscricaoModel(logbook) {
    var moment = require('moment'),
        db = require('../modules/database')(require('../settings').database),
        info = require('../settings').info;
    return {
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
                        'pessoa_com_deficiencia, ' +
                        'deficiencia_auditiva, ' +
                        'deficiencia_motora, ' +
                        'deficiencia_visual, ' +
                        'outras_deficiencias, ' +
                        'grau_de_escolaridade, ' +
                        'nome_da_ultima_instituicao_de_ensino, ' +
                        'tipo_da_ultima_instituicao_de_ensino, ' +
                        'ultimo_curso, ' +
                        'area_de_conhecimento_do_ultimo_curso, ' +
                        'profissao, ' +
                        'empresa, ' +
                        'atividade, ' +
                        'cidade_de_nascimento, ' +
                        'vii, ' +
                        'vi, ' +
                        'v, ' +
                        'iv, ' +
                        'iii, ' +
                        'ii, ' +
                        'i, ' +
                        'tipo_de_projeto_programa_acao, ' +
                        'blog_site_perfil, ' +
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
                    'pessoa_com_deficiencia',
                    'deficiencia_auditiva',
                    'deficiencia_motora',
                    'deficiencia_visual',
                    'outras_deficiencias',
                    'grau_de_escolaridade',
                    'nome_da_ultima_instituicao_de_ensino',
                    'tipo_da_ultima_instituicao_de_ensino',
                    'ultimo_curso',
                    'area_de_conhecimento_do_ultimo_curso',
                    'profissao',
                    'empresa',
                    'atividade',
                    'cidade_de_nascimento',
                    'vii',
                    'vi',
                    'v',
                    'iv',
                    'iii',
                    'ii',
                    'i',
                    'tipo_de_projeto_programa_acao',
                    'blog_site_perfil'
                ],
                data: inscricao
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
        read: function read(id) {
            if (id) {
                return db({
                    query: 'SELECT * FROM inscricao ' +
                        'WHERE __status__ = 1 ' +
                        'AND id = ? ' +
                        'ORDER BY nome_completo ',
                    array: [
                        id
                    ]
                }).then(
                    function resolve(value) {
                        if (value.length === 0) {
                            return {
                                message: 'ID Inexistente.'
                            };
                        }
                        value[0].data_de_nascimento = moment(value[0].data_de_nascimento).format('DD/MM/YYYY');
                        return value[0];
                    },
                    function reject(reason) {
                        logbook.error(reason, '\nat: ' + __filename);
                        throw reason;
                    }
                );
            }
            return db({
                query: 'SELECT ' +
                        'inscricao.id, ' +
                        'inscricao.nome_completo, ' +
'inscricao.nome_no_cracha, ' +
'inscricao.empresa, ' +
                        'inscricao.data_de_nascimento, ' +
                        'inscricao.sexo, ' +
                        'inscricao.email, ' +
                        'inscricao.cpf, ' +
                        'inscricao.telefones, ' +
                        'pagamento.id AS pagamento, ' +
                        'pagamento.status ' +
// 'inscricao.nome_completo, ' +
// 'inscricao.data_de_nascimento, ' +
// 'inscricao.sexo, ' +
// 'inscricao.email, ' +
// 'inscricao.estrangeiro, ' +
// 'inscricao.cpf, ' +
// 'inscricao.nome_do_documento, ' +
// 'inscricao.numero_do_documento, ' +
// 'inscricao.telefones, ' +
// 'inscricao.logradouro, ' +
// 'inscricao.numero, ' +
// 'inscricao.complemento, ' +
// 'inscricao.bairro, ' +
// 'inscricao.localidade, ' +
// 'inscricao.uf, ' +
// 'inscricao.cep, ' +
// 'inscricao.endereco, ' +
// 'inscricao.categoria, ' +
// 'pagamento.id AS pagamento, ' +
// 'pagamento.status, ' +
// 'pagamento.valor, ' +
// 'pagamento.data ' +
                    'FROM inscricao ' +
                    'INNER JOIN pagamento ON inscricao.id = pagamento.inscricao ' +
                    'WHERE inscricao.__status__ = 1 ' +
                    'ORDER BY inscricao.nome_completo '
                // query: 'SELECT * FROM inscricao ' +
                //     'WHERE __status__ = 1 ' +
                //     'ORDER BY nome_completo '
            }).then(
                function resolve(value) {
                    if (value.length === 0) {
                        return {
                            message: 'Há nenhuma inscrição.'
                        };
                    }
                    value.forEach(function forEach(element) {
                        // forEach(element, index, array)
                        element.data_de_nascimento = moment(element.data_de_nascimento).format('DD/MM/YYYY');
                    });
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        readNaoPagos: function readNaoPagos(id) {
            return db({
                query: 'SELECT * ' +
                    'FROM inscricao ' +
                    'INNER JOIN pagamento ON inscricao.id = pagamento.inscricao ' +
                    'WHERE inscricao.__status__ = 1 ' +
                    'AND pagamento.status = 0 ' +
                    'ORDER BY inscricao.nome_completo '
                // query: 'SELECT * FROM inscricao ' +
                //     'WHERE __status__ = 1 ' +
                //     'ORDER BY nome_completo '
            }).then(
                function resolve(value) {
                    if (value.length === 0) {
                        return {
                            message: 'Há nenhuma inscrição nesta situação.'
                        };
                    }
                    value.forEach(function forEach(element) {
                        // forEach(element, index, array)
                        element.data_de_nascimento = moment(element.data_de_nascimento).format('DD/MM/YYYY');
                    });
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        readPagos: function readPagos(id) {
            return db({
                query: 'SELECT * ' +
                    'FROM inscricao ' +
                    'INNER JOIN pagamento ON inscricao.id = pagamento.inscricao ' +
                    'WHERE inscricao.__status__ = 1 ' +
                    'AND pagamento.valor > 0 ' +
                    'AND pagamento.status = 1 ' +
                    'ORDER BY inscricao.nome_completo '
                // query: 'SELECT * FROM inscricao ' +
                //     'WHERE __status__ = 1 ' +
                //     'ORDER BY nome_completo '
            }).then(
                function resolve(value) {
                    if (value.length === 0) {
                        return {
                            message: 'Há nenhuma inscrição nesta situação.'
                        };
                    }
                    value.forEach(function forEach(element) {
                        // forEach(element, index, array)
                        element.data_de_nascimento = moment(element.data_de_nascimento).format('DD/MM/YYYY');
                    });
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        readIsentos: function readIsentos(id) {
            return db({
                query: 'SELECT * ' +
                    'FROM inscricao ' +
                    'INNER JOIN pagamento ON inscricao.id = pagamento.inscricao ' +
                    'WHERE inscricao.__status__ = 1 ' +
                    'AND pagamento.valor = 0 ' +
                    'AND pagamento.status = 1 ' +
                    'ORDER BY inscricao.nome_completo '
                // query: 'SELECT * FROM inscricao ' +
                //     'WHERE __status__ = 1 ' +
                //     'ORDER BY nome_completo '
            }).then(
                function resolve(value) {
                    if (value.length === 0) {
                        return {
                            message: 'Há nenhuma inscrição nesta situação.'
                        };
                    }
                    value.forEach(function forEach(element) {
                        // forEach(element, index, array)
                        element.data_de_nascimento = moment(element.data_de_nascimento).format('DD/MM/YYYY');
                    });
                    return value;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        full: function full() {
            return db({
                query: 'SELECT COUNT(*) AS count FROM inscricao '
            }).then(
                function resolve(value) {
                    return value[0].count >= info.limite;
                },
                function reject(reason) {
                    logbook.error(reason, '\nat: ' + __filename);
                    throw reason;
                }
            );
        },
        kill: function kill() {
            var checker;
            checker = require('../modules/checker');
            return checker();
            // return db({
            //     query: 'SELECT COUNT(*) AS count FROM inscricao '
            // }).then(
            //     function resolve(value) {
            //         return value[0].count >= info.limite;
            //     },
            //     function reject(reason) {
            //         logbook.error(reason, '\nat: ' + __filename);
            //         throw reason;
            //     }
            // );
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
                        'pessoa_com_deficiencia = ?, ' +
                        'deficiencia_auditiva = ?, ' +
                        'deficiencia_motora = ?, ' +
                        'deficiencia_visual = ?, ' +
                        'outras_deficiencias = ?, ' +
                        'grau_de_escolaridade = ?, ' +
                        'nome_da_ultima_instituicao_de_ensino = ?, ' +
                        'tipo_da_ultima_instituicao_de_ensino = ?, ' +
                        'ultimo_curso = ?, ' +
                        'area_de_conhecimento_do_ultimo_curso = ?, ' +
                        'profissao = ?, ' +
                        'empresa = ?, ' +
                        'atividade = ?, ' +
                        'cidade_de_nascimento = ?, ' +
                        'vii = ?, ' +
                        'vi = ?, ' +
                        'v = ?, ' +
                        'iv = ?, ' +
                        'iii = ?, ' +
                        'ii = ?, ' +
                        'i = ?, ' +
                        'tipo_de_projeto_programa_acao = ?, ' +
                        'blog_site_perfil = ? ' +
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
                    'pessoa_com_deficiencia',
                    'deficiencia_auditiva',
                    'deficiencia_motora',
                    'deficiencia_visual',
                    'outras_deficiencias',
                    'grau_de_escolaridade',
                    'nome_da_ultima_instituicao_de_ensino',
                    'tipo_da_ultima_instituicao_de_ensino',
                    'ultimo_curso',
                    'area_de_conhecimento_do_ultimo_curso',
                    'profissao',
                    'empresa',
                    'atividade',
                    'cidade_de_nascimento',
                    'vii',
                    'vi',
                    'v',
                    'iv',
                    'iii',
                    'ii',
                    'i',
                    'tipo_de_projeto_programa_acao',
                    'blog_site_perfil',
                    'id'
                ],
                data: inscricao
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
        destroy: function destroy(id) {
            return db({
                query: 'UPDATE inscricao SET ' +
                        '__status__ = 0 ' +
                    'WHERE id = ? ',
                array: [
                    id
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
        },
        verifyCPF: function verifyCPF(cpf) {
            return db({
                query: 'SELECT cpf FROM inscricao ' +
                    'WHERE __status__ = 1 ' +
                    'AND cpf = ? ',
                array: [
                    cpf
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

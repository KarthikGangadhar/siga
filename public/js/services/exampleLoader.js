angular
    .module('main')
    .factory('exampleLoader', [
        function exampleLoaderFactory() {
            'use strict';
            return {
                thiago: function thiago(inscricao) {
                    inscricao.id = 1;
                    inscricao.nome_completo = 'Thiago Condurú Figueiredo';
                    inscricao.data_de_nascimento = '5/8/1981';
                    inscricao.sexo = 'Masculino';
                    inscricao.email = 'thiagocondurufigueiredo@gmail.com';
                    inscricao.estrangeiro = false;
                    inscricao.cpf = '32426555670';
                    inscricao.nome_do_documento = '';
                    inscricao.numero_do_documento = '';
                    inscricao.codigo_internacional_1 = '55';
                    inscricao.codigo_nacional_1 = '91';
                    inscricao.numero_1 = '32242991';
                    inscricao.codigo_internacional_2 = '55';
                    inscricao.codigo_nacional_2 = '91';
                    inscricao.numero_2 = '80274849';
                    inscricao.codigo_internacional_3 = '55';
                    inscricao.codigo_nacional_3 = '';
                    inscricao.numero_3 = '';
                    inscricao.endereco = '';
                    inscricao.logradouro = 'Rua Jerônimo Pimentel';
                    inscricao.numero = '236';
                    inscricao.complemento = 'Apartamento 702';
                    inscricao.bairro = 'Umarizal';
                    inscricao.localidade = 'Belém';
                    inscricao.uf = 'PA';
                    inscricao.cep = '66055000';
                    inscricao.nome_no_cracha = 'Thiago Figueiredo';
                    inscricao.categoria = 'Profissional';
                    inscricao.curso_ou_formacao = 'Tecnologia em Processamento de Dados';
                    inscricao.acronimo_da_instituicao_ou_empresa = 'UNAMA';
                    inscricao.nome_da_instituicao_ou_empresa = 'Universidade da Amazônia';
                    return inscricao;
                },
                sherlock: function sherlock(inscricao) {
                    inscricao.id = 2;
                    inscricao.nome_completo = 'Sherlock Holmes';
                    inscricao.data_de_nascimento = '6/1/1854';
                    inscricao.sexo = 'Masculino';
                    inscricao.email = 'sh@johnwatsonblog.co.uk';
                    inscricao.estrangeiro = true;
                    inscricao.cpf = '';
                    inscricao.nome_do_documento = 'Passport';
                    inscricao.numero_do_documento = 'S443778';
                    inscricao.codigo_internacional_1 = '44';
                    inscricao.codigo_nacional_1 = '207';
                    inscricao.numero_1 = '2243688';
                    inscricao.codigo_internacional_2 = '55';
                    inscricao.codigo_nacional_2 = '';
                    inscricao.numero_2 = '';
                    inscricao.codigo_internacional_3 = '55';
                    inscricao.codigo_nacional_3 = '';
                    inscricao.numero_3 = '';
                    inscricao.endereco = '221b Baker Street\nLondon\nNW1 6XE\nEngland';
                    inscricao.logradouro = '';
                    inscricao.numero = '';
                    inscricao.complemento = '';
                    inscricao.bairro = '';
                    inscricao.localidade = '';
                    inscricao.uf = '';
                    inscricao.cep = '';
                    inscricao.nome_no_cracha = 'Holmes';
                    inscricao.categoria = 'Profissional';
                    inscricao.curso_ou_formacao = 'Consulting Detective';
                    inscricao.acronimo_da_instituicao_ou_empresa = '';
                    inscricao.nome_da_instituicao_ou_empresa = 'Scotland Yard';
                    return inscricao;
                }
            };
        }
    ]);

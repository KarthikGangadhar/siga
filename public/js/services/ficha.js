angular
    .module('sg')
    .factory('ficha', function fichaFactory($http) {

        'use strict';

        var ficha = function ficha(name) {

                if (cache[name]) {

                    return cache[name];

                }

                return ficha.example[name] && ficha.example[name](), ficha.data;

            },

            cache = {};

        ficha.data = {};

        ficha.reset = function reset() {

            ficha.data.inscrito = {};
            ficha.data.inscrito.nome_completo = '';
            ficha.data.inscrito.data_de_nascimento = '';
            ficha.data.inscrito.sexo = 'Feminino';
            ficha.data.inscrito.email = '';
            ficha.data.inscrito.estrangeiro = false;
            ficha.data.inscrito.cpf = '';
            ficha.data.inscrito.nome_do_documento = '';
            ficha.data.inscrito.numero_do_documento = '';
            ficha.data.inscrito.codigo_internacional_1 = '55';
            ficha.data.inscrito.codigo_nacional_1 = '';
            ficha.data.inscrito.numero_1 = '';
            ficha.data.inscrito.codigo_internacional_2 = '55';
            ficha.data.inscrito.codigo_nacional_2 = '';
            ficha.data.inscrito.numero_2 = '';
            ficha.data.inscrito.codigo_internacional_3 = '55';
            ficha.data.inscrito.codigo_nacional_3 = '';
            ficha.data.inscrito.numero_3 = '';
            ficha.data.inscrito.endereco = '';
            ficha.data.inscrito.logradouro = '';
            ficha.data.inscrito.numero = '';
            ficha.data.inscrito.complemento = '';
            ficha.data.inscrito.bairro = '';
            ficha.data.inscrito.localidade = '';
            ficha.data.inscrito.uf = '';
            ficha.data.inscrito.cep = '';
            ficha.data.detalhes = {};
            ficha.data.detalhes.nome_no_cracha = '';
            ficha.data.detalhes.categoria = 'Estudante';
            ficha.data.detalhes.curso_ou_formacao = '';
            ficha.data.detalhes.acronimo_da_instituicao_ou_empresa = '';
            ficha.data.detalhes.nome_da_instituicao_ou_empresa = '';

        };

        ficha.reset();

        ficha.example = {

            thiago: function thiago() {

                ficha.data.inscrito.nome_completo = 'Thiago Condurú Figueiredo';
                ficha.data.inscrito.data_de_nascimento = '5/8/1981';
                ficha.data.inscrito.sexo = 'Masculino';
                ficha.data.inscrito.email = 'thiagocondurufigueiredo@gmail.com';
                ficha.data.inscrito.estrangeiro = false;
                ficha.data.inscrito.cpf = '32426555670';
                ficha.data.inscrito.nome_do_documento = '';
                ficha.data.inscrito.numero_do_documento = '';
                ficha.data.inscrito.codigo_internacional_1 = '55';
                ficha.data.inscrito.codigo_nacional_1 = '91';
                ficha.data.inscrito.numero_1 = '32242991';
                ficha.data.inscrito.codigo_internacional_2 = '55';
                ficha.data.inscrito.codigo_nacional_2 = '91';
                ficha.data.inscrito.numero_2 = '80274849';
                ficha.data.inscrito.codigo_internacional_3 = '55';
                ficha.data.inscrito.codigo_nacional_3 = '';
                ficha.data.inscrito.numero_3 = '';
                ficha.data.inscrito.endereco = '';
                ficha.data.inscrito.logradouro = 'Rua Jerônimo Pimentel';
                ficha.data.inscrito.numero = '236';
                ficha.data.inscrito.complemento = 'Apartamento 702';
                ficha.data.inscrito.bairro = 'Umarizal';
                ficha.data.inscrito.localidade = 'Belém';
                ficha.data.inscrito.uf = 'PA';
                ficha.data.inscrito.cep = '66055000';
                ficha.data.detalhes.nome_no_cracha = 'Thiago Figueiredo';
                ficha.data.detalhes.categoria = 'Profissional';
                ficha.data.detalhes.curso_ou_formacao = 'Tecnologia em Processamento de Dados';
                ficha.data.detalhes.acronimo_da_instituicao_ou_empresa = 'UNAMA';
                ficha.data.detalhes.nome_da_instituicao_ou_empresa = 'Universidade da Amazônia';

                cache = {
                    thiago: ficha.data
                };

            },

            sherlock: function sherlock() {

                ficha.data.inscrito.nome_completo = 'Sherlock Holmes';
                ficha.data.inscrito.data_de_nascimento = '6/1/1854';
                ficha.data.inscrito.sexo = 'Masculino';
                ficha.data.inscrito.email = 'sh@johnwatsonblog.co.uk';
                ficha.data.inscrito.estrangeiro = true;
                ficha.data.inscrito.cpf = '';
                ficha.data.inscrito.nome_do_documento = 'Passport';
                ficha.data.inscrito.numero_do_documento = 'S443778';
                ficha.data.inscrito.codigo_internacional_1 = '44';
                ficha.data.inscrito.codigo_nacional_1 = '207';
                ficha.data.inscrito.numero_1 = '2243688';
                ficha.data.inscrito.codigo_internacional_2 = '55';
                ficha.data.inscrito.codigo_nacional_2 = '';
                ficha.data.inscrito.numero_2 = '';
                ficha.data.inscrito.codigo_internacional_3 = '55';
                ficha.data.inscrito.codigo_nacional_3 = '';
                ficha.data.inscrito.numero_3 = '';
                ficha.data.inscrito.endereco = '221b Baker Street\nLondon\nNW1 6XE\nEngland';
                ficha.data.inscrito.logradouro = '';
                ficha.data.inscrito.numero = '';
                ficha.data.inscrito.complemento = '';
                ficha.data.inscrito.bairro = '';
                ficha.data.inscrito.localidade = '';
                ficha.data.inscrito.uf = '';
                ficha.data.inscrito.cep = '';
                ficha.data.detalhes.nome_no_cracha = 'Holmes';
                ficha.data.detalhes.categoria = 'Profissional';
                ficha.data.detalhes.curso_ou_formacao = 'Consulting Detective';
                ficha.data.detalhes.acronimo_da_instituicao_ou_empresa = '';
                ficha.data.detalhes.nome_da_instituicao_ou_empresa = 'Scotland Yard';

                cache = {
                    sherlock: ficha.data
                };

            }

        };

        ficha.save = function save() {

        };

        return ficha;

    });

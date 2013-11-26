angular
    .module('sg')
    .factory('inscricao', function () {

        'use strict';

        var inscricao = function inscricao(name) {

                if (cache[name]) {

                    return cache[name];

                }

                return inscricao.example[name] && inscricao.example[name](), inscricao.data;

            },

            cache = {};

        inscricao.data = {};

        inscricao.reset = function reset() {

            inscricao.data.inscrito = {};
            inscricao.data.inscrito.nome_completo = '';
            inscricao.data.inscrito.data_de_nascimento = '';
            inscricao.data.inscrito.sexo = 'Feminino';
            inscricao.data.inscrito.email = '';
            inscricao.data.inscrito.estrangeiro = false;
            inscricao.data.inscrito.cpf = '';
            inscricao.data.inscrito.nome_do_documento = '';
            inscricao.data.inscrito.codigo_do_documento = '';
            inscricao.data.inscrito.codigo_internacional_1 = '55';
            inscricao.data.inscrito.codigo_nacional_1 = '';
            inscricao.data.inscrito.numero_1 = '';
            inscricao.data.inscrito.codigo_internacional_2 = '55';
            inscricao.data.inscrito.codigo_nacional_2 = '';
            inscricao.data.inscrito.numero_2 = '';
            inscricao.data.inscrito.codigo_internacional_3 = '55';
            inscricao.data.inscrito.codigo_nacional_3 = '';
            inscricao.data.inscrito.numero_3 = '';
            inscricao.data.inscrito.endereco = '';
            inscricao.data.inscrito.logradouro = '';
            inscricao.data.inscrito.numero = '';
            inscricao.data.inscrito.complemento = '';
            inscricao.data.inscrito.bairro = '';
            inscricao.data.inscrito.localidade = '';
            inscricao.data.inscrito.uf = '';
            inscricao.data.inscrito.cep = '';
            inscricao.data.detalhes = {};
            inscricao.data.detalhes.nome_no_cracha = '';
            inscricao.data.detalhes.categoria = 'Estudante';
            inscricao.data.detalhes.curso_ou_formacao = '';
            inscricao.data.detalhes.acronimo_da_instituicao_ou_empresa = '';
            inscricao.data.detalhes.nome_da_instituicao_ou_empresa = '';

        };

        inscricao.reset();

        inscricao.example = {

            thiago: function thiago() {

                inscricao.data.inscrito.nome_completo = 'Thiago Condurú Figueiredo';
                inscricao.data.inscrito.data_de_nascimento = '5/8/1981';
                inscricao.data.inscrito.sexo = 'Masculino';
                inscricao.data.inscrito.email = 'thiagocondurufigueiredo@gmail.com';
                inscricao.data.inscrito.estrangeiro = false;
                inscricao.data.inscrito.cpf = '32426555670';
                inscricao.data.inscrito.nome_do_documento = '';
                inscricao.data.inscrito.codigo_do_documento = '';
                inscricao.data.inscrito.codigo_internacional_1 = '55';
                inscricao.data.inscrito.codigo_nacional_1 = '91';
                inscricao.data.inscrito.numero_1 = '32242991';
                inscricao.data.inscrito.codigo_internacional_2 = '55';
                inscricao.data.inscrito.codigo_nacional_2 = '91';
                inscricao.data.inscrito.numero_2 = '80274849';
                inscricao.data.inscrito.codigo_internacional_3 = '55';
                inscricao.data.inscrito.codigo_nacional_3 = '';
                inscricao.data.inscrito.numero_3 = '';
                inscricao.data.inscrito.endereco = '';
                inscricao.data.inscrito.logradouro = 'Rua Jerônimo Pimentel';
                inscricao.data.inscrito.numero = '236';
                inscricao.data.inscrito.complemento = 'Apartamento 702';
                inscricao.data.inscrito.bairro = 'Umarizal';
                inscricao.data.inscrito.localidade = 'Belém';
                inscricao.data.inscrito.uf = 'PA';
                inscricao.data.inscrito.cep = '66055000';
                inscricao.data.detalhes.nome_no_cracha = 'Thiago Figueiredo';
                inscricao.data.detalhes.categoria = 'Profissional';
                inscricao.data.detalhes.curso_ou_formacao = 'Tecnologia em Processamento de Dados';
                inscricao.data.detalhes.acronimo_da_instituicao_ou_empresa = 'UNAMA';
                inscricao.data.detalhes.nome_da_instituicao_ou_empresa = 'Universidade da Amazônia';

                cache = {
                    thiago: inscricao.data
                };

            }

        };

        return inscricao;

    });

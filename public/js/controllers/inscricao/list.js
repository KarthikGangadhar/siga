angular
    .module('main')
    .controller('inscricao/list', [
        '$route',
        '$scope',
        'data',
        function inscricao_ListController(
            $route,
            $scope,
            data
        ) {
            'use strict';
            if (data.message) {
                $scope.emptyMessage = data.message;
            } else {
                $scope.inscricoes = data;
            }
            $scope.show = {
                nome_completo: true,
                data_de_nascimento: true,
                sexo: true,
                email: false,
                cpf: true,
                documento_de_identificacao: true,
                telefones: true,
                logradouro: false,
                numero: false,
                complemento: false,
                bairro: false,
                localidade: false,
                uf: false,
                cep: false,
                endereco: false
            };
        }
    ]);

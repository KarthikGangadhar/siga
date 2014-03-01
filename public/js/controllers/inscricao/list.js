angular
    .module('main')
    .controller('inscricao/list', [
        '$route',
        '$scope',
        function inscricao_ListController(
            $route,
            $scope
        ) {
            'use strict';
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
            $scope.showPhone = function showPhone(inscricao, number) {
                return inscricao['codigo_nacional_' + number] && inscricao['numero_' + number];
            };
            $scope.inscricoes = $route.current.locals.loadedInscricoes;
        }
    ]);

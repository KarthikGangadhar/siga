angular
    .module('main')
    .controller('inscricao/listController', [
        '$route',
        '$scope',
        'data',
        'inscricaoService',
        function inscricao_ListController(
            $route,
            $scope,
            data,
            inscricaoService
        ) {
            'use strict';
            $scope.confirmar = function confirmar(id, inscricao) {
                inscricaoService
                    .confirmar(id)
                    .then(
                        function resolve(value) {
                            inscricao.status = 1;
                        },
                        function reject(reason) {
                            inscricao.status = false;
                        }
                    );
            };
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
                documento_de_identificacao: false,
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

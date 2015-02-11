angular
    .module('main')
    .controller('inscricao/listIsentosController', [
        '$route',
        '$scope',
        'data',
        'inscricaoService',
        function inscricao_ListIsentosController(
            $route,
            $scope,
            data,
            inscricaoService
        ) {
            'use strict';
            $scope.total = 0;
            $scope.confirmar = function confirmar(id, inscricao) {
                var
                    valor;
                valor = prompt('Insira o valor pago');
                inscricaoService
                    .confirmar(id, valor)
                    .then(
                        function resolve(value) {
                            inscricao.status = 1;
                        },
                        function reject(reason) {
                            inscricao.status = 'erro';
                        }
                    );
            };
            if (data.message) {
                $scope.emptyMessage = data.message;
            } else {
                $scope.total = data.length;
                $scope.inscricoes = data;
            }
            $scope.show = {
                nome_completo: true,
                nome_no_cracha: true,
                empresa: true,
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

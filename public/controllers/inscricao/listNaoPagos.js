angular
    .module('main')
    .controller('inscricao/listNaoPagosController', [
        '$route',
        '$scope',
        'data',
        'inscricaoService',
        function inscricao_ListNaoPagosController(
            $route,
            $scope,
            data,
            inscricaoService
        ) {
            'use strict';
            $scope.formatDate = function formatDate(date) {
                return moment(date).utc().format('DD/MM/YYYY')
            };
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
                data_de_nascimento: false,
                sexo: false,
                email: false,
                cpf: true,
                documento_de_identificacao: false,
                telefones: false,
                logradouro: false,
                numero: false,
                complemento: false,
                bairro: false,
                localidade: false,
                uf: false,
                cep: false,
                endereco: false,
                valor: true,
                data: true
            };
        }
    ]);

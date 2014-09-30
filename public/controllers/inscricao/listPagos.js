angular
    .module('main')
    .controller('inscricao/listPagosController', [
        '$route',
        '$scope',
        'data',
        'inscricaoService',
        function inscricao_ListPagosController(
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
                    data,
                    dataNaoAjustada,
                    valor;
                valor = prompt('Insira o valor pago');
                dataNaoAjustada = prompt('Insira a data do pagamento');
                data = moment.utc(dataNaoAjustada, 'DD/MM/YYYY').format();
                if (!moment(data).isValid()) {
                    alert('A data "' + dataNaoAjustada + '" é inválida. Confirmação cancelada.');
                    return;
                }
                inscricaoService
                    .confirmar(id, valor, data)
                    .then(
                        function resolve(value) {
                            if (value.status === 401) {
                                alert('Ação Não Autorizada!');
                                return;
                            }
                            inscricao.status = 1;
                            $route.reload();
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

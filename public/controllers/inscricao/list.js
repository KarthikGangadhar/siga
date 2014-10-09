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
                email: true,
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

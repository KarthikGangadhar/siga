angular
    .module('stPagamento', [])
    .controller('pagamentoController', [
        '$http',
        '$scope',
        function pagamentoController(
            $http,
            $scope
        ) {
            'use strict';
            $http
                .get('/api/pagamento/' + $scope.inscricao.id)
                .then(
                    function resolve(value) {
                        $scope.pagamento = value.data;
                        $scope.valor = $scope.pagamento.dadosDePagamento.valores[$scope.inscricao.categoria];
                    },
                    function reject(reason) {
                        console.log(reason)
                    }
                );
        }
    ]);

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
                .get('/api/pagamento')
                .then(
                    function resolve(value) {
                        $scope.pagamento = value.data;
                    },
                    function reject(reason) {
                        console.log(reason)
                    }
                );
        }
    ]);

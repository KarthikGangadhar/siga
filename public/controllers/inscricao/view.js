angular
    .module('main')
    .controller('inscricao/viewController', [
        '$scope',
        'exampleLoader',
        'data',
        function inscricao_ViewController(
            $scope,
            exampleLoader,
            data
        ) {
            'use strict';
            if (data.message) {
                $scope.emptyMessage = data.message;
            } else {
                $scope.inscricao = data;
            }
            // carregador de exemplos para testes
            // exampleLoader.sherlock($scope.inscricao);
            // exampleLoader.thiago($scope.inscricao);
        }
    ]);

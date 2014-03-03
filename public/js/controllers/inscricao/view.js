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
            $scope.inscricao = data;
            // carregador de exemplos para testes
            // exampleLoader.sherlock($scope.inscricao);
            // exampleLoader.thiago($scope.inscricao);
        }
    ]);

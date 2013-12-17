angular
    .module('sg')
    .controller('inscricao', function inscricaoController($scope, ficha) {

        'use strict';

        $scope.inscrito = ficha().inscrito;

        $scope.detalhes = ficha().detalhes;

        $scope.showPhone = function showPhone(number) {

            return $scope.inscrito['codigo_nacional_' + number] && $scope.inscrito['numero_' + number];

        };

    });

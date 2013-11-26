angular
    .module('sg')
    .controller('ficha', function ficha($scope, cadastroDePessoaFisica, random, inscricao) {

        'use strict';

        $scope.helpers = {

            cpf: cadastroDePessoaFisica(),

            data_de_nascimento: random.getRandomInt(13, 28).toString(10) + '/' + random.getRandomInt(1, 12).toString(10) + '/' + random.getRandomInt(1948, 1995).toString(10)

        };

        $scope.inscrito = inscricao().inscrito;

        $scope.detalhes = inscricao().detalhes;

        $scope.form_actions = {

            reset: inscricao.reset

        };

        $scope.isInvalidField = function isInvalidField(fieldName) {

            return $scope.ficha[fieldName].$invalid && $scope.ficha[fieldName].$dirty;

        };

        $scope.isRequired = function isRequired(fieldName) {

            return $scope.ficha[fieldName].$invalid && $scope.ficha[fieldName].$pristine;

        };

    });

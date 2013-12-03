angular
    .module('sg')
    .controller('ficha', function fichaController($scope, cadastroDePessoaFisica, random, ficha, messenger) {

        'use strict';

        var afterInvalidSubmission = false,

            invalidSubmissionMessage = '<strong>Atenção!</strong> Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de salvar.';

        $scope.data_de_nascimento = random.getRandomInt(13, 28).toString(10) + '/' + random.getRandomInt(1, 12).toString(10) + '/' + random.getRandomInt(1948, 1995).toString(10);

        $scope.cpf = cadastroDePessoaFisica();

        $scope.$_setBlurred = function $_setBlurred(fieldName) {

            $scope.ficha[fieldName].$_blurred = true;

        };

        $scope.isInvalidField = function isInvalidField(fieldName) {

            return $scope.ficha[fieldName].$invalid && ($scope.ficha[fieldName].$_blurred || afterInvalidSubmission);

        };

        $scope.submit = function submit() {

            afterInvalidSubmission = true;

            if ($scope.ficha.$valid) {

                ficha.save();

            } else {

                messenger.danger(invalidSubmissionMessage);

            }

        };

        $scope.reset = function reset() {

            var property;

            $scope.ficha.$setPristine();

            afterInvalidSubmission = false;

            for (property in $scope.ficha) {

                if ($scope.ficha.hasOwnProperty(property) && $scope.ficha[property].$_blurred === true) {

                    $scope.ficha[property].$_blurred = false;

                }

            }

            ficha.reset();

            $scope.inscrito = ficha().inscrito;

            $scope.detalhes = ficha().detalhes;

        };

        ficha('sherlock');

        $scope.inscrito = ficha().inscrito;

        $scope.detalhes = ficha().detalhes;

    });

angular
    .module('sg')
    .controller('ficha', function ficha($scope, cadastroDePessoaFisica, random, inscricao, messenger) {

        'use strict';

        var afterInvalidSubmission = false,

            invalidSubmissionMessage = '<strong>Atenção!</strong> Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de salvar.';

        $scope.data_de_nascimento = random.getRandomInt(13, 28).toString(10) + '/' + random.getRandomInt(1, 12).toString(10) + '/' + random.getRandomInt(1948, 1995).toString(10);

        $scope.cpf = cadastroDePessoaFisica();

        $scope.isInvalidField = function isInvalidField(fieldName) {

            return $scope.ficha[fieldName].$invalid && ($scope.ficha[fieldName].$dirty || afterInvalidSubmission);

        };

        $scope.submit = function submit() {

            afterInvalidSubmission = true;

            if ($scope.ficha.$valid) {

                inscricao.save();

            } else {

                messenger.danger(invalidSubmissionMessage);

            }

        };

        $scope.reset = function reset() {

            $scope.ficha.$setPristine();

            afterInvalidSubmission = false;

            inscricao.reset();

            $scope.inscrito = inscricao().inscrito;

            $scope.detalhes = inscricao().detalhes;

        };

        // inscricao('thiago');

        $scope.inscrito = inscricao().inscrito;

        $scope.detalhes = inscricao().detalhes;

    });

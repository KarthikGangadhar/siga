angular
    .module('main')
    .controller('inscricao/edit', [
        '$location',
        '$route',
        '$scope',
        'cadastroDePessoaFisica',
        'exampleLoader',
        'inscricao',
        'notifier',
        'random',
        function paciente_EditController(
            $location,
            $route,
            $scope,
            cadastroDePessoaFisica,
            exampleLoader,
            inscricao,
            notifier,
            random
        ) {
            'use strict';
            var afterInvalidSubmission = false,
                validSubmissionMessage = '<strong>Sucesso!</strong> Sua inscrição foi salva com sucesso.',
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
                $scope.saveButtonDisabled = true;
                if ($scope.ficha.$valid) {
                    if ($scope.inscricao.id) {
                        inscricao
                            .update($scope.inscricao)
                            .then(
                                function resolve(value) {
                                    notifier(validSubmissionMessage, {
                                        location: 'topRight',
                                        timeout: 5000,
                                        type: 'success'
                                    });
                                    $scope.saveButtonDisabled = false;
                                    $location.path('/inscricao/' + value);
                                },
                                function reject(reason) {
                                    $scope.saveButtonDisabled = false;
                                    throw reason;
                                }
                            );
                    } else {
                        inscricao
                            .create($scope.inscricao)
                            .then(
                                function resolve(value) {
                                    notifier(validSubmissionMessage, {
                                        location: 'topRight',
                                        timeout: 5000,
                                        type: 'success'
                                    });
                                    $scope.saveButtonDisabled = false;
                                    $location.path('/inscricao/' + value);
                                },
                                function reject(reason) {
                                    $scope.saveButtonDisabled = false;
                                    throw reason;
                                }
                            );
                    }
                } else {
                    notifier(invalidSubmissionMessage, {
                        location: 'topRight',
                        timeout: 10000,
                        type: 'danger',
                        width: 500
                    });
                    $scope.saveButtonDisabled = false;
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
                $scope.inscricao = inscricao();
            };
            if ($route.current.locals.inscricao) {
                $scope.action = 'Editar';
                $scope.inscricao = $route.current.locals.inscricao;
            } else {
                $scope.action = 'Nova';
                $scope.inscricao = inscricao();
                // carregador de exemplos para testes
                // exampleLoader.sherlock($scope.inscricao);
                // exampleLoader.thiago($scope.inscricao);
            }
        }
    ]);

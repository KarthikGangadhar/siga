angular
    .module('main')
    .controller('inscricao/editController', [
        '$location',
        '$rootScope',
        '$route',
        '$scope',
        'cadastroDePessoaFisica',
        'exampleLoader',
        'inscricaoService',
        'notifier',
        'random',
        function paciente_EditController(
            $location,
            $rootScope,
            $route,
            $scope,
            cadastroDePessoaFisica,
            exampleLoader,
            inscricaoService,
            notifier,
            random
        ) {
            'use strict';
            var afterInvalidSubmission = false,
                validSubmissionMessage = '<strong>Sucesso!</strong> Sua inscrição foi salva com sucesso.',
                invalidSubmissionMessage = '<strong>Atenção!</strong> Alguns campos contém valores inválidos ou são obrigatórios e não foram preenchidos. Estes campos estão destacados em vermelho. Por favor, corrija-os antes de salvar.',
                unwatcher;
            $scope.data_de_nascimento = random.getRandomInt(13, 28).toString(10) + '/' + random.getRandomInt(1, 12).toString(10) + '/' + random.getRandomInt(1948, 1995).toString(10);
            $scope.cpf = cadastroDePessoaFisica();
            $scope.saveButtonDisabled = false;
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
                        inscricaoService
                            .update($scope.inscricao)
                            .then(
                                function resolve(value) {
                                    if (value.message) {
                                        notifier('O CPF fornecido já foi usado em uma inscrição. Por favor, entre em contato com o administrador do sistema.', {
                                            timeout: 15000,
                                            type: 'danger'
                                        });
                                        $scope.saveButtonDisabled = false;
                                        return false;
                                    }
                                    notifier(validSubmissionMessage, {
                                        location: 'topRight',
                                        timeout: 5000,
                                        type: 'success'
                                    });
                                    $scope.saveButtonDisabled = false;
                                    $rootScope.session.inscricao = parseInt(value, 10);
                                    $location.path('/inscricao/' + value);
                                },
                                function reject(reason) {
                                    notifier('Ocorreu um erro durante o salvamento da inscrição. Por favor, tente novamente.', {
                                        timeout: 10000,
                                        type: 'danger'
                                    });
                                    $scope.saveButtonDisabled = false;
                                    throw reason;
                                }
                            );
                    } else {
                        inscricaoService
                            .create($scope.inscricao)
                            .then(
                                function resolve(value) {
                                    if (value.message) {
                                        notifier('O CPF fornecido já foi usado em uma inscrição. Por favor, entre em contato com o administrador do sistema.', {
                                            timeout: 15000,
                                            type: 'danger'
                                        });
                                        $scope.saveButtonDisabled = false;
                                        $scope.inscricao.format();
                                        return false;
                                    }
                                    notifier(validSubmissionMessage, {
                                        location: 'topRight',
                                        timeout: 5000,
                                        type: 'success'
                                    });
                                    $scope.saveButtonDisabled = false;
                                    $location.path('/inscricao/' + value);
                                },
                                function reject(reason) {
                                    notifier('Ocorreu um erro durante o salvamento da inscrição. Por favor, tente novamente.', {
                                        timeout: 10000,
                                        type: 'danger'
                                    });
                                    $scope.saveButtonDisabled = false;
                                    // throw reason;
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
                $scope.inscricao = inscricaoService();
            };
            if ($route.current.locals.data) {
                $scope.action = 'Editar';
                $scope.inscricao = $route.current.locals.data;
            } else {
                $scope.action = 'Nova';
                $scope.inscricao = inscricaoService();
                $scope.inscricao.email = $scope.session.email;
                // caso o usuario esteja acessando o sistema pela primeira vez e tentando
                // se inscrever e necessario escutar o momento em que a sessao e criada
                // e colocar o email do usuario no campo correspondente no formulario de
                // inscricao (mesmo porque, o campo nao sera editavel por usuarios sem
                // a permissao especial: MULTIPLE)
                if ($scope.inscricao.email === '') {
                    unwatcher = $scope.$watch('session.email', function watch() {
                        if ($scope.session.email) {
                            $scope.inscricao.email = $scope.session.email;
                            unwatcher();
                        }
                    });
                }
                // carregador de exemplos para testes
                // exampleLoader.sherlock($scope.inscricao);
//                exampleLoader.thiago($scope.inscricao);
            }
        }
    ]);

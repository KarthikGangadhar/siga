angular
    .module('main', [
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'notifier',
        'Scope.safeApply'
    ])
    .config(function config($routeProvider, $locationProvider) {
        'use strict';
        $locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: '/js/views/home.html',
            controller: 'home'
        });
        $routeProvider.when('/inscricao/listar', {
            templateUrl: '/js/views/inscricao/list.html',
            controller: 'inscricao/list',
            resolve: {
                inscricoes: [
                    'inscricao',
                    'notifier',
                    function (
                        inscricao,
                        notifier
                    ) {
                        return inscricao
                            .read()
                            .then(
                                function resolve(value) {
                                    return value;
                                },
                                function reject(reason) {
                                    notifier('Ocorreu um erro no carregamento das inscrições. Por favor, tente novamente.', {
                                        timeout: 10000,
                                        type: 'danger'
                                    });
                                }
                            );
                    }]
            }
        });
        $routeProvider.when('/inscricao/nova', {
            templateUrl: '/js/views/inscricao/edit.html',
            controller: 'inscricao/edit'
        });
        $routeProvider.when('/inscricao/:id/editar', {
            templateUrl: '/js/views/inscricao/edit.html',
            controller: 'inscricao/edit',
            resolve: {
                inscricao: function ($route, inscricao) {
                    return inscricao
                        .read($route.current.params.id)
                        .then(
                            function resolve(value) {
                                return value;
                            },
                            function reject(reason) {
                                notifier('Ocorreu um erro no carregamento desta inscrição. Por favor, tente novamente.', {
                                    timeout: 10000,
                                    type: 'danger'
                                });
                            }
                        );
                }
            }
        });
        $routeProvider.when('/inscricao/:id', {
            templateUrl: '/js/views/inscricao/view.html',
            controller: 'inscricao/view',
            resolve: {
                inscricao: function ($route, inscricao) {
                    return inscricao
                        .read($route.current.params.id)
                        .then(
                            function resolve(value) {
                                return value;
                            },
                            function reject(reason) {
                                notifier('Ocorreu um erro no carregamento desta inscrição. Por favor, tente novamente.', {
                                    timeout: 10000,
                                    type: 'danger'
                                });
                            }
                        );
                }
            }
        });
    });

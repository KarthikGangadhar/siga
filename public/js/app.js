angular
    .module('main', [
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'notifier',
        'Scope.safeApply'
    ])
    .config([
        '$routeProvider',
        '$locationProvider',
        function config(
            $routeProvider,
            $locationProvider
        ) {
            'use strict';
            $locationProvider.html5Mode(true);
            $routeProvider.when('/', {
                templateUrl: '/js/templates/home.html',
                controller: 'homeController'
            });
            $routeProvider.when('/inscricao/listar', {
                templateUrl: '/js/templates/inscricao/list.html',
                controller: 'inscricao/listController',
                resolve: {
                    data: [
                        'inscricaoService',
                        function data(
                            inscricaoService
                        ) {
                            return inscricaoService
                                .read({
                                    notifyOnReject: true
                                });
                        }
                    ]
                }
            });
            $routeProvider.when('/inscricao/nova', {
                templateUrl: '/js/templates/inscricao/edit.html',
                controller: 'inscricao/editController'
            });
            $routeProvider.when('/inscricao/:id/editar', {
                templateUrl: '/js/templates/inscricao/edit.html',
                controller: 'inscricao/editController',
                resolve: {
                    data: [
                        '$route',
                        'inscricaoService',
                        function data(
                            $route,
                            inscricaoService
                        ) {
                            return inscricaoService
                                .read({
                                    id: $route.current.params.id,
                                    notifyOnReject: true
                                });
                        }
                    ]
                }
            });
            $routeProvider.when('/inscricao/:id', {
                templateUrl: '/js/templates/inscricao/view.html',
                controller: 'inscricao/viewController',
                resolve: {
                    data: [
                        '$route',
                        'inscricaoService',
                        function data(
                            $route,
                            inscricaoService
                        ) {
                            return inscricaoService
                                .read({
                                    id: $route.current.params.id,
                                    notifyOnReject: true
                                });
                        }
                    ]
                }
            });
            $routeProvider.otherwise({
                template: '<pre style="position: absolute; right: 50px; bottom: 50px;">Página Inexistente!</pre>'
            });
        }
    ]);

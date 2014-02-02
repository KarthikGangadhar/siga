angular
    .module('sg', [
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'Scope.safeApply',
        'mcMessenger'
    ])
    .config(function config($routeProvider, $locationProvider) {

        'use strict';

        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: '/views/home.html',
            controller: 'home'
        });

        $routeProvider.when('/ficha', {
            templateUrl: '/views/ficha.html',
            controller: 'ficha'
        });

        $routeProvider.when('/inscricao', {
            templateUrl: '/views/inscricao.html',
            controller: 'inscricao'
        });

    });

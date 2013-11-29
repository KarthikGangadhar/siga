angular
    .module('sg', [
        'angular-growl',
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'Scope.safeApply'
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

    });

angular
    .module('sg', ['ngRoute', 'ngTouch', 'ngAnimate'])
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

angular
    .module('sg')
    .controller('navbar', function navbarController($scope, $route, ficha) {

        'use strict';

        $scope.login = function login() {

        };

        $scope.loadExample = function loadExample(name) {

            ficha(name);

            $route.reload();

        };

        $scope.unloadExample = function unloadExample() {

            ficha.reset();

            $route.reload();

        };

    });

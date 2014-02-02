angular
    .module('sg')
    .controller('navbar', function navbarController($location, $scope, $route, ficha, mcMessenger) {

        'use strict';

        $scope.path = $location.path();

        $scope.$on('$locationChangeSuccess', function onLocationChangeSuccess(event, next, current) {

            $scope.path = $location.path();

        });

        $scope.login = function login() {

            mcMessenger('Entrando no sistema!', {
                type: 'info'
            }, 'topMiddle');

        };

        $scope.loadExample = function loadExample(name) {

            ficha(name);

            $route.reload();

            mcMessenger('Exemplo <b>' + name + '</b> carregado...', {}, 'bottomLeft');

        };

        $scope.unloadExample = function unloadExample() {

            ficha.reset();

            $route.reload();

            mcMessenger('Exemplo descarregado...', {}, 'bottomLeft');

        };

    });

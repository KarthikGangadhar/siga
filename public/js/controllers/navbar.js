angular
    .module('sg')
    .controller('navbar', function navbarController($scope, $route, messenger, ficha) {

        'use strict';

        $scope.login = function login() {

            messenger.warning('Entrando no Sistema!');

        };

        $scope.loadExample = function loadExample(name) {

            messenger.info('Carregando o exemplo <b>' + name + '</b>.', {
                align: 'right'
            });

            ficha(name);

            $route.reload();

        };

        $scope.unloadExample = function unloadExample() {

            messenger.info('Descarregando exemplo.', {
                align: 'right'
            });

            ficha.reset();

            $route.reload();

        };

    });

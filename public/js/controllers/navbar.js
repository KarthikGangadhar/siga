angular
    .module('main')
    .controller('navbarController', [
        '$scope',
        'sessionService',
        function navbarController(
            $scope,
            sessionService
        ) {
            'use strict';
            sessionService
                .then(function (value) {
                    $scope.session = value;
                });
        }
    ]);

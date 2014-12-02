angular
    .module('main')
    .controller('homeController', [
        '$scope',
        'data',
        'check',
        function homeController(
            $scope,
            data,
            check
        ) {
            'use strict';
            $scope.data = (data === 'true') ? true : false;
            $scope.check = check.bool;
        }
    ]);

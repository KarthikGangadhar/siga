angular
    .module('main')
    .controller('homeController', [
        '$scope',
        'data',
        function homeController(
            $scope,
            data
        ) {
            'use strict';
            $scope.data = (data === 'true') ? true : false;
        }
    ]);

angular
    .module('sg')
    .directive('sgUppercase', function sgUppercase() {

        'use strict';

        return {

            require: 'ngModel',

            link: function (scope, element, attributes, control) {

                control.$parsers.unshift(function (viewValue) {

                    var processedValue = angular.uppercase(viewValue);

                    return processedValue;

                });

            }

        };

    });

angular
    .module('sg')
    .directive('sgUppercase', function sgUppercaseDirective() {

        'use strict';

        return {

            require: 'ngModel',

            link: function (scope, element, attributes, control) {

                control.$parsers.unshift(function (viewValue) {

                    var processedValue;

                    if (viewValue) {

                        processedValue = angular.uppercase(viewValue);

                        element.val(processedValue);

                        return processedValue;

                    }

                });

            }

        };

    });

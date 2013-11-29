angular
    .module('sg')
    .directive('sgNumber', function sgNumber() {

        'use strict';

        return {

            require: 'ngModel',

            link: function (scope, element, attributes, control) {

                control.$parsers.unshift(function (viewValue) {

                    var processedValue;

                    if (viewValue) {

                        var processedValue = +viewValue;

                        if (isNaN(processedValue)) {

                            control.$setValidity('sgNumber', false);

                            return undefined;

                        }

                        control.$setValidity('sgNumber', true);

                        return viewValue;

                    }

                    control.$setValidity('sgNumber', false);

                    return undefined;

                });

            }

        };

    });

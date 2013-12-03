angular
    .module('sg')
    .directive('sgDigitsOnly', function sgDigitsOnlyDirective() {

        'use strict';

        return {

            require: 'ngModel',

            link: function (scope, element, attributes, control) {

                control.$parsers.unshift(function (viewValue) {

                    var processedValue;

                    if (viewValue === '') {

                        control.$setValidity('digits-only', true);

                        return '';

                    }

                    if (viewValue) {

                        var processedValue = +viewValue;

                        if (isNaN(processedValue)) {

                            control.$setValidity('digits-only', false);

                            return undefined;

                        }

                        control.$setValidity('digits-only', true);

                        return viewValue;

                    }

                    control.$setValidity('digits-only', false);

                    return undefined;

                });

            }

        };

    });

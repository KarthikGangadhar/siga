angular
    .module('main')
    .directive('stDigitsOnly', [
        function stDigitsOnlyDirective() {
            'use strict';
            return {
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
                },
                require: 'ngModel'
            };
        }
    ]);

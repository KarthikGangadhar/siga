angular
    .module('main')
    .directive('stUppercase', [
        function stUppercaseDirective() {
            'use strict';
            return {
                link: function (scope, element, attributes, control) {
                    control.$parsers.unshift(function (viewValue) {
                        var processedValue;
                        if (viewValue) {
                            processedValue = angular.uppercase(viewValue);
                            element.val(processedValue);
                            return processedValue;
                        }
                    });
                },
                require: 'ngModel'
            };
        }
    ]);

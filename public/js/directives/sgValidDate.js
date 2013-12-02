angular
    .module('sg')
    .directive('sgValidDate', function sgValidDate() {

        'use strict';

        if (typeof moment !== 'function') {

            throw 'Esta diretiva depende da biblioteca Moment!';

        }

        return {

            require: 'ngModel',

            link: function (scope, element, attributes, control) {

                control.$parsers.unshift(function (viewValue) {

                    var processedValue;

                    if (viewValue === '') {

                        control.$setValidity('valid-date', true);

                        return '';

                    }

                    if (viewValue && moment(viewValue, 'D/M/YYYY', true).isValid()) {

                        control.$setValidity('valid-date', true);

                        return viewValue;

                    }

                    control.$setValidity('valid-date', false);

                    return undefined;

                });

            }

        };

    });

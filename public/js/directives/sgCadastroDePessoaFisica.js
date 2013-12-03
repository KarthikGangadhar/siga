angular
    .module('sg')
    .directive('sgCadastroDePessoaFisica', function sgCadastroDePessoaFisicaDirective(cadastroDePessoaFisica) {

        'use strict';

        return {

            require: 'ngModel',

            link: function (scope, element, attributes, control) {

                control.$parsers.unshift(function (viewValue) {

                    if (viewValue && viewValue.length === 11) {

                        if (cadastroDePessoaFisica(viewValue)) {

                            control.$setValidity('cpf', true);

                            return viewValue;

                        }

                        control.$setValidity('cpf', false);

                        return undefined;

                    }

                    control.$setValidity('cpf', false);

                    return undefined;

                });

            }

        };

    });

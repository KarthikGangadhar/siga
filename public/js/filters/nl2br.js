angular
    .module('sg')
    .filter('nl2br', function nl2brFilter() {

        'use strict';

        return function nl2brFilterFunction(text) {

            return text.replace(/\n/g, '<br>');

        };

    });

angular
    .module('sg')
    .factory('messenger', function messengerFactory(growl) {

        'use strict';

        return {

            warning: function (text, time) {

                growl.addWarnMessage(text, {
                    enableHtml: true,
                    ttl: time || 10000
                });

            },

            info: function (text, time) {

                growl.addInfoMessage(text, {
                    enableHtml: true,
                    ttl: time || 10000
                });

            },

            success: function (text, time) {

                growl.addSuccessMessage(text, {
                    enableHtml: true,
                    ttl: time || 10000
                });

            },

            danger: function (text, time) {

                growl.addErrorMessage(text, {
                    enableHtml: true,
                    ttl: time || 10000
                });

            }

        };

    });

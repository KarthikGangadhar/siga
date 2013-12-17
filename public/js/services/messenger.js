angular
    .module('sg')
    .factory('messenger', function messengerFactory() {

        'use strict';

        var globalConfiguration = {

                align: 'center',
                delay: 6000,
                dismissable: true,
                marginFromBody: 20,
                offsetAmount: 20,
                offsetFrom: 'top',
                opacity: 0.9,
                spacing: 10,
                type: 'info',
                width: 'auto'

            },

            getMaxWidth = function getMaxWidth(marginFromBody) {

                return angular.element('body').outerWidth() - marginFromBody * 2 + 'px';

            },

            engine = function messenger(message, customConfiguration) {

                var element = angular.element('<div>'),

                    localConfiguration = angular.extend({}, globalConfiguration, customConfiguration);

                element
                    .attr('class', 'messenger alert')
                    .addClass('alert-' + localConfiguration.type);

                if (localConfiguration.delay === 0) {

                    localConfiguration.dismissable = true;

                }

                if (localConfiguration.dismissable) {

                    element
                        .addClass('alert-dismissable')
                        .append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');

                }

                element.append(message);

                angular
                    .element('.messenger')
                    .each(function forEach() {

                        var temp = 0;

                        temp += parseInt(angular.element(this).css(localConfiguration.offsetFrom), 10);
                        temp += angular.element(this).outerHeight();
                        temp += localConfiguration.spacing;

                        if (angular.element(this).css(localConfiguration.offsetFrom) === 'auto') {

                            return;

                        }

                        localConfiguration.offsetAmount = Math.max(localConfiguration.offsetAmount, temp);

                    });

                element
                    .css('display', 'none')
                    .css('margin', 0)
                    .css('max-width', getMaxWidth(localConfiguration.marginFromBody))
                    .css('opacity', localConfiguration.opacity)
                    .css('position', 'fixed')
                    .css('width', localConfiguration.width + 'px')
                    .css('z-index', '2000')
                    .css(localConfiguration.offsetFrom, localConfiguration.offsetAmount + 'px');

                angular
                    .element('body')
                    .append(element);

                switch (localConfiguration.align) {
                case 'center':

                    element
                        .css('margin-left', '-' + element.outerWidth() / 2 + 'px')
                        .css('left', '50%');

                    break;

                case 'left':

                    element.css('left', localConfiguration.marginFromBody + 'px');

                    break;

                default:

                    element.css('right', localConfiguration.marginFromBody + 'px');

                }

                element.fadeIn();

                angular
                    .element(window)
                    .resize(function onResize() {

                        element.css('max-width', getMaxWidth(localConfiguration.marginFromBody));

                    });

                if (localConfiguration.delay === 0) {

                    return;

                }

                element
                    .delay(localConfiguration.delay)
                    .fadeOut(function onFadeOut() {

                        angular
                            .element(this)
                            .alert('close');

                    });

            };

        return {

            info: function info(message, configuration) {

                configuration = configuration || {};

                configuration.type = 'info';

                engine(message, configuration);

            },

            danger: function danger(message, configuration) {

                configuration = configuration || {};

                configuration.type = 'danger';

                engine(message, configuration);

            },

            warning: function warning(message, configuration) {

                configuration = configuration || {};

                configuration.type = 'warning';

                engine(message, configuration);

            },

            success: function success(message, configuration) {

                configuration = configuration || {};

                configuration.type = 'success';

                engine(message, configuration);

            }

        };

    });

angular

    .module('mcMessenger', [])

    .value('mcMessengerRandomishOn', false)

    .factory('mcMessenger', function mcMessengerService() {

        'use strict';

        var messenger = function messenger(content, configuration, location) {

                configuration = configuration || {};

                location = location || 'topMiddle';

                var message = {
                    content: content,
                    dismissable: configuration.dismissable || true,
                    timeout: configuration.timeout === null ? null : configuration.timeout || 5000,
                    type: configuration.type || 'warning',
                    width: configuration.width || 'auto'
                };

                messenger.locations[location].push(message);

                return function close() {

                    var indexOf = messenger.locations[location].indexOf(message);

                    if (indexOf !== -1) {

                        messenger.locations[location].splice(indexOf, 1);

                    }

                };

            };

        messenger.configuration = {

            margin: 20

        };

        messenger.locations = {

            topLeft: [],

            topMiddle: [],

            topRight: [],

            bottomLeft: [],

            bottomMiddle: [],

            bottomRight: []

        };

        return messenger;

    })

    .factory('mcMessengerShortcuts', function mcMessengerShortcutsService(mcMessenger) {

        'use strict';

        mcMessenger.topLeft = function topLeft(content, configuration) {

            return mcMessenger(content, configuration, 'topLeft');

        };

        mcMessenger.topMiddle = function topLeft(content, configuration) {

            return mcMessenger(content, configuration, 'topMiddle');

        };

        mcMessenger.topRight = function topLeft(content, configuration) {

            return mcMessenger(content, configuration, 'topRight');

        };

        mcMessenger.bottomLeft = function topLeft(content, configuration) {

            return mcMessenger(content, configuration, 'bottomLeft');

        };

        mcMessenger.bottomMiddle = function topLeft(content, configuration) {

            return mcMessenger(content, configuration, 'bottomMiddle');

        };

        mcMessenger.bottomRight = function topLeft(content, configuration) {

            return mcMessenger(content, configuration, 'bottomRight');

        };

    })

    .factory('mcMessengerRandomish', function mcMessengerRandomishService(random, mcMessenger, mcMessengerRandomishOn) {

        'use strict';

        var mcMessengerRandomish = function mcMessengerRandomish() {

            var content = random.getRandomFromArray([
                    '<strong>Suspendisse</strong> accumsan placerat diam, vel.',
                    '<strong>Aliquam eu ultricies libero</strong>, vel viverra mauris. Pellentesque suscipit, elit a volutpat cursus, lacus sapien.',
                    '<strong>Sed lobortis mauris ante.</strong> Etiam urna turpis, gravida at convallis at, accumsan non augue. Pellentesque.',
                    '<strong>Integer vitae mi aliquet</strong>, condimentum ligula sit amet, viverra eros. Mauris condimentum vulputate enim, ut tincidunt turpis dapibus sed. Duis.',
                    '<strong>Morbi a quam ligula.</strong> Suspendisse potenti. Suspendisse convallis tempor tempor. Nam consequat gravida mauris in facilisis. Ut mauris purus, egestas sed sem vel, ullamcorper bibendum.'
                ]),

                configuration = {
                    dismissable: random.getRandomFromArray([true, false]),
                    timeout: random.getRandomFromArray([null, 2500, 5000, 7500, 10000]),
                    type: random.getRandomFromArray(['danger', 'info', 'success', 'warning']),
                    width: random.getRandomFromArray(['auto', 200, 300, 500])
                },

                location = random.getRandomFromArray(['topLeft', 'topMiddle', 'topRight', 'bottomLeft', 'bottomMiddle', 'bottomRight']);

            mcMessenger(content, configuration, location);

        };

        mcMessengerRandomish.on = mcMessengerRandomishOn;

        return mcMessengerRandomish;

    })

    .directive('mcMessenger', function mcMessengerDirective(mcMessenger, mcMessengerShortcuts, mcMessengerRandomish) {

        'use strict';

        return {

            restrict: 'AE',

            link: function link(scope, element, attributes) {

                scope.locations = mcMessenger.locations;

                if (mcMessengerRandomish.on) {

                    scope.randomish = mcMessengerRandomish;

                }

            },

            templateUrl: 'js/templates/mc-messenger.html'

        };

    })

    .directive('mcMessengerElement', function mcMessengerElementDirective($rootScope, $sce, $timeout, $window, mcMessenger) {

        'use strict';

        var calculateVerticalDistance = function calculateVerticalDistance(location) {

                var verticalDistance = mcMessenger.configuration.margin;

                mcMessenger.locations[location].forEach(function forEach(message, index, array) {

                    if (message.element) {

                        verticalDistance += parseInt(message.element.css('height'), 10);
                        verticalDistance += mcMessenger.configuration.margin;

                    }

                });

                return verticalDistance;

            },

            calculateMaxWidth = function calculateMaxWidth() {

                var maxWidth = 0;

                maxWidth -= mcMessenger.configuration.margin * 2;
                maxWidth += parseInt(angular.element('body').css('width'), 10);

                return maxWidth;

            },

            calculateLeftForCentre = function calculateLeftForCentre(width) {

                var leftForCentre = 0;

                leftForCentre = parseInt(angular.element('body').css('width'), 10);
                leftForCentre /= 2;
                leftForCentre -= parseInt(width, 10) / 2;

                return leftForCentre;

            },

            parseLocation = function parseLocation(location) {

                var parsedLocation = {

                    location: location,

                    vertical: location.indexOf('bottom') === 0 ? 'bottom' : 'top'

                };

                parsedLocation.horizontal = location.substring(parsedLocation.vertical.length);

                return parsedLocation;

            },

            repositionVertically = function repositionVertically(parsedLocation) {

                mcMessenger.locations[parsedLocation.location].forEach(function forEach(message, outerIndex, array) {

                    var verticalDistance = mcMessenger.configuration.margin,

                        animate = {};

                    array.forEach(function forEach(message, innerIndex, array) {

                        if (innerIndex < outerIndex) {

                            verticalDistance += parseInt(message.element.css('height'), 10);
                            verticalDistance += mcMessenger.configuration.margin;

                        }

                    });

                    animate[parsedLocation.vertical] = verticalDistance + 'px';

                    $timeout(function $timeout() {

                        message.element.animate(animate);

                    }, 300);

                });

            };


        return {

            link: function link(scope, element, attributes) {

                var parsedLocation = parseLocation(scope.location),

                    verticalDistance = calculateVerticalDistance(parsedLocation.location);


                scope.close = function close(index) {

                    scope.messages.splice(index, 1);

                    repositionVertically(parsedLocation);

                };

                if (angular.isNumber(scope.message.timeout)) {

                    $timeout(function $timeout() {

                        scope.close(scope.$index);

                    }, scope.message.timeout);

                }

                angular.element($window).on('resize', function onResize() {

                    $rootScope.$safeApply(function $safeApply() {

                        element.css('max-width', calculateMaxWidth() + 'px');

                    });

                });

                element.css('max-width', calculateMaxWidth() + 'px');
                element.css('width', scope.message.width + 'px');

                switch (parsedLocation.location) {

                case 'topLeft':

                    element.css('left', mcMessenger.configuration.margin + 'px');
                    element.css('top', verticalDistance + 'px');
                    element.css('z-index', 2000);

                    break;

                case 'topMiddle':

                    element.css('top', verticalDistance + 'px');
                    element.css('z-index', 2000);

                    $timeout(function $timeout() {

                        element.css('left', calculateLeftForCentre(parseInt(element.css('width'), 10)) + 'px');

                    });

                    angular.element($window).on('resize', function onResize() {

                        $rootScope.$safeApply(function $safeApply() {

                            element.css('left', calculateLeftForCentre(parseInt(element.css('width'), 10)) + 'px');

                        });

                    });

                    break;

                case 'topRight':

                    element.css('right', mcMessenger.configuration.margin + 'px');
                    element.css('top', verticalDistance + 'px');
                    element.css('z-index', 2000);

                    break;

                case 'bottomLeft':

                    element.css('bottom', verticalDistance + 'px');
                    element.css('left', mcMessenger.configuration.margin + 'px');
                    element.css('z-index', 2000);

                    break;

                case 'bottomMiddle':

                    element.css('bottom', verticalDistance + 'px');
                    element.css('z-index', 2000);

                    $timeout(function $timeout() {

                        element.css('left', calculateLeftForCentre(parseInt(element.css('width'), 10)) + 'px');

                    });

                    angular.element($window).on('resize', function onResize() {

                        $rootScope.$safeApply(function $safeApply() {

                            element.css('left', calculateLeftForCentre(parseInt(element.css('width'), 10)) + 'px');

                        });

                    });

                    break;

                case 'bottomRight':

                    element.css('bottom', verticalDistance + 'px');
                    element.css('right', mcMessenger.configuration.margin + 'px');
                    element.css('z-index', 2000);

                    break;

                }

                scope.message.element = element;

            }

        };

    });

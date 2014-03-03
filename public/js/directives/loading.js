angular
    .module('main')
    .directive('stLoading', [
        '$rootScope',
        '$timeout',
        'notifier',
        function stLoadingDirective(
            $rootScope,
            $timeout,
            notifier
        ) {
            'use strict';
            return {
                link: function link(scope, element) {
                    var promise,
                        notification,
                        notificationIsOn = false,
                        configuration = {
                            dismissable: false
                        };
                    $rootScope.$on('$routeChangeStart', function onRouteChangeStart(event, message) {
                        if (notificationIsOn) {
                            notification.remove();
                            notificationIsOn = false;
                        }
                        promise = $timeout(function $timeout() {
                            notification = notifier('Carregando. Aguarde, por favor!', configuration);
                            notificationIsOn = true;
                        }, 100);
                    });
                    $rootScope.$on('$routeChangeSuccess', function onRouteChangeSuccess(event, message) {
                        $timeout.cancel(promise);
                        if (notificationIsOn) {
                            notification.timeout(500);
                            notificationIsOn = false;
                        }
                    });
                    $rootScope.$on('$routeChangeError', function onRouteChangeError(event, message) {
                        if (notificationIsOn) {
                            notification.type('danger');
                            notification.content('Ocorreu um erro no carregamento desta página. Por favor, tente novamente.');
                            notification.timeout(10000);
                        } else {
                            console.warn('"Where in the world is notification?"');
                        }
                    });
                },
                restrict: 'A'
            };
        }
    ]);

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
                        notification.type('danger');
                        notification.content('Ocorreu um erro no carregamento de dados. Por favor, tente novamente.');
                        notification.timeout(5000);
                    });
                },
                restrict: 'A'
            };
        }
    ]);

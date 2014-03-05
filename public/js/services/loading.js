angular
    .module('main')
    .factory('loading', [
        '$rootScope',
        '$timeout',
        'notifier',
        function loadingFactory(
            $rootScope,
            $timeout,
            notifier
        ) {
            'use strict';
            var promise,
                notification,
                notificationIsOn = false,
                configuration = {
                    dismissable: false
                };
            $rootScope.$on('$routeChangeStart', function onRouteChangeStart() {
                // function onRouteChangeSuccess(event, message)
                $timeout.cancel(promise);
                if (notificationIsOn) {
                    notification.remove();
                    notificationIsOn = false;
                }
                promise = $timeout(function $timeout() {
                    notification = notifier('Carregando. Aguarde, por favor!', configuration);
                    notificationIsOn = true;
                }, 100);
            });
            $rootScope.$on('$routeChangeSuccess', function onRouteChangeSuccess() {
                // function onRouteChangeSuccess(event, message)
                $timeout.cancel(promise);
                if (notificationIsOn) {
                    notification.timeout(500);
                    notificationIsOn = false;
                }
            });
            $rootScope.$on('$routeChangeError', function onRouteChangeError() {
                // function onRouteChangeError(event, message)
                $timeout.cancel(promise);
                if (notificationIsOn) {
                    notification.type('danger');
                    notification.content('Ocorreu um erro no carregamento desta página. Por favor, tente novamente.');
                    notification.timeout(10000);
                }
            });
        }
    ]);

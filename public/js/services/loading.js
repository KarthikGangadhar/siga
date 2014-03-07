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
                errorConfiguration = {
                    timeout: 10000,
                    type: 'error'
                },
                errorMessage = 'Ocorreu um erro no carregamento desta página. Por favor, tente novamente.',
                loadingConfiguration = {
                    dismissable: false
                },
                loadingMessage ='Carregando. Aguarde, por favor!',
                notification,
                notificationIsOn = false;
            $rootScope.$on('$routeChangeStart', function onRouteChangeStart() {
                // function onRouteChangeSuccess(event, message)
                $timeout.cancel(promise);
                if (notificationIsOn) {
                    notification.remove();
                    notificationIsOn = false;
                }
                promise = $timeout(function $timeout() {
                    notification = notifier(loadingMessage, loadingConfiguration);
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
                if (notificationIsOn) {
                    notification.type(errorConfiguration.type);
                    notification.content(errorMessage);
                    notification.timeout(errorConfiguration.timeout);
                } else {
                    $timeout.cancel(promise);
                    notification = notifier(errorMessage, errorConfiguration);
                    notificationIsOn = true;
                }
            });
        }
    ]);

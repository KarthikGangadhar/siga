angular
    .module('main')
    .factory('sessionService', [
        '$http',
        '$location',
        '$q',
        'notifier',
        function sessionFactory(
            $http,
            $location,
            $q,
            notifier
        ) {
            'use strict';
            var SessionPrototype = {
                    login: function login() {
                        navigator.id.request();
                    },
                    logout: function logout() {
                        navigator.id.logout();
                    },
                    may: function may(action) {
                        if (this.permissions === null) {
                            return false;
                        }
                        return this.permissions.indexOf(action) !== -1;
                    },
                    mayNot: function mayNot(action) {
                        if (this.permissions === null) {
                            return true;
                        }
                        return this.permissions.indexOf(action) === -1;
                    },
                    set: function set(data) {
                        this.email = data ? data.email : '';
                        this.permissions = data ? data.permissions : '';
                        this.inscricao = data ? data.inscricao : '';
                        if (this.inscricao) {
                            $location.path('/inscricao/' + this.inscricao);
                        }
                    },
                    unset: function unset() {
                        this.email = null;
                        this.permissions = null;
                        this.inscricao = null;
                        $location.path('/');
                    }
                },
                Session = function Session(data) {
                    var session = Object.create(SessionPrototype);
                    session.set(data);
                    return session;
                },
                session = new Session(),
                activatePersona = function activatePersona(session, currentUser) {
                    var notification;
                    navigator.id.watch({
                        loggedInUser: currentUser,
                        onlogin: function onlogin(assertion) {
                            notification = notifier('Processando Login.', {
                                type: 'warning'
                            });
                            $http
                                .post('/api/session', {
                                    assertion: assertion
                                })
                                .then(
                                    function resolve(value) {
                                        notification.content('Login Processado com Sucesso!');
                                        notification.type('success');
                                        notification.timeout(2000);
                                        session.set(value.data);
                                    },
                                    function reject(reason) {
                                        notification.content('Ocorreu um Erro no Processamento de seu Login. Recarregue esta página e tente novamente. Caso este erro volte a ocorrrer entre em contato com o administrador do sistema.');
                                        notification.type('danger');
                                        navigator.id.logout();
                                        throw reason;
                                    }
                                );
                        },
                        onlogout: function onlogout() {
                            $http['delete']('/api/session')
                                .then(
                                    function resolve() {
                                        // function resolve(value)
                                        session.unset();
                                    },
                                    function reject(reason) {
                                        throw reason;
                                    }
                                );
                        }
                    });
                };
            $http
                .get('/api/session')
                .then(
                    function resolve(value) {
                        session.set(value.data);
                        activatePersona(session, value.data.email || null);
                    },
                    function reject(reason) {
                        throw reason;
                    }
                );
            return session;
        }
    ]);

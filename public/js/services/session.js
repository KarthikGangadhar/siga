angular
    .module('main')
    .factory('sessionService', [
        '$http',
        '$q',
        function sessionFactory(
            $http,
            $q
        ) {
            'use strict';
            var deferred = $q.defer(),
                SessionPrototype = {
                    login: function login() {
                        navigator.id.request();
                    },
                    logout: function logout() {
                        navigator.id.logout();
                    },
                    set: function set(data) {
                        this.email = data ? data.email : '';
                    },
                    unset: function unset() {
                        this.email = '';
                    }
                },
                Session = function Session(data) {
                    var session = Object.create(SessionPrototype);
                    session.set(data);
                    return session;
                },
                activatePersona = function activatePersona(session, currentUser) {
                    navigator.id.watch({
                        loggedInUser: currentUser,
                        onlogin: function onlogin(assertion) {
                            $http
                                .post('/api/session/login/', {
                                    assertion: assertion
                                })
                                .then(
                                    function resolve(value) {
                                        session.set(value.data);
                                    },
                                    function reject(reason) {
                                        throw reason;
                                    }
                                );
                        },
                        onlogout: function onlogout() {
                            $http['delete']('/api/session/logout/')
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
                .get('/api/session/')
                .then(
                    function resolve(value) {
                        var session = new Session(value.data);
                        activatePersona(session, value.data.email);
                        deferred.resolve(session);
                    },
                    function reject(reason) {
                        throw reason;
                    }
                );
            return deferred.promise;
        }
    ]);

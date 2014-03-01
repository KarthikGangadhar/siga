angular
    .module('main')
    .factory('simpleCache', [
        function simpleCacheFactory() {
            'use strict';
            return function cache() {
                var storage = false;
                return {
                    put: function put(entity) {
                        storage = entity;
                        return storage;
                    },
                    match: function match(id) {
                        if (storage.id === parseInt(id, 10)) {
                            return true;
                        }
                        return false;
                    },
                    get: function get(id) {
                        if (storage && storage.id === parseInt(id, 10)) {
                            return storage;
                        }
                        return 'Entity ID does not match ID param!';
                    },
                    empty: function empty() {
                        var temp = storage;
                        storage = false;
                        return temp;
                    }
                };
            };
        }
    ]);

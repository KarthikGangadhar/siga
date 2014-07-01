angular
    .module('main')
    .factory('random', [
        function randomFactory() {
            'use strict';
            // mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            return {
                getRandom: function getRandom() {
                    // Returns a random number between 0 (inclusive) and 1 (exclusive)
                    return Math.random();
                },
                getRandomArbitrary: function getRandomArbitrary(min, max) {
                    // Returns a random number between min and max
                    return Math.random() * (max - min) + min;
                },
                getRandomInt: function getRandomInt(min, max) {
                    // Returns a random integer between min and max
                    // Using Math.round() will give you a non-uniform distribution!
                    return Math.floor(Math.random() * (max - min + 1) + min);
                },
                getRandomFromArray: function getRandomFromArray(array) {
                    // homemade
                    return array[this.getRandomInt(0, array.length - 1)];
                }
            };
        }
    ]);

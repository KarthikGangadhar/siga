'use strict';
var
    moment = require('moment');
module.exports = function checker() {
    var
        o,
        mu = moment.utc(),
        mun = moment.utc().format();
    o = {
        bool: mu.isAfter('2014-12-02T03:01:00+00:00'),
        mu: mu,
        mun: mun
    };
    return o;
};

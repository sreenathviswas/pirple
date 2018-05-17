var config = require('./config');
var crypto = require('crypto');

var helper = {}

helper.hash = function (str) {
    if (typeof (str) == 'string' && str.length > 0) {
        return crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    }
    else {
        return {};
    }
};

helper.parseJSONToObject = function (str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return {};
    }
};


module.exports = helper;
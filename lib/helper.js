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
        var parsedData = JSON.parse(str);
        return parsedData;
    }
    catch (e) {
        return {};
    }
};

helper.createRandomString = function (strLength) {
    if (typeof (strLength) == 'number' && strLength > 0) {
        var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var str = '';
        for (let index = 0; index < strLength; index++) {
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
            str += randomCharacter;
        }
        return str;
    }
    else {
        return false;
    }
}


module.exports = helper;
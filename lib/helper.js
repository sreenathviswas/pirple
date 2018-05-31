var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var queryString = require('querystring');

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

helper.sendTwilioSms = function (phone, msg, callback) {
    var phone = typeof (phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    var msg = typeof (msg) == 'string' && msg.trim().length > 0 && msg.trim.length < 1600 ? msg.trim() : false;
    if (phone && msg) {
        var payload = {
            'From': config.twilio.fromPhone,
            'To': '+91' + phone,
            'Body': msg
        };

        var stringPayload = queryString.stringify(payload);

        var requestDetails = {
            'protocol': 'https:',
            'hostname': 'app.twilio.com',
            'method': 'POST',
            'path': '2010-04-01/Accounts/' + config.twilio.accountSid + '/Messages.json',
            'auth': config.twilio.accountSid + ':' + config.twilio.authToken,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        };

        var req = https.request(requestDetails, function (res) {
            if (res.statusCode == 200 || res.statusCode == 201) {
                callback(false);
            } else {
                callback('Status code returned was ' + res.statusCode);
            }
        });

        req.on('error', function (error) {
            callback(error);
        })

        req.write(stringPayload);
        req.end();
    } else {
        callback('Missing parameters');
    }
}


module.exports = helper;
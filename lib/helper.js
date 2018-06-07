var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var queryString = require('querystring');
var path = require('path');
var fs = require('fs');

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
};

helper.getTemplate = function (templateName, templateData, callback) {
    templateName = typeof (templateName) == 'string' && templateName.length > 0 ? templateName : false;
    templateData = typeof (templateData) == 'object' && templateData != null ? templateData : {};

    if (templateName) {
        var templateDir = path.join(__dirname, '/../templates/');
        fs.readFile(templateDir + templateName + '.html', 'utf8', function (err, str) {
            if (!err && str && str.length > 0) {
                var finalStr = helper.interpolate(str, templateData);
                callback(false, finalStr);
            } else {
                callback('Template not found!', err);
            }
        });
    } else {
        callback('Please specify a valid template name');
    }
};


helper.interpolate = function (str, data) {
    str = typeof (str) == 'string' && str.length > 0 ? str : '';
    data = typeof (data) == 'object' && data != null ? data : {};

    for (var key in config.templateGlobals) {
        if (config.templateGlobals.hasOwnProperty(key)) {
            data['global.' + key] = config.templateGlobals[key];
        };
    }

    for (var key in data) {
        if (data.hasOwnProperty(key) && typeof (data[key]) == 'string') {
            var replace = data[key];
            var find = '{' + key + '}';

            str = str.replace(find, replace);
        }
    }
    return str;
};

helper.addUniversalTemplates = function (template, templateData, callback) {
    template = typeof (template) == 'string' && template.length > 0 ? template : false;
    templateData = typeof (templateData) == 'object' && templateData != null ? templateData : {};

    helper.getTemplate('_header', templateData, function (err, header) {
        if (!err && header) {
            helper.getTemplate('_footer', templateData, function (err, footer) {
                if (!err && footer) {
                    var fullTemplate = header + template + footer;
                    callback(false, fullTemplate);
                } else {
                    callback('Could not find footer template', err);
                }
            });
        } else {
            callback('Could not find header template', err);
        }
    });
};

helper.getStaticAsset = function (fileName, callback) {
    fileName = typeof (fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if (fileName) {
        var publicDir = path.join(__dirname, '/../public/');

        fs.readFile(publicDir + fileName, function (err, data) {
            if (!err && data) {
                callback(false, data);
            } else {
                console.log(publicDir + fileName);
                console.log(err);
                callback('File not found');
            }
        });
    } else {
        callback('File name is not valid');
    }
};

module.exports = helper
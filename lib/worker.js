var helper = require('./helper');
var data = require('./data');
var path = require('path');
var url = require('url');
var http = require('http');
var https = require('https');
var fs = require('fs'); 4

var worker = {};


worker.init = function () {
    worker.gatherAllChecks();

    worker.loop();
}

worker.gatherAllChecks = function () {
    data.list('checks', function (err, checks) {
        if (!err && checks && checks.length > 0) {
            checks.forEach(function (check) {
                data.read('checks', check, function (err, oldCheck) {
                    if (!err && oldCheck) {
                        worker.validateCheck(oldCheck);
                    } else {
                        console.log('Error reading check from the store', check);
                    }
                });
            });
        } else {
            console.log('Could not found any check to process');
        }
    });
}

worker.validateCheck = function (oldCheck) {
    oldCheck = typeof (oldCheck) == 'object' && oldCheck !== null ? oldCheck : {};
    oldCheck.id = typeof (oldCheck.id) == 'string' && oldCheck.id.trim().length == 20 ? oldCheck.id : false;
    oldCheck.phone = typeof (oldCheck.phone) == 'string' && oldCheck.phone.trim().length == 10 ? oldCheck.phone : false;
    oldCheck.protocol = typeof (oldCheck.protocol) == 'string' && ['http', 'https'].indexOf(oldCheck.protocol) > -1 ? oldCheck.protocol : false;
    oldCheck.url = typeof (oldCheck.url) == 'string' && oldCheck.url.trim().length > 0 ? oldCheck.url.trim() : false;
    oldCheck.method = typeof (oldCheck.method) == 'string' && ['get', 'post', 'put', 'delete'].indexOf(oldCheck.method) > -1 ? oldCheck.method : false;
    oldCheck.successCodes = typeof (oldCheck.successCodes) == 'object' && oldCheck.successCodes instanceof Array && oldCheck.successCodes.length > 0 ? oldCheck.successCodes : false;
    oldCheck.timeOut = typeof (oldCheck.timeOut) == 'number' && oldCheck.timeOut % 1 === 0 && oldCheck.timeOut > 1 && oldCheck.timeOut < 5 ? oldCheck.timeOut : false;
    oldCheck.state = typeof (oldCheck.state) == 'string' && ['up', 'down'].indexOf(oldCheck.state) > -1 ? oldCheck.state : 'down';
    oldCheck.lastChecked = typeof (oldCheck.lastChecked) == 'number' && oldCheck.lastChecked > 0 ? oldCheck.lastChecked : false;

    if (oldCheck.id && oldCheck.phone && oldCheck.protocol && oldCheck.url &&
        oldCheck.method && oldCheck.successCodes && oldCheck.timeOut) {
        worker.performCheck(oldCheck);

    } else {
        console.log('Error: Check is not in a proper format, skipping', oldCheck);
    }
}

worker.performCheck = function (oldCheck) {
    var outcome = {
        'error': false,
        'responseCode': false
    };

    var outcomeSent = false;
    var parsedUrl = url.parse(oldCheck.protocol + '://' + oldCheck.url, true);
    var hostname = parsedUrl.hostname;
    var urlPath = parsedUrl.path;

    var requestDetails = {
        'protocol': oldCheck.protocol + ':',
        'hostname': hostname,
        'method': oldCheck.method,
        'path': urlPath,
        'timeOut': oldCheck.timeOut * 1000
    };

    var moduleToUse = oldCheck.protocol == 'http' ? http : https;

    var req = moduleToUse.request(requestDetails, function (res) {
        outcome.responseCode = res.statusCode;

        if (!outcomeSent) {
            worker.processOutcome(oldCheck, outcome);
            outcomeSent = true;
        }
    });

    req.on('error', function (e) {
        outcome.error = { 'error': true, 'value': e };
        if (!outcomeSent) {
            worker.processOutcome(oldCheck, outcome);
            outcomeSent = true;
        }
    });

    req.on('timeout', function () {
        outcome.error = { 'error': true, 'value': 'timeout' };
        if (!outcomeSent) {
            worker.processOutcome(oldCheck, outcome);
            outcomeSent = true;
        }
    });

    req.end();
}

worker.processOutcome = function (oldCheck, outcome) {
    var state = !outcome.error && outcome.responseCode && oldCheck.successCodes.indexOf(outcome.responseCode) > -1 ? 'up' : 'false';
    var alertWarranted = oldCheck.lastChecked && oldCheck.state !== state ? true : false;
    var newCheck = oldCheck;
    newCheck.state = state;
    newCheck.lastChecked = Date.now();

    data.update('checks', newCheck.id, newCheck, function (err) {
        if (!err) {
            if (alertWarranted) {
                worker.alertUserAboutStatusChange(newCheck);
            } else {
                console.log('Check outcome has not changed, no alert required');
            }
        } else {
            console.log('Error trying to save the check');
        }

    });
};

worker.alertUserAboutStatusChange = function (check) {
    var msg = 'Alert : Your check for' + check.method.toUpperCase() + ' ' + check.protocol + '://' + check.url + 'is currently ' + check.state;
    helper.sendTwilioSms(check.phone, msg, function (err) {
        if (!err) {
            console.log('Success : User was alerted to a status change in their check, via sms:', msg);
        } else {
            console.log('Error : Could not send sms alert to user who had a state change in their check', err);
        }
    });
}

worker.loop = function () {
    setInterval(function () {
        worker.gatherAllChecks();
    }, 60000)
}

module.exports = worker;
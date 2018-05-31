var environments = {};

environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
    'hashingSecret': 'MyBIGPassword',
    'maxChecks': 5,
    'twilio': {
        'accountSid': 'ACf6e1ca4bc690747d944e5669ff42f360',
        'authToken': '9e297824376435dcd4c7fbb62a8ffdde',
        'fromPhone': '+15612507291'
    }
};

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'MyBIGPassword',
    'maxChecks': 5,
    'twilio': {
        'accountSid': '',
        'authToken': '',
        'fromPhone': ''
    }
};

var currentEnv = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

module.exports = typeof (environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;
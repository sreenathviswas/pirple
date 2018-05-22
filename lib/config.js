var environments = {};

environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging',
    'hashingSecret': 'MyBIGPassword',
    'maxChecks': 5
};

environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production',
    'hashingSecret': 'MyBIGPassword',
    'maxChecks': 5
};

var currentEnv = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

module.exports = typeof (environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;
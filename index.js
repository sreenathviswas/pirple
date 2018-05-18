
var http = require('http');
var https = require('https');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./lib/config');
var fs = require('fs');
var data = require('./lib/data');
var helper = require('./lib/helper');
var handlers = require('./lib/handlers');

var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
}

var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
    unifiedServer(req, res);
});

var httpServer = http.createServer(function (req, res) {
    unifiedServer(req, res);
});

var unifiedServer = function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var method = req.method.toLowerCase();
    var queryString = parsedUrl.query;
    var headers = req.headers;

    var decoder = new stringDecoder('utf-8');
    var buffer = '';

    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handler.notFound;

        var data = {
            'path': trimmedPath,
            'queryString': queryString,
            'method': method,
            'header': headers,
            'payload': helper.parseJSONToObject(buffer)
        };
        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = (typeof (payload) == 'object' || typeof (payload) == 'string') ? payload : {};

            var payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // console.log("Request recied on path : ", trimmedPath, ' with method ', method, 'with query string ', queryString);
            // console.log("Headers", headers);
            // console.log("Payload", buffer);
        });
    });
}

httpServer.listen(config.httpPort, function () {
    console.log('Server listening on port ' + config.httpPort + ' on ' + config.envName + ' mode');
});

httpsServer.listen(config.httpsPort, function () {
    console.log('Server listening on port ' + config.httpsPort + ' on ' + config.envName + ' mode');
});

var router = {
    'ping': handlers.ping,
    'user': handlers.user
};
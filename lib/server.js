
var http = require('http');
var https = require('https');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var data = require('./data');
var helper = require('./helper');
var handlers = require('./handlers');
var path = require('path')

var server = {};

server.httpsServerOptions = {
    'key': fs.readFileSync(path.join(__dirname, '/../https/key.pem')),
    'cert': fs.readFileSync(path.join(__dirname, '/../https/cert.pem'))
}

server.httpsServer = https.createServer(server.httpsServerOptions, function (req, res) {
    server.unifiedServer(req, res);
});

server.httpServer = http.createServer(function (req, res) {
    server.unifiedServer(req, res);
});

server.unifiedServer = function (req, res) {
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

        var chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handler.notFound;

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



server.router = {
    'ping': handlers.ping,
    'user': handlers.user,
    'token': handlers.token,
    'check': handlers.check
};

server.init = function () {
    server.httpServer.listen(config.httpPort, function () {
        console.log('\x1b[36m%s\x1b[0m', 'The HTTP server is running on port ' + config.httpPort);
    });

    server.httpsServer.listen(config.httpsPort, function () {
        console.log('\x1b[36m%s\x1b[0m', 'The HTTPS server is running on port ' + config.httpsPort);
    });
}


module.exports = server;

var http = require('http');
var url = require('url');
var stringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var method = req.method.toUpperCase();
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

        var data = {};
        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log("Request recied on path : ", trimmedPath, ' with method ', method, 'with query string ', queryString);
            console.log("Headers", headers);
            console.log("Payload", buffer);
        });
    });
});

server.listen(config.port, function () {
    console.log('Server listening on port ' + config.port + ' on ' + config.envName + ' mode');
});

var handler = {};

handler.sample = function (data, callback) {
    callback(201, { 'name': 'Sample handler' });
};

handler.notFound = function (data, callback) {
    callback(404);
}

var router = {
    'sample': handler.sample
};
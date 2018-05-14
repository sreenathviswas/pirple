var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var method = req.method.toUpperCase();
    var queryString = parsedUrl.query;

    res.end('Hello World!');

    console.log("Request recied on path : ", trimmedPath, ' with method ', method, 'with query string ', queryString);
})

server.listen(3000, function () {
    console.log('Server listening on port 3000');
})
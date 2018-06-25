var server = require('./lib/server');
var worker = require('./lib/worker');
var cli = require('./lib/cli');


var app = {};

app.init = function () {
    server.init();

    worker.init();

    setTimeout(function () {
        cli.init()
    }, 50);
}

app.init();

module.exports = app;
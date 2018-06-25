var readline = require('readline');
var util = require('util');
var debug = util.debug;
var events = require('events');
class _events extends events { };
var e = new _events;
var os = require('os');
var v8 = require('v8');
var data = require('./data');
var heler = require('./helper');
var logs = require('./log');

var cli = {};

cli.init = function () {
    console.log('\x1b[34m%s\x1b[0m', 'The CLI is running');

    var interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    interface.prompt();

    interface.on('line', function (str) {
        cli.processInput(str);
        interface.prompt();
    });

    interface.on('close', function () {
        process.exit(0);
    });
}

cli.processInput = function (str) {
    str = typeof (str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    if (str) {
        var userInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];

        var matchfound = false;
        var counter = 0;
        userInputs.some(function (input) {
            if (str.toLowerCase().indexOf(input) > -1) {
                matchfound = true;
                e.emit(input, str);
                return true;
            }
        });

        if (!matchfound) {
            console.log('Option not found, please check typo and try again');
        }
    }
}

e.on('man', function () {
    cli.responders.help();
});

e.on('help', function () {
    cli.responders.help();
});

e.on('exit', function () {
    cli.responders.exit();
});

e.on('stats', function () {
    cli.responders.stats();
});

e.on('list users', function () {
    cli.responders.listUsers();
});

e.on('more user info', function (str) {
    cli.responders.moreUserInfo(str);
});

e.on('list checks', function (str) {
    cli.responders.listChecks(str);
});

e.on('more check info', function (str) {
    console.log('more check info', str);
});

e.on('list logs', function () {
    console.log('list logs');
});

e.on('more log info', function (str) {
    console.log('more log info', str);
});

cli.responders = {};

cli.responders.help = function () {
    var commands = {
        'exit': 'KILL the CLI (and the rest of the application)',
        'man': 'Show the help page',
        'help': 'Alias for the "man" command',
        'stats': 'Get statistics of the underlying operating system and resource utilization',
        'List users': 'Show the list of users',
        'More user info --{userid}': 'Show details of a specific user',
        'List checks --up --down': 'Show the list of checks',
        'More check info --{checkid}': 'Show details of a specific list',
        'List logs': 'Show list of all logs writter',
        'More log info --{filename}': 'Show details of specific log'
    }

    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(2);

    for (key in commands) {
        if (commands.hasOwnProperty(key)) {
            var value = commands[key];
            var line = '\x1b[33m' + key + '\x1b[0m';
            var padding = 60 - line.length;

            for (i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line);
            cli.verticalSpace();
        }
    }
    cli.verticalSpace();
    cli.horizontalLine();
};

cli.verticalSpace = function (lines) {
    lines = typeof (lines) == 'number' && lines > 0 ? lines : 1;
    for (i = 0; i < lines; i++) {
        console.log();
    }
};

cli.horizontalLine = function () {
    var width = process.stdout.columns;
    var line = '';
    for (i = 0; i < width; i++) {
        line += '-';
    }

    console.log(line);
}

cli.centered = function (str) {
    str = typeof (str) == 'string' && str.trim().length > 0 ? str.trim() : '';
    var width = process.stdout.columns;
    var leftPadding = Math.floor(width - str.length) / 2;
    var line = '';
    for (i = 0; i < leftPadding; i++) {
        line += ' ';
    }
    line += str;
    console.log(line);
};

cli.responders.exit = function () {
    process.exit(0);
};

cli.responders.stats = function () {
    var stats = {
        'Load Average': os.loadavg().join(' '),
        'CPU Count': os.cpus().length,
        'Free Memory': os.freemem(),
        'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Used (%)': Math.round(v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100,
        'Available Heap Allocated (%)': Math.round(v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100,
        'Uptime': os.uptime() + 'Seconds'
    };

    cli.horizontalLine();
    cli.centered('System Statistics');
    cli.horizontalLine();
    cli.verticalSpace(2);

    for (key in stats) {
        if (stats.hasOwnProperty(key)) {
            var value = stats[key];
            var line = '\x1b[33m' + key + '\x1b[0m';
            var padding = 60 - line.length;

            for (i = 0; i < padding; i++) {
                line += ' ';
            }
            line += value;
            console.log(line);
            cli.verticalSpace();
        }
    }
    cli.verticalSpace();
    cli.horizontalLine();
};

cli.responders.listUsers = function () {
    data.list('users', function (err, users) {
        if (!err && users && users.length > 0) {
            cli.verticalSpace();
            users.forEach(function (userId) {
                data.read('users', userId, function (err, user) {
                    if (!err && user) {
                        var line = 'Name: ' + user.firstName + ' ' + user.lastName + ' Phone: ' + user.phone + ' Checks: ';
                        var numberOfChecks = typeof (user.checks) == 'object' && user.checks instanceof Array && user.checks.length > 0 ? user.checks.length : 0;
                        line += numberOfChecks;
                        console.log(line);
                        cli.verticalSpace();
                    }
                });
            });
        }
    })
};

cli.responders.moreUserInfo = function (str) {
    var arr = str.split('--');
    var userId = typeof (arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if (userId) {
        data.read('users', userId, function (err, user) {
            if (!err && user) {
                delete user.password;
                cli.verticalSpace();
                console.dir(user, { 'colors': true });
                cli.verticalSpace();
            }
        });
    }
};

cli.responders.listChecks = function (str) {
    data.list('checks', function (err, checks) {
        if (!err && checks.length > 0) {
            cli.verticalSpace();
            checks.forEach(function (checkId) {
                data.read('checks', checkId, function (err, check) {
                    if (!err && check) {
                        var includeCheck = false;
                        var lowerString = str.toLowerCase();
                        var state = typeof (check.state) == 'string' ? check.state : 'down';
                        var stateOrUnknown = typeof (check.state) == 'string' ? check.state : 'unknown';
                        if ((lowerString.indexOf('--' + state) > -1) || (lowerString.indexOf('--down') == -1 && lowerString.indexOf('--up') == -1)) {
                            var line = 'ID: ' + check.id + ' ' + check.method.toUpperCase() + ' ' +
                            check.protocol + '://' + check.url + ' State : ' + stateOrUnknown;

                            console.log(line);
                            cli.verticalSpace();
                        }                        
                    }
                })
            });
        }
    })
}

module.exports = cli;
var fs = require('fs');
var path = require('path');
var zlib = require('zlib');

var log = {};

log.baseDir = path.join(__dirname, '/../logs/');

log.append = function (fileName, str, callback) {
    fs.open(log.baseDir + fileName + '.log', 'a', function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            fs.appendFile(fileDescriptor, str + '\n', function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            console.log('Could not close file');
                        }
                    });
                } else {
                    console.log('Could not append log');
                }
            });
        } else {
            console.log('Could not open file for appending log');
        }
    });
}

log.list = function (includeCompressedLogs, callback) {
    fs.readdir(log.baseDir, function (err, logs) {
        if (!err && logs && logs.length > 0) {
            var fileNames = [];
            logs.forEach(function (log) {
                if (log.indexOf('.log') > -1) {
                    fileNames.push(log.replace('.log', ''));
                }

                if (log.indexOf('.gz.b64') > -1 && includeCompressedLogs) {
                    fileNames.push(log.replace('.gz.b64', ''));
                }
            });
            callback(false, fileNames);
        } else {
            callback(err, logs);
        }
    });
};

log.compress = function (logId, newFileId, callback) {
    var sourceFile = logId + '.log';
    var destFile = newFileId + '.gz.b64';

    fs.readFile(log.baseDir + sourceFile, 'utf-8', function (err, inputString) {
        if (!err && inputString) {
            zlib.gzip(inputString, function (err, buffer) {
                if (!err && buffer) {
                    fs.open(log.baseDir + destFile, 'wx', function (err, fileDescriptor) {
                        if (!err && fileDescriptor) {
                            fs.writeFile(fileDescriptor, buffer.toString('base64'), function (err) {
                                if (!err) {
                                    fs.close(fileDescriptor, function (err) {
                                        if (!err) {
                                            callback(false);
                                        } else {
                                            callback(err);
                                        }
                                    });
                                } else {
                                    callback(false);
                                }
                            });
                        } else {
                            callback(err);
                        }
                    });
                } else {
                    callback(err);
                }
            });
        } else {
            callback(err);
        }
    });
};

log.decompress = function (fileId, callback) {
    var fileName = fileId + '.gz.b64';
    fs.readFile(log.baseDir + fileName, 'utf-8', function (err, str) {
        if (!err && str) {
            var inputBuffer = Buffer.from(str, 'base64');
            zlib.unzip(inputBuffer, function (err, outputBuffer) {
                if (!err && outputBuffer) {
                    var str = outputBuffer.toString();
                    callback(false, str);
                } else {
                    callback(err);
                }
            });
        } else {
            callback(err);
        }
    });
};

log.truncate = function (logId, callback) {
    fs.truncate(log.baseDir + logId + '.log', 0, function (err) {
        if (!err) {
            callback(false);
        } else {
            callback(err);
        }
    });
};

module.exports = log;
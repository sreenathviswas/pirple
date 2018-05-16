var fs = require('fs');
var path = require('path');


var lib = {};

lib.baseDir = path.join(__dirname, '/../data/');

lib.create = function (dir, file, data, callback) {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (error, fileDescriptor) {
        if (!error && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function (error) {
                if (!error) {
                    fs.close(fileDescriptor, function (error) {
                        if (!error) {
                            callback(false);
                        }
                        else {
                            callback('Could not close the file');
                        }
                    });
                } else {
                    callback('Could not write new file');
                }
            });
        }
        else {
            callback('Could not create the file, it may already exists');
        }
    });
}

lib.update = function (dir, file, data, callback) {
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (error, fileDescriptor) {
        if (!error && fileDescriptor) {
            var stringData = JSON.stringify(data);
            fs.truncate(fileDescriptor, function (error) {
                if (!error) {
                    fs.writeFile(fileDescriptor, stringData, function (error) {
                        if (!error) {
                            fs.close(fileDescriptor, function (error) {
                                if (!error) {
                                    callback(false);
                                }
                                else {
                                    callback('Could not close the file');
                                }
                            });
                        } else {
                            callback('Could not update file');
                        }
                    });
                }
                else {
                    callback('Could not truncate file');
                }
            });
        }
        else {
            callback('Could not update the file, it may not exist');
        }
    });
}

lib.read = function (dir, file, callback) {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', function (error, data) {
        callback(error, data);
    });
}

lib.delete = function (dir, file, callback) {
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', function (error) {
        if (!error) {
            callback(false);
        }
        else {
            callback('Could not delete file.');
        }
    });
}


module.exports = lib;
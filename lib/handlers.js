
var _data = require('./data');
var helper = require('./helper');
var config = require('./config')

var handler = {};

handler.index = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Uptime Monitoring - Mad Simple',
            'head.description': 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
            'body.class': 'index'
        };

        helper.getTemplate('index', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.accountCreate = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Create an Account',
            'head.description': 'Signup is easy and only takes a few seconds.',
            'body.class': 'accountCreate'
        };

        helper.getTemplate('accountCreate', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.accountEdit = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Account Settings',
            'body.class': 'accountEdit'
        };

        helper.getTemplate('accountEdit', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.accountDeleted = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Account Settings',
            'head.description' : 'Your account has been deleted.',
            'body.class': 'accountDeleted'
        };

        helper.getTemplate('accountDeleted', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.sessionCreate = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Login to your account',
            'head.description' : 'Please enter your phone number and password to access your account.',
            'body.class': 'sessionCreate'
        };

        helper.getTemplate('sessionCreate', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.sessionDeleted = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Logged Out',
            'head.description' : 'You have been logged out of your account',
            'body.class': 'sessionDeleted'
        };

        helper.getTemplate('sessionDeleted', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.checksList = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Dashboard',
            'body.class': 'checksList'
        };

        helper.getTemplate('checksList', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.checksCreate = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Create a New Check',
            'body.class': 'checksCreate'
        };

        helper.getTemplate('checksCreate', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.checksEdit = function (data, callback) {
    if (data.method == 'get') {
        var templateData = {
            'head.title': 'Check Details',
            'body.class': 'checksEdit'
        };

        helper.getTemplate('checksEdit', templateData, function (err, str) {
            if (!err && str) {
                helper.addUniversalTemplates(str, templateData, function (err, str) {
                    if (!err && str) {
                        callback(200, str, 'html');
                    } else {
                        callback(500, undefined, 'html');
                    }
                });
            } else {
                callback(500, undefined, 'html');
            }
        });
    } else {
        callback(405, undefined, 'html');
    }
};

handler.public = function (data, callback) {
    if (data.method == 'get') {
        var assetName = data.path.replace('public/', '').trim();
        if (assetName.length > 0) {
            helper.getStaticAsset(assetName, function (err, data) {
                if (!err && data) {
                    var contentType = 'plain';

                    if (assetName.indexOf('css') > -1) {
                        contentType = 'css';
                    }
                    if (assetName.indexOf('.png') > -1) {
                        contentType = 'png';
                    }
                    if (assetName.indexOf('.jpg') > -1) {
                        contentType = 'jpg';
                    }
                    if (assetName.indexOf('.ico') > -1) {
                        contentType = 'favicon';
                    }

                    callback(200, data, contentType);

                } else {
                    console.log(err);
                    callback(404);
                }
            });
        } else {
            console.log(err);
            callback(404);
        }

    } else {
        callback(405);
    }

}

handler.favicon = function (data, callback) {
    if (data.method == 'get') {
        helper.getStaticAsset('favicon.ico', function (err, data) {
            if (!err && data) {
                callback(200, data, 'favicon');
            } else {
                callback(500);
            }
        });
    } else {
        callback(405);
    }
}

handler.ping = function (data, callback) {
    callback(200);
};

handler.notFound = function (data, callback) {
    callback(404);
};

handler.user = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handler._user[data.method](data, callback);
    }
    else {
        callback(405);
    }

};


handler._user = {};


handler._user.get = function (data, callback) {
    var phone = typeof (data.queryString.phone) == 'string' && data.queryString.phone.trim().length == 10 ? data.queryString.phone : false;
    if (phone) {
        var token = typeof (data.header.token) == 'string' ? data.header.token : false;
        handler._token.verifyToken(token, phone, function (isTokenValid) {
            if (isTokenValid) {
                _data.read('users', phone, function (err, data) {
                    if (!err && data) {
                        delete data.password;
                        callback(200, data);
                    } else {
                        callback(404);
                    }
                });
            } else {
                callback(403, { 'Error': 'Missing required token in header or Token is invalid' });
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
}

handler._user.post = function (data, callback) {
    var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
    var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
    var tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        _data.read('users', phone, function (err, data) {
            if (err) {
                var hashPassword = helper.hash(password);
                if (hashPassword) {
                    var userObj = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'phone': phone,
                        'password': hashPassword,
                        'tosAgreement': true
                    }

                    _data.create('users', phone, userObj, function (err) {
                        if (!err) {
                            callback(200);
                        } else {
                            callback(500, 'Could not create new user');
                        }
                    })
                } else {
                    callback(500, { 'Error': 'Could not hash user password' });
                }
            } else {
                callback(400, { 'Error': 'User with same phone already exists' });
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }

}

handler._user.put = function (data, callback) {
    var firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
    var lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;

    if (phone && (firstName || lastName || password)) {
        var token = typeof (data.header.token) == 'string' ? data.header.token : false;
        handler._token.verifyToken(token, phone, function (isTokenValid) {
            if (isTokenValid) {
                _data.read('users', phone, function (err, userData) {
                    if (!err && userData) {
                        if (firstName) {
                            userData.firstName = firstName;
                        }
                        if (lastName) {
                            userData.lastName = lastName;
                        }
                        if (password) {
                            userData.password = helper.hash(password);
                        }
                        _data.update('users', phone, userData, function (err) {
                            if (!err) {
                                callback(200);
                            } else {
                                callback(500, { 'Error': 'Could not update user' });
                            }
                        });
                    } else {
                        callback(400, { 'Error': 'User doesnot exists' });
                    }
                });
            } else {
                callback(403, { 'Error': 'Missing required token in header or Token is invalid' });
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
}

handler._user.delete = function (data, callback) {
    var phone = typeof (data.queryString.phone) == 'string' && data.queryString.phone.trim().length == 10 ? data.queryString.phone : false;
    if (phone) {
        var token = typeof (data.header.token) == 'string' ? data.header.token : false;
        handler._token.verifyToken(token, phone, function (isTokenValid) {
            if (isTokenValid) {
                _data.read('users', phone, function (err, userData) {
                    if (!err && userData) {
                        _data.delete('users', phone, function (err) {
                            if (!err) {
                                var userChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                                var checksToDelete = userChecks.length;
                                if (checksToDelete) {
                                    var checkDeleted = 0;
                                    var deletionErrors = false;
                                    userChecks.forEach(function (checkId) {
                                        _data.delete('checks', checkId, function (err) {
                                            if (err) {
                                                deletionErrors = true;
                                            } else {
                                                checkDeleted++;
                                                if (checkDeleted == checksToDelete) {
                                                    if (!deletionErrors) {
                                                        callback(200);
                                                    } else {
                                                        callback(500, { 'Error': 'Not all checks deleted' });
                                                    }
                                                }
                                            }
                                        });
                                    });
                                } else {
                                    callback(200);
                                }
                            } else {
                                callback(500, { 'Error': 'Could not delete user' });
                            }
                        });
                    } else {
                        callback(400, { 'Error': 'User does not exists' });
                    }
                });
            }
            else {
                callback(403, { 'Error': 'Missing required token in header or Token is invalid' });
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
}

handler.token = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handler._token[data.method](data, callback);
    }
    else {
        callback(405);
    }
};


handler._token = {};

handler._token.get = function (data, callback) {
    var id = typeof (data.queryString.id) == 'string' && data.queryString.id.trim().length == 40 ? data.queryString.id : false;
    if (id) {
        _data.read('tokens', id, function (err, token) {
            if (!err && token) {
                callback(200, token);
            } else {
                callback(404);
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
};

handler._token.post = function (data, callback) {
    var phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone : false;
    var password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
    if (phone && password) {
        _data.read('users', phone, function (err, userData) {
            if (!err && userData) {
                var hashPassword = helper.hash(password);
                if (hashPassword == userData.password) {
                    var tokenId = helper.createRandomString(40);
                    var expires = Date.now() + 1000 * 60 * 60;
                    var tokenObj = {
                        'phone': phone,
                        'id': tokenId,
                        'expires': expires
                    };

                    _data.create('tokens', tokenId, tokenObj, function (err) {
                        if (!err) {
                            callback(200, tokenObj);
                        }
                        else {
                            console.log(err);
                            callback(500, { 'Error': 'Unable to store token' });
                        }
                    })
                } else {
                    callback(400, { 'Error': 'Password did not match the user\'s stored password' });
                }
            }
            else {
                callback(400, { 'Error': 'User doesnot exists' });
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
};

handler._token.put = function (data, callback) {
    var id = typeof (data.payload.id) == 'string' && data.payload.id.trim().length == 40 ? data.payload.id : false;
    if (id) {
        _data.read('tokens', id, function (err, token) {
            if (!err && token) {
                if (token.expires > Date.now()) {
                    token.expires = Date.now() + 1000 * 60 * 60;
                    _data.update('tokens', id, token, function (err) {
                        if (!err) {
                            callback(200);
                        } else {
                            callback(500, { 'Error': 'Could not extend token expiry' });
                        }
                    });
                }
                else {
                    callback(400, { 'Error': 'The token has already expiredm, and cannot be extended' });
                }

            } else {
                callback(404);
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
};

handler._token.delete = function (data, callback) {
    var id = typeof (data.queryString.id) == 'string' && data.queryString.id.trim().length == 40 ? data.queryString.id : false;
    if (id) {
        _data.read('tokens', id, function (err, token) {
            if (!err && token) {
                _data.delete('tokens', id, function (err) {
                    if (!err) {
                        callback(200);
                    } else {
                        callback(500, { 'Error': 'Could not delete token' });
                    }
                });
            } else {
                callback(400, { 'Error': 'Token does not exists' });
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
};

handler._token.verifyToken = function (id, phone, callback) {
    _data.read('tokens', id, function (err, token) {
        if (!err && token && token.phone == phone && token.expires > Date.now()) {
            callback(true);
        } else {
            callback(false);
        }
    });
};

handler.check = function (data, callback) {
    var acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handler._check[data.method](data, callback);
    }
    else {
        callback(405);
    }
};


handler._check = {};

handler._check.get = function (data, callback) {
    var id = typeof (data.queryString.id) == 'string' && data.queryString.id.trim().length == 20 ? data.queryString.id : false;
    if (id) {
        _data.read('checks', id, function (err, checkData) {
            if (!err && checkData) {
                var token = typeof (data.header.token) == 'string' ? data.header.token : false;
                handler._token.verifyToken(token, checkData.phone, function (isTokenValid) {
                    if (isTokenValid) {
                        callback(200, checkData);
                    } else {
                        callback(403, { 'Error': 'Missing required token in header or Token is invalid' });
                    }
                });
            } else {
                callback(400, { 'Error': 'Missing mandatory fields' });
            }
        });
    }else{
        callback(400, { 'Error': 'Missing mandatory fields' });
    }

};

handler._check.post = function (data, callback) {
    var protocol = typeof (data.payload.protocol) == 'string' && ['http', 'https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    var url = typeof (data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    var method = typeof (data.payload.method) == 'string' && ['get', 'post', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes = typeof (data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    var timeOut = typeof (data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds > 1 && data.payload.timeoutSeconds < 5 ? data.payload.timeoutSeconds : false;

    if (protocol && url && method && successCodes && timeOut) {
        var token = typeof (data.header.token) == 'string' ? data.header.token : false;
        _data.read('tokens', token, function (err, tokenData) {
            if (!err && tokenData) {
                _data.read('users', tokenData.phone, function (err, userData) {
                    if (!err && userData) {
                        var userChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                        if (userChecks.length < config.maxChecks) {
                            var checkId = helper.createRandomString(20);
                            var checkObj = {
                                "id": checkId,
                                "phone": tokenData.phone,
                                "protocol": protocol,
                                "url": url,
                                "method": method,
                                "successCodes": successCodes,
                                "timeOut": timeOut
                            }

                            _data.create('checks', checkId, checkObj, function (err) {
                                if (!err) {
                                    userData.checks = userChecks;
                                    userData.checks.push(checkId);
                                    _data.update('users', tokenData.phone, userData, function (err) {
                                        if (!err) {
                                            callback(200, checkObj);
                                        } else {
                                            callback(500, { 'Error': 'Could not update user with new check' });
                                        }
                                    });

                                } else {
                                    callback(500, { 'Error': 'Unable to create new check' });
                                }
                            });
                        } else {
                            callback(400, { 'Error': 'The user already has the maximum of checks' });
                        }
                    } else {
                        callback(403);
                    }
                });
            } else {
                callback(403);
            }
        });
    }
    else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
};

handler._check.put = function (data, callback) {
    var id = typeof (data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id : false;

    var protocol = typeof (data.payload.protocol) == 'string' && ['http', 'https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    var url = typeof (data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
    var method = typeof (data.payload.method) == 'string' && ['get', 'post', 'put', 'delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes = typeof (data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    var timeOut = typeof (data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds > 1 && data.payload.timeoutSeconds < 5 ? data.payload.timeoutSeconds : false;


    if (id && (protocol || url || method || successCodes || timeOut)) {
        _data.read('checks', id, function (err, check) {
            if (!err && check) {
                var token = typeof (data.header.token) == 'string' ? data.header.token : false;
                handler._token.verifyToken(token, check.phone, function (isTokenValid) {
                    if (isTokenValid) {
                        if (protocol) {
                            check.protocol = protocol;
                        }
                        if (url) {
                            check.url = url;
                        }
                        if (method) {
                            check.method = method;
                        }
                        if (successCodes) {
                            check.successCodes = successCodes;
                        }
                        if (timeOut) {
                            check.timeOut = timeOut;
                        }

                        _data.update('checks', id, check, function (err) {
                            if (!err) {
                                callback(200);
                            }
                            else {
                                callback(500, { 'Error': 'Unable to update check' });
                            }
                        });
                    } else {
                        callback(403);
                    }
                });
            } else {
                callback(404);
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
};

handler._check.delete = function (data, callback) {
    var id = typeof (data.queryString.id) == 'string' && data.queryString.id.trim().length == 20 ? data.queryString.id : false;
    if (id) {
        _data.read('checks', id, function (err, check) {
            if (!err && check) {
                var token = typeof (data.header.token) == 'string' ? data.header.token : false;
                handler._token.verifyToken(token, check.phone, function (isTokenValid) {
                    if (isTokenValid) {
                        _data.delete('checks', id, function (err) {
                            if (!err) {
                                _data.read('users', check.phone, function (err, userData) {
                                    if (!err && userData) {
                                        var userChecks = typeof (userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                                        var checkPosition = userChecks.indexOf(id);
                                        if (checkPosition > -1) {
                                            userChecks.splice(checkPosition, 1);
                                            userData.checks = userChecks;
                                            _data.update('users', check.phone, userData, function (err) {
                                                if (!err) {
                                                    callback(200);
                                                } else {
                                                    callback(500, { 'Error': 'Could not update user check' });
                                                }
                                            });
                                        } else {
                                            callback(500, { 'Error': 'Could not find check on the user data' });
                                        }
                                    } else {
                                        callback(500, { 'Error': 'Could not find user who created the check' });
                                    }
                                });
                            } else {
                                callback(500, { 'Error': 'Could not delete check' });
                            }
                        });
                    } else {
                        callback(403);
                    }

                });
            } else {
                callback(400, { 'Error': 'Token does not exists' });
            }
        });
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
};

module.exports = handler;
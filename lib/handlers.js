
var _data = require('./data');
var helper = require('./helper');

var handler = {};

handler.ping = function (data, callback) {
    callback(200);
};

handler.notFound = function (data, callback) {
    callback(404);
}

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
    var tosAgree = typeof (data.payload.tosAgree) == 'boolean' && data.payload.tosAgree == true ? true : false;

    if (firstName && lastName && phone && password && tosAgree) {
        var token = typeof (data.header.token) == 'string' ? data.header.token : false;
        handler._token.verifyToken(token, phone, function (isTokenValid) {
            if (isTokenValid) {
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
                                    callback(201);
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
            }
            else {
                callback(403, { 'Error': 'Missing required token in header or Token is invalid' });
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
                _data.read('users', phone, function (err, data) {
                    if (!err && data) {
                        _data.delete('users', phone, function (err) {
                            if (!err) {
                                callback(200);
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
    var id = typeof (data.queryString.id) == 'string' && data.queryString.id.trim().length == 41 ? data.queryString.id : false;
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
    var id = typeof (data.payload.id) == 'string' && data.payload.id.trim().length == 41 ? data.payload.id : false;
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
    var id = typeof (data.queryString.id) == 'string' && data.queryString.id.trim().length == 41 ? data.queryString.id : false;
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

module.exports = handler;
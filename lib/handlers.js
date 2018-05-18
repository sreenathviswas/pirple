
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
        _data.read('users', phone, function (err, data) {
            if (!err && data) {
                delete data.password;
                callback(200, data);
            } else {
                callback(404);
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
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
}

handler._user.delete = function (data, callback) {
    var phone = typeof (data.queryString.phone) == 'string' && data.queryString.phone.trim().length == 10 ? data.queryString.phone : false;
    if (phone) {
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
    } else {
        callback(400, { 'Error': 'Missing mandatory fields' });
    }
}

module.exports = handler;
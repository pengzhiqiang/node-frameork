const request = require('request');

module.exports = {
    PortalRequestGet: (options, callback) => {
        request(options, (err, responce, body) => {
            if (!err) {
                return callback(err, body);
            } else {
                return next(err);
            }
        });
    },
    PortalRequestPost: (options, callback) => {
        request.post(options, (err, responce, body) => {
            if (!err) {
                return callback(err, body);
            } else {
                return next(err);
            }
        });
    }
};

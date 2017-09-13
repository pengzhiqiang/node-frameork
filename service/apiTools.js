let Funcs = require("../lib/Funcs");
let _ = require("lodash");
let path = require("path");
let portalUrl = '';

module.exports = {
    startApiTestRequest: (req, opts, callback) => {
        let options = {};
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    }
}

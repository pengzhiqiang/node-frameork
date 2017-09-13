const WebRequest = require("./WebRequest");
const crypto = require("crypto");
const fs = require("fs");

module.exports = {
    //调用API
    callApis: (options, callback) => {
        if (options.form) {
            WebRequest.PortalRequestPost(options, callback);
        } else {
            WebRequest.PortalRequestGet(options, callback);
        }
    },

    //微信POST方式提交
    callWxApisPost: (options, callback) => {
        WebRequest.PortalRequestPost(options, callback);
    },

    //格式化JSON
    jsonStringify: (data, space) => {
        let seen = [];
        return JSON.stringify(data, function(key, val) {
            if (!val || typeof val !== 'object') {
                return val;
            }
            if (seen.indexOf(val) !== -1) {
                return '[Circular]';
            }
            seen.push(val);
            return val;
        }, space);
    },

    //MD5
    MD5: (string) => {
        return crypto.createHash('md5').update(string).digest('hex');
    },

    //写入文件
    WriteFile: (string) => {
        fs.writeFile('tryApi.txt', string, (err) => {
            if (!err) {
                console.log('写入成功');
            }
        });
    }

}

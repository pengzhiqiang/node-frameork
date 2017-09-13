const config = require("config");
const path = require("path");
const _ = require("lodash");
const Funcs = require("../lib/Funcs");
const wxUrl = config.get("wxApi.host");

module.exports = {
    /*微信小程序*/
    //通过登录code获取用户信息
    getWxUserInfo: (req, opts, callback) => {
        let options = {
            // qs: {
            //     appid,
            //     secret,
            //     grant_type: 'authorization_code'
            // }
        };
        let defaultParams = {
            path: "/sns/jscode2session"
        };
        let url = wxUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    /*微信公众号*/
    //获取token
    getWxToken: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/cgi-bin/token"
        };
        let url = wxUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    /*获取openid:
      step1、静默授权获取code，通过redirect_uri带code跳转；
      step2、根据code获取openid
    */
    getBaseInfoByCode: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/sns/oauth2/access_token"
        };
        let url = wxUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //微信统一下单
    wxUnifiedorder: (req, opts, callback) => {
        let options = {
            headers: {
                'Content-Type': 'text/xml'
            }
        };
        let defaultParams = {
            path: "/pay/unifiedorder"
        };
        let url = "https://api.mch.weixin.qq.com" + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        //console.dir(`微信统一下单参数：${JSON.stringify(options)}`);
        Funcs.callWxApisPost(options, callback);
    }

}

let Funcs      = require("../lib/Funcs");
let config     = require("config");
let _          = require("lodash");
let path       = require("path");
let env        = process.env.NODE_ENV;
let portalUrl  = '';

//环境判断
if (env == "development") {
    portalUrl = config.get("host.portal_dev");
} else if (env == "production") {
    portalUrl = config.get("host.portal_pro");
}

module.exports = {
    //所有商户有效的优惠券列表
    getAllcoupons: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/coupon/listByAllUserNo"
        };
        let url = portalUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //指定商户有效的优惠券列表
    getCouonsByUser: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/coupon/getByUserNo"
        };
        let url = portalUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //查询用户优惠券列表
    userCouponsList: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/coupon/couponList"
        };
        let url = portalUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //用户在商家能使用的优惠券列表
    getByConsumer: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/coupon/getByConsumer"
        };
        let url = portalUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //领取优惠券
    getCoupond: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/coupon/add"
        };
        let url = portalUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //数据统计
    getStatusInfo: (req, opts, callback) => {
        let options = {};
        let defaultParams = {
            path: "/coupon/add"
        };
        //let url = portalUrl + defaultParams.path;
        let url = "";
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //获取优惠金额
    getCouponAmount:(req, opts, callback) =>{
        let options = {};
        let defaultParams = {
            path: "/coupon/getCouponAmount"
        };
        let url = portalUrl + defaultParams.path;
        options.url = url;
        options = _.merge(opts, options);
        Funcs.callApis(options, callback);
    },

    //扫描用户付款码
    beScanPay:(req, opts, callback)=>{
        let options = {};
        let defaultParams = {
            path: "/coupon/add"
        };
        //let url = portalUrl + defaultParams.path;
        let url = "";
        options.url = url;
        options = _.merge(opts, options);
        console.log(options);
        Funcs.callApis(options, callback);
    }
};

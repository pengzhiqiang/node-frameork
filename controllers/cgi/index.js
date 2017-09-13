const portalService = require('../../service/portalService.js');
const apiTools = require('../../service/apiTools.js');
const _async = require("async");
const _      = require("lodash");

module.exports = (router) => {
    //获取优惠券
    router.get('/addCoupon', (req, res) => {
        let openId = req.cookies.openId;
        let couponId = req.query.couponId;
        portalService.getCoupond(req, {
            form: {
                openId,
                couponId
            }
        }, (err, body) => {
            if (!err) {
                res.send(body);
            } else {
                console.log(err);
            }
        });
    });

    //换一批优惠券
    router.get('/changeCouponList', (req, res) => {
        var openId = req.query.openId;
        var page = req.query.page;
        portalService.getAllcoupons(req, {
            qs: {
                openId,
                page,
                pageSize:6
            }
        }, (err, body) => {
            if (!err) {
                res.send(body);
            } else {
                console.log(err);
            }
        });
    });

    //统计
    router.get('/statusinfo', (req, res) => {
        portalService.getStatusInfo(req, {
            
        }, (err, body) => {
            if (!err) {
                res.send(body);
            } else {
                console.log(err);
            }
        });
    });

    router.get('/bescanpay', (req, res) => {
        let authCode = req.query.authCode;
        let amount = req.query.amount;
        let userNo = req.query.userNo;
        portalService.beScanPay(req, {
            form: {
                authCode,
                amount,
                userNo
            }
        }, (err, body) => {
            if (!err) {
                res.send(body);
            } else {
                console.log(err);
            }
        });
    });

    //测试工具
    router.post('/apitools', (req, res) => {
        const D1 = new Date();
        let startTime = D1.getTime();
        let reqBody = req.body;
        let curParam = {}
        if(reqBody.headers){
            curParam.headers = JSON.parse(reqBody.headers);
        }
        if (reqBody.method == 'GET') {
            if (reqBody.params) {
                curParam.qs = JSON.parse(reqBody.params)
            } else {
                curParam.qs = {};
            }
        } else {
            if (reqBody.params) {
                curParam.form = JSON.parse(reqBody.params)
            } else {
                curParam.form = {}
            }
        }
        curParam.url = reqBody.host + reqBody.path;
        apiTools.startApiTestRequest(req, curParam, (err, body) => {
            if(!err){
                const D2 = new Date();
                let endTime = D2.getTime();
                let resDate = [];
                resDate[0]=curParam;
                resDate[1]=JSON.parse(body);
                resDate[2]=endTime-startTime;
                res.send(resDate);
            }else{
                console.log(err);
            }
        });
    });
};

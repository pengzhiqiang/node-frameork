const portalService = require('../service/portalService');
const _async = require("async");
const funcs = require("../lib/Funcs");

module.exports = (router) => {
    router.get('/', (req, res) => {
        let params = req.query;
        let openId = params.openId || '';
        let userNo = params.userNo || '';
        _async.parallel([
            (callback) => {
                portalService.getAllcoupons(req, {
                    qs: {
                        openId,
                        page: 1,
                        pageSize: 6
                    }
                }, (err, body) => {
                    callback(err, body);
                });
            },
            (callback) => {
                portalService.getCouonsByUser(req, {
                    qs: {
                        openId,
                        userNo
                    }
                }, (err, body) => {
                    callback(err, body);
                });
            },
            (callback) => {
                portalService.getCouponAmount(req, {
                    qs: {
                        openId
                    }
                }, (err, body) => {
                    callback(err, body);
                });
            }
        ], (err, results) => {
            if (!err) {
                let resultsData = {};
                try{
                    resultsData.allCoupons = JSON.parse(results[0]);
                    resultsData.couponsByUser = JSON.parse(results[1]);
                    resultsData.couponAmount = JSON.parse(results[2]);
                    //funcs.WriteFile(results[0]);
                    res.render('index.dust', resultsData);
                }catch(e){
                    console.log(e);
                }
            } else {
                console.log(err);
            }
        });
    });
};

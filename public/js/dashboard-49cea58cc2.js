/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var base = __webpack_require__(1);

	function now_time() {
	    var now_time;
	    var D = new Date();
	    var y = D.getFullYear();
	    var m = D.getMonth() + 1;
	    var d = D.getDate();
	    var h = D.getHours();
	    var i = D.getMinutes();
	    var s = D.getSeconds();
	    if (i < 10) i = "0" + i.toString();
	    if (h < 10) h = "0" + h.toString();
	    if (s < 10) s = "0" + s.toString();
	    now_time = y + "年" + m + "月" + d + " " + h + ":" + i;
	    $('.title-right').text(now_time);
	}
	setInterval(now_time, 1000);

	function getData() {
	    $.ajax({
	        type: 'get',
	        url: '/cgi/statusinfo',
	        success: function(data) {
	            var results = JSON.parse(data).data;
	            var totalMoney = results.totalMoney.toString();
	            var merchants = results.totalMerchants.toString();
	            total(totalMoney);
	            totalMerchants(merchants);
	            renderTable(results);
	        }
	    });
	}

	//初始化
	getData();
	//轮询
	var intervalRender = setInterval(getData, 30000);

	//总金额
	function total(totalmoney) {
	    //var data = '53029.79';
	    var b = totalmoney.split('');

	    var span = '';
	    if (b.indexOf('.') < 0) {
	        b = b.concat(['.', '0', '0']);
	    }else if(b.indexOf('.') == b.length - 2){
	        b = b.concat(['0']);
	    }
	    var len = b.length;
	    for (var i in b) {
	        if (b[i] == '.') {
	            b.splice(i, 1);
	        }
	        span += "<span>" + b[i] + "</span>";
	    }
	    var spanDefault = "";
	    for (var j = 0; j <= 11 - len; j++) {
	        spanDefault += '<span>0</span>';
	    }

	    $('.total').empty().append(spanDefault + span);
	}

	//统计表单渲染
	function renderTable(data) {
	    $('.todayWeixinOrders').empty().text(data.todayWeixinOrders);
	    $('.todayAliPayOrders').empty().text(data.todayAliPayOrders);
	    $(".todayOrders").empty().text(data.todayOrdes);
	    $('.todayConsumer').empty().text(data.todayConsumer);
	    $('.totalWeixinOrders').empty().text(data.totalWeixinOrders);
	    $('.totalAliPayOrders').empty().text(data.totalAliPayOrders);
	    $('.totalOrders').empty().text(data.totalOrders);
	    $('.totalConsumer').empty().text(data.totalConsumer);
	}


	//总商家
	function totalMerchants(merchants) {
	    var c = merchants.split('');
	    var mlen = c.length;
	    var mspan = '';
	    for (var i in c) {
	        mspan += "<span>" + c[i] + "</span>";
	    }
	    var mspanDefault = "";
	    for (var j = 0; j < 6 - mlen; j++) {
	        mspanDefault += '<span>0</span>';
	    }
	    $('.stores-count').empty().append(mspanDefault + mspan);
	}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = {
	    opay8: {
	        setHtmlFonts: function() {
	            var deviceWidth = document.documentElement.clientWidth;
	            if (deviceWidth > 640)
	                deviceWidth = 640;
	            document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
	        },

	        //cookie
	        setCookie: function(name, value, domain, path) {
	            var expire = new Date();
	            var hour = 24;
	            if (hour) {
	                expire.setTime(expire.getTime() + 3600000 * hour);
	            }
	            document.cookie = name + "=" + value + "; " + (hour
	                ? ("expires=" + expire.toGMTString() + "; ")
	                : "") + (path
	                ? ("path=" + path + "; ")
	                : "path=/; ") + (domain
	                ? ("domain=" + domain + ";")
	                : ("domain=" + document.location.hostname + ";"));
	            return true;
	        },
	        getCookie: function(name) {
	            var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
	                m = document.cookie.match(r);
	            return (!m
	                ? ""
	                : m[1]);
	        },
	        delCookie: function(name, domain, path) {
	            document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path
	                ? ("path=" + path + "; ")
	                : "path=/; ") + (domain
	                ? ("domain=" + domain + ";")
	                : ("domain=" + document.location.hostname + ";"));
	        },

	        //queryString
	        getQueryString: function(name) {
	            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	            var r = window.location.search.substr(1).match(reg);
	            if (r != null)
	                return (r[2]);
	            return null;
	        },

	        //弹窗
	        toast: function(msg, time) {
	            var toast = document.querySelector('.toast');
	            if (toast === null) {
	                var $toastEl = $('<p class="toast">' + msg + '</p>').appendTo($('body'));
	                setTimeout(function() {
	                    $toastEl.remove();
	                }, (time || 1000));
	                return $toastEl;
	            }
	        },

	        //时间格式化；
	        cutTime: function(time) {
	            var cutTime = time.split(' ');
	            return cutTime[0];
	        },

	        //字符格式化
	        ifString: function(key, value, iftrue, iffalse) {
	            if (key == value) {
	                return iftrue;
	            } else {
	                return iffalse;
	            }
	        },

	        //获取网络类型,微信可用
	        netType: function(netType, callback) {
	            var UA = navigator.userAgent;
	            if (UA) {
	                var netType_arr = UA.match(/NetType.*\s/g);
	                if (netType_arr && netType_arr[0]) {
	                    var _netType = netType_arr[0].replace('NetType/', '');
	                    _netType = _netType.replace(/\s/g, '')
	                    if (_netType == netType) {
	                        callback
	                    }
	                }
	            }
	        }

	    }
	};


/***/ })
/******/ ]);
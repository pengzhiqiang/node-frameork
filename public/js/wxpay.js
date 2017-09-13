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

	$(document).ready(function() {
	    var base = __webpack_require__(1);
	    //设置html字体大小
	    base.opay8.setHtmlFonts();

	    $(".top-img,.pay-title,.pay-tips,.pay-box,.pay-info").on('touchmove',function(e){
	        e.preventDefault();
	    });

	    // document.querySelector("body").addEventListener('touchmove',function(e){
	    //     e.preventDefault();
	    // });

	    var td = {};
	    for (var i = 0; i <= 12; i++) {
	        td[i] = document.getElementById("td" + i);
	        td[i].addEventListener('touchstart', function(event) {
	            event.stopPropagation();
	            event.preventDefault()
	            var data = this.getAttribute('data');
	            if (data != 'sub') {
	                this.style.backgroundColor = "#f5f5f5";
	            }
	            switch (data) {
	                case "del":
	                    del();
	                    break;
	                case "sub":
	                    sub();
	                    break;
	                case ".":
	                    checkDot();
	                    break;
	                default:
	                    addArr(data);
	            }
	            show();
	        });
	        td[i].addEventListener('touchend', function(envent) {
	            var data = this.getAttribute('data');
	            if (data == 'del') {
	                this.style.backgroundImg = "url(../images/keyboard_delete%403x.png)";
	            }

	            if (data != 'sub') {
	                event.stopPropagation();
	                event.preventDefault();
	                this.style.backgroundColor = "#fff";

	            }
	        });
	    }

	    var price_arr = [];
	    var result;
	    var keyboardState = true;
	    //初始化
	    function init() {
	        if (price_arr.length <= 0) {
	            document.querySelector('.confirm-btn').style.backgroundColor = '#bbb';
	        } else {
	            document.querySelector('.confirm-btn').style.backgroundColor = '#2ab34b';
	        }
	        document.getElementById('amount').value = result;
	    }
	    init();

	    //数字
	    function addArr(data) {
	        if (price_arr.length < 8) {
	            if (fixedTwo(price_arr)) {
	                price_arr.push(data);
	            }
	            delZero(price_arr);
	            result = price_arr.join('');
	        }
	        init();
	    }
	    //clickhandle
	    function callback() {
	        var data = $(this).attr('data');
	        switch (data) {
	            case "del":
	                del();
	                break;
	            case "sub":
	                sub();
	                break;
	            case ".":
	                checkDot();
	                break;
	            default:
	                addArr(data);
	        }
	        show();
	    }


	    //重新获得焦点
	    $(".pay-box").on('tap', function() {
	        if (!keyboardState) {
	            $(".pay-logo").css({display: "block"});
	            $(".keyboard").css({display: "block"});
	            $(".blink").css({display: "inline-block"});
	            $(".coupon-wrap").css({display:"none"});
	            keyboardState = true;
	        }
	    });

	    //优惠买单按钮
	    function sub() {
	        if (keyboardState && result) {
	            $(".pay-logo").css({display: "none"});
	            $(".keyboard").css({display: "none"});
	            $(".blink").css({display: "none"});
	            $(".coupon-wrap").css({display:"block"});
	            keyboardState = false;

	        }else {
	            base.opay8.toast('请输入付款金额');
	        }
	    }
	    //小数点
	    function checkDot() {
	        if (price_arr.length < 10) {
	            if (price_arr.length <= 0) {
	                price_arr.push("0");
	                price_arr.push(".");
	            } else {
	                if (price_arr.indexOf('.') < 0) {
	                    price_arr.push(".");
	                }
	            }
	            result = price_arr.join('');
	        }
	        init();
	    }
	    //删除
	    function del() {
	        var len = price_arr.length;
	        var secLast = price_arr.slice(-2);
	        if (len <= 10) {
	            if (secLast[0] == '.') {
	                price_arr.splice(-2, 2);
	                result = price_arr.join('');
	                init();
	            } else {
	                price_arr.pop();
	                result = price_arr.join('');
	                init();
	            }
	        }
	    }
	    //显示
	    function show() {
	        var area = document.querySelector('.price-zone');
	        if (price_arr.length > 0) {
	            area.innerHTML = result;
	        } else {
	            area.innerHTML = "";
	        }
	    }
	    //去掉整数第一位0
	    function delZero(arr) {
	        if (arr.length > 1) {
	            if (arr.indexOf('.') < 0 && arr[0] == '0') {
	                return arr.shift();
	            }
	        }
	    }
	    //保留两位小数
	    function fixedTwo(arr) {
	        if (arr.indexOf('.') >= 0) {
	            var le = arr.length;
	            var index = arr.indexOf('.');
	            if (le - index > 2) {
	                return false;
	            } else {
	                return true;
	            }
	        } else {
	            return true;
	        }
	    }
	});


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
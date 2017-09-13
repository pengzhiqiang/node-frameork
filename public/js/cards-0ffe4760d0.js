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
	//设置html字体大小
	base.opay8.setHtmlFonts();

	var swiper = new Swiper('.swiper-container', {
	    onSlideChangeEnd: function(swiper) {
	        var index = swiper.activeIndex;
	        $(".top-nav li").eq(index).addClass("cur").siblings().removeClass('cur');
	        $(window).scrollTop(0);
	    }

	});

	$(".top-nav ul li").on('click',function(){
	    var index = $(this).index();
	    $(this).add("cur").siblings().removeClass('cur');
	    swiper.slideTo(index);
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

	        //获取网络类型
	        netType: function() {
	            //var UA = navigator.userAgent;
	            var UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.5.12 NetType/WIFI Language/zh_CN"

	        }

	    }
	};


/***/ })
/******/ ]);
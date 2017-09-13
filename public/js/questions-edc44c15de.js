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

	function changeStatus(ele, cb1, cb2) {
	    var status = ele.attr('status');
	    if (status === '0') {
	        ele.attr('status', '1');
	        cb1();
	    } else {
	        ele.attr('status', '0');
	        cb2();
	    }
	}

	$('.question').on("click", function() {
	    $(this).siblings('.content').toggle();
	    var _this = $(this);
	    changeStatus(_this, function() {
	        _this.siblings('.content').addClass('bdbtm');
	    }, function() {
	        _this.siblings('.content').removeClass('bdbtm');
	    });
	});

	$('.cat-title').on('click', function() {
	    $(this).siblings('.cat-list').toggle();
	    var _this = $(this);
	    changeStatus(_this, function() {
	        _this.find('span').addClass('icon');
	    }, function() {
	        _this.find('span').removeClass('icon');
	    });
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
	        }

	    }
	};


/***/ })
/******/ ]);
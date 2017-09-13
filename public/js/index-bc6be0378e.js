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
	    pagination: '.swiper-pagination',
	    slidesPerView: 1.5,
	    paginationClickable: true,
	    freeMode: true
	});

	//接收传递过来的参数，设置cookie
	var openId = base.opay8.getQueryString("openId");
	if (openId) {
	    base.opay8.setCookie('openId', openId);
	}

	//获取优惠券
	function ajaxAddCoupon(that, callback) {
	    var couponId = that.data('id');
	    var localOpenId = base.opay8.getCookie('openId');
	    var _self = that;
	    $.ajax({
	        type: 'get',
	        url: '/cgi/addCoupon',
	        data: {
	            openId: localOpenId,
	            couponId: couponId
	        },
	        success: callback 
	    });
	}

	$('.swiper-slide').on('click', function(event) {
	    event.stopPropagation();
	    var _this = $(this);
	    ajaxAddCoupon(_this, function(data) {
	        var result = JSON.parse(data);
	        //_this.off('click');
	        if (result.code == 0) {
	            base.opay8.toast('领取成功！');
	            _this.find('.coupon-btn').addClass('YES').removeClass('NO');
	        } else {
	            base.opay8.toast(result.msg);
	        }
	    });
	});

	$('.store-list').on('click', 'a', function(event) {
	    event.stopPropagation();
	    var _this = $(this);
	    ajaxAddCoupon(_this, function(data) {
	        var result = JSON.parse(data);
	        if (result.code == 0) {
	            base.opay8.toast('领取成功！');
	            _this.addClass("YES").removeClass("NO");
	        } else {
	            base.opay8.toast(result.msg);
	        }
	    });
	});

	var page = 2;
	$('.changeCouponList').on('click', function() {
	    var localOpenId = base.opay8.getCookie('openId');
	    $.ajax({
	        type: 'get',
	        url: '/cgi/changeCouponList',
	        data: {
	            page: page,
	            openId: localOpenId
	        },
	        success: function(data) {
	            page++;
	            var results = JSON.parse(data);
	            if (results.code == 0) {
	                var pageData = results.data.pageData;
	                if (pageData.length > 0) {
	                    var str = '';
	                    for (var i in pageData) {
	                        var endTime = base.opay8.cutTime(pageData[i].endTimeStr);
	                        var states = base.opay8.ifString(pageData[i].isGet, 'NO', '点击领取', '已领取');
	                        var img = base.opay8.ifString(pageData[i].isGet, 'NO', 'not', 'has');
	                        str += '<a href="javascript:void(0)" data-id="' + pageData[i].couponId + '"  class="couponlist ' + pageData[i].isGet + '"><div class="title"><span>￥</span>' + pageData[i].amount + '<i>' + pageData[i].userName + '</i></div><div class="intro"><p>' + pageData[i].couponName + '</p></div><div class="dead-line"><p>有效期至' + endTime + '</p></div><div class="get-btn" >' + states + '<span><img src="images/other_business_voucher_bg_' + img + '_arrow@3x.png" alt=""></span></div></a>';
	                    }
	                    $('.store-list').empty().append(str);
	                    if(pageData.length < 6){
	                        page = 1;
	                    }
	                } else {
	                    base.opay8.toast('暂无更多');
	                }
	            } else {
	                base.opay8.toast('请求失败');
	            }
	        }
	    });
	});

	//分享弹层
	$('.bottom-right').on('click', function() {
	    $('.share-mask').css("display", "block");
	});
	$('.share-mask').on("click", function() {
	    $(this).css("display", "none");
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
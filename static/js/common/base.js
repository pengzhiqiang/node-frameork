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

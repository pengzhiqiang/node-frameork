(function() {
    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 640)
        deviceWidth = 640;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';

    var price_arr = [];
    var result;
    //初始化
    function init() {
        if (price_arr.length <= 0) {
            document.querySelector('.confirm-btn').style.backgroundColor = '#91d78f';
        } else {
            document.querySelector('.confirm-btn').style.backgroundColor = '#09bd04';
        }
        document.getElementById('amount').value = result;
    }
    init();

    //$('.td').on('touchstart', callback);


    var td = {};
    for (var i = 0; i <= 12; i++) {
        td[i] = document.getElementById("td" + i);
        td[i].addEventListener('touchstart', function(event) {
            event.stopPropagation();
            event.preventDefault()
            this.style.backgroundColor = "#f5f5f5";
            var data = this.getAttribute('data');
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
            event.stopPropagation();
            event.preventDefault()
            this.style.backgroundColor = "#fff";
        });
    }


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
            area.innerHTML = "<span>￥</span>" + result;
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
})();

!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function o(){$.ajax({type:"get",url:"/cgi/statusinfo",success:function(t){var e=JSON.parse(t).data,n=e.totalMoney.toString(),o=e.totalMerchants.toString();r(n),i(o),a(e)}})}function r(t){var e=t.split(""),n="";e.indexOf(".")<0&&(e=e.concat([".","0","0"]));var o=e.length;for(var r in e)"."==e[r]&&e.splice(r,1),n+="<span>"+e[r]+"</span>";for(var a="",i=0;i<=11-o;i++)a+="<span>0</span>";$(".total").empty().append(a+n)}function a(t){$(".todayWeixinOrders").empty().text(t.todayWeixinOrders),$(".todayAliPayOrders").empty().text(t.todayAliPayOrders),$(".todayOrders").empty().text(t.todayOrdes),$(".todayConsumer").empty().text(t.todayConsumer),$(".totalWeixinOrders").empty().text(t.totalWeixinOrders),$(".totalAliPayOrders").empty().text(t.totalAliPayOrders),$(".totalOrders").empty().text(t.totalOrders),$(".totalConsumer").empty().text(t.totalConsumer)}function i(t){var e=t.split(""),n=e.length,o="";for(var r in e)o+="<span>"+e[r]+"</span>";for(var a="",i=0;i<6-n;i++)a+="<span>0</span>";$(".stores-count").empty().append(a+o)}n(1);setInterval(function(){var t,e=new Date,n=e.getFullYear(),o=e.getMonth()+1,r=e.getDate(),a=e.getHours(),i=e.getMinutes(),s=e.getSeconds();i<10&&(i="0"+i.toString()),a<10&&(a="0"+a.toString()),s<10&&(s="0"+s.toString()),t=n+"年"+o+"月"+r+" "+a+":"+i,$(".title-right").text(t)},1e3),o();setInterval(o,3e4)},function(t,e){t.exports={opay8:{setHtmlFonts:function(){var t=document.documentElement.clientWidth;t>640&&(t=640),document.documentElement.style.fontSize=t/7.5+"px"},setCookie:function(t,e,n,o){var r=new Date;return r.setTime(r.getTime()+864e5),document.cookie=t+"="+e+"; expires="+r.toGMTString()+"; "+(o?"path="+o+"; ":"path=/; ")+(n?"domain="+n+";":"domain="+document.location.hostname+";"),!0},getCookie:function(t){var e=new RegExp("(?:^|;+|\\s+)"+t+"=([^;]*)"),n=document.cookie.match(e);return n?n[1]:""},delCookie:function(t,e,n){document.cookie=t+"=; expires=Mon, 26 Jul 1997 05:00:00 GMT; "+(n?"path="+n+"; ":"path=/; ")+(e?"domain="+e+";":"domain="+document.location.hostname+";")},getQueryString:function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(e);return null!=n?n[2]:null},toast:function(t,e){if(null===document.querySelector(".toast")){var n=$('<p class="toast">'+t+"</p>").appendTo($("body"));return setTimeout(function(){n.remove()},e||1e3),n}},cutTime:function(t){return t.split(" ")[0]},ifString:function(t,e,n,o){return t==e?n:o}}}}]);
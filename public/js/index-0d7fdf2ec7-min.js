!function(o){function t(n){if(e[n])return e[n].exports;var a=e[n]={exports:{},id:n,loaded:!1};return o[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var e={};t.m=o,t.c=e,t.p="",t(0)}([function(o,t,e){function n(o,t){var e=o.data("id"),n=a.opay8.getCookie("openId");$.ajax({type:"get",url:"/cgi/addCoupon",data:{openId:n,couponId:e},success:t})}var a=e(1);a.opay8.setHtmlFonts();new Swiper(".swiper-container",{pagination:".swiper-pagination",slidesPerView:2.3,paginationClickable:!0,freeMode:!0});var i=a.opay8.getQueryString("openId");i&&a.opay8.setCookie("openId",i),$(".swiper-slide").on("click",function(o){o.stopPropagation();var t=$(this);n(t,function(o){var e=JSON.parse(o);0==e.code?(a.opay8.toast("领取成功！"),t.find(".coupon-btn").addClass("YES").removeClass("NO")):a.opay8.toast(e.msg)})}),$(".store-list").on("click","a",function(o){o.stopPropagation();var t=$(this);n(t,function(o){var e=JSON.parse(o);0==e.code?(a.opay8.toast("领取成功！"),t.addClass("YES").removeClass("NO")):a.opay8.toast(e.msg)})});var s=2;$(".changeCouponList").on("click",function(){var o=a.opay8.getCookie("openId");$.ajax({type:"get",url:"/cgi/changeCouponList",data:{page:s,openId:o},success:function(o){s++;var t=JSON.parse(o);if(0==t.code){var e=t.data.pageData;if(e.length>0){var n="";for(var i in e){var r=a.opay8.cutTime(e[i].endTimeStr),c=a.opay8.ifString(e[i].isGet,"NO","点击领取","已领取"),p=a.opay8.ifString(e[i].isGet,"NO","not","has");n+='<a href="javascript:void(0)" data-id="'+e[i].couponId+'"  class="couponlist '+e[i].isGet+'"><div class="title"><span>￥</span>'+e[i].amount+"<i>"+e[i].userName+'</i></div><div class="intro"><p>'+e[i].couponName+'</p></div><div class="dead-line"><p>有效期至'+r+'</p></div><div class="get-btn" >'+c+'<span><img src="images/other_business_voucher_bg_'+p+'_arrow@3x.png" alt=""></span></div></a>'}$(".store-list").empty().append(n),e.length<6&&(s=1)}else a.opay8.toast("暂无更多")}else a.opay8.toast("请求失败")}})}),$(".bottom-right").on("click",function(){$(".share-mask").css("display","block")}),$(".share-mask").on("click",function(){$(this).css("display","none")})},function(o,t){o.exports={opay8:{setHtmlFonts:function(){var o=document.documentElement.clientWidth;o>640&&(o=640),document.documentElement.style.fontSize=o/7.5+"px"},setCookie:function(o,t,e,n){var a=new Date;return a.setTime(a.getTime()+864e5),document.cookie=o+"="+t+"; expires="+a.toGMTString()+"; "+(n?"path="+n+"; ":"path=/; ")+(e?"domain="+e+";":"domain="+document.location.hostname+";"),!0},getCookie:function(o){var t=new RegExp("(?:^|;+|\\s+)"+o+"=([^;]*)"),e=document.cookie.match(t);return e?e[1]:""},delCookie:function(o,t,e){document.cookie=o+"=; expires=Mon, 26 Jul 1997 05:00:00 GMT; "+(e?"path="+e+"; ":"path=/; ")+(t?"domain="+t+";":"domain="+document.location.hostname+";")},getQueryString:function(o){var t=new RegExp("(^|&)"+o+"=([^&]*)(&|$)","i"),e=window.location.search.substr(1).match(t);return null!=e?e[2]:null},toast:function(o,t){if(null===document.querySelector(".toast")){var e=$('<p class="toast">'+o+"</p>").appendTo($("body"));return setTimeout(function(){e.remove()},t||1e3),e}},cutTime:function(o){return o.split(" ")[0]},ifString:function(o,t,e,n){return o==t?e:n},netType:function(){}}}}]);
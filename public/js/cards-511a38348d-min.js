!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(1).opay8.setHtmlFonts();var o=new Swiper(".swiper-container",{onSlideChangeEnd:function(e){var t=e.activeIndex;$(".top-nav li").eq(t).addClass("cur").siblings().removeClass("cur"),$(window).scrollTop(0)}});$(".top-nav ul li").on("click",function(){var e=$(this).index();$(this).add("cur").siblings().removeClass("cur"),o.slideTo(e)})},function(e,t){e.exports={opay8:{setHtmlFonts:function(){var e=document.documentElement.clientWidth;e>640&&(e=640),document.documentElement.style.fontSize=e/7.5+"px"},setCookie:function(e,t,n,o){var i=new Date;return i.setTime(i.getTime()+864e5),document.cookie=e+"="+t+"; expires="+i.toGMTString()+"; "+(o?"path="+o+"; ":"path=/; ")+(n?"domain="+n+";":"domain="+document.location.hostname+";"),!0},getCookie:function(e){var t=new RegExp("(?:^|;+|\\s+)"+e+"=([^;]*)"),n=document.cookie.match(t);return n?n[1]:""},delCookie:function(e,t,n){document.cookie=e+"=; expires=Mon, 26 Jul 1997 05:00:00 GMT; "+(n?"path="+n+"; ":"path=/; ")+(t?"domain="+t+";":"domain="+document.location.hostname+";")},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?n[2]:null},toast:function(e,t){if(null===document.querySelector(".toast")){var n=$('<p class="toast">'+e+"</p>").appendTo($("body"));return setTimeout(function(){n.remove()},t||1e3),n}},cutTime:function(e){return e.split(" ")[0]},ifString:function(e,t,n,o){return e==t?n:o},netType:function(e,t){var n=navigator.userAgent;if(n){var o=n.match(/NetType.*\s/g);if(o&&o[0]){var i=o[0].replace("NetType/","");i=i.replace(/\s/g,"")}}}}}}]);
// var path="http://123.57.33.202/freshmart-dev/api/index.php";
var path="http://api.suyousc.com/index.php";
$(function(){
  $('#bottom').on('touchmove', function (event) {
      event.preventDefault();
      // alert("aaaa");
    });
  var token = window.localStorage.token;
  var categoryId;
  if(window.localStorage.getItem("categoryId")){
    categoryId=window.localStorage.getItem("categoryId");
  }else{
    categoryId=18;
  }
  $("#icon_mine").click(function(){
    if (token == ""||token==undefined){
      window.location="login.html";
    }else{
      window.location = "mine.html";
    }
  })
  $("#icon_home").click(function(){
    window.location="index.html";
  })
  $("#icon_goods").click(function(){
    window.location="goods.html?categoryId="+categoryId;
  })
  $("#icon_order").click(function(){
    if (token == ""||token==undefined){
      window.location="login.html";
    }else{
      window.location = "order.html";
    }
  })
  $("#icon_trolley").click(function(){
    window.location="trolley.html";
  })
  $("#message").click(function(){
    window.location="message.html";
  })
  $("#location").click(function(){
    window.location="selectapt.html";
  })
  $("#animation").fadeOut(200);
  $("#back").click(function(){
    window.history.back();
  })
  // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
  // var useragent = navigator.userAgent;
  // 	console.log(useragent);
  // 	if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
  // 		// 这里警告框会阻塞当前页面继续加载
  // 	alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
  // 	 // 以下代码是用javascript强行关闭当前页面
  // 	var opened = window.open('about:blank', '_self');
  // 	opened.opener = null;
  // 	opened.close();
  // }

})

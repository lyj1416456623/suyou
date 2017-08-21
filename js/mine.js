var token=window.localStorage.token;
var path="http://api.suyousc.com/index.php";

// 获取localstorage数据
var local=window.localStorage.getItem("cart");
var localnum;
//消息数量
var messages;
var messagesNum;
$(function(){
  if(local != null){
   localnum=JSON.parse(local);
  }
})
var form;
if(localStorage.from){
  form=localStorage.getItem(from);
  form=true;
  localStorage.setItem("form",form);
}else{
  localStorage.setItem("form","true");
}
// 购物车数量
var num=0;
$(function(){
  // console.log(1);
  if(localnum){
    for(var i=0;i<localnum.length;i++){
      num+=localnum[i].num;
    }
    if(num>0){
      $("#banner_trolley_No").css({display:"block"}).html(num);
    }
  }
})
// 获取用户信息
function getUserInfo(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url =path + "?m=user&f=getUserInfo" ;
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        console.log(result);
          if(result.code==200){
            var json = result.data;
            var pro_mobile = json.mobile;
            var display_mobile = pro_mobile.substr(0, 3) + "*****" + pro_mobile.substr(8, 10);
            $("#userId").html(display_mobile);
          }
          if (result.msg != null){
            if (result.msg.indexOf("不能识别的用户") >= 0){
              $(".alert_common").fadeIn(100);
              $(".alert_bg").show();
              setTimeout(function(){
                $(".alert_common").fadeOut(300);
                $(".alert_bg").fadeOut(300);
                window.location = "login.html";
              },2000);
              return false;
            }
          }
       },
       error:function(error){
         console.log(error);
          // alert('fail');
       }
    });
  }else{
    window.location="login.html";
  }
}
//ajax异步通信，获取消息列表
function getMessageList(){
	if (token != ""){
		var headers = {};
		headers["token"] = token;
		var url = path + "?m=message&f=getMessageList";
		$.ajax({
			type: "get",		//使用get方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
      crossDomain: true,
			data: "",			//要发送的数据
			headers:headers,
			success: function(result) {
        // console.log(result);
				var json = result.data;
				var num = json.length;
        messagesNum=num;
        if (num != 0){
          // if(messages=="false"){
          //   $("#message_No").show();
          //   $("#message_No").text(num);
          // }
          if(window.localStorage.getItem("messages")){
            messages=localStorage.getItem("messages");
            // console.log(Number(num)-Number(messages));
            if(Number(messages)<Number(num)){
                $("#message_No").show();
                $("#message_No").text(Number(num)-Number(messages));
                // messages=num;
                // localStorage.setItem("messages",messages);
            }else{
                $("#message_No").hide();
            }
          }else{
            messages=num;
            localStorage.setItem("messages",messages);
          }

        }

			},
			error: function (error) {
		      console.log(error);
		    }
		});
	}
}
//ajax异步通信，获取用户优惠券数量
  function getCouponCount(){
    if (token != ""){
      var headers = {};
      headers["token"] = token;
      var url = path+ "?m=coupon&f=getCouponCount";
      $.ajax({
        type: "get",		//使用get方法访问后台
        dataType: "json",	//返回json格式的数据
        url: url,			//要访问的后台地址
        data: "",			//要发送的数据
        headers: headers,	//要发送的header数据
        success: function(result) {
          var json = result.data;
          // console.log(json);
          $("#coupon_No").html(json.couponCount);
        },
        error: function (xhr, textStatus, errorThrow) {
              //alert(xhr.readyState);
        }
      });
    }
  }
// 获取客服电话
function contactUs(){
	if (token != ""){
		var url = path + "?m=system&f=getCustomerSupport";
		$.ajax({
			type: "post",		//使用post方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
			data: "",			//要发送的数据
			success: function(result) {
				//拨打客服电话
				window.location.href = 'tel://' + result.data.phone;
			},
			error: function (error) {
		      console.log(error)
		    }
		});
	}
}
getMessageList();
getUserInfo();
getCouponCount();


// 注销及跳转
$(function(){
  pushHistory();
  window.addEventListener("popstate", function(e) {
    // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
    if(localStorage.getItem("location")){
      // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
      location.replace(location.href);
      // WeixinJSBridge.call('closeWindow');
    }
  }, false);
  function pushHistory() {
    var state = {
      title: "title",
      url: "#"
    };
    window.history.pushState(state, "title", "#");
  }
  $("#logOut").click(function(){
    $("#loginout").css({display:"block"});
  })
  $("#l_no_btn").click(function(){
    $("#loginout").css({display:"none"});
  })
  $("#l_yes_btn").click(function(){
    getMessageList();
    // localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("form");
    localStorage.removeItem("categoryId");
    localStorage.removeItem("itemName");
    localStorage.removeItem("order");
    localStorage.removeItem("items");
    localStorage.removeItem("cart");
    localStorage.removeItem("amount");
    localStorage.removeItem("location");
    localStorage.removeItem("community_info");
    localStorage.removeItem("communityInfo");
    localStorage.removeItem("address");
    console.log(messagesNum);
    localStorage.setItem("messages",messagesNum);
    window.location="index.html";
  })
  $("#myaddress").click(function(){
    localStorage.removeItem("location");
    window.location="myaddress.html";
  })
  $("#fap").click(function(){
    window.location="fap.html";
  })
  $("#feedback").click(function(){
    window.location="feedback.html";
  })
  $("#mycoupon").click(function(){
    window.location="mycoupon.html";
  })
  $(".update_pwd").click(function(){
    window.localStorage.setItem("location","true");
    window.location="changepswd.html";
  })
})

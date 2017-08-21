$(function(){
  var token=localStorage.getItem("token");
  var id;
  if(token!=""){
    var headers = {};
    headers["token"] = token;
    var url=path+"?m=coupon&f=getWebchatCoupon";
    // var url="http://123.57.33.202/freshmart-dev/api/index.php?m=coupon&f=distributeWebchatCoupon"
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        console.log(result);
        if(result.code==200){
          console.log(result);
          var data=result.data;
          id=data.id;
          console.log(data.backgroudImageUrl[0]);
          $("#share_main").css({backgroundImage:"url('"+data.backgroudImageUrl[0]+"')",backgroundSize:"100% 100%"});
        }
      }
    })
  }
  $("input").val("输入手机号");
  $("input").focus(function(){
    console.log("a");
    $(this).val("");
    $(this).css({letterSpacing:"0px"});
  })
  $("input").blur(function(){
    if($("input").val()==""){
      $("input").val("输入手机号");
      $("input").css({letterSpacing:"4px"});
    }else{
      console.log("aaaaa");
    }
  })
  $(".share_button").click(function(){
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if(reg.test($("input").val())){
      var moblie=$("input").val();
      localStorage.setItem("mobile",moblie);
      window.location="shareCoupon_detail.html?id="+id;
    }else{
      $(".alert_common").fadeIn(200);
      $(".alert_bg").fadeIn(200);
      setTimeout(function(){
        $(".alert_common").fadeOut(200);
        $(".alert_bg").fadeOut(200);
      },2000);
    }
  })

})

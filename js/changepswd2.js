//ajax异步通信，修改密码
var path="http://api.suyousc.com/index.php";
var number=(location.search).replace(/[^0-9]/ig, "");
var local=false;
if(localStorage.getItem("location")){
  local=localStorage.getItem("location");
  console.log(local);
}
console.log(local);
var mobile=number.slice(0,11);
var code=number.slice(11);
console.log(number);
console.log(mobile);
console.log(code);
function changePassword(){
  //判断密码与确认密码是否一致
  var newpsw1 = document.getElementById("psw1_content").value.replace(/(^\s*)|(\s*$)/g, '');
  var newpsw2 = document.getElementById("psw2_content").value.replace(/(^\s*)|(\s*$)/g, '');
  if (newpsw1 != newpsw2){
    $(".alert_common").html("密码与确认密码不一致").fadeIn(200);
    $(".alert_bg").fadeIn(200);
    setTimeout(function(){
      $(".alert_common").fadeOut(200);
      $(".alert_bg").fadeOut(200);
    },2000);
  }else{
    $(".alert_common").fadeIn(200);
    $(".alert_bg").fadeIn(200);
    setTimeout(function(){
      $(".alert_common").fadeOut(200);
      $(".alert_bg").fadeOut(200);
    },2000);
  }

  var url  = path + "?m=user&f=updatePwd";
  var data = '{"data": {"mobile":"'+mobile+'", "password":"'+newpsw1+'", "code":"'+code+'"}}';
  console.log(data);

  $.ajax({
    type: "post",		//使用post方法访问后台
    dataType: "json",	//返回json格式的数据
    url: url,			//要访问的后台地址
    data: data,			//要发送的数据
    success: function(result) {
      $(".alert_common").html(result.msg);
      $(".alert_common").fadeIn(100);
      $(".alert_bg").show();
      setTimeout(function(){
        $(".alert_common").fadeOut(300);
        $(".alert_bg").fadeOut(300);
      },2000);
      if(result.msg=="修改密码成功"){
        // history.go(-2);
        console.log(local);
        if(local=="true"){
          window.location="mine.html";
        }else{
          window.location="login.html";
        }
        // location.reload();
      }
    },
    error: function (xhr, textStatus, errorThrow) {
        //alert(xhr.readyState);
    }
  });
}




  window.onload=function(){
    $("#loading_animation").fadeOut(200);
    $("#whole").fadeIn(200);
    var eye1_top = 55+"px";
    var eye2_top = 151+"px";
    $("#eye1").css("top",eye1_top);
    $("#eye2").css("top",eye2_top);
    var pswd1_value=$("#psw1_content").attr("value");
    var pswd2_value=$("#psw2_content").attr("value");
    if (pswd1_value == "请输入新密码") {
      $("#psw1_content").click(function(){
        $(this).val("");
        $(this).attr("type","password")
      });
    };
    if (pswd2_value == "请再次输入新密码") {
      $("#psw2_content").click(function(){
        $(this).val("");
        $(this).attr("type","password")
      });
    };
    $("#eye1").click(function(){
      var pswd_type=$("#psw1_content").attr("type");
      if (pswd_type == "text") {
        $("#psw1_content").attr("Type","password");
      };
      if (pswd_type == "password") {
        $("#psw1_content").attr("Type","text");
      };
    });
    $("#eye2").click(function(){
      var pswd_type=$("#psw2_content").attr("type");
      if (pswd_type == "text") {
        $("#psw2_content").attr("Type","password");
      };
      if (pswd_type == "password") {
        $("#psw2_content").attr("Type","text");
      };
    });
  }

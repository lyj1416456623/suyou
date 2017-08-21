var path="http://api.suyousc.com/index.php";
// var path=domain+"/freshmart-dev/api/index.php";
var validateCodeUrl=null;
var uid;
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
}
uid=uuid(8,16);

$(function(){
	getValidateCode();
	$('#validateCode').attr('src',validateCodeUrl);
})
$(function(){
	$('#validateCode').click(function(){
		uid=uuid(8,16);
		getValidateCode();
		console.log(validateCodeUrl);
		$(this).attr('src',validateCodeUrl);
	});
})
function getValidateCode(){
	validateCodeUrl =path+"?m=tool&f=createCode&uid="+uid;
	// console.log(validateCodeUrl);
}

function getRequestCode(){
	//判断数据的合法性
	var mobile = document.getElementById("psw_phone_content").value.replace(/(^\s*)|(\s*$)/g, '');
	var patrn = /^13[0-9]{9}$|^15[0-9]{9}$|^18[0-9]{9}$|^14[0-9]{9}$|^17[0-9]{9}$/;
	if (!patrn.test(mobile)){
		$(".alert_common").html("请输入正确的手机号码");
		$(".alert_common").fadeIn(300);
		$(".alert_bg").show();
		setTimeout(function(){
			$(".alert_common").fadeOut(300);
			$(".alert_bg").fadeOut(300);
			document.getElementById("psw_phone_content").value = "";
		},1500);
		return false;
	}
	var urlPara = "mobile=" + mobile;
	var code = $('#psw_Id_code').val();
	var url = path + "?m=user&f=requestCode&" + urlPara + "&code=" +code + "&uid=" + uid;
	console.log(url);
	$.ajax({
		type: "get",		//使用get方法访问后台
		dataType: "json",	//返回json格式的数据
		url: url,			//要访问的后台地址
		data: "",			//要发送的数据
		success: function(result) {
			console.log(result);
      console.log(result.msg);
      console.log(result.validatecode);
      if(result.code==200){
        $(".alert_common").html(result.msg);
  			$(".alert_common").fadeIn(100);
  			$(".alert_bg").show();
  			setTimeout(function(){
  				$(".alert_common").fadeOut(300);
  				$(".alert_bg").fadeOut(300);
  			},2000);
        var i = 30;var innerhtml = "";$(".psw_btn").html("30秒后重新获取");
  			var myinterval = setInterval(function(){i--; innerhtml = i + "秒后重新获取";$(".psw_btn").html(innerhtml);},1000);
  			$(".psw_btn").css({color: "grey",background: "white",width: "50%",marginLeft: "46%"});
  			$(".psw_btn").attr("onclick","");
  			setTimeout(function(){clearInterval(myinterval);$(".psw_btn").html("获取验证码");$(".psw_btn").css({color: "white",background: "#e12",width: "24%",marginLeft: "61%"});$(".psw_btn").attr("onclick","getRequestCode()");},30000);
  		}
			$(".alert_common").html(result.msg);
			$(".alert_common").fadeIn(100);
			$(".alert_bg").show();
			setTimeout(function(){
				$(".alert_common").fadeOut(300);
				$(".alert_bg").fadeOut(300);
			},2000);

		},
		error: function (xhr, textStatus, errorThrow) {
	        //alert(xhr.readyState);
	    }
	});
}
//ajax异步通信，注册
function register(){
	//判断密码与确认密码是否一致
	var newpsw1 = document.getElementById("psw1_content").value.replace(/(^\s*)|(\s*$)/g, '');
	var newpsw2 = document.getElementById("psw2_content").value.replace(/(^\s*)|(\s*$)/g, '');
	if (newpsw1 != newpsw2)
	{
		$(".alert_common").html("密码与确认密码不一致");
		$(".alert_common").fadeIn(100);
		$(".alert_bg").show();
		setTimeout(function(){
			$(".alert_common").fadeOut(300);
			$(".alert_bg").fadeOut(300);
		},2000);
		return false;
	}
	var mobile = document.getElementById("psw_phone_content").value.replace(/(^\s*)|(\s*$)/g, '');
	var code   = document.getElementById("psw_Id_content").value.replace(/(^\s*)|(\s*$)/g, '');

	var data = '{"data": {"mobile":"' + mobile +'", "password":"' + newpsw1 +'", "code":"'+ code + '"}}';
	var url  = path+ "?m=user&f=signUp";

	$.ajax({
		type: "post",		//使用post方法访问后台
		dataType: "json",	//返回json格式的数据
		url: url,			//要访问的后台地址
		data: data,			//要发送的数据
		success: function(result) {
      // alert(result.msg);
			$(".alert_common").html(result.msg);
			$(".alert_common").fadeIn(100);
			$(".alert_bg").show();
			setTimeout(function(){
				$(".alert_common").fadeOut(300);
				$(".alert_bg").fadeOut(300);
        if(result.msg=="注册成功！"){
          window.location="login.html";
        }
        if(result.msg=="该手机号已经被注册！"){
          location.reload();
        }
			},1000);

		},
		error: function (xhr, textStatus, errorThrow) {
	        //alert(xhr.readyState);
	    }
	});
}

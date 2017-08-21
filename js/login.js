
$(function() {
	$("#animation").fadeOut(200);
	$(".sign_up").click(function(){
		window.location="signup.html";
	})
	$(".bottom-txt").click(function(){
		window.location="signup.html";
	})
	$(".psw_text_right").click(function(){
		window.location = "changepswd.html";
	});
	var pswd_value=$("#password").attr("value");
	var mobile_value=$("#mobile").attr("value");
	if (pswd_value == "请输入密码") {
		$("#password").click(function(){
			$(this).val("");
			$(this).attr("Type","password");
		});
	};
	if (mobile_value == "请输入手机号码") {
		$("#mobile").click(function(){$(this).val("")});
	};
	$("#eye").click(function(){
		var pswd_type=$("#password").attr("type");
		if (pswd_type == "text") {
			$("#password").attr("Type","password");
		};
		if (pswd_type == "password") {
			$("#password").attr("Type","text");
		};
	});
});
	//ajax异步通信，登录
var pathApi = "http://api.suyousc.com/index.php";
function login(){
	localStorage.setItem("location","true");
	var urlPara = "&mobile="   + document.getElementById("mobile").value.replace(/(^\s*)|(\s*$)/g, '') +
			      "&password=" + document.getElementById("password").value.replace(/(^\s*)|(\s*$)/g, '');

	var url = pathApi + "?m=user&f=loginByPwd" + urlPara;
	$.ajax({
		type:"get",
		datatype:"json",
		url:url,
		success:function(result){
			console.dir(result);
			result = eval('('+result+')');
			console.log(result.token);
			if (result.code == 200) {
				console.log(result.msg);
				var token=result.token;
				console.log(token);
				localStorage.setItem("token",token);
				window.location = "mine.html";
			}else{
				$(".alert_common").html(result.msg);
				$(".alert_common").fadeIn(100);
				$(".alert_bg").show();
				setTimeout(function(){
					$(".alert_common").fadeOut(300);
					$(".alert_bg").fadeOut(300);
				},1000);
			}
		},
		error:function(error){
			console.log(error)
		}
	})
}

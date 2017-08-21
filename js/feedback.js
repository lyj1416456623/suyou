var path="http://api.suyousc.com/index.php";
var token=window.localStorage.token;
var phone;
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

        phone = result.data.mobile;

       },
       error:function(error){

       }
    })
  }
}
getUserInfo();
//ajax异步通信，提交反馈数据
function addAdvice(){
	if (token != ""){
		var headers = {};
		headers["token"] = token;
		var url = path + "?m=advice&f=addAdvice";
		var content = $("#feedback_content").val().replace(/(^\s*)|(\s*$)/g, '');
		var data = '{"data": {"contact":"'+phone+'", "content":"' + content + '"}}';
		console.log(data);
		//判断反馈信息是否为空
		if ((content == "") || (content == "请在此处留下您的宝贵意见，我们将会不断优化用户体验（长度在10-300字之间）")){
			$(".alert_common").html("反馈信息不能为空");
			$(".alert_common").fadeIn(100);
				$(".alert_bg").show();
				setTimeout(function(){
					$(".alert_common").fadeOut(300);
					$(".alert_bg").fadeOut(300);
				},2000);
			return false;
		}

		$.ajax({
			type: "post",		//使用post方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
			data: data,			//要发送的数据
			headers: headers,	//要发送的header数据
			success: function(result) {
				$(".alert_common").html("提交反馈成功");
				$(".alert_common").fadeIn(100);
				$(".alert_bg").show();
				setTimeout(function(){
					$(".alert_common").fadeOut(300);
					$(".alert_bg").fadeOut(300);
					window.history.back();
				},2000);
				console.log(result);
			},
			error: function (xhr, textStatus, errorThrow) {
		        //alert(xhr.readyState);
		    }
		});
	}
}
$(function(){
  $("#feedback_content").click(function(){
    $("#feedback_content").html("");
  })

})

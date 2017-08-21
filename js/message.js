$(function(){
  var token=window.localStorage.token;
  var path="http://api.suyousc.com/index.php";
  // var messages=true;
  // window.localStorage.setItem("messages",messages);
  var messages;
  // ajax异步通信，获取消息列表
  function getMessageList(){
  	if (token != ""){
  		var headers = {};
  		headers["token"] = token;
  		var url = path + "?m=message&f=getMessageList";
  		$.ajax({
  			type: "get",		//使用get方法访问后台
        crossDomain: true,
  			dataType: "json",	//返回json格式的数据
  			url: url,			//要访问的后台地址
  			data: "",			//要发送的数据
  			headers:headers,
  			success: function(result) {
  				var json = result.data;
          console.log(json);
          messages=json.length;
          console.log(messages);
          for(var i=0;i<json.length;i++){
            $("#main").append(
             '<div class="l_fap">\
                <div class="l_fap_qu">\
                  <span class="l_fap_qu_text">'+json[i].title+'</span>\
                  <span class="l_fap_arrow"><img src="images/arrow_h.png" alt="" /></span>\
                </div>\
                <div class="l_fap_anw">'+json[i].content+'</div>\
              </div>'
            )
          }
            $(".l_fap_qu").click(function(){
          		$(this).next().slideToggle();
          		$(this).find("img").toggleClass("rotate");
          	});

              localStorage.setItem("messages",messages);

  			},
  			error: function (error) {
  		      console.log(error);
  		    }
  		});
    }
  }
getMessageList();
  // $("#back").click(function(){
  //   window.location="mine.html";
  // })

})

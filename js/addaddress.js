
  //ajax异步通信，添加地址
  var path="http://api.suyousc.com/index.php";
  var token=window.localStorage.token;
  localStorage.setItem("add","false");
  var communitInfo ;
  // if(localStorage.getItem("form")){
  //   localStorage.removeItem("form");
  // }
  pushHistory();
  window.addEventListener("popstate", function(e) {
  	// alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
  	window.location="myaddress.html";
  }, false);
  function pushHistory() {
  	var state = {
  		title: "title",
  		url: "#"
  	};
  	window.history.pushState(state, "title", "#");
  }
  if(localStorage.getItem("community_info")){
    communitInfo = JSON.parse(localStorage.community_info);
  }
  function addAddress(){
    if (token != ""){
      var headers = {};
      headers["token"] = token;
      var url  =path + "?m=address&f=addAddress";
      var name        = document.getElementById("name").value.replace(/(^\s*)|(\s*$)/g, '');
      var communityId = $("#add_address_id").text();
      var building    = document.getElementById("building").value.replace(/(^\s*)|(\s*$)/g, '');
      var unit        = document.getElementById("unit").value.replace(/(^\s*)|(\s*$)/g, '');
      var room        = document.getElementById("room").value.replace(/(^\s*)|(\s*$)/g, '');
      var mobile      = document.getElementById("l_input_phone").value.replace(/(^\s*)|(\s*$)/g, '');
      var gender      = $('input[name="Sex"]').val();
      var isDefault   = "1";	//是否设置为默认地址，0-不默认，1-默认
      if(gender=="male"){
      	gender="0";
      }else{
      	gender="1";
      }
      //判断数据的合法性
      if ((name == "") || (name == "请输入您的姓名")){
        $(".alert_common").html("请输入您的姓名");
        $(".alert_common").fadeIn(300);
        $(".alert_bg").show();
        setTimeout(function(){
          $(".alert_common").fadeOut(300);
          $(".alert_bg").fadeOut(300);
        },1500);
        return false;
      }
      if ((mobile == "") || (mobile == "请输入配送人联系您的电话")){
        $(".alert_common").html("请输入配送人联系您的电话");
        $(".alert_common").fadeIn(300);
        $(".alert_bg").show();
        setTimeout(function(){
          $(".alert_common").fadeOut(300);
          $(".alert_bg").fadeOut(300);
        },1500);
        return false;
      }

      var patrn = /^13[0-9]{9}$|^15[0-9]{9}$|^18[0-9]{9}$|^14[0-9]{9}$|^17[0-9]{9}$/;
      if (!patrn.test(mobile)){
        $(".alert_common").html("请输入正确的手机号码");
        $(".alert_common").fadeIn(300);
        $(".alert_bg").show();
        setTimeout(function(){
          $(".alert_common").fadeOut(300);
          $(".alert_bg").fadeOut(300);
          document.getElementById("l_input_phone").value = "";
        },1500);
        return false;
      }
      if (communityId == ""){
        $(".alert_common").html("请选择您当前所在的小区");
        $(".alert_common").fadeIn(300);
        $(".alert_bg").show();
        setTimeout(function(){
          $(".alert_common").fadeOut(300);
          $(".alert_bg").fadeOut(300);
        },1500);
        return false;
      }

      if ((building == "") || (building == "请输入您的楼号")){
        $(".alert_common").html("请输入您的楼号");
        $(".alert_common").fadeIn(300);
        $(".alert_bg").show();
        setTimeout(function(){
          $(".alert_common").fadeOut(300);
          $(".alert_bg").fadeOut(300);
        },1500);
        return false;
      }

      if (unit == "请输入您的单元（非必填）"){
        unit = "";
      }

      if ((room == "") || (room == "请输入您的房屋号")){
        $(".alert_common").html("请输入您的房屋号");
        $(".alert_common").fadeIn(300);
        $(".alert_bg").show();
        setTimeout(function(){
          $(".alert_common").fadeOut(300);
          $(".alert_bg").fadeOut(300);
        },1500);
        return false;
      }

      // request to apt to save address
      var data = '{"data": {"name":"' + name +'", "communityId":"' + communityId + '", "gender":"'+ gender + '", ' +
									 	 '"building":"' + building +'", "unit":"' + unit + '", "room":"'+ room + '", ' +
									 	 '"mobile":"' + mobile +'", "isDefault":"' + isDefault + '"}}';
     console.log(data);
			$.ajax({
				type: "post",		//使用post方法访问后台
				dataType: "json",	//返回json格式的数据
				url: url,			//要访问的后台地址
				data: data,			//要发送的数据
				headers: headers,	//要发送的header数据
				success: function(result) {
					//alert(result.msg);
          console.log(result);
					//跳转到我的地址页面
					window.location = "myaddress.html";
				},
				error: function (xhr, textStatus, errorThrow) {
          console.log(errorThrow);
			        //alert(xhr.readyState);
			  }
			});

    } // end if token
  }
  $(function(){
    $("#animation").fadeOut(200);
    $("#l_add").click(function(){
      // addAddress();
      var result = addAddress();
      if (result) window.location="myaddress.html";
    })

    $('#add_address_id').html(communitInfo.communityId)
    $('#l_address_search').html(communitInfo.communityName)
  })

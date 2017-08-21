var path="http://api.suyousc.com/index.php";
var token=window.localStorage.token;
var id=(location.search).replace(/[^0-9]/ig, "");
var form=window.localStorage.form;
localStorage.setItem("add","true");
localStorage.setItem("editId",id);
var communitInfo;
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
$(function(){
	// if(form=="true"){
	// 	$(".l_address_right").show();
	// 	$("#l_add_search").click(function(){
	// 		window.location="selectapt.html";
	// 	})
	// }else{
	// 	$("#l_add_search").click(function(){
	// 		return false;
	// 	})
	// }
})
var addressId;
//ajax异步通信，获取地址信息
function getAddressInfo(){
	if (token != ""){
		var headers = {};
		headers["token"] = token;
		var url = path + "?m=address&f=getAddressList";
		$.ajax({
			type: "get",		//使用get方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
			data: "",			//要发送的数据
			headers: headers,	//要发送的header数据
			success: function(result) {
				var json = result.data;
				$.each(json, function(i, item) {
					console.log(item);
					if (item.id == id){
						if(form=="true"){
							if(localStorage.getItem("communityInfo")){
								communitInfo=JSON.parse(localStorage.getItem("communityInfo"));
								console.log(communitInfo.communityName);
								$(".l_address_search").html(communitInfo.communityName);
								$("#add_address_id").text(communitInfo.communityId);
							}else{
								$(".l_address_search").html(item.communityName);
								$("#add_address_id").text(item.communityId);
							}
						}else{
							$(".l_address_search").html(item.communityName);
							$("#add_address_id").text(item.communityId);
						}

						$("#name").val(item.name);

						$("#l_input_phone").val(item.mobile);

						$("#building").val(item.building);
					  $("#room").val(item.room);
						if(form=="true"){
							$(".l_address_right").show();
							$("#l_add_search").click(function(){
								window.location="selectapt.html";
							})
						}else{
							$("#l_add_search").click(function(){
								return false;
							})
						}
						//处理性别
						// console.log(item.gender);
						if (item.gender == "1"){
							$('input[value="male"]').attr("checked","checked");
						}
						if(item.gender=="0"){
							$('input[value="female"]').attr("checked","checked");
						}
						//保存全局地址id
						addressId = id;
						return;
					}

				});
			},
			error: function (xhr, textStatus, errorThrow) {
						//alert(xhr.readyState);
				}
		});
	}
}
//ajax异步通信，更新地址
function updateAddress(){
	if (token != ""){
		var headers = {};
		headers["token"] = token;
		var url = path+ "?m=address&f=updateAddress";
		var name        = $("#name").val().replace(/(^\s*)|(\s*$)/g, '');
		var communityId = $("#add_address_id").text();
		var gender      = $('input[name="Sex"]').val();
		var building    = $("#building").val().replace(/(^\s*)|(\s*$)/g, '');
		var unit        = $("#unit").val().replace(/(^\s*)|(\s*$)/g, '');
		var room        = $("#room").val().replace(/(^\s*)|(\s*$)/g, '');
		var mobile      = $("#l_input_phone").val().replace(/(^\s*)|(\s*$)/g, '');
		var isDefault   = 1;	//是否设置为默认地址，0-不默认，1-默认
console.log(addressId);
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
	// alert("aaaa");
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
if(gender=="male"){
	gender="0";
}
if(gender=="female"){
	gender="1";
}
console.log(gender);
var data = '{"data": {"addressId":"' + addressId + '","communityId":"'+communityId+'","gender":"'+gender+'", "name":"' + name +'",  ' +
					 '"building":"' + building +'", "unit":"' + unit + '", "room":"'+ room + '", ' +
					 '"mobile":"' + mobile +'", "isDefault":"' + isDefault + '"}}';
console.log(data);
var dataArray=[];
var address;
if(unit==""){
	address=$(".l_address_search").html()+building+"号楼"+room+"室";
}else{
	address=$(".l_address_search").html()+building+"号楼"+unit+"单元"+room+"室";
}
var communityName=$(".l_address_search").html();
var dataArr={"id":addressId,"mobile":mobile,"address":address,"communityName":communityName,"name":name,"isDefault":isDefault};
dataArray.push(dataArr);
localStorage.setItem("address",JSON.stringify(dataArray));
		$.ajax({
			type: "post",		//使用post方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
			data: data,			//要发送的数据
			headers: headers,	//要发送的header数据
			success: function(result) {
				console.log(result);
				//跳转到我的地址页面
				window.location = "myaddress.html";
			},
			error: function (xhr, textStatus, errorThrow) {
						//alert(xhr.readyState);
				}
		});
	}
}
getAddressInfo();
$(function(){
	$("#l_add").click(function(){
		console.log(1);
		localStorage.removeItem("communityInfo");
		updateAddress();
	})
})

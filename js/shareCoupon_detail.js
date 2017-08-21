var mobile=localStorage.getItem("mobile");
var id=(location.search).replace(/[^0-9]/ig, "");
var token=localStorage.getItem("token");
console.log(id);
console.log(mobile);
function getShareCoupon(){
  if(token!=""){
    var headers = {};
    headers["token"] = token;
    var url=path+"?m=coupon&f=distributeWebchatCoupon&mobile="+mobile+"&couponId="+id;
    console.log(url);
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        if(result.code==200){
          console.log(result);
          
        }
      }
    })
  }
}
getShareCoupon();

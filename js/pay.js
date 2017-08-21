//监听iOS、Android返回键
pushHistory();
window.addEventListener("popstate", function(e) {
  // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
  window.location="trolley.html";
  localStorage.removeItem("coupon");
  localStorage.removeItem("form");
}, false);
function pushHistory() {
  var state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}
localStorage.setItem("location","true");
window.localStorage.removeItem("indexEnter");
var token = localStorage.token;
var path="http://api.suyousc.com/index.php";
// 获取订单金额
amount=localStorage.getItem("amount");
amount=Number(amount).toFixed(2);
// console.log(amount);
//获取使用优惠券的值
if(localStorage.getItem("coupon")){
  coupon=JSON.parse(localStorage.coupon);
}else{
  cutType="0";
}
var form;//判断是从结算页面进入的还是从我的页面进入的
if(localStorage.from){
  form=localStorage.getItem(from);
  form=false;
  localStorage.setItem("form",form);
}else{
  localStorage.setItem("form","false");
}
var pay_form;
if(localStorage.pay_form){
  pay_form=localStorage.getItem("pay_form");
  Boolean(pay_form);
}
// console.log(pay_form);
var getCount;
var coupon;//定义优惠券
var actualAmount;//定义支付金额
var addressId;//定义小区id
var shopId;//定义店铺Id
var sendType;//配送方式
var amount;//订单金额
var cutType="0";//使用优惠劵情况
var couponClass = "";			//全局 - 优惠分类，优惠活动、优惠券
var payType     = "2";			//全局 - 支付方式，默认选择 - 微信支付
var period;//全局 - 配送/自提时段
var fee=0;//配送费
if(localStorage.getItem("coupon")){
  cutType=coupon[0].cutType;
  // console.log(cutType);
}

$(function(){
  getOrderRuleList();
  getCouponList();
  // 页面写入订单金额
  $("#order_price").html("￥"+amount);
  $('.order_num .pay_time_send').click(function(event){
    $(this).addClass("pay_time_red").siblings().removeClass("pay_time_red");
    period=$(this).html();
	});
  // console.log(coupon);
  //选择是自提还是配送
  $("#shopus").click(function(){
    $("#order_ma").css({display:"none"});
  })
  $("#doorsend").click(function(){
    $("#order_ma").css({display:"block"});
  })
  $("#order_ma").click(function(){
    window.location="myaddress.html";
  })
  $("#sinceNum").click(function(){
    window.location="myaddress.html";
  })
  //加载动画
  $("#animation").fadeOut(200);
  //返回
  $("#back").click(function(){
    localStorage.removeItem("coupon");
    localStorage.removeItem("form");
    localStorage.removeItem("pay_form");
    window.location="trolley.html";
  })
})
//获取地址信息
var address=JSON.parse(localStorage.getItem('address'));
// 如果自己选择地址，那么页面地址就是自己选择的地址，否则显示的是默认地址
if(address){
  $(function(){
    $("#address").html(address[0].communityName);
    $("#order_name").html(address[0].name);
    $("#order_moblie").html(address[0].mobile);
    $("#addressId").html(address[0].address);
    addressId=address[0].id;
    console.log(addressId);
  })
  console.log(addressId);
}else{
//ajax异步通信，获取地址信息
function getAddressList(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url =path + "?m=address&f=getAddressList";
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        var json = result.data;
        // console.log(json);
        //如果没有地址就显示添加地址并跳转到添加地址页面
        if(json.length==0){
          $("#order_ma").css({display:"none"});
          $("#add_address").css({display:"block"});
          $("#add_address").click(function(){
            window.location="addaddress.html";
          })
        }
        $.each(json, function(i, item) {
          // console.log(item);
          if ((json.length == 1) || (item.isDefault == "1")){	//只有一条地址信息或该条为默认地址
            //保存全局 - 小区id
            addressId = item.id;
            //更新当前小区
            $("#address").html(item.communityName);
            $("#order_name").html(item.name);
            $("#order_moblie").html(item.mobile);
            $("#addressId").html(item.address);
          }
        });
        //有多个地址的时候，默认的收货地址是默认地址
        if(json.length>1){
          var len=json.length-1;
          addressId = json[len].id;
          $("#address").html(json[len].communityName);
          $("#order_name").html(json[len].name);
          $("#order_moblie").html(json[len].mobile);
          $("#addressId").html(json[len].address);
        }
      },
      error: function (xhr, textStatus, errorThrow) {
            console.log("error");
        }
    });
  }
}
getAddressList();
}
//选择优惠券
function getCouponList(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url =path + "?m=coupon&f=getCouponList&status=0&amount="+amount ;
    // console.log(url);
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        var json = result.data;
        if(json.length==0){
          getCount=false;
        }else if(json.length>0){
          getCount=true;
        }
        $("#order_coupon").click(function(){
          var count=$("#fee").text();
          window.location="getcount.html";
        })
        // if(coupon&&coupon[0].ruleName){
        //   var ruleName=coupon[0].ruleName;
        //   $("#fee").html(ruleName);
        // }
        // if(coupon&&coupon[0].cutType=="0"){
        //   $("#fee").html("您有可用的优惠，请点我使用");
        // }
      }
    })
  }
}
// if(getCount){
//   $("#fee").html("您有可用的优惠，请点我使用");
// }
//ajax异步通信，获取优惠活动列表
function getOrderRuleList(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path+ "?m=orderRule&f=getOrderRuleList&amount=" + amount;
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        var json = result.data;
        // console.log(json);
        if(json.length==0){
          getCount=false;
        }else{
          getCount=true;
        }
      },
      error: function (xhr, textStatus, errorThrow) {
            //alert(xhr.readyState);
        }
    });
  }
}
getOrderRuleList();
getCouponList();
//获取商铺信息
function getUserInfo(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path + "?m=shop&f=getUserShopInfo&amount="+amount;
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      crossDomain: true,
      success: function(result) {
        if(result.code==200){
          console.log(result.data);
          if(getCount==true){
            $("#fee").html("您有可用的优惠，请点我使用");
          }else{
            $("#fee").html("暂无可用").css({color:"#000"});
          }
          if(coupon&&coupon[0].ruleName){
            var ruleName=coupon[0].ruleName;
            $("#fee").html(ruleName);
          }
          var data=result.data;
          shopId=data.shopId;
          fee=data.fee;
          // console.log(fee);
          var accept=data.acceptPeriod.split(",");
          var sendPeriod=data.sendPeriod.split(",");
          //判断是否能配送上门
          if(data.isSend=="1"){
            $("#doorsend").html("配送上门");
            for(var i=0;i<sendPeriod.length;i++){
              $($(".pay_time_send")[i]).html(sendPeriod[i]);
            }
          }else{
            $("#doorsend").css({width:"0px",border:"none",margin:"0px",padding:"0px"});
            $("#shopus").css({border:"1px solid red",color:"red"});
          }
          //判断是否能店铺自取
          if(data.isAccept=="1"){
            $("#shopus").html("店铺自取");
            $("#sinceSome").html(data.shopAddress);
            actualAmount=Number(amount);
            $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
          }else{
            $("#shopus").css({width:"0px",border:"none",margin:"0px",padding:"0px"});
            $("#doorsend").css({border:"1px solid red"});
          }
          if(data.isSend=="1"&&data.isAccept=="1"){
            sendType="1";
            period=sendPeriod[0];
            actualAmount=Number(amount)+Number(data.fee);
            $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
            $("#send_type").append(
              '<span class="order_num_number pay_time pay_time_red " id="doorsend">配送上门</span>\
              <span class="order_num_number pay_time " id="shopus">店铺自提</span>'
            )
            for(var i=0;i<sendPeriod.length;i++){
              // console.log(sendPeriod);
              $(".order_pay_timer").append(
                '<span class="order_num_number pay_time pay_time_send">"'+sendPeriod[i]+'"</span>'
              )
              $($(".pay_time_send")[i]).text($($(".pay_time_send")[i]).text().replace(/["“”]/g,""))
            }
            $(".pay_time_send").eq(0).addClass("pay_time_red");
            //配送费
            if(data.fee){
              $("#send_price").html("￥"+data.fee);
            }
            if(data.freeFeeAmount){
              $("#freefee").html(data.freeFeeAmount);
            }
          }
          //只能配送上门
          if(data.isSend=="1"&&data.isAccept!="1"){
            sendType="1";
            period=sendPeriod[0];
            actualAmount=Number(amount)+Number(data.fee);
            $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
            $("#send_type").append(
              '<span class="order_num_number pay_time pay_time_red " id="doorsend">配送上门</span>'
            )
            for(var i=0;i<sendPeriod.length;i++){
              // console.log(sendPeriod);
              $(".order_pay_timer").append(
                '<span class="order_num_number pay_time pay_time_send">"'+sendPeriod[i]+'"</span>'
              )
              $($(".pay_time_send")[i]).text($($(".pay_time_send")[i]).text().replace(/["“”]/g,""))
            }
            $(".pay_time_send").eq(0).addClass("pay_time_red");
            $("#send_price").html("￥"+data.fee);
          }
          //只能店铺自提
          if(data.isSend!="1"&&data.isAccept=="1"){
            $("#none_shop").css({display:"none"});
            $("#sinceNum").css({display:"inline-block"});//自提地址显示
            $("#order_ma").css({display:"none"});//收货地址隐藏
            sendType="0";
            period=accept[0];
            actualAmount=amount;
            fee=0;
            $("#send_price").html("￥"+0);//配送费
            $("#send_type").append(
              '<span class="order_num_number pay_time pay_time_red" id="shopus">店铺自提</span>'
            )
            for(var i=0;i<accept.length;i++){
              // console.log(sendPeriod);
              $(".order_pay_timer").append(
                '<span class="order_num_number pay_time pay_time_send">"'+accept[i]+'"</span>'
              )
              $($(".pay_time_send")[i]).text($($(".pay_time_send")[i]).text().replace(/["“”]/g,""))
            }
            $(".pay_time_send").eq(0).addClass("pay_time_red");
          }
          //店铺自提
          $("#shopus").click(function(){
            $(this).addClass("pay_time_red");
            $("#doorsend").removeClass("pay_time_red");
            fee=0;
            sendType="0";
            $("#sinceNum").css({display:"block"});//自提地址显示
            $("#order_ma").css({display:"none"});//收货地址隐藏
            $("#send_price").html("￥"+0);//配送费
            $("#send_time").html("自提时段");
            $("#none_shop").css({display:"none"});//满多少钱免配送费
            $(".pay_time_send:first").addClass("pay_time_red").siblings().removeClass("pay_time_red");
            for(var i=0;i<accept.length;i++){
              $($(".pay_time_send")[i]).html(accept[i]);
              period=accept[0];
            }
            if(localStorage.getItem("coupon")){
              uploadCoupon();
            }else{
              actualAmount=amount;
              //实付金额
              $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
            }
          })
          //配送上门
          $("#doorsend").click(function(){
            $(this).addClass("pay_time_red");
            $("#shopus").removeClass("pay_time_red");
            fee=data.fee;
            for(var i=0;i<sendPeriod.length;i++){
              $($(".pay_time_send")[i]).html(sendPeriod[i]);
              period=sendPeriod[0];
            }
            $("#none_shop").show();
            sendType="1";
            $("#sinceNum").css({display:"none"});
            $("#order_ma").css({display:"block"});
            $("#send_time").html("配送时段");
            $(".pay_time_send:first").addClass("pay_time_red").siblings().removeClass("pay_time_red");
            $("#send_price").html("￥"+data.fee);
            // console.log(sendType);
            if(localStorage.getItem("coupon")){
              var ruleName=coupon[0].ruleName;
              $("#fee").html(ruleName);
              uploadCoupon();
            }else{
              $("#fee").html("您有可用的优惠，请点我使用");
              actualAmount=Number(amount)+Number(data.fee);
              $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
            }
          })
          $("#pay_money").click(function(){
            $(this).addClass("pay_time_red");
            $("#wx_pay").removeClass("pay_time_red");
            payType="0";
            pay_form=true;
            uploadCoupon();
            localStorage.setItem("pay_form",pay_form);
            if(localStorage.getItem("coupon")&&coupon[0].cutType=="2"){
              $("#fee").html("优惠劵只支持线上支付");
              console.log(amount);
              actualAmount=Number(amount)+Number(fee);
              $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
            }
          })
          $("#wx_pay").click(function(){
            $(this).addClass("pay_time_red");
            $("#pay_money").removeClass("pay_time_red");
            payType="2";
            uploadCoupon();
            localStorage.removeItem("pay_form");
            if(localStorage.getItem("coupon")&&coupon[0].cutType=="2"){
              $("#fee").html(coupon[0].ruleName);

              actualAmount=Number(amount);
              console.log(amount);
              $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
            }
          })
          $('.order_num .pay_time_send').click(function(event){
            $(this).addClass("pay_time_red").siblings().removeClass("pay_time_red");
            period=$(this).html();
            console.log(period);
          });
          //实付金额
          if(coupon==undefined){
            $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
          }else{
            uploadCoupon();
          }
        }
      },
      error: function (xhr, textStatus, errorThrow) {
            //alert(xhr.readyState);
          }
    });
  }
}
getUserInfo();
// console.log(fee);

//上传优惠劵
function uploadCoupon(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path+ "?m=order&f=getOrderAmount";
    var data;
    // 判断使用时优惠券还是店铺优惠
    if(localStorage.getItem("coupon")){
      if(coupon[0].id){
        var couponInstanceId=coupon[0].id;
        data = '{"data": {"couponInstanceId":"' + couponInstanceId +'","amount":"' + amount +'"}}';
        console.log(data);
      }else{
        var ruleType=coupon[0].ruleType;
        var ruleId=coupon[0].ruleId;
        // console.log(coupon);
        data = '{"data": {"ruleType":"'+ruleType+'","ruleId":"' + ruleId +'","amount":"' + amount +'"}}';
        console.log(data);
      }
    }

    $.ajax({
      type: "post",		//使用post方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: data,			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        console.log(result);
        if(result.code==200){
          var json=result.data;
          var amount1=json.amount;
          // console.log(amount1);
          //实付金额
          // console.log(fee);
          actualAmount=Number(amount1)+Number(fee);
          // console.log(actualAmount);
          $("#atuoprice").html("￥"+Number(actualAmount).toFixed(2));
        }
      }
    })
  }
}

var items=localStorage.getItem("items");
items=JSON.parse(items);
// console.log(addressId);
// console.log(items);
// console.log(period);
//提交订单
function submit(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path+ "?m=order&f=submitOrder";
    var data;
    // console.log(cutType,coupon[0].ruleName);
    if(cutType=="0"){
      data={"data":{"addressId":addressId,"shopId":shopId,"sendType":sendType,"amount":amount,"actualAmount":actualAmount,"payType":payType,"fee":fee,"period":period,"items":items}};
      console.log(data);
    }
    if(cutType=="2"){
      data={"data":{"addressId":addressId,"shopId":shopId,"sendType":sendType,"amount":amount,"actualAmount":actualAmount,"payType":payType,"couponName":coupon[0].ruleName,"couponInstanceId":coupon[0].id,"fee":fee,"period":period,"items":items}};
      console.log(JSON.stringify(data));
    }
    console.log(coupon);
    if(cutType=="1"){
      data={"data":{"addressId":addressId,"shopId":shopId,"sendType":sendType,"amount":amount,"actualAmount":actualAmount,"payType":payType,"ruleType":coupon[0].ruleType,"ruleId":coupon[0].ruleId,"fee":fee,"period":period,"items":items}};
    }
    console.log(JSON.stringify(data));
    $.ajax({
      type: "post",		//使用post方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: JSON.stringify(data),			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        console.log(result);
        var json=result.data;
        if(result.code==400){
          $(".alert_common").html(result.msg).fadeIn(200);
          $(".alert_bg").fadeIn(200);
          setTimeout(function(){
            $(".alert_common").fadeOut(200);
            $(".alert_bg").fadeOut(200);
          },2000);
        }else{
          //判断是上门配送还是货到付款 0是上门配送  1是货到付款
          var order=json.orderCode;
          localStorage.setItem("order","ture");
          console.log(payType,Boolean(pay_form));
          if(payType=="0"&&Boolean(pay_form)){
            localStorage.removeItem("cart");
            localStorage.removeItem("coupon");
            localStorage.removeItem("pay_form");
            window.location="order.html";
          }else{
            actualAmount=Number(actualAmount).toFixed(2);
            console.log(actualAmount);
            console.log(order);
            window.location="http://wx.new.suyousc.com/wx/example/jsapi.php?fee="+actualAmount+"&order="+order;
            // window.location="http://wx.new.suyousc.com/wx/example/jsapi.php?fee=0.01&order="+order;

          }
        }
      }
    })
  }
}
$(function(){
  if(Boolean(pay_form)){
    $("#pay_money").addClass("pay_time_red").siblings().removeClass("pay_time_red");
    payType="0";
  }else{
    $("#wx_pay").addClass("pay_time_red").siblings().removeClass("pay_time_red");
  }
  // console.log(getCount);
  // if(getCount==true){
  //   $("#fee").html("您有可用的优惠，请点我使用");
  // }else{
  //   $("#fee").html("暂无可用").css({color:"#000"});
  // }
  $(".order_detail_btn").click(function(){
    localStorage.setItem("location","true");
    submit();
  })
})

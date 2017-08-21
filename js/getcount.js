pushHistory();
window.addEventListener("popstate", function(e) {
	window.location="pay.html";
  // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
}, false);
function pushHistory() {
  var state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}
var path="http://api.suyousc.com/index.php";
var token=window.localStorage.token;
var pay_form=Boolean(window.localStorage.pay_form);
var dish;
// 获取订单金额
allprice=localStorage.getItem("amount");
var coupon=[];
var dataArray = [];
//ajax异步通信，获取优惠券列表
function jumpToCouponDetail(couponId){
	window.location = "coupondetail.html?couponId=" + couponId;
}
// 获取优惠信息
function test(cash,id,amount){
  dish={"ruleName":cash,"id":id,"cutType":"2"};
  allprice=Number(allprice);
  console.log(allprice);
  if(amount>allprice){
    // alert(1);
    $(".alert_common").fadeIn(200);
    $(".alert_bg").fadeIn(200);
    setTimeout(function(){
      $(".alert_common").fadeOut(200);
      $(".alert_bg").fadeOut(200);
    },2000);
  }else{
    coupon.shift(dish);
    coupon.push(dish);
    console.log(dish);
    window.localStorage.setItem('coupon',JSON.stringify(coupon));
    window.location="pay.html";
  }
}
var couponLen=[];
//优惠券列表
function getCouponList(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url =path + "?m=coupon&f=getCouponList&status=0&amount=" + allprice;
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
				if(result.code==200){
					var json = result.data;
	        // console.log(json);
					// console.log(json);
					var casher;
					var ider;
					var amounter;
	        $.each(json, function(i, item) {
						console.log(couponLen);
						var tempDict = {};
	          var cash = item.cash;
						var name = item.name;
	          console.log(item);
	          if (cash.indexOf(".00") > -1){
	            cash = cash.replace(".00", "");
	          }
	          var amount = item.amount;
	          if (amount.indexOf(".00") > -1){
	            amount = amount.replace(".00", "");
	          }
	          console.log(amount,allprice);
							tempDict.id = item.id;
							tempDict.cash = item.cash;
							tempDict.amount = item.amount;
							console.log(allprice,item.amount);
							if(allprice>Number(item.amount) ){
							  tempDict.canUse = true;
							}else{
							  tempDict.canUse = false;
							}
							tempDict.startTime = item.startTime;
							tempDict.endTime = item.endTime;
							dataArray.push(tempDict);
							console.log(tempDict);
							console.log(name);
	          $(".l_coupon_unused_list").append(
	            '<div class="coupon" casher="'+name+'" ider="'+item.id+'" amounter="'+amount+'">\
	              <div class="coupon_left">\
	                <div class="coupon_price">￥<span id="coupon1_price_No">' + cash + '</span>\
	                </div>\
	                <div class="coupon_limit">满' + amount + '元可用</div>\
	              </div>\
	              <div class="coupon_mid">\
	                <div class="coupon_content">有效期：' + item.startTime.substr(0, 10) + '至' + item.endTime.substr(0, 10) + '</div>\
	                <div class="coupon_content">仅在线支付可用</div>\
	              </div>\
	              <div class="coupon_right">\
	                <div class="coupon_arrow">\
	                  <img src="images/arrow.png">\
	                </div>\
	                <div class="coupon_detail" ider="'+item.id+'">详<br>情</div>\
	              </div>\
	            </div>\
	          </div>'
	          );
		        if (tempDict.canUse == false) {
							$($(".coupon")[i]).removeAttr("onclick");
							$($(".coupon_price")[i]).css({color:"#b5aeae"});
	            $($(".coupon")[i]).css({backgroundImage:"url(images/coupon_bg1.png)"});
						}
						$($(".coupon")[i]).not(".coupon_detail").click(function(){
							casher=$(this).attr("casher");
							ider=$(this).attr("ider");
							amounter=$(this).attr("amounter");
							test(casher,ider,amounter);
						})
						$($(".coupon_detail")[i]).click(function(e){
							e.stopPropagation();
							ider=$(this).attr("ider");
							jumpToCouponDetail(ider);
						})
	        });
				}

      }
    })
  }
}

// 不使用优惠
$(function(){
  $("#no_coupon").click(function(){
      dish={"cutType":"0"}
      coupon.shift(dish);
      coupon.push(dish);
      console.log(dish);
      window.localStorage.setItem('coupon',JSON.stringify(coupon));
      window.location="pay.html";
  })
})
//ajax异步通信，获取优惠活动列表
function getOrderRuleList(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path+ "?m=orderRule&f=getOrderRuleList&amount=" + allprice;
		// var url = path+ "?m=orderRule&f=getOrderRuleList";

    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        var json = result.data;
        // console.log(json);
        $("#coupon_category_list").html("");	//清空coupon_category_list内容
        if (json.length > 0){
          $("#coupon_category_list").append(
            '<div class="coupon_category_title">优惠活动</div>'
          );
        }
        //优惠活动图标
        var imageInfo = "";
        $.each(json, function(i, item) {
          // console.log(item);
          switch (item.ruleType){
            //减
            case '1':
              imageInfo = '<img src="images/rule_minus.png">';
              break;
            //折
            case '2':
              imageInfo = '<img src="images/rule_discount.png">';
              break;
            //赠
            case '3':
              imageInfo = '<img src="images/rule_present.png">';
              break;
          }
          $("#coupon_category_list").append(
            '<div class="coupon_category_block">' +
              imageInfo +
              '<span class="coupon_category_name">' + item.ruleName + '</span>' +
              '<div class="coupon_category_select">选<br>用</div>' +
            '</div>'
          );
          $($(".coupon_category_block")[i]).not(".coupon_category_select").click(function(){
            dish={"ruleType":item.ruleType,"ruleName":item.ruleName,"ruleId":item.ruleId,"cutType":"1"};
            coupon.shift(dish);
            coupon.push(dish);
            console.log(dish);
            window.localStorage.setItem('coupon',JSON.stringify(coupon));
            window.location="pay.html";
          })
        });
      },
      error: function (xhr, textStatus, errorThrow) {
            //alert(xhr.readyState);
      }
    });
  }
}
getOrderRuleList();
$(function(){
	// console.log(pay_form);
	if(pay_form){
		$(".l_coupon_unused_list").html("优惠劵只支持线上支付").css({color:"#e12",textIndent:"10px"});
	}else{
		getCouponList();
	}
  $("#back").click(function(){
    window.location="pay.html";
  })
})

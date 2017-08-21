var path="http://api.suyousc.com/index.php";
var token=window.localStorage.token;
//ajax异步通信，获取优惠券列表
function jumpToCouponDetail(couponId){
	window.location = "coupondetail.html?couponId=" + couponId;
}
function getCouponList(status){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url =path + "?m=coupon&f=getCouponList&status=" + status;
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        var json = result.data;
				console.log(json);
        switch (status){
          //“未使用”优惠券列表
          case 0:
					{
						console.log(json);
            $(".l_coupon_unused").html("未使用(" + json.length + ")");
            $.each(json, function(i, item) {
              var cash = item.cash;
              // console.log(cash);
              if (cash.indexOf(".00") > -1){
                cash = cash.replace(".00", "");
              }
              var amount = item.amount;
              if (amount.indexOf(".00") > -1){
                amount = amount.replace(".00", "");
              }
              $(".l_coupon_unused_list").append(
                '<div class="coupon">\
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
                    <div class="coupon_detail" onclick="jumpToCouponDetail(' + item.id + ')">详<br>情</div>\
                  </div>\
                </div>\
              </div>'
              );
            });
            break;
          }
          //“已使用”优惠券列表
          case 1:
          {
            $("#coupon_list_used").html("");	//清空coupon_list_used内容
            $(".l_coupon_over").html("已使用(" + json.length + ")");
						console.log(json);
            $.each(json, function(i, item) {
              var cash = item.cash;
              if (cash.indexOf(".00") > -1){
                cash = cash.replace(".00", "");
              }
              var amount = item.amount;
              if (amount.indexOf(".00") > -1){
                amount = amount.replace(".00", "");
              }
              $(".l_coupon_over_list").append(
                '<div class="coupon">\
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
                    <div class="coupon_detail" onclick="jumpToCouponDetail(' + item.id + ')">详<br>情</div>\
                  </div>\
                </div>\
              </div>'
              );
            });
            break;
          }
          //“已过期 ”优惠券列表
          case 2:
          {
            $("#coupon_list_overdue").html("");	//清空coupon_list_used内容
            $(".l_coupon_used").html("已过期(" + json.length + ")");
						console.log(json);
            $.each(json, function(i, item) {
              var cash = item.cash;
              if (cash.indexOf(".00") > -1){
                cash = cash.replace(".00", "");
              }
              var amount = item.amount;
              if (amount.indexOf(".00") > -1){
                amount = amount.replace(".00", "");
              }
              $(".l_coupon_used_list").append(
                '<div class="coupon">\
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
                    <div class="coupon_detail" onclick="jumpToCouponDetail(' + item.id + ')">详<br>情</div>\
                  </div>\
                </div>\
              </div>'
              );
            });
            break;
          }
        }
      },
      error: function (xhr, textStatus, errorThrow) {
            //alert(xhr.readyState);
        }
    });
  }
}
  getCouponList(0);
  getCouponList(1);
  getCouponList(2);
$(function(){
  // 选项卡颜色
  $(".l_coupon_sel").children().click(function(){
			$(this).removeClass("coupon_use").addClass("coupon_use_selected");
			$(this).siblings().removeClass("coupon_use_selected").addClass("coupon_use");
		});
    // 选项卡
  $(".l_coupon_unused").click(function(){
		$(".l_coupon_unused_list").show();
		$(".l_coupon_over_list").hide();
		$(".l_coupon_used_list").hide();
	});
	$(".l_coupon_over").click(function(){
		$(".l_coupon_unused_list").hide();
		$(".l_coupon_over_list").show();
		$(".l_coupon_used_list").hide();
	});
	$(".l_coupon_used").click(function(){
		$(".l_coupon_unused_list").hide();
		$(".l_coupon_over_list").hide();
		$(".l_coupon_used_list").show();
	});
  // 加载动画
  $("#animation").fadeOut(300);
  // 返回
	$("#back").click(function(){window.history.back();});
  // 跳转
	$(".coupon_right").click(function(){window.location = "coupondetail.html";});
})

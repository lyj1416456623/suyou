var path="http://api.suyousc.com/index.php";
var token=window.localStorage.token;
var couponId =(location.search).replace(/[^0-9]/ig, "");
//ajax异步通信，获取优惠券详情
function getCouponById(){
	if (token != ""){
		var headers = {};
		headers["token"] = token;
		var url = path + "?m=coupon&f=getCouponById&id=" + couponId;
		$.ajax({
			type: "get",		//使用get方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
			data: "",			//要发送的数据
			headers: headers,	//要发送的header数据
			success: function(result) {
        // console.log(result);
				var item = result.data;
        // console.log(item);
				var cash = item.cash;
				if (cash.indexOf(".00") > -1)
				{
					cash = cash.replace(".00", "");
				}

				var amount = item.amount;
				if (amount.indexOf(".00") > -1)
				{
					amount = amount.replace(".00", "");
				}
				$("#main").append(
					'<div class="l_coupondetail">\
            <div class="l_coupondetail_item" id="l_coupondetail_top">\
              <div id="coupon_detail_title" class="coupon_detail_title">' + item.name + '</div>\
              <div class="l_coupon_detail_validity" >\
                <span class="l_coupondetail_name">有效期</span>\
                <span class="l_coupondetail_content">' + item.startTime.substr(0, 10) + '至' + item.endTime.substr(0, 10) + '</span>\
              </div>\
            </div>\
            <div class="l_coupondetail_item" id="l_coupondetail_middle">\
              <div class="l_coupon_detail_validity">\
                <span class="l_coupondetail_name">领取时间</span>\
                <span class="l_coupondetail_content">' + item.addTime.substr(0, 10) +'</span>\
              </div>\
              <div class="l_coupon_detail_validity">\
                <span class="l_coupondetail_name">使用期限</span>\
                <span class="l_coupondetail_content">' + item.startTime.substr(0, 10) + '至' + item.endTime.substr(0, 10) + '</span>\
              </div>\
            </div>\
            <div class="l_coupondetail_item" id="l_coupondetail_bottom">\
              <div class="l_coupon_detail_validity">\
                <span class="l_coupondetail_name">使用说明<br></span>\
                <span class="coupon_detail_content">\
                  <span class="coupon_detail_content_ins">单笔订单商品金额满' + amount + '元可减免' + cash + '元</span><br>\
                  <span class="coupon_detail_content_ins">此优惠券一经使用不得退换</span><br>\
                  <span class="coupon_detail_content_ins">仅在线支付可用</span><br>\
                  <span class="coupon_detail_content_ins">不能与其他优惠券同时使用</span>\
                </span>\
                <div class="coupon_detail_sum">\
                  <span class="coupon_detail_rmb">￥</span>\
                  <span class="coupon_detail_No">' + cash + '</span>\
                  <span class="coupon_detail_text">代金券</span>\
                </div>\
              </div>\
            </div>\
          </div>'
				);
				//设置字体颜色
				if (item.status == 0)	//未使用
				{
					$(".coupon_detail_title").attr('style','color:#ee1122');
					$(".coupon_detail_No").attr('style','color:#ee1122');
					$(".coupon_detail_rmb").attr('style','color:#ee1122');
				}
				else
				{
					$(".coupon_detail_title").attr('style','color:#333333');
					$(".coupon_detail_No").attr('style','color:#333333');
					$(".coupon_detail_rmb").attr('style','color:#333333');
				}
			},
			error: function (xhr, textStatus, errorThrow) {
		        //alert(xhr.readyState);
		    }
		});
	}
}
getCouponById();

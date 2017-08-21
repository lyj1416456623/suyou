$(function(){
  var path="http://api.suyousc.com/index.php";
  var token=window.localStorage.token;
  var orderId=(location.search).replace(/[^0-9]/ig, "");
  // console.log(orderId);
  //获取订单详情
  function getOrderDetailById(){
    if (token != ""){
      var headers = {};
      headers["token"] = token;
      var url = path+ "?m=order&f=getOrderById&orderId=" + orderId;
      $.ajax({
        type: "get",		//使用get方法访问后台
        dataType: "json",	//返回json格式的数据
        url: url,			//要访问的后台地址
        // data: "",			//要发送的数据
        headers: headers,	//要发送的header数据
        crossDomain: true,
        success: function(result) {
          var data=result.data;
          console.log(data);
          // console.log(data.statusName);
          console.log(data.details);
          var url=""
          if(result.code==200){
              if(data.sendType=="1"){
                data.sendType="配送上门";
              }else{
                data.sendType="店铺自提";
              }
              if(data.payType=="0"){
                data.payType="货到付款";
              }else if(data.payType=="1"){
                data.payType="支付宝";
              }else{
                data.payType="微信支付";
              }
              //判断是否使用了优惠券
            if (data.couponName == ""){
              data.couponName = "未使用优惠劵";
            }
            $("#main").append(
              '<div class="order_block">\
                <div class="order_block_item">\
                <div class="order_cancel">\
                  <div class="order_cancel_item order_cancel_item1" id="yes_'+data.orderId+'">确认收货</div>\
                  <div class="order_cancel_item order_cancel_item2" id="tel_'+data.orderId+'" data-tel="'+data.shopPhone+'">申请取消</div>\
                </div>\
                  <div class="order_num order_border" id="order_num_name">\
                    <span class="order_num_name" >订单编号</span>\
                    <span class="order_num_number">'+data.orderCode+'</span>\
                    <span class="order_wait">'+data.statusName+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name" id="order_time_name">下单时间</span>\
                    <span class="order_num_number" id="order_time">'+data.orderTime+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name" id="order_send">配送方式</span>\
                    <span class="order_num_number" id="order_send_s">'+data.sendType+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name" id="order_time_name">配送时间</span>\
                    <span class="order_num_number" id="order_time">'+data.sendTime+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name">配送地址</span>\
                    <span class="order_num_number">'+data.address+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name">订单金额</span>\
                    <span class="order_num_number">￥'+data.amount+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name order_ma">配送费</span>\
                    <span class="order_num_number">￥'+data.fee+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name order_ma">优惠券</span>\
                    <span class="order_num_number ">'+data.couponName+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name">实付金额</span>\
                    <span class="order_num_number order_red">￥'+data.actualAmount+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name">支付方式</span>\
                    <span class="order_num_number">'+data.payType+'</span>\
                  </div>\
                  <div class="order_num order_border">\
                    <span class="order_num_name order_ma" >联系人</span>\
                    <span class="order_num_number">'+data.accepterName+'</span>\
                    <span class="order_detail_phone">'+data.accepterMobile+'</span>\
                  </div>\
                  <div class="order_num">\
                    <span class="order_num_name order_ma">收货码</span>\
                    <span class="order_num_number order_red">'+data.receivedCode+'</span>\
                    <span class="order_evaluation order_wait hide">评价订单</span>\
                  </div>\
                </div>\
              </div>\
              <div class="order_detail_btn">联系店铺</div>'
            )
            // if(data.statusName=="已完成"){
            //   $(".order_block_item").append(
            //     '<div class="redBao" id="redBao"></div>'
            //   )
            // }
            // $("#redBao").click(function(){
            //   window.location="http://wx.dev.1cheng.cc/jssdk/sample.php"
            // })
          for(var i = 0;i < data.details.length;i++){
            if(data.details[i].ruleName!=""){
              if(Number(data.details[i].actualPrice)!= Number(data.details[i].price)){
                $("#main").append(
                  '<div class="eval_list">\
                    <div class="eval_goods">\
                      <div class="eval_goods_img">\
                        <img src="' + data.details[i].imageUrls[0] + '" alt="" />\
                      </div>\
                      <div class="eval_goods_info">\
                        <div class="eval_goods_title">\
                          <span class="rule_name" style="border:1px solid #e12;padding:0 3px;margin-right:3px">'+data.details[i].ruleName+'</span>\
                          <span class="eval_goods_name">'+data.details[i].productName+'</span>\
                          <span class="eval_goods_standard">规格'+data.details[i].scale+data.details[i].unit+'</span>\
                        </div>\
                        <div class="eval_goods_price">￥'+data.details[i].actualPrice+'<del style="color:#999;font-size:12px;">￥'+data.details[i].price+'</del></div>\
                      </div>\
                      <div class="order_detail_num">X'+data.details[i].count+'</div>\
                      <div class="clear"></div>\
                    </div>\
                  </div>'
                )
              }else{
                $("#main").append(
                  '<div class="eval_list">\
                    <div class="eval_goods">\
                      <div class="eval_goods_img">\
                        <img src="' + data.details[i].imageUrls[0] + '" alt="" />\
                      </div>\
                      <div class="eval_goods_info">\
                        <div class="eval_goods_title">\
                          <span class="rule_name" style="border:1px solid #e12;padding:0 3px;margin-right:3px">'+data.details[i].ruleName+'</span>\
                          <span class="eval_goods_name">'+data.details[i].productName+'</span>\
                          <span class="eval_goods_standard">规格'+data.details[i].scale+data.details[i].unit+'</span>\
                        </div>\
                        <div class="eval_goods_price">￥'+data.details[i].actualPrice+'</div>\
                      </div>\
                      <div class="order_detail_num">X'+data.details[i].count+'</div>\
                      <div class="clear"></div>\
                    </div>\
                  </div>'
                )
              }
            }else{
              $("#main").append(
                '<div class="eval_list">\
                  <div class="eval_goods">\
                    <div class="eval_goods_img">\
                      <img src="' + data.details[i].imageUrls[0] + '" alt="" />\
                    </div>\
                    <div class="eval_goods_info">\
                      <div class="eval_goods_title">\
                        <span class="eval_goods_name">'+data.details[i].productName+'</span>\
                        <span class="eval_goods_standard">规格'+data.details[i].scale+data.details[i].unit+'</span>\
                      </div>\
                      <div class="eval_goods_price">￥'+data.details[i].actualPrice+'</div>\
                    </div>\
                    <div class="order_detail_num">X'+data.details[i].count+'</div>\
                    <div class="clear"></div>\
                  </div>\
                </div>'
              )
            }

          }
          if(data.status=="3"){
            $(".order_cancel_item2").css({display:"block",color:""}).html("取消订单");
          }
          if(data.status=="3"||data.status=="4"||data.status=="5"||data.status=="6"||data.status=="7"||data.status=="8"||data.status=="9"){
            $(".order_cancel_item2").css({display:"block"});
          }
          if(data.status=="10"){
            $(".order_cancel_item1").css({display:"block"});
            $(".order_cancel_item2").css({display:"block"});
          }
          if(data.status=="13"){
            $(".order_evaluation").css({display:"block"});
          }
          $(".order_cancel_item2").click(function(){
             console.log($(this).text());
             orderId=$(this).attr("id").replace(/[^0-9]/ig, "");
             var phone=$(this).attr("data-tel");
             // console.log(phone);
             if($(this).text()=="取消订单"){
               action("取消订单","");
               // location.reload();
             }
             if($(this).text()=="申请取消"){
               action("申请取消",phone);
             }
          })
          $(".order_cancel_item1").click(function(){
             console.log($(this).text());
             orderId=$(this).attr("id").replace(/[^0-9]/ig, "");
             if($(this).text()=="确认收货"){
               action("确认收货","");
             }
          })
          function action(name,phone){
            switch (name) {
               case "取消订单":
                 cancel("12");
                 break;
               case "申请取消":
                 console.log(phone);
                 window.location.href="tel://"+phone;
                 break;
               case "确认收货":
                 cancel("13");
                break;
              default:
            }
          }
          function request(tag,type,url,data,isToken){
             var headers = {};
             if (isToken == true){
               headers["token"] = token;
              }
              console.log(headers);
              console.log(data);
              $.ajax({
                type: type,		//使用post方法访问后台
                dataType: "json",	//返回json格式的数据
                url: url,			//要访问的后台地址
                data: JSON.stringify(data),			//要发送的数据
                headers: headers,	//要发送的header数据
                success: function(result) {
                  if(tag==1){
                     console.log(result);
                     location.reload();
                  }
                }
              })
            }
            function cancel(status){
              var data={"data":{"orderId":orderId,"status":status,"reason":""}};
              console.log(data);
              var url=path+"?m=order&f=saveOrderStatus";
              request(1,"post",url,data,true)
            }
            // var url="edit_evaluation.html?productId=" + data.details[0].productId;
            if(data.isCommented=="1"){
              $(".order_evaluation").html("查看评价");
            }else{
              $(".order_evaluation").html("评价订单");
            }
            $(".order_evaluation").click(function(){
              console.log(url);
              if(data.isCommented=="1"){
                window.location="order_evaluation.html?orderId=" + data.orderId;
              }else{
                window.location="edit_evaluation.html?orderId=" + data.orderId;
              }
            })

          $(".order_detail_btn").click(function(){
            window.location.href = 'tel://' + data.accepterMobile;
          })
          }
        }
      })
    }
  }
  getOrderDetailById();

	//ajax异步通信，获取客服电话
	function contactUs(){
		if (token != "")
		{
			var headers = {};
			headers["token"] = token;
			var url =path + "?m=system&f=getCustomerSupport";
			$.ajax({
				type: "post",		//使用post方法访问后台
				dataType: "json",	//返回json格式的数据
				url: url,			//要访问的后台地址
				data: "",			//要发送的数据
				headers: headers,	//要发送的header数据
				success: function(result) {
					//拨打客服电话
					window.location.href = 'tel://' + result.data.phone;
          console.log(result.data.phone);
				},
				error: function (xhr, textStatus, errorThrow) {
			        //alert(xhr.readyState);
			    }
			});
		}
	}
  $(".order_detail_btn").click(function(){
    contactUs();
  })
})

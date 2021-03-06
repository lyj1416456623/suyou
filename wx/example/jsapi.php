<?php

ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';


 $info[0]=$_GET['fee'];
 $info[1]=$_GET['order'];


//初始化日志
/*$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler , 15);
*/


//①、获取用户openid
$tools = new JsApiPay();
$data= $tools->GetOpenid($info);
$a=$data[0]*100 ;
$b=$data[1];

//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody("速优生鲜");
$input->SetAttach("速优生鲜");
$input->SetOut_trade_no($data[2]);
$input->SetTotal_fee($a);
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("速优生鲜");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($data[1]);
$order = WxPayApi::unifiedOrder($input);

$jsApiParameters = $tools->GetJsApiParameters($order);

//获取共享收货地址js函数参数
$editAddress = $tools->GetEditAddressParameters();

//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
?>

<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>微信支付</title>
    <script type="text/javascript">
    pushHistory();
    window.addEventListener("popstate", function(e) {
        if(localStorage.getItem("location")){
	    // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
	    window.location="http://wx.new.suyousc.com/pay.html";
	    localStorage.removeItem("location");
      localStorage.removeItem("coupon");
	  }
	}, false);
	function pushHistory() {
	  var state = {
	    title: "title",
	    url: "#"
	  };
	  window.history.pushState(state, "title", "#");
	}


	 function jsApiCall()
       {
           WeixinJSBridge.invoke(
               'getBrandWCPayRequest',
             <?php echo $jsApiParameters; ?>,
               function(res){
                   WeixinJSBridge.log(res.err_msg);
                   if(res.err_msg == "get_brand_wcpay_request:ok"){
                   //alert(res.err_code+res.err_desc+res.err_msg);
                       window.location.href="http://wx.new.suyousc.com/order.html";
                       localStorage.removeItem("cart");
                       localStorage.removeItem("coupon");
                   }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                   	 window.location.href="http://wx.new.suyousc.com/trolley.html";
                   	 localStorage.removeItem("location");
                     localStorage.removeItem("coupon");
                   }else{
                       //返回跳转到订单详情页面
                       alert(支付失败);
                       window.location.href="http://wx.new.suyousc.com/trolley.html";

                   }
               }
           );
       }



	function callpay()
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}
	</script>

</head>
<style>
	/*提交订单*/
.submit-title{
	padding:30px 0 10px;
	width:100%;
	text-align:center;
	line-height: 30px;
	font-size:24px;
}
.submit-price{
	text-align:center;
	font-size:46px;
}
.submit_pay{
	width:100%;
	height:60px;
	background:#fff;
	margin-top:30px;
	border:1px solid #fafafa;
	line-height:60px;
	font-size:18px;
}
.submit_pay_left{
	float:left;
	padding-left:30px;
	color:#999;
}
.submit_pay_right{
	float:right;
	padding-right:30px;
}
.submit{
	width:80%;
	height:50px;
	background:#e12;
	margin:45px auto;
	border-radius:5px;
	text-align: center;
	line-height: 50px;
	color:#fff;
}
</style>

<body style="background:#eee">
  <div class="submit-title">速优生鲜</div>
  <div class="submit-price">￥<?php echo $data[0] ?></div>
  <div class="submit_pay">
    <div class="submit_pay_left">收款方</div>
    <div class="submit_pay_right">速优生鲜</div>
  </div>
 <div class="submit"  onclick="callpay()" >立即支付</div>
</body>

</html>

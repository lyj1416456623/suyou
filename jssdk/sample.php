<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx36d8e884ae06357e", "8d382d28949d001394045d689d07920a");
$signPackage = $jssdk->GetSignPackage();

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>微信红包分享</title>
</head>
<body>
 jjklkjljljlkjljljlj
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>

wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: '<?php echo $signPackage["timestamp"];?>',
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
    ]
  });
wx.ready(function () {

wx.onMenuShareAppMessage({

    title: '给你发红包啦', // 分享标题
    desc: '可以买零食的红包', // 分享描述
    link: 'http://wx.new.suyousc.com/shareCoupon.html', // 分享链接
    imgUrl: 'http://pic.58pic.com/58pic/13/90/09/17T58PICdY6_1024.jpg', // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
   //     alert("分享给朋友成功.");
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});

wx.onMenuShareTimeline({
    title: '给你发红包啦', // 分享标题
    desc: '可以买零食的红包', // 分享描述
    link: 'http://wx.new.suyousc.com/shareCoupon.html', // 分享链接
    imgUrl: 'http://wx.new.suyousc.com/58pic/13/90/09/17T58PICdY6_1024.jpg', // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
});
});
</script>
</html>

//获取productId
var path="http://api.suyousc.com/index.php";
var orderId=(location.search).replace(/[^0-9]/ig, "");
var token=localStorage.token;
var dic=[];//定义数组
var content=[];
var orderCode;//订单号
var productId;//商品Id
var orderId;//订单Id
var dirr={};
var scoreArray=[];
var currentScore=0;
// console.log(orderId);
//获取订单信息
function getProductDetail(){
  var url = path+ "?m=order&f=getOrderById&orderId=" + orderId;
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers:headers,
      success: function(result) {
        // console.log(result);
        var data=result.data;
        orderId=data.orderId;
        var strData = '';
        var stars=[];
        orderCode=data.orderCode;
        var details=data.details;
        // console.log(details);
        if(result.code=="200"){
          $(".eval_orderId").html(orderCode);
          for(var i=0;i<details.length;i++){
            strData += 	getHtml(details[i]);
            stars.push("star_"+details[i].productId);
            dic.push(details[i].productId);
          }
          // console.log(stars.length);
          $("#main").append(strData);
          var stepW = 24;
          var l_grade_text = new Array("极差","失望","一般","满意","惊喜");
          var l_grade_num = new Array("1","2","3","4","5");
          var array=[];
          var stepW = 24;
          var index=0;
          for(var i=0;i< stars.length;i++){
            $("#"+stars[i]).on('click','li',function(e){
              var star=$("#"+stars[i]).find("li");
              var num=$(this).find("a").attr("title");
              $(this).parent().parent().find(".current-rating").css({"width":stepW*num});
              num=Number(num)-1;
              $(this).parent().parent().parent().find(".l_grade_text").html(l_grade_text[num]);
              $(this).parent().parent().parent().find(".l_grade_num").html(l_grade_num[num]);
            })
          }
          $(".edit_evaluation").click(function(){
            $(this).html("");
          })
        }
      }
    })
  }
}
//页面显示
function getHtml(item){
  var html='<div class="eval_list">\
    <div class="eval_goods eval_goods_edit">\
      <div class="eval_goods_img">\
        <img src="'+item.imageUrls[0]+'" alt="" />\
      </div>\
      <div class="eval_goods_info">\
        <div class="eval_goods_title">\
          <span class="eval_goods_name">'+item.productName+'</span>\
          <span class="eval_goods_standard">规格'+item.scale+item.unit+'</span>\
        </div>\
        <div class="eval_goods_price">￥'+item.price+'</div>\
      </div>\
      <div class="order_detail_num">X'+item.count+'</div>\
      <div class="clear"></div>\
    </div>\
    <div class="l_evaluation_content">\
      <div class="l_evaluation_grade">\
        <div class="l_grade_title">商品评分</div>\
        <div id="xzw_starBox">\
          <ul class="star" id="star_'+item.productId+'" date-role="'+item.productId+'">\
            <li><a href="javascript:void(0)" title="1" class="one-star">1</a></li>\
            <li><a href="javascript:void(0)" title="2" class="two-stars">2</a></li>\
            <li><a href="javascript:void(0)" title="3" class="three-stars">3</a></li>\
            <li><a href="javascript:void(0)" title="4" class="four-stars">4</a></li>\
            <li><a href="javascript:void(0)" title="5" class="five-stars">5</a></li>\
          </ul>\
          <div class="current-rating" id="showb_'+item.productId+'"></div>\
        </div>\
        <div class="l_grade_text" ></div>\
        <div class="l_grade_num hide" ></div>\
        <div class="clear"></div>\
      </div>\
      <div class="l_evaluation_text">\
        <textarea name="feedback" rows="8" cols="30" class="l_feedback_text edit_evaluation" id="feedback_content_'+item.productId+'">请输入评价</textarea>\
      </div>\
    </div>\
  </div>'
  return html;
}

$(function(){
  //动画
  $("#animation").fadeOut(200);
  //点击提交按钮
  $("#editFinish").click(function(){
    var text=$(".l_grade_text").length;
    for(var i=0;i<text;i++){
      scoreArray.push($($(".l_grade_num")[i]).text());
      console.log(scoreArray);
      if($($(".edit_evaluation")[i]).val()=="请输入评价"){
        content.push("");
      }else{
        content.push($($(".edit_evaluation")[i]).val());
      }
      var grade_text=$($(".l_grade_text")[i]).text();
      console.log(grade_text);
    }
    if(text==scoreArray.length&&grade_text!=""){
      var resultArray = [];
      //发送数据的值
      for (var i=0;i<scoreArray.length;i++){
        var dict = {};
        dict.orderId = orderId;
        dict.productId = dic[i];
        dict.score = scoreArray[i];
        dict.content = content[i];
        resultArray.push(dict);
      }
      console.log(resultArray);
      var data=JSON.stringify({"data":resultArray});
      console.log(data);
      comment(data);
    }else{
      $(".alert_common").fadeIn(200);
      $(".alert_bg").fadeIn(200);
      setTimeout(function(){
        $(".alert_common").fadeOut(200);
        $(".alert_bg").fadeOut(200);
      },2000);
      return false;
    }
  })
  $("#back").click(function(){
    $("#loginout").css({display:"block"});
  })
  $("#l_no_btn").click(function(){
    $("#loginout").css({display:"none"});
  })
  $("#l_yes_btn").click(function(){
    history.back(-1);
  })
})
//评论发送到后台
function comment(data){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url=path+"?m=comment&f=addComment";
    $.ajax({
      type: "post",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: data,			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        if (result.code == 200){
          $(".alert_common").html("评价成功").fadeIn(200);
          $(".alert_bg").fadeIn(200);
          setTimeout(function(){
            $(".alert_common").fadeOut(200);
            $(".alert_bg").fadeOut(200);
            history.back(-1);
          },2000);
        }else {
          $(".alert_common").html(result.msg).fadeIn(200);
          $(".alert_bg").fadeIn(200);
          setTimeout(function(){
            $(".alert_common").fadeOut(200);
            $(".alert_bg").fadeOut(200);
          },2000);
        }
      }
    })
  }
}
getProductDetail();

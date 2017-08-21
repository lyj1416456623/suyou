
var token=window.localStorage.token;
var path="http://api.suyousc.com/index.php";
var orderId=(location.search).replace(/[^0-9]/ig, "");
//获取订单号
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
        console.log(result);
        var data=result.data;
        console.log(data.isCommented);
        $(".order_num_number").html(data.orderCode);
      }
    })
  }
}
getOrderDetailById();
//ajax异步通信，获取订单评价
function getProductComment(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path + "?m=comment&f=getOrderComment&orderId="+orderId;
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers:headers,
      crossDomain: true,
      success: function(result) {
        var json = result.data;
        console.log(result);
        $.each(json, function(i, item) {
          var score = "";
          var content = "";
          console.log(item.productId);
          //判断用户评价打分情况
          switch (item.score)
          {
            case '1':
              content = "极差";
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              break;
            case '2':
              content = "失望";
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              break;
            case '3':
              content = "一般";
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              break;
            case '4':
              content = "满意";
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star_blank.png">';
              break;
            case '5':
              content = "惊喜";
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              score += '<img class="addfeedback_star" src="images/star1.png">';
              break;
          }
          var name = item.userName;
          $("#main").append(
            '<div class="eval_list">\
              <div class="eval_goods">\
                <div class="eval_goods_img">\
                  <img src="' + item.imageUrls[0] + '" alt="" />\
                </div>\
                <div class="eval_goods_info">\
                  <div class="eval_goods_title">\
                    <span class="eval_goods_name">'+item.productName+'</span>\
                    <span class="eval_goods_standard">规格'+item.scale+'</span>\
                  </div>\
                  <div class="eval_goods_price">￥'+item.price+'</div>\
                </div>\
                <div class="order_detail_num">X'+item.number+'</div>\
                <div class="clear"></div>\
              </div>\
              <div class="l_evaluation_content">\
              <div class="l_evaluation_grade">\
                <div class="l_grade_title">商品评分</div>\
                <div class="l_grade_star">'+score+'</div>\
                <div class="l_grade_text">' + content + '</div>\
                <div class="clear"></div>\
              </div>\
              <div class="l_text_title">商品评价</div>\
                <div class="l_text_content">' + item.content + '</div>\
                <div class="clear"></div>\
              </div>\
              </div>\
            </div>'
          )

        });
      },
      error: function (xhr, textStatus, errorThrow) {
            //alert(xhr.readyState);
        }
    });
  }
}
getProductComment();	//获取商品评价


var token=window.localStorage.token;
var path="http://api.suyousc.com/index.php";
var productId=(location.search).replace(/[^0-9]/ig, "");
//获取商品信息
function getProductDetail(){
  $.ajax({
    type: "get",		//使用get方法访问后台
    dataType: "json",	//返回json格式的数据
    url: path+"?m=product&f=getProductDetail&productId="+productId,			//要访问的后台地址
    // data: data,			//要发送的数据
    success: function(result) {
      $(".search_list").html("");
      $(".l_search").show();
      var data=result.data;
      if(data.imageUrls[0]==undefined){
        data.imageUrls[0]="images/icon4.jpg";
      }
      console.log(data);
        $(".eval_list").append(
        '<div class="eval_goods">\
            <div class="eval_goods_img">\
              <img src="' + data.imageUrls[0] + '" alt="" />\
            </div>\
            <div class="eval_goods_info">\
              <div class="eval_goods_title">\
                <span class="eval_goods_name">'+data.productName+'</span>\
                <span class="eval_goods_standard">规格' + data.scale + '</span>\
              </div>\
              <div class="eval_goods_price">￥' + data.actualPrice + '</div>\
            </div>\
            <div class="order_detail_num">x' + data.multiScale + '</div>\
            <div class="clear"></div>\
          </div>\
        </div>'
        );
        $(".l_evaluation_title").append(
          '<span class="l_evaluation_title1">全部评价('+data.feedbackCount+')</span>\
          <span class="l_evaluation_good">好评'+data.feedbackRate+'</span>'
        )
    }
  })
}
  //ajax异步通信，获取商品评价
    function getProductComment(){
      if (token != ""){
        var headers = {};
        headers["token"] = token;
        var url = path + "?m=comment&f=getProductComment&productId=" + productId;
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
              console.log(item);
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
              var display_mobile = item.userName.substr(0, 3) + "****" + item.userName.substr(7, 10);
              $(".l_evaluation_content").append(
                '<div class="l_evaluation_phone">\
                  <span class="l_evaluation_mobile">'+display_mobile+'</span>\
                  <span class="l_evaluation_timer">'+item.commentTime+'</span>\
                </div>\
                <div class="l_evaluation_grade">\
                  <div class="l_grade_title">商品评分</div>\
                  <div class="l_grade_star">'+score+'</div>\
                  <div class="l_grade_text">' + content + '</div>\
                  <div class="clear"></div>\
                </div>\
                <div class="l_text_title">商品评价</div>\
                  <div class="l_text_content">' + item.content + '</div>\
                  <div class="clear"></div>\
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
    getProductDetail();		//获取商品详情
    getProductComment();	//获取商品评价

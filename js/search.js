  var flag = false;
  var listFlag=true;
  var list;
  var AllName=[];

  if(localStorage.getItem("list")){
    var list=JSON.parse(localStorage.getItem("list"));
    AllName=list;
    console.log(AllName);
  }
  function getProductInfo(name){
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: path+"?m=product&f=getProductListByKeyword&keyWord="+ name,			//要访问的后台地址
      // data: data,			//要发送的数据
      success: function(result) {
        $(".search_list").html("");
        var data=result.data;
      	$.each(data, function(i, product) {
          flag = true;
          $(".search_list").append(
            '<div class="l_goods">'+
              '<div class="l_goods_img">'+
                '<img src="'+product.imageUrls[0]+'" alt="" />'+
              '</div>'+
              '<div class="l_goods_info">'+
                '<div class="l_goods_title">'+
                  '<span class="l_goods_name"> ' + product.productName + ' </span>'+
                  '<span class="l_goods_standard">规格 ' + product.scale + product.unit + '</span>'+
                '</div>'+
                '<div class="l_goods_price">￥' + product.actualPrice + '</div>'+
              '</div>'+
              '<div class="clear"></div>'+
            '</div>'
          );
          var html="";
          // console.log(AllName);
          if(jQuery.inArray(name, AllName)==-1){
            AllName.push(name);
          }
          localStorage.setItem("list",JSON.stringify(AllName));
          for(var i =0;i<AllName.length;i++){
            html+='<div class="l_search_history_list">' + AllName[i] + '</div>';
          }
          $(".l_search_history").html("");
          $(".l_search_history").append(html);
          console.log(AllName);
          var url="goods_detail.html?productId=" + data[0].productId;
          // 跳转到商品详情页
          $(".l_goods").click(function(){
            window.location=url;
          })
        })
        for(var i=0;i<AllName.length;i++){
          $($(".l_search_history_list")[i]).click(function(){
            listFlag=false;
            $(".search_list").hide();
            $(".l_search_history").hide();
            setTimeout(function(){
              $(".search_list").show();
            },500);
            var text=$(this).text();
            searchProduct(text);
          })
        }
        // 没有搜索到商品
        if (flag == false){
          setTimeout(function(){
            $("#l_search_no").show();
            $(".l_search_history").hide();
          },500);
          $("#search_input").click(function(){
            $(".l_search_history").hide();
          });
        }
      }
    })
  }
  function searchProduct(name){
    if(listFlag==false){
      $(".l_search").fadeIn(100);
      $("#l_search_text").fadeIn(100);
      // console.log($(".l_search_html"))
      setTimeout(function(){
        $("#l_search_text").fadeOut(500);
        $(".l_search").fadeOut(500);
      },500);
    }
    listFlag=true;
    $("#l_search_no").hide();
    flag = false;
    //获取商品信息
    getProductInfo(name);
  }
$(function(){
  var html="";
  for(var i =0;i<AllName.length;i++){
    html+='<div class="l_search_history_list">' + AllName[i] + '</div>';
  }
  // $(".l_search_history").html("");
  $(".l_search_history").append(html);
  $(".l_search_history_list").css({display:"inline-block"});
  console.log(AllName);
  for(var i=0;i<AllName.length;i++){
    $($(".l_search_history_list")[i]).click(function(){
      listFlag=false;
      $(".search_list").hide();
      $(".l_search_history").hide();
      setTimeout(function(){
        $(".search_list").show();
      },500);
      var text=$(this).text();
      searchProduct(text);
    })
  }
  $("#search_input").click(function(){
    $(".l_search_history").show();
    $(".l_search_history_list").show().css({display:"inline-block"});
  });
// 清空搜索
  $("#l_clear").click(function(){$(".search_list").html("");$(".l_search_history").html("");});
  // 点击搜索
  $("#search_btn").click(function(){
    $(".search_list").hide();
    $(".l_search_history").hide();
    var name = $("#search_input").val();
    setTimeout(function(){
      $(".search_list").show();
    },500);
    // 判断搜索框是否有关键字
    if ((name == "") || (name == "搜索商品")){
      $(".l_search").fadeIn(100);
      $("#l_search_html").fadeIn(100);
      console.log($(".l_search_html"))
      setTimeout(function(){
        $("#l_search_html").fadeOut(300);
        $(".l_search").fadeOut(300);
      },500);
    }else{
      $("#l_search_text").fadeIn(100);
      $(".l_search").show();
      setTimeout(function(){
        $("#l_search_text").fadeOut(100);
        $(".l_search").hide();
      },500);
      $("#search_input").click(function(){
        $(".l_search_history").show();
        $(".l_search_history_list").show().css({display:"inline-block"});
      });
      searchProduct(name);
    }
  });
})

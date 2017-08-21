pushHistory();
window.addEventListener("popstate", function(e) {
  // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
}, false);
function pushHistory() {
  var state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}
window.localStorage.removeItem("location");
$(function(){
  new FastClick(document.body);
  if(localStorage.getItem("coupon")){
    localStorage.removeItem("coupon");
  }
})
var cart= JSON.parse(window.localStorage.getItem('cart'));
var token=window.localStorage.token;
var gooscart = new Array();
var allprice = 0;
var noTotal = 0;
// console.log(cart);
//改变数组的值
function changecart(id,type,num){
  //本地缓存（数量改变大于0）（数量改变小于0的情况）
  //获取要变数据的数量和价格
  var nums = $("#num_"+id).html();
  var price = $("#goods_price_"+id).attr("price").toString();
  // console.log(price);
  price = price.substring(0);
  // console.log(price);
  if(type){
    //点击加的情况只需改变数量总价和本地缓存
    nums = nums*1 + num*1;
    //显示数量
    $("#num_"+id).html(nums);
    //全部价格和数量  changeNums()
    allprice = allprice*1 + price*1;
    noTotal = noTotal*1 + num*1;
    //改变全部价格和数量
    changeNums();
    // console.log(allprice);
    //改变缓存数据
    deletecart(id,1,1);
  }else{
    //数量为减则会有两种情况
    var newnum = nums*1 - num*1;
    if(newnum>0){
      allprice = allprice*1 - price*1;
      noTotal = noTotal*1 - num*1;
    }
    //数量为0删除页面数据和本地缓存
    if(newnum <= 0){
      newnum = 1;
      $(".alert_common").fadeIn(200).html("请点击编辑");
      $(".alert_bg").fadeIn(200);
      setTimeout(function(){
        $(".alert_common").fadeOut(200);
        $(".alert_bg").fadeOut(200);
        return false;
      },2000);
      // $("#goods_"+id).remove();
      // deletecart(id,0,1);
      // window.location.reload();
    }else{
      //数量大于0显示改变数量和修改本地缓存
      $("#num_"+id).html(newnum);
      deletecart(id,1,-1);
    }
  }
}
// console.log(allprice);
 //改变总价和总数量
function changeNums(){
  // console.log($('#selected_priceSum').html());
  // console.log(allprice);
  $('#selected_priceSum').html(Number(allprice.toFixed(2)));
  $('#trolley_NoTotal').html(noTotal);
  if(noTotal>0){
    $('#banner_trolley_No').css({display:"block"}).html(noTotal);
  }else{
    $('#banner_trolley_No').css({display:"none"})
  }
}
//删除修改缓存数据
function deletecart(id,change,nums){
  for(var i in cart){
    //判断修改id相同
    if(id == cart[i].id){
        if(change){
          //缓存数据改变
           cart[i].price = cart[i].price *1 + cart[i].productActualPrice*nums;
           cart[i].num = cart[i].num*1 + nums*1;
           window.localStorage.setItem("cart",JSON.stringify(cart));
        }else{
          //缓存数据删除
          var price = cart[i].num * cart[i].productActualPrice;
          var num = cart[i].num;
          allprice = allprice*1 - price*1;
          noTotal = noTotal*1 - num*1;
          cart.splice(i,1);
          gooscart = cart;
          // console.log(gooscart);
          //兼容修改删除
          if(nums){
            window.localStorage.setItem("cart",JSON.stringify(cart));
          }
        }
    }
  }
  changeNums();
}
$(function(){
  function getCateDish(){
    var a = '';
    var flag=false;
    var hasLimitRule;
    var ruleName;
    if(cart){
      for(var i in cart){
        if(cart[i].hasLimitRule=="1"){
          hasLimitRule="限";
        }else{
          hasLimitRule="";
        }
        // console.log(cart[i]);
        if(cart[i].productRuleName=='undefined'){
          ruleName="";
        }else{
          ruleName=cart[i].productRuleName;
        }
        noTotal = noTotal*1 + cart[i].num*1;
        a+=getHtml(cart[i]);
        allprice += cart[i].num * cart[i].productActualPrice;
      }
    }
    $("#main").html(a);
    var numLen=$(".num").length;
    changeNums();
    $(".hasLimitRule:contains('限')").addClass("rule_color");
		$(".rule_name:contains('折')").addClass("rule_border");
		$(".rule_name:contains('赠')").addClass("rule_border");
		$(".rule_name:contains('减')").addClass("rule_border");

  };
  getCateDish();
function getHtml(item){
  var hasLimitRule;
  var ruleName;
  var html;
  if(item.hasLimitRule=="1"){
    hasLimitRule="限";
  }else{
    hasLimitRule="";
  }
  // console.log(item.productRuleName);
  if(item.productRuleName=='undefined'){
    ruleName="";
  }else{
    ruleName=item.productRuleName;
  }
  if(Number(item.productActualPrice)!=Number(item.productPrice)){
    html= '<div class="goods" id="goods_'+item.id+'">\
            <img class="fruit_img1" src="'+item.productImage+'">\
            <span class="trolley_goods_del hide" id="'+item.id+'">删除</span>\
            <ul class="fruit_info fruit_info1">\
              <a class="fruit_title">\
                <span class="rule_name" id="rule_'+item.productId+'" data="'+item.productRuleName+'">'+ruleName+'</span>\
                <span class="fruit_name">'+item.productName+'</span>\
              </a>\
              <li class="fruit_price">\
                <span class="hasLimitRule" id="has_'+item.productId+'">'+hasLimitRule+'</span>\
                <span class="fruit_standard fruit_standard1" id="unit_'+item.productId+'" data="'+item.unit+'" >规格 '+item.productScale+item.productUnit+'</span>\
                <span style="display:none" id="rule_'+item.productId+'" data="'+item.ruleName+'"></span>\
                <span class="goods_price" id="goods_price_'+item.productId+'" price="'+item.productActualPrice+'">￥'+item.productActualPrice+'<del style="color:#999;font-size:12px">￥'+item.productPrice+'</del></span>\
                <div class="add_icons add_icons_toggle">\
                  <img  class="minus" src="images/minus1.png" onclick="changecart('+item.id+',0,1)">\
                  <span class="num" id="num_'+item.id+'">' + item.num +'</span>\
                  <img class="add" src="images/add.png" onclick="changecart('+item.id+',1,1)">\
                </div>\
              </li>\
            </ul>\
          </div>';
  }else{
    html= '<div class="goods" id="goods_'+item.id+'">\
            <img class="fruit_img1" src="'+item.productImage+'">\
            <span class="trolley_goods_del hide" id="'+item.id+'">删除</span>\
            <ul class="fruit_info fruit_info1">\
              <a class="fruit_title">\
                <span class="rule_name" id="rule_'+item.productId+'" data="'+item.productRuleName+'">'+ruleName+'</span>\
                <span class="fruit_name">'+item.productName+'</span>\
              </a>\
              <li class="fruit_price">\
                <span class="hasLimitRule" id="has_'+item.productId+'">'+hasLimitRule+'</span>\
                <span class="fruit_standard fruit_standard1" id="unit_'+item.productId+'" data="'+item.unit+'" >规格 '+item.productScale+item.productUnit+'</span>\
                <span style="display:none" id="rule_'+item.productId+'" data="'+item.ruleName+'"></span>\
                <span class="goods_price" id="goods_price_'+item.productId+'" price="'+item.productActualPrice+'">￥'+item.productActualPrice+'</span>\
                <div class="add_icons add_icons_toggle">\
                  <img  class="minus" src="images/minus1.png" onclick="changecart('+item.id+',0,1)">\
                  <span class="num" id="num_'+item.id+'">' + item.num +'</span>\
                  <img class="add" src="images/add.png" onclick="changecart('+item.id+',1,1)">\
                </div>\
              </li>\
            </ul>\
          </div>';
  }
        return html;
}
  $(".trolley_goods_del").click(function(){
    var id = $(this).attr("id");
    $(this).parent().remove();
    if($("#main").html()==""){
      cart=[];
      window.localStorage.setItem("cart",cart);
      $("#trolley_NoTotal").html(0);
      $("#banner_trolley_No").css({display:"none"});
      $("#banner_trolley_No").html("");
      $("#selected_priceSum").html(0);
    }
    deletecart(id,0,0);
  })
  $("#trolley_selected_total").click(function(){
    var totalnum=$("#trolley_NoTotal").text();
    // console.log(totalnum);
    if(token&&totalnum!=0){
      var array=[];
      for(var i=0;i<cart.length;i++){
        var dic={"productId":String(cart[i].productId),"count":String(cart[i].num)};
        array.push(dic);
        console.log(array);
      }
      var data=JSON.stringify({"data":array});
      if (token&&token != ""){
        var headers = {};
        headers["token"] = token;
        var url = path+ "?m=order&f=parseOrder";
        // console.log(data);
        $.ajax({
          type: "post",		//使用post方法访问后台
          dataType: "json",	//返回json格式的数据
          url: url,			//要访问的后台地址
          data: data,			//要发送的数据
          headers: headers,	//要发送的header数据
          success: function(result) {
            console.log(result);
            if(result.code=="200"){
              var json=result.data;
              var item=json.items;
              console.log(json);
              var amount=json.actualAmount;
              localStorage.setItem("amount",amount);
              var items=[];
              for(var i=0;i<item.length;i++){
                var dic={"actualPrice":item[i].actualPrice,"count":item[i].count,"presentCount":item[i].presentCount,"price":item[i].price,"productId":item[i].productId,"ruleId":item[i].ruleId,"ruleType":item[i].ruleType};
                items.push(dic);
              }
              localStorage.setItem("items", JSON.stringify(items));
              window.location="pay.html";
            }else{
              $(".alert_common").fadeIn(200).html("登录已过期，请重新登录");
              $(".alert_bg").fadeIn(200);
              setTimeout(function(){
        				$(".alert_common").fadeOut(200);
        				$(".alert_bg").fadeOut(200);
                window.location="login.html";
        			},2000);
            }
          },
          error:function(){
            console.log(1);
          }
        })
      }
    }else if(token&&totalnum==0){
      $(".alert_common").fadeIn(200);
      $(".alert_bg").fadeIn(200);
      setTimeout(function(){
				$(".alert_common").fadeOut(200);
				$(".alert_bg").fadeOut(200);
        window.location="goods.html";
			},2000);
      return false;
    }else if(!token&&totalnum>0){
      $(".alert_common").fadeIn(200).html("请您先登录");
      $(".alert_bg").fadeIn(200);
      setTimeout(function(){
				$(".alert_common").fadeOut(200);
				$(".alert_bg").fadeOut(200);
        window.location="login.html";
			},2000);
      return false;
    }else if(!token&&totalnum==0){
      $(".alert_common").fadeIn(200);
      $(".alert_bg").fadeIn(200);
      setTimeout(function(){
				$(".alert_common").fadeOut(200);
				$(".alert_bg").fadeOut(200);
        window.location="goods.html";
			},2000);
      return false;
    }
  })
  $("#trolley_selected_total_clear").click(function(){
			$("#main").html("");		//清空购物车
      cart=[];
      window.localStorage.setItem("cart",cart);
      $("#trolley_NoTotal").html(0);
      $("#banner_trolley_No").css({display:"none"});
      $("#banner_trolley_No").html("");
      $("#selected_priceSum").html(0);
		});
// 编辑
  $("#edit").click(function(){
			$(this).addClass("hide");
      $(".add_icons_toggle").hide();
			$("#editFinish").removeClass("hide");
			$(".trolley_goods_del").removeClass("hide");
			$(".add_icons_toggle").removeClass("add_icons").addClass("add_icons_new");
			$("#trolley_selected_total").hide();
			$("#trolley_selected_total_clear").show();
			$("#trolley_total").hide();
			$("#trolley_selected_price").hide();
      gooscart = cart;
      // console.log($("#trolley_selected_price").html());
      window.localStorage.setItem("cart",JSON.stringify(gooscart));
		});
    // 编辑完成
		$("#editFinish").click(function(){
			$(this).addClass("hide");
      $(".add_icons_toggle").show();
			$("#edit").removeClass("hide");
			$(".add_icons_toggle").removeClass("add_icons_new").addClass("add_icons");
			$(".trolley_goods_del").addClass("hide");
			$("#trolley_selected_total_clear").hide();
			$("#trolley_selected_total").show();
			$("#trolley_total").show();
			$("#trolley_selected_price").show();
      gooscart = cart;
      window.localStorage.setItem("cart",JSON.stringify(gooscart));
      // console.log(gooscart);
      if(gooscart.length==0){
        $("#selected_priceSum").html("0");
        $("#trolley_NoTotal").html("0");
        $("#banner_trolley_No").html("0").css({display:"none"});
      }
      // window.location.reload();
		});
})

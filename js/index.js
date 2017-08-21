pushHistory();
window.addEventListener("popstate", function(e) {
  // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
  WeixinJSBridge.call('closeWindow');
  // alert("aaaa");
}, false);
function pushHistory() {
  var state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}
window.localStorage.removeItem("location");
window.localStorage.setItem("indexEnter","ture");
$(function(){
  new FastClick(document.body);
  var form;
  if(localStorage.from){
    form=localStorage.getItem(from);
    form=false;
    localStorage.setItem("form",form);
  }else{
    localStorage.setItem("form","false");
  }
  // var path="http://123.57.33.202/freshmart-dev/api/index.php";
  var path="http://api.suyousc.com/index.php";
  var token=window.localStorage.token;
  if(window.localStorage.getItem('cart')){
  	var local=window.localStorage.getItem('cart');
  	local=JSON.parse(local);
    console.log(local);
  }
  //消息数量
  var messages;

  // banner图
$.ajax({
  type: "get",		//使用get方法访问后台
	dataType: "json",	//返回json格式的数据
   crossDomain: true,
	url: path+"?m=advertisement&f=getAdvertisementList",			//要访问的后台地址
	// data: data,			//要发送的数据
	success: function(result) {
    var data=result.data;
    // console.log(result);
    // 轮播图
		for(var i = 0; i < 1; i++){
      for(var j = 0;j <data[i].length;j++){
        // console.log(data[i].length);
          var imageUrl = data[i][j].imagesUrls[0];
          var url="goods_detail.html?productId=" + data[i][j].productId;
          var dataUrl=data[i][j].url;
          var img="images/syggw_top.png";
          // console.log(imageUrl);
          $("#ad1 ul").append(
						'<li><a><img src="' + imageUrl + '"></a></li>'
					);
          if(data[i][j].url){
            $($("#ad1 a")[j]).attr("href",dataUrl);
          }else if(data[i][j].productId){
            $($("#ad1 a")[j]).attr("href",url);
          }else{
            $($("#ad1 a")[j]).attr("href","#");
          }
          if(imageUrl){
            $($("#ad1 img")[j]).attr("src",imageUrl);
          }else{
            $($("#ad1 img")[j]).attr("src",img);
          }
      }
      TouchSlide({
        slideCell:"#i_banner",
        titCell:"#circle ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell:"#ad1 ul",
        effect:"leftLoop",
        autoPlay:true,//自动播放
        autoPage:true //自动分页
      });
      $("#circle ul li").html("");
		}
    // 广告位
    for(var i = 1; i < 2; i++){
      for(var j = 0;j <data[i].length;j++){
          // console.log(data[i][j]);
          var imageUrl = data[i][j].imagesUrls[0];
          var url="goods_detail.html?productId=" + data[i][j].productId;
          var dataUrl=data[i][j].url;
          var img="images/iconer2.png";
          $("#ad2 ul").append(
            '<li><a><img src="' + imageUrl + '"></a></li>'
          );
          if(data[i][j].url){
            $($("#ad2 a")[j]).attr("href",dataUrl);
          }else if(data[i][j].productId){
            $($("#ad2 a")[j]).attr("href",url);
          }else{
            $($("#ad2 a")[j]).attr("href","#");
          }
          if(imageUrl){
            $($("#ad2 img")[j]).attr("src",imageUrl);
          }else{
            $($("#ad2 img")[j]).attr("src",img);
          }
      }
      TouchSlide({
        slideCell:"#i_banner1",
        titCell:"#circle1 ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        mainCell:"#ad2 ul",
        effect:"leftLoop",
        autoPlay:true,//自动播放
        autoPage:true //自动分页
      });
      $("#circle1 ul li").html("");
		}
    // 活动专区
    for(var i = 2; i < data.length; i++){
      var ad1_image_num = 0;
      for(var j = 0;j <data[i].length;j++){
        // console.log(data[i][j].productId);
        ad1_image_num++;
        var imageUrl = data[i][j].imagesUrls[0];
        var dataUrl=data[i][j].url;
        var img="images/ad_bottom.png";
        var url="goods_detail.html?productId=" + data[i][j].productId;
        $("#l_blocks").append(
					'<a class="l_block" href="'+ url +'"><img src="' + imageUrl + '" /></a>'
				);
        if(data[i][j].url){
          $($("#l_blocks a")[j]).attr("href",dataUrl);
        }else if(data[i][j].productId){
          $($("#l_blocks a")[j]).attr("href",url);
        }else{
          $($("#l_blocks a")[j]).attr("href","#");
        }
        if(imageUrl){
          $($("#l_blocks img")[j]).attr("src",imageUrl);
        }else{
          $($("#l_blocks img")[j]).attr("src",img);
        }
      }
      $("#l_blocks").append(
        '<div class="clear"></div>'
      );
		}
	}
})
  // 商品分类图
    $.ajax({
      type: "get",		//使用get方法访问后台
  		dataType: "json",	//返回json格式的数据
  		url: path+"?m=productCategory&f=getProductCategoryList&all=1",			//要访问的后台地址
  		// data: data,			//要发送的数据
  		success: function(result) {
        var data=result.data;
        // console.log(result);
        for(var i = 0; i < data.length; i++){
          var imageUrl=data[i].imageUrls;
          var name=data[i].name;
          // console.log(data[i].categoryId);
          var url="goods.html?categoryId=" + data[i].categoryId;
          $("#items").append(
            '<a href="'+url+'" class="item" id="'+data[i].categoryId+'"><img src="'+ imageUrl+'" /><span>'+name+'</span></a>'
          );

        }
        $(".item").click(function(){
          console.log($(this).attr("id"));
          var itemName=$(this).attr("id");
          localStorage.setItem("itemName",itemName);
        })
  		}
    })
  // 热门商品
  $.ajax({
    type: "get",		//使用get方法访问后台
    dataType: "json",	//返回json格式的数据
    url: path+"?m=product&f=getHotProductList",			//要访问的后台地址
    // data: data,			//要发送的数据
    success: function(result) {
      var data=result.data;
      var strData = '';
      console.log(data);
      for(var i = 0; i<data.length; i++){
        strData += 	getItemHtml(data[i]);
      }
      $("#l_hots").html(strData);
      $("#l_hots").append(
        '<div class="clear"></div>'
      )
    }
  })

  //ajax异步通信，获取消息列表
  function getMessageList(){
  	if (token != ""){
  		var headers = {};
  		headers["token"] = token;
  		var url = path + "?m=message&f=getMessageList";
  		$.ajax({
  			type: "get",		//使用get方法访问后台
  			dataType: "json",	//返回json格式的数据
  			url: url,			//要访问的后台地址
        crossDomain: true,
  			data: "",			//要发送的数据
  			headers:headers,
  			success: function(result) {
          // console.log(result);
  				var json = result.data;
  				var num = json.length;
  				if (num != 0){
            // if(messages=="false"){
            //   $("#message_num").show();
            //   $("#message_num").text(num);
            //   messages=num;
            //   localStorage.setItem("messages",messages);
            // }
            if(window.localStorage.getItem("messages")){
              messages=localStorage.getItem("messages");
              // console.log(Number(num)-Number(messages));
              if(Number(messages)<Number(num)){
                  $("#message_num").show();
                  $("#message_num").text(Number(num)-Number(messages));
                  // messages=num;
                  // localStorage.setItem("messages",messages);
              }else{
                  $("#message_num").hide();
              }
            }else{
              messages=num;
              localStorage.setItem("messages",messages);
            }
  				}
  			},
  			error: function (error) {
  		      console.log(error);
  		    }
  		});
  	}
  }
    getMessageList();
  // 页面跳转
  $(function(){
    // 搜索页
    $("#search").click(function(){
      window.location="search.html";
    })

  })
  // 加载动画
  $("#animation").fadeOut(300);
  // 滚动条变化 header变色
  var top;
	$("#l_main").scroll(function(){
		if($("#l_main").scrollTop() > 30){
      	clearTimeout(top);
      	top = setTimeout(function(){
        $("#top").css({background:"rgba(238,17,34,.7)"});
      	});
    }else{
      clearTimeout(top);
    $("#top").css({background:"none"});
    };
  });
  // $("#l_main").scroll(function(){
  //   if($("#l_main").scrollTop()+168 >= $(window).height()){
  //     $("#l_main").on('touchmove', function (event) {
  //       console.log("sjkehf111111111");
  //       // event.preventDefault();
  //       setTimeout(function(){
  //         console.log("hnfciusoehf");
  //         console.log($("#l_main").height());
  //         $("#l_main").on('touchmove',function(event) { event.preventDefault(); }, false);
  //       },1000);
  //     });
  //   }
  // });
  if(window.localStorage.getItem("cart")){
    local=window.localStorage.getItem('cart');
    localnum=JSON.parse(local);
    // console.log(localnum);
    var num=0;
    $(function(){
      if(localnum){
        for(var i=0;i<localnum.length;i++){
          num+=localnum[i].num;
        }
        if(num>0){
          $("#banner_trolley_No").css({display:"block"}).html(num);
        }
      }
    })
  }
})
function hide(){
  $(".alert_common").fadeIn(200);
  $(".alert_bg").fadeIn(200);
  setTimeout(function(){
    $(".alert_common").fadeOut(200);
    $(".alert_bg").fadeOut(200);
  },2000);
}
  if(window.localStorage.getItem("cart")){
    local=window.localStorage.getItem('cart');
    localnum=JSON.parse(local);
    // console.log(localnum);
    var num=0;
    $(function(){
      if(localnum){
        for(var i=0;i<localnum.length;i++){
          num+=localnum[i].num;
        }
        if(num>0){
          $("#banner_trolley_No").css({display:"block"}).html(num);
        }
      }
    })
  }


// 热门商品列表
function getItemHtml(item) {
	var id = item.productId;
  var hasLimitRule;
  console.log(item);
	var url="goods_detail.html?productId=" + item.productId;
	var display = 'none';
	var count = 0;
  var imageUrl=item.imageUrls[0];
  var name=item.productName;
  var price=item.actualPrice;
  var html;
  // console.log(count);
  if (window.localStorage.getItem('cart')) {
    for(var i=0;i<localnum.length;i++){
      if(localnum[i].id==id){
     	  count = localnum[i].num;
        console.log(count);
      }
    }
  }
  if(item.status=="1"){
    if(item.price==item.actualPrice){
      html = '<div class="l_hot">\
        <a href="'+ url +'">\
          <img src="' + imageUrl + '"  / id="img_'+item.productId+'">\
        </a>\
        <div class="l_goods">\
          <div class="l_info">\
            <span class="l_goods_name" count="' + count + '" id="name_'+item.productId+'" datea="'+item.hasLimitRule+'" data="'+item.productName+'">'+name+'</span>\
            <span class="l_goods_price" id="goods_price_'+item.productId+'"  datea="'+item.ruleName+'" price="'+item.actualPrice+'">￥'+price+'</span>\
          </div>\
          <div class="shou">售罄</div>\
          <div class="clear"></div>\
        </div>\
      </div>';
    }else{
      html = '<div class="l_hot">\
        <a href="'+ url +'">\
          <img src="' + imageUrl + '"  / id="img_'+item.productId+'">\
        </a>\
        <div class="l_goods">\
          <div class="l_info">\
            <span class="l_goods_name" count="' + count + '"  id="name_'+item.productId+'" datea="'+item.hasLimitRule+'" data="'+item.productName+'">'+name+'</span>\
            <span class="l_goods_price" id="goods_price_'+item.productId+'"  datea="'+item.ruleName+'" price="'+item.actualPrice+'">￥'+price+'</span>\
            <del class="price" id="price_'+item.productId+'" style="font-size:12px;color:#a5a5a5;float:left">￥'+item.price+'</del>\
          </div>\
          <div class="shou">售罄</div>\
          <div class="clear"></div>\
        </div>\
      </div>';
    }
  }else{
    if(item.price==item.actualPrice){
      html = '<div class="l_hot">\
        <a href="'+ url +'">\
          <img src="' + imageUrl + '"  / id="img_'+item.productId+'">\
        </a>\
        <div class="l_goods">\
          <div class="l_info">\
            <span class="l_goods_name"  count="' + count + '" id="name_'+item.productId+'" datea="'+item.hasLimitRule+'" data="'+item.productName+'">'+name+'</span>\
            <span class="l_goods_price" id="goods_price_'+item.productId+'"  datea="'+item.ruleName+'" price="'+item.actualPrice+'" priced="'+item.price+'">￥'+price+'</span>\
          </div>\
          <img class="l_goods_icon" id="add_'+item.productId+'"   data="'+item.unit+'" onclick="ball(event);changeCart('+item.productId+',1,1,1,1,'+item.actualPrice+','+ item.price+','+item.scale+');" src="images/add.png" />\
        </div>\
      </div>';
    }else{
      html = '<div class="l_hot">\
        <a href="'+ url +'">\
          <img src="' + imageUrl + '"  / id="img_'+item.productId+'">\
        </a>\
        <div class="l_goods">\
          <div class="l_info">\
            <span class="l_goods_name" count="' + count + '" id="name_'+item.productId+'" datea="'+item.hasLimitRule+'" data="'+item.productName+'">'+name+'</span>\
            <span class="l_goods_price" id="goods_price_'+item.productId+'"  datea="'+item.ruleName+'" price="'+item.actualPrice+'" priced="'+item.price+'">￥'+price+'</span>\
            <del class="price" id="price_'+item.productId+'" style="font-size:12px;color:#a5a5a5;float:left">￥'+item.price+'</del>\
          </div>\
          <img class="l_goods_icon" id="add_'+item.productId+'"   data="'+item.unit+'" onclick="ball(event);changeCart('+item.productId+',1,1,1,1,'+item.actualPrice+','+ item.price+','+item.scale+');" src="images/add.png" />\
        </div>\
      </div>';
    }
  }


	return html;
}
var local;
var localnum=[];
//修改菜品价格数量
function changeCart(id,nums,add,change,type, productActualPrice, productPrice, productScale, productUnit){
  // 获取localstorage数据并展示购物车数量,如果购物车里没有商品 就重新在localstorage里存值
  if(window.localStorage.getItem("cart")){
    local=window.localStorage.getItem('cart');
    localnum=JSON.parse(local);
    console.log(localnum);
    var num=0;
    $(function(){
      if(localnum){
        for(var i=0;i<localnum.length;i++){
          num+=localnum[i].num;
        }
        if(num>0){
          $("#banner_trolley_No").css({display:"block"}).html(num);
        }
      }
    })
  }else{
    var cart={};
    window.localStorage.setItem("cart",cart);
    local=window.localStorage.getItem('cart');
    console.log(local);
  }
	//定义变量
	var num = "name_"+id;
  var priceid = "goods_price_"+id;
	var price = $("#"+priceid).attr("price");
  var count = $("#"+num).attr("count");
  //数量加减判断

  // if(add){
  	var newnum  = count*1 + nums*1;
  // }

  //判断显示隐藏
  if(newnum > 0){
  	var shownum = newnum;
  }else{
  	newnum = 0;
  	var shownum = '';
  }
  console.log(newnum);
  $("#"+num).attr("count",newnum);
  // $("#"+add).html(shownum);
  //记录数量
  if(change){
  	//定义总价
  	var prices = price*newnum;
  	disnmanage(id,newnum,prices,type, productActualPrice, productPrice, productScale, productUnit);
  }else{
  	changeNums();
  }
}
// 改变购物车
function disnmanage(id,nums,price,type, productActualPrice, productPrice, productScale, productUnit){
  var productImage = $("#img_"+id).attr("src");
	var productName = $("#name_"+id).attr("data");
	var productUnit = $("#add_"+id).attr("data");
	var productRuleName = $("#goods_price_"+id).attr("datea");
  var hasLimitRule = $("#name_"+id).attr("datea");
  var priced=$("#goods_price_"+id).attr("priced");
  // console.log(productRuleName,priced,hasLimitRule);
  var dish = {'id':id,'num':nums,'price':price,'productId':id,'productActualPrice':productPrice,'productActualPrice':productActualPrice,'productName':productName,'productScale':productScale,'productUnit':productUnit,'productImage':productImage,'productRuleName':productRuleName,'hasLimitRule':hasLimitRule,'productPrice':priced};
  console.log(dish);
  var isset = false;
  if(localnum){
    for(var i = 0;i < localnum.length;i++){
      if(localnum[i].id == id){
        isset = true;
        if(nums == 0){
          localnum.splice(i,1);
        }else{
          localnum[i].num = nums;
          localnum[i].price = price;
        }
      }
    }
    // console.log(localnum);
  }
	//不存在进行添加
	if(!isset){
		localnum.push(dish);
    // console.log(dish);
    console.log(localnum);
	}
	// console.dir(disharr);
	//本地数据加减
	window.localStorage.setItem('cart',  JSON.stringify(localnum));
	//数量改变
	changeNums();
}
//本地数据加减
function changeNums(){
	//进行数量统计
	var allnum = 0;
	for(var i = 0;i < localnum.length;i++){
		allnum = allnum*1 + localnum[i].num*1;
	}
	//改变数据
	$("#banner_trolley_No").css({display:"block"});
	$("#banner_trolley_No").html(allnum);
	if(allnum < 1){
		$("#banner_trolley_No").css({display:"none"});
		$("#banner_trolley_No").html("");
	}
}
// 添加商品到购物车动画
function ball(event){
  var e = event || window.event;
  var eleft = e.clientX-7+"px";
  var etop = e.clientY-7+"px";
  $("#ball").css({left:eleft,top:etop});
  $("#ball").fadeIn(100);
  setTimeout(function(){
    var width=$(document).width()*0.71+"px";
    var height=$(document).height()-55+"px";
    $("#ball").animate({left:width,top:height},100)
  },100);
  setTimeout(function(){
    $("#ball").fadeOut(100);
  },100);
};

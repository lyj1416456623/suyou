$(function(){
 new FastClick(document.body);
 $("#l_shopcar").click(function(){window.location="trolley.html"});
 changeNums();
})

var path="http://api.suyousc.com/index.php";
var productId=(location.search).replace(/[^0-9]/ig, "");
// 获取localStorage的值
var local = window.localStorage.getItem('cart');
var localnum=JSON.parse(local);
var disharr = new Array();//定义数组
var index=1;
var scale;
if(local){
	local= JSON.parse(window.localStorage.getItem('cart'));
	disharr = local;
}
 function getGoods(productId){
 $.ajax({
   type: "get",		//使用get方法访问后台
   dataType: "json",	//返回json格式的数据
   url: path+"?m=product&f=getProductDetail&productId="+productId,			//要访问的后台地址
   // data: data,			//要发送的数据
   success: function(result) {
     var data=result.data;
		 getHtml(data);
		//  $(".l_goods_items_sel:contains('"+scale+"')").css({border:"1px solid #fdc121"});
    //  console.log($(".l_goods_items_sel:last").attr("id"));
    //  console.log(data.scales.length);
     for(var i=0;i<data.scales.length;i++){
       if($($(".l_goods_items_sel")[i]).attr("id").replace(/[^0-9]/ig, "")==data.productId){
         $($(".l_goods_items_sel")[i]).css({border:"1px solid #fdc121"});
       }
     }
   }
 });
 }
 function getDish(){
	 getGoods(productId);
 }
 getDish();

function getHtml(data){
	console.log(data);
	var id = data.productId;
	var count = 0;
	var display = "none";
  var img="images/addtocart.png";
	scale=data.scale+data.unit;
	var url="evaluation.html?productId=" + data.productId;//评论页面路径
  // console.log(local[0].hasOwnProperty(id));
	if (window.localStorage.getItem("cart")) {
    for(var i=0;i<local.length;i++){
      if(local[i].id==id){
        display = "inline-block";
     	  count = local[i].num;
        img="images/add_q.png";
      }
    }
  }
 var hasLimitRule;
 var ruleName;
 if(data.limitRule.length==1){
	 hasLimitRule="1";
 }else{
	 hasLimitRule="0";
 }
 // console.log(item.productRuleName);
 if(data.ruleName=="undefined"){
	 ruleName="";
 }else{
	 ruleName=data.ruleName;
 }
 // console.log(ruleName);
		//  商品内容
		$("#main").append(
			'<div id="i_banner">\
        <div class="i_banner_img" id="ad1" style="height:375px">\
          <ul id="img_'+data.productId+'">\
          </ul>\
        </div>\
        <div class="i_icon" id="circle">\
          <ul></ul>\
        </div>\
      </div>\
			<div class="l_goods_description" id="name_'+data.productId+'" data="'+data.productName+'">'+data.productName+'</div>\
			<div class="l_goods_items">\
				<span class="l_goods_items_name l_good_limt">规格</span>\
				<div class="l_limt l_goods_scales">\
				</div>\
				<div class="clear"></div>\
			</div>\
			<div class="l_goods_items" id="l_goods_sell">\
				<span class="l_goods_items_name">促销</span>\
				<span class="l_goods_items_sell"></span>\
			</div>\
			<div class="l_goods_items" id="limt">\
				<span class="l_goods_items_name l_good_limt" id="has_'+data.productId+'" data="'+hasLimitRule+'">限购</span>\
				<div class="l_limt">\
					<div class="l_limt_item" id="l_limt_name">【限购名称（xxxxx)】</div>\
					<div class="l_limt_item" id="l_limt_num">【限购名称（xxxxx)】</div>\
					<div class="l_limt_item" id="l_limt_time">【限购名称（xxxxx)】</div>\
				</div>\
				<div class="clear"></div>\
			</div>\
			<div class="l_goods_items" id="rule_'+data.productId+'" data="'+ruleName+'">\
				<span class="l_goods_items_name">价格</span>\
				<span class="l_goods_items_price" id="goods_price_'+data.productId+'" price="'+data.actualPrice+'" priced="'+data.price+'">'+"￥"+data.actualPrice+'</span>\
				<span class="l_goods_items_click">\
					<img class="l_goods_minus" style="display:' + display + ';" id="minus_'+data.productId+'" src="images/minus1_q.png" onclick="changeCart('+data.productId+',1,0,1,1,'+data.actualPrice+','+ data.price+','+data.scale+')">\
				<span class="l_goods_add_num" id="num_'+data.productId+'" count="' + count + '">'+count+'</span>\
					<img class="l_goods_add" id="add_'+data.productId+'" src="'+img+'" onclick="ball(event);changeCart('+data.productId+',1,1,1,1,'+data.actualPrice+','+ data.price+','+data.scale+')">\
				</span>\
			</div>\
			<div class="l_goods_items">\
				<span class="l_goods_items_name">已售</span>\
				<span class="l_goods_items_num" id="l_goods_items_num">'+data.volume+'</span>\
				<a href="'+url+'" class="l_goods_sale">\
					<span id="l_goods_support">'+"好评率"+data.feedbackRate+'</span>\
					<span id="l_goods_eval">'+data.feedbackCount+'人评价</span>\
					<span class="l_more_arrow"><img src="images/arrow.png"></span>\
				</a>\
			</div>'
		);
		if(data.status=="1"){
			$(".l_goods_items_click").html("售罄").css({marginRight:"5%"});
		}
		//判断有几个图片以及图片地址
		 if(data.imageUrls.length>0){
			 for(var i=0;i<data.imageUrls.length;i++){
				 if(data.imageUrls[i]==undefined){
					 data.imageUrls[i]="images/icon_large_fail.png";
				 }
			 }
		 }else{
			 data.imageUrls[0]="images/icon_large_fail.png";
		 }
		 // 轮播图

		 for(var i = 0; i < data.imageUrls.length; i++){
				 var imageUrl = data.imageUrls[i];
				$("#ad1 ul").append(
					'<li><a><img src="' + imageUrl + '" style="width:100%;height:375px"></a></li>'
				);
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
		if(data.scales.length>1){
			for(var i=0;i<data.scales.length;i++){
				$(".l_goods_scales").append(
					'<span class="l_goods_items_sel" id="unit_'+data.scales[i].productId+'" data="'+data.unit+'">'+data.scales[i].scale+data.scales[i].unit+'</span>'
				)
			}
		}else{
			$(".l_goods_scales").append(
				'<span class="l_goods_items_sel" id="unit_'+data.productId+'" data="'+data.unit+'">'+data.scale+data.unit+'</span>'
			)
		}
		index=$(".l_goods_items_sel").length;
		// console.log(index);
		for(var i=0;i<index;i++){
		 $($(".l_goods_items_sel")[i]).click(function(){
			 $(this).addClass("l_goods_color");
			 $("#main").html("");
			 productId=$(this).attr("id").replace(/[^0-9]/ig, "");
			 getDish();
		 })
	 }
		 if(data.ruleName){
			 $(".l_goods_items_sell").html(data.ruleName);
		 }else{
			 $("#l_goods_sell").css({display:"none"});
		 }
		 if(data.limitRule.length>0){
			 $("#limt").css({display:"block"});
			 $("#l_limt_name").html("【"+data.limitRule[0].ruleName+"】");
			 $("#l_limt_num").html("活动期间每个账户限购"+data.limitRule[0].limitTime+"单，共可购买"+data.limitRule[0].limitNumber+"件");
			 $("#l_limt_time").html("活动时间为"+data.limitRule[0].startTime+"到"+data.limitRule[0].endTime);
		 }else{
			 $("#limt").css({display:"none"});
		 }
		//  大图
		 if(data.largeImageUrls.length>0){
			 $("#main").append(
				 '<div class="l_goods_items" style="padding:0">'+
						'<img src="' + data.largeImageUrls[0]+ '" style="width:111%">'+
				 '</div>'
			 )
		 }
}
//修改菜品价格数量
function changeCart(id,nums,add,change,type,productActualPrice,productPrice,productScale,productUnit){
	//定义变量
	var num = "num_"+id;
	var priceid = "goods_price_"+id;
	var price = $("#"+priceid).attr("price");
  var count = $("#"+num).attr("count");
  console.log(count);
  var cut = "minus_"+id;
  var adda="add_"+id;
  //数量加减判断
  if(add){
  	var newnum = count*1 + nums*1;
  }else{
  	var newnum = count*1 - nums*1;
  }
  //判断显示隐藏
  if(newnum > 0){
  	var shownum = newnum;
  	$("#"+cut).css("display","inline-block");
    $("#"+adda).attr("src","images/add_q.png");
  }else{
  	newnum = 0;
  	var shownum = "";
  	$("#"+cut).css("display","none");
    $("#"+adda).attr("src","images/addtocart.png");
  }
  $("#"+num).attr("count",newnum);
  $("#"+num).html(shownum);

  //记录数量
  if(change){
  	//定义总价
  	var prices = price*newnum;
  	disnmanage(id,newnum,prices,type,productActualPrice,productPrice,productScale,productUnit);
  }else{
  	changeNums();
  }
}
//购物车修改
var cart = {};
//点击数量加减处理菜品数组
function disnmanage(id,nums,price,type,productActualPrice,productPrice,productScale,productUnit){
	//获取数据
	var productImage = $("#img_"+id).find("li:eq(1)").find("img").attr("src");
  console.log($("#img_"+id).find("li:eq(1)").find("img").attr("src"));
	var productName = $("#name_"+id).attr("data");
	var productUnit = $("#unit_"+id).attr("data");
	var productRuleName = $("#rule_"+id).attr("data");
	var hasLimitRule = $("#has_"+id).attr("data");
	var priced=$("#goods_price_"+id).attr("priced");
	var ActualPrice=$("#goods_price_"+id).attr("price");
	console.log(hasLimitRule,priced);
	//组装数据
	var dish = {'id':id,'num':nums,'price':price,'productId':id,'productActualPrice':ActualPrice,'productActualPrice':productActualPrice,'productName':productName,'productScale':productScale,'productUnit':productUnit,'productImage':productImage,'productRuleName':productRuleName,'hasLimitRule':hasLimitRule,'productPrice':priced};
  console.log(dish);
	//循环已有数据进行修改和删除
	var isset = false;
  console.dir(disharr);
	for(var i = 0;i < disharr.length;i++){
		if(disharr[i].id == id){
			isset = true;
			if(nums == 0){
				disharr.splice(i,1);
			}else{
				disharr[i].num = nums;
				disharr[i].price = price;
			}
		}
	}
	//不存在进行添加
	if(!isset){
		disharr.push(dish);
	}
	console.dir(disharr);
	//本地数据加减
	window.localStorage.setItem("cart",  JSON.stringify(disharr));

	//数量改变
	changeNums();
}
//本地数据加减
function changeNums(){
	//进行数量统计
	var allnum = 0;
	for(var i = 0;i < disharr.length;i++){
		allnum = allnum*1 + disharr[i].num*1;
	}
  console.log(allnum);
	//改变数据
	$(".banner_trolley_No").css({display:"block"});
	$(".banner_trolley_No").html(allnum);
	if(allnum < 1){
		$(".banner_trolley_No").css({display:"none"});
		$(".banner_trolley_No").html("");
	}
}

//小球动画
function ball(event){
  var e = event || window.event;
  var eleft = e.clientX-7+"px";
  var etop = e.clientY-7+"px";
  $("#ball").css({left:eleft,top:etop});
  $("#ball").fadeIn(100);
  setTimeout(function(){
    var width=$(document).width()*0.94+"px";
    $("#ball").animate({left:width,top:"20px"},100)
  },100);
  setTimeout(function(){
    $("#ball").fadeOut(100);
  },100);
};

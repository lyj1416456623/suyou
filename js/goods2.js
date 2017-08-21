//点击左侧分类显示对应的菜品
var aData = new Array();//定义菜品数据
// var chooseid=18; //用于判断是否选择分类
var disharr = new Array();//定义已点菜品数组
//左边导航栏ajax通信
var token=window.localStorage.token;
var categoryId=(location.search).replace(/[^0-9]/ig, "");
// var trunBack=true;
// localStorage.setItem("turnBack",trunBack);
localStorage.setItem("categoryId",categoryId);
if(localStorage.getItem("categoryId")){
	categoryId=localStorage.getItem("categoryId");
}
var chooseid=categoryId; //用于判断是否选择分类
// console.log(categoryId);
var url = path + "?m=productCategory&f=getProductCategoryList&all=1&categoryId="+categoryId;
// 获取localStorage的值
var local=window.localStorage.getItem("cart");
var dataArray = [];
var itemName;//左边分类名字
// localStorage里存的商品信息
if(window.localStorage.getItem('cart')){
	var local=window.localStorage.getItem('cart');
	local=JSON.parse(local);
	disharr=local;
}
//对应商品左边分类样式
if(window.localStorage.getItem('itemName')){
	itemName=window.localStorage.getItem('itemName');
}
itemName=categoryId;
// console.log(itemName);
// console.log(local)
//定义空闲全局变量
var isuse = true;
//修改菜品
function getCateDish(cateid){
	var strData = '';
	var strDish = '';
	for(var i = 0; i < aData.length; i++){
		var arrData = aData[i].data;
		console.log(arrData);
		// console.log(cateid);
		//传入cateid,若cateid不对应跳出循环
		if(cateid && (aData[i].categoryId != cateid)){
			chooseid = cateid;
			categoryId=cateid;
			itemName=cateid;
			// console.log(itemName);
			localStorage.setItem("categoryId",categoryId);
			localStorage.setItem("itemName",itemName);
			// console.log(categoryId);
			continue;
		}
		for(var j = 0; j < arrData.length; j++){
			//插入全部菜品
			// console.log(arrData[j].hasLimitRule);
			strData += 	getItemHtml(arrData[j]);
			$("#goods").html(strData);//这里在循环赋值
			if(arrData[j].count=="0"){
				$(".add_icons_toggle").html("售罄");
			}
			if(arrData[j].ruleName!=undefined){
				$(".rule_name").css({display:"block"});
			}
		}
		if($(".actualPrice").attr("price")==$(".actualPrice").attr("priced")){
			$(".price").css({display:"none"});
		}
		// if($(".fruit_price").attr("data")==0){
		// 	$(".add_icons_toggle").html("售罄");
		// }
		//addClass
		$(".hasLimitRule:contains('限')").addClass("rule_color");
		$(".rule_name:contains('折')").addClass("rule_border");
		$(".rule_name:contains('赠')").addClass("rule_border");
		$(".rule_name:contains('减')").addClass("rule_border");

		//修改已选菜品
		for(var k = 0;k < disharr.length;k++){
			changeCart(disharr[k].id,disharr[k].num,1,0);
		}
	}
}
function getItemHtml(item) {
	// console.log(item.count);
	var id = item.productId;
	var hasLimitRule;
	var ruleName;
	var url="goods_detail.html?productId=" + item.productId;
	var display = 'none';
	var count = 0;
	var html;
	if (local && local.hasOwnProperty(id)) {
		display = 'inline-block';
		count = local[id].count;
	}
	if(item.imageUrls[0]==undefined){
		item.imageUrls[0]="images/iconer4.jpg";
	}
	if(item.ruleName!=undefined){
		ruleName=item.ruleName;
  }else{
    ruleName="";
  }

html = '<div  class="goods">\
		<a href="'+url+'">\
			<img class="fruit_img" src="'+item.imageUrls[0]+'" id="img_'+item.productId+'">\
		</a>\
		<ul class="fruit_info">\
			<a href="'+url+'"  class="fruit_title">\
				<span class="rule_name" id="rule_'+item.productId+'" data="'+item.ruleName+'">'+ruleName+'</span>\
				<span class="fruit_name" id="name_'+item.productId+'" data="'+item.productName+'">'+item.productName+'</span>\
			</a>\
			<li class="fruit_price" data="'+item.count+'">\
				<span class="hasLimitRule" id="has_'+item.productId+'" data="'+item.hasLimitRule+'">'+ruleColor(item.hasLimitRule)+'</span>\
				<span class="fruit_standard" id="unit_'+item.productId+'" data="'+item.unit+'">规格 '+item.scale+item.unit+'</span>\
				<span class="goods_price actualPrice" id="goods_price_'+item.productId+'" price="'+item.actualPrice+'" priced="'+item.price+'">￥'+item.actualPrice+'</span>\
				<div class="add_icons add_icons_toggle">\
					<img style="display:' + display + ';" class="minus" id="minus_'+item.productId+'" onclick="changeCart('+item.productId+',1,0,1,1,'+item.actualPrice+','+ item.price+','+item.scale+');" src="images/minus1.png" >\
					<span class="num" id="num_'+item.productId+'" count="' + count + '"> </span>\
					<img class="add" id="add_'+item.productId+'" onclick="ball(event);changeCart('+item.productId+',1,1,1,1,'+item.actualPrice+','+ item.price+','+item.scale+');" src="images/add.png">\
				</div>\
			</li>\
		</ul>\
	</div>';
	return html;
}
//判断是否限购
function ruleColor(ruleColor){
	if(ruleColor == 0){
		return "";
	}
	if(ruleColor == 1){
		 return "限";
	}


}
//修改菜品价格数量
function changeCart(id,nums,add,change,type, productActualPrice, productPrice, productScale, productUnit){
	//定义变量
	var num = "num_"+id;
	var priceid = "goods_price_"+id;
	var price = $("#"+priceid).attr("price");
  var count = $("#"+num).attr("count");
  var cut = "minus_"+id;
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
  }else{
  	newnum = 0;
  	var shownum = '';
  	$("#"+cut).css("display","none");
  }
  $("#"+num).attr("count",newnum);
  $("#"+num).html(shownum);

  //记录数量
  if(change){
  	//定义总价
  	var prices = price*newnum;
  	disnmanage(id,newnum,prices,type, productActualPrice, productPrice, productScale, productUnit);
  }else{
  	changeNums();
  }
}

//购物车修改
var cart = {};
//点击数量加减处理菜品数组
function disnmanage(id,nums,price,type, productActualPrice, productPrice, productScale, productUnit){
	//获取数据
	var productImage = $("#img_"+id).attr("src");
	var productName = $("#name_"+id).attr("data");
	var productUnit = $("#unit_"+id).attr("data");
	var productRuleName = $("#rule_"+id).attr("data");
	var hasLimitRule = $("#has_"+id).attr("data");
	//组装数据
	var dish = {'id':id,'num':nums,'price':price,'productId':id,'productActualPrice':productPrice,'productActualPrice':productActualPrice,'productName':productName,'productScale':productScale,'productUnit':productUnit,'productImage':productImage,'productRuleName':productRuleName,'hasLimitRule':hasLimitRule};

	//循环已有数据进行修改和删除
	var isset = false;
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
	// console.dir(disharr);
	//本地数据加减
	window.localStorage.setItem('cart',  JSON.stringify(disharr));
	//数量改变
	changeNums();
}

//本地数据加减
function changeNums(){
	//进行数量统计
	var allnum = 0;
	var allprice = 0;
	for(var i = 0;i < disharr.length;i++){
		allnum = allnum*1 + disharr[i].num*1;
		allprice = allprice*1 + disharr[i].price*1;
	}

	//改变数据
	$("#selected_priceSum").html(allprice.toFixed(2));
	$("#selected_sum").html(allnum);
	$("#banner_trolley_No").css({display:"block"});
	$("#banner_trolley_No").html(allnum);
	if(allnum < 1){
		$("#banner_trolley_No").css({display:"none"});
		$("#banner_trolley_No").html("");
	}
}
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
					$("#message_No").show();
					$("#message_No").text(num);
				}
			},
			error: function (error) {
					console.log(error);
				}
		});
	}
}
getMessageList();
//小球动画
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
var type = 0;


$(function() {
	new FastClick(document.body);
	//点击排序
	$(".sort_list").click(function(){
		$(this).removeClass("charts");
		$(this).siblings().addClass("charts");
		var id=$(this).attr("id");
		//改变排序
		if(id == 'sort_origin'){
			type = 0;
		}else if(id == 'sort_sales'){
			type = 1;
		}
		getDish(type);
	});

	//获取分类信息
	function getDishMessage(){
		$.ajax({
			type: "get",		//使用get方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
			success: function(data) {
				if(data.code == 200){
					// console.log(data.data);
					// chooseid=data.data[0].categoryId;
					// console.log(chooseid);
					var strDish = '';
					for(var i = 0; i < data.data.length; i++){
						strDish += '<li class="menu_lists menu_list" id="'+data.data[i].categoryId+'" onclick="getCateDish('+data.data[i].categoryId+')">'+ data.data[i].name +'</li>';
					}
					$("#menu").html(strDish);
					if(itemName){
						$("#"+itemName).addClass('current');
					}else{
						$('.menu_lists').eq(0).addClass('current');
					}

				}
			}
		});
	}
	getDishMessage();
	//获取菜品信息
	function getDish(sortRule){
		var url = "";
		if(sortRule == 0){
			url = path + "?m=product&f=getProductList&keyword=&categoryId=" + chooseid;
			// console.log(url);
		}else if(sortRule == 1){
		 	url = path + "?m=product&f=getProductListByVolume&order=1&categoryId=" + chooseid;
		}
		// console.log(url);
		//获取全部菜品访问方法
		$.ajax({
			type: "get",		//使用get方法访问后台
			dataType: "json",	//返回json格式的数据
			url: url,			//要访问的后台地址
			// data: data,			//要发送的数据
			// async: false,
			success: function(data) {
				if(data.code == 200){
					aData = data.data;
					// console.log(aData);
					//插入菜品
					for(var i in aData[0].data){
						var tempDict = {};
            var dict = aData[0].data[i];
						tempDict.actualPrice = dict.actualPrice;
						tempDict.price = dict.price;
						tempDict.productId = dict.productId;
						tempDict.productName = dict.productName;
						tempDict.scale = dict.scale;
						tempDict.unit = dict.unit;
						tempDict.imageUrl = dict.imageUrls[0];
						dataArray.push(tempDict);
					}
					getCateDish('');
				}
			}
		});
	}
	getDish(0);


	/*左侧菜单点击效果*/
	$('#menu').on('click','li',function(event){
		var index = $(this).index();
    $('#menu li').removeClass('current');
    $('#menu li').eq(index).addClass('current');
		getDish(0);
	});


	$("#loading_animation").fadeOut(200);
	$("#whole").fadeIn(200);

	//点击定位图标
	$("#location").click(function(){window.location = "selectapt.html";});
	$("#search").click(function(){window.location="search.html";});
	$("#message").click(function(){window.location = "message.html";});
	// $("#icon_trolley").click(function(){window.location = "trolley.html";});
});

// pushHistory();
// window.addEventListener("popstate", function(e) {
//   if(localStorage.getItem("location")){
//     // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
//     window.location="index.html";
//     localStorage.removeItem("location");
//   }else{
//     // alert("aa");
//     history.back(-1);
//   }
// }, false);
// function pushHistory() {
//   var state = {
//     title: "title",
//     url: "#"
//   };
//   window.history.pushState(state, "title", "#");
// }
// 获取localstorage数据
window.localStorage.removeItem("location");
var local=window.localStorage.getItem('cart');
var localnum=JSON.parse(local);
var orderId;
// console.log(localnum);
var num=0;
var order=true;
if(localStorage.getItem("order")){
  order=localStorage.getItem("order");
}else{
  localStorage.setItem("order",order);
}
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
function on(id){
  var url="order_detail.html?id=" + id;
  window.location = url;
}
$(function(){
  console.log(order);
  if(order=="true"){
    $(".order_left").css({color:"#666",background:"#eee"});
    $(".order_right").css({color:"#999",background:"#fff"});
    $(".left_main").css({display:"block"});
    $(".order_main").css({display:"none"});
  }
  if(order=="false"){
    console.log(1);
    $(".order_right").css({color:"#666",background:"#eee"});
    $(".order_left").css({color:"#999",background:"#fff"});
    $(".order_main").css({display:"block"});
    $(".left_main").css({display:"none"});

  }
  $(".order_left").click(function(){
    order=true;
    localStorage.setItem("order",order);
    $(this).css({color:"#666",background:"#eee"});
    $(".order_right").css({color:"#999",background:"#fff"});
    $(".left_main").css({display:"block"});
    $(".order_main").css({display:"none"});
  })
  $(".order_right").click(function(){
    order=false;
    localStorage.setItem("order",order);
    $(this).css({color:"#666",background:"#eee"});
    $(".order_left").css({color:"#999",background:"#fff"});
    $(".order_main").css({display:"block"});
    $(".left_main").css({display:"none"});
  })
})
$(function(){
  var path="http://api.suyousc.com/index.php";
  var token=window.localStorage.token;
  //ajax异步通信，获取历史订单列表
	function getHistoryOrderList(){
    if (token != ""){
      var url = path + "?m=order&f=getOrderListForUser&status=3&addressId=-1&start=0&lenth=10";
      var headers = {};
      headers["token"] = token;
      $.ajax({
        type: "get",		//使用get方法访问后台
        dataType: "json",	//返回json格式的数据
        url: url,			//要访问的后台地址
        data: "",			//要发送的数据
        headers: headers,	//要发送的header数据
        success: function(result) {
           if(result.code==200){
             var json = result.data.orders;
             console.log(json);
             for(var i=0;i<json.length;i++){
               if(json[i].sendType=="1"){
                 json[i].sendType="配送上门";
               }else{
                 json[i].sendType="店铺自提";
               }
               if(json[i].payType=="0"){
                 json[i].payType="货到付款";
               }else if(json[i].payType=="1"){
                 json[i].payType="支付宝";
               }else{
                 json[i].payType="微信支付";
               }
               $(".order_cancel_item").click(function(e){
                 e.stopPropagation();
               })
              //  var url="order_detail.html?orderId=" + json[i].orderId;
              var url="order_detail.html?id=" + id;

               $(".order_main").append(
                 '<a class="order_block order_id" id="'+json[i].orderId+'" onclick="on('+json[i].orderId+');">\
                   <div class="order_block_item" >\
                     <div class="order_num order_border">\
                       <span class="order_num_name" >订单编号</span>\
                       <span class="order_num_number">'+json[i].orderCode+'</span>\
                       <span class="order_wait">'+json[i].statusName+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name" id="order_time_name">下单时间</span>\
                       <span class="order_num_number" id="order_time">'+json[i].orderTime+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name" id="order_send">配送方式</span>\
                       <span class="order_num_number" id="order_send_s">'+json[i].sendType+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name">配送地址</span>\
                       <span class="order_num_number">'+json[i].address+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name" style="display:inline-block;float:left">店铺地址</span>\
                       <span class="order_num_number" style="display:inline-block;width:72%">'+json[i].shopName+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name">实付金额</span>\
                       <span class="order_num_number order_red">￥'+json[i].actualAmount+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name">支付方式</span>\
                       <span class="order_num_number">'+json[i].payType+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name order_ma">收货码</span>\
                       <span class="order_num_number order_red">'+json[i].receivedCode+'</span>\
                     </div>\
                   </div>\
                 </a>'
               );
              //  console.log(json[i].status);
              //  if(json[i].status=="11"){
              //    $(".order_id .order_cancel").css({display:"block"});
              //  }
               var id=$($(".order_id")[i]).attr("id");
              //  var tel=$($(".order_cancel_item")[i]).attr("data-tel");
             }
            //  console.dir(tel)
            //  $(".order_cancel_item2").click(function(){
            //    alert(tel);
            //   window.location.href='tel://' + tel;
            //  })
           }
         },
         error:function(error){
           console.log(error);
         }
      });
    }
	}

  //进行中的订单
  function getOrderList(){
    if (token != ""){
      var headers = {};
  		headers["token"] = token;
      var url = path + "?m=order&f=getOrderListForUser&status=2&addressId=-1&start=0&lenth=10";
      $.ajax({
         type : "get",
         url : url,
         dataType : "json",
         headers:headers,
         data:"",
         crossDomain: true,
         success : function(result){
          //  console.log(result);

           if(result.code==200){
             var json = result.data.orders;
             console.log(json);
             for(var i=0;i<json.length;i++){
               if(json[i].sendType=="1"){
                 json[i].sendType="配送上门";
               }else{
                 json[i].sendType="店铺自提";
               }
               if(json[i].payType=="0"){
                 json[i].payType="货到付款";
               }else if(json[i].payType=="1"){
                 json[i].payType="支付宝";
               }else{
                 json[i].payType="微信支付";
               }
               var url="order_detail.html?id=" + id;
               $(".left_main").append(
                 '<a class="order_block order_ing" id="order_num_name_'+json[i].orderId+'">\
                   <div class="order_block_item" >\
                   <div class="order_cancel">\
                     <div class="order_cancel_item order_cancel_item1" id="yes_'+json[i].orderId+'">确认收货</div>\
                     <div class="order_cancel_item order_cancel_item2" id="tel_'+json[i].orderId+'" data-tel="'+json[i].shopPhone+'">申请取消</div>\
                   </div>\
                     <div class="order_num order_border">\
                       <span class="order_num_name" >订单编号</span>\
                       <span class="order_num_number">'+json[i].orderCode+'</span>\
                       <span class="order_wait">'+json[i].statusName+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name" id="order_time_name">下单时间</span>\
                       <span class="order_num_number" id="order_time">'+json[i].orderTime+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name" id="order_send">配送方式</span>\
                       <span class="order_num_number" id="order_send_s">'+json[i].sendType+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name">配送地址</span>\
                       <span class="order_num_number">'+json[i].address+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name" style="display:inline-block;float:left">店铺地址</span>\
                       <span class="order_num_number" style="display:inline-block;width:72%">'+json[i].shopName+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name">实付金额</span>\
                       <span class="order_num_number order_red">￥'+json[i].actualAmount+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name">支付方式</span>\
                       <span class="order_num_number">'+json[i].payType+'</span>\
                     </div>\
                     <div class="order_num">\
                       <span class="order_num_name order_ma">收货码</span>\
                       <span class="order_num_number order_red">'+json[i].receivedCode+'</span>\
                     </div>\
                   </div>\
                 </a>'
               );
               var tel=$($(".order_cancel_item")[i]).attr("data-tel");
               var id=$($(".order_ing")[i]).attr("id");
               console.log(json[i].status);
              var status=json[i].status;
              if(json[i].status=="3"){
                $($(".order_cancel_item2")[i]).css({display:"block"}).html("取消订单");
              }
              if(json[i].status=="3"||json[i].status=="4"||json[i].status=="5"||json[i].status=="6"||json[i].status=="7"||json[i].status=="8"||json[i].status=="9"){
                $($(".order_cancel_item2")[i]).css({display:"block"});
              }
              if(json[i].status=="10"){
                $($(".order_cancel_item1")[i]).css({display:"block"});
                $($(".order_cancel_item2")[i]).css({display:"block"});
              }

             }
             $(".order_ing").not(".order_cancel").click(function(){
               console.log(this);
               id=$(this).attr("id").replace(/[^0-9]/ig,"");
               console.log(id);
               on(id);
             })
             $(".order_cancel_item2").click(function(e){
                e.stopPropagation();
                console.log($(this).text());
                orderId=$(this).attr("id").replace(/[^0-9]/ig, "");
                var phone=$(this).attr("data-tel");
                // console.log(phone);
                if($(this).text()=="取消订单"){
                  action("取消订单","");
                  // location.reload();
                }
                if($(this).text()=="申请取消"){
                  action("申请取消",phone);
                }
             })
             $(".order_cancel_item1").click(function(e){
                e.stopPropagation();
                console.log($(this).text());
                orderId=$(this).attr("id").replace(/[^0-9]/ig, "");
                if($(this).text()=="确认收货"){
                  action("确认收货","");
                }
             })
             function action(name,phone){
               switch (name) {
                  case "取消订单":
                    cancel("12");
                    break;
                  case "申请取消":
                    console.log(phone);
                    window.location.href="tel://"+phone;
                    break;
                  case "确认收货":
                    cancel("13");
                   break;
                 default:
               }
             }
           function request(tag,type,url,data,isToken){
              var headers = {};
              if (isToken == true){
             		headers["token"] = token;
               }
               console.log(headers);
               console.log(data);
               $.ajax({
                 type: type,		//使用post方法访问后台
                 dataType: "json",	//返回json格式的数据
                 url: url,			//要访问的后台地址
                 data: JSON.stringify(data),			//要发送的数据
                 headers: headers,	//要发送的header数据
                 success: function(result) {
                   if(tag==1){
                      console.log(result);
                      location.reload();
                   }
                 }
               })
             }
             function cancel(status){
               var data={"data":{"orderId":orderId,"status":status,"reason":""}};
               console.log(data);
               var url=path+"?m=order&f=saveOrderStatus";
               request(1,"post",url,data,true)
             }

           }
         },
         error:function(error){
           console.log(error);
         }
      });
    }
  }
getOrderList();
getHistoryOrderList();
})

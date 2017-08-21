var isIdle = true;		//全局 - 是否空闲
var path="http://api.suyousc.com/index.php";
var token=window.localStorage.token;
var form=window.localStorage.form;
console.log(form);
var address=[];
var addressId;
var dict={};
pushHistory();
window.addEventListener("popstate", function(e) {
  // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
  if(localStorage.getItem("location")){
    // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
    window.location="pay.html";
    localStorage.removeItem("location");
  }else{
    // alert("aa");
    history.back(-1);
  }
}, false);
function pushHistory() {
  var state = {
    title: "title",
    url: "#"
  };
  window.history.pushState(state, "title", "#");
}
//ajax异步通信，获取地址列表
function getAddressList(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path+ "?m=address&f=getAddressList";
    $.ajax({
      type: "get",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: "",			//要发送的数据
      headers: headers,	//要发送的header数据
      crossDomain: true,
      success: function(result) {
        console.log(result);
        var json = result.data;
        var mobile;
        $.each(json, function(i, item) {
          mobile=item.mobile;
          console.log(item);
          var url="editaddress.html?id=" + item.id;
          $("#main").append(
            '<div class="l_myaddress">\
              <div class="l_myaddress_main">\
                <div class="l_myaddress_adder">\
                  <div class="l_myaddress_detail">\
                    <div class="l_myaddress_name">\
                      <span class="l_myaddress_peo">收货人</span>\
                      <span class="l_peo_name">'+item.name+'</span>\
                      <span>'+mobile+'</span>\
                    </div>\
                    <div class="l_myaddress_add">\
                      <span class="l_myaddress_addre">收货地址</span>\
                      <div class="l_peo_add">'+item.address+'</div>\
                    </div>\
                  </div>\
                  <a href=" '+url+' " class="l_myaddress_edit">\
                    <img src="images/edit.png" alt="">\
                  </a>\
                  <span class="address_prime hide"><img src="images/checked.png"></span>\
                  <div class="clear"></div>\
                </div>\
                <div class="l_delete">删除</div>\
                <div class="clear"></div>\
              </div>\
            </div>'
          );
          move();
          if (item.isDefault != "1"){
            $(".l_myaddress").css({background:"#fff"});
          }
          $(".l_myaddress_edit").click(function(e){
            e.stopPropagation();
          })
          if(form=="false"){
            $($(".l_myaddress")[i]).not(".l_myaddress_edit").not(".l_delete").click(function(){
              if($(this).find(".l_myaddress_detail").attr("disabled")){
                console.log("aaaaa");
                return false;
              }else{
                $(this).find(".l_myaddress_detail").attr("disabled","disabled");
                var dish = {"id":item.id,"mobile":item.mobile,"address":item.address,"communityName":item.communityName,"name":item.name,"isDefault":"1"};
                // var disarr = {"addressId":item.address,"communityId":item.communityId,"gender":item.gender, "name":item.name,"building":item.building, "unit":item.unit, "room":item.room, "mobile":item.mobile, "isDefault":"1"}
                address.shift(dish);
                address.push(dish);
                window.localStorage.setItem('address',JSON.stringify(address));
                $(".address_prime").addClass("hide");
                $($(".address_prime")[i]).removeClass("hide");
                var data = '{"data": {"addressId":"' + item.id + '","communityId":"'+item.communityId+'","gender":"'+item.gender+'", "name":"' + item.name +'",  ' +
                           '"building":"' + item.building +'", "unit":"' + item.unit + '", "room":"'+ item.room + '", ' +
                           '"mobile":"' + item.mobile +'", "isDefault":"1"}}';
                updateAddress(data);

              }
            })
          }else{
            $($(".l_myaddress")[i]).not(".l_myaddress_edit").not(".l_delete").click(function(){
              if($(this).find(".l_myaddress_detail").attr("disabled")){
                console.log("aaaaa");
                return false;
              }else{
                $(this).find(".l_myaddress_detail").attr("disabled","disabled");
                $(".address_prime").addClass("hide");
                $($(".address_prime")[i]).removeClass("hide");
                var disarr = {"addressId":item.address,"communityId":item.communityId,"gender":item.gender, "name":item.name,"building":item.building, "unit":item.unit, "room":item.room, "mobile":item.mobile, "isDefault":"1"}
                var data={"data":disarr};
                console.log(data);
                var data = '{"data": {"addressId":"' + item.id + '","communityId":"'+item.communityId+'","gender":"'+item.gender+'", "name":"' + item.name +'",  ' +
                           '"building":"' + item.building +'", "unit":"' + item.unit + '", "room":"'+ item.room + '", ' +
                           '"mobile":"' + item.mobile +'", "isDefault":"1"}}';
                updateAddress(data);
                $(this).css({backgroundImage: "url(images/checked_q.png)",backgroundSize: "100% 100%"});
                $(this).siblings().css({background:"#fff"});
              }
            })
          }

          $($(".l_delete")[i]).on("click",function(){
            if(item.isDefault=="1"){
              $(".alert_common").fadeIn(200);
              $(".alert_bg").fadeIn(200);
              setTimeout(function(){
                $(".alert_common").fadeOut(200);
                $(".alert_bg").fadeOut(200);
                return false;
              },2000);
            }else{
              addressId=item.id;
              dict.addressId=addressId;
              removeAddress();
              $(this).parent().parent().remove();
            }
          })
        });
          $("span.address_prime:last").removeClass("hide");

      },
      error: function (xhr, textStatus, errorThrow) {
            //alert(xhr.readyState);
        }
    });
  }
}
getAddressList();
function updateAddress(data){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path+ "?m=address&f=updateAddress";
    console.log(url);
    $.ajax({
      type: "post",		//使用post方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: data,			//要发送的数据
      headers: headers,	//要发送的header数据
      success: function(result) {
        console.log(result,"984958498598459");
        if(form=="false"){
          window.location="pay.html";
        }else{
          location.reload();
        }

      },
      error: function (xhr, textStatus, errorThrow) {
            //alert(xhr.readyState);

        }
    });
  }
}
function removeAddress(){
  if (token != ""){
    var headers = {};
    headers["token"] = token;
    var url = path+ "?m=address&f=removeAddress";
    var data=JSON.stringify({"data":dict});
    $.ajax({
      type: "post",		//使用get方法访问后台
      dataType: "json",	//返回json格式的数据
      url: url,			//要访问的后台地址
      data: data,			//要发送的数据
      headers: headers,	//要发送的header数据
      crossDomain: true,
      success: function(result) {
        console.log(result);
      }
    })
  }
}
$(function(){
  $("#animation").fadeOut(200);
  $("#back").click(function(){
    if(form=="true"){
      console.log(1);
      window.location="mine.html";
    }else{
      window.location="pay.html";
    }
  })
  $("#add_address").click(function(){
    window.location="addaddress.html";
  })
})
function move(){
  	$(".l_myaddress_adder").on("swipeleft",function(){
  		$(this).stop().animate({marginLeft:'-6.4rem'});
  		// $(this).find('a.edit').animate({right:'7.6rem'});
  		$(this).find('.l_delete').stop().animate({right:'0rem'});
  	});
  	$(".l_myaddress_adder").on("swiperight",function(){
  		$(this).stop().animate({marginLeft:'0rem'});
  		// $(this).find('a.edit').animate({right:'1.2rem'});
  		$(this).find('.l_delete').stop().animate({right:'-6.4rem'});
  	});

}

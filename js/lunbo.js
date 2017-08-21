$(function(){
  // 轮播以及触屏轮播
  var num=0;
  function move (){
      num++;
      if(num==$("#ad1 a").length-1){
          $("#ad1").animate({marginLeft:-num*100+"%"},1000,function(){
              $("#ad1").css({marginLeft:0});
          });
          num=0;
      }else{
          $('#ad1').animate({marginLeft:-num*100+"%"},1000);
      }
      $("#circle .yuan").css({background:"rgba(200,200,200,.3)"});
      $("#circle .yuan").eq(num).css({background:"red"});
  }
  var time=setInterval(move,3000);
  var margin;
  touch.on("#ad1","dragstart",function(){
      margin=$("#ad1")[0].offsetLeft;
      clearInterval(time);
  })
  touch.on("#ad1","drag",function(e){
      $("#ad1").css("marginLeft",margin+ e.x);
  })
  touch.on("#ad1","dragend",function(e){
      time=setInterval(move,3000);

          if(e.direction=="left"){
              num++;
              if(num==$("#ad1 a").length-1){
                  $("#ad1").animate({marginLeft:-num*100+"%"},1000,function(){
                      $("#ad1").css({marginLeft:0});
                  });
                  num=0;
              }else{
                  $('#ad1').animate({marginLeft:-num*100+"%"},1000);
              }
          }else if(e.direction=="right"){
              num--;
              if(num==-1){
                  num=0;
                  $('#ad1').animate({marginLeft:-num*100+"%"},1000);

                  return;
              }else{
                  $('#ad1').animate({marginLeft:-num*100+"%"},1000);
              }
          }
      $("#circle .yuan").css({background:"rgba(200,200,200,.3)"});
      $("#circle .yuan").eq(num).css({background:"red"});
  })
  // touch.on("#ad1","dragend",function(){
  //     time=setInterval(move,3000);
  // })
})
$(function(){
  // 轮播以及触屏轮播
  var num=0;
  function move (){
      num++;
      if(num==$("#ad2 a").length-1){
          $("#ad2").animate({marginLeft:-num*100+"%"},1000,function(){
              $("#ad2").css({marginLeft:0});
          });
          num=0;
      }else{
          $('#ad2').animate({marginLeft:-num*100+"%"},1000);
      }
      $("#circle1 .yuan").css({background:"rgba(200,200,200,.3)"});
      $("#circle1 .yuan").eq(num).css({background:"red"});
  }
  var time=setInterval(move,3000);
  var margin;
  touch.on("#ad2","dragstart",function(){
      margin=$("#ad2")[0].offsetLeft;
      clearInterval(time);
  })
  touch.on("#ad2","drag",function(e){
      $("#ad2").css("marginLeft",margin+ e.x);
  })
  touch.on("#ad2","dragend",function(e){
      time=setInterval(move,3000);
          if(e.direction=="left"){
              num++;
              if(num==$("#ad2 a").length-1){
                  $("#ad2").animate({marginLeft:-num*100+"%"},1000,function(){
                      $("#ad2").css({marginLeft:0});
                  });
                  num=0;
              }else{
                  $('#ad2').animate({marginLeft:-num*100+"%"},1000);
              }
          }else if(e.direction=="right"){
              num--;
              if(num==-1){
                  num=0;
                  $('#ad2').animate({marginLeft:-num*100+"%"},1000);

                  return;
              }else{
                  $('#ad2').animate({marginLeft:-num*100+"%"},1000);
              }
          }
      $("#circle1 .yuan").css({background:"rgba(200,200,200,.3)"});
      $("#circle1 .yuan").eq(num).css({background:"red"});
  })
  // touch.on("#ad2","dragend",function(){
  //     time=setInterval(move,3000);
  // })
})

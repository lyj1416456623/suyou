$(function(){
  $(".l_fap_qu").click(function(){
		$(this).next().slideToggle();
		$(this).find("img").toggleClass("rotate");
	});
})

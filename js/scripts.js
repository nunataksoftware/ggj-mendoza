	var strength1 = 480;
	var strength2 = 200;
	var strength3 = 100;
	var strength4 = 50;

	function AnimateMe(){
		$("#nubes").css("background-position", "-=0.3"); 
	}
		
	setInterval(AnimateMe, 1000/60);

	$("html").mousemove(function(e){
		var pageX = e.pageX - ($(window).width() / 2);    var newvalueX = 1* pageX * -1;
		//$('#header-fondo1').css("background-position", (strength1 / $(window).width() * pageX * -1)+"px 0px");
		$('#edificios1').css("background-position", (strength2 / $(window).width() * pageX * -1)+"px 0px");
		$('#edificios2').css("background-position", (strength3 / $(window).width() * pageX * -1)+"px 0px");
		$('#edificios3').css("background-position", (strength4 / $(window).width() * pageX * -1)+"px 0px");
	});
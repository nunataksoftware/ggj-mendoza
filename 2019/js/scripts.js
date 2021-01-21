	var strength1 = 15;
	var strength2 = 25;
	var strength3 = 100;
	var strength4 = 50;
	var strength5 = 5;

	function AnimateMe(){
		//$("#nubes").css("background-position", "-=0.3"); 
	}
		
	setInterval(AnimateMe, 1000/60);

	$("html").mousemove(function(e){
		var pageX = e.pageX - ($(window).width() / 2);    var newvalueX = 1* pageX * -1;
		var pageY = e.pageY - ($(window).height() / 2);    var newvalueY = 1* pageY * -1;
		//$('#header-fondo1').css("background-position", (strength1 / $(window).width() * pageX * -1)+"px 0px");
		$('#nave').css("background-position", (strength1 / $(window).width() * pageX * -1)+"px " + strength1 / $(window).height() * pageY * -1 + "px");
		$('#astronautas').css("background-position", (strength2 / $(window).width() * pageX * -1)+"px 0px");
/*		$('#astroverde').css("background-position", (strength3 / $(window).width() * pageX * -1)+"px 0px");
		$('#astroamarillo').css("background-position", (strength4 / $(window).width() * pageX * -1)+"px 0px");
		$('#posacabezaamarillo').css("background-position", (strength5 / $(window).width() * pageX * -1)+"px 0px");
*/
	});
	
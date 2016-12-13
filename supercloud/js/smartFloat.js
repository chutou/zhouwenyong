// JavaScript Document
$.fn.smartFloat = function() {
	var position = function(element) {
		var top = element.position().top, pos = element.css("position");
		$(window).scroll(function() {
			var scrolls = $(this).scrollTop();
			var scrollHeight = $(document).height();
　　			var windowHeight = $(this).height();			
			if (scrolls > top) {
				if (window.XMLHttpRequest) {						
					element.css({
						position: "fixed",
						top: 0,
						display:"block"
					});
					//$(this).addClass("floatTop");
				} else {
					element.css({
						top: scrolls,
						display:"block"
					});	
				}
			}else {
				element.css({
					position: pos,
					top: top,
					display:"none"
				});	
			}
			/*if(scrolls + windowHeight == scrollHeight){
				element.css({
					position:"relative",
					top: 0
				});
		　　　　alert("you are in the bottom");
		　　}*/
		});
};
	return $(this).each(function() {
		position($(this));						 
	});
};
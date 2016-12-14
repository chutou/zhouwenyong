// JavaScript Document
(function($){
	var goToTopTime;
	$.fn.goToTop=function(options){
		var opts = $.extend({},$.fn.goToTop.def,options);
		var $window=$(window);
		$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
		//$(this).hide();
		var $this=$(this);
		clearTimeout(0);
		goToTopTime=setTimeout(function(){
			var controlLeft;
			if ($window.width() > opts.pageHeightJg * 2 + opts.pageWidth) {
				controlLeft = ($window.width() - opts.pageWidth) / 2 + opts.pageWidth + opts.pageWidthJg;
			}else{
				controlLeft = $window.width()- opts.pageWidthJg-$this.width();
			}
			var cssfixedsupport=$.browser.msie && parseFloat($.browser.version) < 7;//判断是否ie6
			var controlTop=$window.height() - $this.height()-opts.pageHeightJg;
			controlTop=cssfixedsupport ? $window.scrollTop() + controlTop : controlTop;
			var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;
			
			if (shouldvisible){
				$this.stop().show(opts.showBtntime);
			}else{
				$this.stop().show(opts.showBtntime);
			}
			
			$this.css({
				position: cssfixedsupport ? 'absolute' : 'fixed',
				top: controlTop,
				left: controlLeft
			});
		},0);
		
		$(this).click(function(event){
			$body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
			$(this).blur();
			event.preventDefault();
			event.stopPropagation();
		});
	};
	
	$.fn.goToTop.def={
		pageWidth:1000,//页面宽度
		pageWidthJg:10,//按钮和页面的间隔距离
		pageHeightJg:50,//按钮和页面底部的间隔距离
		startline:20,//出现回到顶部按钮的滚动条scrollTop距离
		duration:0,//回到顶部的速度时间
		showBtntime:0,//显示\隐藏回到顶部按钮的速度时间
		targetObg:"body"//目标位置
	};
})(jQuery);
$(function(){
	//$('<div class="go-top"><a href="##" class="top">&nbsp;</a><a href="##" class="fav">&nbsp;</a></div>').appendTo("body");
});

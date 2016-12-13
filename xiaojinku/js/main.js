// JavaScript Document
//顶部浮动

$(function(){
	$(".jiaCxt .icon_jia").click(function(){
		var num=parseInt($(this).parents(".jiaCxt").siblings(".input").val())
		num++;
		$(this).parents(".jiaCxt").siblings(".input").val(num)
	})
	$(".jiaCxt .icon_jian").click(function(){
		var num=parseInt($(this).parents(".jiaCxt").siblings(".input").val())
		num--;
		if(num>0){
		$(this).parents(".jiaCxt").siblings(".input").val(num)
		}else{
			
		}
	})
	$(".suo .jia").click(function(){
		var num=parseInt($(this).siblings(".dinput").val())
		num++;
		$(this).siblings(".dinput").val(num)
	})
	$(".suo .jian").click(function(){
		var num=parseInt($(this).siblings(".dinput").val())
		num--;
		if(num>0){
		$(this).siblings(".dinput").val(num)
		}else{
			
		}
	})
	$(".suo2 .jia").click(function(){
		var num=parseInt($(this).siblings(".dinput").val())
		num++;
		$(this).siblings(".dinput").val(num)
	})
	$(".suo2 .jian").click(function(){
		var num=parseInt($(this).siblings(".dinput").val())
		num--;
		if(num>0){
		$(this).siblings(".dinput").val(num)
		}else{
			
		}
	})
	
})

//付款成功提示
function succ(arg){
	var dialog=art.dialog({
			lock:false,
			title: false,
			content:'<div class="center font30px mb20"><b>恭喜！您已成功支付！</b></div><div class="font22px center color_999 lh36">我们会尽快安排送货，请保持电话畅通！随时做好收货准备。</div>',
			padding: '50px 20px 50px 20px',
			width:360,
			time:3						
		});
}
//付款失败提示
function failure(arg){
	var dialog=art.dialog({
			lock:false,
			title: false,
			content:'<div class="center font30px mb20"><b>很抱歉！您的支付失败！</b></div><div class="font22px center color_999 lh36">请确保您的网络畅通，检查您的银行卡有足够余额用以支付！</div>',
			padding: '50px 20px 50px 20px',
			width:360,
			time:3						
		});
}
//购物车成功提示
function shopcart(arg){
	var dialog=art.dialog({
			lock:false,
			title: false,
			content:'<div class="center font30px mb20"><b>已成功添加到购物车！</b></div><div class="font22px center color_999 lh36"><a href="javascript:;" class="mr10 imgauto"><img src="images/img22.png" /></a><a href="javascript:;" class="ml10 imgauto"><img src="images/img23.png" /></a></div>',
			padding: '50px 20px 50px 20px',
			width:360,
			time:3						
		});
}
//我要提现
function tixian(arg){
	var dialog=art.dialog({
			lock:false,
			title: false,
			content:'<div class="center font30px mb20"><b>抱歉！只有分销商可以提现！</b></div><div class="font22px center color_999 lh36"><p>目前只有分销商可以将积分提现！</p><p>您目前不能使用此功能！</p><p class="mt10"><a href="javascript:;" class="imgauto" title="成为分销商"><img src="images/img33.png" /></a></p></div>',
			padding: '50px 20px 50px 20px',
			time:3						
		});
}
//vip
function vip(arg){
	var dialog=art.dialog({
			lock:false,
			title: false,
			content:'<div class="center font30px mb20"><b>您的申请请求已提交！</b></div><div class="font22px center color_999 lh36"><p>请耐心等待我们的工作人员核实！</p><p>24小时内反馈给您！</p></div>',
			padding: '50px 20px 50px 20px',
			time:3						
		});
}
//申请提现
function tixian(arg){
	var dialog=art.dialog({
			lock:false,
			title: false,
			content:'<div class="center font30px mb20"><b>您的提现请求已提交！</b></div><div class="font22px center color_999 lh36"><p>请耐心等待我们的工作人员核实！</p><p>24小时内反馈给您！</p></div>',
			padding: '50px 20px 50px 20px',
			time:3						
		});
}
//我要评价前登录
function login(arg){
	art.dialog.open('loginDialog.html', {title:false,lock:true,width:420,height:400});
}
function pinjia(arg){
	art.dialog.open('pinjia.html', {title:false,lock:true,width:500,height:400});
}
function area(arg){
	art.dialog.open('location.html', {title:false,lock:true,width:600,height:400});
}

// JavaScript Document
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
// JavaScript Document
//付款成功提示
var dialog;
function succ(arg){
	/*var dialog=art.dialog({
			lock:false,
			title: false,
			content:'<div class="dia"><div class="title">奥托博克 铂乐之星</div><div class="diaText"><img src="images/img-logo.png" class="img" />我为04号选手投了1票，赶紧来奥托博克‘铂乐之星’假肢模特选拔大赛吧</div><div class="diaInputBox"><input type="text" class="diaInput" /></div><div class="diaButtons"><a class="btns" id="quxiao">取消</a><a href="javascript:art.dialog.close()" class="btns">发送</a></div></div>',
			padding: '0',
			width:480					
		});*/
	art.dialog.open('dialog.html',{title:false,padding:0,width:480});
}
/*function close(){
	alert(1);
	dialog.close();
}*/
// JavaScript Document
function ft(id,top) {//top为元素显示区顶部的距离
  if (!document.getElementById(id)) return false;
  var el = document.getElementById(id),
       w = window,
       d = document,
      timer;
  el.style.top = top + "px";
  addEvent(w, "scroll", function() {
  //w.onresize = w.onscroll = function(){ 
    clearInterval(timer); 
    timer = setInterval(function(){ 
      var temp = (d.documentElement.scrollTop || d.body.scrollTop), c; 
      c = temp + top - el.offsetTop; 
      if (c != 0) { 
        el.style.top = el.offsetTop + Math.ceil(Math.abs(c)/10)*(c<0?-1:1) + 'px'; 
      } else { clearInterval(timer); }
    },10) 
  })
}
/*** @author BG*/
//工具函数
function hasClass(el,cls) { return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); } 
function addClass(el,cls) {if (!this.hasClass(el,cls)) el.className += " "+cls;}
function removeClass(el,cls) {
  if (hasClass(el,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    el.className = el.className.replace(reg,' ');
  }
}
function contains(parentNode, childNode) {
  if (parentNode.contains) {
    return parentNode != childNode && parentNode.contains(childNode);
  } else {
    return !!(parentNode.compareDocumentPosition(childNode) & 16);
  }
}
function checkHover(e,target){
  if (getEvent(e).type == "mouseover")  {
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement) && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);
  } else {
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement) && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);
  }
}
function getEvent(e){return e||window.event;}
function addEvent(obj, type, fn ) { 
  if (obj.attachEvent) { 
    obj['e'+type+fn] = fn; 
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );} 
    obj.attachEvent( 'on'+type, obj[type+fn] ); 
  } else 
    obj.addEventListener( type, fn, false ); 
  } 
function removeEvent( obj, type, fn ) { 
  if (obj.detachEvent ) { 
    obj.detachEvent( 'on'+type, obj[type+fn] ); 
    obj[type+fn] = null; 
  } else 
    obj.removeEventListener( type, fn, false ); 
} 
function getByClass(id, className) {
  var ct = document.getElementById(id);
  if (ct.getElementsByClassName) {
    return ct.getElementsByClassName(className);
  } else {
    var item = ct.getElementsByTagName("*"),
        result = [],
        reg = new RegExp("\\b" + className + "\\b");
    for (var i=0,l=item.length;i<l;i++) {
      if(reg.test(item[i].className))
        result.push(item[i]);
    }
    return result;
  }
}
function getStyle( obj, pro ) {
  return obj.currentStyle ? obj.currentStyle[pro] : document.defaultView.getComputedStyle(obj,null)[pro];
}

//tab切换
function Tabs(id,ev,defNum){
  if (!document.getElementById(id)) { return false;}
  var defNum = defNum || 0;
  var tab = getByClass(id,"tabs")[0].children,
      tabContent= getByClass(id,"tabc"),
      l = tab.length;
  tabContent[defNum].style.display = "block";
  addClass(tab[defNum], "cur");
  for(var i=0;i<l;i++){
    (function(arg){
      addEvent(tab[arg],ev,function(){
        for(var j=0;j<l;j++){
          if(j!=arg){
            tabContent[j].style.display = "none";
            removeClass(tab[j], "cur");
          }else{
            tabContent[j].style.display = "block";
            addClass(tab[j], "cur");
          }
        }
      })
    })(i)
  }
}
//模拟select
function SelectWrap(id) {
  if (!document.getElementById(id)) { return false; }
  var select = this.select = document.getElementById(id);
  this.dt = select.getElementsByTagName("dt")[0];
  this.dd = select.getElementsByTagName("dd")[0];
  this.p = select.getElementsByTagName("p");
  this.bind();
}
SelectWrap.prototype = {
  bind : function() {
    var that = this,i;
    addEvent(this.dt,"click",function(){
      addClass(this,"on");
      that.dd.style.display = "block";
    });
    for(i = this.p.length;i--;) {
      addEvent(this.p[i],"click",function(){
        var p = this.innerHTML;
        that.dt.innerHTML = p;
        that.dd.style.display = "none";
        removeClass(that.dt,"on");
        removeClass(that.dt,"grey");
      })
    }
  }
}
//模拟placeholder
function placeholder(id) {
  var i,list = [],value = [];
  for(i = arguments.length;i--;) {
    list[i] = document.getElementById(arguments[i]);
    value[i] = list[i].value;
  };
  for(i = arguments.length;i--;) {
    (function(temp) {
      addEvent(list[temp],"click",function(){
        removeClass(this,"grey");
        this.value = ""; 
      });
      addEvent(list[temp],"blur",function(){
        if( !this.value ) {
          this.value = value[temp];
          addClass(this,"grey");
        }
      });
    })(i)
  }
}
//下拉菜单
function subnav(id) {
  if(!document.getElementById(id)) { return false;}
  var nav = document.getElementById(id),
       li = nav.children,
       i;
  for(i = li.length;i--;) {
    (function(temp){
      if(li[temp].getElementsByTagName("ul")[0]) {
        var target = li[temp],
            targetUl = target.getElementsByTagName("ul")[0];
        addEvent(target,"mouseover",function(){
          targetUl.style.display = "block";
        });
        addEvent(targetUl,"mouseout",function(){
          targetUl.style.display = "none";
        });
        addEvent(target,"mouseout",function(){
          targetUl.style.display = "none";
        });
      }
    })(i)
  }
}
subnav("nav");
//fader
var Fader = function(id) {
  if (!document.getElementById(id)) return false;
  var ct = this.ct = document.getElementById(id),
    list = this.list = ct.getElementsByTagName("dt")[0].getElementsByTagName("img"),
      ul = document.createElement("ul"),
    that = this;
  this.cur = 0;
  this.a = true;
  this.isFading = false;
  for (var i=0,l=list.length;i<l;i++) {
    var li = document.createElement("li"),
         n = document.createTextNode(i+1);
    li.appendChild(n);
    ul.appendChild(li);
    list[i].style.visibility = "hidden";
    list[i].style.zoom = 1;
  };
  ul.setAttribute("class","nav");
  ct.getElementsByTagName("dd")[0].appendChild(ul);
  var btn = this.btn = ul.children;
  for (var j=0;j<l;j++) {
    (function(arg){
      btn[arg].onmouseover = function() { 
        that.click(arg);
        return false; 
      };
    })(j)
  }
  this.auto();
};
Fader.prototype = {
  auto : function() {
    var that = this,next,l = this.list.length;
    function autoLoop(){
      next = ( that.cur >= l-1 ) ? 0 : that.cur + 1;
      //if(that.isFading == false) {
        that.animate( that.cur, next );
      //}
      var lp = setTimeout(autoLoop,3000);
      that.ct.onmouseover = function(){clearTimeout(lp)}
      that.ct.onmouseout = function(){lp = setTimeout(autoLoop,3000)}
    };
    autoLoop();
  },
  click: function(next) {
    if (next != this.cur) {
      this.animate(this.cur, next);
    }
  },
  animate : function(cur, next) {
    if ( this.isFading !== false ) {
      this.list[this.isFading].style.opacity = 0;
      this.list[this.isFading].style.filter = 'alpha(opacity=0)';
    }
    this.list[next].style.visibility = "visible";
    this.isFading = cur;
    this.btn[cur].className = " ";
    this.btn[next].className = "on";
    var i = 0, that = this;
    clearInterval(this.lp);
    function loop(){
      that.list[cur].style.opacity = (100 - i)/100;
      that.list[next].style.opacity = i/100;
      that.list[cur].style.filter = 'alpha(opacity='+(100-i)+')';
      that.list[next].style.filter = 'alpha(opacity='+i+')';
      i++;
      if ( i > 100 ) {
        clearInterval(that.lp);
        that.isFading = false;
        that.list[cur].style.visibility = "hidden";
      }
    };
    this.lp = setInterval(loop, 10);
    this.cur = next;
  }
}
//浮动客服
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
//ft("kefu",400);
//点击关闭
function close(id) {
  if (!document.getElementById(id)) return false;
  var el = document.getElementById(id),
      ele = getByClass(id, "close")[0];
  ele.onclick = function() {
    document.body.removeChild(el);
  }
}
close("kefu");
//roller
var Roller = function(id) {
  if (!document.getElementById(id)) return false;
  var wc = document.getElementById(id);
  this.ul = wc.getElementsByTagName("ul")[0];
  this.li = wc.getElementsByTagName("li");
  this.prev = getByClass(id, "prev")[0];
  this.next = getByClass(id, "next")[0];
  this.init();
}
Roller.prototype = {
  init : function() {
    var ml = parseInt(getStyle(this.li[0], "marginLeft")),
        w = this.w = this.li[0].offsetWidth + 2 * ml,
        l = this.l = this.li.length,
        that = this;
    this.ul.style.width = w * l + "px";
    addEvent(this.prev, "click", function() {
        that.pos(w);
    });
    addEvent(this.next, "click", function() {
        that.pos(-w);
    });
  },
  pos : function(n) {
    var m,
        temp = parseInt(this.ul.style.marginLeft ? this.ul.style.marginLeft : 0),
        that = this,
        timer,
        v;
    m = n > 0 ? ( temp < 0 && temp + n <= 0 ? n : 0 ) : ( temp > this.w * ( 6 - this.l ) && temp + n >= this.w * ( 6 - this.l ) ? n : 0 );
    clearInterval(timer);
    timer = setInterval(function(){ 
      temp = parseInt(that.ul.style.marginLeft ? that.ul.style.marginLeft : 0); 
      v = Math.ceil(Math.abs(m)/10)*(m<0?-1:1);
      if (m != 0) { 
        that.ul.style.marginLeft = temp + v + 'px'; 
      } else { 
        clearInterval(timer); 
      }
      m = m - v
    },10) 
  }
}
//imgZoom
var imgZoom = function(id,options) {
  var ct = this.ct = document.getElementById(id),
      dt = this.dt = ct.getElementsByTagName("dt")[0],
      dd = this.dd = ct.getElementsByTagName("dd")[0],
      ul = this.ul = dd.getElementsByTagName("ul")[0];
  this.img = dt.getElementsByTagName("img")[0];
  this.li = ul.getElementsByTagName("li")[0];
  this.li.w = 2*parseInt(getStyle(this.li,"marginLeft")) + this.li.offsetWidth;
  this.thumb = dd.getElementsByTagName("img"); 
  this.prev = document.getElementById("prev");
  this.next = document.getElementById("next");
  this.setOptions(options);
  this.init();
} 
imgZoom.prototype = { 
  init : function() {
    var o = this;
    var load = function(a) {
      o.ul.style.width = o.ul.getElementsByTagName("li").length * o.li.w + "px";
      addEvent(o.prev,"click",function(){o.tMove(1)});
      addEvent(o.next,"click",function(){o.tMove(-1);});
      o.createView.call(o);
      addEvent(o.img,"mousemove",function(e){o.move(e)}); 
      if(!o.options.viewer) {
        addEvent(o.img,"mouseover",function(){o.viewer.style.display="";o.img.style.cursor = "crosshair";});
        addEvent(o.img,"mouseout",function(){o.viewer.style.display="none";o.img.style.cursor = "default";});
      }
      for (var i=0,l=o.thumb.length;i<l;i++) {
        (function(arg){addEvent(o.thumb[arg],"click",function(){
          var src = o.thumb[arg].src;
              alt = o.getAlt(o.thumb[arg]);
          o.img.src = src;
          o.viewimg.src = alt;
        })})(i)
      }
    };
    if(typeof(document.readyState) == "undefined" || window.opera) {
      var de = document.documentElement || document.body;
      var h = de.scrollHeight;
      var t = setInterval(function() {
                if(h == de.scrollHeight){
                  clearInterval(t);
                  load();         
                } else h = de.scrollHeight;
      },500);
    } else if(document.readyState == "complete") load();
      else addEvent(window,"load",load);
  },
  setOptions : function(options) {
    this.options = {
      mul : 0, // 放大倍数 默认0 不放大
      viewerClass : "",//设置放大窗口className
      viewerMul:1,//放大窗口大小
      viewerPos:{h:10,v:0}//自定义展示层位置,h水平文向，v垂直方向 ,假如水平方向，正数表示右边，负数表示左边
    };
    for(var o in options) {this.options[o] = options[o];}
    this.options.bigImg = this.options.bigImg || this.img.src;
  },
  getPos : function(o) {
    var x = 0, y = 0;
    do {x += o.offsetLeft; y += o.offsetTop;}
    while(o = o.offsetParent);
    return {'x':x,'y':y};
  },
  getSize : function(o) {
    return {w:o.offsetWidth,h:o.offsetHeight};
  },
  getAlt : function(o) {
    var alt = o.getAttribute("alt");
    return alt==""?o.src:alt;
  },
  createView : function() {
    var _is = this.getSize(this.img),
          d = document;
    this.viewer = d.createElement("div");
    this.viewer.className = this.options.viewerClass;
    var alt = this.getAlt(this.img);
    var pos = this.getPos(this.img);

    var t = pos.y + this.options.viewerPos.v;
    if(this.options.viewerPos.v<0) {t -= _is.h*this.options.viewerMul;}
    else if(this.options.viewerPos.v>0) {t += _is.h;}
    else t = pos.y;
      
    var l = pos.x + this.options.viewerPos.h;
    if(this.options.viewerPos.h<0) {l -= _is.w*this.options.viewerMul;}
    else if(this.options.viewerPos.h>0) {l += _is.w;}
    else l = pos.x + _is.w;
    this.viewer.style.cssText="display:none;overflow:hidden;position:absolute;top:"+(t)+"px;left:"+(l)+"px;height:"+_is.h*this.options.viewerMul+"px;width:"+_is.w*this.options.viewerMul+"px";
    d.body.appendChild(this.viewer);
      
    this.viewimg = d.createElement("img");
    this.viewimg.style.cssText = "position:relative;left:-33%;top:-33%; z-index:12;";
    this.viewimg.src = alt;
    if(this.options.mul) {//设置放大倍数
      this.viewimg.style.width = _is.w*this.options.mul +"px";
      this.viewimg.style.height = _is.h*this.options.mul +"px";
    }
    this.viewer.appendChild(this.viewimg);
  },
  move : function(e) {
    if(!this.options.mul)
      this.options.mul = this.viewimg.offsetHeight/this.img.offsetHeight;
    var pos = this.getPos(this.img);
    var l = e.clientX-pos.x+(document.documentElement.scrollLeft || document.body.scrollLeft);//鼠标位置相对于图片左上角的偏移
    var t = e.clientY-pos.y+(document.documentElement.scrollTop || document.body.scrollTop);
    var zs = this.getSize(this.viewer);
    var pl = -l*this.options.mul + zs.w/2;
    var pt = -t*this.options.mul + zs.h/2;
    pl = pl>0?0:pl;
    pt = pt>0?0:pt;

    var vs = this.getSize(this.viewimg);
    pl = Math.max(pl,zs.w-vs.w);
    pt = Math.max(pt,zs.h-vs.h);

    this.viewimg.style.left = pl+"px";
    this.viewimg.style.top = pt+"px";
  },
  tMove : function(i) {
    var m = parseInt(getStyle(this.ul,"marginLeft")),
        w = this.dd.offsetWidth,
        o = (m==0&&i>0)||(m+this.ul.offsetWidth<w&&i<0)?0:i,
        i = 0,
        that = this;
    function loop() {
      if(i<=that.li.w) {
        var lp = setInterval(loop,10);
        that.ul.style.marginLeft = m + i*o + "px";
        i++;
      } else {
        clearTimeout(lp)
      }
    }
    if(o!=0) loop();
  }
}
//setAmout
var setAmount = { 
  min : 1,
  max : 999,
  reg : function(x) { return new RegExp("^[1-9]\\d*$").test(x);},
  getVal : function(obj) { return document.getElementById(obj).value;},
  setVal : function(obj, x) { return document.getElementById(obj).value = x;},
  amount: function(obj,mode) {
    var x = this.getVal(obj);
    if ( this.reg(x) ) {
      if ( mode ) {
        x++;
      } else {x--;} 
    }
    else {
      alert("请输入正确的数量！");
      $(obj).val(1);
      $(obj).focus();
    } 
    return x;                     
  },
  reduce : function(obj) {
    var x = this.amount(obj, false);
    if ( x >= this.min ){
      this.setVal(obj, x);
      //$(obj).val(x);            
    } else {
      alert("商品数量最少为" + this.min);
      //$(obj).val(1);
      this.setVal(obj, 1);
      //$(obj).focus();           
    }
  },
  add : function(obj) {
    var x = this.amount(obj, true);
    if ( x <= this.max ) {
      //$(obj).val(x);
      this.setVal(obj, x);
    } else {
      alert("商品数量最多为" + this.max);
      //$(obj).val(999);
      this.setVal(obj, 999);
      //$(obj).focus();
    }
  },
  modify : function(obj) {
    var x = this.getVal(obj);
    if ( x < this.min || x > this.max || !this.reg(x) ) {
      alert("请输入正确的数量！");
      //$(obj).val(1);
      this.setVal(obj, 1);
      //$(obj).focus();
    }
  }
}  
//标准页侧导航
var stdNav = {
  dtClass : "open",
  dtClick : function(obj) {
    var sibling = obj.nextElementSibling || obj.nextSibling;
    if ( hasClass(obj, this.dtClass) ) {
      removeClass(obj, this.dtClass);
      sibling.style.display = "none";
    } else {
      addClass(obj, this.dtClass);
      sibling.style.display = "block";
    }
  },
  aClick : function(obj) {
    var ul = obj.parentNode.nextElementSibling || obj.parentNode.nextSibling;
    if ( ul.tagName === "UL") {
      if ( getStyle(ul, "display") === "block" ) {
        ul.style.display = "none";
        obj.innerHTML = "+";
      } else {
        ul.style.display = "block";
        obj.innerHTML = "-";
      }
    }
  },
  spanClick : function(obj) {
    var dd = obj.parentNode.nextElementSibling || obj.parentNode.nextSibling;
    if ( getStyle(dd, "display") === "block" ) {
      dd.style.display = "none";
      obj.innerHTML = "+";
    } else {
      dd.style.display = "block";
      obj.innerHTML = "-";
    }
  }
}
//调整字体大小
var act = {
  modify : function(id, size) {
    var ctt = document.getElementById(id).children,
          l = ctt.length,
          i;
    for (i = 1;i < l;i++) {
      ctt[i].style.fontSize = size + "px";
    }
  },
  toTop : function(){
    window.scrollTo(0,0);
  }
}
//allsort 判断添加class "blue"和左右等高
function allsort(id) {
  var ct = document.getElementById(id),
   subCt = getByClass(id, "tabc"),
   l = subCt.length, i, dl = [], k;
   for (i = 0;i < l;i++) {
     dl[i] = subCt[i].getElementsByTagName("dl");
     for (j = 0, k = dl[i].length;j < Math.ceil(k/2);j++) {
       if (j%2 == 1) {
         addClass(dl[i][j*2], "blue");
         addClass(dl[i][j*2+1], "blue");
       }
       if (!dl[i][j*2+1]) continue;
       dl[i][j*2].offsetHeight >= dl[i][j*2+1].offsetHeight ? dl[i][j*2+1].style.height = dl[i][j*2].offsetHeight - 15 + "px" : dl[i][j*2].style.height = dl[i][j*2+1].offsetHeight - 15 + "px";
     }
   }
}
//左右等高
function equalHeight(el1, el2, el1Extra, el2Extra) {
  var el1 = document.getElementById(el1),
      el2 = document.getElementById(el2),
      h1 = el1.offsetHeight,
      h2 = el2.offsetHeight;
  h1 > h2 ? (el2.style.height = h1 - (el2Extra || 0) + "px") : (el1.style.height = h2 - (el1Extra || 0) + "px");
}

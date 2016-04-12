/**
 * Created by youngrivers on 2016/4/12.
 */
(function(){
//封装class函数
    function getByClass(clsName,parent){
        //定义父元素
        var oParent=parent?document.getElementById(parent):document,
            eles=[],
            //获取父元素的所有标签
            elements=oParent.getElementsByTagName("*");
        for(var i=0;i<elements.length;i++){
            if(elements[i].className==clsName){
                //获取标签
                eles.push(elements[i]);
            }
        }
        return eles;
    }
    window.onload=drag;
    function drag(){
        var header=getByClass("header")[0];
            //拖曳窗口函数
            header.onmousedown=fnDown;
            //关闭,class不能实现
        var close=document.getElementById("header-1");
        close.onclick=function(){
            document.getElementById("main").style.display="none";
        };
        //切换状态
        var oChange=document.getElementById("event-1-1"),
            oList=document.getElementsByTagName("li");
        oChange.onclick=function(){
            document.getElementById("condition").style.display="block";
        };
        //鼠标滑过，离开，点击
        for(var i=0;i<oList.length;i++){
            oList[i].onmouseover=function(){
                this.style.background="#567";
            };
            oList[i].onmouseout=function(){
                this.style.background="#fff";
            };
            oList[i].onclick=function(){
                var className=this.id;
                //console.log(className);
                document.getElementById("condition").style.display="none";
                document.getElementById("event-1-1").className="";
                document.getElementById("event-1-1").className="event-1-1 "+className;
            }
        }
    }
    //鼠标按下
    function fnDown(event ){
        //获取窗口
        var oMain=getByClass("main")[0];
        //浏览器兼容
        event=event||window.event;
        //光标按下时光标和面板的距离
        var disX=event.clientX-oMain.offsetLeft,
            disY=event.clientY-oMain.offsetTop;
        document.onmousemove=function(event){
            event=event||window.event;
            fnMove(event,disX,disY);
        };
        document.onmouseup=function(){
            //DOM 0级处理事件
            document.onmousemove=null;
        }
    }
    function fnMove(e,posX,posY){
        var oMain=getByClass("main")[0];
        var l= e.clientX-posX,
            t= e.clientY-posY,
            winW=document.documentElement.clientWidth||document.body.clientWidth,
            winH=document.documentElement.clientHeight||document.body.clientHeight,
            maxW=winW-oMain.offsetWidth,
            maxH=winH-oMain.offsetHeight;
        if(l<0){
            l=0;
        }else if(l>maxW){
            l=maxW;
        }
        if(t<0){
            t=0;
        }else if(t>maxH){
            t=maxH;
        }
        oMain.style.left=l+"px";
        oMain.style.top=t+"px";
    }
})();
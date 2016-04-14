/**
 * Created by youngrivers on 2016/4/14.
 */
var box=document.getElementById("cBox");
var con1=document.getElementById("con1");
var con2=document.getElementById("con2");
var move2=document.getElementById("move2");
box.scrollTop=0;
con2.innerHTML=con1.innerHTML;
//var scroll=setInterval("scrollUp()",50);
function scrollUp(){
    if(box.scrollTop>=con1.scrollHeight){
        box.scrollTop=0;
    }
    else{
        box.scrollTop++;
    }
}
box.onmouseover=function(){
    clearInterval(scroll);
};
box.onmouseout=function(){
    scroll=setInterval("scrollUp()",50);
};
//间隙循环滚动
var liHeight=36;//单次滚动高度
move1.onclick=function(){
    scroll=setInterval("scrollUp()",50);
};
move2.onclick=function(){
    startMove();
};
var time;
function startMove(){
    box.scrollTop++;
    time=setInterval(function(){
        if(box.scrollTop%liHeight==0){
            clearInterval(time);
            setTimeout("startMove()",2000);
        }
            else{
            box.scrollTop++;
            if(box.scrollTop>=con1.scrollHeight){
                box.scrollTop=0;
            }
        }
    },50);
}
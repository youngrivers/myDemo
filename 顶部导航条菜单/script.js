/**
 * Created by youngrivers on 2016/4/15.
 */
var header2=document.getElementById("header-2");
var header3=document.getElementById("header-3");
var details1=document.getElementById("details-1");
var details2=document.getElementById("details-2");
var timer=null;
header2.onmouseover=function(){
    move(details1,16);
};
details1.onmouseover=function(){
    move(details1,16);
};
details1.onmouseout=function(){
    moveBack(details1,-16);
};

header3.onmouseover=function(){
    move(details2,16);
};
details2.onmouseover=function(){
    move(details2,16);
};
details2.onmouseout=function(){
    moveBack(details2,-16);
};

function move(xDiv,speed){
    clearInterval(timer);
    timer=setInterval(function(){
        xDiv.style.height=xDiv.offsetHeight+speed+"px";
        if(xDiv.offsetHeight>=300){
            clearInterval(timer);
        }
    },30);
}
function moveBack(xDiv,speed){
    clearInterval(timer);
    timer=setInterval(function(){
        xDiv.style.height=xDiv.offsetHeight+speed+"px";
        if(xDiv.offsetHeight<=0){
            clearInterval(timer);
        }
    },30);
}
//details1.scrollTop=0;
//header2.onmouseover=function(){
//    details1.style.display="block";
//    scroll=setInterval(details1.scrollTop++,50);
//};
//details1.onmouseover=function(){
//    details1.style.display="block";
//};
//details1.onmouseout=function(){
//    details1.style.display="none";
//};
//
//header3.onmouseover=function(){
//    details2.style.display="block";
//};
//details2.onmouseover=function(){
//    details2.style.display="block";
//};
//details2.onmouseout=function(){
//    details2.style.display="none";
//};
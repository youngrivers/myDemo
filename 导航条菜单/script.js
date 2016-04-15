/**
 * Created by youngrivers on 2016/4/15.
 */
var header2=document.getElementById("header-2");
var header3=document.getElementById("header-3");
var details1=document.getElementById("details-1");
var details2=document.getElementById("details-2");
//setInterval(function(){
//    if(header2.onmouseout=true){
//        details.style.display="none";
//    }
//    else{
//        details.style.display="block";
//    }
//},50);
details1.scrollTop=0;
header2.onmouseover=function(){
    details1.style.display="block";
    scroll=setInterval(details1.scrollTop++,50);
};
details1.onmouseover=function(){
    details1.style.display="block";
};
//header2.onmouseout=function(){
//    details1.style.display="none";
//};
details1.onmouseout=function(){
    details1.style.display="none";
};


header3.onmouseover=function(){
    details2.style.display="block";
};
details2.onmouseover=function(){
    details2.style.display="block";
};
details2.onmouseout=function(){
    details2.style.display="none";
};
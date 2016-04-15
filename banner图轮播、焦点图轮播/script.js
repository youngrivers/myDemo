/**
 * Created by youngrivers on 2016/4/15.
 */
var banner=document.getElementById("banner");
var img=document.getElementById("bannerImg").getElementsByTagName("li");
var list=document.getElementById("bannerList").getElementsByTagName("li");
var index=0;//定义角标
var timer=null;//初始化
//定义并调用自动banner函数
timer=setInterval(change,2000);
//外置判断函数
function change() {
    if (index >= img.length - 1) {
        index = 0;
    }
    else {
        index++;
    }
    move(index);
}
//banner函数
function move(x){
    for(var i=0;i<img.length;i++){
        img[i].style.display="none";
        list[i].className="";
    }
    img[x].style.display="block";
    list[x].className="on";
}
banner.onmouseover=function(){
    clearInterval(timer);
};
banner.onmouseout=function(){
    timer=setInterval(change,2000);
};
//数字导航
for(var i=0;i<list.length;i++){
    list[i].onmouseover=function(){
        clearInterval(timer);
        index=this.innerText-1;
        move(index);
    }
}
/**
 * Created by youngrivers on 2016/4/13.
 */
var text1=document.getElementById("text1");
var text2=document.getElementById("text2");
var text3=document.getElementById("text3");
var text4=document.getElementById("text4");
var btn1=document.getElementById("btn1");
var btn2=document.getElementById("btn2");
var box=document.getElementById("box");
var redBall=document.getElementById("redBall");
var blueBall=document.getElementById("blueBall");
var Ball=document.getElementById("ball");
var oLi=document.getElementsByTagName("li");
console.log(oLi.length);
function oNum(count,max){
    var num=[];
    if(text2.value==0){
        for(var i=0;i<count;i++){
            num[i]=Math.round(Math.random()*max);
        }
    }
    return num;
}
btn1.onclick=function(){
    box.innerHTML=oNum(text1.value,text3.value);
};
//双色球
btn2.onclick=function(){
    Ball.innerText="红球："+red()+"蓝球："+blue();
    if(text4.value>1){
        for(var i=0;i<text4.value;i++){
            oLi[i].innerText="红球："+red()+"蓝球："+blue();
        }
    }
};
function blue(){
    var blueCount=[];
    for(var i=0;i<1;i++){
        blueCount[i]=Math.round(Math.random()*15+1);
    }
    return blueCount;
}
function red(){
    var redCount=[];
    for(var i=0;i<6;i++){
        redCount[i]=Math.round(Math.random()*32+1);
        //判断是否重复
        if(i>0){
            for(var j=0;j<i;j++){
                if(redCount[i]==redCount[j]){
                    redCount[i]=Math.round(Math.random()*32+1);
                }
            }
        }
    }
    return redCount;
}
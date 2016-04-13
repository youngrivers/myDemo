/**
 * Created by youngrivers on 2016/4/13.
 */
var text1=document.getElementById("text1");
var text2=document.getElementById("text2");
var text3=document.getElementById("text3");
var btn=document.getElementById("btn");
var box=document.getElementById("box");
function oNum(count,max){
    var num=[];
    if(text2.value==0){
        for(var i=0;i<count;i++){
            num[i]=Math.round(Math.random()*max);
        }
    }
    return num;
}
btn.onclick=function(){
    box.innerHTML=oNum(text1.value,text3.value);
};
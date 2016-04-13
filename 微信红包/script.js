/**
 * Created by youngrivers on 2016/4/13.
 */
var text1=document.getElementById("text1");
var text2=document.getElementById("text2");
var text3=document.getElementById("text3");
var btn=document.getElementById("btn");
var box=document.getElementById("box");
var header=document.getElementById("header");
var num=document.getElementById("num");
function oNum(count,all){
    var arr=[];
    for(var i=0;i<count;i++){
        var oRandom=Math.floor(Math.random()*(all*2/count)*100);
        arr[i]=oRandom/100;//此处用*0.01会出错
    }
    return arr;
}
btn.onclick=function(){
    box.style.display="block";
    if(!text3.value==""){
        header.innerHTML=text3.value;
    }else{
        header.innerHTML="恭喜发财，大吉大利！";
    }
    //var x=oNum(text1.value,text2.value);
    //console.log(x);
    //for(var i=0;i<text1.value;i++){
    //    num.write=x[i]+"<br>"
    //}
    num.innerHTML=oNum(text1.value,text2.value);
};
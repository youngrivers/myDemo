/**
 * Created by youngrivers on 2016/4/13.
 */
window.onload=function(){
    showTime();
};
function checkTime(i){  //补0处理
    if(i<10){
        i="0"+i;
    }
    else{
        return i;
    }
    return i;
}
var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
function showTime(){
    var now=new Date();
    var h=now.getHours();
    var m=now.getMinutes();
    var s=now.getSeconds();
    var year=now.getFullYear();
    var month=now.getMonth();
    var d=now.getDate();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById("oDay1").innerHTML=h+":"+m;
    document.getElementById("oDay2").innerHTML=s;
    document.getElementById("oYear1").innerHTML=weekday[now.getDay()];
    document.getElementById("oYear2").innerHTML=""+year+"年"+month+"月"+d+"日 ";
    //倒计时
    var endTime=new Date("2016/6/7,09:00:00");
    var leftTime=parseInt((endTime.getTime()-now.getTime())/1000),
        day=parseInt(leftTime/(24*60*60)),
        hour=parseInt((leftTime/(60*60))%24),
        minute=parseInt((leftTime/60)%60),
        second=parseInt(leftTime%60);
    document.getElementById("gaoKao").innerHTML=day+"天"+hour+"小时"+minute+"分"+second+"秒";
    var t=setTimeout('showTime()',500);
}
/**
 * Created by youngrivers on 2016/4/16.
 */
var canvas=document.getElementById("clock");
var cxt=canvas.getContext("2d");//创建画布
function drawClock(){
    var now = new Date();
    var s = now.getSeconds()+1;
    var m = now.getMinutes();
    var h = now.getHours();
    h=h > 12 ? h - 12 : h;

    //画大圆
    cxt.strokeStyle="red";
    cxt.lineWidth=2;
    cxt.beginPath();
    cxt.arc(425,73, 50, 0, Math.PI*2);
    cxt.closePath();
    cxt.stroke();
    //画时针
    for(var i=0;i<12;i++){
        cxt.save();//保存当前状态
        cxt.strokeStyle="white";//设置时针的颜色
        cxt.lineWidth=3;//设置时针的宽度
        cxt.translate(425,73);//设置原点
        cxt.rotate(30*i*Math.PI/180);//设置旋转的弧度

        cxt.beginPath();
        cxt.moveTo(0,-95);//指定开始点--相对设置圆心的值
        cxt.lineTo(0,-99);//指定结束点
        cxt.stroke();
        cxt.closePath();

        cxt.restore();//恢复原来的状态
    }
}
drawClock();
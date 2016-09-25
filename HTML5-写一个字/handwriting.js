/**
 * Created by youngrivers on 2016/9/25.
 */
var canvaswidth=Math.min(800,$(window).width()-20),
    canvasHeight=canvaswidth,
    isMouseDown=false,
    strokeColor='black';

var lastLoc={x:0,y:0},
    lastTime=0,
    lastLineWidth=-1;
var canvas=document.getElementById("canvas"),
    context=canvas.getContext('2d');
canvas.width=canvaswidth;
canvas.height=canvasHeight;
$("#controller").css('width',canvaswidth+'px');
drawGrid();
//清除事件
$('#clear-btn').click(
    function (e) {
        context.clearRect(0,0,canvaswidth,canvasHeight);
        drawGrid();
    }
);
//颜色选择事件
$('.color-btn').click(
    function (e) {
        $('.color-btn').removeClass("btn-selected");
        $(this).addClass("btn-selected");
        strokeColor=$(this).css("background-color");
    }
);
canvas.onmousedown=function (e) {
    e=e||window.event;
    e.preventDefault();//阻止event默认事件
    beginStroke({x:e.offsetX,y:e.offsetY});
};
canvas.onmouseup=function (e) {
    e=e||window.event;
    e.preventDefault();
    endStroke();
};
canvas.onmouseout=function (e) {
    e=e||window.event;
    e.preventDefault();
    endStroke();
};
canvas.onmousemove=function (e) {
    e=e||window.event;
    e.preventDefault();
    if(isMouseDown){
        //draw
        moveStroke({x:e.offsetX,y:e.offsetY});
    }
};
//移动设备端适配
canvas.addEventListener('touchstart',function (e) {
    e=e||window.event;
    e.preventDefault();
    touch=e.touches[0];//避免多点触控
    beginStroke({x:touch.pageX,y:touch.pageY});
});
canvas.addEventListener('touchmove',function (e) {
    e=e||window.event;
    e.preventDefault();
    if(isMouseDown){
        touch=e.touches[0];
        moveStroke({x:touch.pageX,y:touch.pageY});
    }
});
canvas.addEventListener('touchend',function (e) {
    e=e||window.event;
    e.preventDefault();
    endStroke();
});
//笔画宽度变化函数
function ctxLineWidth(t, s) {
    var resultLineWidth,
        maxWidth=30,
        minWidth=1,
        maxSpeed=10,
        minSpeed=0.1,
        v=s/t;
    if(v<minSpeed){
        resultLineWidth=maxWidth;
    }else if(v>maxSpeed){
        resultLineWidth=minWidth;
    }else {
        resultLineWidth=maxWidth-(v-minSpeed)/(maxSpeed-minSpeed)*(maxWidth-minWidth);
    }
    return resultLineWidth*2/3+lastLineWidth/3;
}
//绘制背景函数
function drawGrid() {
    context.save();//闭包状态设置
    context.strokeStyle = "rgb(230,11,9)";

    context.beginPath();
    context.moveTo(3, 3);
    context.lineTo(canvaswidth - 3, 3);
    context.lineTo(canvaswidth - 3, canvasHeight - 3);
    context.lineTo(3, canvasHeight - 3);
    context.closePath();
    context.lineWidth = 6;
    context.stroke();

//绘制米字格
    context.beginPath();
    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvaswidth, canvasHeight / 2);
    context.moveTo(canvaswidth / 2, 0);
    context.lineTo(canvaswidth / 2, canvasHeight);
    context.lineWidth = 1;
    context.stroke();

    //画虚线
    context.setLineDash([2,11]);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvaswidth, canvasHeight);
    context.moveTo(canvaswidth, 0);
    context.lineTo(0, canvasHeight);
    context.stroke();

    context.restore();//闭包
}
//开始点
function beginStroke(point) {
    isMouseDown=true;
    lastLoc=canvasPoint(point.x,point.y);
    lastTime=new Date().getTime();
}
//结束点
function endStroke() {
    isMouseDown=false;
}
//鼠标点坐标
function canvasPoint(x, y) {
    return{
        x:x,
        y:y
    }
}
//两点距离函数
function ctxDistance(l1, l2) {
    return Math.sqrt((l1.x-l2.x)*(l1.x-l2.x)+(l1.y-l2.y)*(l1.y-l2.y));//求平方根
}
//画笔函数
function moveStroke(point) {
    var ctxLoc=canvasPoint(point.x,point.y);
    var ctxTime=new Date().getTime();
    var t=ctxTime-lastTime,
        s=ctxDistance(ctxLoc,lastLoc);
    var lineWidth=ctxLineWidth(t,s);
    context.beginPath();
    context.moveTo(lastLoc.x,lastLoc.y);
    context.lineTo(ctxLoc.x,ctxLoc.y);
    context.strokeStyle=strokeColor;
    context.lineWidth=lineWidth;
    context.lineCap="round";//增加平滑度
    context.lineJoin="round";
    context.stroke();
    lastLoc=ctxLoc;
    lastTime=ctxTime;
    lastLineWidth=lineWidth;
}

/**
 * Created by youngrivers on 2017/5/27.
 */
var time=document.getElementById("time"),
    c=document.getElementById("canvas"),
    ctx=c.getContext("2d"),
    timeDat=['上午','下午'],
    timeDa,
    width=ctx.canvas.width,
    height=ctx.canvas.height,
    r=width/2,
    rem = width/200;//随动比例

if(new Date().getHours()>=12){
    timeDa=timeDat[1];
}
else {
    timeDa=timeDat[0];
}
time.innerHTML=new Date().getFullYear()+"年"+(new Date().getMonth()+1)+"月"+new Date().getDate()+"日"+timeDa;
//画时钟
/*ctx.fillStyle="#ffb3e4";
ctx.beginPath();
ctx.arc(r,r,r,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();//填充定义的路径*/
//画外圆
function drawBackground() {
    ctx.save();
    ctx.translate(r,r);//重新定义原点
    ctx.strokeStyle="#b8e9ff";//路径颜色
    ctx.beginPath();
    ctx.lineWidth=10*rem;
    ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,true);//true逆时针
    ctx.closePath();
    ctx.stroke();//绘制已定义的路径
    //绘制数字
    var num=[3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font="18px Arial";
    ctx.textAlign="center";//竖直居中
    ctx.textBaseline="middle";//水平对准基线
    num.forEach(function (number, i) {
        var rad=2*Math.PI/12*i,
            x=Math.cos(rad)*(r-25*rem),
            y=Math.sin(rad)*(r-25*rem);
        ctx.fillText(number,x,y);
    });
    for(var i=0;i<60;i++){
        var rad=2*Math.PI/60*i,
            x=Math.cos(rad)*(r-18*rem),
            y=Math.sin(rad)*(r-18*rem);
        ctx.beginPath();
        if(i%5===0){
            ctx.fillStyle="#000";
            ctx.arc(x,y,2*rem,0,2*Math.PI,true);
        }else {
            ctx.fillStyle="#b7ffad";
            ctx.arc(x,y,2*rem,0,2*Math.PI,true);
        }
        ctx.closePath();
        ctx.fill();
    }
}
//绘制指针
function drawHour(hour,minutes) {
    ctx.save();//保存当前环境
    ctx.beginPath();
    ctx.lineCap='round';
    ctx.strokeStyle='#20171b';
    var rad=2*Math.PI/12*hour;
    var mrad=2*Math.PI/12/60*minutes;
    ctx.rotate(rad+mrad);
    ctx.lineWidth=6*rem;
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r/2+10*rem);
    ctx.stroke();
    ctx.restore();//返回之前环境
}
function drawMinutes(minutes) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle='#c37dff';
    var rad=2*Math.PI/60*minutes;
    ctx.rotate(rad);
    ctx.lineWidth=4*rem;
    ctx.lineCap='square';
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r/2-20*rem);
    ctx.stroke();
    ctx.restore();
}
function drawSeconds(seconds) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle='#ff4955';
    var rad=2*Math.PI/60*seconds;
    ctx.rotate(rad);
    ctx.lineWidth=2*rem;
    ctx.moveTo(-2 * rem,20 * rem);//把路径移动到画布中的指定点，不创建线条
    ctx.lineTo(2 * rem,20 * rem);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
    ctx.lineTo(1,-r + 18 * rem);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
    ctx.lineTo(-1,-r + 18 * rem);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle='#fff';
    ctx.arc(0,0,3*rem,0,2*Math.PI,true);
    ctx.closePath();
    ctx.fill()
}
function draw() {
    ctx.clearRect(0,0,width,height);
    var now=new Date(),
        hour=now.getHours(),
        minute=now.getMinutes(),
        second=now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinutes(minute);
    drawSeconds(second);
    drawDot();
    ctx.restore();
}
draw();
setInterval(function () {
    draw();
},1000);
/**
 * Created by youngrivers on 2016/4/13.
 */
var pic1=document.getElementById("pic-1");
var pic2=document.getElementById("pic-2");
var pic3=document.getElementById("pic-3");
window.onload=function(){
    pic1.onmouseover=function(){
        //鼠标移入
        move(5,document.documentElement.clientWidth-120);
        //event.stopPropagation();
    };
    pic1.onmouseout=function(){
        //鼠标移出
        move1(-110);
    };
    pic2.onmouseover=function(){
        pic2.style.opacity=1;
    };
    pic2.onmouseout=function(){
        pic2.style.opacity=0.3;
    };
    pic3.onmouseover=function(){
        xMove(pic3,"width",400,function(){
            xMove(pic3,"height",200,function(){
               xMove(pic3,"opacity",100);
            });
        });
    };
    pic3.onmouseout=function(){
        xMove(pic3,"opacity",30,function(){
            xMove(pic3,"height",100,function(){
                xMove(pic3,"width",200);
            });
        });
    }
};
var timer=null;
function move(speed,site){
    clearInterval(timer);//清除函数内部的重复调用
    timer=setInterval(function(){
        if(pic1.offsetLeft>=site){
            clearInterval(timer);
        }else{
            pic1.style.left=pic1.offsetLeft+speed+"px";
        }
    },30)
}
//采用封装的函数
function move1(site){
    clearInterval(timer);
    timer=setInterval(function(){
        var speed=(site-pic1.offsetLeft)/20;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        if(pic1.offsetLeft<=site){
            clearInterval(timer);
        }else{
            pic1.style.left=pic1.offsetLeft+speed+"px";
        }
    },30)
}
//多运动运动框架
function xMove(obj,json,fn){
    var flag=true;//标志所有运动是否达到目标值
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        for(var attr in json){
            //取当前的值
            var curr=0;
            //判断是否为透明度
            if(attr=="opacity"){
                curr=Math.round(parseFloat(getStyle(obj,attr))*100);
            }
            else{
                curr=parseInt(getStyle(obj,attr));
            }
            //速度处理
            var speed=(json[attr]-curr)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            //检测停止
            if(curr!==json[attr]){
                flag=false;
            }
            else{
                if(attr=="opacity"){
                    obj.style.filter="alpha:(opacity:"+curr+speed+")";
                    obj.style.opacity=(curr+speed)/100;
                }
                else{
                    obj.style[attr]=curr+speed+"px";
                }
            }
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },30);
}
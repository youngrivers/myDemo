/**
 * Created by youngrivers on 2016/4/12.
 */
window.onload=function(){
    waterfall("main","box");
};
function waterfall(parent,box){
    //将main下所有的class为box的元素取出来
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);
    //计算整个页面显示的列数
    var oBoxW=oBoxs[i].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽度
    //document.getElementsByClassName("main").style.cssText="width:"+oBoxs*cols+"px;margin:0 auto";
    //document.getElementsByClassName("main").style.margin="0 auto";
    var colH=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            colH.push(oBoxs[i].offsetHeight);//将图片的高度值添加到数组中
        }
        else{
            //求最小值和最小值的索引
            var minH=Math.min.apply(null,colH);
            var index=getMinhIndex(colH,minH);
            //计算及定义图片出现的位置
            oBoxs[i].style.position="absolute";
            oBoxs[i].style.top=minH+"px";
            oBoxs[i].style.left=oBoxs[index].offsetLeft+"px";
            //改变数组值
            colH[index]=minH+oBoxs[index].offsetHeight;
        }
    }
}
//根据class获取元素
function getByClass(parent,clsName){
    var boxArr=[],//存储所有box元素
        oElenments=parent.getElementsByTagName("*");
    for(var i=0;i<oElenments.length;i++){
        if(oElenments[i].className==clsName){
            boxArr.push(oElenments[i]);
        }
    }
    return boxArr;
}
//求值在数组中的索引，arr接收的是数组，val接收的是判断的值
function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val)
            return i;

    }
}
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
    var oBoxW=oBoxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    console.log(cols);
    //设置main的宽度
    document.getElementsByClassName("main").style.cssText="width:"+oBoxs*cols+"px;margin:0 auto";
    document.getElementsByClassName("main").style.margin="0 auto";
}
//根据class获取元素
function getByClass(parent,clsName){
    var boxArr=[],//存储所有box元素
        oElenments=parent.getElementsByTagName("*");
    for(var i=0;i<oElenments.length;i++){
        console.log(oElenments.length);
        if(oElenments[i].className==clsName){
            boxArr.push(oElenments[i]);
        }
    }
    return boxArr;
}
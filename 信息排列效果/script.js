/**
 * Created by youngrivers on 2016/4/13.
 */
window.onload=function(){
    var header=document.getElementById("header");
    var oLi=header.getElementsByTagName("li");
    var news=document.getElementById("news");
    var oDiv=news.getElementsByTagName("div");
    for(var i=0;i<oLi.length;i++){
        oLi[i].index=i;
        oLi[i].onmouseover=function(){
            for(var j=0;j<oLi.length;j++){
                oLi[j].className="off";
                oDiv[j].className="hide";
            }
            this.className="on";
            oDiv[this.index].className="";
        }
    }
};
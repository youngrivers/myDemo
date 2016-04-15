/**
 * Created by youngrivers on 2016/4/13.
 */
window.onload = function () {
    var oLi=document.getElementsByTagName("li");
    for(var i= 0;i<oLi.length;i++){
        oLi[i].onmouseover=function(){
            this.className="lihover";
        };
        oLi[i].onmouseout=function(){
            this.className="";
        }
    }
};
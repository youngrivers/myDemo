/**
 * Created by youngrivers on 2016/9/23.
 */
window.onload=function () {
    var objDemo = document.getElementById("demo");
    var objSmallBox = document.getElementById("small-box");
    var objMark = document.getElementById("mark");
    var objFloatBox = document.getElementById("float-box");
    var objBigBox = document.getElementById("big-box");
    var objBigBoxImage = objBigBox.getElementsByTagName("img")[0];
    objMark.onmouseover = function () {
        objBigBox.style.display = "block";
    };

    objMark.onmouseout = function () {
        objBigBox.style.display = "none";
    };
    objMark.onmousemove = function (ev) {
        var _event = ev || window.event;  //兼容多个浏览器的event参数模式
        /*
        *event.clientX  鼠标相对于浏览器可视区域X值
        *offsetX  当前对象鼠标相对于父元素X值
        *offsetLeft  对象左边界到父元素左边界的距离
        *offsetWidth  对象的宽度
        * */
        //float-box左边框与small-box左边框的距离
        var left = _event.clientX - objDemo.offsetLeft - objSmallBox.offsetLeft - objFloatBox.offsetWidth / 2;
        //float-box上边框与small-box上边框的距离
        var top = _event.clientY - objDemo.offsetTop - objSmallBox.offsetTop - objFloatBox.offsetHeight / 2;
        if (left < 0) {//防止子元素脱离边界   一左一右的脱离判断
            left = 0;
        } else if (left > (objMark.offsetWidth - objFloatBox.offsetWidth)) {
            left = objMark.offsetWidth - objFloatBox.offsetWidth;
        }

        if (top < 0) {
            top = 0;
        } else if (top > (objMark.offsetHeight - objFloatBox.offsetHeight)) {
            top = objMark.offsetHeight - objFloatBox.offsetHeight;

        }
        objFloatBox.style.left = left + "px";   //oSmall.offsetLeft的值是相对什么而言
        objFloatBox.style.top = top + "px";
        //进行对应比例换算
        var percentX = left / (objMark.offsetWidth - objFloatBox.offsetWidth);
        var percentY = top / (objMark.offsetHeight - objFloatBox.offsetHeight);

        objBigBoxImage.style.left = -percentX * (objBigBoxImage.offsetWidth - objBigBox.offsetWidth) + "px";
        objBigBoxImage.style.top = -percentY * (objBigBoxImage.offsetHeight - objBigBox.offsetHeight) + "px";
    }
};
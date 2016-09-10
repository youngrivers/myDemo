/**
 * Created by youngrivers on 2016/9/11.
 */
define(['jquery'],function ($) {
    function window() {
        this.cfg={
            width:500,
            height:300
        };
    }
    window.prototype={
        alert:function (content,handler) {
            var boundingBox=$('<div class="window_boundingBox"></div>');
            boundingBox.appendTo("body");
            boundingBox.html(content);

            var btn=$('<input type="button" value="确定">');
            btn.appendTo(boundingBox);
            btn.click(function () {
                handler && handler();
                boundingBox.remove();
            });
        },
        confirm:function () {

        },
        prompt:function () {

        }
    };
    return{
        window:window
    }
});
/**
 * Created by youngrivers on 2016/9/11.
 */
require.config({
    paths:{
        jquery:'jquery-1.12.3.min'
    }
});
require(['jquery','window'],function ($,w) {
    $("#a").click(function () {
        new w.window().alert("welcome!",function () {
            alert("you click the button");
        });
    });
});
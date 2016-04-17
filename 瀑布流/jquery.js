/**
 * Created by youngrivers on 2016/4/17.
 */
$(window).on("load",function(){
    waterfall();
});
function waterfall(){
    var $box=$("#main>div");
    var w=$box.eq(0).outerWidth();
    var cols=Math.floor($(window).width()/w);
    $("#main").width(w*cols).css("margin","0 auto");
    var hArr=[];
    $box.each(function(index,value){
        var h=$box.eq(index).outerHeight();
        if(index<cols){
            hArr[index]=h;
        }
        else{
            var minH=Math.min.apply(null,hArr);
            var minHIndex= $.inArray(minH,hArr);
            $(value).css({
                "position":"absolute",
                "top":minH+"px",
                "left":minHIndex*w+"px"
            });
            hArr[minHIndex]+=$box.eq(index).outerHeight;
        }
    })
}
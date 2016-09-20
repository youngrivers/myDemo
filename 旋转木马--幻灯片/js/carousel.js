/**
 * Created by youngrivers on 2016/9/20.
 */
;(function ($) {
    //用原型方式创建对象
    var Carousel=function (poster) {
        //保存单个旋转木马对象
        var self=this;
        this.poster=poster;
        this.posterItemMain=poster.find("ul.post-list");
        this.prevBtn=poster.find("div.poster-prev-btn");
        this.nextBtn=poster.find("div.poster-next-btn");
        //this.posterFirstItem=this.posterItemMain.find("li").eq(0);
        this.posterItems=poster.find("li.poster-item");
        //偶数帧画面解决
        if(this.posterItems.size()%2==0){
            this.posterItemMain.append(this.posterItems.eq(0).clone());
            this.posterItems = this.posterItemMain.children();
        };
        this.posterFirstItem=this.posterItems.eq(0);
        this.posterLastItem=this.posterItems.last();
        this.rotateFlag=true;//设置旋转标志，当上一步执行完才能执行下一步
        console.log(this);
        //默认配置参数
        this.setting={
            "width":1000,
            "height":270,
            "posterWidth":640,
            "posterHeight":270,
            "scale":0.9,   //记录左右显示比例
            "speed":500,
            "autoPlay":"true",
            "delay":3000,
            "verticalAlign":"middle"
        };
        $.extend(this.setting,this.getSetting());
        //设置配置参数值
        this.setSettingValue();
        this.setPosterPos();
        this.nextBtn.click(function () {
            if(self.rotateFlag){
                self.rotateFlag=false;
                self.carouselRotate("left");
            }
            //console.log(this);
        });
        this.prevBtn.click(function () {
            if(self.rotateFlag){
                self.rotateFlag=false;
                self.carouselRotate("right");
            }
        });
        //是否开启自动播放
        if(this.setting.autoPlay){
            this.autoPlay();
            this.poster.hover(function () {
                window.clearInterval(self.timer);
            },function () {
                self.autoPlay();
            });
        }
    };
    Carousel.prototype={
        //设置自动播放函数
        autoPlay:function () {
            var self=this;
            this.timer=window.setInterval(function () {
                self.nextBtn.click();
            },this.setting.delay)
        },
        //设置旋转函数
        carouselRotate:function (dir) {
            var _this_=this;
            var zIndexArr=[];
            if(dir==="left"){//左旋转
                this.posterItems.each(function () {
                    //console.log(this);
                    //console.log(self);
                    var self=$(this),
                        prev=self.prev().get(0)?self.prev():_this_.posterLastItem,
                        width=prev.width(),
                        height=prev.height(),
                        zIndex=prev.css("zIndex"),
                        opacity=prev.css("opacity"),
                        left=prev.css("left"),
                        top=prev.css("top");
                    zIndexArr.push(zIndex);
                    //console.log(zIndexArr);
                    self.animate({
                        width:width,
                        height:height,
                        //zIndex:zIndex,
                        opacity:opacity,
                        left:left,
                        top:top
                    },_this_.setting.speed,function () {
                        _this_.rotateFlag=true;
                    });
                });
                /*for(var i=0;i<zIndexArr.length;i++){
                    $(this).css("zIndex",zIndexArr[i]);
                }*/
                this.posterItems.each(function (i) {
                    $(this).css("zIndex",zIndexArr[i]);
                })
            }else if(dir==="right"){//右旋转
                this.posterItems.each(function () {
                    var self=$(this),
                        next=self.next().get(0)?self.next():_this_.posterFirstItem,
                        width=next.width(),
                        height=next.height(),
                        zIndex=next.css("zIndex"),
                        opacity=next.css("opacity"),
                        left=next.css("left"),
                        top=next.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        width:width,
                        height:height,
                        //zIndex:zIndex,
                        opacity:opacity,
                        left:left,
                        top:top
                    },_this_.setting.speed,function () {
                        _this_.rotateFlag=true;
                    });
                });
                this.posterItems.each(function (i) {
                    $(this).css("zIndex",zIndexArr[i]);
                })
            }
        },
        //设置剩余帧的位置关系
        setPosterPos:function () {
            var self=this;
            var sliceItems=this.posterItems.slice(1),//4
                sliceSize=sliceItems.size()/2,//2
                rightSize=sliceItems.slice(0,sliceSize),
                level=Math.floor(this.posterItems.size()/2),//2
                leftSize=sliceItems.slice(sliceSize);
            //设置右边帧的位置关系
            var rw=this.setting.posterWidth,
                rg=this.setting.posterHeight,
                gap=((this.setting.width-this.setting.posterWidth)/2)/level;
            var firstLeft = (this.setting.width-this.setting.posterWidth)/2;
            var fixOffsetLeft = firstLeft+rw;
            rightSize.each(function (i) {
                level--;
                rw=rw*self.setting.scale;
                rg=rg*self.setting.scale;
                var j = i;
                $(this).css({
                    zIndex:level,
                    width:rw,
                    height:rg,
                    opacity:1/(++j),
                    left:fixOffsetLeft+(++i)*gap-rw,
                    //top:(self.setting.height-rg)/2
                    top:self.setVertuvalAlign(rg)
                })
            });
            //设置左边帧的位置关系
            var lw=rightSize.last().width(),
                lg=rightSize.last().height(),
                oLoop=Math.floor(this.posterItems.size()/2);
            leftSize.each(function (i) {
                $(this).css({
                    zIndex:i,
                    width:lw,
                    height:lg,
                    opacity:1/oLoop,
                    left:i*gap,
                    top:self.setVertuvalAlign(lg)
                });
                lw=lw/self.setting.scale;
                lg=lg/self.setting.scale;
                oLoop--;
            });
        },
        //设置垂直排列对齐
        setVertuvalAlign:function (height) {
            var vertuvalType=this.setting.verticalAlign,
                top=0;
            if(vertuvalType==="middle"){
                top=(this.setting.height-height)/2;
            }
            else if(vertuvalType==="top"){
                top=0;
            }
            else if(vertuvalType==="bottom"){
                top=this.setting.height-height;
            }
            else {
                top=(this.setting.height-height)/2;
            }
            return top;
        },
        //设置配置参数控制宽高
        setSettingValue:function () {
            this.poster.css({
                width:this.setting.width,
                height:this.setting.height
            });
            this.posterItemMain.css({
                width:this.setting.width,
                height:this.setting.height
            });
            //计算左右切换按钮的宽度
            var w=(this.setting.width-this.setting.posterWidth)/2;
            this.prevBtn.css({
                width:w,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.size()/2)
            });
            this.nextBtn.css({
                width:w,
                height:this.setting.height,
                zIndex:Math.ceil(this.posterItems.size()/2)//向上取整
            });
            this.posterFirstItem.css({
                width:this.setting.posterWidth,
                height:this.setting.posterHeight,
                left:w,
                zIndex:Math.floor(this.posterItems.size()/2)//向下取整
            });
        },
        //获取人工配置参数
        getSetting:function () {
            var setting=this.poster.attr("data-setting");
            if(setting&&setting!=""){
                return $.parseJSON(setting);
            }
            else {
                return{};
            }
        }
    };
    Carousel.init=function (posters) {
        var oThis=this;
        posters.each(function () {
            new oThis($(this));
        })
    };
    window.Carousel=Carousel;
})(jQuery);
$(function(){
     var container=$(".container");
     var box=$(".box");
     var buddy=$(".buddy");
     var pop=$(".pop");
     var open=$(".btn");
     var close=$(".close");
     var imgs=pop.find("img");

     $.Velocity.RegisterUI('linxin.slideUpIn',{
		defaultDuration:500,
		calls:[
			[{opacity:[1,0],translateY:[0,100]}]
		]
      });

     $.Velocity.RegisterUI('linxin.slideDownOut',{
		defaultDuration:500,
		calls:[
			[{opacity:[0,1],translateY:[100,0]}]
		]
      });

     $.Velocity.RegisterUI('linxin.scaleIn',{
		defaultDuration:300,
		calls:[
			[{opacity:[1,0],scale:[1,0.3]}]
		]
      });

     $.Velocity.RegisterUI('linxin.scaleOut',{
		defaultDuration:300,
		calls:[
			[{opacity:[0,1],scale:[0.3,1]}]
		]
      });
     /*初始化*/
     var seqInit=[{
         elements:container,
         properties:'linxin.slideUpIn',
         options:{
         	delay:300
         }
     },{
     	 elements:box,
         properties:'linxin.slideUpIn',
         options:{
         	sequenceQueue:false   /*同时执行*/
         }
     },{
     	 elements:buddy,
         properties:'linxin.slideUpIn',
         options:{
         	delay:60
         }
     }];
     /*关闭*/
     var seqClose=[{
     	 elements:imgs,
         properties:'linxin.scaleOut',
     },{
         elements:container,
         properties:'linxin.slideDownOut',
     },{
     	 elements:pop,
         properties:'linxin.slideDownOut',
         options:{
         	sequenceQueue:false   /*同时执行*/
         }
     },{
     	 elements:container,
         properties:'linxin.slideUpIn',
     },{
     	 elements:box,
         properties:'linxin.slideUpIn',
         options:{
         	sequenceQueue:false   /*同时执行*/
         }
     }];
     /*点击查看*/
    var seqClick=[{
         elements:container,
         properties:'linxin.slideDownOut',
     },{
     	 elements:box,
         properties:'linxin.slideDownOut',
         options:{
         	sequenceQueue:false   /*同时执行*/
         }
     },{
     	 elements:container,
         properties:'linxin.slideUpIn',
     },{
     	 elements:pop,
         properties:'linxin.slideUpIn',
         options:{
         	sequenceQueue:false   /*同时执行*/
         }
     },{elements:imgs,
         properties:'linxin.scaleIn',
     }];
     $.Velocity.RunSequence(seqInit);
     open.on('click',function(){
        $.Velocity.RunSequence(seqClick);
     });
     close.on('click',function(){
        $.Velocity.RunSequence(seqClose);
     });
});
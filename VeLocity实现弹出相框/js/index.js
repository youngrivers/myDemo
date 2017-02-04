// (function($){
// 	$("#box1").velocity({
//       width:'300px',
//       height:'300px'
// 	},{
// 		duration:1000,
// 		complete:function(){					
// 			$("#box2").velocity({
// 		      width:'300px',
// 		      height:'300px'
// 			},{
// 				duration:1000,
// 				delay:1000    /*延时1s*/       
// 			});
// 	   }  
// 	});
// })(jQuery);


(function($){
	// var seq=[
	// {
	// 	elements:$("#box1"),
	// 	properties:{width:'300px'},
	//     options:{duration:1000}
	// },
	// {
	// 	elements:$("#box2"),
	// 	properties:{width:'300px'},
	//     options:{duration:1000}
	// }
	// ];
	// $.Velocity.RunSequence(seq);

	$("#box1").on('mouseover',function(){
       $(this).velocity('callout.shake');
	});

	$.Velocity.RegisterEffect('linxin.pulse',{
		defaultDuration:300,
		calls:[
			[{scaleX:1.1},0.5],
	        [{scaleX:1.0},0.5],
		]
      });

	$("#box2").on('mouseover',function(){
       $(this).velocity('linxin.pulse');
	});
})(jQuery);
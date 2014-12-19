define(['jquery'],function($){
	$('#fatnav').on('click','li',function(e){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	$('body').on('click',function(e){
		if(e.target.id=='wrap'){
			$('#fatnav .active').removeClass('active');
		}
	})
	
});
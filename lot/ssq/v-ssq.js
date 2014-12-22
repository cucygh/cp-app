define(['backbone', 'zepto','math'], function (B, $,math) {
	var View_ssq = B.View.extend({
			el : '#wrap',
			events : {
				'click .ui.dropdown' : 'fun_dropdown',
				'click .ui.dropdown .button' : 'fun_dropdown_button',
				'click .ball' : 'fun_ball',
			}, //机选
			fun_dropdown : function (e) {
				var $self = $(e.target);
				$self.find('.random-num').toggle();
			}, //机选
			fun_dropdown_button : function (e) {
				var $self = $(e.target);
				var $parent=$self.parents('.random-num');
				var $top=$parent.parents('.segment');
				var num=$self.text()*1;
				var type=$parent.attr('type');
				var result=math.random({min:1,max:33,size:num,sort:1});
				for(var p in result){
					
				}
				$self.find('.random-num').toggle();
				this.count();//计算注数
			}, //选号
			fun_ball : function (e) {
				var $self = $(e.target);
				var name = 'red';
				if ($self.parents('.bet-blue-code').length) {
					name = 'blue';
				};
				$self.toggleClass(name);
				this.count();//计算注数
			},
			count:function(){
				var $wrap=$(this.el);
				var count=math.combo($wrap.find('.ball.red').length,6)*$wrap.find('.ball.blue').length;
				$wrap.find('.bet-confirm .zhu').text(count);
				$wrap.find('.bet-confirm .money').text(count*2);
			}
		});
	return View_ssq;
});


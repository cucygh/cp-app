﻿define(['backbone', 'zepto', 'math','handlebars'], function (B, $, math,handlebar) {
	var View_ssq = B.View.extend({
			el : '#wrap',
			events : {
				'click .random-ball' : 'fun_dropdown',
				'click .ui.dropdown .button' : 'fun_dropdown_button',
				'click .ball' : 'fun_ball',
				'click .add-bet' : 'fun_add_bet',
			}, //机选下拉
			fun_dropdown : function (e) {
				var $self = $(e.target);
				$self.parents('.ui.dropdown').find('.random-num').toggle();
			}, //机选个数
			fun_dropdown_button : function (e) {
				var $self = $(e.target);
				var $parent = $self.parents('.random-num');
				var $top = $parent.parents('.segment');
				var num = $self.text() * 1;
				var type = $parent.attr('type');
				var max = $parent.attr('max');
				var result = math.random({
						min : 1,
						max : max,
						size : num,
						sort : 1
					});
				var cur_arr = result[0],$item;
				$top.find('.ball').each(function (index, item) {
					$item = $(item);
					if ($.inArray($item.text(), cur_arr) > -1) {
						$item.addClass(type);
					} else {
						$item.removeClass(type);
					}
				});
				$top.find('.text').text('机选 '+num+' 个');
				$self.find('.random-num').toggle();
				this.count(); //计算注数
			}, //选号
			fun_ball : function (e) {
				var $self = $(e.target);
				var name = 'red';
				if ($self.parents('.bet-blue-code').length) {
					name = 'blue';
				};
				$self.toggleClass(name);
				this.count(); //计算注数
			},//计算选号金额
			count : function () {
				var $wrap = $(this.el);
				var count = math.combo($wrap.find('.ball.red').length, 6) * $wrap.find('.ball.blue').length;
				$wrap.find('.bet-confirm .zhu').text(count);
				$wrap.find('.bet-confirm .money').text(count * 2);
			},//添加选号
			fun_add_bet:function(){
				var $wrap = $(this.el);
				var red_ball=[];
				$wrap.find('.ball.red').each(function(index,item){
					red_ball.push($(item).text());
				});
				var blue_ball=[];
				$wrap.find('.ball.blue').each(function(index,item){
					blue_ball.push($(item).text())
				});
				var tpl=handlebar.compile($('#tpl-bet-item').html());
				var data={
					code:red_ball.join(' ')+'+'+blue_ball.join(' '),
					count:math.combo(red_ball.length,6)*blue_ball.length,
					type:this.count>1?'复式':'单式',
					red:red_ball.join(' '),
					blue:blue_ball.join(' '),
					money:this.count*2
				}
				var item=tpl(data);
				$('#bet-list').append(item);
			}
		});
	return View_ssq;
});

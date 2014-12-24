define(['backbone', 'zepto', 'math','handlebars','lottery','underscore','timer','v-user'], function (B, $, math,handlebar,Lot,_,Timer,User) {
	var View_ssq = B.View.extend({
			el : '#wrap',
			initialize:function(){
				Lot.bet.get_cur_issue({id:220051,ok_call:function(d){
					if (d && !_.isEmpty(d)) {
						$('.issue').text(d.Issue);
						/* 倒计时 */
						$('.countdown').countdown(d.FsEndTime * 1000, function (event) {
							$(this).html(event.strftime('<b class="day red">%D</b>天<b class="hour red">%H</b>时<b class="minute red">%M</b>分<b class="second red">%S</b>秒'));
						});
					}
				}});
				var user=new User();
			},
			events : {
				'click .random-ball' : 'fun_dropdown',
				'click .ui.dropdown .button' : 'fun_dropdown_button',
				'click .ball' : 'fun_ball',
				'click .add-bet' : 'fun_add_bet',
				'click .clear-bet' : 'fun_rm_bet'
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
			fun_add_bet:function(e){
				e.preventDefault();
				var $wrap = $(this.el);
				var red_ball=[];
				$wrap.find('.ball.red').each(function(index,item){
					red_ball.push($(item).text());
				});
				var blue_ball=[];
				$wrap.find('.ball.blue').each(function(index,item){
					blue_ball.push($(item).text())
				});
				var data={
					code:red_ball.join(' ')+'+'+blue_ball.join(' '),
					count:math.combo(red_ball.length,6)*blue_ball.length,
					red:red_ball.join(' '),
					blue:blue_ball.join(' ')
				};
				data.money=data.count*2;
				data.type=data.count>1?"复式":"单式";
				var item=$('#bet-item').html();
				item=Lot.string.compile(item,data);
				$('#bet-list').append(item);
				this.fun_rm_bet();//清空号码
			},//清空选号
			fun_rm_bet:function(e){
				e&&e.preventDefault();
				var $wrap = $(this.el);
				$wrap.find('.ball').removeClass('red blue');
				this.count();
			}
		});
	return View_ssq;
});

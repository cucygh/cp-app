define(['zepto', 'backbone', 'm-pay', 'lottery', 'pay-tpl'], function ($, B, mPay, Lot, tplPay) {
	var vPay = B.View.extend({
			el : '#wrap',
			initialize : function () {
				var order = localStorage.getItem('ipad_order');
				var user = localStorage.getItem('ipad_user');
				if (order && user) {
					try {
						order = JSON.parse(order);
						user = JSON.parse(user);
						var detail = order.xValue;
						var $view = $(this.el);
						var type = {
							'1' : '代购方案',
							'2' : '合买方案',
							'3' : '追号方案'
						}
						$view.find('.order-name').html(detail.LotName + ' 第 ' + '<b class="red">' + detail.DrawNo + '</b>' + ' 期 ' + type[detail.TypeID]);
						$view.find('.pay-money').html('<b class="red">' + detail.TradeMoney / 100 + '</b>' + ' 元');
						$view.find('.balance').html('<b class="red">' + user.cashbalance + '</b>' + ' 元');
						if (user.coupons) {
							$hb_menu = $('#hongbao .menu');
							var items = ['<option value="0">不使用红包</option>'];
							var cur_hb = user.coupons;
							for (var i = 0, len = cur_hb.length; i < len; i++) {
								items.push(Lot.string.compile($('#hb-item').html(), {
										value : cur_hb[i].balance / 100,
										money : cur_hb[i].balance / 100,
										field : cur_hb[i].field,
										time : cur_hb[i].validEndTime
									}));
							}
							$hb_menu.html(items.join(''));
						} else {
							$('#hongbao').remove();
						}
					} catch (e) {
						alert('出错了');
					}
				}
			},
			model : new mPay(),
			events : {
				'click #btn-pay' : 'fun_pay',
			},
			fun_pay : function () {}
		});
	return vPay;
});

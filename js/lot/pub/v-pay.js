define(['zepto', 'backbone', 'm-pay', 'lottery', 'pay-tpl'], function ($, B, mPay, Lot, tplPay) {
	var vPay = B.View.extend({
			el : '#wrap',
			initialize : function () {
				var order = this.get_order();
				var user = this.get_user();
				if (order && user) {
					try {
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
			get_order : function () {
				var order = localStorage.getItem('ipad_order');
				if (order) {
					return JSON.parse(order);
				} else {
					return false;
				}
			},
			get_user : function () {
				var user = localStorage.getItem('ipad_user');
				if (user) {
					return JSON.parse(user);
				} else {
					return false;
				}
			},
			fun_pay : function () {
				var order = this.get_order().xValue;
				var type={
					'1':'代购',
					'2':'合买',
					'3':'追号'
				};
				var param = {
					chan : order.URL.match(/\d$/g)[0], //消费类型1现金 2红包 3组合支付
					from : '2',
					orderamt : order.TradeMoney,
					orderid : order.OrderID,
					ordername : [order.LotName,'第'+order.DrawNo+'期',type[order.TypeID]].join(' '),
					ordertime : order.OrderTime,
					paypass : this.model.pwd_md5($('#pay_pwd').val()),
					paytype : order.TypeID,
					lotid : order.LotID,
					coupons : 'cash',
					t : +new Date
				};
				var param2 = {
					ch : param.chan,
					cs : param.coupons,
					fr : param.from,
					oa : param.orderamt,
					oi : param.orderid,
					on : param.ordername,
					ot : param.ordertime,
					pp : param.paypass,
					pt : param.paytype,
					lotid : param.lotid,
					tt : +new Date
				};
				this.model.post(param2, function (res) {
					console.log(res);
				})
			}
		});
	return vPay;
});

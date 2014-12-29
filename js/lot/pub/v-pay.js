define(['zepto','backbone','m-pay','lottery','pay-tpl'],function($,B,mPay,Lot,tplPay){
	var vPay=B.View.extend({
		el:'#wrap',
		initialize:function(){
			/* buy_type:bet
			LotID:220051
			PlayID:
			BetCodes:22 23 25 26 30 31+01 08 10;05 08 15 22 24 29+04
			OneMoney:2
			BetPageID:1010
			DrawNo:2014152
			BetMoney:8
			BetMulti:1 */
			
		},
		model:new mPay(),
		events:{
			
		},
		
	});
});
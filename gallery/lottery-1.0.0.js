define(['zepto', 'underscore'], function ($, Lot) {
	var domain = 'http://ygh.cp.360.cn';
	// ���ּ�ơ�ID��ȫ��
	var lottery = {
		ssq : [220051, '˫ɫ��'],
		slt : [120029, '��������͸'],
		p3 : [110033, '������'],
		p5 : [110035, '������'],
		qxc : [110022, '���ǲ�'],
		sd : [210053, '����3D'],
		sdbj : [215152, '����3D'],
		qlc : [220028, '���ֲ�'],
		xw : [223515, '����15ѡ5'],
		xwtj : [225303, '���15ѡ5'],
		jczq : [130042, '��������'],
		jclq : [130043, '��������'],
		dc : [130041, '��������'],
		sfc : [130011, 'ʤ����'],
		rj : [130019, '��ѡ��'],
		kl8 : [265108, '��������8'],
		syxwsd : [166406, 'ɽ��11ѡ5'],
		syxwjx : [168009, '��11ѡ5'],
		syxwgd : [165707, '�㶫11ѡ5'],
		syxwsh : [165207, '�Ϻ�11ѡ5'],
		syxwhlj : [166507, '����11ѡ5'],
		sscjx : [258001, '����ʱʱ��'],
		ssccq : [255401, '����ʱʱ��'],
		k3js : [255903, '���տ�3'],
		k3hb : [257703, '������3'],
		k3nm : [257503, '���ɿ�3'],
		k3jl : [258203, '���ֿ�3'],
		pk3 : [166407, 'ɽ�������˿�3'],
		jq4 : [130018, '�ĳ�����'],
		zc6 : [130016, '6����ȫ��']
	};
	// ֧��URL
	var pay_url = {
		bet : domain + '/int/bet/',
		team : domain + '/int/teambet/',
		join : domain + '/int/join/',
		trace : domain + '/int/trace/',
		pteam : domain + '/int/pteambet/'
	};
	/**
	 * �ַ������
	 */
	var string = {
		/**
		 * �򵥵�ģ�����
		 * @param tpl {string}
		 * @param data {Object}
		 * @return tpl {string}
		 */
		compile : function (tpl, data) {
			var reg;
			for (var p in data) {
				reg = new RegExp('\{' + p + '\}', 'g');
				tpl = tpl.replace(reg, data[p]);
			}
			return tpl;
		}
	};

	/**
	 * Ͷע���
	 */
	var bet = {
		/**
		 * ��ȡ������Ϣ������д��id��ȫ��
		 * @param name {String} 					eg:'130016' || 'zc6' || '6����ȫ��' || '6��' || '��ȫ��'
		 * @ignore created
		 * @return result {Array}				eg:['zc6',130016, '6����ȫ��']
		 */
		get_lot_name : function (name) {
			var by_name = /^[a-z\d]+$/gi.test(name);
			var by_id = /^\d+$/.test(name);
			var index = 0;
			if (!by_name) {
				index = by_id ? 1 : 2;
			}
			var p_arr = [];
			for (var p in lottery) {
				p_arr = [p].concat(lottery[p]);
				if (lottery[p][index].indexOf(name) > -1) {
					break;
				}
			}
			return p_arr;
		},
		/**
		 * ��ȡ֧��URL
		 * @param con {String}
		 * @ignore created
		 * @return result {Array}
		 */
		get_pay_url : function (con) {
			var refer = {
				bet : '����',
				team : '����',
				join : '�Ϲ�',
				trace : '׷��',
				pteam : '�ȷ���'
			};
			var p,
			url;
			for (p in refer) {
				if (con.indexOf(p) > -1 || con.indexOf(refer[p]) > -1) {
					url = pay_url[p];
					break;
				}
			}
			return url || false;
		},
		/**
		 * ��ȡ���ֻ�����Ϣ
		 * @param id {String}
		 * @ignore created
		 * @return result {Object}
		 */
		get_cur_issue : function (param) {
			var url = domain + '/int/qcurissue';
			var id = param.id;
			var cur_issue = param.cur_issue;
			var freq = param.freq;
			var ok_call = param.ok_call || function () {};
			var fail_call = param.fail_call || function () {};
			$.ajax({
				url : url,
				type : 'GET',
				data : {
					LotID : id
				},
				dataType : 'json',
				async : cur_issue ? true : false,
				success : function (data) {
					if (data) {
						if (cur_issue != undefined && cur_issue == data.issue) {
							setTimeout(function () {
								get_cur_issue.call(null, id, cur_issue);
							}, freq || 3000);
						} else {
							ok_call.call(null, data);
						}
					} else {
						fail_call.call(null);
					}
				},
				error : function () {
					fail_call.call(null);
				},
				timeout : 1000
			})
		}
	}
	return {
		string : string,
		bet : bet
	}
});

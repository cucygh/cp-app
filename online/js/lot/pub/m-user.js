define(["backbone","md5","zepto","lottery"],function(Backbone,md5,$,Lot){var Login=Backbone.Model.extend({isOn:!1,userName:"",msg:"",imgurl:"",domain:"http://ygh.cp.360.cn/",initialize:function(){var _this=this,is_web=location.protocol=="chrome-extension:"?!1:!0;is_web?$.ajax({url:_this.domain+"int/querybalance/",dataType:"json",success:function(data){_this.set({userName:data.username,imgurl:data.imgUrl,isOn:data.code==0?!0:!1}),console.log(data)},type:"post",error:function(err){_this.set({userName:"\u672a\u767b\u5f55",isOn:!1})}}):chrome.cookies.get({url:_this.domain,name:"Q"},function(c){c?$.ajax({url:_this.domain+"int/querybalance/",dataType:"json",success:function(data){_this.set({userName:data.username,imgurl:data.imgUrl,isOn:data?!0:!1})},type:"post",error:function(err){_this.set({userName:"\u672a\u767b\u5f55",isOn:!1})}}):_this.set({isOn:!1})})},login:function(user,pwd,keep,captcha){var _this=this,result=this.validate(user,pwd);if(result.pass){var options={account:user,password:md5
(pwd),isKeepAlive:keep,userType:"360",union:"360",t:+(new Date)};captcha&&(options.captcha=captcha);var data_type="json",url=this.domain+"user/unionLogin/?"+$.param(options);this.fetch({url:url,success:function(data){console.log(data),data.attributes.errno=="0"?(_this.set({isOn:!0,msg:"ok",userName:data.attributes.userinfo.userName}),chrome.cookies.set({url:_this.domain,name:"loginedUserName",value:data.attributes.userinfo.userName})):_this.set({isOn:!1,msg:data.attributes.errmsg+":t="+ +(new Date)})},error:function(err){_this.set({msg:err+":t="+ +(new Date)})}})}else this.set({msg:result.msg+":t="+ +(new Date)})},exit:function(){var _this=this,url=this.domain+"user/logout/?rt="+new Date;Backbone.sync("read",this,{url:url,dataType:"html",success:function(){_this.set({isOn:!1})},error:function(){_this.set({msg:"\u9000\u51fa\u5931\u8d25"})}})},validate:function(user,pwd){var r;return user.toString().trim()!=""&&pwd.toString().trim()!=""?r={pass:!0,msg:"pass"}:r={pass:!1,msg:"\u8d26\u53f7\u6216\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\uff01"
},r}});return Login});
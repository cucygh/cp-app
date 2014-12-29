define(["zepto"],function($){var PRECISION=1e3,instances=[],matchers=[];matchers.push(/^[0-9]*$/.source),matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),matchers=new RegExp(matchers.join("|"));function parseDateString(dateString){if(dateString instanceof Date)return dateString;if(String(dateString).match(matchers))return String(dateString).match(/^[0-9]*$/)&&(dateString=Number(dateString)),String(dateString).match(/\-/)&&(dateString=String(dateString).replace(/\-/g,"/")),new Date(dateString);throw new Error("Couldn't cast `"+dateString+"` to a date object.")}var DIRECTIVE_KEY_MAP={Y:"years",m:"months",w:"weeks",d:"days",D:"totalDays",H:"hours",M:"minutes",S:"seconds"};function strftime(offsetObject){return function(format){var directives=format.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(directives)for(var i=0,len=directives.length;i<len;++i){var directive=directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/
),regexp=new RegExp(directive[0]),modifier=directive[1]||"",plural=directive[3]||"",value=null;directive=directive[2],DIRECTIVE_KEY_MAP.hasOwnProperty(directive)&&(value=DIRECTIVE_KEY_MAP[directive],value=Number(offsetObject[value])),value!==null&&(modifier==="!"&&(value=pluralize(plural,value)),modifier===""&&value<10&&(value="0"+value.toString()),format=format.replace(regexp,value.toString()))}return format=format.replace(/%%/,"%"),format}}function pluralize(format,count){var plural="s",singular="";return format&&(format=format.replace(/(:|;|\s)/gi,"").split(/\,/),format.length===1?plural=format[0]:(singular=format[0],plural=format[1])),Math.abs(count)===1?singular:plural}var Countdown=function(el,finalDate,callback){this.el=el,this.$el=$(el),this.interval=null,this.offset={},this.setFinalDate(finalDate),this.instanceNumber=instances.length,instances.push(this),this.$el.data("countdown-instance",this.instanceNumber),callback&&(this.$el.on("update",callback),this.$el.on("stoped",callback
),this.$el.on("finish",callback)),this.start()};$.extend(Countdown.prototype,{start:function(){if(this.interval!==null)throw new Error("Countdown is already running!");var self=this;this.update(),this.interval=setInterval(function(){self.update.call(self)},PRECISION)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},pause:function(){this.stop.call(this)},resume:function(){this.start.call(this)},remove:function(){this.stop(),delete instances[this.instanceNumber],delete this.$el.data().countdownInstance},setFinalDate:function(value){this.finalDate=parseDateString(value)},update:function(){if(this.$el.closest("html").length===0){this.remove();return}this.totalSecsLeft=this.finalDate.valueOf()-(new Date).valueOf(),this.totalSecsLeft=Math.ceil(this.totalSecsLeft/1e3),this.totalSecsLeft=this.totalSecsLeft<0?0:this.totalSecsLeft,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60
)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30),years:Math.floor(this.totalSecsLeft/60/60/24/365)},this.totalSecsLeft===0?(this.stop(),this.dispatchEvent("finish")):this.dispatchEvent("update")},dispatchEvent:function(eventName){var event=$.Event(eventName);event.finalDate=this.finalDate,event.offset=$.extend({},this.offset),event.strftime=strftime(this.offset),this.$el.trigger(event)}}),$.extend($.fn,{countdown:function(){var argumentsArray=Array.prototype.slice.call(arguments,0);return this.each(function(){var instanceNumber=$(this).data("countdown-instance");if(instanceNumber!==undefined){var instance=instances[instanceNumber],method=argumentsArray[0];Countdown.prototype.hasOwnProperty(method)?instance[method].apply(instance,argumentsArray.slice(1)):String(method).match(/^[$A-Z_][0-9A-Z_$]*$/i)===null?instance.setFinalDate.call(instance
,method):$.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,method))}else new Countdown(this,argumentsArray[0],argumentsArray[1])})}})});
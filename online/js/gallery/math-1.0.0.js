define([],function(){var tank=function(n){return n==0?1:tank(n-1)*n},combo=function(m,n){if(n<=m){var result=tank(m-n)*tank(n);return result=tank(m)/result,result}return 0};function combine(arr,num){var r=[];return function f(t,a,n){if(n==0)return r.push(t);for(var i=0,l=a.length;i<=l-n;i++)f(t.concat(a[i]),a.slice(i+1),n-1)}([],arr,num),r}var random=function(options_p){var options={min:0,max:9,share:[],shahao:[],size:1};$.extend(options,options_p),options.count=options.count||1;var one_random=function(options){var ar,tmp,k=0,ml,l,pre_str="0000000000000000";ml=(options.max+"").length,ar=(options.share||[]).toString(),ar=ar===""?[]:ar.split(/[,\-_=+\|]/),l=ar.length;if(l>0&&options.max>9)for(var i=0;i<l;i++)ar[i].length<ml&&(ar[i]=pre_str.substr(0,ml-ar[i].length)+ar[i]);while(k<options.size){tmp=Math.floor(Math.random()*(options.max-options.min+1))+options.min+"",tmp=pre_str.substr(0,ml-tmp.length)+tmp;if(options.repeat||!options.repeat&&$.inArray(tmp,ar)==-1&&$.inArray(tmp,options.shahao||
[])==-1)ar.push(tmp),k++}return!options.sort||ar.sort(),typeof options.split_str!="undefined"?ar.join(options.split_str):ar},result=[],count=combo(options.max-options.min+1-options.share.length-options.shahao.length,options.size);count<options.count&&(options.repeat_team=1);for(var i=0;i<options.count;i++){var re_tmp=one_random(options);if(!options.repeat_team){var re_len=result.length,flag=0;for(var j=0;j<re_len;j++)if(result[j].toString()==re_tmp.toString()){flag=1;break}flag?i--:result.push(re_tmp)}else result.push(re_tmp)}return result};return{combo:combo,comboArr:combine,random:random}});
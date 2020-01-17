/* 控制台输出 */
var log=function(str) {
	console.log(str);
}

var signStr="a";// 私钥

/* 签名计算，参数排序后做MD5，结果结尾接私钥后再次MD5 */
var doSign=function(params) {
	var params = params.slice(0);
	params.sort();
	var requestStr="";
	var paramsStr="";
	for (var i=0;i<params.length;i++) {
		var param=params[i];
		requestStr+=(i==0?"?":"&")+param[0]+"="+param[3];
		paramsStr+=param[0]+"="+param[3];
	}
	var signResult=$.md5(paramsStr)+signStr;
	requestStr+="&sign="+$.md5(signResult);
	return requestStr;
}

/* 时间格式化 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
    	if (new RegExp("(" + k + ")").test(fmt)) {
    		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    	}
    }
    return fmt;  
}

function getbookingTime() {
	var nowTime = new Date();
	nowTime.setMinutes(nowTime.getMinutes() + 32);
	return nowTime.Format("yyyyMMddHHmmss");
}
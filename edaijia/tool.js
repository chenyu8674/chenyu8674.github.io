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
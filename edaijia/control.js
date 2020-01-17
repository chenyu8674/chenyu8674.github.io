$(document).ready(function(){ 
	$("#apiselect").change(function(){
		init();
		var value=$(this).children("option:selected").val();
		createParamView(value);
	})

	$("#doRequest").click(function(){
		init();
		setTimeout(sendRequest,10);
	})

	$("#doSign").click(function(){
		init();
		sendRequest(true);
	})

	resultview=$("#resultview");
	iframeview=$("#iframe");
	init();
	createParamView("listAll");
});

var resultview;
var iframeview;
function init(){
	resultview.hide();
	resultview.empty();
	iframeview.hide();
	iframeview.attr("src","");
}

var requestOBJ;
function createParamView(value){
	try{
		requestOBJ=eval("new "+value+"()");
	}catch(e){
		alert(e);
		return;
	}
	var api=requestOBJ.api;
	var params=requestOBJ.params;
	var paramsview=$("#paramsview");
	paramsview.empty();
	var table=$("<table></table>").appendTo(paramsview);
	for (var i=0;i<params.length;i++) {
		var param=params[i];
		/* 含义 */
		var tr=$("<tr></tr>");
		var td1=$("<td>"+param[1]+"</td>");
		td1.appendTo(tr);
		/* 取值 */
		var td2=$("<td></td>");
		var input=$("<input />").appendTo(td2);
		input.val(param[3]);
		input.attr("title",param[2]);
		input.attr("index",i);
		input.on("input",function(){
			var index=$(this).attr("index");
			(requestOBJ.params)[index][3]=$(this).val();
		});
		td2.appendTo(tr);
		tr.appendTo(table);
	}
}

function sendRequest(onlySign){
	var requestURL=baseURL+requestOBJ.api+doSign(requestOBJ.params);
	if (onlySign) {
		resultview.show();
		resultview.text(requestURL);
		return;
	}
	if(requestOBJ.method=="GET"){
		iframeview.attr("src",requestURL);
		iframeview.show();
	}else{
		$.post(
			requestURL, null,
			function(data){
				resultview.show();
				resultview.text(JSON.stringify(data));
			});
	}
}
$(document).ready(function(){ 
	$("#apiselect").change(function(){
		init();
		var value=$(this).children('option:selected').val();
		createParamView(value);
	})

	$("#doRequest").click(function(){
		init();
		sendRequest();
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
	var table=$('<table></table>').appendTo(paramsview);
	for (var i=0;i<params.length;i++) {
		var param=params[i];
		/* 含义 */
		var tr=$('<tr></tr>');
		var td1=$("<td>"+param[1]+"</td>");
		td1.appendTo(tr);
		/* 取值 */
		var td2=$("<td></td>");
		var input=$("<input />").appendTo(td2);
		input.val(param[3]);
		input.attr("title",param[2]);
		td2.appendTo(tr);
		tr.appendTo(table);
	}
}

function sendRequest(){
	var requestURL=baseURL+requestOBJ.api+doSign(requestOBJ.params);
	log(requestURL);
	if(requestOBJ.method=="GET"){
		// window.open(requestURL,"_blank");
		iframeview.show();
		iframeview.attr("src",requestURL);
		// $.get(
		// 	requestURL, null,
		// 	function(data){
		// 		resultview.text(JSON.stringify(data));
		// 	});
	}else{
		$.post(
			requestURL, null,
			function(data){
				resultview.show();
				resultview.text(JSON.stringify(data));
			});
	}
}
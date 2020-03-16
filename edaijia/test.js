function doTest() {
	for (var i = 46200; i >= 45800; i--) {
		requestOBJ.params[0][3] = i;
		var requestURL=baseURL+requestOBJ.api+doSign(requestOBJ.params);
		$.get(
			requestURL, null,
			function(data){
				if(data.data != null)
					log(data.data);
			});
	}
}
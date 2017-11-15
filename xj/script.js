$(document).ready(function(){
  $("#cover").hide();
  setTimeout(doadapt, 0);
  $(window).resize(doadapt);
});

var SCREEN_ZOOM = 0;
function doadapt() {
	SCREEN_ZOOM = $(window).width() / 1000;
	log(SCREEN_ZOOM);
	$("body").css("zoom", SCREEN_ZOOM);
	$("#inputbar").css("top", ($("#cover").height() - $("#inputbar").height()) / 2) + "px";
}

// 时间日期格式化
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function log(obj) {
	console.log(obj);
}

// 根据id获取输入框内容
function getvalue(id) {
	return $("#" + id).attr("value");
}

// 根据id设置输入框内容
function setvalue(id, value) {
	$("#" + id).attr("value", value);
}

var rawDataList = [];// 所有输入数据
var searchResultList = [];// 搜索结果数据

// 弹出数据输入窗口
function show_add() {
	$("#cover").show();
	$("#adddate").html("");
    var date = $("<input id='add5' type='date' />").appendTo($("#adddate"));
    date.attr("value", new Date().Format("yyyy-MM-dd"));
    date.css("width", "200px");
}

function add_data() {
	var patient = getvalue("add0");// 患者姓名
	var phone = getvalue("add1");// 手机号码
	var department = getvalue("add2");// 科室名称
	var expert = getvalue("add3");// 专家姓名
	var operation = getvalue("add4");// 手术名称
	var time = getvalue("add5");// 手术时间
	var price = getvalue("add6");// 手术费用
	var assistant = getvalue("add7");// 所属医助
	log($("#add5").attr("value"));
	log(document.getElementById("add5").value);
	$("#cover").hide();
}
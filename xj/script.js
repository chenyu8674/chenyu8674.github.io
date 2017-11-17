// 初始化
$(document).ready(function(){
    $("#cover").hide();
    setTimeout(doadapt, 0);
    $(window).resize(doadapt);
    init();
});

var SCREEN_ZOOM = 0;// 适配缩放比例
// 页面适配
function doadapt() {
	SCREEN_ZOOM = $(window).width() / 1000;
	log(SCREEN_ZOOM);
	$("body").css("zoom", SCREEN_ZOOM);
	$("#inputbar").css("top", ($("#cover").height() - $("#inputbar").height()) / 2) + "px";
}

// 初始化
function init() {
    // 输入回车时选中下一个数据框
    $("input").bind('keypress', function(event) {
        if(event.keyCode == 13) {
            var id = this.id;
            var base = id.match(/[A-Za-z]*/)[0];
            var index = id.replace(base, "");
            try {
                index = parseInt(index) + 1;
                $("#" + base + index).length ? $("#" + base + index).focus() : $("#" + base + 0).focus();
            } catch(e) {}
        }
    });
}

/********************************************************************************/

var rawDataList = [];// 所有输入数据
var searchDataList = [];// 搜索结果数据
var searchResultList = [];// 搜索结果数据
var editMode = 0;// 数据编辑模式，1添加 2修改
var editIndex = -1;// 当前修改的数据索引

// 打开新增窗口
function show_add_window() {
    editMode = 1;
    show_input_window();
}

// 打开修改窗口
function show_edit_window() {
    editMode = 2;
    show_input_window();
}

// 打开编辑窗口
function show_input_window() {
    $("#cover").show();
    if (editMode == 1) {
        $("#btndoinput").text("添加");
        setvalue("windowinput0", "");
        setvalue("windowinput1", "");
        setvalue("windowinput2", "");
        setvalue("windowinput3", "");
        setvalue("windowinput4", "");
        setvalue("windowinput5", new Date().Format("yyyy-MM-dd"));
        setvalue("windowinput6", "");
        setvalue("windowinput7", "");
    } else if (editMode == 2) {
        $("#btndoinput").text("修改");
        setvalue("windowinput0", rawDataList[editIndex][0]);
        setvalue("windowinput1", rawDataList[editIndex][1]);
        setvalue("windowinput2", rawDataList[editIndex][2]);
        setvalue("windowinput3", rawDataList[editIndex][3]);
        setvalue("windowinput4", rawDataList[editIndex][4]);
        setvalue("windowinput5", rawDataList[editIndex][5]);
        setvalue("windowinput6", rawDataList[editIndex][6]);
        setvalue("windowinput7", rawDataList[editIndex][7]);
    }
    $("#windowinput0").focus();
}

// 新增原始数据
function do_add() {
    $("#cover").hide();
	var patient = getvalue("windowinput0");// 患者姓名
	var phone = getvalue("windowinput1");// 手机号码
	var department = getvalue("windowinput2");// 科室名称
	var expert = getvalue("windowinput3");// 专家姓名
	var operation = getvalue("windowinput4");// 手术名称
	var time = getvalue("windowinput5");// 手术时间
	var price = getvalue("windowinput6");// 手术费用
	var assistant = getvalue("windowinput7");// 所属医助
    var data = [patient, phone, department, expert, operation, time, price, assistant];
    if (editMode == 1) {
        rawDataList.push(data);
    } else if (editMode == 2) {
        rawDataList[editIndex] = data;
    }
    create_raw_table();
}

function do_search() {
    var patient = getvalue("searchinput0");// 患者姓名
    var assistant = getvalue("searchinput1");// 所属医助
    var expert = getvalue("searchinput2");// 专家姓名
    var department = getvalue("searchinput3");// 科室名称
    var operation = getvalue("searchinput4");// 手术名称
    var time = getvalue("searchinput5");// 手术时间

    searchDataList = [];
    for(var i in rawDataList) {
        var data = rawDataList[i]
        if (patient && patient != data[0]) continue;
        if (assistant && assistant != data[7]) continue;
        if (expert && expert != data[3]) continue;
        if (department && department != data[2]) continue;
        if (operation && operation != data[4]) continue;
        if (time && time != data[5]) continue;
        searchDataList.push(data);
    }
    create_search_table();
}

// 重绘原始数据表格
function create_raw_table() {
    $("#rawtable").html("");
    $("<tr><td>患者姓名</td><td>手机号码</td><td>科室名称</td><td>专家姓名</td><td>手术名称</td><td>手术时间</td><td>手术费用</td><td>所属医助</td><td>可用操作</td></tr>").appendTo($("#rawtable"));
    for(var i in rawDataList) {
        var data = rawDataList[i];
        $("<tr>"
            + "<td>" + data[0] + "</td>"
            + "<td>" + data[1] + "</td>"
            + "<td>" + data[2] + "</td>"
            + "<td>" + data[3] + "</td>"
            + "<td>" + data[4] + "</td>"
            + "<td>" + data[5] + "</td>"
            + "<td>" + data[6] + "</td>"
            + "<td>" + data[7] + "</td>"
            + "<td><button class='button1' onclick='edit_raw_data(" + i + ")'>改</button><button class='button1' onclick='delete_raw_data(" + i + ")'>删</button></td>"
        + "</tr>").appendTo($("#rawtable"));
    }
}

// 重绘搜索结果表格
function create_search_table() {
    $("#searchtable").html("");
    $("<tr><td>患者姓名</td><td>手机号码</td><td>科室名称</td><td>专家姓名</td><td>手术名称</td><td>手术时间</td><td>手术费用</td><td>所属医助</td></tr>").appendTo($("#searchtable"));
    for(var i in searchDataList) {
        var data = searchDataList[i];
        $("<tr>"
            + "<td>" + data[0] + "</td>"
            + "<td>" + data[1] + "</td>"
            + "<td>" + data[2] + "</td>"
            + "<td>" + data[3] + "</td>"
            + "<td>" + data[4] + "</td>"
            + "<td>" + data[5] + "</td>"
            + "<td>" + data[6] + "</td>"
            + "<td>" + data[7] + "</td>"
        + "</tr>").appendTo($("#searchtable"));
    }
}

// 打开修改窗口
function edit_raw_data(index) {
    editIndex = index;
    show_edit_window();
}

// 删除原始数据
function delete_raw_data(index) {
    rawDataList.splice(index, 1);
    create_raw_table();
}
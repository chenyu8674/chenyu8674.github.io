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
    search_month_init();
}

/********************************************************************************/

var rawDataList = [];// 所有输入数据
var searchDataList = [];// 搜索结果数据
var searchResultList = [];// 搜索结果数据
var editMode = 0;// 数据编辑模式，1添加 2修改
var editIndex = -1;// 当前修改的数据索引
var showIndex = -1;// 当前显示内容标记，0原始数据 -1搜索结果 

// 打开编辑窗口（新增）
function show_add_window() {
    editMode = 1;
    show_input_window();
}

// 打开编辑窗口（修改）
function show_edit_window() {
    editMode = 2;
    show_input_window();
}

// 打开编辑窗口
function show_input_window() {
    $("#cover").show();
    if (editMode == 1) {
        $("#btn_do_input").text("添加");
        do_clear_input();
    } else if (editMode == 2) {
        $("#btn_do_input").text("修改");
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

// 关闭编辑窗口
function close_edit_window() {
    $("#cover").hide();
}

// 清空编辑框内容
function do_clear_input() {
    setvalue("windowinput0", "");
    setvalue("windowinput1", "");
    setvalue("windowinput2", "");
    setvalue("windowinput3", "");
    setvalue("windowinput4", "");
    setvalue("windowinput5", new Date().Format("yyyy-MM-dd"));
    setvalue("windowinput6", "");
    setvalue("windowinput7", "");
}

// 新增原始数据
function do_add_data() {
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

// 清空原始数据
function do_clear_data() {
    if (rawDataList == null || rawDataList.length == 0) {
        return;
    }
    if (confirm("警告：确认清空所有已录入的数据？")) {
        rawDataList = [];
        create_raw_table();
    }
}

// 重绘原始数据表格
function create_raw_table() {
    // $("#btn_base_data").html("基础信息");
    setvalue("searchinput0", "");
    setvalue("searchinput1", "");
    setvalue("searchinput2", "");
    setvalue("searchinput3", "");
    setvalue("searchinput4", "");
    setvalue("searchinput5", "");
    search_month_init();
    $("#search_type_view").hide();
    $("#search_month_view").hide();
    $("#data_table").html("");
    if (rawDataList.length == 0) {
        return;
    }
    $("<tr><td>患者姓名</td><td>手机号码</td><td>科室名称</td><td>专家姓名</td><td>手术名称</td><td>手术时间</td><td>手术费用</td><td>所属医助</td><td>备注</td><td>可用操作</td></tr>").appendTo($("#data_table"));
    for(var i in rawDataList) {
        var data = rawDataList[i];
        var info = data[8];
        if (info == null || info == "") {
            info = "<button onclick='edit_raw_info(" + i + ")'>无</button>";
        } else {
            info = "<button onclick='edit_raw_info(" + i + ")'>有</button>";
        }
        $("<tr>"
            + "<td>" + data[0] + "</td>"
            + "<td>" + data[1] + "</td>"
            + "<td>" + data[2] + "</td>"
            + "<td>" + data[3] + "</td>"
            + "<td>" + data[4] + "</td>"
            + "<td>" + data[5] + "</td>"
            + "<td>" + data[6] + "</td>"
            + "<td>" + data[7] + "</td>"
            + "<td>" + info + "</td>"
            + "<td><button class='button1' onclick='edit_raw_data(" + i + ")'>改</button><button class='button1' onclick='delete_raw_data(" + i + ")'>删</button></td>"
        + "</tr>").appendTo($("#data_table"));
    }
}

function edit_raw_info(index) {
    var info = rawDataList[index][8];
    if (info == null) {
        info = "";
    }
    info = prompt('输入备注：', info);
    rawDataList[index][8] = info;
    create_raw_table();
}

// 打开修改指定原始数据的窗口
function edit_raw_data(index) {
    editIndex = index;
    show_edit_window();
}

// 删除指定原始数据
function delete_raw_data(index) {
    rawDataList.splice(index, 1);
    create_raw_table();
}

// 进行搜索行为
function do_search() {
    var patient = getvalue("searchinput0");// 患者姓名
    var assistant = getvalue("searchinput1");// 所属医助
    var expert = getvalue("searchinput2");// 专家姓名
    var department = getvalue("searchinput3");// 科室名称
    var operation = getvalue("searchinput4");// 手术名称
    var time = getvalue("searchinput5");// 手术时间
    if (patient == "" && assistant == "" && expert == "" && department == "" && operation == "") {
        create_raw_table();
        return;
    }
    searchDataList = [];
    for(var i in rawDataList) {
        var data = rawDataList[i];
        if (patient != "" && patient != data[0]) continue;
        if (assistant != "" && assistant != data[7]) continue;
        if (expert != "" && expert != data[3]) continue;
        if (department != "" && department != data[2]) continue;
        if (operation != "" && operation != data[4]) continue;
        if (time != "" && time != data[5].toString().substr(0, 7)) continue;
        searchDataList.push(data);
    }
    create_search_table();
}

var searchYear;
var searchMonth;

function search_month_init() {
    searchYear = new Date().getFullYear();
    searchMonth = new Date().getMonth() + 1;
    searchMonth --;
    if (searchMonth == 0) {
        searchYear --;
        searchMonth = 12;
    }
    var month = searchMonth;
    if (month < 10) {
        month = "0" + month
    }
    $("#search_month_text").text(searchYear + "-" + month);
    setvalue("searchinput5", searchYear + "-" + month);
}

function search_month_last() {
    searchMonth --;
    if (searchMonth == 0) {
        searchYear --;
        searchMonth = 12;
    }
    var month = searchMonth;
    if (month < 10) {
        month = "0" + month
    }
    $("#search_month_text").text(searchYear + "-" + month);
    setvalue("searchinput5", searchYear + "-" + month);
    do_search();
}

function search_month_next() {
    searchMonth ++;
    if (searchMonth == 13) {
        searchYear ++;
        searchMonth = 1;
    }
    var month = searchMonth;
    if (month < 10) {
        month = "0" + month
    }
    $("#search_month_text").text(searchYear + "-" + month);
    setvalue("searchinput5", searchYear + "-" + month);
    do_search();
}

// 重绘搜索结果表格
function create_search_table() {
    // $("#btn_base_data").html("搜索结果");
    $("#search_type_view").show();
    $("#search_month_view").show();
    $("#data_table").html("");
    if (searchDataList.length == 0) {
        return;
    }
    $("<tr><td>患者姓名</td><td>手机号码</td><td>科室名称</td><td>专家姓名</td><td>手术名称</td><td>手术时间</td><td>手术费用</td><td>所属医助</td></tr>").appendTo($("#data_table"));
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
        + "</tr>").appendTo($("#data_table"));
    }
}

// 重绘总体统计表格
function create_statistics_table() {
    $("#data_table").html("");
    $("<tr><td>总体费用合计</td><td>总体绩效合计</td><td>其他人员绩效</td></tr>").appendTo($("#data_table"));
    var data0 = 0;
    for(var i in searchDataList) {
        var data = searchDataList[i];
        var price = data[6];
        if (price == null || price =="") {
            price = 0;
        }
        data0 += parseFloat(price);
    }
    $("<tr>"
        + "<td>" + data0.toFixed(2) + "</td>"
        + "<td>" + (data0 * 0.09).toFixed(2) + "</td>"
        + "<td>" + (data0 * 0.09 * 0.01).toFixed(2) + "</td>"
    + "</tr>").appendTo($("#data_table"));
}

// 重绘医助统计表格
function create_assistant_table() {
    $("#data_table").html("");
    $("<tr><td>医助名称</td><td>费用合计</td><td>绩效合计</td></tr>").appendTo($("#data_table"));
    var assistantList = [];
    for(var i in searchDataList) {
        var data = searchDataList[i];
        var price = data[6];
        if (price == null || price =="") {
            price = 0;
        }
        var assistant = "" + data[7];
        if (assistantList[assistant] == null) {
            assistantList[assistant] = 0;
        }
        assistantList[assistant] += parseFloat(price);
    }
    for (var assistant in assistantList) {
        $("<tr>"
        + "<td>" + assistant + "</td>"
        + "<td>" + assistantList[assistant].toFixed(2) + "</td>"
        + "<td>" + (assistantList[assistant] * 0.09 * 0.07).toFixed(2) + "</td>"
    + "</tr>").appendTo($("#data_table"));
    }
}

// 重绘专家统计表格
function create_expert_table() {
    $("#data_table").html("");
    $("<tr><td>专家名称</td><td>费用合计</td></tr>").appendTo($("#data_table"));
    var expertList = [];
    for(var i in searchDataList) {
        var data = searchDataList[i];
        var price = data[6];
        if (price == null || price =="") {
            price = 0;
        }
        var expert = "" + data[3];
        if (expertList[expert] == null) {
            expertList[expert] = 0;
        }
        expertList[expert] += parseFloat(price);
    }
    for (var expert in expertList) {
        $("<tr>"
        + "<td>" + expert + "</td>"
        + "<td>" + expertList[expert].toFixed(2) + "</td>"
    + "</tr>").appendTo($("#data_table"));
    }
}

// 重绘科室统计表格
function create_department_table() {
    $("#data_table").html("");
    $("<tr><td>科室名称</td><td>费用合计</td></tr>").appendTo($("#data_table"));
    var departmentList = [];
    for(var i in searchDataList) {
        var data = searchDataList[i];
        var price = data[6];
        if (price == null || price =="") {
            price = 0;
        }
        var department = "" + data[2];
        if (departmentList[department] == null) {
            departmentList[department] = 0;
        }
        departmentList[department] += parseFloat(price);
    }
    for (var department in departmentList) {
        $("<tr>"
        + "<td>" + department + "</td>"
        + "<td>" + departmentList[department].toFixed(2) + "</td>"
    + "</tr>").appendTo($("#data_table"));
    }
}
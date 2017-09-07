var Language = new Object();

Language.areaList = ["CN", "EN", "JP"];
Language.areaFlag = 0;
$(document).ready(function() {
    var language = decodeURI(GetQueryString("language"));
    if (language == "CN" || language == "0") {
        Language.areaFlag = 0;
    } else if (language == "EN" || language == "1") {
        Language.areaFlag = 1;
    } else if (language == "JP" || language == "2") {
        Language.areaFlag = 2;
    } else {
        Language.areaFlag = 0;
    }
});

Language.get = function(flag) {
    var result = Language.textList[flag];
    if (result == null) {
        result = Language.areaList[Language.areaFlag] + "-" + flag;
        return result;
    }
    result = result[Language.areaFlag];
    if (result == "") {
        result = Language.areaList[Language.areaFlag] + "-" + flag;
    }
    return result;
}

Language.textList = [];

// 基础字段
Language.textList["test"] = ["测试", "Test", "測試"];
Language.textList["back"] = ["返回", "Back", "返回"];
Language.textList["ok"] = ["确定", "OK", "確定"];
Language.textList["cancel"] = ["取消", "Cancel", "取消"];
Language.textList["quit"] = ["退出", "Quit", "退出"];
Language.textList["start"] = ["开始", "Start", "開始"];
Language.textList["connect"] = ["连接", "Connect", "連接"];
Language.textList["tip_text"] = ["请别忘了服用保健水！", "", ""];
Language.textList["button_remember_text"] = ["记好了", "Skip", "スキップ"];
Language.textList["button_next_text"] = ["下一步", "Next", "次に"];
Language.textList["button_submit_text"] = ["提交", "Submit", "提交"];
Language.textList["meters"] = ["米", "Meters", "米"];
Language.textList["seconds"] = ["秒", "Seconds", "秒"];
Language.textList["ceping_yes"] = ["是", "Yes", "はい"];
Language.textList["ceping_no"] = ["否", "No", "なし"];
Language.textList["ceping_unknow"] = ["不知道", "Unknow", "未知"];

// 颜色
Language.textList["COLOR_RED"] = ["红", "Red", ""];
Language.textList["COLOR_BLUE"] = ["蓝", "Blue", ""];
Language.textList["COLOR_GREEN"] = ["绿", "Green", ""];
Language.textList["COLOR_YELLOW"] = ["黄", "Yellow", ""];

// 脑数据
Language.textList["brain_connect"] = ["连 接", "Connect", ""];
Language.textList["brain_disconnect"] = ["设备断开，请重新连接", "", ""];

// 脑血流仪
Language.textList["brain_hht_text_1"] = ["左脑", "", ""];
Language.textList["brain_hht_text_2"] = ["右脑", "", ""];
Language.textList["brain_hht_state_-1"] = ["请保持设备关闭，并点击连接按钮", "", ""];
Language.textList["brain_hht_state_0"] = ["开始连接", "", ""];
Language.textList["brain_hht_state_1"] = ["请保持设备关闭，正在重启蓝牙……", "", ""];
Language.textList["brain_hht_state_2"] = ["请保持设备关闭，正在重启蓝牙……", "", ""];
Language.textList["brain_hht_state_3"] = ["请保持设备关闭，正在重启蓝牙……", "", ""];
Language.textList["brain_hht_state_4"] = ["请保持设备关闭，正在重启蓝牙……", "", ""];
Language.textList["brain_hht_state_5"] = ["启动蓝牙搜索，请开启设备……", "", ""];
Language.textList["brain_hht_state_6"] = ["请开启设备，搜到后点击选择连接", "", ""];
Language.textList["brain_hht_state_7"] = ["正在解除默认绑定……", "", ""];
Language.textList["brain_hht_state_8"] = ["正在绑定设备……", "", ""];
Language.textList["brain_hht_state_9"] = ["绑定成功，等待获取信标……", "", ""];
Language.textList["brain_hht_state_10"] = ["信标获取完毕，开始校准……", "", ""];
Language.textList["brain_hht_state_11"] = ["校准完毕，开始读取数据……", "", ""];
Language.textList["brain_hht_state_12"] = ["成功获取读数", "", ""];
Language.textList["brain_hht_state_13"] = ["连接异常，请关闭设备并重新连接", "", ""];
Language.textList["brain_hht_state_14"] = ["解绑失败，请关闭设备并重新连接", "", ""];
Language.textList["brain_hht_state_15"] = ["校准失败，请关闭设备并重新连接", "", ""];
Language.textList["brain_hht_state_16"] = ["校准失败，请关闭设备并重新连接", "", ""];
Language.textList["brain_hht_state_17"] = ["连接断开，请关闭设备并重新连接", "", ""];
Language.textList["brain_hht_state_18"] = ["连接失败，请关闭设备并重新连接", "", ""];
Language.textList["brain_hht_state_19"] = ["系统超时，请关闭设备并重新连接", "", ""];

// 脑电波仪
Language.textList["brain_thinkgear_text_1"] = ["集中度：", "", ""];
Language.textList["brain_thinkgear_text_2"] = ["放松度：", "", ""];
Language.textList["brain_thinkgear_state_-1"] = ["设备未连接，请确认开关开启且与本机配对", "", ""];
Language.textList["brain_thinkgear_state_0"] = ["设备未连接，请确认开关开启且与本机配对", "", ""];
Language.textList["brain_thinkgear_state_1"] = ["连接设备中，请确认开关开启且与本机配对", "", ""];
Language.textList["brain_thinkgear_state_2"] = ["连接成功", "", ""];
Language.textList["brain_thinkgear_state_3"] = ["设备未连接，请确认开关开启且与本机配对", "", ""];
Language.textList["brain_thinkgear_state_4"] = ["设备无响应，请确认开关开启且与本机配对", "", ""];
Language.textList["brain_thinkgear_state_5"] = ["设备无响应，请确认开关开启且与本机配对", "", ""];
Language.textList["brain_thinkgear_state_6"] = ["蓝牙不可用，请确认本机蓝牙已开启", "", ""];

// 训练结果
Language.textList["rewult_over_text"] = ["训练结束", "", ""];
Language.textList["rewult_time_text"] = ["所用时间：", "", ""];
Language.textList["rewult_score_text"] = ["整体评价：", "", ""];
Language.textList["rewult_mileage_text"] = ["行驶里程：", "", ""];
Language.textList["rewult_speed_text"] = ["平均速度：", "", ""];
Language.textList["rewult_again_text"] = ["再来一次", "", ""];

// 提示框
Language.textList["info_showquit"] = ["确定退出本任务？", "Do you want to quit?", ""];
Language.textList["info_levelup_1"] = ["成绩不错，再来一轮，加油！", "", ""];
Language.textList["info_levelup_2"] = ["成绩不错，难度要加大啦！", "", ""];
Language.textList["info_levelcontinue"] = ["成绩不错，再来一轮，加油！", "", ""];
Language.textList["info_leveldown_1"] = ["题有点难，再来一轮，加油！", "", ""];
Language.textList["info_leveldown_2"] = ["题有点难，稍微降点难度吧！", "", ""];
Language.textList["info_timeout"] = ["任务时间到啦！", "", ""];

// 软键盘
Language.textList["keyboard_drag_text"] = ["按住拖拽", "Press & Drag", ""];
Language.textList["keyboard_ok_text"] = ["确 认", "OK", ""];
Language.textList["keyboard_clear_text"] = ["清 除", "Clear", ""];
Language.textList["keyboard_backspace_text"] = ["退 格", "Back", ""];

// 预留
Language.textList[""] = ["", "", ""];
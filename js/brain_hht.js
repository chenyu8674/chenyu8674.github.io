var HHT = new Object();
HHT.data = new Object();
HHT.state = -1;// 当前状态
HHT.getDataInterval = 100;// 获取数据间隔
HHT.timeoutFlag = -1;

HHT.stateList = [
Language.get("brain_hht_state_-1"),//-1
Language.get("brain_hht_state_0"),//0
Language.get("brain_hht_state_1"),//1
Language.get("brain_hht_state_2"),//2
Language.get("brain_hht_state_3"),//3
Language.get("brain_hht_state_4"),//4
Language.get("brain_hht_state_5"),//5
Language.get("brain_hht_state_6"),//6
Language.get("brain_hht_state_7"),//7
Language.get("brain_hht_state_8"),//8
Language.get("brain_hht_state_9"),//9
Language.get("brain_hht_state_10"),//10
Language.get("brain_hht_state_11"),//11
Language.get("brain_hht_state_12"),//12
Language.get("brain_hht_state_13"),//13
Language.get("brain_hht_state_14"),//14
Language.get("brain_hht_state_15"),//15
Language.get("brain_hht_state_16"),//16
Language.get("brain_hht_state_17"),//17
Language.get("brain_hht_state_18"),//18
Language.get("brain_hht_state_19"),//19
];

HHT.init = function() {
    BrainWave.dataList = [[], []];
    BrainWave.textList = [Language.get("brain_hht_text_1"), Language.get("brain_hht_text_2")];
    BrainWave.colorList = ["#3B63A0", "#46601F"];
    BrainWave.stepMove = 1;
    BrainWave.drawInterval = 200;
    BrainWave.dataMin = -3;
    BrainWave.dataMax = 3;

    BrainWave.onConnectClick = function() {
        Interface.run("hht", "start");
    };
    BrainWave.onStateChange = function(state) {
        HHT.getstate(state);
    };
    BrainWave.connectDevice = function(address) {
        Interface.run("hht", ["connect", address]);
    };

    if (Interface.isAndroid()) {
        Interface.run("hht", "getstate");
    } else {
        $("#connectcontent").hide();
        $("#wavecontent").show();
        HHT.state = 12;
        HHT.startwave();
    }
}

HHT.getstate = function(state) {
    try {
        state = parseInt(state);
        HHT.state = state;
        var stateText = HHT.stateList[state + 1];
        var fontSize = 32;
        if (stateText.length > 18) {
            fontSize = 32 * 18 / stateText.length;
        }
        $("#connecttitle").css("font-size", fontSize + "px");
        $("#connecttitle").text(stateText);
        if (state == 12) {
            if (START_BUTTON && Config.mustBrain) {
                START_BUTTON.text(Language.get("start"));
                START_BUTTON.unbind("mousedown");
                START_BUTTON.mousedown(starttoplay);
            }
            $("#connectcontent").hide();
            $("#wavecontent").show();
            HHT.startwave();
            BrainWave.getData = true;
        } else {
            if (START_BUTTON && Config.mustBrain) {
                START_BUTTON.text(Language.get("connect"));
                START_BUTTON.unbind("mousedown");
                START_BUTTON.mousedown(BrainWave.switch);
            }
            $("#wavecontent").hide();
            $("#connectcontent").show();
            HHT.stopwave();
            BrainWave.getData = false;
            if (state >= 13) {
                $("#connectlist").html("");
            }
            BrainWave.dataStop();
        }
    } catch(e) {
        log("HHT.getstate=" + e);
    }
}

HHT.startwave = function() {
    HHT.refresh();
}

HHT.stopwave = function() {
    clearTimeout(HHT.timeoutFlag);
}

HHT.refresh = function() {
    clearTimeout(HHT.timeoutFlag);
    HHT.timeoutFlag = setTimeout(HHT.refresh, HHT.getDataInterval);
    if (Interface.isAndroid()) {
        Interface.run("hht", "getdata");
    } else {
        HHT.getDataInterval = 100;// 获取数据间隔
        BrainWave.drawInterval = 100;
        BrainWave.stepMove = 20;
        var l = 3 * getrandomnumber(-100, 100) / 100;
        var r = 3 * getrandomnumber(-100, 100) / 100;
        HHT.showdata('{"L":' + l + ',"R":' + r + '}');
    }
}

HHT.showdata = function(data) {
    eval("HHT.data = " + data);
    var left = HHT.data.L;
    var right = HHT.data.R;
    BrainWave.dataList[0].push(left);
    if (BrainWave.dataList[0].length > BrainWave.canvasWidth / BrainWave.stepMove + 1) {
        BrainWave.dataList[0].shift();
    }
    BrainWave.dataList[1].push(right);
    if (BrainWave.dataList[1].length > BrainWave.canvasWidth / BrainWave.stepMove + 1) {
        BrainWave.dataList[1].shift();
    }
}

HHT.mark = function(marker) {
    Interface.run("hht", ["mark", marker]);
}

HHT.unmark = function() {
    Interface.run("hht", "unmark");
}
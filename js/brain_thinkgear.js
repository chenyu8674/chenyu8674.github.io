var ThinkGear = new Object();
ThinkGear.data = new Object();
ThinkGear.data.PoorSignal = -1;// 信号强度
ThinkGear.data.Attention = 0;// 集中度
ThinkGear.data.Meditation = 0;// 冥想度
ThinkGear.data.Zone = 0;// 表现等级
ThinkGear.data.Blink = 0;// 眨眼强度

// 8个量级的EEG频率带读数
ThinkGear.data.Delta = 0;
ThinkGear.data.Theta = 0;
ThinkGear.data.LowAlpha = 0;
ThinkGear.data.HighAlpha = 0;
ThinkGear.data.LowBeta = 0;
ThinkGear.data.HighBeta = 0;
ThinkGear.data.LowGamma = 0;
ThinkGear.data.MidGamma = 0;

ThinkGear.getDataInterval = 1000;// 获取数据间隔
ThinkGear.state = -1;// 当前状态
ThinkGear.timeoutFlag = -1;
ThinkGear.firstConnect = true;

ThinkGear.stateList = [
Language.get("brain_thinkgear_state_-1"),//-1
Language.get("brain_thinkgear_state_0"),//0
Language.get("brain_thinkgear_state_1"),//1
Language.get("brain_thinkgear_state_2"),//2
Language.get("brain_thinkgear_state_3"),//3
Language.get("brain_thinkgear_state_4"),//4
Language.get("brain_thinkgear_state_5"),//5
Language.get("brain_thinkgear_state_6"),//6
];

ThinkGear.init = function() {
    $("#wavezoom").hide();
    BrainWave.dataList = [[], []];
    BrainWave.textList = [Language.get("brain_thinkgear_text_1"), Language.get("brain_thinkgear_text_2")];
    BrainWave.colorList = ["#3B63A0", "#46601F"];
    BrainWave.stepMove = 10;
    BrainWave.drawInterval = 1000;
    BrainWave.dataMin = 0;
    BrainWave.dataMax = 100;
    BrainWave.waveMin = 1;
    BrainWave.waveMax = 399;
    BrainWave.brainColorStep = 25.5;

    BrainWave.onConnectClick = function() {
        Interface.run("thinkgear", "connect");
    };
    BrainWave.onStateChange = function(state) {
        ThinkGear.getstate(state);
    };

    if (Interface.isAndroid()) {
        Interface.run("thinkgear", "getstate");
    } else {
        $("#connectcontent").hide();
        $("#wavecontent").show();
        ThinkGear.state = 2;
        ThinkGear.startwave();
    }
    Interface.run("thinkgear", "init");
}

ThinkGear.getstate = function(state) {
    try {
        // log("getstate = " + state);
        state = parseInt(state);
        ThinkGear.state = state;
        var stateText = ThinkGear.stateList[state + 1];
        var fontSize = 32;
        if (stateText.length > 18) {
            fontSize = 32 * 18 / stateText.length;
            $("#connecttitle").css("font-size", "28px");
        }
        $("#connecttitle").css("font-size", fontSize + "px");
        $("#connecttitle").text(stateText);
        if (ThinkGear.firstConnect) {
            ThinkGear.firstConnect = false;
            if (state == -1 || state == 3) {
                Interface.run("thinkgear", "connect");
            }
        }
        if (state == 2) {
            if (START_BUTTON && Config.mustBrain) {
                START_BUTTON.text(Language.get("start"));
                START_BUTTON.unbind("mousedown");
                START_BUTTON.mousedown(starttoplay);
            }
            $(".start_button").show();
            $("#connectcontent").hide();
            $("#wavecontent").show();
            ThinkGear.startwave();
            BrainWave.getData = true;
        } else {
            if (START_BUTTON && Config.mustBrain) {
                START_BUTTON.text(Language.get("connect"));
                START_BUTTON.unbind("mousedown");
                START_BUTTON.mousedown(BrainWave.switch);
            }
            $(".start_button").hide();
            $("#wavecontent").hide();
            $("#connectcontent").show();
            ThinkGear.stopwave();
            BrainWave.getData = false;
            if (state >= 4) {
                $("#connectlist").html("");
            }
            BrainWave.dataStop();
        }
    } catch(e) {
    }
}

ThinkGear.startwave = function() {
    ThinkGear.refresh();
}

ThinkGear.stopwave = function() {
    clearTimeout(ThinkGear.timeoutFlag);
}

ThinkGear.refresh = function() {
    clearTimeout(ThinkGear.timeoutFlag);
    ThinkGear.timeoutFlag = setTimeout(ThinkGear.refresh, ThinkGear.getDataInterval);
    if (Interface.isAndroid()) {
        Interface.run("thinkgear", "getattention");
        Interface.run("thinkgear", "getmeditation");
        Interface.run("thinkgear", "getdata");
    } else {
        ThinkGear.waveCount ++;
        var attention = getrandomnumber(0, 100);
        ThinkGear.showattention(attention);
        var meditation = getrandomnumber(0, 100);
        ThinkGear.showmeditation(meditation);

        ThinkGear.data.Delta = getrandomnumber(0, 100);
        ThinkGear.data.Theta = getrandomnumber(0, 100);
        ThinkGear.data.LowAlpha = getrandomnumber(0, 100);
        ThinkGear.data.HighAlpha = getrandomnumber(0, 100);
        ThinkGear.data.LowBeta = getrandomnumber(0, 100);
        ThinkGear.data.HighBeta = getrandomnumber(0, 100);
        ThinkGear.data.LowGamma = getrandomnumber(0, 100);
        ThinkGear.data.MidGamma = getrandomnumber(0, 100);
    }
}

ThinkGear.showattention = function(attention) {
    ThinkGear.data.Attention = attention;
    BrainWave.dataList[0].push(attention);
    if (BrainWave.dataList[0].length > BrainWave.canvasWidth / BrainWave.stepMove + 1) {
        BrainWave.dataList[0].shift();
    }
}

ThinkGear.showmeditation = function(meditation) {
    ThinkGear.data.Meditation = meditation;
    BrainWave.dataList[1].push(meditation);
    if (BrainWave.dataList[1].length > BrainWave.canvasWidth / BrainWave.stepMove + 1) {
        BrainWave.dataList[1].shift();
    }
}

ThinkGear.getdata = function() {
    Interface.run("thinkgear", "getdata");
}

ThinkGear.showdata = function(data) {
    // log(data);
    eval("ThinkGear.data = " + data);
}
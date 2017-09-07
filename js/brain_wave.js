var BrainWave = new Object();
BrainWave.getData = false;// 是否连通数据
BrainWave.showWave = false;// 是否显示脑波窗口

BrainWave.canvas = null;
BrainWave.context = null;
BrainWave.canvasWidth = 600;// 像素宽度
BrainWave.canvasHeight = 400;// 像素高度
BrainWave.waveMin = 0;// 最低显示位置
BrainWave.waveMax = 400;// 最高显示位置
BrainWave.stepMove = 1;// 每次向右步进刷新的像素数
BrainWave.dataMin = 0;// 最低显示数值
BrainWave.dataMax = 0;// 最低显示数值
BrainWave.timeoutFlag = null;
BrainWave.drawInterval = 500;
BrainWave.lineWidth = 2;// 曲线宽度
BrainWave.dataList = [];
BrainWave.textList = [];
BrainWave.colorList = [];
BrainWave.backImg = null;

BrainWave.brainColorStep = 15;
BrainWave.brainColor = [255, 0, 255];

$(document).ready(function() {
    var brainMode = decodeURI(GetQueryString("brain"));
    log("brainMode = " + brainMode);
    if (brainMode == "null" || brainMode == "none" || brainMode == "") {
        return;
    }
    Config.brainMode = brainMode;
    if (Config.brainMode == "thinkgear") {
        $("#wavebrainimg").attr("src", "img/brain1.png");
        $("#wavetext1").css("top", "120px");
        $("#wavetext1").css("width", "170px");
        $("#wavetext1").css("right", "0px");
        $("#wavetext1").css("text-align", "left");
        $("#wavetext1").css("font-size", "28px");

        $("#wavetext2").css("top", "160px");
        $("#wavetext2").css("width", "170px");
        $("#wavetext2").css("right", "0px");
        $("#wavetext2").css("text-align", "left");
        $("#wavetext2").css("font-size", "28px");

        for (var i = 0; i < 8; i++) {
            var left = i * 70 + 30;
            var color = "";
            if (i == 0) {
                color = "#943205";
            } else if (i == 1) {
                color = "#902534";
            } else if (i == 2) {
                color = "#6F0B10";
            } else if (i == 3) {
                color = "#551120";
            } else if (i == 4) {
                color = "#26172B";
            } else if (i == 5) {
                color = "#0A3667";
            } else if (i == 6) {
                color = "#13472E";
            } else if (i == 7) {
                color = "#102A16";
            }
            var div = $("<div/>").appendTo($("#wavecontent"));
            div.css("position", "absolute");
            div.css("width", "50px");
            div.css("height", BrainWave.canvasHeight + "px");
            div.css("bottom", "0px");
            div.css("left", left + "px");
            div.css("background", color);
            div.attr("class", "thinkgearblock");
        }

        ThinkGear.init();
    }
    if (Config.brainMode == "hht") {
        $("#wavebrainimg").attr("src", "img/brain2.png");
        HHT.init();
    }
    BrainWave.init();
    BrainWave.drawwave();
});

BrainWave.init = function() {
    BrainWave.canvas = $("#wavecanvas");
    BrainWave.context = (BrainWave.canvas)[0].getContext("2d");
    BrainWave.drawCoordinate();

    $("#brainbutton").show();
    $("#brainbutton").click(BrainWave.switch);
    $("#brainbg").click(BrainWave.switch);
    $("#connectbutton").text(Language.get("brain_connect"));
    $("#connectbutton").click(function(){
        BrainWave.onConnectClick();
        return false;
    });

    $("#wavezoom").click(function(){
        if ($(this).text() == "×1") {
            $(this).text("×2");
            BrainWave.dataMin = -2;
            BrainWave.dataMax = 2;
        } else if ($(this).text() == "×2") {
            $(this).text("×3");
            BrainWave.dataMin = -1;
            BrainWave.dataMax = 1;
        } else if ($(this).text() == "×3") {
            $(this).text("×4");
            BrainWave.dataMin = -0.5;
            BrainWave.dataMax = 0.5;
        } else if ($(this).text() == "×4") {
            $(this).text("×1");
            BrainWave.dataMin = -3;
            BrainWave.dataMax = 3;
        }
        return false;
    });
}

// 连接按钮点击事件
BrainWave.onConnectClick = function() {};
// Android回调：设备状态改变
BrainWave.onStateChange = function(state) {};
// Android指令：连接指定设备
BrainWave.connectDevice = function(address) {};
// Android回调：获取到设备列表
BrainWave.onDeviceDiscovery = function(json) {
    eval("var deviceList=" + json);
    if (deviceList == null || deviceList.length == 0) {
        return;
    }
    deviceList = deviceList.list;
    $("#connectlist").html("");
    for (var i = 0; i < deviceList.length; i++) {
        var device = deviceList[i];
        var item = $("<div/>").appendTo($("#connectlist"));
        item.attr("class", "connectdeviceitem");
        item.click(function(){
            BrainWave.connectDevice(device.address);
            return false;
        });
        var text = $("<div/>").appendTo(item);
        text.attr("class", "connectdevicename");
        text.text(device.name);
        var text = $("<div/>").appendTo(item);
        text.attr("class", "connectdeviceaddress");
        text.text(device.address);
    }
};

// 大小窗口切换
BrainWave.switch = function() {
    if (BrainWave.showWave) {
        $("#brainbg").hide();
        BrainWave.showWave = false;
    } else {
        $("#brainbg").show();
        BrainWave.showWave = true;
    }
    clearTimeout(BrainWave.timeoutFlag);
    BrainWave.drawwave();
    return false;
}

// thinkgear全脑，否则0左脑1右脑
BrainWave.brainColorUp = function(flag) {
    if (BrainWave.brainColor[0] < 255) {
        BrainWave.brainColor[0] = BrainWave.brainColor[0] + BrainWave.brainColorStep;
    } else if (BrainWave.brainColor[2] > 0) {
        BrainWave.brainColor[2] = BrainWave.brainColor[2] - BrainWave.brainColorStep;
    }
    if (BrainWave.showWave) {
        if (Config.brainMode == "thinkgear") {
            $("#wavebrain1").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
            $("#wavebrain2").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
        } else if (flag == 0) {
            $("#wavebrain1").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
        } else if (flag == 1) {
            $("#wavebrain2").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
        }
    }
}

// thinkgear全脑，否则0左脑1右脑
BrainWave.brainColorDown = function(flag) {
    if (BrainWave.brainColor[2] < 255) {
        BrainWave.brainColor[2] = BrainWave.brainColor[2] + BrainWave.brainColorStep;
    } else if (BrainWave.brainColor[0] > 0) {
        BrainWave.brainColor[0] = BrainWave.brainColor[0] - BrainWave.brainColorStep;
    }
    if (BrainWave.showWave) {
        if (Config.brainMode == "thinkgear") {
            $("#wavebrain1").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
            $("#wavebrain2").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
        } else if (flag == 0) {
            $("#wavebrain1").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
        } else if (flag == 1) {
            $("#wavebrain2").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
        }
    }
}

// 0左脑1右脑
BrainWave.setBrainColor = function(value, flag) {
    if (value > BrainWave.dataMax) {
        value = BrainWave.dataMax;
    }
    if (value < BrainWave.dataMin) {
        value = BrainWave.dataMin;
    }
    var temp = (BrainWave.dataMax + BrainWave.dataMin) / 2;
    var temp2 = (BrainWave.dataMax - BrainWave.dataMin) / 2;
    if (value >= temp) {
        var color = 255 - 255 * (value - temp) / temp2;
        color = Math.round(color);
        BrainWave.brainColor = [255, 0, color];
    } else {
        var color = 255 - 255 * (temp - value) / temp2;
        color = Math.round(color);
        BrainWave.brainColor = [color, 0, 255];
    }
    if (flag == 0) {
        $("#wavebrain1").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
    } else if (flag == 1) {
        $("#wavebrain2").css("background", "rgb(" + BrainWave.brainColor[0] + "," + BrainWave.brainColor[1] + "," + BrainWave.brainColor[2] + ")");
    }
}

// 轮询绘制图像
BrainWave.drawwave = function() {
    clearTimeout(BrainWave.timeoutFlag);
    BrainWave.timeoutFlag = setTimeout(BrainWave.drawwave, BrainWave.drawInterval);

    if (Config.brainMode == "hht") {
        if (HHT.state != 12) {
            $("#brainbutton").css("background", "#bbb");
            if (START_BUTTON && Config.mustBrain) {
                START_BUTTON.text(Language.get("connect"));
                START_BUTTON.unbind("mousedown");
                START_BUTTON.mousedown(BrainWave.switch);
            }
            return;
        } else if (START_BUTTON && Config.mustBrain) {
            START_BUTTON.text(Language.get("start"));
            START_BUTTON.unbind("mousedown");
            START_BUTTON.mousedown(starttoplay);
        }
    } else if (Config.brainMode == "thinkgear") {
        if (ThinkGear.state != 2) {
            $("#brainbutton").css("background", "#bbb");
            if (START_BUTTON && Config.mustBrain) {
                START_BUTTON.text(Language.get("connect"));
                START_BUTTON.unbind("mousedown");
                START_BUTTON.mousedown(BrainWave.switch);
            }
            return;
        } else if (START_BUTTON && Config.mustBrain) {
            START_BUTTON.text(Language.get("start"));
            START_BUTTON.unbind("mousedown");
            START_BUTTON.mousedown(starttoplay);
        }
    }
    $("#brainbutton").css("background", "#fff");
    // 额叶变色
    for (var i = 0; i < 2; i++) {
        var dataList = BrainWave.dataList[i];
        if (dataList.length >= 2) {
            if (Config.brainMode == "thinkgear") {
                if (dataList[dataList.length - 1] > dataList[dataList.length - 2]) {
                    BrainWave.brainColorUp(i);
                } else if (dataList[dataList.length - 1] < dataList[dataList.length - 2]) {
                    BrainWave.brainColorDown(i);
                }
            } else if (Config.brainMode == "hht") {
                BrainWave.setBrainColor(dataList[dataList.length - 1], i);
            }
        }
    }
    // 文字显示
    if (BrainWave.showWave) {
        var dateStr1 = new Date().Format("yyyy-MM-dd");
        var dateStr2 = new Date().Format("hh:mm:ss");
        $("#wavedate1").text(dateStr1);
        $("#wavedate2").text(dateStr2);
        $("#wavetext1").css("color", BrainWave.colorList[0]);
        $("#wavetext2").css("color", BrainWave.colorList[1]);
        if (Config.brainMode == "hht") {
            $("#wavetext1").text(BrainWave.textList[0]);
            $("#wavetext2").text(BrainWave.textList[1]);
        } else {
            $("#wavetext1").text(BrainWave.textList[0] + ThinkGear.data.Attention);
            $("#wavetext2").text(BrainWave.textList[1] + ThinkGear.data.Meditation);
        }
    }
    // 绘制图表
    if (Config.brainMode == "hht" && BrainWave.showWave) {
        // 清空绘图区并显示背景
        BrainWave.context.clearRect(0, 0, BrainWave.canvasWidth, BrainWave.canvasHeight);
        BrainWave.context.drawImage(BrainWave.backImg, 0, 0);
        // 绘制曲线
        for (var i = 0; i < 2; i++) {
            BrainWave.context.beginPath();
            BrainWave.context.lineWidth = BrainWave.lineWidth;
            BrainWave.context.strokeStyle = BrainWave.colorList[i];
            var dataList = BrainWave.dataList[i];
            for (var j = 0; j < dataList.length; j++) {
                var data = dataList[j];
                if (data > BrainWave.dataMax) {
                    data = BrainWave.dataMax;
                } else if (data < BrainWave.dataMin) {
                    data = BrainWave.dataMin;
                }
                data = BrainWave.waveMin + (BrainWave.waveMax - BrainWave.waveMin) * (data - BrainWave.dataMin) / (BrainWave.dataMax - BrainWave.dataMin);
                if (j == 0) {
                    BrainWave.context.moveTo(j * BrainWave.stepMove, BrainWave.canvasHeight - data);
                } else {
                    BrainWave.context.lineTo(j * BrainWave.stepMove, BrainWave.canvasHeight - data);
                }
            }
            BrainWave.context.stroke();
        }
    } else if (Config.brainMode == "thinkgear" && BrainWave.showWave) {
        var max = Math.max(ThinkGear.data.Delta, ThinkGear.data.Theta, ThinkGear.data.LowAlpha, ThinkGear.data.HighAlpha, ThinkGear.data.LowBeta, ThinkGear.data.HighBeta, ThinkGear.data.LowGamma, ThinkGear.data.MidGamma);
        var blockList = $(".thinkgearblock");
        for (var i = 0; i < 8; i++) {
            var height = 0;
            if (i == 0) {
                height = ThinkGear.data.Delta * 70 / max + 20;
            } else if (i == 1) {
                height = ThinkGear.data.Theta * 70 / max + 20;
            } else if (i == 2) {
                height = ThinkGear.data.LowAlpha * 70 / max + 20;
            } else if (i == 3) {
                height = ThinkGear.data.HighAlpha * 70 / max + 20;
            } else if (i == 4) {
                height = ThinkGear.data.LowBeta * 70 / max + 20;
            } else if (i == 5) {
                height = ThinkGear.data.HighBeta * 70 / max + 20;
            } else if (i == 6) {
                height = ThinkGear.data.LowGamma * 70 / max + 20;
            } else if (i == 7) {
                height = ThinkGear.data.MidGamma * 70 / max + 20;
            }
            height = 10 * Math.sqrt(height);
            height = height * BrainWave.canvasHeight / 100;
            var block = $(blockList.get(i));
            block.animate({height:height}, BrainWave.drawInterval);
        }
    }
}

// 绘制虚线网格
BrainWave.drawCoordinate = function() {
    var lines = 16;
    var rows = 24;
    for (var i = 1; i <= lines - 1; i++) {
        if (Config.brainMode == "hht" && i == lines / 2) {
            BrainWave.drawDashLine(BrainWave.context, 0, BrainWave.canvasHeight / lines * i, BrainWave.canvasWidth, BrainWave.canvasHeight / lines * i, 0, 1, "#b42");
        } else {
            BrainWave.drawDashLine(BrainWave.context, 0, BrainWave.canvasHeight / lines * i, BrainWave.canvasWidth, BrainWave.canvasHeight / lines * i, 1, 1, "#C48093");
        }
    }
    for (var i = 1; i <= rows - 1; i++) {
        BrainWave.drawDashLine(BrainWave.context, BrainWave.canvasWidth / rows * i, 0, BrainWave.canvasWidth / rows * i, BrainWave.canvasHeight, 1, 1, "#C48093");
    }
    BrainWave.backImg = new Image();
    BrainWave.backImg.src = (BrainWave.canvas)[0].toDataURL("image/png");
}

// 绘制单条虚线
BrainWave.drawDashLine = function(ctx, x1, y1, x2, y2, dashLength, width, color) {
    var dashLen = dashLength === undefined ? 5 : dashLength;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    if (dashLen != 0) {
        var xpos = x2 - x1;
        var ypos = y2 - y1;
        var numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
        for (var i = 0; i < numDashes; i++) {
            if (i % 2 === 0) {
                ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
            } else {
                ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
            }
        }
    } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }
    ctx.stroke();
}

BrainWave.dataStop = function() {
    if (!START_BUTTON && Config.mustBrain) {
        TimeBar.stop();
        BrainWave.showdatastop();
    }
}

BrainWave.showdatastop = function() {
    Info.show(Language.get("brain_disconnect"), init);
}
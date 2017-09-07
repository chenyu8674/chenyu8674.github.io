Config.titleText = ["朗读训练", "", ""];
Config.contentText = ["请大声朗读全文，并录制、播放自己的声音，不断与范读进行比较。", "", ""];
Config.exerciseText = ["请播放范读，然后点击录音并大声朗读全文", "", ""];
Config.sendScore = false;
Config.sendRecord = 0;

document.write('<script type="text/javascript" src="js-games/read.js"></script>');

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {}

var ON_START_ANSWER = function() {
    var readString = readStringList[getrandomnumber(0, readStringList.length - 1)];
    var stringList = readString.split("|");
    Read.init(stringList[0]);
    Read.create(stringList[1], stringList[2]);
}

var ON_TASK_END = function() {}

var Read = new Object();
Read.src = null;
Read.button1 = null;// 范读/停止范读
Read.button2 = null;// 录音/停止录音
Read.button3 = null;// 播放录音/停止播放
Read.isReading = false;// 是否处于范读阶段
Read.isRecorder = false;// 是否处于录音阶段
Read.isPlaying = false;// 是否处于播放录音阶段
Read.hasRecorder = false;// 是否已经录音

Read.init = function(name) {
    Read.src = "read/" + name + ".mp3";
}

Read.create = function(tit, txt) {
    var view = $("<div/>").appendTo(CONTENT);
    view.css("width", "100%");
    view.css("height", "100%");
    view.css("background", "rgba(255,255,255,0.4)");

    var title = $("<div/>").appendTo(view);
    title.css("position", "fixed");
    title.css("width", "730px");
    title.css("top", "110px");
    title.css("left", "50px");
    title.css("font-size", "38px");
    title.css("text-align", "center");
    title.html(tit);

    var centerWidth = 730;
    var centerHeight = CONTENT_HEIGHT - 145;

    var text = $("<div/>").appendTo(view);
    text.css("position", "fixed");
    text.css("max-width", centerWidth + "px");
    text.css("line-height", "50px");
    text.css("font-size", "28px");
    text.css("text-indent", "2em");
    text.css("overflow", "auto");
    text.css("max-height", centerHeight + "px");
    text.attr("class", "read_text");
    text.html(txt);

    var textWidth = text.width();
    var textHeight = text.height();
    text.css("top", 190 + (centerHeight - textHeight) * 0.4 + "px");
    text.css("left", 50 + (centerWidth - textWidth) / 2 + "px");
    $(".read_text p").css("margin", "0px");
    $(".read_text p").css("padding", "0px");

    Read.button1 = $("<div/>").appendTo(view);
    Read.button1.css("position", "absolute");
    Read.button1.css("width", "140px");
    Read.button1.css("height", "100px");
    Read.button1.css("right", "50px");
    Read.button1.css("line-height", "100px");
    Read.button1.css("text-align", "center");
    Read.button1.css("font-size", "32px");
    Read.button1.css("background", "url(img/button.png)");
    Read.button1.css("background-size", "100px 100px");
    Read.button1.css("background-position", "center");
    Read.button1.css("background-repeat", "no-repeat");
    Read.button1.css("top", CONTENT_HEIGHT * 0.18 + "px");
    Read.button1.text("范读");
    Read.button1.mousedown(Read.dobutton1);

    Read.button2 = $("<div/>").appendTo(view);
    Read.button2.css("position", "absolute");
    Read.button2.css("width", "140px");
    Read.button2.css("height", "100px");
    Read.button2.css("right", "50px");
    Read.button2.css("line-height", "100px");
    Read.button2.css("text-align", "center");
    Read.button2.css("font-size", "32px");
    Read.button2.css("background", "url(img/button.png)");
    Read.button2.css("background-size", "100px 100px");
    Read.button2.css("background-position", "center");
    Read.button2.css("background-repeat", "no-repeat");
    Read.button2.css("top", CONTENT_HEIGHT * 0.4 + "px");
    Read.button2.text("录音");
    Read.button2.mousedown(Read.dobutton2);

    Read.button3 = $("<div/>").appendTo(view);
    Read.button3.css("position", "absolute");
    Read.button3.css("width", "140px");
    Read.button3.css("height", "100px");
    Read.button3.css("right", "50px");
    Read.button3.css("line-height", "100px");
    Read.button3.css("text-align", "center");
    Read.button3.css("font-size", "32px");
    Read.button3.css("background", "url(img/button.png)");
    Read.button3.css("background-size", "100px 100px");
    Read.button3.css("background-position", "center");
    Read.button3.css("background-repeat", "no-repeat");
    Read.button3.css("top", CONTENT_HEIGHT * 0.62 + "px");
    Read.button3.text("播放录音");
    Read.button3.mousedown(Read.dobutton3);
}

Read.dobutton1 = function() {
    if (Read.button1.text() == "范读") {
        Read.button1.text("停止范读");
        Read.checkstate();
        Read.isReading = true;
        Interface.run("sound", ["startplay", Read.src, ""]);
    } else {
        Read.button1.text("范读");
        Read.isReading = false;
        TimeBar.stop();
        Interface.run("sound", ["stopplay"]);
    }
}

Read.dobutton2 = function() {
    if (Read.button2.text() == "录音") {
        Read.button2.text("停止录音");
        Read.checkstate();
        Read.isRecorder = true;
        Interface.run("sound", ["startrecorder"]);
    } else {
        Read.button2.text("录音");
        Read.isRecorder = false;
        Interface.run("sound", ["stoprecorder"]);
    }
}

Read.dobutton3 = function() {
    if (Read.button3.text() == "播放录音") {
        Read.button3.text("停止播放");
        Read.checkstate();
        Read.isPlaying = true;
        Interface.run("sound", ["startrecorderplay"]);
    } else {
        Read.button3.text("播放录音");
        Read.isPlaying = false;
        TimeBar.stop();
        Interface.run("sound", ["stoprecorderplay"]);
    }
}

Read.ongetduration = function(duration) {
    duration = parseInt(duration);
    if (duration) {
        TimeBar.start(duration, function(){}, true);
    }
}

Read.checkstate = function() {
    if (Read.isReading) {
        Read.button1.text("范读");
        Read.isReading = false;
        TimeBar.stop();
        Interface.run("sound", ["stopplay"]);
    }
    if (Read.isRecorder) {
        Read.button2.text("录音");
        Read.isRecorder = false;
        Interface.run("sound", ["stoprecorder"]);
    }
    if (Read.isPlaying) {
        Read.button3.text("播放录音");
        Read.isPlaying = false;
        TimeBar.stop();
        Interface.run("sound", ["stoprecorderplay"]);
    }
}

Read.onreadcomplete = function() {
    Read.button1.text("范读");
    Read.isReading = false;
}

Read.onrecordercomplete = function() {
    Read.button3.text("播放录音");
    Read.isPlaying = false;
}
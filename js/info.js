var Info = new Object();
Info.isShow = false;

$(document).ready(function() {
    Info.info0 = new Image();
    Info.info0.src = "img/info_0.png";
    $("#btn_info_0").text(Language.get("ok"));
    $("#btn_info_1").text(Language.get("cancel"));
    $("#btn_info_2").text(Language.get("ok"));
});

Info.text = function(text) {
    $("#info_text").text(text);
}

Info.unbind = function() {
    $("#btn_info_0").unbind("mousedown");
    $("#btn_info_1").unbind("mousedown");
    $("#btn_info_2").unbind("mousedown");
}

Info.show = function(text, callback) {
    Info.isShow = true;
    Info.unbind();
    Info.text(text);
    $("#btn_info_1").hide();
    $("#btn_info_2").hide();
    $("#btn_info_0").show();
    $("#btn_info_0").mousedown(function() {
        Info.isShow = false;
        $("#infobg").hide();
        callback && callback();
    });
    $("#infoimg").css("background-image", "url(img/info_0.png)");
    $("#infobg").show();
}

Info.showquit = function() {
    Info.isShow = true;
    Info.unbind();
    $("#btn_info_1").show();
    $("#btn_info_2").show();
    $("#btn_info_0").hide();
    $("#btn_info_1").mousedown(Info.hidquit);
    $("#btn_info_2").mousedown(Interface.finish);
    $("#infoimg").css("background-image", "url(img/info_0.png)");
    Info.text(Language.get("info_showquit"));
    $("#infobg").show();
    TimeBar.pause();
}

Info.hidquit = function() {
    Info.isShow = false;
    $("#infobg").hide();
    TimeBar.resume();
}

Info.levelup = function() {
    Info.isShow = true;
    TimeBar.stop();
    TimeBar.pause();
    if (Config.hasLevelInfo) {
        Info.unbind();
        $("#infobg").show();
        $("#infoimg").css("background-image", "url(img/info_0.png)");
        if (Game.level == Config.maxLevel + 1) {
            Info.text(Language.get("info_levelup_1"));
        } else {
            Info.text(Language.get("info_levelup_2"));
        }
        $("#btn_info_1").hide();
        $("#btn_info_2").hide();
        $("#btn_info_0").show();
        $("#btn_info_0").mousedown(onlvlup);
    } else {
        onlvlup();
    }
}

Info.levelcontinue = function() {
    Info.isShow = true;
    TimeBar.stop();
    TimeBar.pause();
    if (Config.hasLevelInfo) {
        Info.unbind();
        $("#infobg").show();
        $("#infoimg").css("background-image", "url(img/info_0.png)");
        Info.text(Language.get("info_levelcontinue"));
        $("#btn_info_1").hide();
        $("#btn_info_2").hide();
        $("#btn_info_0").show();
        $("#btn_info_0").mousedown(onlvlcontinue);
    } else {
        onlvlcontinue();
    }
}

Info.leveldown = function() {
    Info.isShow = true;
    TimeBar.stop();
    TimeBar.pause();
    if (Config.hasLevelInfo) {
        Info.unbind();
        $("#infobg").show();
        $("#infoimg").css("background-image", "url(img/info_0.png)");
        if (Game.level == Config.minLevel - 1) {
            Info.text(Language.get("info_leveldown_1"));
        } else {
            Info.text(Language.get("info_leveldown_2"));
        }
        $("#btn_info_1").hide();
        $("#btn_info_2").hide();
        $("#btn_info_0").show();
        $("#btn_info_0").mousedown(onlvldown);
    } else {
        onlvldown();
    }
}

function onlvlup() {
    Info.isShow = false;
    TimeBar.resume();
    $("#infobg").hide();
    if (Game.level > Config.maxLevel) {
        Game.level = Config.maxLevel;
    }
    Game.startgame(Game.level);
}

function onlvlcontinue() {
    Info.isShow = false;
    TimeBar.resume();
    $("#infobg").hide();
    Game.startgame(Game.level);
}

function onlvldown() {
    Info.isShow = false;
    TimeBar.resume();
    $("#infobg").hide();
    if (Game.level < Config.minLevel) {
        Game.level = Config.minLevel;
    }
    Game.startgame(Game.level);
}

Info.showtimeout = function() {
    Info.isShow = true;
    Info.unbind();
    $("#infobg").show();
    $("#infoimg").css("background-image", "url(img/info_0.png)");
    Info.text(Language.get("info_timeout"));
    $("#btn_info_1").hide();
    $("#btn_info_2").hide();
    $("#btn_info_0").show();
    $("#btn_info_0").mousedown(Interface.finish);
}
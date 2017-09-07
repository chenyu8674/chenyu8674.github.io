// 加载JS
var loadJsList = ["language", "ball", "brain_hht", "brain_thinkgear", "brain_wave", "button", "config", "game", "info", "interface", "keyboard", "record", "result", "timebar", "timeout", "tools"];
for (var i = 0; i < loadJsList.length; i++) {
    loadJsByName("js", loadJsList[i]);
}
loadJsByName("js-games", decodeURI(GetQueryString("name")));

// 获取页面参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return r[2];
    } else {
        return null;
    }
}

// 加载JS文件
function loadJsByName(path, name) {
    if (name != "null") {
        document.write('<script type="text/javascript" src="' + path + "/" + name + '.js"></script>');
    }
}

// 加载CSS文件
function loadCssByName(name) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "css/" + name + ".css";
    document.getElementsByTagName("head")[0].appendChild(link);
}

var CONTENT;
var TITLE_TEXT;
var START_BUTTON = $("<div/>");

var SCREEN_ZOOM;
var WINDOW_WIDTH = 0;
var WINDOW_HEIGHT = 0;
var TITLE_HEIGHT = 0;
var CONTENT_WIDTH = 0;
var CONTENT_HEIGHT = 0;

$(document).ready(function() {
    CONTENT = $("#content");
    TITLE_TEXT = $("#title_text");
    adapt();
    setTimeout(init, 100);
    // Info.show(Language.get("tip_text"), null);
});

function adapt() {
    SCREEN_ZOOM = $(window).width() / 1000;
    document.body.style.zoom = SCREEN_ZOOM * 100 + "%";
    log("SCREEN_ZOOM = " + SCREEN_ZOOM);
}  

function init() {
    window.onresize = adapt;
    WINDOW_WIDTH = $(window).width();
    WINDOW_HEIGHT = $(window).height();
    TITLE_HEIGHT = $("#title").height();
    CONTENT.css("visibility", "visible");
    if (Config.defaultStyle) {
        CONTENT.css("background-image", "url(img/bg.jpg)");
    }
    clearcontent();
    TITLE_TEXT.html("");

    // 初始化训练难度
    var level = decodeURI(GetQueryString("level"));
    if(level != "null") {
        Config.startLevel = parseInt(level);
    }

    var startTitle = $("<div/>").appendTo(CONTENT);
    startTitle.attr("class", "start_title");
    startTitle.text(Config.titleText[Language.areaFlag]);
    var startText = $("<div/>").appendTo(CONTENT);
    startText.attr("class", "start_text");
    startText.text(Config.contentText[Language.areaFlag]);
    START_BUTTON = $("<div/>").appendTo(CONTENT);
    START_BUTTON.attr("class", "start_button");
    if (Config.brainMode != "none" && Config.mustBrain) {
        START_BUTTON.text(Language.get("connect"));
        START_BUTTON.unbind("mousedown");
        START_BUTTON.mousedown(BrainWave.switch);
    } else {
        START_BUTTON.text(Language.get("start"));
        START_BUTTON.unbind("mousedown");
        START_BUTTON.mousedown(starttoplay);
    }
    $("#btn_back").text(Language.get("quit"));
    $("#btn_back").click(Interface.quit);

    if (Config.brainMode == "hht") {
        Interface.run("hht", "startdata");
    }
}

function starttoplay() {
    START_BUTTON = null;
    $("#btn_back").unbind("click");
    $("#btn_back").click(Info.showquit);

    CONTENT_WIDTH = CONTENT.width();
    CONTENT_HEIGHT = CONTENT.height();
    ON_GET_SIZE(CONTENT_WIDTH, CONTENT_HEIGHT);

    Record.taskstart();
    Game.reset();
    Game.startgame(Config.startLevel);
}

function clearcontent() {
    CONTENT.html("");
}
function log(info) {
    console.log(info);
}

// 加载JS
var loadJsList = ["ball", "config", "game", "timebar", "tools"];
for (var i = 0; i < loadJsList.length; i++) {
    loadJsByName("js", loadJsList[i]);
}
loadJsByName("js-games", "game_shuerte2");

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
    init();
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
    clearcontent();
    TITLE_TEXT.html("");
    var startTitle = $("<div/>").appendTo(CONTENT);
    startTitle.attr("class", "start_title");
    startTitle.html(Config.titleText[0]);
    var startText = $("<div/>").appendTo(CONTENT);
    startText.attr("class", "start_text");
    startText.html(Config.contentText[0]);
    START_BUTTON = $("<div/>").appendTo(CONTENT);
    START_BUTTON.attr("class", "start_button");
    START_BUTTON.text("开始");
    START_BUTTON.unbind("mousedown");
    // START_BUTTON.mousedown(starttoplay);
    START_BUTTON[0].addEventListener('mousedown', starttoplay, false);

    // document.getElementById('sound_pop1').volume = 0.0;
    // document.getElementById('sound_pop2').volume = 0.0;
    // document.getElementById('sound_pop3').volume = 0.0;
    // document.getElementById('sound_pop4').volume = 0.0;
    // document.getElementById('sound_pop5').volume = 0.0;
    // document.getElementById('sound_wrong').volume = 0.0;
}

function starttoplay() {
    START_BUTTON = null;
    CONTENT_WIDTH = CONTENT.width();
    CONTENT_HEIGHT = CONTENT.height();
    ON_GET_SIZE(CONTENT_WIDTH, CONTENT_HEIGHT);
    Game.reset();
    Game.startgame(Config.startLevel);

    // document.getElementById('sound_pop1').play();
    // document.getElementById('sound_pop2').play();
    // document.getElementById('sound_pop3').play();
    // document.getElementById('sound_pop4').play();
    // document.getElementById('sound_pop5').play();
    // document.getElementById('sound_wrong').play();
    // setTimeout(resetVolume, 500);
}

// function resetVolume() {
//     document.getElementById('sound_pop1').volume = 1.0;
//     document.getElementById('sound_pop2').volume = 1.0;
//     document.getElementById('sound_pop3').volume = 1.0;
//     document.getElementById('sound_pop4').volume = 1.0;
//     document.getElementById('sound_pop5').volume = 1.0;
//     document.getElementById('sound_wrong').volume = 1.0;
// }

function clearcontent() {
    CONTENT.html("");
}
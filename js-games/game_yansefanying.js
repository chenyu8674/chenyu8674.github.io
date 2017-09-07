Config.titleText = ["颜色反应", "", ""];
Config.contentText = ["屏幕中将会连续出现各种颜色的文字，请快速判断当前文字的实际颜色，并按下相应的按钮。", "", ""];

var colorIndex = 0;
var colorCount = 0;
var currentColor = "";
var levelTime = 0;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    colorIndex = 0;
    switch(level) {
        case 1:
            colorCount = 1;
            levelTime = 4000;
            break;
        case 2:
            colorCount = 3;
            levelTime = 3500;
            break;
        case 3:
            colorCount = 5;
            levelTime = 3000;
            break;
        case 4:
            colorCount = 7;
            levelTime = 2500;
            break;
        case 5:
            colorCount = 10;
            levelTime = 2000;
            break;
    }
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    startcolor();
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}

var questionText = ["请选出文字的<tex class='alarm'>实际颜色</tex>", "", ""];

function startcolor() {
    clearcontent();
    showtext();
    showbutton();
    TITLE_TEXT.html(questionText[Language.areaFlag] + "（"+(colorIndex+1)+"/"+colorCount+"）");
    TimeBar.start(levelTime, Game.wrong);
}

function showtext() {
    var textColor = getrandomcolor();
    var colorText = getcolortext(getrandomcolor());
    currentColor = getcolortext(textColor);

    var height = CONTENT_HEIGHT / 2;
    var numberView = $("<div/>").appendTo(CONTENT);
    numberView.css("position", "absolute");
    numberView.css("width", CONTENT_WIDTH + "px");
    numberView.css("height", height + "px");
    numberView.css("top", (CONTENT_HEIGHT - 250 - height) / 2 + "px");
    numberView.css("line-height", height + "px");
    numberView.css("text-align", "center");
    numberView.css("font-size", height + "px");
    numberView.css("font-weight", "900");
    numberView.css("color", textColor);
    numberView.text(colorText);

    numberView.hide();
    numberView.fadeIn(100);
}

function showbutton() {
    var colorList = ["红", "绿", "黄", "蓝"];
    if (Game.level >= 4) {
        colorList = sortrandom(colorList);
    }
    for (var i = 0; i < 4; i++) {
        var buttonView = $("<div/>").appendTo(CONTENT);
        buttonView.css("position", "absolute");
        buttonView.css("width", "150px");
        buttonView.css("height", "150px");
        buttonView.css("left", 125 + 200 * i + "px");
        buttonView.css("bottom", "80px");
        buttonView.css("background", "#999999");
        buttonView.css("color", "#000000");
        buttonView.css("line-height", "150px");
        buttonView.css("text-align", "center");
        buttonView.css("font-size", "100px");
        buttonView.text(colorList[i]);
        buttonView.mousedown(check);
    };
}

function check() {
    var item = $(this);
    var text = item.text();
    if (text == currentColor) {
        colorIndex ++;
        if (colorIndex == colorCount) {
            Game.right();
        } else {
            startcolor();
        }
    } else {
        Game.wrong();
    }
}
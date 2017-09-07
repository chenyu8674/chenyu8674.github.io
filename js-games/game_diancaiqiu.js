Config.titleText = ["点彩球", "", ""];
Config.contentText = ["请在规定时间内，通过点击选出所有屏幕顶端提示颜色的彩球。", "", ""];
Config.hasRememberView = false; //是否有观察记忆界面
Config.exerciseTime = [10, 10, 10, 10, 10]; //做题界面每级的等待时间

var colorList;
var color1;
var color2;
var color3;
var color4;
var numberList;
var ballCount;
var clickCount;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    colorList = [];
    numberList = [];
    clickCount = 0;

    color1 = getrandomcolor();
    color2 = getrandomcolor();
    while (color1 == color2) {
        color2 = getrandomcolor();
    }
    color3 = getrandomcolor();
    while (color1 == color3 || color2 == color3) {
        color3 = getrandomcolor();
    }
    color4 = getrandomcolor();
    while (color1 == color4 || color2 == color4 || color3 == color4) {
        color4 = getrandomcolor();
    }
    Config.rememberText = ["请记住所有<tex class='alarm'>" + getcolortext(color1) + "色</tex>球的位置", "", ""];
    Config.exerciseText = ["请选出所有<tex class='alarm'>" + getcolortext(color1) + "色</tex>的彩球", "", ""];

    ballCount = Math.floor(2 + level * 1.2)
    for (var i = 0; i < ballCount; i++) {
        colorList.push(color1);
        colorList.push(color2);
        if (level >= 2) {
            colorList.push(color3);
        }
        if (level >= 4) {
            colorList.push(color4);
        }
    }
    for (var i = 0; i < colorList.length; i++) {
        numberList.push(0);
    }
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    var ballSize = 490 - colorList.length * 4;
    Ball.add(colorList, numberList, ballSize, ballSize);
    $(".ball").text("");
    var ballList = $(".ball");
    for (var i = 0; i < ballList.length; i++) {
        var ball = ballList[i];
        $(ball).text($(ball).css("background-color"));
    }
    $(".ball").css("height", "0px");
    $(".ball").css("padding-top", Ball.ballHeight + "px");
    // $(".ball").css("background", "#999999");
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {
    var ballList = $(".ball");
    for (var i = 0; i < ballList.length; i++) {
        var ball = ballList[i];
        $(ball).css("background", $(ball).text());
    }
}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var color = item.text();

    clickCount++;
    if (color == color1) {
        item.css("background", "#999999");
        item.unbind("mousedown");
        Record.clickright();
        if (clickCount == ballCount) {
            Game.right();
        }
    } else {
        item.css("background", color);
        Record.clickwrong();
        Game.wrong();
    }
}

var ON_TASK_END = function() {}
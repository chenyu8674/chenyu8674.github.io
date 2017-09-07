Config.titleText = ["人物与众不同", "", ""];
Config.contentText = ["请记忆哪些人像与其他大多数不一样，并在人像隐藏后选出它们。", "", ""];
Config.rememberText = ["请记住哪些人像与其他大多数不同", "", ""];
Config.exerciseText = ["请点击选出与其他大多数不同的人像", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 10, 15, 15, 20]; //观察记忆界面每级的等待时间
Config.exerciseTime = [10, 10, 10, 10, 10]; //做题界面每级的等待时间

var imgList = [];
var answerList;
var blockList;
var answerCount;
var clickCount;
var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    clickCount = 0;
    answerList = [];
    blockList = [];
    answerCount = level;
    var blockCount = (level + 2) * 2;

    var ranNumber = getrandomnumber(1, imgList.length);
    for (var i = 0; i < blockCount - answerCount; i++) {
        answerList.push(ranNumber);
    }
    while (answerList.length < blockCount) {
        var ranNumber = getrandomnumberexcept(1, imgList.length, answerList);
        answerList.push(ranNumber);
    }
    for (var i = answerList.length - 1; i >= 0; i--) {
        blockList.push("game_renwu/rw_" + answerList[i] + ".png");
    }
    Ball.add(blockList, blockList);
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    $(".ball").css("background", "#999999");
    $(".ball").css("border-radius", 10 * SCREEN_ZOOM + "px");
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {
    var bList = $(".ball");
    for (var i = 0; i < bList.length; i++) {
        var block = $(bList[i]);
        block.css("background-image", "url(" + block.attr("id") + ")");
        block.css("background-size", block.css("width") + " " + block.css("height"));
    }
}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    clickCount++;
    if (checknumberisinarray(item.attr("id"), blockList) <= answerCount) {
        item.css("background-image", "url(" + item.attr("id") + ")");
        item.css("background-size", item.css("width") + " " + item.css("height"));
        Record.clickright();
        if (clickCount == answerCount) {
            Game.right();
        }
    } else {
        Record.clickwrong();
        Game.wrong();
    }
}

var ON_TASK_END = function() {}

$(document).ready(function() {
    runtest();
});

var testCount = 0;
function runtest() {
    if (testCount > 0) {
        imgList.push("game_renwu/rw_" + testCount + ".png");
    }
    var imgView = $("<img/>");
    testCount++;
    imgView.attr("src", "game_renwu/rw_" + testCount + ".png");
    imgView.load(runtest);
}
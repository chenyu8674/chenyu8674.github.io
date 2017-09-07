Config.titleText = ["方向记忆", "", ""];
Config.contentText = ["请在规定时间内记住哪些图片的箭头方向与其他大多数不同，并在箭头消失后通过点击选出它们。", "", ""];
Config.rememberText = ["记住哪些图片的箭头方向与其他大多数不同", "", ""];
Config.exerciseText = ["请选出箭头方向与其他大多数不同的图片", "", ""];
Config.hasRememberView = true;
Config.rememberTime = [10, 15, 15, 20, 20];
Config.exerciseTime = [10, 10, 10, 10, 10];

var blockList = [2, 4, 8, 6, 1, 3, 7, 9];
var lineCount = 0;
var answerCount = 0;
var questionRange = 0;
var questionList = [];
var answerList = [];

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    if (level == 1) {
        lineCount = 2;
        answerCount = 1;
        questionRange = 2;
    } else if (level == 2) {
        lineCount = 3;
        answerCount = 2;
        questionRange = 4;
    } else if (level == 3) {
        lineCount = 4;
        answerCount = 3;
        questionRange = 4;
    } else if (level == 4) {
        lineCount = 4;
        answerCount = 4;
        questionRange = 8;
    } else if (level == 5) {
        lineCount = 5;
        answerCount = 5;
        questionRange = 8;
    }
    clickCount = 0;
    questionList = [];
    answerList = [];
    for (var i = 0; i < answerCount; i++) {
        var temp = getrandomnumber(0, questionRange - 1);
        answerList.push(temp);
        questionList.push(temp);
    }
    var temp2 = getrandomnumberexcept(0, questionRange - 1, answerList);
    while (questionList.length < lineCount * lineCount) {
        questionList.push(temp2);
    }
    questionList = sortrandom(questionList);
}

var blockSize = 0;
var blockMargin = 1;

var ON_START_REMEMBER = function() {
    var width = $("#content").width();
    var height = $("#content").height() - 30;
    blockSize = Math.floor(height / lineCount) - blockMargin * 2;

    var blockView = $("<div/>").appendTo($("#content"));
    blockView.css("width", (blockSize + blockMargin * 2) * lineCount + "px");
    blockView.css("height", (blockSize + blockMargin * 2) * lineCount + "px");
    blockView.css("margin-top", "20px");
    blockView.css("margin-left", (width - (blockSize + blockMargin * 2) * lineCount) / 2 + "px");

    for (var i = 0; i < questionList.length; i++) {
        var number = blockList[questionList[i]];
        var block = $("<img/>").appendTo(blockView);
        block.css("width", blockSize + "px");
        block.css("height", blockSize + "px");
        block.css("line-height", blockSize + "px");
        block.css("text-align", "center");
        block.css("font-size", blockSize * 0.7 + "px");
        block.css("font-weight", "900");
        block.css("margin", blockMargin + "px");
        block.css("float", "left");
        block.css("overflow", "hidden");
        block.css("border-radius", "10px");
        block.attr("src", "game_fangxiang/" + number + ".png");
        block.attr("class", "block");
        block.attr("number", questionList[i]);
        block.mousedown(onblockclick);
    }
}

var ON_START_ANSWER = function() {
    $(".block").attr("src", "game_fangxiang/5.png");
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var clickCount = 0;

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var number = item.attr("number");
    clickCount++;
    if (checknumberisinarray(number, answerList)) {
        item.attr("src", "game_fangxiang/" + blockList[number] + ".png");
        item.unbind("mousedown");
        Record.clickright();
        if (clickCount == answerCount) {
            Game.right();
        } else {
            return;
        }
    } else {
        Record.clickwrong();
        Game.wrong();
    }
    var itemList = $(".block");
    for (var i = 0; i < itemList.length; i++) {
        var tempItem = $(itemList[i])
        var tempNumber = tempItem.attr("number");
        tempItem.attr("src", "game_fangxiang/" + blockList[tempNumber] + ".png");
    }
}

var ON_TASK_END = function() {}

function onblockclick() {
    Game.clickitem(this);
}

$(document).ready(function() {
    runtest();
});

var imgList = [];
var testCount = 0;
function runtest() {
    if (testCount < 9) {
        imgList.push("game_fangxiang/" + testCount + ".png");
    } else {
        return;
    }
    var imgView = $("<img/>");
    testCount++;
    imgView.attr("src", "game_fangxiang/" + testCount + ".png");
    imgView.load(runtest);
}
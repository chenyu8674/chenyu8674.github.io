Config.titleText = ["数字记忆", "", ""];
Config.contentText = ["屏幕中将依次出现两组数字，请记住第一组中出现的所有数字，并在第二组中选出它们。", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 12, 14, 16, 18]; //观察记忆界面每级的等待时间
Config.exerciseTime = [10, 12, 14, 16, 18]; //做题界面每级的等待时间

var answerCount = 0;
var totalCount = 0;

var clickCount;
var answerList = [];
var totalList = [];
var colorList;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    answerCount = level + 1;
    totalCount = level * 2 + 2;
    Config.rememberText = ["请记住以下<tex class='alarm'>" + answerCount + "个</tex>数字", "", ""];
    Config.exerciseText = ["请点击选出之前出现的<tex class='alarm'>" + answerCount + "个</tex>数字", "", ""];

    clickCount = 0;
    answerList = [];
    totalList = [];

    var numberRange = [];
    if (level == 1) {
        numberRange = [1, 9];
    } else if (level == 2) {
        numberRange = [10, 99];
    } else if (level == 3) {
        numberRange = [10, 99];
    } else if (level == 4) {
        numberRange = [10, 99];
    } else if (level == 5) {
        numberRange = [100, 999];
    }
    while (answerList.length < answerCount) {
        var ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        while (checknumberisinarray(ranNumber, answerList)) {
            ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        }
        answerList.push(ranNumber);
        totalList.push(ranNumber);
    }
    while (totalList.length < totalCount) {
        var ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        while (checknumberisinarray(ranNumber, totalList)) {
            ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        }
        totalList.push(ranNumber);
    }
}

var ON_START_REMEMBER = function() {
    creatcolorlist(Game.level, answerList.length);
    Ball.add(colorList, answerList);
}

var ON_START_ANSWER = function() {
    clearcontent();
    creatcolorlist(Game.level, totalList.length);
    Ball.add(colorList, totalList);
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var word = item.text();
    clickCount++;
    item.css("background", "#999999");
    item.unbind("mousedown");
    if (checknumberisinarray(word, answerList)) {
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

function creatcolorlist(level, length) {
    colorList = [];
    if (level == 1) {
        for (var i = 0; i < length; i++) {
            colorList[i] = COLOR_RED;
        }
    } else if (level == 2) {
        var color = getrandomcolor();
        for (var i = 0; i < length; i++) {
            colorList[i] = color;
        }
    } else if (level == 3) {
        var color = getrandomcolor();
        for (var i = 0; i < length; i++) {
            colorList[i] = color;
        }
    } else if (level == 4) {
        for (var i = 0; i < length; i++) {
            colorList[i] = getrandomcolor();
        }
    } else if (level == 5) {
        for (var i = 0; i < length; i++) {
            colorList[i] = getrandomcolor();
        }
    }
}
Config.titleText = ["降序交替点球", "", ""];
Config.contentText = ["画面中会出现两组不同颜色的彩球，请阅读屏幕上方提示，并按每组中从大到小的顺序交替点击不同颜色的彩球。", "", ""];
Config.exerciseTime = [15, 15, 20, 25, 30]; //做题界面每级的等待时间

var colorList;
var numberList1;
var numberList2;
var clickCount;
var clickCount1;
var clickCount2;
var clickColor;

var isIncrease = true;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    var ballCount = (level + 1);
    colorList = [];
    numberList1 = [];
    numberList2 = [];
    clickCount = 0;
    clickCount1 = 0;
    clickCount2 = 0;
    clickColor = "";
    isIncrease = Math.random() > 0.5 ? true: false;
    isIncrease = false;
    if (isIncrease) {
        Config.exerciseText = ["请按数字<tex class='alarm'>从小到大</tex>的顺序<tex class='alarm'>交替点击不同颜色</tex>的彩球", "", ""];
    } else {
        Config.exerciseText = ["请按数字<tex class='alarm'>从大到小</tex>的顺序<tex class='alarm'>交替点击不同颜色</tex>的彩球", "", ""];
    }

    var color1 = getrandomcolor();
    var color2 = getrandomcolor();
    while (color1 == color2) {
        color2 = getrandomcolor();
    }

    var numberRange = [];
    if (level == 1) {
        numberRange = [1, 9];
    } else if (level <= 3) {
        numberRange = [10, 99];
    } else {
        numberRange = [100, 999];
    }
    var temp = Math.random() > 0.5 ? 1 : 0;
    for (var i = 0; i < ballCount * 2; i++) {
        if (i < ballCount) {
            colorList[i] = color1;
        } else {
            colorList[i] = color2;
        }
    }

    var tempList = [];
    for (var i = 0; i < ballCount; i++) {
        var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], tempList);
        numberList1.push(ranNumber);
        tempList.push(ranNumber);
        var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], tempList);
        numberList2.push(ranNumber);
        tempList.push(ranNumber);
    }
    numberList1 = isIncrease ? sortincrease(numberList1) : sortdecrease(numberList1);
    numberList2 = isIncrease ? sortincrease(numberList2) : sortdecrease(numberList2);
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    Ball.add(colorList, numberList1.concat(numberList2));
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {
    $(".ball").css("height", Ball.ballHeight + "px");
    $(".ball").css("padding-top", "0px");
}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var number = item.text();

    if (item.css("background-color") == clickColor) {
        Record.clickwrong();
        Game.wrong();
        return;
    } else {
        clickColor = item.css("background-color");
    }

    if (checknumberisinarray(number, numberList1)) {
        clickCount1 ++;
        if (clickCount1 != checknumberisinarray(number, numberList1)) {
            Record.clickwrong();
            Game.wrong();
            return;
        }
    } else if (checknumberisinarray(number, numberList2)) {
        clickCount2 ++;
        if (clickCount2 != checknumberisinarray(number, numberList2)) {
            Record.clickwrong();
            Game.wrong();
            return;
        }
    }

    item.css("height", Ball.ballHeight + "px");
    item.css("padding-top", "0px");
    item.css("background", "#999999");
    item.unbind("mousedown");

    clickCount++;
    Record.clickright();
    if (clickCount == colorList.length) {
        Game.right();
    }
}

var ON_TASK_END = function() {}
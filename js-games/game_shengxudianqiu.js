Config.titleText = ["升序点球", "", ""];
Config.contentText = ["画面中会出现两组不同颜色的彩球，请阅读屏幕上方提示，并按从小到大的顺序点击指定颜色的彩球。", "", ""];
Config.exerciseTime = [10, 10, 10, 12, 15]; //做题界面每级的等待时间

var colorList;
var color1;
var color2;
var numberList1;
var numberList2;
var clickCount;
var clickCount1;
var clickCount2;

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
    isIncrease = Math.random() > 0.5 ? true: false;
    isIncrease = true;

    color1 = getrandomcolor();
    color2 = getrandomcolor();
    while (color1 == color2) {
        color2 = getrandomcolor();
    }
    if (isIncrease) {
        Config.exerciseText = ["请按数字<tex class='alarm'>从小到大</tex>的顺序点击<tex class='alarm'>" + getcolortext(color1) + "色</tex>的球", "", ""];
    } else {
        Config.exerciseText = ["请按数字<tex class='alarm'>从大到小</tex>的顺序点击<tex class='alarm'>" + getcolortext(color1) + "色</tex>的球", "", ""];
    }

    var numberRange = [100, 999];
    if (level == 1) {
        numberRange = [10, 99];
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
    if (item.css("background-color") != color1) {
        Record.clickwrong();
        Game.wrong();
        return;
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
    if (clickCount == numberList1.length) {
        Game.right();
    }
}

var ON_TASK_END = function() {}
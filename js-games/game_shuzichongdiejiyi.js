Config.titleText = ["数字重叠记忆", "", ""];
Config.contentText = ["屏幕将依次出现两组数字，请记住哪些数字在这两组中都出现过，并在之后选出它们。", "", ""];
Config.exerciseText = ["请选出<tex class='alarm'>在两组中都出现过</tex>的数字", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 10, 15, 15, 20]; //观察记忆界面每级的等待时间
Config.exerciseTime = [20, 20, 25, 30, 30]; //做题界面每级的等待时间

var ON_GET_SIZE = function(width, height) {}

var colorList;
var numberList1;
var numberList2;
var numberList3;
var numberCount; //展现数字数量
var answerCount; //正确答案数量
var clickCount;

var ON_START_PLAY = function(level) {
    numberList1 = [];
    numberList2 = [];
    numberList3 = [];
    clickCount = 0;

    numberCount = level + 1;
    if (level <= 3) {
        answerCount = level;
    } else {
        answerCount = level - 1;
    }

    var numberRange = [10, 99];
    for (var i = 0; i < numberCount; i++) {
        var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], numberList1);
        numberList1.push(ranNumber);
        numberList3.push(ranNumber);
    }
    for (var i = 0; i < numberCount; i++) {
        if (i < answerCount) {
            numberList2[i] = numberList1[i];
        } else {
            var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], numberList1, numberList2);
            numberList2.push(ranNumber);
            numberList3.push(ranNumber);
        }
    }
    while (numberList3.length < numberCount * 2) {
        var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], numberList3);
        numberList3.push(ranNumber);
    }
}

var remember1Text = ["请观察<tex class='alarm'>第一组</tex>数字", "", ""];
var remember2Text = ["请观察<tex class='alarm'>第二组</tex>数字", "", ""];

var ON_START_REMEMBER = function() {
    TITLE_TEXT.html(remember1Text[Language.areaFlag]);
    creatcolorlist(Game.level, numberList1.length);
    Ball.add(colorList, numberList1);
    Button.refresh(Language.get("button_next_text"), ON_START_REMEMBER2);
    var temp1 = Config.rememberTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.stop();
    TimeBar.start(time, ON_START_REMEMBER2);
}

function ON_START_REMEMBER2() {
    Record.passremember();
    Record.startremember();
    TITLE_TEXT.html(remember2Text[Language.areaFlag]);
    $(".ball").remove();
    creatcolorlist(Game.level, numberList2.length);
    Ball.add(colorList, numberList2);
    Button.refresh(Language.get("button_next_text"), Game.clickremember);
    var temp1 = Config.rememberTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.start(time, Game.exercise);
}

var ON_START_ANSWER = function() {
    $(".ball").remove();
    creatcolorlist(Game.level, numberList3.length);
    Ball.add(colorList, numberList3);
}

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

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var number = item.text();
    clickCount++;
    if (checknumberisinarray(number, numberList1) && checknumberisinarray(number, numberList2)) {
        item.css("background", "#999999");
        item.unbind("mousedown");
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
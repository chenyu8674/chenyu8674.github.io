Config.titleText = ["记忆升序点球", "", ""];
Config.contentText = ["请在规定时间内记住彩球上的数字，并在数字消失后根据提示按从小到大的顺序点击彩球。", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 12, 14, 16, 18]; //观察记忆界面每级的等待时间
Config.exerciseTime = [10, 12, 14, 16, 18]; //做题界面每级的等待时间

var colorList;
var numberList;
var clickCount;

var isIncrease = true;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    var ballCount = level + 3;
    colorList = [];
    numberList = [];
    clickCount = 0;
    isIncrease = Math.random() > 0.5 ? true: false;
    isIncrease = true;
    if (isIncrease) {
        Config.rememberText = ["请按<tex class='alarm'>从小到大</tex>的顺序记住彩球上的数字", "", ""];
        Config.exerciseText = ["请按<tex class='alarm'>从小到大</tex>的顺序点击彩球", "", ""];
    } else {
        Config.rememberText = ["请按<tex class='alarm'>从大到小</tex>的顺序记住彩球上的数字", "", ""];
        Config.exerciseText = ["请按<tex class='alarm'>从大到小</tex>的顺序点击彩球", "", ""];
    }
    var numberRange;
    if (level == 1) {
        numberRange = [1, 9];
        for (var i = 0; i < ballCount; i++) {
            colorList.push(COLOR_RED);
        }
    } else if (level == 2) {
        numberRange = [1, 9];
        var color = getrandomcolor();
        for (var i = 0; i < ballCount; i++) {
            colorList.push(color);
        }
    } else if (level == 3) {
        numberRange = [1, 9];
        var color = getrandomcolor();
        for (var i = 0; i < ballCount; i++) {
            colorList.push(color);
        }
    } else if (level == 4) {
        numberRange = [1, 9];
        for (var i = 0; i < ballCount; i++) {
            colorList.push(getrandomcolor());
        }
    } else if (level == 5) {
        numberRange = [10, 99];
        for (var i = 0; i < ballCount; i++) {
            colorList.push(getrandomcolor());
        }
    }

    for (var i = 0; i < ballCount; i++) {
        var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], numberList);
        numberList[i] = ranNumber;
    }
    numberList = isIncrease ? sortincrease(numberList) : sortdecrease(numberList);
}

var ON_START_REMEMBER = function() {
    Ball.add(colorList, numberList);
}

var ON_START_ANSWER = function() {
    $(".ball").css("height", "0px");
    $(".ball").css("padding-top", Ball.ballHeight + "px");
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

    clickCount++;
    if (number == numberList[clickCount - 1]) {
        item.css("height", Ball.ballHeight + "px");
        item.css("padding-top", "0px");
        item.css("background", "#999999");
        item.unbind("mousedown");
        Record.clickright();
        if (clickCount == numberList.length) {
            Game.right();
        }
    } else {
        Record.clickwrong();
        $(".ball").css("height", Ball.ballHeight + "px");
        $(".ball").css("padding-top", "0px");
        Game.wrong();
    }
}

var ON_TASK_END = function() {}
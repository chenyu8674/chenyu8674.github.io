Config.titleText = ["计算记忆数字倍数", "", ""];
Config.contentText = ["屏幕顶端将给出两个数字，请计算方格中哪些数字是这两个数的整数倍，并在数字消失后选出它们。", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 15, 20, 25, 30]; //观察记忆界面每级的等待时间
Config.exerciseTime = [10, 10, 10, 10, 10]; //做题界面每级的等待时间

var number1 = 0;
var number2 = 0;
var answerCount = 0;
var lineCount = 0;
var numberCount = 0;

var clickCount;
var numberList;

var blockSize = 0;
var blockMargin = 5;
var borderWidth = 3;
var colorBg = "rgb(255,199,59)";
var colorHide = "rgb(102,102,102)";
var colorText = "rgb(102,102,102)";
var colorBorder = "rgb(26,26,26)";

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    var except = 0;
    var answerRange = [];
    var numberRange = [];
    if (level == 1) {
        answerCount = 2;
        lineCount = 2;
        except = 100;
        answerRange = [2, 3];
        numberRange = [10, 30];
    } else if (level == 2) {
        answerCount = 2;
        lineCount = 3;
        except = 100;
        answerRange = [3, 5];
        numberRange = [10, 50];
    } else if (level == 3) {
        answerCount = 3;
        lineCount = 3;
        except = 100;
        answerRange = [5, 7];
        numberRange = [10, 70];
    } else if (level == 4) {
        answerCount = 3;
        lineCount = 4;
        except = 5;
        answerRange = [5, 9];
        numberRange = [10, 80];
    } else if (level == 5) {
        answerCount = 5;
        lineCount = 4;
        except = 5;
        answerRange = [3, 9];
        numberRange = [10, 99];
    }
    number1 = getrandomnumberexcept(answerRange[0], answerRange[1], except);
    number2 = getrandomnumberexcept(answerRange[0], answerRange[1], except);
    while (number1 % number2 == 0 || number2 % number1 == 0) {
        number2 = getrandomnumberexcept(answerRange[0], answerRange[1], except);
    }
    if (number1 > number2) {
        var temp = number1;
        number1 = number2;
        number2 = temp;
    }
    numberCount = lineCount * lineCount;
    Config.rememberText = ["请记住哪<tex class='alarm'>" + answerCount + "</tex>个数字是<tex class='alarm'>" + number1 + "</tex>或<tex class='alarm'>" + number2 + "</tex>的倍数", "", ""];
    Config.exerciseText = ["请点击选出<tex class='alarm'>" + answerCount + "</tex>个<tex class='alarm'>" + number1 + "</tex>或<tex class='alarm'>" + number2 + "</tex>的倍数", "", ""];

    clickCount = 0;
    numberList = [];
    while (numberList.length < answerCount / 2) {
        var ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        while (checknumberisinarray(ranNumber, numberList)) {
            ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        }
        if (ranNumber % number2 == 0) {
            numberList.push(ranNumber);
        }
    }
    while (numberList.length < answerCount) {
        var ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        while (checknumberisinarray(ranNumber, numberList)) {
            ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        }
        if (ranNumber % number1 == 0) {
            numberList.push(ranNumber);
        }
    }
    while (numberList.length < numberCount) {
        var ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        while (checknumberisinarray(ranNumber, numberList)) {
            ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        }
        if (ranNumber % number1 != 0 && ranNumber % number2 != 0) {
            numberList.push(ranNumber);
        }
    }
    for (var i = 0; i < numberCount; i++) {
        numberList = sortrandom(numberList);
    }
}

var ON_START_REMEMBER = function() {
    var width = $("#content").width();
    var height = $("#content").height() - 30;
    blockSize = Math.floor(height / lineCount) - blockMargin * 2 - borderWidth * 2;

    var blockView = $("<div/>").appendTo($("#content"));
    blockView.css("width", (blockSize + blockMargin * 2 + borderWidth * 2) * lineCount + "px");
    blockView.css("height", (blockSize + blockMargin * 2 + borderWidth * 2) * lineCount + "px");
    blockView.css("margin-top", "20px");
    blockView.css("margin-left", (width - (blockSize + blockMargin * 2 + borderWidth * 2) * lineCount) / 2 + "px");

    for (var i = 0; i < numberCount; i++) {
        var block = $("<div/>").appendTo(blockView);
        block.css("width", blockSize + "px");
        block.css("height", blockSize + "px");
        block.css("background", colorBg);
        block.css("border", "3px solid " + colorBorder);
        block.css("color", colorText);
        block.css("line-height", blockSize + "px");
        block.css("text-align", "center");
        block.css("font-size", blockSize * 0.7 + "px");
        block.css("font-weight", "900");
        block.css("margin", blockMargin + "px");
        block.css("float", "left");
        block.css("overflow", "hidden");
        block.css("border-radius", "10px");
        block.attr("class", "block");
        block.text(numberList[i]);
    }
}

var ON_START_ANSWER = function() {
    $(".block").css("padding-top", blockSize + "px");
    $(".block").css("height", 0);
    $(".block").css("background", colorHide);
    $(".block").mousedown(onblockclick);
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
    if (number % number1 == 0 || number % number2 == 0) {
        Record.clickright();
        if (clickCount == answerCount) {
            Game.right();
        }
    } else {
        Record.clickwrong();
        Game.wrong();
    }
    item.css("height", blockSize + "px");
    item.css("padding-top", 0);
    item.css("background", colorBg);
    item.unbind("mousedown");
}

var ON_TASK_END = function() {}

function onblockclick() {
    Game.clickitem(this);
}
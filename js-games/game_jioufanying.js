Config.titleText = ["奇偶反应", "", ""];
Config.contentText = ["屏幕中将会连续出现数字，请快速判断当前数字与上一个数字的奇偶性是否相同（即是否同为奇数或偶数），相同则按下绿色按钮，不同则按下红色按钮。", "", ""];

var lastNumber = 0;
var currentNumber = 0;
var numberIndex = 0;
var numberCount = 0;
var numberRange = [];
var levelTime = 0;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    lastNumber = 0;
    currentNumber = 0;
    numberIndex = 0;
    switch(level) {
        case 1:
            numberCount = 5;
            numberRange = [1, 9];
            levelTime = 4000;
            break;
        case 2:
            numberCount = 10;
            numberRange = [10, 19];
            levelTime = 3500;
            break;
        case 3:
            numberCount = 10;
            numberRange = [10, 99];
            levelTime = 3000;
            break;
        case 4:
            numberCount = 15;
            numberRange = [10, 99];
            levelTime = 2500;
            break;
        case 5:
            numberCount = 20;
            numberRange = [1, 999];
            levelTime = 2000;
            break;
    }
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    startnumber();
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}

var questionText = ["奇偶性是否与上一个数字相同？", "", ""];
var rememberText = ["请记住第一个数字", "", ""];

function startnumber() {
    clearcontent();
    lastNumber = currentNumber;
    currentNumber = getrandomnumber(numberRange[0], numberRange[1]);
    shownumber();
    TimeBar.stop();
    if (lastNumber) {
        showbutton();
        TITLE_TEXT.html(questionText[Language.areaFlag] + "（"+(numberIndex+1)+"/"+numberCount+"）");
        TimeBar.start(levelTime, Game.wrong);
    } else {
        TITLE_TEXT.html(rememberText[Language.areaFlag]);
        TimeBar.start(levelTime / 2, startnumber);
    }
}

function shownumber() {
    var height = CONTENT_HEIGHT / 2;
    var numberView = $("<div/>").appendTo(CONTENT);
    numberView.css("position", "absolute");
    numberView.css("width", CONTENT_WIDTH + "px");
    numberView.css("height", height + "px");
    numberView.css("line-height", height + "px");
    numberView.css("text-align", "center");
    numberView.css("font-size", height + "px");
    numberView.css("font-weight", "900");
    numberView.text(currentNumber);

    var fromTop = - height + "px";
    var toTop = height / 10 + "px";
    numberView.css("top", toTop);

    numberView.hide();
    numberView.fadeIn(300);
}

function showbutton() {
    var button1View = $("<canvas width=200 height=200 />").appendTo(CONTENT);
    button1View.css("position", "absolute");
    button1View.css("width", "200px");
    button1View.css("height", "200px");
    button1View.css("left", "200px");
    button1View.css("bottom", "50px");
    button1View.css("background", COLOR_RED);
    button1View.mousedown(checkdifferent);
    var context = button1View[0].getContext("2d");
    context.beginPath();
    context.lineWidth = 25;
    context.strokeStyle = "#fff";
    context.moveTo(45, 45);
    context.lineTo(155, 155);
    context.moveTo(45, 155);
    context.lineTo(155, 45);
    context.stroke();

    var button2View = $("<canvas width=200 height=200 />").appendTo(CONTENT);
    button2View.css("position", "absolute");
    button2View.css("width", "200px");
    button2View.css("height", "200px");
    button2View.css("right", "200px");
    button2View.css("bottom", "50px");
    button2View.css("background", COLOR_GREEN);
    button2View.mousedown(checksame);
    var context = button2View[0].getContext("2d");
    context.beginPath();
    context.lineWidth = 25;
    context.strokeStyle = "#fff";
    context.arc(100, 100, 58, 0, 2*Math.PI);
    context.stroke();
}

function checksame() {
    TimeBar.stop();
    if (currentNumber % 2 == lastNumber % 2) {
        numberIndex ++;
        if (numberIndex == numberCount) {
            Game.right();
        } else {
            startnumber();
        }
    } else {
        Game.wrong();
    }
}

function checkdifferent() {
    TimeBar.stop();
    if (currentNumber % 2 != lastNumber % 2) {
        numberIndex ++;
        if (numberIndex == numberCount) {
            Game.right();
        } else {
            startnumber();
        }
    } else {
        Game.wrong();
    }
}
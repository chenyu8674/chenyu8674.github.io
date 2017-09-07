Config.titleText = ["帕金森风险测评", "", ""];
Config.contentText = ["请老人根据实际情况回答下列问题，以判断您是否有患上帕金森症的风险。", "", ""];
Config.exerciseText = ["请回答以下问题", "", ""];
Config.hasResultInfo = false;
Config.hasLevelInfo = false;
Config.showBrainWave = false;
Config.tastTime = -1;
Config.sendScore = false;
Config.sendRecord = 0;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    click0();
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}

var questionIndex = -1;
var questionList = [
    ["1. 您从椅子上站起有困难吗？", "", ""],
    ["2. 您写的字和以前相比有变小吗？", "", ""],
    ["3. 您的声音和以前相比有变小吗？", "", ""],
    ["4. 您走路容易跌倒吗？", "", ""],
    ["5. 您的脚是不是有时突然像粘在地上一样抬不起来？", "", ""],
    ["6. 您的面部表情是不是没有以前那么丰富？", "", ""],
    ["7. 您的胳膊或者腿颤抖吗？", "", ""],
    ["8. 您自己扣扣子困难吗？", "", ""],
    ["9. 您走路时是不是脚拖着地走小步？", "", ""]
];
var resultScore = 0;

function click0() {
    clearcontent();
    questionIndex ++;
    if (questionIndex >= questionList.length) {
        finishceping();
    } else {
        showquestion();
        showbutton();
    }
}

function click1() {
    clearcontent();
    resultScore++;
    questionIndex ++;
    if (questionIndex >= questionList.length) {
        finishceping();
    } else {
        showquestion();
        showbutton();
    }
}

function finishceping() {
    Interface.run("score", 1000 + resultScore);
    Interface.finish();
}

function showquestion() {
    var view = $("<div/>").appendTo(CONTENT);
    view.css("width", "100%");
    view.css("height", "100%");
    view.css("background", "rgba(255,255,255,0.4)");

    var startText = $("<div/>").appendTo(CONTENT);
    startText.attr("class", "start_text");
    startText.css("top", "180px");
    startText.css("font-size", "40px");
    startText.css("line-height", "60px");
    startText.text(questionList[questionIndex][Language.areaFlag]);
}

function showbutton() {
    var button2View = $("<div/>").appendTo(CONTENT);
    button2View.css("position", "absolute");
    button2View.css("width", "220px");
    button2View.css("height", "120px");
    button2View.css("line-height", "120px");
    button2View.css("left", "250px");
    button2View.css("bottom", "80px");
    button2View.css("text-align", "center");
    button2View.css("font-size", "60px");
    button2View.css("color", "#fff");
    button2View.css("background", COLOR_RED);
    button2View.text(Language.get("ceping_yes"));
    button2View.mousedown(click1);

    var button1View = $("<div/>").appendTo(CONTENT);
    button1View.css("position", "absolute");
    button1View.css("width", "220px");
    button1View.css("height", "120px");
    button1View.css("line-height", "120px");
    button1View.css("right", "250px");
    button1View.css("bottom", "80px");
    button1View.css("text-align", "center");
    button1View.css("font-size", "60px");
    button1View.css("color", "#fff");
    button1View.css("background", COLOR_GREEN);
    button1View.text(Language.get("ceping_no"));
    button1View.mousedown(click0);
}
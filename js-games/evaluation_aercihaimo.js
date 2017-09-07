Config.titleText = ["阿尔茨海默风险测评", "", ""];
Config.contentText = ["本测评最好由老人亲属或其照护人员完成。请回忆老人在过去几年中，是否因思考和记忆问题出现以下各种能力的改变。", "", ""];
Config.exerciseText = ["老人是否有以下现象？", "", ""];
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
    ["1. 判断力有困难：容易上当受骗，理财困难，选购合适物品困难。", "", ""],
    ["2. 兴趣减退，爱好改变，活动减少。", "", ""],
    ["3. 无意识反复重复相同事情（如提同样的问题，重复同一件事，重复相同的话等）。", "", ""],
    ["4. 学习使用某些简单的日常工具或家用电器、器械有困难（如电视、洗衣机、空调、煤气灶、热水器、微波炉、遥控器等）。", "", ""],
    ["5. 记不清当前月份或年份。", "", ""],
    ["6. 处理复杂的个人经济事务有困难（如平衡收支、存取钱、缴纳水电费等）。", "", ""],
    ["7. 记不住和别人的约定。", "", ""],
    ["8. 日常记忆和思考能力出现问题。", "", ""]
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
    button2View.css("left", "140px");
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
    button1View.css("left", "390px");
    button1View.css("bottom", "80px");
    button1View.css("text-align", "center");
    button1View.css("font-size", "60px");
    button1View.css("color", "#fff");
    button1View.css("background", COLOR_GREEN);
    button1View.text(Language.get("ceping_no"));
    button1View.mousedown(click0);

    var button3View = $("<div/>").appendTo(CONTENT);
    button3View.css("position", "absolute");
    button3View.css("width", "220px");
    button3View.css("height", "120px");
    button3View.css("line-height", "120px");
    button3View.css("left", "640px");
    button3View.css("bottom", "80px");
    button3View.css("text-align", "center");
    button3View.css("font-size", "60px");
    button3View.css("color", "#fff");
    button3View.css("background", COLOR_YELLOW);
    button3View.text(Language.get("ceping_unknow"));
    button3View.mousedown(click0);
}
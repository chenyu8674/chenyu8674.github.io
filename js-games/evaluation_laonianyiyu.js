Config.titleText = ["老年抑郁风险测评", "", ""];
Config.contentText = ["请老人根据实际情况回答最近是否出现过提到的现象，以判断您是否有老年抑郁的风险。", "", ""];
Config.exerciseText = ["最近是否出现过以下任一现象？", "", ""];
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
var lineMark = "<br/>&nbsp;&nbsp;"// 换行标记
var questionList = [
    ["1. 食欲或体重改变" + lineMark + "(1) 食欲变差，吃饭不香" + lineMark + "(2) 明显变瘦" + lineMark + "(3) 食欲增加，经常觉得饿", "", ""],
    ["2. 睡眠紊乱" + lineMark + "(1) 失眠" + lineMark + "(2) 睡眠过多" + lineMark + "(3) 睡醒后仍觉得困", "", ""],
    ["3. 躯体不适" + lineMark + "&nbsp;&nbsp;经常出现各种身体不舒服（如胸闷、心悸、腹胀、疼痛、头晕、口干、易出汗、打嗝等）" + lineMark + "&nbsp;&nbsp;多次去医院检查和就诊，医生向您解释病情时，也无法明确原因", "", ""],
    ["4. 疲乏感" + lineMark + "(1) 觉得体力不如以前" + lineMark + "(2) 经常感到疲乏、无力，提不起精神" + lineMark + "(3) 想做事情但没有力气", "", ""],
    ["5. 懒散迟缓" + lineMark + "(1) 变得不愿说话或者懒得动" + lineMark + "(2) 自己也感觉说话或者行动很慢、有些吃力", "", ""],
    ["6. 焦虑不安" + lineMark + "(1) 感到心烦、不能放松" + lineMark + "(2) 总是担心、担心过多" + lineMark + "(3) 坐立不安" + lineMark + "(4) 比以前易怒", "", ""],
    ["7. 郁闷" + lineMark + "(1) 多数时间心情不好" + lineMark + "(2) 感到压抑、痛苦" + lineMark + "(3) 经常哭泣", "", ""],
    ["8. 无助绝望" + lineMark + "(1) 感到生活毫无希望" + lineMark + "(2) 认为现在的状况很难变好" + lineMark + "(3) 对治疗没有信心", "", ""],
    ["9. 自责" + lineMark + "(1) 认为自己是个累赘，感到内疚、觉得对不起家人" + lineMark + "(2) 经常责备自己" + lineMark + "(3) 认为自己犯了严重的错误或者犯了罪", "", ""],
    ["10. 轻生观念或行为" + lineMark + "(1) 经常想到死" + lineMark + "(2) 认为“活着没意思”甚至“活着不如死了好”" + lineMark + "(3) 准备甚至已经采取轻生举动", "", ""],
    ["11. 缺乏愉快体验" + lineMark + "(1) 觉得好像变得“麻木”" + lineMark + "(2) 遇到应该高兴的事情也高兴不起来" + lineMark + "(3) 对周围人和事物也变得不关心", "", ""],
    ["12. 兴趣减退" + lineMark + "(1) 对过去喜欢做的事情，也没有兴致去做" + lineMark + "(2) 对一般来说会引起别人兴趣的事情，也觉得没有意思或者提不起兴致", "", ""]
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
    startText.css("top", "150px");
    startText.css("margin-left", "180px");
    startText.css("text-indent", "0px");
    if (questionIndex == 2 || questionIndex == 5 || questionIndex == 8) {
        startText.css("font-size", "32px");
        startText.css("line-height", "40px");
    } else {
        startText.css("font-size", "36px");
        startText.css("line-height", "50px");
    }
    startText.html(questionList[questionIndex][Language.areaFlag]);
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
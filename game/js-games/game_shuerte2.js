Config.titleText = ["舒尔特注意力测试", "", ""];
Config.contentText = ["规则：在两分钟时限内，按数字从小到大的顺序尽可能多地点击彩球。<a href='https://baike.baidu.com/item/%E8%88%92%E5%B0%94%E7%89%B9%E8%AE%AD%E7%BB%83%E6%B3%95'>&nbsp;啥是舒尔特？</a>", "", ""];
Config.exerciseText = ["", "", ""];
Config.hasRememberView = false; //是否有观察记忆界面
Config.maxLevel = 1; //最高等级数
Config.startLevel = 1; //起始等级数
Config.questionNumber = 1; //每级题目数
Config.taskTime = 1;
Config.exerciseTime = [120]; //做题界面每级的等待时间

var colorList;
var numberList;
var clickCount;
var ballCount;

var ON_GET_SIZE = function(width, height) {
    CONTENT.css("background", "#444");
}

var highScore = 0;
function onhighscoreget(data) {
    var score = 0;
    try {
        score = parseInt(data);
    } catch(e) {}
    if (highScore < score) {
        highScore = score;
    }
}

var ON_START_PLAY = function(level) {
    isShowingResult = false;
    colorList = [];
    numberList = [];
    clickCount = 0;
    ballCount = 1;
    for (var i = 0; i < ballCount; i++) {
        colorList.push(getrandomcolor());
        numberList.push(i + 1);
    }
}

var ON_START_ANSWER = function() {
    startNewGame();
    TimeBar.start(Config.exerciseTime[Game.level - 1] * 1000, showresult, true);
}

var FADE_TIME = 200;
var ON_ITEM_CLICK = function() {
    item = $(this);
    var number = item.text();
    clickCount++;
    if (clickCount == number) {
        $("#sound_pop" + getrandomnumber(1, 5)).get(0).play();
        $(".ball").fadeOut(FADE_TIME);
        numberList.push(numberList[numberList.length - 1] + 1);
        numberList.push(numberList[numberList.length - 1] + 1);
        numberList.splice(0,1);
        colorList.push(getrandomcolor());
        setTimeout(startNewGame, FADE_TIME);
    } else {
        TimeBar.subtract(3000);
        $("#sound_wrong").get(0).play();
        clickCount--;
    }
}

function startNewGame() {
    if (isShowingResult) {
        return;
    }
    clearcontent();
    var ballSize = 490 - colorList.length * 4;
    if (ballSize > 200) {
        ballSize = 200;
    }
    colorList = sortrandom(colorList);
    Ball.add(colorList, numberList, ballSize, ballSize);
    $(".ball").hide();
    $(".ball").fadeIn(FADE_TIME);
}

var isShowingResult = false;
function showresult() {
    isShowingResult = true;
    var bgView = $("<div/>").appendTo(CONTENT);
    bgView.css("position", "absolute");
    bgView.css("width", "100%");
    bgView.css("height", "100%");
    bgView.css("background", "rgba(0,0,0,0.9)");
    bgView.attr("id", "carresult");

    var textView = $("<div/>").appendTo(bgView);
    textView.css("position", "absolute");
    textView.css("width", "100%");
    textView.css("top", - CONTENT_HEIGHT * 0.15 + "px");
    textView.css("color", "#fff");
    textView.css("text-align", "center");
    textView.css("font-weight", "900");
    textView.css("font-size", "100px");
    textView.text("测试结束");

    var targetTop = CONTENT_HEIGHT * 0.12;
    setTimeout(function(){
        textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult1, 300)});
    }, 200);
}

function showresult1() {
    var textView = $("<div/>").appendTo($("#carresult"));
    textView.css("position", "absolute");
    textView.css("top", CONTENT_HEIGHT + "px");
    textView.css("color", "#fff");
    textView.css("font-weight", "900");
    textView.css("font-size", "70px");
    if (clickCount > highScore) {
        highScore = clickCount;
    }
    var scoreText = "" + clickCount;
    textView.css("left", "300px");
    textView.text("本轮得分：" + scoreText);
    textView.attr("id", "carresult1");

    var targetTop = CONTENT_HEIGHT * 0.34;
    textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult2, 300)});
}

function showresult2() {
    var textView = $("<div/>").appendTo($("#carresult"));
    textView.css("position", "absolute");
    textView.css("top", CONTENT_HEIGHT + "px");
    textView.css("left", $("#carresult1").css("left"));
    textView.css("color", "#fff");
    textView.css("font-weight", "900");
    textView.css("font-size", "70px");
    var score = "";
    if (clickCount >= 55) {
        score = "SSS";
    } else if (clickCount >= 50) {
        score = "SS";
    } else if (clickCount >= 45) {
        score = "S";
    } else if (clickCount >= 40) {
        score = "A";
    } else if (clickCount >= 35) {
        score = "B";
    } else if (clickCount >= 30) {
        score = "C";
    } else if (clickCount >= 20) {
        score = "D";
    } else {
        score = "E";
    }
    textView.html("本轮评价：" + score);

    var targetTop = CONTENT_HEIGHT * 0.43;
    textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult3, 300)});
}

function showresult3() {
    var textView = $("<div/>").appendTo($("#carresult"));
    textView.css("position", "absolute");
    textView.css("top", CONTENT_HEIGHT + "px");
    textView.css("left", $("#carresult1").css("left"));
    textView.css("color", "#fff");
    textView.css("font-weight", "900");
    textView.css("font-size", "70px");
    textView.text("最高得分：" + highScore);

    var targetTop = CONTENT_HEIGHT * 0.52;
    textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult4, 800)});
}

function showresult4() {
    var textView = $("<div/>").appendTo($("#carresult"));
    textView.css("position", "absolute");
    textView.css("width", "300px");
    textView.css("height", "120px");
    textView.css("top", CONTENT_HEIGHT * 0.78 + "px");
    textView.css("left", "350px");
    textView.css("line-height", "120px");
    textView.css("color", "#333");
    textView.css("font-weight", "900");
    textView.css("font-size", "55px");
    textView.css("text-align", "center");
    textView.css("background", "#eee");
    textView.text("再来一轮");
    textView.mousedown(restartRace);
    textView.hide();
    textView.fadeIn(1000);
}

function restartRace() {
    clearcontent();
    ON_START_PLAY(Game.level);
    ON_START_ANSWER();
}
Config.titleText = ["脑电浇花", "", ""];
Config.contentText = ["集中注意力移动水壶，之后放松精神浇灌花朵。", "", ""];
Config.hasLevelInfo = false;
Config.sendScore = false;
Config.sendRecord = 0;
Config.brainMode = "thinkgear";
Config.mustBrain = true;

var attentionText = ["请集中注意力移动水壶", "", ""];
var meditationText = ["请放松精神浇灌花朵", "", ""];

var bgImage;
var flower1Image;
var flower2Image;
var kettle1Image;
var kettle2Image;

$(document).ready(function() {
    bgImage=new Image();
    bgImage.src="brain_naodianjiaohua/bg.png";
    flower1Image=new Image();
    flower1Image.src="brain_naodianjiaohua/flower1.png";
    flower2Image=new Image();
    flower2Image.src="brain_naodianjiaohua/flower2.png";
    kettle1Image=new Image();
    kettle1Image.src="brain_naodianjiaohua/kettle1.png";
    kettle2Image=new Image();
    kettle2Image.src="brain_naodianjiaohua/kettle2.png";
});

var ON_GET_SIZE = function(width, height) {
    CONTENT.css("background-image", "url()");
}

var canvasView;
var canvasContext;
var flower1Percent = 0;
var flower2Percent = 0;
var flower3Percent = 0;
var flower4Percent = 0;
var startTime = 0;
var scoreTime = 0;

var ON_START_PLAY = function(level) {
    drawBg();
    canvasView = $("<canvas width=" + CONTENT_WIDTH + " height=" + CONTENT_HEIGHT + " />").appendTo(CONTENT);
    canvasView.css("position", "absolute");
    canvasView.css("top", "0px");
    canvasContext = canvasView[0].getContext("2d");

    fpsView = $("<div/>").appendTo(CONTENT);
    fpsView.css("position", "fixed");
    fpsView.css("right", "2px");
    fpsView.css("bottom", "0px");
    fpsView.css("color", "#f00");
    fpsView.css("font-size", "1px");
}

var fpsView = null;

var drawBg = function() {
    var canvasView = $("<canvas width=" + CONTENT_WIDTH + " height=" + CONTENT_HEIGHT + " />").appendTo(CONTENT);
    canvasView.css("position", "absolute");
    canvasView.css("top", "0px");
    var canvasContext = canvasView[0].getContext("2d");
    canvasContext.drawImage(bgImage, 0, 0, CONTENT_WIDTH, CONTENT_HEIGHT);
}

var startgame = function() {
    $("#carresult").remove();
    animationCount = 0;
    flower1Percent = 0;
    flower2Percent = 0;
    flower3Percent = 0;
    flower4Percent = 0;
    drawflower();
    drawkettle(1, 1, 0);

    startTime = new Date().getTime();
    animationTime = startTime;
    doanimation();
}

var drawflower = function() {
    canvasContext.clearRect(0, 0, CONTENT_WIDTH, CONTENT_HEIGHT);
    var flowerWidth = flower1Image.width;
    var flowerHeight = flower1Image.height;
    canvasContext.drawImage(flower1Image, 220, CONTENT_HEIGHT * 0.7 - flowerHeight);
    canvasContext.drawImage(flower1Image, 780 - flowerWidth, CONTENT_HEIGHT * 0.7 - flowerHeight);
    canvasContext.drawImage(flower1Image, 60, CONTENT_HEIGHT * 0.9 - flowerHeight);
    canvasContext.drawImage(flower1Image, 940 - flowerWidth, CONTENT_HEIGHT * 0.9 - flowerHeight);

    var percent1 = 0.6 + 0.4 * flower1Percent / 100;
    percent1 = percent1 + 0.02 > 1 ? 1 : percent1 + 0.02;
    canvasContext.drawImage(flower2Image, 0, flowerHeight * (1 - percent1), flowerWidth, flowerHeight * percent1, 220, CONTENT_HEIGHT * 0.7 - flowerHeight * percent1, flowerWidth, flowerHeight * percent1);

    var percent2 = 0.6 + 0.4 * flower2Percent / 100;
    percent2 = percent2 + 0.02 > 1 ? 1 : percent2 + 0.02;
    canvasContext.drawImage(flower2Image, 0, flowerHeight * (1 - percent2), flowerWidth, flowerHeight * percent2, 780 - flowerWidth, CONTENT_HEIGHT * 0.7 - flowerHeight * percent2, flowerWidth, flowerHeight * percent2);

    var percent3 = 0.6 + 0.4 * flower3Percent / 100;
    percent3 = percent3 + 0.02 > 1 ? 1 : percent3 + 0.02;
    canvasContext.drawImage(flower2Image, 0, flowerHeight * (1 - percent3), flowerWidth, flowerHeight * percent3, 60, CONTENT_HEIGHT * 0.9 - flowerHeight * percent3, flowerWidth, flowerHeight * percent3);

    var percent4 = 0.6 + 0.4 * flower4Percent / 100;
    percent4 = percent4 + 0.02 > 1 ? 1 : percent4 + 0.02;
    canvasContext.drawImage(flower2Image, 0, flowerHeight * (1 - percent4), flowerWidth, flowerHeight * percent4, 940 - flowerWidth, CONTENT_HEIGHT * 0.9 - flowerHeight * percent4, flowerWidth, flowerHeight * percent4);
}

var drawkettle = function(index, state, percent) {
    var kettleWidth = kettle1Image.width;
    var kettleHeight = kettle1Image.height;
    var baseLeft = (CONTENT_WIDTH - kettleWidth) / 2;
    var baseTop = CONTENT_HEIGHT * 0.82 - kettleHeight;
    var target1Left, target2Top;
    if (index <= 2) {
        target1Left = 300;
        target2Top = CONTENT_HEIGHT * 0.55 - kettleHeight;
    } else {
        target1Left = 140;
        target2Top = CONTENT_HEIGHT * 0.75 - kettleHeight;
    }
    var left, top, image;
    if (state == 1) {
        left = baseLeft + (target1Left - baseLeft) * percent / 100;
        top = baseTop + (target2Top - baseTop) * percent / 100;
        image = kettle1Image;
    } else if (state == 2) {
        left = target1Left - 30;
        top = target2Top;
        image = kettle2Image;
    } else if (state == 3) {
        left = target1Left + (baseLeft - target1Left) * percent / 100;
        top = target2Top + (baseTop - target2Top) * percent / 100;
        image = kettle1Image;
    }

    if (index % 2 == 0) {
        canvasContext.translate(CONTENT_WIDTH, 0);
        canvasContext.scale(-1, 1);
    }
    canvasContext.drawImage(image, left, top);
    if (index % 2 == 0) {
        canvasContext.translate(CONTENT_WIDTH, 0);
        canvasContext.scale(-1, 1);
    }
}

var animationCount = 0;
var threshold = 5;// 启动阈值
var animFactor = 250 * 100 / threshold;

var animationFlag = null;
var animationTime = 0;
var countTotal = 0;
var countTimes = 0;

var doanimation = function() {
    var timePast = new Date().getTime() - animationTime;
    if (timePast > 10) {
        var fps = 1000 / timePast;
        countTotal += fps;
        countTimes ++;
        if (countTimes >= 100) {
            countTotal /= 10;
            countTimes /= 10;
        }
        fpsView.text(Math.round(countTotal / countTimes));
    }
    animationTime = new Date().getTime();

    var flowerIndex = 1 + Math.floor(animationCount / (100 * animFactor));
    var percent = animationCount % (100 * animFactor);
    var state = 0;
    if (percent <= (30 * animFactor)) {
        percent = percent / (30 * animFactor) * 100;
        state = 1;
        if (percent == (30 * animFactor)) {
            TITLE_TEXT.text(meditationText[Language.areaFlag]);
        } else {
            TITLE_TEXT.text(attentionText[Language.areaFlag]);
        }
    } else if (percent <= (70 * animFactor)) {
        percent = (percent - (30 * animFactor)) / (40 * animFactor) * 100; 
        state = 2;
        eval("flower" + flowerIndex + "Percent = " + percent);
        if (percent == (70 * animFactor)) {
            TITLE_TEXT.text(attentionText[Language.areaFlag]);
        } else {
            TITLE_TEXT.text(meditationText[Language.areaFlag]);
        }
    } else {
        percent = (percent - (70 * animFactor)) / (30 * animFactor) * 100; 
        state = 3;
        TITLE_TEXT.text(attentionText[Language.areaFlag]);
    }

    var doAnimation = false;
    var attention = ThinkGear.data.Attention;
    var meditation = ThinkGear.data.Meditation;
    if (Interface.isWeb()) {
        attention = meditation = 100;
    }
    if (state == 2) {
        doAnimation = true;
        animationCount += Math.floor(meditation / threshold) * timePast;
    } else {
        doAnimation = true;
        animationCount += Math.floor(attention / threshold) * timePast;
    }
    if (doAnimation) {
        canvasContext.clearRect(0, 0, CONTENT_WIDTH, CONTENT_HEIGHT);
        drawflower();
        drawkettle(flowerIndex, state, percent);
    }
    if (animationCount < (400 * animFactor - 1)) {
        animationFlag = requestAnimationFrame(doanimation);
    } else {
        cancelAnimationFrame(animationFlag);
        animationFlag = null;
        TITLE_TEXT.text("");
        scoreTime = new Date().getTime() - startTime;
        showresult();
    }
}

function showresult() {
    var bgView = $("<div/>").appendTo(CONTENT);
    bgView.css("position", "absolute");
    bgView.css("width", "100%");
    bgView.css("height", "100%");
    bgView.css("background", "rgba(0,0,0,0.8)");
    bgView.attr("id", "carresult");

    var textView = $("<div/>").appendTo(bgView);
    textView.css("position", "absolute");
    textView.css("width", "100%");
    textView.css("top", - CONTENT_HEIGHT * 0.15 + "px");
    textView.css("color", "#fff");
    textView.css("text-align", "center");
    textView.css("font-weight", "900");
    textView.css("font-size", CONTENT_HEIGHT * 0.12 + "px");
    textView.text(Language.get("rewult_over_text"));

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
    textView.css("font-size", CONTENT_HEIGHT * 0.08 + "px");
    var scoreText = (scoreTime / 1000).toFixed(2) + "秒";
    var textWidth = (scoreText.length + 2) * CONTENT_HEIGHT * 0.1;
    textView.css("left", (CONTENT_WIDTH - textWidth) * 0.5 + "px");
    textView.text(Language.get("rewult_time_text") + scoreText);
    textView.attr("id", "carresult1");

    var targetTop = CONTENT_HEIGHT * 0.39;
    textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult2, 300)});
}

function showresult2() {
    var textView = $("<div/>").appendTo($("#carresult"));
    textView.css("position", "absolute");
    textView.css("top", CONTENT_HEIGHT + "px");
    textView.css("left", $("#carresult1").css("left"));
    textView.css("color", "#fff");
    textView.css("font-weight", "900");
    textView.css("font-size", CONTENT_HEIGHT * 0.08 + "px");
    if (scoreTime <= 110000) {
        speed = "SSS";
    } else if (scoreTime <= 125000) {
        speed = "SS";
    } else if (scoreTime <= 150000) {
        speed = "S";
    } else if (scoreTime <= 180000) {
        speed = "A";
    } else if (scoreTime <= 250000) {
        speed = "B";
    } else if (scoreTime <= 350000) {
        speed = "C";
    } else if (scoreTime <= 600000) {
        speed = "D";
    } else {
        speed = "E";
    }
    textView.html(Language.get("rewult_score_text") + speed);

    var targetTop = CONTENT_HEIGHT * 0.51;
    textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult3, 800)});
}

function showresult3() {
    var textView = $("<div/>").appendTo($("#carresult"));
    textView.css("position", "absolute");
    textView.css("width", "200px");
    textView.css("height", CONTENT_HEIGHT * 0.12 + "px");
    textView.css("top", CONTENT_HEIGHT * 0.75 + "px");
    textView.css("left", "400px");
    textView.css("line-height", CONTENT_HEIGHT * 0.12 + "px");
    textView.css("color", "#333");
    textView.css("font-weight", "900");
    textView.css("font-size", CONTENT_HEIGHT * 0.06 + "px");
    textView.css("text-align", "center");
    textView.css("background", "#eee");
    textView.text(Language.get("rewult_again_text"));
    textView.mousedown(startgame);
    textView.hide();
    textView.fadeIn(1000);
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    startgame();
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}
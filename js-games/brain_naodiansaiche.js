Config.titleText = ["脑电赛车", "", ""];
Config.contentText = ["集中注意力控制小车，精神越集中小车就跑得越快。", "", ""];
Config.hasLevelInfo = false;
Config.sendScore = false;
Config.sendRecord = 0;
Config.brainMode = "thinkgear";
Config.mustBrain = true;

var carImage;
var tree1Image;
var tree2Image;
var tree3Image;
var meterImage;
var pointerImage;

$(document).ready(function() {
    carImage=new Image();
    carImage.src="brain_naodiansaiche/car.png";
    tree1Image=new Image();
    tree1Image.src="brain_naodiansaiche/tree1.png";
    tree2Image=new Image();
    tree2Image.src="brain_naodiansaiche/tree2.png";
    tree3Image=new Image();
    tree3Image.src="brain_naodiansaiche/tree3.png";
    meterImage=new Image();
    meterImage.src="brain_naodiansaiche/meter.png";
    pointerImage=new Image();
    pointerImage.src="brain_naodiansaiche/point.png";
});

var ON_GET_SIZE = function(width, height) {
    CONTENT.css("background-image", "url()");
}

var roadWidth = 1.4// 道路相对于屏幕宽度的比例
var roadWidthEnd = 0.02;// 道路尽头相对于屏幕宽度的比例
var treeZoomEnd = 0.01// 最远端树的缩小比例
var horizonEnd = 0.35// 地平线距屏幕顶端的距离
var carZoom = 0.7;// 汽车缩小倍率
var meterZoom = 0.35;// 仪表盘缩小倍率
var speedZoom = 4;// 动画速率

var canvasView;
var canvasContext;
var currentSpeed = 0;
var mileage = 0;
var startTime = 0;
var scoreMeter = 0;
var scoreSecond = 0;

var targetSecond = 120;// 训练时长（s）
var speedThreshold = 0;// 启动阈值
var maxSpeed = 140;// 最高时速（km/h）
var testSecond = 120;// 测试时长（s）
var testSpeed = 0;// 测试用时速（km/h）

function restartRace() {
    $("#carresult").remove();
    currentSpeed = 0;
    mileage = 0;
    scoreMeter = 0;
    scoreSecond = 0;

    startTime = new Date().getTime();
    animationTime = startTime;
    doanimation();
}

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

var isPlaying = false;
var fpsView = null;

var drawBg = function() {
    var canvasView = $("<canvas width=" + CONTENT_WIDTH + " height=" + CONTENT_HEIGHT + " />").appendTo(CONTENT);
    canvasView.css("position", "absolute");
    canvasView.css("top", "0px");
    var canvasContext = canvasView[0].getContext("2d");

    var linear = canvasContext.createLinearGradient(0, CONTENT_HEIGHT * 0.6, 0, 0); 
    linear.addColorStop(0, "#FFEEEE");
    linear.addColorStop(1, "#71B3FF");
    canvasContext.fillStyle = linear;
    canvasContext.fillRect(0, 0, CONTENT_WIDTH, CONTENT_HEIGHT);

    canvasContext.beginPath();
    linear = canvasContext.createLinearGradient(0, 0, CONTENT_WIDTH * 0.05, CONTENT_HEIGHT); 
    linear.addColorStop(0, "#A0B446");
    linear.addColorStop(1, "#6C9839");
    canvasContext.fillStyle = linear;
    // canvasContext.fillStyle = "#8DC64A";
    canvasContext.moveTo(CONTENT_WIDTH * (0.5 - roadWidthEnd / 2), CONTENT_HEIGHT * horizonEnd);
    canvasContext.quadraticCurveTo(CONTENT_WIDTH * 0.3, CONTENT_HEIGHT * 0.15, 0, CONTENT_HEIGHT * 0.1);
    canvasContext.lineTo(0, CONTENT_HEIGHT);
    canvasContext.closePath();
    canvasContext.fill();

    canvasContext.beginPath();
    linear = canvasContext.createLinearGradient(CONTENT_WIDTH, 0, CONTENT_WIDTH * 0.95, CONTENT_HEIGHT); 
    linear.addColorStop(0, "#A0B446");
    linear.addColorStop(1, "#6C9839");
    canvasContext.fillStyle = linear;
    // canvasContext.fillStyle = "#8DC64A";
    canvasContext.moveTo(CONTENT_WIDTH * (0.5 + roadWidthEnd / 2), CONTENT_HEIGHT * horizonEnd);
    canvasContext.quadraticCurveTo(CONTENT_WIDTH * 0.7, CONTENT_HEIGHT * 0.15, CONTENT_WIDTH, CONTENT_HEIGHT * 0.1);
    canvasContext.lineTo(CONTENT_WIDTH, 0);
    canvasContext.lineTo(CONTENT_WIDTH, CONTENT_HEIGHT);
    canvasContext.closePath();
    canvasContext.fill();

    canvasContext.beginPath();
    canvasContext.fillStyle = "#B5BEC5";
    canvasContext.moveTo(CONTENT_WIDTH * (0.5 - roadWidthEnd / 2), CONTENT_HEIGHT * horizonEnd);
    canvasContext.lineTo(CONTENT_WIDTH * (0.5 + roadWidthEnd / 2), CONTENT_HEIGHT * horizonEnd);
    canvasContext.lineTo(CONTENT_WIDTH * (0.5 + roadWidth / 2), CONTENT_HEIGHT);
    canvasContext.lineTo(CONTENT_WIDTH * (0.5 - roadWidth / 2), CONTENT_HEIGHT);
    canvasContext.closePath();
    canvasContext.fill();
}

var ON_START_ANSWER = function() {
    restartRace();
}

var ON_TASK_END = function() {}

var animationFlag = null;
function doanimation() {
    getspeed();
    if (testSpeed) {
        targetSecond = testSecond;
        currentSpeed = testSpeed;
    }
    dorunning();
    showmileage();
    if (scoreSecond >= targetSecond) {
        if (isPlaying) {
            Interface.run("sound", ["stopplay"]);
            isPlaying = false;
        }
        cancelAnimationFrame(animationFlag);
        animationFlag = null;
        showresult();
    } else {
        animationFlag = requestAnimationFrame(doanimation);
    }
}

function getspeed() {
    if (Interface.isWeb()) {
        var temp = getrandomnumber(-1, 3);
        if(temp > 0) {
            currentSpeed ++;
        } else {
            currentSpeed --;
        }
    } else {
        var attention = ThinkGear.data.Attention;
        if(attention >= speedThreshold) {
            if (attention > currentSpeed || attention == 100) {
                currentSpeed ++;
            } else if (attention < currentSpeed) {
                currentSpeed --;
            }
        } else {
            currentSpeed --;
        }
    }
    if (currentSpeed < 0) {
        currentSpeed = 0;
    }
    if (currentSpeed > maxSpeed) {
        currentSpeed = maxSpeed;
    }
    if (currentSpeed > 0) {
        if (!isPlaying) {
            Interface.run("sound", ["startplay", "brain_naodiansaiche/car.mp3", "loop"]);
            isPlaying = true;
        }
    } else {
        if (isPlaying) {
            Interface.run("sound", ["stopplay"]);
            isPlaying = false;
        }
    }
}

var animationTime = 0;
var countTotal = 0;
var countTimes = 0;
function showmileage() {
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

    mileage += currentSpeed * timePast / 3600 * speedZoom;
    var pastTime = new Date().getTime() - startTime;
    if (pastTime >= targetSecond * 1000) {
        pastTime = targetSecond * 1000;
    }
    scoreMeter = mileage / speedZoom;
    scoreMeter = scoreMeter.toFixed(2);
    scoreSecond = pastTime / 1000;
    scoreSecond = scoreSecond.toFixed(2);
    TITLE_TEXT.text(scoreMeter + Language.get("meters") + " - " + scoreSecond + Language.get("seconds"));
}

var percentFlag = 240;

function dorunning() {
    canvasContext.clearRect(0, 0, CONTENT_WIDTH, CONTENT_HEIGHT);
    var percent1 = (mileage + 0 * percentFlag / 6) % percentFlag;
    var percent2 = (mileage + 1 * percentFlag / 6) % percentFlag;
    var percent3 = (mileage + 2 * percentFlag / 6) % percentFlag;
    var percent4 = (mileage + 3 * percentFlag / 6) % percentFlag;
    var percent5 = (mileage + 4 * percentFlag / 6) % percentFlag;
    var percent6 = (mileage + 5 * percentFlag / 6) % percentFlag;
    var treeList = [tree1Image, tree2Image, tree3Image, tree1Image, tree2Image, tree3Image];
    var percentList = [percent1, percent2, percent3, percent4, percent5, percent6];
    var sortList = [percent1, percent2, percent3, percent4, percent5, percent6];
    sortList = sortincrease(sortList);
    for (var i = 0; i < sortList.length; i++) {
        var index = checknumberisinarray(sortList[i], percentList);
        drawTree(sortList[i], treeList[index - 1]);
    }
    drawCar();
    drawMeter();
}

function drawTree(percent, treeImage) {
    percent = Math.pow(percent, 2) / 100;
    var treeWidth = 273;
    var treeHeight = 349;
    var treeDeviation = 10;
    treeZoom = treeZoomEnd + (1 - treeZoomEnd) * percent / 100;
    treeWidth *= treeZoom;
    treeHeight *= treeZoom;
    var treeTop = CONTENT_HEIGHT * horizonEnd + CONTENT_HEIGHT * (1 - horizonEnd) * percent / 100 - treeHeight;
    var treeLeft1 = CONTENT_WIDTH * (0.5 - roadWidth / 2) + CONTENT_WIDTH * (roadWidth - roadWidthEnd) / 2 * (100 - percent) / 100 - treeWidth / 2 - treeDeviation * treeZoom;
    var treeLeft2 = CONTENT_WIDTH * (0.5 + roadWidthEnd / 2) + CONTENT_WIDTH * (roadWidth - roadWidthEnd) / 2 * percent / 100 - treeWidth / 2 + treeDeviation * treeZoom;
    canvasContext.drawImage(treeImage, treeLeft1, treeTop, treeWidth, treeHeight);
    canvasContext.drawImage(treeImage, treeLeft2, treeTop, treeWidth, treeHeight);

    var lineHeight = treeHeight * 0.5;
    var lineWidth = treeWidth * 0.06;
    var lineTop = treeTop + treeHeight * 0.6;
    var lineBottom = treeTop + treeHeight;
    canvasContext.beginPath();
    canvasContext.fillStyle = "#fff";
    canvasContext.moveTo(CONTENT_WIDTH / 2 - lineWidth * (treeZoomEnd + (1 - treeZoomEnd) * lineTop / CONTENT_HEIGHT), lineTop);
    canvasContext.lineTo(CONTENT_WIDTH / 2 + lineWidth * (treeZoomEnd + (1 - treeZoomEnd) * lineTop / CONTENT_HEIGHT), lineTop);
    canvasContext.lineTo(CONTENT_WIDTH / 2 + lineWidth * (treeZoomEnd + (1 - treeZoomEnd) * lineBottom / CONTENT_HEIGHT), lineBottom);
    canvasContext.lineTo(CONTENT_WIDTH / 2 - lineWidth * (treeZoomEnd + (1 - treeZoomEnd) * lineBottom / CONTENT_HEIGHT), lineBottom);
    canvasContext.closePath();
    canvasContext.fill();
}

function drawCar() {
    var carWidth = 210 * carZoom;
    var carHeight = 278 * carZoom;
    var temp = getrandomnumber(- currentSpeed / 80, currentSpeed / 80);;
    var carTop = CONTENT_HEIGHT - carHeight - temp - 70;
    var carLeft = (CONTENT_WIDTH - carWidth) / 2;
    canvasContext.drawImage(carImage, carLeft, carTop, carWidth, carHeight);
}

function drawMeter() {
    var meterWidth = 372 * meterZoom;
    var meterHeight = 238 * meterZoom;
    var meterTop = CONTENT_HEIGHT - meterHeight - 5;
    var meterLeft = (CONTENT_WIDTH - meterWidth) / 2;

    var pointWidth = 330 * meterZoom;
    var pointHeight = 11 * meterZoom;
    // 指针中心点坐标
    var pointPosX = meterLeft + meterWidth / 2;
    var pointPosY = meterTop + meterHeight + pointHeight / 2 - 58 * meterZoom;
    var pointerTop = pointPosY - pointHeight / 2;
    var pointerLeft = pointPosX - pointWidth / 2;

    canvasContext.fillStyle = "#fff";
    canvasContext.arc(pointPosX, pointPosY, meterWidth / 2 + 10 * meterZoom, 0, 360);
    canvasContext.fill();
    canvasContext.beginPath();
    canvasContext.lineWidth = 20 * meterZoom;
    canvasContext.strokeStyle = "#444";
    canvasContext.arc(pointPosX, pointPosY, meterWidth / 2 + 15 * meterZoom, 0, 360);
    canvasContext.stroke();
    canvasContext.drawImage(meterImage, meterLeft, meterTop, meterWidth, meterHeight);
    canvasContext.save();
    canvasContext.translate(pointPosX, pointPosY);
    var arg = currentSpeed * 1.5 - 15;
    canvasContext.rotate(arg * Math.PI / 180);
    canvasContext.translate(-pointPosX, -pointPosY);
    canvasContext.drawImage(pointerImage, pointerLeft, pointerTop, pointWidth, pointHeight);
    canvasContext.restore();
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
    var scoreText = scoreMeter + Language.get("meters");
    var textWidth = (scoreText.length + 2) * CONTENT_HEIGHT * 0.1;
    textView.css("left", (CONTENT_WIDTH - textWidth) * 0.6 + "px");
    textView.text(Language.get("rewult_mileage_text") + scoreText);
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
    textView.css("font-size", CONTENT_HEIGHT * 0.08 + "px");
    var speed = scoreMeter / targetSecond * 3.6;
    speed = speed.toFixed(2);
    textView.text(Language.get("rewult_speed_text") + speed + "km/h");

    var targetTop = CONTENT_HEIGHT * 0.46;
    textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult3, 300)});
}

function showresult3() {
    var textView = $("<div/>").appendTo($("#carresult"));
    textView.css("position", "absolute");
    textView.css("top", CONTENT_HEIGHT + "px");
    textView.css("left", $("#carresult1").css("left"));
    textView.css("color", "#fff");
    textView.css("font-weight", "900");
    textView.css("font-size", CONTENT_HEIGHT * 0.08 + "px");
    var speed = scoreMeter / targetSecond * 3.6;
    if (speed >= 115) {
        speed = "SSS";
    } else if (speed >= 100) {
        speed = "SS";
    } else if (speed >= 85) {
        speed = "S";
    } else if (speed >= 70) {
        speed = "A";
    } else if (speed >= 55) {
        speed = "B";
    } else if (speed >= 40) {
        speed = "C";
    } else if (speed >= 20) {
        speed = "D";
    } else {
        speed = "E";
    }
    textView.html(Language.get("rewult_score_text") + speed);

    var targetTop = CONTENT_HEIGHT * 0.58;
    textView.animate({top:targetTop+"px"}, 300, "swing", function(){setTimeout(showresult4, 800)});
}

function showresult4() {
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
    textView.mousedown(restartRace);
    textView.hide();
    textView.fadeIn(1000);
}
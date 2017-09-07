Config.titleText = ["打海豹", "", ""];
Config.contentText = ["调皮的小海豹们组团来捣乱啦！握紧手中的锤子，谁敢探头就让它吃苦头哟~", "", ""];
Config.hasLevelInfo = false;
Config.sendScore = false;
Config.sendRecord = 0;
Config.defaultStyle = false;

var fpsView = null;// fps显示
var canvasView;
var canvasContext;
var positionList = [];
var stateList = [];
var areaRadius = 0;

var animationTime = 0;// 记录上一次动画执行的时间
var countTotal = 0;
var countTimes = 0;
var timePast = 0;// 两次动画执行的间隔

var bgImg = new Image();
bgImg.src="game_dadishu/bg.png";
var hole1Img = new Image();
hole1Img.src="game_dadishu/hole1.png";
var hole2Img = new Image();
hole2Img.src="game_dadishu/hole2.png";
var mouse1Img = new Image();
mouse1Img.src="game_dadishu/mouse1.png";
var mouse2Img = new Image();
mouse2Img.src="game_dadishu/mouse2.png";
var hammerImg = new Image();
hammerImg.src="game_dadishu/hammer.png";
var hammer2Img = new Image();
hammer2Img.src="game_dadishu/hammer2.png";

var hole1Width = 165;
var hole1Height = 58;
var hole2Width = 165;
var hole2Height = 135;
var mouseWidth = 111;
var mouseHeight = 111;
var hammerWidth = 206 * 0.8;
var hammerHeight = 160 * 0.8;

var hammerInAnimation = false;// 锤子是否处于动画中
var hammerTop = 0;// 上边距
var hammerLeft = 0;// 左边距
var hammerArg = 0;// 旋转角度
var hammerAnimationArg = 10;// 动画单次旋转角度
var hammerAnimationTotalArg = -80;// 动画总旋转角度
var hammerDown = false;// 锤子是否处于下落阶段
var hammerAnimationFlage = null;
var hammerAnimationLastTime

var eventMaxCount = 1;// 同时执行的最大事件数
var eventInterval = 1000;// 事件间隔
var eventCurrentCount = 0;// 当前执行的事件数
var eventList = [];// 当前执行的事件index列表
var animationSpeedBase = 100;// 全局速度基数
var animationSpeedFlag = 80;// 当前全局速度

$(document).ready(function() {
    $("#title").css("background", "#5AB0E5");
    CONTENT.css("background", "#7ADBE5");
    Interface.run("sound", ["startplay", "game_dadishu/bg.mp3", "loop"]);
});

var ON_GET_SIZE = function(width, height) {
    CONTENT.css("background-image", "url()");
    $("#btn_back").appendTo("body");
    $("#btn_back").css("background", "#5AB0E5");
}

var ON_START_PLAY = function(level) {
    drawBg();
    positionList = [];
    stateList = [];

    for (var i = 1; i <= 3; i++) {
        var top = (CONTENT_HEIGHT + TITLE_HEIGHT) / 3 * 0.4;
        var left = i * CONTENT_WIDTH / 4;
        positionList.push([top, left]);
        stateList.push(0);
    }
    for (var i = 0; i <= 3; i++) {
        var top = (CONTENT_HEIGHT + TITLE_HEIGHT) / 3 * 0.85;
        var left = i * CONTENT_WIDTH / 4 + CONTENT_WIDTH / 4 / 2;
        positionList.push([top, left]);
        stateList.push(0);
    }
    for (var i = 1; i <= 3; i++) {
        var top = (CONTENT_HEIGHT + TITLE_HEIGHT) / 3 * 1.3;
        var left = i * CONTENT_WIDTH / 4;
        positionList.push([top, left]);
        stateList.push(0);
    }
    for (var i = 0; i <= 3; i++) {
        var top = (CONTENT_HEIGHT + TITLE_HEIGHT) / 3 * 1.75;
        var left = i * CONTENT_WIDTH / 4 + CONTENT_WIDTH / 4 / 2;
        positionList.push([top, left]);
        stateList.push(0);
    }
    for (var i = 1; i <= 3; i++) {
        var top = (CONTENT_HEIGHT + TITLE_HEIGHT) / 3 * 2.2;
        var left = i * CONTENT_WIDTH / 4;
        positionList.push([top, left]);
        stateList.push(0);
    }
    areaRadius = (hole1Height + hole2Height) * 0.6;

    eventMaxCount = 1;
    setTimeout(domaxcount, 1000);
}

function domaxcount() {
    if (eventMaxCount < 5) {
        eventMaxCount ++;
        setTimeout(domaxcount, 1000);
    }
}

function drawBg() {
    var canvasView = $("<canvas width=" + CONTENT_WIDTH + " height=" + (CONTENT_HEIGHT + TITLE_HEIGHT) + " />").appendTo("body");
    canvasView.css("position", "absolute");
    canvasView.css("top", "0px");
    var canvasContext = canvasView[0].getContext("2d");
    canvasContext.drawImage(bgImg, 0, 0, CONTENT_WIDTH, (CONTENT_HEIGHT + TITLE_HEIGHT));
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    canvasView = $("<canvas width=" + CONTENT_WIDTH + " height=" + (CONTENT_HEIGHT + TITLE_HEIGHT) + " />").appendTo("body");
    canvasView.css("position", "absolute");
    canvasView.css("top", "0px");
    canvasView.css("cursor", "none");
    canvasContext = canvasView[0].getContext("2d");
    canvasContext.translate(0, TITLE_HEIGHT);

    fpsView = $("<div/>").appendTo("body");
    fpsView.css("position", "fixed");
    fpsView.css("right", "2px");
    fpsView.css("bottom", "0px");
    fpsView.css("color", "#f00");
    fpsView.css("font-size", "1px");
    animationTime = new Date().getTime();

    bindevent();
    doanimation();
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}

function doanimation() {
    timePast = new Date().getTime() - animationTime;
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
    animationFlag = requestAnimationFrame(doanimation);

    canvasContext.clearRect(0, -TITLE_HEIGHT, CONTENT_WIDTH, CONTENT_HEIGHT + TITLE_HEIGHT);
    doevent(timePast);
    drawhole1(0, 2);
    drawmouse(0, 2);
    drawhole2(0, 2);
    drawhole1(3, 6);
    drawmouse(3, 6);
    drawhole2(3, 6);
    drawhole1(7, 9);
    drawmouse(7, 9);
    drawhole2(7, 9);
    drawhole1(10, 13);
    drawmouse(10, 13);
    drawhole2(10, 13);
    drawhole1(14, 16);
    drawmouse(14, 16);
    drawhole2(14, 16);
    drawhammer();
}

// 事件进度控制
function doevent(timePast) {
    var timeZoom = 0.06; 
    if (eventCurrentCount < eventMaxCount) {
        var randomNumber = getrandomnumber(0, stateList.length - 1);
        while (checknumberisinarray(randomNumber, eventList)) {
            randomNumber = getrandomnumber(0, stateList.length - 1);
        }
        eventCurrentCount ++;
        eventList.push(randomNumber);
        stateList[randomNumber] = 100 * animationSpeedBase;
    }
    for (var i = 0; i < eventList.length; i++) {
        var index = eventList[i];
        var state = stateList[index];
        // 上升
        if (state >= 100 * animationSpeedBase && state <= 199 * animationSpeedBase) {
            state += 10 * timePast * timeZoom * animationSpeedFlag;
            if (state >= 199 * animationSpeedBase) {
                state = 200 * animationSpeedBase;
            }
        }
        // 停留
        if (state >= 200 * animationSpeedBase && state <= 299 * animationSpeedBase) {
            state += 1 * timePast * timeZoom * animationSpeedFlag;
            if (state >= 299 * animationSpeedBase) {
                state = 300 * animationSpeedBase;
            }
        }
        // 下降
        if (state >= 300 * animationSpeedBase && state <= 399 * animationSpeedBase) {
            state += 10 * timePast * timeZoom * animationSpeedFlag;
            if (state >= 399 * animationSpeedBase) {
                state = 2000 * animationSpeedBase;
            }
        }
        // 被击中
        if (state >= 1000 * animationSpeedBase && state <= 1099 * animationSpeedBase) {
            state += 5 * timePast * timeZoom * animationSpeedFlag;
            if (state >= 1099 * animationSpeedBase) {
                state = 1100 * animationSpeedBase;
            }
        }
        // 被击中后下降
        if (state >= 1100 * animationSpeedBase && state <= 1199 * animationSpeedBase) {
            state += 5 * timePast * timeZoom * animationSpeedFlag;
            if (state >= 1199 * animationSpeedBase) {
                state = 2000 * animationSpeedBase;
            }
        }
        // 延迟
        if (state >= 2000 * animationSpeedBase && state <= 2099 * animationSpeedBase) {
            state += 5 * timePast * timeZoom * animationSpeedFlag;
            if (state >= 2099 * animationSpeedBase) {
                var i = checknumberisinarray(index, eventList);
                eventList.splice(i - 1, 1);
                eventCurrentCount --;
                state = 0;
            }
        }
        stateList[index] = state;
    }
}

// 绘制洞穴（后）
function drawhole1(start, end) {
    for (var i = start; i <= end; i++) {
        var top = positionList[i][0];
        var left = positionList[i][1];
        canvasContext.drawImage(hole1Img, left - hole1Width / 2, top, hole1Width, hole1Height);
    }
}

// 绘制地鼠
function drawmouse(start, end) {
    for (var i = start; i <= end; i++) {
        var state = stateList[i];
        if (state == 0) {
            continue;
        }
        var top = positionList[i][0] - mouseHeight / 2;
        var left = positionList[i][1] - mouseWidth / 2;
        var img = mouse1Img;

        // 上升
        if (state >= 100 * animationSpeedBase && state <= 199 * animationSpeedBase) {
            var percent = (state - 100 * animationSpeedBase) / 100 / animationSpeedBase;
            top += (1 - percent) * mouseHeight;
        }
        // 停留
        if (state >= 200 * animationSpeedBase && state <= 299 * animationSpeedBase) {
        }
        // 下降
        if (state >= 300 * animationSpeedBase && state <= 399 * animationSpeedBase) {
            var percent = (state - 300 * animationSpeedBase) / 100 / animationSpeedBase;
            top += percent * mouseHeight;
        }
        // 被击中
        if (state >= 1000 * animationSpeedBase && state <= 1099 * animationSpeedBase) {
            img = mouse2Img;
        }
        // 被击中后下降
        if (state >= 1100 * animationSpeedBase && state <= 1199 * animationSpeedBase) {
            var percent = (state - 1100 * animationSpeedBase) / 100 / animationSpeedBase;
            top += percent * mouseHeight;
            img = mouse2Img;
        }
        // 延迟
        if (state >= 2000 * animationSpeedBase && state <= 2099 * animationSpeedBase) {
            top += mouseHeight + 2;
            img = mouse2Img;
        }
        left = Math.floor(left);
        top = Math.floor(top);
        canvasContext.drawImage(img, left, top, mouseWidth, mouseHeight);
    }
}

// 绘制洞穴（前）
function drawhole2(start, end) {
    for (var i = start; i <= end; i++) {
        var top = positionList[i][0];
        var left = positionList[i][1];
        canvasContext.drawImage(hole2Img, left - hole2Width / 2, top + 38, hole2Width, hole2Height);

        // 状态数值显示
        // canvasContext.font = "30px 微软雅黑";
        // canvasContext.fillText(stateList[i], left - 20, top);

        // 点击区域显示
        // canvasContext.beginPath();
        // canvasContext.strokeStyle = "#f00";
        // canvasContext.lineWidth = 1;
        // canvasContext.arc(left, top, areaRadius, 0, 360);
        // canvasContext.stroke();
    }
}

// 绘制锤子
function drawhammer() {
    var arg = hammerArg;
    var img = hammerImg;
    if (arg <= -30) {
        arg = -30;
        img = hammer2Img;
    }
    canvasContext.save();
    canvasContext.translate(hammerLeft, hammerTop);
    canvasContext.rotate(arg * Math.PI / 180);
    canvasContext.drawImage(img, - hammerWidth * 0.8, - hammerHeight * 0.8, hammerWidth, hammerHeight);
    canvasContext.restore(); 
}

function hammerAnimation() {
    if (hammerDown) {
        hammerArg -= hammerAnimationArg;
        if (hammerArg == hammerAnimationTotalArg) {
            hammerDown = false;
        }
        hammerAnimationFlage = setTimeout(hammerAnimation, 10);
    } else {
        hammerArg += hammerAnimationArg;
        if (hammerArg == 0) {
            hammerArg = 0;
            hammerAnimationFlage = null;
            hammerInAnimation = false;
        } else {
            hammerAnimationFlage = setTimeout(hammerAnimation, 10);
        }
    }
}

// 操作事件
function bindevent() {
    canvasView.off("mousedown");
    canvasView.off("mouseup");
    canvasView.off("mousemove");
    canvasView.off("touchstart");
    canvasView.off("touchend");
    canvasView.off("touchmove");
    var drag = function drag() {
        this.init.apply(this, arguments);
    };
    drag.prototype = {
        constructor: drag,
        down: false,// 指针是否按下
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,

        init: function() {
            this.bindEvent();
        },
        bindEvent: function() {
            var t = this;
            if (Interface.isWeb()) {
                canvasView.on("mousedown", Button.button,function(e) {;t.movestart(e);});
                canvasView.on("mouseup", Button.button,function(e) {t.moveend(e);});
                canvasView.on("mousemove", Button.button,function(e) {t.moving(e);});
            } else {
                canvasView.get(0).addEventListener("touchstart",function(e) {t.movestart(e);});
                canvasView.get(0).addEventListener("touchend",function(e) {t.moveend(e);});
                canvasView.get(0).addEventListener("touchmove",function(e) {t.moving(e);});
            }
        },
        movestart: function(e) {
            e && e.preventDefault();
            if (hammerAnimationFlage == null) {
                var hit = false;
                hammerInAnimation = true;
                hammerDown = true;
                hammerAnimation();

                // 计算锤子砸中的区域
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                    var clienty = e.clientY;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                    var clienty = temp[0].clientY;
                }
                clientx /= SCREEN_ZOOM;
                clienty /= SCREEN_ZOOM;
                hammerTop = clienty - hammerHeight * 0.7;
                hammerLeft = clientx + hammerWidth * 0.5;
                for (var i = 0; i < positionList.length; i++) {
                    var top = positionList[i][0];
                    var left = positionList[i][1];
                    if (Math.sqrt(Math.pow(top - clienty, 2) + Math.pow(left - clientx, 2)) <= areaRadius) {
                        if (stateList[i] > 0 && stateList[i] < 1000 * animationSpeedBase) {
                            hit = true;
                            stateList[i] = 1000 * animationSpeedBase;
                        }
                        break;
                    }
                }
                if (hit) {
                    Interface.run("sound", ["startpool", "game_dadishu/hit2.mp3", "1.5"]);
                } else {
                    Interface.run("sound", ["startpool", "game_dadishu/hit.mp3", "1.5"]);
                }
            }
        },
        moveend: function(e) {
            e && e.preventDefault();
        },
        moving: function(e) {
            e && e.preventDefault();
            if (!hammerInAnimation) {
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                    var clienty = e.clientY;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                    var clienty = temp[0].clientY;
                }
                hammerTop = clienty / SCREEN_ZOOM - hammerHeight * 0.7;
                hammerLeft = clientx / SCREEN_ZOOM + hammerWidth * 0.5;
            }
        }
    };
    var drag = new drag();
}
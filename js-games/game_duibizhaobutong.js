Config.titleText = ["对比找不同", "", ""];
Config.contentText = ["请观察左右两个画面的不同之处（形状、位置、大小、角度、颜色等），并在规定时间内通过点击找出它们。点击错误的区域会使剩余时间减少10秒。", "", ""];
Config.exerciseText = ["请找出左右两个画面的不同之处", "", ""];
Config.exerciseTime = [60, 60, 60, 60, 60]; //做题界面每级的等待时间

var canvasLeft = null;
var contextLeft = null;
var canvasRight = null;
var contextRight = null;

var differentList = [];

var ON_GET_SIZE = function(width, height) {
    CONTENT.css("background-image", "url()");
}

var ON_START_PLAY = function(level) {
    var markCount = level * 5 + 5;
    var differentCount = level + 1;
    var positionList = [];
    differentList = [];

    var canvasWidth = CONTENT_WIDTH / 2;
    var canvasHeight = CONTENT_HEIGHT;
    var canvasBorder = 50;

    canvasRight = $("<canvas width=" + (canvasWidth - 2) + " height=" + canvasHeight + " />").appendTo(CONTENT);
    canvasRight.css("position", "absolute");
    canvasRight.css("left", CONTENT_WIDTH / 2 + "px");
    canvasRight.css("border-left", "4px solid #666");
    canvasRight.css("background", "#ddd");
    contextRight = canvasRight[0].getContext("2d");

    canvasLeft = $("<canvas width=" + (canvasWidth + 2) + " height=" + canvasHeight + " />").appendTo(CONTENT);
    canvasLeft.css("position", "absolute");
    canvasLeft.css("background", "#ddd");
    contextLeft = canvasLeft[0].getContext("2d");

    canvasLeft.mousedown(oncanvasclick);
    canvasRight.mousedown(oncanvasclick);

    var minDistance = 0;
    var isChecked = false;
    for (var i = 0; i < markCount; i++) {
        isChecked = false;
        var tryCount = 1000;
        while (!isChecked) {
            isChecked = true;
            var x = getrandomnumber(canvasBorder, canvasWidth - canvasBorder);
            var y = getrandomnumber(canvasBorder, canvasHeight - canvasBorder);
            for (var j = 0; j < positionList.length; j++) {
                var top = positionList[j][0];
                var left = positionList[j][1];
                if (checkoverlap(top, left, y, x, 65)) {
                    isChecked = false;
                    tryCount --;
                    break;
                }
            }
            if (tryCount == 0) {
                isChecked = false;
                break;
            }
        }
        if (!isChecked) {
            i = -1;
            positionList = [];
            continue;
        } else {
            var r = 100 - level * 10;
            minDistance = r * 2;
            r = getrandomnumber(r, r * 1.6);
            positionList.push([y, x, r]);
        }
    }
    var differentIndex = [];
    while (differentList.length < differentCount) {
        var isDifferent = false;
        var randomNumber = -1;
        while (!isDifferent) {
            isDifferent = true;
            randomNumber = getrandomnumber(0, positionList.length - 1);
            var x = positionList[randomNumber][1];
            var y = positionList[randomNumber][0];
            for (var j = 0; j < differentList.length; j++) {
                var top = differentList[j][0];
                var left = differentList[j][1];
                if (checkoverlap(top, left, y, x, minDistance)) {
                    isDifferent = false;
                    break;
                }
            }
        }
        differentIndex.push(randomNumber);
        differentList.push([y, x, positionList[randomNumber][2]]);
    }
    for (var i = 0; i < markCount; i++) {
        var rgbMin = 50;
        var rgbMax = 200;
        var type = getrandomnumber(1, 10);
        var x = positionList[i][1];
        var y = positionList[i][0];
        var r = positionList[i][2];
        var width = 5;
        var colorFlag = getrandomnumber(1, 3);
        var color1 = getrandomnumber(rgbMin, rgbMax);
        if (colorFlag == 1) {
            color1 = 0;
        }
        var color2 = getrandomnumber(rgbMin, rgbMax);
        if (colorFlag == 2) {
            color2 = 0;
        }
        var color3 = getrandomnumber(rgbMin, rgbMax);
        if (colorFlag == 3) {
            color3 = 0;
        }
        var color = "rgb(" + color1 + "," + color2 + "," + color3 + ")";
        var fill = getrandomnumber(0, 1);
        var arg = getrandomnumber(0, 359);

        doDraw(contextRight, type, x, y, r, width, color, fill, arg);

        if (checknumberisinarray(i, differentIndex)) {
            var randomNumber
            randomNumber = getrandomnumber(1, 6);
            switch (randomNumber) {
                case 1:// 形状
                    var type2 = getrandomnumber(1, 9);
                    while (type == type2) {
                        type2 = getrandomnumber(1, 9);
                    }
                    type = type2;
                    break;
                case 2:// 位置
                    if (getrandomnumber(0, 1)) {
                        x += getrandomnumber(r*0.3, r*0.5);
                    } else {
                        x -= getrandomnumber(r*0.3, r*0.5);
                    }
                    if (getrandomnumber(0, 1)) {
                        y += getrandomnumber(r*0.3, r*0.5);
                    } else {
                        y -= getrandomnumber(r*0.3, r*0.5);
                    }
                    break;
                case 3:// 大小
                    if (getrandomnumber(0, 1)) {
                        r *= getrandomnumber(60, 70);r /= 100;
                    } else {
                        r *= getrandomnumber(130, 140);r /= 100;
                    }
                    break;
                case 4:// 填充
                    if (type != 4) {
                        fill = !fill;
                    } else {
                        var type2 = getrandomnumber(1, 9);
                        while (type == type2) {
                            type2 = getrandomnumber(1, 9);
                        }
                        type = type2;
                    }
                    break;
                case 5:// 颜色
                    if (fill) {
                        var colorFlag2 = getrandomnumber(1, 3);
                        while (colorFlag == colorFlag2) {
                            colorFlag2 = getrandomnumber(1, 3);
                        }
                        var color1 = getrandomnumber(rgbMin, rgbMax);
                        if (colorFlag2 == 1) {
                            color1 = 0;
                        }
                        var color2 = getrandomnumber(rgbMin, rgbMax);
                        if (colorFlag2 == 2) {
                            color2 = 0;
                        }
                        var color3 = getrandomnumber(rgbMin, rgbMax);
                        if (colorFlag2 == 3) {
                            color3 = 0;
                        }
                        color = "rgb(" + color1 + "," + color2 + "," + color3 + ")";
                    } else {
                        var type2 = getrandomnumber(1, 9);
                        while (type == type2) {
                            type2 = getrandomnumber(1, 9);
                        }
                        type = type2;
                    }
                    break;
                case 6:// 旋转
                    if (type != 4) {
                        var argRange;
                        if(type == 9) {
                            argRange = [20, 30];
                        } else if (type == 10) {
                            argRange = [90, 180];
                        } else {
                            argRange = [30, 60];
                        }
                        if (getrandomnumber(0, 1)) {
                            arg += getrandomnumber(argRange[0], argRange[1]);
                        } else {
                            arg -= getrandomnumber(argRange[0], argRange[1]);
                        }
                    } else {
                        var type2 = getrandomnumber(1, 9);
                        while (type == type2) {
                            type2 = getrandomnumber(1, 9);
                        }
                        type = type2;
                    }
                    break;
            }
        }
        doDraw(contextLeft, type, x, y, r, width, color, fill, arg);
    }
    // showanswer();
}

function checkoverlap(top1, left1, top2, left2, distance) {
    if (top1 - top2 >= distance || top2 - top1 >= distance) {
        return false;
    }
    if (left1 - left2 >= distance || left2 - left1 >= distance) {
        return false;
    }
    return true;
}

function showanswer() {
    for (var i = 0; i < differentList.length; i++) {
        var x = differentList[i][1];
        var y = differentList[i][0];
        var r = differentList[i][2];
        doDraw(contextLeft, 4, x, y, r * 1.5, 10, "#f00", false, 0);
        doDraw(contextRight, 4, x, y, r * 1.5, 10, "#f00", false, 0);
    }
}

function oncanvasclick(e) {
    var clientx = e.clientX;
    var clienty = e.clientY;
    clientx /= SCREEN_ZOOM;
    clienty /= SCREEN_ZOOM;
    clienty -= TITLE_HEIGHT;
    if (clientx >= CONTENT_WIDTH / 2) {
        clientx -= CONTENT_WIDTH / 2;
    }
    for (var j = 0; j < differentList.length; j++) {
        var top = differentList[j][0];
        var left = differentList[j][1];
        var r = differentList[j][2];
        if (Math.sqrt(Math.pow(top - clienty, 2) + Math.pow(left - clientx, 2)) <= r) {
            differentList.splice(j, 1);
            doDraw(contextLeft, 4, left, top, r * 1.5, 10, "#f00", false, 0);
            doDraw(contextRight, 4, left, top, r * 1.5, 10, "#f00", false, 0);
            Record.clickright();
            if (differentList.length == 0) {
                Game.right();
            }
            return;
        }
    }
    Record.clickwrong();
    TimeBar.subtract(10000);
}

/*
type 图形类型，1正方形 2长方形 3菱形 4圆形 5五角星 6等边三角形 7等边直角三角形 8斜边直角三角形 9六边形 10螺旋
x,y 中心点坐标
r 半径
width 线条宽度
color 线条颜色
fill 是否填充
arg 旋转角度
*/
function doDraw(context, type, x, y, r, width, color, fill, arg) {
    context.save();
    context.translate(x, y);
    context.rotate(arg * Math.PI / 180);
    context.beginPath();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = width;
    if (type == 1) {
        context.moveTo(-r*0.6, -r*0.6);
        context.lineTo(+r*0.6, -r*0.6);
        context.lineTo(+r*0.6, +r*0.6);
        context.lineTo(-r*0.6, +r*0.6);
    } else if (type == 2) {
        context.moveTo(-r*0.7, -r*0.5);
        context.lineTo(+r*0.7, -r*0.5);
        context.lineTo(+r*0.7, +r*0.5);
        context.lineTo(-r*0.7, +r*0.5);
    } else if (type == 3) {
        context.moveTo(-r*0.9, 0);
        context.lineTo(0, -r*0.6);
        context.lineTo(+r*0.9, 0);
        context.lineTo(0, +r*0.6);
    } else if (type == 4) {
        context.arc(0, 0, r*0.6, 0, 360);
    } else if (type == 5) {
        for (var i = 0; i < 5; i++) {   
            context.lineTo(Math.cos((18+i*72)/180*Math.PI)*r*0.8, -Math.sin((18+i*72)/180*Math.PI)*r*0.8);
            context.lineTo(Math.cos((54+i*72)/180*Math.PI)*r*0.8*0.4, -Math.sin((54+i*72)/180*Math.PI)*r*0.8*0.4);
        }
    } else if (type == 6) {
        for (var i = 0; i < 3; i++) {   
            context.lineTo(Math.cos(i*120/180*Math.PI)*r*0.8, -Math.sin(i*120/180*Math.PI)*r*0.8);
        }
    } else if (type == 7) {
        context.moveTo(-r*0.5, -r*0.8);
        context.lineTo(+r*0.8, +r*0.5);
        context.lineTo(-r*0.5, +r*0.5);
    } else if (type == 8) {
        context.moveTo(-r*0.4, -r*0.8);
        context.lineTo(+r*0.6, +r*0.8);
        context.lineTo(-r*0.4, +r*0.8);
    } else if (type == 9) {
        for (var i = 0; i < 6; i++) {   
            context.lineTo(Math.cos(i*60/180*Math.PI)*r*0.8, -Math.sin(i*60/180*Math.PI)*r*0.8);
        }
    } else if (type == 10) {
        fill = false;
        for (var i = 0; i < 100; i++) {   
            context.lineTo(Math.cos(i*9/180*Math.PI)*i/100*r*0.8, -Math.sin(i*9/180*Math.PI)*i/100*r*0.8);
        }
        context.moveTo(0, 0);
    }
    context.closePath();
    if (fill) {
        context.fill();
    } else {
        context.stroke();
    }
    context.restore();
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {
    showanswer();
}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}
Config.titleText = ["点棋子", "", ""];
Config.contentText = ["请在规定时间内按数字从小到大的顺序点击棋子。", "", ""];
Config.exerciseText = ["请按从小到大的顺序点击棋子", "", ""];
Config.rememberTime = [0, 0, 0, 0, 0]; //观察记忆界面每级的等待时间
Config.exerciseTime = [50, 80, 100, 150, 200]; //做题界面每级的等待时间

var ON_GET_SIZE = function(width, height) {}

var lineCount = 0;
var ballCount = 0;
var numberList = [];
var clickCount = 0;

var ON_START_PLAY = function(level) {
    lineCount = level + 3;
    ballCount = lineCount * lineCount;
    numberList = [];
    for (var i = 0; i < ballCount; i++) {
        numberList.push(i + 1);
    }
    numberList = sortrandom(numberList);
    clickCount = 0;
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    var itemMargin = 10;
    var itemSize = CONTENT_HEIGHT - itemMargin * 2 - 10;
    var canvasTop = itemMargin + 10;
    var canvasLeft = (CONTENT_WIDTH - itemSize) / 2;

    var contentView = $("<div/>").appendTo(CONTENT);
    contentView.css("width", itemSize + "px");
    contentView.css("height", itemSize + "px");
    contentView.css("margin-top", canvasTop + "px");
    contentView.css("margin-left", canvasLeft + "px");

    canvasView = $("<canvas/>").appendTo(contentView);
    canvasView.css("width", itemSize + "px");
    canvasView.css("height", itemSize + "px");
    canvasView.css("background", "#ec9");
    canvasView.css("position", "absolute");
    canvasView.css("visibility", "hidden");
    canvasView.attr("width", itemSize);
    canvasView.attr("height", itemSize);

    var ctx = canvasView[0].getContext('2d');

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, itemSize);
    ctx.lineTo(itemSize, itemSize);
    ctx.lineTo(itemSize, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 2;
    for (var i = 1; i <= lineCount; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * itemSize / (lineCount + 1));
        ctx.lineTo(itemSize, i * itemSize / (lineCount + 1));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(i * itemSize / (lineCount + 1), 0);
        ctx.lineTo(i * itemSize / (lineCount + 1), itemSize);
        ctx.stroke();
    }

    setTimeout(showcanvas, showCanvasDelay);

    var ballMargin = 10 - lineCount + 1;
    var ballSize = itemSize / (lineCount + 1) - ballMargin * 2;
    for (var i = 0; i < ballCount; i++) {
        var ballView = $("<div/>").appendTo(contentView);
        ballView.css("width", ballSize - 2 + "px");
        ballView.css("height", ballSize - 2 + "px");
        ballView.css("position", "absolute");
        ballView.css("margin-top", Math.floor(i / lineCount) * (ballSize + ballMargin * 2) + ballSize / 2 + ballMargin * 2 + "px");
        ballView.css("margin-left", (i % lineCount) * (ballSize + ballMargin * 2) + ballSize / 2 + ballMargin * 2 + "px");
        ballView.css("border-radius", "50%");
        var color = getrandomcolor();
        ballView.css("background", color);
        ballView.attr("color", color);
        ballView.css("color", "#fff");
        ballView.css("line-height", ballSize + "px");
        ballView.css("font-size", ballSize * 0.55 + "px");
        ballView.css("font-weight", "900");
        ballView.css("text-align", "center");
        ballView.css("border", "1px solid #999");
        // ballView.css("-webkit-text-stroke", "1px #333");
        ballView.text(numberList[i]);
        ballView.mousedown(onballclick);
    }
}

function onballclick() {
    Game.clickitem(this);
}

var canvasView = null;
var showCanvasDelay = 200;
function showcanvas() {
    showCanvasDelay = 0;
    canvasView.css("visibility", "visible");
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
    item.css("background", "#fff");
    item.css("color", "#000");
    if (number == clickCount) {
        // item.text("");
        // item.unbind("mousedown");
        Record.clickright();
        if (clickCount == numberList.length) {
            Game.right();
        }
    } else {
        Record.clickwrong();
        Game.wrong();
    }
    setTimeout(function(){
        item.css("background", item.attr("color"));
        item.css("color", "#fff");
    }, 300);
}

var ON_TASK_END = function() {}
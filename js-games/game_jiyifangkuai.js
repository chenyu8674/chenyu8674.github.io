Config.titleText = ["记忆方块", "", ""];
Config.contentText = ["请在规定时间内记住屏幕顶端给出颜色的所有方块的位置，并在颜色消失后通过点击选出它们。", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 12, 14, 16, 18]; //观察记忆界面每级的等待时间
Config.exerciseTime = [10, 12, 14, 16, 18]; //做题界面每级的等待时间

var targetColor;
var clickCount;
var answerList;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    clickCount = 0;
    var answerCount = Math.floor(level * 2.2);
    var blockCount = Math.floor(level * 0.7 + 3);

    targetColor = getrandomcolor();
    Config.rememberText = ["请记住所有<tex class='alarm'>" + getcolortext(targetColor) + "色</tex>方块的位置", "", ""];
    Config.exerciseText = ["请选出所有<tex class='alarm'>" + getcolortext(targetColor) + "色</tex>的方块", "", ""];
    var colorList = [];
    colorList.push(targetColor);
    while (colorList.length < 4) {
        var randomColor = getrandomcolor();
        while (colorList.has(randomColor)) {
            randomColor = getrandomcolor();
        }
        colorList.push(randomColor)
    }

    answerList = [];
    while (answerList.length < answerCount) {
        var randomNumber = getrandomnumber(0, blockCount * blockCount - 1);
        while (answerList.has(randomNumber)) {
            randomNumber = getrandomnumber(0, blockCount * blockCount - 1);
        }
        answerList.push(randomNumber)
    }

    var contentWidth = CONTENT_WIDTH;
    var contentHeight = CONTENT_HEIGHT - 30;
    var borderWidth = 1;
    var blockSize = Math.floor(contentHeight / blockCount) - borderWidth * 2;
    var blockView = $("<div/>").appendTo(CONTENT);
    blockView.css("width", contentHeight + blockSize - 1 + "px");
    blockView.css("height", contentHeight + blockSize - 1 + "px");
    blockView.css("margin-top", "15px");
    blockView.css("margin-left", (contentWidth - contentHeight) * 0.5 + "px");

    for (var i = 0; i < blockCount * blockCount; i++) {
        var block = $("<div/>").appendTo(blockView);
        block.css("width", blockSize + "px");
        block.css("height", blockSize + "px");
        block.css("border", borderWidth + "px solid #000");
        if (i < blockCount * blockCount) {
            block.css("border-top", borderWidth * 2 + "px solid  #000");
        }
        if (i > blockCount * (blockCount - 1) - 1) {
            block.css("border-bottom", borderWidth * 2 + "px solid  #000");
        }
        if (i % blockCount == 0) {
            block.css("border-left", borderWidth * 2 + "px solid  #000");
        }
        if (i % blockCount == blockCount - 1) {
            block.css("border-right", borderWidth * 2 + "px solid  #000");
        }
        block.css("line-height", blockSize + "px");
        block.css("text-align", "center");
        block.css("font-size", blockSize * 0.7 + "px");
        block.css("font-weight", "900");
        block.css("float", "left");
        block.css("overflow", "hidden");
        block.attr("class", "block");
        if (answerList.has(i)) {
            block.css("background", targetColor);
        } else {
            if (level < 3) {
                block.css("background", "#999");
            } else if (level == 3) {
                block.css("background", colorList[1]);
            } else if (level == 4) {
                var randomNumber = getrandomnumber(1, 2);
                block.css("background", colorList[randomNumber]);
            } else if (level == 5) {
                var randomNumber = getrandomnumber(1, 3);
                block.css("background", colorList[randomNumber]);
            }
        }
        block.attr("color", block.css("background-color"));
        block.mousedown(onblockclick);
    }
}

function onblockclick() {
    Game.clickitem(this);
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    $(".block").css("background", "#999");
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var color = item.attr("color");

    clickCount++;
    if (color == targetColor) {
        item.css("background", color);
        item.unbind("mousedown");
        Record.clickright();
        if (clickCount == answerList.length) {
            Game.right();
        }
    } else {
        item.css("background", color);
        Record.clickwrong();
        Game.wrong();
    }
}

var ON_TASK_END = function() {}
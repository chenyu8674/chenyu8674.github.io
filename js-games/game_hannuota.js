Config.titleText = ["汉诺塔", "", ""];
Config.contentText = ["请用尽可能少的步数将塔块全部移至最右侧立柱，每次只能移动一块，大块不得放在小块之上。", "", ""];
Config.questionNumber = 1; //每级的题目数
Config.sendScore = false;
Config.sendRecord = 0;

$(document).ready(function() {
    loadCssByName("hanoi");
});

var areaHeight;

var ON_GET_SIZE = function(width, height) {
    areaHeight = height;
    blockHeight = Math.floor((areaHeight - 150) / 8);
}

var ON_START_PLAY = function(level) {
    blockCount = level + 3;
    initblock();
    refreshblock();
    binddragevent();
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {
    var percent = checkpercent();
    Record.count(moveCount);
    Record.percent(percent);
    if (percent < 20) {

    } else if (percent < 50) {
        Record.leveldown();
    } else {
        Record.levelcontinue();
    }
}

function checkpercent() {
    var scoreList = [];
    var totalScore = 1 - 1 / Math.pow(2, blockCount);
    for (var i = 1; i <= blockCount; i++) {
        scoreList[i] = 1 / Math.pow(2, blockCount - i + 1) / totalScore;
    }
    var score = 0;
    // for (var i = blockTower2.length - 1; i >= 0; i--) {
    //     if (i == blockTower2.length - 1 || blockTower2[i] == blockTower2[i + 1] - 1) {
    //         score += scoreList[blockTower2[i]] / 2;
    //     }
    // }
    for (var i = blockTower3.length - 1; i >= 0; i--) {
        if (i == blockTower3.length - 1 || blockTower3[i] == blockTower3[i + 1] - 1) {
            score += scoreList[blockTower3[i]];
        }
    }
    var percent = Math.round(score * 100);
    return percent;
}

var blockHeight;
var blockCount;
var blockSizeList = [];
var blockPositionList = [];
var areaSizeList = [];
var areaPositionList = [];
var blockTower1 = [];
var blockTower2 = [];
var blockTower3 = [];
var blockList = [];
var draggingBlock = -1;
var moveCount = 0;

function initblock() {
    blockSizeList = [];
    blockPositionList = [];
    areaSizeList = [];
    areaPositionList = [];
    blockTower1 = [];
    blockTower2 = [];
    blockTower3 = [];
    draggingBlock = -1;
    moveCount = 0;
    for (var i = 1; i <= blockCount; i++) {
        blockTower1[i - 1] = i;
    }
    blockList = [blockTower1, blockTower2, blockTower3];

    for (var i = 1; i <= 3; i++) {
        var tower = $("<div />").appendTo(CONTENT);
        tower.attr("class", "tower");
        tower.css("height", areaHeight - 150 + "px");
        tower.css("left", 170 + (i - 1) * 320 + "px");

        var base = $("<div />").appendTo(CONTENT);
        base.attr("class", "base");
        base.css("top", areaHeight - 100 + "px");
        base.css("left", 30 + (i - 1) * 320 + "px");

        areaSizeList[i - 1] = [300, areaHeight - 150];
        areaPositionList[i - 1] = [30 + (i - 1) * 320, 50];
    }
    for (var i = 0; i < blockCount; i++) {
        var block = $("<div />").appendTo(CONTENT);
        block.attr("class", "block block" + i);
        block.attr("id", "block" + (i + 1));
        block.css("-webkit-border-radius", (blockHeight - 5) / 2 + "px");
        block.css("width", 30 * i + 100 + "px");
        block.css("height", blockHeight + 1 + "px");
        blockSizeList[i] = [30 * i + 100, blockHeight];
    }
}

function refreshblock() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < blockList[i].length; j++) {
            block = $("#block" + blockList[i][j]);
            var top = areaHeight - 100 - blockHeight * (blockList[i].length - j);
            var left = 320 * i + 145 - 15 * blockList[i][j];
            block.css("left", left + "px");
            block.css("top", top - 1 + "px");
            blockPositionList[blockList[i][j] - 1] = [left, top];
        }
    }
}

function moveblock(blockIndex, to) {
    var isMoved = false;
    var from = 0;
    if (to == 1) {
        if (blockTower1.length == 0 || blockIndex < blockTower1[0]) {
            blockTower1.unshift(blockIndex);
            if (checknumberisinarray(blockIndex, blockTower2)) {
                from = 2;
                blockTower2.shift();
                moveCount++;
                isMoved = true;
            } else if (checknumberisinarray(blockIndex, blockTower3)) {
                from = 3;
                blockTower3.shift();
                moveCount++;
                isMoved = true;
            }
        }
    } else if (to == 2) {
        if (blockTower2.length == 0 || blockIndex < blockTower2[0]) {
            blockTower2.unshift(blockIndex);
            if (checknumberisinarray(blockIndex, blockTower1)) {
                from = 1;
                blockTower1.shift();
                moveCount++;
                isMoved = true;
            } else if (checknumberisinarray(blockIndex, blockTower3)) {
                from = 3;
                blockTower3.shift();
                moveCount++;
                isMoved = true;
            }
        }
    } else if (to == 3) {
        if (blockTower3.length == 0 || blockIndex < blockTower3[0]) {
            blockTower3.unshift(blockIndex);
            if (checknumberisinarray(blockIndex, blockTower1)) {
                from = 1;
                blockTower1.shift();
                moveCount++;
                isMoved = true;
            } else if (checknumberisinarray(blockIndex, blockTower2)) {
                from = 2;
                blockTower2.shift();
                moveCount++;
                isMoved = true;
            }
        }
    }
    refreshblock();
    draggingBlock = -1;
    if (isMoved && checkpercent() == 100) {
        Record.count(moveCount);
        Game.right();
    }
}

function isdraging(x, y) {
    for (var i = 0; i < blockCount; i++) {
        if (x > blockPositionList[i][0] && x < blockPositionList[i][0] + blockSizeList[i][0] && y > blockPositionList[i][1] && y < blockPositionList[i][1] + blockSizeList[i][1]) {
            var dragging = i + 1;
            if (blockTower1[0] == dragging || blockTower2[0] == dragging || blockTower3[0] == dragging) {
                return dragging;
            } else {
                return - 1;
            }
        }
    }
    return - 1;
}

function isdrop(x, y) {
    for (var i = 0; i < 3; i++) {
        if (x > areaPositionList[i][0] && x < areaPositionList[i][0] + areaSizeList[i][0] && y > areaPositionList[i][1] && y < areaPositionList[i][1] + areaSizeList[i][1]) {
            return i + 1;
        }
    }
    return - 1;
}

function binddragevent() {
    var drag = function drag() {
        this.dragView = CONTENT;
        this.init.apply(this, arguments);
    };
    drag.prototype = {
        constructor: drag,
        _x: 0,
        _y: 0,
        move: false,
        down: false,
        init: function() {
            this.unbinddragevent();
            this.bindEvent();
        },
        unbinddragevent: function() {
            CONTENT.off("mousedown");
            CONTENT.off("mouseup");
            CONTENT.off("mousemove");
            CONTENT.off("touchstart");
            CONTENT.off("touchend");
            CONTENT.off("touchmove");
        },
        bindEvent: function() {
            var t = this;
            if (Interface.isWeb()) {
                CONTENT.on("mousedown", this.dragView,function(e) {t.movestart(e);});
                CONTENT.on("mouseup", this.dragView,function(e) {t.moveend(e);});
                CONTENT.on("mousemove", this.dragView,function(e) {t.moving(e);});
            } else {
                var dragView = document.getElementById("content");
                dragView.addEventListener("touchstart",function(e) {t.movestart(e);});
                dragView.addEventListener("touchend",function(e) {t.moveend(e);});
                dragView.addEventListener("touchmove",function(e) {t.moving(e);});
            }
        },
        movestart: function(e) {
            e && e.preventDefault();
            if (!this.move) {
                if (Interface.isWeb()) {
                    this._x = e.clientX;
                    this._y = e.clientY;
                } else {
                    var temp = e.touches;
                    this._x = temp[0].clientX;
                    this._y = temp[0].clientY;
                }
                this._x /= SCREEN_ZOOM;
                this._y /= SCREEN_ZOOM;
                this._y -= 70;
                draggingBlock = isdraging(this._x, this._y);
                if (draggingBlock > 0) {
                    this.move = false;
                    this.down = true;
                }
            }
        },
        moveend: function(e) {
            e && e.preventDefault();
            var isDrop = isdrop(this._x, this._y);
            if (draggingBlock > 0 && isDrop) {
                this.move = false;
                this.down = false;
                var block = $("#block" + draggingBlock);
                block.css("z-index", 0);
                moveblock(draggingBlock, isDrop);
            }
        },
        moving: function(e) {
            e && e.preventDefault();
            if (this.down) {
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                    var clienty = e.clientY;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                    var clienty = temp[0].clientY;
                }
                if (clientx - this._x != 0 && clienty - this._y != 0) {
                    this.move = true;
                    this._x = clientx;
                    this._y = clienty;
                    this._x /= SCREEN_ZOOM;
                    this._y /= SCREEN_ZOOM;
                    this._y -= 70;
                    var block = $("#block" + draggingBlock);
                    block.css("z-index", 100);
                    var left = this._x - blockSizeList[draggingBlock - 1][0] / 2;
                    var top = this._y - blockSizeList[draggingBlock - 1][1] / 2;
                    block.css("left", left + "px");
                    block.css("top", top + "px");
                    blockPositionList[draggingBlock - 1] = [left, top];
                }
            }
        }
    };
    var drag = new drag();
}
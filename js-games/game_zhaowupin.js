Config.titleText = ["找物品", "", ""];
Config.contentText = ["请根据屏幕上方提示的物品和数量，在规定时间内左右拖动屏幕并通过点击找出它们。点击错误的物品会使剩余时间减少3秒。", "", ""];
Config.exerciseTime = [60, 60, 60, 60, 60]; //做题界面每级的等待时间

var ON_GET_SIZE = function(width, height) {
    $("#resultbg").css("background", "rgba(0,0,0,0.8)");
    CONTENT.css("background-image", "url()");
}

var answerNameList;
var answerTextList;
var imageList = [];
var answerRightCount;
var answerTotalCount;

var ON_START_PLAY = function(level) {
    if (level < 5) {
        answerTotalCount = level * 2 + 1;
    } else {
        answerTotalCount = 10;
    }
    answerRightCount = 0;
    imageList = [];
    answerNameList = [];
    answerTextList = [];
}

var ON_START_REMEMBER = function() {}

var loadingText = ["图片加载中...", "", ""];

var ON_START_ANSWER = function() {
    var answer1 = getrandomnumber(0, 99);
    var answer2 = getrandomnumberexcept(0, 99, [answer1]);
    var answerContent1 = ALL_IMAGE[answer1];
    answerContent1 = answerContent1.split("|");
    var answerContent2 = ALL_IMAGE[answer2];
    answerContent2 = answerContent2.split("|");

    answerNameList = [answerContent1[0], answerContent2[0]];
    for (var i = 1; i <= 5; i++) {
        answerTextList[answerTextList.length] = answerContent1[1] + i;
        answerTextList[answerTextList.length] = answerContent2[1] + i;
    }

    imageList = [];
    for (var i = 1; i <= 5; i++) {
        var name1 = ALL_IMAGE[answer1].split("|");
        name1 = name1[1];
        imageList[imageList.length] = name1 + i;
        var name2 = ALL_IMAGE[answer2].split("|");
        name2 = name2[1];
        imageList[imageList.length] = name2 + i;
    }
    while (imageList.length < 100) {
        var temp = getrandomnumberexcept(0, 99, [answer1, answer2]);
        temp = ALL_IMAGE[temp].split("|");
        temp = temp[1];
        temp += getrandomnumber(1, 5);
        if (!checknumberisinarray(temp, imageList)) {
            imageList.push(temp);
        }
    }
    imageList = sortrandom(imageList);
    TimeBar.pause();
    loadCount = 0;
    loadimage();
    TITLE_TEXT.text(loadingText[Language.areaFlag]);
}

var loadCount = 0;
function loadimage() {
    if (loadCount == imageList.length) {
        TimeBar.resume();
        showAnswerResult();
        initdragview(4, 25, imageList, true);
        return;
    }
    var imgObj = $("<img/>");
    imgObj.attr("src", "game_wupin/" + imageList[loadCount] + ".png");
    imgObj.unbind("load");
    imgObj.load(loadimage);
    loadCount++;
}

var ON_ANSWER_RIGHT = function() {
    unbinddragevent();
    TITLE_TEXT.html("");
}

var ON_ANSWER_WRONG = function() {
    unbinddragevent();
    TITLE_TEXT.html("");
}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    if (isDragLock) {
        return;
    }
    item = $(item);
    item.unbind("click");
    var img = item.attr("img");
    if (checknumberisinarray(img, answerTextList)) {
        answerRightCount++;
        var img = $("<img/>").appendTo(item);
        img.css("width", item.css("width"));
        img.css("height", item.css("height"));
        img.css("-webkit-transform", "rotate(" + (360 - item.attr("rotate")) + "deg)");
        img.attr("src", "img/right.png");
        img.attr("class", "right_mark");
        showAnswerResult();
        Record.clickright();
        if (answerRightCount == answerTotalCount) {
            $(".right_mark").hide();
            Game.right();
        }
    } else {
        Record.clickwrong();
        var img = $("<img/>").appendTo(item);
        img.attr("src", "img/wrong.png");
        img.css("width", item.css("width"));
        img.css("height", item.css("height"));
        img.css("-webkit-transform", "rotate(" + (360 - item.attr("rotate")) + "deg)");
        TimeBar.subtract(3000);
    }
}

var ON_TASK_END = function() {}

var ALL_IMAGE = ["杯子|bz", "贝壳|bk", "笔|b", "冰淇淋|bj", "菠萝|bl", "茶壶|ch", "橙子|cz", "锤子|chz", "打火机|hj", "大蒜|ds", "大象|dx", "刀|d", "灯|de", "笛子|di", "电脑|dn", "电视|dis", "熨斗|yd", "耳机|ej", "飞机|fj", "风筝|fz", "钢琴|gq", "狗|g", "古筝|gz", "柜子|gzz", "锅|gu", "海豚|ht", "海星|hx", "汉堡|hb", "蝴蝶|hd", "鸡|j", "吉他|jt", "剪刀|jd", "键盘|jp", "柿子椒|qj", "领结|lj", "录音机|lyj", "螺丝钉|lsd", "猫|m", "猫头鹰|mt", "帽子|mz", "门|mn", "猕猴桃|mht", "面包|mb", "灭火器|mh", "摩托车|mtc", "南瓜|ng", "柠檬|nm", "螃蟹|px", "盆|p", "啤酒|pj", "葡萄|pt", "汽车|qc", "钳子|qiz", "枪|q", "桥|qq", "巧克力|qkl", "茄子|qz", "蜻蜓|qt", "球|qi", "沙发|sf", "沙漏|sl", "上衣|sy", "勺子|sz", "手表|sb", "手电|sd", "手机|sj", "手套|st", "梳子|shz", "鼠标|shb", "锁|su", "坦克|tk", "土豆|td", "兔子|t", "拖把|tb", "袜子|wz", "碗|w", "望远镜|wyj", "卫生纸|wsz", "西红柿|xhs", "吸尘器|xcq", "显微镜|xwj", "相机|xj", "香蕉|xij", "鞋|x", "牙刷|ys", "眼镜|yj", "羊|y", "洋葱|yc", "椅子|yz", "鹦鹉|yw", "鹰|yy", "鱼|yu", "雨伞|yus", "玉米|ym", "郁金香|yjx", "浴缸|yg", "纸箱|zx", "指南针|znz", "子弹|zd", "自行车|zxc"];

function showAnswerResult() {
    TITLE_TEXT.html("请找出<tex class='alarm'>" + answerTotalCount + "</tex>个<tex class='alarm'>" + answerNameList[0] + "</tex>或<tex class='alarm'>" + answerNameList[1] + "</tex>，您已经找出<tex class='alarm'>" + answerRightCount + "</tex>个");
}

var dragViewWidth;
var dragViewHeight;
var itemRows;
var itemColumns;
var itemSize;

var dragLoop = 3;
var dragCount = 0;

function initdragview(rows, columns, imglist, rotate) {
    dragCount = 0;
    // rotate=false;
    dragViewWidth = CONTENT_WIDTH;
    dragViewHeight = CONTENT_HEIGHT - 20;
    itemRows = rows;
    itemColumns = columns;
    itemSize = dragViewHeight % rows == 0 ? dragViewHeight / rows: dragViewHeight / rows;
    unbinddragevent();

    var scrolldiv = $("<div />").appendTo(CONTENT);
    scrolldiv.css("position", "absolute");
    scrolldiv.css("width", columns * itemSize + "px");
    scrolldiv.css("height", dragViewHeight + "px");
    scrolldiv.css("padding-top", "15px");
    scrolldiv.attr("id", "dragView");

    var canvas = $("<canvas width=" + columns * itemSize + " height=" + dragViewHeight + " />").appendTo(scrolldiv);
    canvas.css("position", "absolute");

    var clickdiv = $("<div />").appendTo(scrolldiv);
    clickdiv.css("position", "absolute");
    clickdiv.css("width", columns * itemSize + "px");
    clickdiv.css("height", dragViewHeight + "px");

    var context = canvas[0].getContext("2d");
    var img = new Image();

    for (var i = 0; i < rows * columns; i++) {
        var left = i % columns * itemSize;
        var top = Math.floor(i / columns) * itemSize;
        img.src = "game_wupin/" + imglist[i] + ".png";
        if (rotate) {
            var rotate = getrandomnumber(0, 359);
            context.translate(left + itemSize / 2, top + itemSize / 2);
            context.rotate(rotate);
            context.drawImage(img, -itemSize / 2, -itemSize / 2, itemSize, itemSize);
            context.rotate( - rotate);
            context.translate( - left - itemSize / 2, -top - itemSize / 2);
        } else {
            context.drawImage(img, left, top, itemSize, itemSize);
        }

        var tempdiv = $("<div/>").appendTo(clickdiv);
        tempdiv.css("width", itemSize + "px");
        tempdiv.css("height", itemSize + "px");
        tempdiv.css("float", "left");
        tempdiv.attr("img", imglist[i]);
        tempdiv.click(onitemclick);
    }

    if (itemColumns * itemSize > dragViewWidth) {
        binddragevent();
    }
}

function onitemclick() {
    Game.clickitem(this);
}

function unbinddragevent() {
    $("#dragView").off("mousedown");
    $("#dragView").off("mouseup");
    $("#dragView").off("mousemove");
    $("#dragView").off("touchstart");
    $("#dragView").off("touchend");
    $("#dragView").off("touchmove");
}

function binddragevent() {
    var drag = function drag() {
        this.dragView = $("#dragView");
        this.init.apply(this, arguments);
        this.startView = null;
    };
    drag.prototype = {
        constructor: drag,
        _x: 0,
        _left: 0,
        move: false,
        down: false,

        init: function() {
            this.bindEvent();
        },

        bindEvent: function() {
            var t = this;
            if (Interface.isWeb()) {
                $("#dragView").on("mousedown", this.dragView,function(e) {;t.movestart(e);});
                $("#dragView").on("mouseup", this.dragView,function(e) {t.moveend(e);});
                $("#dragView").on("mousemove", this.dragView,function(e) {t.moving(e);});
            } else {
                var dragView = document.getElementById("dragView");
                dragView.addEventListener("touchstart",function(e) {t.movestart(e);});
                dragView.addEventListener("touchend",function(e) {t.moveend(e);});
                dragView.addEventListener("touchmove",function(e) {t.moving(e);});
            }
        },
        movestart: function(e) {
            e && e.preventDefault();
            if (!this.move) {
                this.move = false;
                this.down = true;
                if (Interface.isWeb()) {
                    this._x = e.clientX;
                    this.startView = e.target;
                } else {
                    var temp = e.touches;
                    this._x = temp[0].clientX;
                    this.startView = temp[0].target;
                }
                this._left = this.dragView.offset().left;
            }
        },
        moveend: function(e) {
            e && e.preventDefault();
            if (this.move) {
                draglock();
            }
            this.move = false;
            this.down = false;
            if (this.startView) {
                $(this.startView).click();
                this.startView = null;
            }
        },
        moving: function(e) {
            e && e.preventDefault();
            if (this.down) {
                if (dragCount != dragLoop) {
                    dragCount++;
                    return;
                } else {
                    dragCount = 0;
                }
                if (Interface.isWeb()) {
                    var clientx = e.clientX;
                } else {
                    var temp = e.touches;
                    var clientx = temp[0].clientX;
                }
                if (clientx - this._x != 0) {
                    this.move = true;
                    this.startView = null;
                }
                var offsetLeft = this._left + (clientx - this._x) / SCREEN_ZOOM;
                if (offsetLeft > itemSize * 2 / 3) {
                    offsetLeft = itemSize * 2 / 3;
                } else if (offsetLeft < dragViewWidth - itemColumns * itemSize - itemSize * 2 / 3) {
                    offsetLeft = dragViewWidth - itemColumns * itemSize - itemSize * 2 / 3;
                }
                this._x = clientx;
                this._left = offsetLeft;
                this.dragView.offset({
                    left: offsetLeft
                });
            }
        }
    };
    var drag = new drag();
}

var isDragLock = false;
var dragLockFlag = 0;
function draglock() {
    isDragLock = true;
    clearTimeout(dragLockFlag);
    dragLockFlag = setTimeout("isDragLock=false", 0);
}
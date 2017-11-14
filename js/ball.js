/*
点球游戏工具类
*/
var Ball = new Object();

Ball.ballWidth = 0;//彩球宽度
Ball.ballHeight = 0;//彩球高度
Ball.textSize = 0;//彩球数字尺寸
Ball.contentMargin = 30;//彩球生成区域内边距
Ball.ballMargin = 2;//彩球与彩球之间的最小边距
Ball.positionList = [];//本地记录的彩球位置数组
Ball.colorList = [];//本地记录的彩球颜色数组
Ball.dataList = [];//本地记录的彩球数字数组

$(document).ready(function() {
    loadCssByName("ball");
});

/*
生成彩球界面
    colorList 彩球颜色数组，格式为#000000
    dataList 彩球数字数组
*/
Ball.add = function(colorList, dataList, width, height) {
    if (colorList.length != dataList.length) {
        return;
    }
    Ball.colorList = colorList;
    Ball.dataList = dataList;
    Ball.positionList = [];

    //根据彩球数量动态调整彩球和文字大小
    Ball.ballWidth = width;
    Ball.ballHeight = height;
    var success = false;
    while (!success) {
        Ball.positionList = [];
        for (var i = 0; i < Ball.colorList.length; i++) {
            var isAdd = Ball.trytoadd();
            if (isAdd) {
                success = true;
            } else {
                success = false;
                Ball.ballWidth *= 0.95;
                Ball.ballHeight *= 0.95;
                break;
            }
        }
    }
    Ball.textSize = Ball.ballWidth / 2;

    // 绘制所有彩球
    for (var i = 0; i < Ball.positionList.length; i++) {
        var data = Ball.dataList[i];
        var ball = $("<div/>").appendTo($("#content"));
        ball.css("width", Ball.ballWidth + "px");
        ball.css("height", Ball.ballHeight + "px");
        ball.css("line-height", Ball.ballHeight + "px");
        ball.css("font-size", Ball.textSize + "px");
        ball.css("background-color", Ball.colorList[i]);
        ball.css("background-image", "radial-gradient(ellipse farthest-corner at 35% 25%, " + Ball.colorList[i] + "," + getdarkercolor(Ball.colorList[i], 3) + ")");
        ball.css("top", Ball.positionList[i][0] + "px");
        ball.css("left", Ball.positionList[i][1] + "px");
        ball.attr("id", "ball" + data);
        ball.attr("class", "ball ball" + data);
        ball.text(data);
        // if (window.location.href.indexOf("Desktop") > 0) {
            ball[0].addEventListener('mousedown', ON_ITEM_CLICK, false);
        // } else {
        //     ball[0].addEventListener('touchstart', ON_ITEM_CLICK, false);
        // }
    }
}

/*
尝试在界面中添加一个彩球
    随机生成彩球位置并检测是否与已有彩球重叠
    为简化计算，碰撞模型直接用长方形进行
    未重叠则添加成功并 return true
    尝试tryCount次全部失败则 return false
*/
Ball.trytoadd = function() {
    var tryCount = 1000;
    while (tryCount > 0) {
        var ballTop = getrandomnumber(Ball.contentMargin, CONTENT_HEIGHT - Ball.ballHeight - Ball.contentMargin);
        var ballLeft = getrandomnumber(Ball.contentMargin, CONTENT_WIDTH - Ball.ballWidth - Ball.contentMargin);
        var isChecked = true;
        for (var i = 0; i < Ball.positionList.length; i++) {
            var top = Ball.positionList[i][0];
            var left = Ball.positionList[i][1];
            if (Ball.checkoverlap(top, left, ballTop, ballLeft)) {
                isChecked = false;
                break;
            }
        }
        if (isChecked) {
            Ball.positionList[Ball.positionList.length] = [ballTop, ballLeft];
            return true;
        } else {
            tryCount--;
            continue;
        }
    }
    return false;
}

/*
检测两个彩球是否重叠（为简化计算，以长方形作判断）
*/
Ball.checkoverlap = function(top1, left1, top2, left2) {
    if (top1 - top2 >= Ball.ballHeight + Ball.ballMargin || top2 - top1 >= Ball.ballHeight + Ball.ballMargin) {
        return false;
    }
    if (left1 - left2 >= Ball.ballWidth + Ball.ballMargin || left2 - left1 >= Ball.ballWidth + Ball.ballMargin) {
        return false;
    }
    return true;
}

// Ball.onballclick = function() {
//     Game.clickitem(this);
// }
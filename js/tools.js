var COLOR_RED = "rgb(200, 60, 60)";
var COLOR_BLUE = "rgb(80, 100, 200)";
var COLOR_GREEN = "rgb(60, 180, 60)";
var COLOR_YELLOW = "rgb(220, 200, 60)";

function getdarkercolor(color, mltiple) {
    mltiple = mltiple ? mltiple : 2;
    var colorList = color.replace("rgb(", "").replace(")", "").split(", ");
    return "rgb(" + Math.round(colorList[0] / mltiple) + ", " + Math.round(colorList[1] / mltiple) + ", " + Math.round(colorList[2] / mltiple) + ")";
}

function getrandomcolor() {
    var random = Math.random();
    if (random > 0.75) {
        return COLOR_RED;
    } else if (random > 0.5) {
        return COLOR_BLUE;
    } else if (random > 0.25) {
        return COLOR_GREEN;
    } else {
        return COLOR_YELLOW;
    }
}

// 获取指定范围内的随机整数
var getrandomnumber = function(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function sortrandom(array) {
    array = array.sort(function(a, b) {
        return Math.random() > 0.5 ? -1 : 1;
    });
    return array.sort(function(a, b) {
        return Math.random() > 0.5 ? -1 : 1;
    });
}
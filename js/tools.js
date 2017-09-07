var COLOR_RED = "rgb(200, 60, 60)";
var COLOR_BLUE = "rgb(80, 100, 200)";
var COLOR_GREEN = "rgb(60, 180, 60)";
var COLOR_YELLOW = "rgb(220, 200, 60)";

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

function getcolortext(color) {
    if (color == COLOR_RED) {
        return Language.get("COLOR_RED");
    } else if (color == COLOR_BLUE) {
        return Language.get("COLOR_BLUE");
    } else if (color == COLOR_GREEN) {
        return Language.get("COLOR_GREEN");
    } else if (color == COLOR_YELLOW) {
        return Language.get("COLOR_YELLOW");
    }
}

// 获取指定范围内的随机整数
var getrandomnumber = function(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

// 获取指定范围内满足指定条件的随机整数
var getrandomnumberexcept = function(min, max, except1, except2) {
    if (typeof except1 == "number") {
        return getrandomnumberexceptfactor(min, max, except1, except2);
    } else {
        return getrandomnumberexceptarray(min, max, except1, except2);
    }
}

// 获取指定范围内不为指定数倍数的随机整数
var getrandomnumberexceptfactor = function(min, max, factor1, factor2) {
    var random = Math.floor(min + Math.random() * (max - min + 1));
    if (factor2) {
        while ((random >= factor1 && random % factor1 == 0) || (random >= factor2 && random % factor2 == 0)) {
            random = Math.floor(min + Math.random() * (max - min + 1));
        }
    } else {
        while (random >= factor1 && random % factor1 == 0) {
            random = Math.floor(min + Math.random() * (max - min + 1));
        }
    }
    return random;
}

// 获取指定范围内的随机整数，且不在指定的数组内
var getrandomnumberexceptarray = function(min, max, array1, array2) {
    var random = Math.floor(min + Math.random() * (max - min + 1));
    if (array2) {
        while (checknumberisinarray(random, array1) || checknumberisinarray(random, array2)) {
            random = Math.floor(min + Math.random() * (max - min + 1));
        }
    } else {
        while (checknumberisinarray(random, array1)) {
            random = Math.floor(min + Math.random() * (max - min + 1));
        }
    }
    return random;
}

var checknumberisinarray = function(number, array) {
    if (array == null || array.length == 0) {
        return 0;
    }
    for (var i = 1; i <= array.length; i++) {
        if (array[i - 1] == number) {
            return i;
        }
    }
    return 0;
}

function sortincrease(array) {
    return array.sort(function(a, b) {
        return a - b;
    });
}

function sortdecrease(array) {
    return array.sort(function(a, b) {
        return b - a;
    });
}

function sortrandom(array) {
    array = array.sort(function(a, b) {
        return Math.random() > 0.5 ? -1 : 1;
    });
    return array.sort(function(a, b) {
        return Math.random() > 0.5 ? -1 : 1;
    });
}

Array.prototype.has = function(obj) {
    for (var i = 1; i <= this.length; i++) {
        if (this[i - 1] == obj) {
            return i;
        }
    }
    return 0;
}

// 时间日期格式化
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
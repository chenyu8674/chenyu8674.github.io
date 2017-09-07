var Interface = new Object();

Interface.isWeb = function() {
    return typeof(Android) == "undefined";
};

Interface.isAndroid = function() {
    return typeof(Android) != "undefined";
};

Interface.run = function(func, param) {
    if (Interface.isAndroid()) {
        if (typeof(param) == "string" || typeof(param) == "number") {
            var temp = [];
            temp[0] = "" + param;
            Android.run(func, temp);
        } else {
            for (var i = 0; i < param.length; i++) {
                param[i] = "" + param[i];
            }
            Android.run(func, param);
        }
    } else {
        log("run:" + func + "(" + param + ")");
    }
};

// 介绍界面退出
Interface.quit = function() {
    Interface.run("finish", "");
    if (Config.brainMode == "hht") {
        HHT.unmark();
    }
    history.back( - 1);
};

// 游戏界面退出
Interface.finish = function() {
    ON_TASK_END();
    Record.taskend();
    Interface.quit();
};

function log(info) {
    if (Interface.isAndroid()) {
        Interface.run("log", "" + info);
    } else {
        console.log(info);
    }
}
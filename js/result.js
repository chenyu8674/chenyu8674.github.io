var Result = new Object();
Result.isShow = false;

Result.right = new Image();
Result.right.src = "img/right.png";
Result.wrong = new Image();
Result.wrong.src = "img/wrong.png";

Result.timeoutFlag = 0;
Result.showTime = 1000;

Result.showright = function() {
    Result.isShow = true;
    if (Config.hasResultInfo) {
        $("#resultimg").css("background-image", "url(img/right.png)");
        $("#resultbg").css("display", "block");
        clearTimeout(Result.timeoutFlag);
        Result.timeoutFlag = setTimeout(Result.onright, Result.showTime);
    } else {
        setTimeout(Result.onright, 0);
    }
    if (Config.brainMode == "hht") {
        HHT.mark("0");
    }
}

Result.onright = function() {
    Result.isShow = false;
    $("#resultbg").css("display", "none");
    clearTimeout(Result.timeoutFlag);
    if (Timeout.isTaskOver) {
        Info.showtimeout();
    } else {
        Game.onright();
    }
}

Result.showwrong = function() {
    Result.isShow = true;
    if (Config.hasResultInfo) {
        $("#resultimg").css("background-image", "url(img/wrong.png)");
        $("#resultbg").css("display", "block");
        clearTimeout(Result.timeoutFlag);
        Result.timeoutFlag = setTimeout(Result.onwrong, Result.showTime);
    } else {
        setTimeout(Result.onwrong, 0);
    }
    if (Config.brainMode == "hht") {
        HHT.mark("0");
    }
}

Result.onwrong = function() {
    Result.isShow = false;
    $("#resultbg").css("display", "none");
    clearTimeout(Result.timeoutFlag);
    if (Timeout.isTaskOver) {
        Info.showtimeout();
    } else {
        Game.onwrong();
    }
}
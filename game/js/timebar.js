var TimeBar = new Object();

TimeBar.timeBar = null;
TimeBar.callback = null;//到时回调
TimeBar.startTime = 0;//计时器启动时间
TimeBar.totalTime = 0;//计时器总时长
TimeBar.pauseTime = 0;//暂停总时长
TimeBar.pauseStartTime = 0;//暂停开始时间
TimeBar.animationFlag = null;

TimeBar.start = function(time, cb, show) {
    TimeBar.stop();
    if (TimeBar.timeBar == null) {
        TimeBar.timeBar = document.getElementById("timebar");
    }
    if(time < 0) {
        TimeBar.callback = null;
        $("#timebg").hide();
        return;
    }

    if (show == false) {
        $("#timebg").hide();
    } else {
        $("#timebg").show();
        TimeBar.timeBar.style.width = "1000px";
    }

    TimeBar.callback = cb;
    TimeBar.startTime = new Date().getTime();
    TimeBar.totalTime = time;
    TimeBar.pauseTime = 0;
    TimeBar.pauseStartTime = 0;
    TimeBar.run();
}

TimeBar.run = function() {
    var passedTime = new Date().getTime() - TimeBar.startTime - TimeBar.pauseTime;
    TimeBar.timeBar.style.width = 1000 - 1000 * passedTime / TimeBar.totalTime + "px";
    if (passedTime < TimeBar.totalTime) {
        TimeBar.animationFlag = requestAnimationFrame(TimeBar.run);
    } else {
        TimeBar.stop();
        setTimeout(TimeBar.callback, 0);
        TimeBar.callback = null;
    }
}

TimeBar.stop = function() {
    $("#timebg").hide();
    if (TimeBar.animationFlag != null) {
        cancelAnimationFrame(TimeBar.animationFlag);
        TimeBar.animationFlag = null;
    }
}

TimeBar.subtract = function(time) {
    TimeBar.pauseTime -= time;
}

TimeBar.pause = function() {
    TimeBar.pauseStartTime = new Date().getTime();
    if (TimeBar.animationFlag != null) {
        cancelAnimationFrame(TimeBar.animationFlag);
        TimeBar.animationFlag = null;
    }
}

TimeBar.resume = function() {
    TimeBar.pauseTime += new Date().getTime() - TimeBar.pauseStartTime;
    if (TimeBar.callback != null) {
        TimeBar.run();
    }
}
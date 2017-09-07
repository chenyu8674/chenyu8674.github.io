var Timeout = new Object();

Timeout.taskTimeFlag = 0;
Timeout.isTaskOver = false;

Timeout.startTaskTime = function() {
    if (Config.taskTime > 0) {
        clearTimeout(Timeout.taskTimeFlag);
        Timeout.taskTimeFlag = setTimeout(Timeout.runtasktime, 1000);
    }
}

Timeout.runtasktime = function() {
    clearTimeout(Timeout.taskTimeFlag);
    Timeout.isTaskOver = false;
    var passedTime = new Date().getTime() - Record.startTime - Record.pauseTime;
    if (passedTime >= Config.taskTime * 1000 && !Record.isPasue) {
        Timeout.isTaskOver = true;
    } else {
        Timeout.taskTimeFlag = setTimeout(Timeout.runtasktime, 1000);
    }
}
var Record = new Object();

Record.startTime = 0;
Record.string = "";
Record.isPasue = false;
Record.pauseStartTime = 0;//暂停开始时间
Record.pauseTime = 0;//暂停总时长

//记录中的时间点均为距训练开始时间戳的毫秒值
var RECORD_TASK_START = "TS"; //训练开始：时间字串
var RECORD_START_PLAY = "SP"; //开始一道题目：题目等级.时间点
var RECORD_START_REMEMBER = "SR"; //记忆阶段开始：时间点
var RECORD_PASS_REMEMBER = "PR"; //用户手动跳过记忆阶段：时间点
var RECORD_START_ANSWER = "SA"; //答题阶段开始：时间点
var RECORD_CLICK_RIGHT = "CR"; //用户点击了正确内容：时间点
var RECORD_CLICK_WRONG = "CW"; //用户点击了错误内容：时间点
var RECORD_ANSWER_RIGHT = "AR"; //题目回答正确：时间点
var RECORD_ANSWER_WRONG = "AW"; //题目回答错误：时间点
var RECORD_LEVEL_UP = "LU"; //难度等级上升：时间点
var RECORD_LEVEL_CONTINUE = "LC"; //难度等级不变：时间点
var RECORD_LEVEL_DOWN = "LD"; //难度等级下降：时间点
var RECORD_TASK_END = "TE"; //训练结束：时间点
var RECORD_PERCENT = "PT"; //完成度：完成度
var RECORD_COUNT = "CT"; //计数器：计数值

Record.taskstart = function() {
    Record.string = "";
    Record.pauseTime = 0;
    Record.startTime = new Date().getTime();
    Record.record(RECORD_TASK_START + Record.gettimestamp());
    Timeout.startTaskTime();
};

Record.startplay = function(lvl) {
    Record.record(RECORD_START_PLAY + lvl + "." + Record.gettimepoint());
};

Record.startremember = function() {
    Record.record(RECORD_START_REMEMBER + Record.gettimepoint());
};

Record.passremember = function() {
    Record.record(RECORD_PASS_REMEMBER + Record.gettimepoint());
};

Record.startanswer = function() {
    Record.record(RECORD_START_ANSWER + Record.gettimepoint());
};

Record.answerright = function() {
    Record.record(RECORD_ANSWER_RIGHT + Record.gettimepoint());
};

Record.answerwrong = function() {
    Record.record(RECORD_ANSWER_WRONG + Record.gettimepoint());
};

Record.clickright = function() {
    Record.record(RECORD_CLICK_RIGHT + Record.gettimepoint());
};

Record.clickwrong = function() {
    Record.record(RECORD_CLICK_WRONG + Record.gettimepoint());
};

Record.levelup = function() {
    Record.record(RECORD_LEVEL_UP + Record.gettimepoint());
};

Record.levelcontinue = function() {
    Record.record(RECORD_LEVEL_CONTINUE + Record.gettimepoint());
};

Record.leveldown = function() {
    Record.record(RECORD_LEVEL_DOWN + Record.gettimepoint());
};

Record.percent = function(percent) {
    Record.record(RECORD_PERCENT + percent);
};

Record.count = function(count) {
    Record.record(RECORD_COUNT + count);
};

Record.write = function(log) {
    Record.record(log);
};

Record.record = function(info) {
    if (Config.sendRecord) {
        Record.string += info;
    }
};

Record.pause = function() {
    Record.isPasue = true;
    Record.pauseStartTime = new Date().getTime();
};

Record.resume = function() {
    Record.isPasue = false;
    Record.pauseTime += new Date().getTime() - Record.pauseStartTime;
};

// 获取自任务开始的毫秒数
Record.gettimepoint = function() {
    return new Date().getTime() - Record.startTime - Record.pauseTime;
};

// 获取时间字串
Record.gettimestamp = function() {
    var date = new Date();
    var result = date.Format("yyyyMMddhhmmss");
    var ms = date.getMilliseconds();
    if (ms < 10) {
        ms = "00" + ms;
    } else if (ms < 100) {
        ms = "0" + ms;
    }
    return result + ms;
};

Record.taskend = function() {
    if (Config.sendRecord == 1 || (Config.sendRecord == 2 && Timeout.isTaskOver)) {
        Record.record(RECORD_TASK_END + Record.gettimepoint());
        if (Interface.isAndroid()) {
            Interface.run("record", Record.string);
        } else {
            alert(Record.string);
        }
        Record.string = "";
    }
};
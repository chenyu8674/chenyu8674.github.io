var Game = new Object();

Game.rightCount = 0;
Game.wrongCount = 0;
Game.totalCount = 0;
Game.level = 0;
Game.onExercise = false;
Game.playCount = 0;
Game.running = false;

Game.startgame = function(lvl) {
    Game.running = true;
    clearcontent();
    Game.onExercise = false;
    Game.level = lvl;
    ON_START_PLAY(lvl);
    Record.startplay(lvl);
    Game.remember();

    Game.playCount ++;
    if (Config.brainMode == "hht") {
        HHT.mark(Game.playCount);
    }
};

Game.remember = function() {
    if (Config.hasRememberView) {
        var temp1 = Config.rememberTime;
        var temp2 = Game.level - 1;
        var time = temp1[temp2] * 1000;
        TimeBar.start(time, Game.exercise);
        Button.create(Language.get("button_remember_text"), Game.clickremember);
        TITLE_TEXT.html(Config.rememberText[Language.areaFlag]);

        Record.startremember();
        ON_START_REMEMBER();
    } else {
        Game.exercise();
    }
};

Game.clickremember = function() {
    Button.hide();
    TimeBar.stop();
    TimeBar.callback();
    Record.passremember();
}

Game.exercise = function() {
    Game.onExercise = true;
    var temp1 = Config.exerciseTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.start(time, Game.wrong);

    Button.hide();
    TITLE_TEXT.html(Config.exerciseText[Language.areaFlag]);

    Record.startanswer();
    ON_START_ANSWER();
};

Game.levelup = function() {
    Game.rightCount = 0;
    Game.wrongCount = 0;
    Game.totalCount = 0;
    Game.level++;

    Info.levelup();
    Record.levelup();
    ON_LEVEL_UP();
};

Game.levelcontinue = function() {
    Game.rightCount = 0;
    Game.wrongCount = 0;
    Game.totalCount = 0;

    Info.levelcontinue();
    Record.levelcontinue();
    ON_LEVEL_CONTINUE();
};

Game.leveldown = function() {
    Game.rightCount = 0;
    Game.wrongCount = 0;
    Game.totalCount = 0;
    Game.level--;

    Info.leveldown();
    Record.leveldown();
    ON_LEVEL_DOWN();
};

Game.clickitem = function(info) {
    if (Game.onExercise) {
        ON_ITEM_CLICK(info);
    }
};

Game.right = function() {
    if (!Game.running) {
        return;
    }
    Game.running = false;
    TimeBar.stop();
    Result.showright();
    Record.answerright();
    ON_ANSWER_RIGHT();
};

Game.onright = function() {
    Game.rightCount++;
    Game.totalCount++;
    if (Game.totalCount == Config.questionNumber) {
        Game.checklevel();
    } else {
        Game.startgame(Game.level);
    }
};

Game.wrong = function() {
    if (!Game.running) {
        return;
    }
    Game.running = false;
    TimeBar.stop();
    Result.showwrong();
    Record.answerwrong();
    ON_ANSWER_WRONG();
};

Game.onwrong = function() {
    Game.wrongCount++;
    Game.totalCount++;
    if (Game.totalCount == Config.questionNumber) {
        Game.checklevel();
    } else {
        Game.startgame(Game.level);
    }
};

Game.checklevel = function() {
    var levelScore = Game.rightCount * 100 / Game.totalCount;
    if (levelScore < 50) {
        Game.leveldown();
    } else if (levelScore < 80) {
        Game.levelcontinue();
    } else {
        Game.levelup();
    }
};

Game.reset = function() {
    Game.rightCount = 0;
    Game.wrongCount = 0;
    Game.totalCount = 0;
    Game.onExercise = false;
    Game.playCount = 0;
}
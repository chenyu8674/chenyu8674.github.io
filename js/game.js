var Game = new Object();

Game.level = 0;
Game.onExercise = false;

Game.startgame = function(lvl) {
    clearcontent();
    Game.onExercise = false;
    Game.level = lvl;
    ON_START_PLAY(lvl);
    Game.exercise();
};

Game.exercise = function() {
    Game.onExercise = true;
    TITLE_TEXT.html(Config.exerciseText[0]);
    ON_START_ANSWER();
};

Game.clickitem = function(info) {
    if (Game.onExercise) {
        ON_ITEM_CLICK(info);
    }
};

Game.reset = function() {
    Game.onExercise = false;
}
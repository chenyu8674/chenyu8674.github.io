Config.titleText = ["数独", "Sudoku", ""];
Config.contentText = ["请根据已知数字进行推理，并在空格中填入数字，使每行、每列和每个小九宫格里的数字均含1~9且不重复。", "", ""];
Config.questionNumber = 1; //每级的题目数
Config.hasResultInfo = false;
Config.sendScore = false;
Config.sendRecord = 0;

document.write('<script type="text/javascript" src="js-games/soduku.js"></script>');

var currentLevel = 0;
var blockSize = 0;
var borderWidth = 1;
var groupWidth = 4;
var contentWidth = 0;
var contentHeight = 0;

var colorBg = "rgb(240,240,240)";
var colorNumber = "rgb(50,50,50)";
var colorBorder = "rgb(26,26,26)";
var colorClick = "rgb(255,199,59)";
var colorAnswer = "rgb(60,180,60)";
var colorWrong = "rgb(180,60,60)";
var colorBlank = "rgb(80,100,200)";

var numStr = "";
var numStr2 = "";
var questionList = [];
var answerList = [];
var resultList = [];
var clickedBlock = null;
var isShowinganswer = false;

var sodukuStarttime = 0;
var sodukuTimeout = -1;

var ON_GET_SIZE = function(width, height) {
    contentWidth = width;
    contentHeight = height - 30;
}

var difficultText = ["当前难度：", "Difficulty: ", ""];
var levelText=[
    ["入门", "Lv.1", ""],
    ["学徒", "Lv.2", ""],
    ["高手", "Lv.3", ""],
    ["专家", "Lv.4", ""],
    ["大师", "Lv.5", ""],
    ["宗师", "Lv.6", ""]
];

var ON_START_PLAY = function(level) {
    currentLevel = level;
    clickedBlock = null;
    isShowinganswer = false;
    CONTENT.unbind("mousedown");

    var random = getrandomnumber(0, 999);
    numStr = soduku[level-1][random * 2];
    numStr2 = soduku[level-1][random * 2 + 1];
    createarray();

    sodukuStarttime = new Date().getTime();
    sodukuTimeout = setTimeout(sodukutick, 0);
}

function createarray() {
    questionList = [];
    answerList = [];
    resultList = [];
    for (var i = 0; i < 9; i++) {
        questionList[i] = [];
        answerList[i] = [];
        for (var j = 0; j < 9; j++) {
            questionList[i].push(parseInt(numStr[i * 9 + j]));
            answerList[i].push(parseInt(numStr2[i * 9 + j]));
        }
    }
    var randomList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < 9; i++) {
        randomList = sortrandom(randomList);
    }
    questionList = createsudoku(questionList, randomList);
    answerList = createsudoku(answerList, randomList);
    // 从答案数组中将一部分数字移入题目数组以降低难度
    var blankCount = 0;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if(answerList[i][j]!=0){
                blankCount ++;
            }
        }
    }
    var controlCount = 0;
    while (controlCount < Math.round(blankCount / (1 + Game.level))) {
        var index1 = getrandomnumber(0, 8);
        var index2 = getrandomnumber(0, 8);
        if (answerList[index1][index2] != 0) {
            questionList[index1][index2] = answerList[index1][index2];
            answerList[index1][index2] = 0;
            controlCount ++;
        }
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if(questionList[i][j]!=0){
                resultList.push(questionList[i][j]);
            }
            if(answerList[i][j]!=0){
                resultList.push(answerList[i][j]);
                blankCount ++;
            }
        }
    }
}

function createsudoku(seedArray, randomList) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var number = seedArray[i][j];
            if (number > 0) {
                seedArray[i][j] = randomList[number - 1];
            }
        }
    }
    return seedArray;
}

function sodukutick() {
    var date=new Date();
    var currentTime = date.getTime()+date.getTimezoneOffset()*60*1000;
    var time = currentTime-sodukuStarttime;
    var tDate = new Date(time);
    if(time<3600*1000){
        time = tDate.Format("mm:ss.");
        var ms = tDate.getMilliseconds();
        if (ms < 10) {
            ms = "00" + ms;
        } else if (ms < 100) {
            ms = "0" + ms;
        } else {
            ms = "" + ms;
        }
        time = time + ms;
    }else{
        time = tDate.Format("hh:mm:ss");
    }
    TITLE_TEXT.text(difficultText[Language.areaFlag] + levelText[currentLevel-1][Language.areaFlag] + " [" + time + "]");
    clearTimeout(sodukuTimeout);
    sodukuTimeout = setTimeout(sodukutick, 19);
}

var ON_START_REMEMBER = function() {}

var ON_START_ANSWER = function() {
    Button.create(Language.get("button_submit_text"), submitanswer);
    Keyboard.create(1, onkeyboardclick, false, false);

    $("#timebg").css("visibility", "hidden");
    blockSize = Math.floor(contentHeight / 9) - borderWidth * 2;
    
    var blockView = $("<div/>").appendTo(CONTENT);
    blockView.css("width", contentHeight + blockSize - 1 + "px");
    blockView.css("height", contentHeight + blockSize - 1 + "px");
    blockView.css("margin-top", "10px");
    blockView.css("margin-left", (contentWidth - contentHeight) * 0.4 + "px");

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var block = $("<div/>").appendTo(blockView);
            block.css("width", blockSize + "px");
            block.css("height", blockSize + "px");
            block.css("background", colorBg);
            block.css("border", borderWidth + "px solid " + colorBorder);
            if (i % 3 == 0) {
                block.css("border-top", groupWidth + "px solid " + colorBorder);
            }
            if (i == 8) {
                block.css("border-bottom", groupWidth + "px solid " + colorBorder);
            }
            if (j % 3 == 0) {
                block.css("border-left", groupWidth + "px solid " + colorBorder);
            }
            if (j == 8) {
                block.css("border-right", groupWidth + "px solid " + colorBorder);
            }
            block.css("line-height", blockSize + "px");
            block.css("text-align", "center");
            block.css("font-size", blockSize * 0.7 + "px");
            block.css("font-weight", "900");
            block.css("float", "left");
            block.css("overflow", "hidden");
            block.attr("class", "block");
            block.attr("id", "block" + i + j);
            var number = questionList[i][j];
            if (number != 0) {
                block.css("color", colorNumber);
                block.text(number);
                block.addClass("number");
            } else {
                block.css("color", colorBlank);
                block.addClass("blank");
            }
            block.mousedown(onblockclick);
        }
    }
}

function onblockclick() {
    if (isShowinganswer) {
        doaftershowanswer();
    } else {
        Game.clickitem(this);
    }
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    if (item.hasClass("number")) {
        return;
    }
    if (clickedBlock != null) {
        clickedBlock.css("background", colorBg);
        if (item.attr("id") == clickedBlock.attr("id")) {
            clickedBlock = null;
            Keyboard.hide();
            return;
        }
    }
    clickedBlock = item;
    clickedBlock.css("background", colorClick);
    Keyboard.show();
}

var ON_TASK_END = function() {
    var percent = checkpercent();
    Record.percent(percent);
    if (percent < 20) {

    } else if (percent < 50) {
        Record.leveldown();
    } else {
        Record.levelcontinue();
    }
}

function onkeyboardclick() {
    var button = $(this);
    var textInput = button.text();
    var textBlock = clickedBlock.text();
    if (parseInt(textInput)) {
        if (textBlock == "" || textBlock.indexOf(textInput) >= 0) {
            toNormalStyle(clickedBlock)
            clickedBlock.text(textInput);
            checkright();
        } else if (textBlock.indexOf(textInput) < 0) {
            var result = textBlock + textInput;
            if (result.length > 4) {
                result = result.substr(1, 4);
            }
            clickedBlock.text(result);
            toMarkStyle(clickedBlock);
        }
    } else {
        clickedBlock.text("");
        clickedBlock.css("background", colorBg);
        clickedBlock = null;
        Keyboard.hide();
    }
}

function checkpercent() {
    var blockList = $(".block");
    var totalCount = 0;
    var rightCount = 0;
    var wrongCount = 0;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var number = answerList[i][j];
            var item = $(blockList[i * 9 + j]);
            if (number != 0) {
                totalCount ++;
                if (item.text() == number) {
                    rightCount ++;
                } else {
                    wrongCount ++;
                }
            }
        }
    }
    var percent = Math.round(rightCount / totalCount * 100);
    return percent;
}

function checkright() {
    var blockList = $(".block");
    for(var i=0;i<resultList.length;i++){
        if($(blockList[i]).text()==resultList[i]){
            continue;
        }else{
            return;
        }
    }
    if (clickedBlock != null) {
        clickedBlock.css("background", colorBg);
        clickedBlock = null;
    }
    Keyboard.hide();
    clearTimeout(sodukuTimeout);
    Game.right();
}

function submitanswer() {
    if (isShowinganswer) {
        return;
    }
    if (clickedBlock != null) {
        clickedBlock.css("background", colorBg);
        clickedBlock = null;
    }
    Keyboard.hide();
    clearTimeout(sodukuTimeout);
    var blockList = $(".block");
    for(var i=0;i<resultList.length;i++){
        if($(blockList[i]).text()==resultList[i]){
            continue;
        }else{
            showanswer();
            isShowinganswer = true;
            setTimeout(function(){CONTENT.mousedown(doaftershowanswer);}, 0);
            return;
        }
    }
    Game.right();
    return;
}

function doaftershowanswer() {
    Game.wrong();
}

function showanswer() {
    var blockList = $(".block");
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            var number = answerList[i][j];
            var item = $(blockList[i * 9 + j]);
            if (number != 0) {
                if (item.text() == "") {
                    item.css("color", colorAnswer);
                } else if (item.text() != number) {
                    item.css("color", colorWrong);
                }
                toNormalStyle(item);
                item.text(number);
            }
        }
    }
}

function toNormalStyle(item) {
    item.css("text-align", "center");
    item.css("font-size", blockSize * 0.7 + "px");
    item.css("line-height", blockSize + "px");
}

function toMarkStyle(item) {
    var size = blockSize / item.text().length * 1.1 + 5;
    clickedBlock.css("text-align", "left");
    clickedBlock.css("font-size", size + "px");
    clickedBlock.css("line-height", size + "px");
}
Config.titleText = ["逆序数字广度记忆", "", ""];
Config.contentText = ["屏幕中将会连续出现数字，请连续记住这些数字，并按从后到前的顺序输入它们。", "", ""];
Config.rememberText = ["请记住以下数字", "", ""]; //记忆说明
Config.exerciseText = ["请<tex class='alarm'>逆序</tex>输入刚刚出现的数字", "", ""]; //做题说明
Config.hasRememberView = true;
Config.rememberTime = [-1, -1, -1, -1, -1]; //观察记忆界面每级的等待时间
Config.exerciseTime = [5, 20, 20, 25, 30]; //做题界面每级的等待时间

var currentNumber = 0;
var numberCount = 0;
var numberRange = [];
var numberList = [];
var textInput;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    currentNumber = 0;
    numberList = [];
    numberCount = Math.floor(2.6 + level * 1.3);
}

var ON_START_REMEMBER = function() {
    Button.hide();
    startFlag = true;
    shownumber();
}

var ON_START_ANSWER = function() {
    clearcontent();
    var height = CONTENT_HEIGHT * 0.3;
    var width = CONTENT_WIDTH * 0.6;
    textInput = $("<div/>").appendTo(CONTENT);
    textInput.css("width", width + "px");
    textInput.css("height", height + "px");
    textInput.css("margin-top", (CONTENT_HEIGHT - height) *0.24 + "px");
    textInput.css("margin-left", (CONTENT_WIDTH - width) * 0.5 + "px");
    textInput.css("line-height", height + "px");
    textInput.css("text-align", "center");
    textInput.css("font-size", height + "px");
    textInput.css("border", "2px solid #bbb");
    textInput.css("background", "rgba(255, 255, 255, 0.35)");
    textInput.css("color", "#000");
    textInput.css("font-weight", "900");

    Keyboard.create(2, onkeyboardclick, true, true);
    Keyboard.setClearText(Language.get("keyboard_backspace_text"));
    // Keyboard.setMoveable(false);
    Keyboard.show();
}

function onkeyboardclick() {
    var button = $(this);
    var text = button.text();
    var textSize = CONTENT_HEIGHT * 0.3;
    if (parseInt(text) >= 0) {
        textInput.text(textInput.text() + text);
        if (textInput.text().length >= 5) {
            textInput.css("font-size", textSize * 5 / textInput.text().length + "px");
        } else {
            textInput.css("font-size", textSize + "px");
        }
    } else if (button.attr("id") == "keyboard_button_clear") {
        var text = textInput.text();
        if (text.length > 0) {
            text = text.substr(0, text.length - 1);
        }
        textInput.text(text);
    } else if (button.attr("id") == "keyboard_button_submit") {
        checkanswer();
    }
}

function checkanswer() {
    Keyboard.hide();
    if (textInput.text() == numberList) {
        Game.right();
    } else {
        Game.wrong();
    }
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}

var rememberText = ["请连续记住下列数字", "", ""];

var startFlag = true;
function shownumber() {
    if (startFlag) {
        startFlag = false;
        TITLE_TEXT.text(rememberText[Language.areaFlag] + " (0/" + numberCount + ")");
        setTimeout(shownumber, 200);
        return;
    }
    if (numberList.length >= numberCount) {
        var temp = "";
        for (var i = numberList.length - 1; i >= 0; i--) {
            temp += numberList[i];
        }
        numberList = temp;
        Game.exercise();
        return;
    }
    clearcontent();
    var randomNumber = getrandomnumber(0, 9);
    if (numberList.length == numberCount - 1) {
        while (randomNumber == numberList[0]) {
            randomNumber = getrandomnumber(0, 9);
        }
    }
    numberList.push(randomNumber);
    TITLE_TEXT.text(rememberText[Language.areaFlag] + " (" + numberList.length + "/" + numberCount + ")");

    var width = $("#content").width();
    var height = $("#content").height() * 0.8;
    var numberView = $("<div/>").appendTo($("#content"));
    numberView.css("position", "absolute");
    numberView.css("width", width + "px");
    numberView.css("height", height + "px");
    numberView.css("line-height", height + "px");
    numberView.css("text-align", "center");
    numberView.css("font-size", height + "px");
    numberView.css("font-weight", "900");
    numberView.text(randomNumber);

    var fromTop = - height + "px";
    var toTop = height / 10 + "px";
    numberView.css("top", toTop);
    numberView.hide();
    numberView.fadeIn(300);

    TimeBar.start(1000, shownumber, false);
}
Config.titleText = ["找零钱", "", ""];
Config.contentText = ["请计算并记住卖出商品的总价和付款钞票的总金额，并选出应找零的最少的钞票张数。", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 10, 10, 10, 15]; //观察记忆界面每级的等待时间
Config.exerciseTime = [10, 10, 10, 10, 10]; //做题界面每级的等待时间

var moneyView = null;
var moneyWidth = 528;
var moneyHeight = 258;

var showZoom = 1.3;
var money2Width = 126 * showZoom;
var money2Height = 255 * showZoom;
var money2Margin = 10 * showZoom;
var money2MarginTop = 20 * showZoom;
var countMargin = 3 * showZoom;
var countButtonSize = 40 * showZoom;
var countNumberSize = 40 * showZoom;

var price = 0;
var price1 = 0;
var price2 = 0;
var price3 = 0;
var pay = 0;
var payList = null;
var chargeCount = 0;

var moneyList = [5, 10, 20, 50, 100];
var money2List = [1, 5, 10, 20, 50];

var ON_GET_SIZE = function(width, height) {}

function getprice(level) {
    price = 0;
    price1 = 0;
    price2 = 0;
    price3 = 0;
    pay = 0;
    if (level == 1) {
        price1 = 10 * getrandomnumber(1, 9);
    } else if (level == 2) {
        price1 = getrandomnumberexcept(1, 99, 5);
    } else if (level == 3) {
        price1 = getrandomnumberexcept(1, 99, 5);
        price2 = getrandomnumberexcept(1, 99, 5);
        if (price1 % 10 + price2 % 10 < 10) {
            getprice(level);
        }
    } else if (level == 4) {
        price1 = getrandomnumber(101, 199);
        price2 = getrandomnumber(101, 199);
        if (price1 % 10 + price2 % 10 < 10) {
            getprice(level);
        }
    } else if (level == 5) {
        price1 = getrandomnumber(101, 299);
        price2 = getrandomnumber(101, 299);
        price3 = getrandomnumber(101, 299);
        if (price1 % 10 + price2 % 10 + price3 % 10 < 10) {
            getprice(level);
        }
    }
    price = price1 + price2 + price3;
    if (price % 100 == 0 || price >= 500) {
        getprice(level);
    }
}

function getpay() {
    pay = 0;
    payList = [];
    while (pay <= price || payList.length > 5) {
        pay = 0;
        payList = [];
        while (pay <= price) {
            var temp = getrandomnumber(0, moneyList.length - 1);
            payList.push(moneyList[temp]);
            pay += moneyList[temp];
        }
    }
    payList = sortdecrease(payList);
    pay = 0;
    var total = 0;
    for (var i = 0; i < payList.length; i++) {
        total += payList[i];
    }
    for (var i = payList.length - 1; i > 0; i--) {
        if (total - payList[i - 1] >= price) {
            total -= payList[i - 1];
            payList.splice(i - 1, 1);
        }
    }
    if (total - payList[payList.length - 1] >= price) {
        payList.splice(payList.length - 1, 1);
    }
    for (var i = 0; i < payList.length; i++) {
        pay += payList[i];
    }
    if(pay == price) {
        getpay();
    }
}

var ON_START_PLAY = function(level) {
    getprice(level);
    getpay();

    chargeCount = 0;
    var charge = pay - price;
    var charged = 0;
    var chargeFlag = money2List.length - 1;
    while (charged != charge) {
        if (charged + money2List[chargeFlag] <= charge) {
            charged += money2List[chargeFlag];
            chargeCount ++;
        } else {
            chargeFlag --;
        }
    }
}

var yuanText = ["元", "Yuan", ""];
var remember1Text = ["请计算并记住以下商品的<tex class='alarm'>总价格</tex>", "", ""];
var remember2Text = ["请计算并记住付款钞票的<tex class='alarm'>总金额</tex>", "", ""];
var answerText = ["请点击按钮或纸币上下部分，选出找零钞票的<tex class='alarm'>最少张数</tex>", "", ""];

var ON_START_REMEMBER = function() {
    TITLE_TEXT.html(remember1Text[Language.areaFlag]);
    Button.refresh(Language.get("button_next_text"), ON_START_REMEMBER2);
    var temp1 = Config.rememberTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.stop();
    TimeBar.start(time, ON_START_REMEMBER2);

    var itemCount = 0;
    if (price3 > 0) {
        itemCount = 3;
    } else if (price2 > 0) {
        itemCount = 2;
    } else {
        itemCount = 1;
    }
    var contentMargin = 30;
    if ((CONTENT_WIDTH - contentMargin * 2) / (CONTENT_HEIGHT - contentMargin * 2) > itemCount) {
        var itemSize = CONTENT_HEIGHT - contentMargin * 2;
    } else {
        var itemSize = (CONTENT_WIDTH - contentMargin * 2) / itemCount;
    }

    var goodContent = $("<div/>").appendTo(CONTENT);
    var contentWidth = itemSize * itemCount;
    var contentHeight = itemSize;
    goodContent.attr("id", "goodContent");
    goodContent.css("width", contentWidth + "px");
    goodContent.css("height", contentHeight + "px");
    goodContent.css("margin-top", (CONTENT_HEIGHT - contentHeight) / 2 + "px");
    goodContent.css("margin-left", (CONTENT_WIDTH - contentWidth) / 2 + "px");

    for (var i = 0; i < itemCount; i++) {
        var itemView = $("<div/>").appendTo(goodContent);
        itemView.css("width", itemSize + "px");
        itemView.css("height", itemSize + "px");
        itemView.css("float", "left");
        itemView.css("background-image", "url(game_zhaolingqian/good.png)");
        itemView.css("background-size", itemSize + "px " + itemSize + "px");
        itemView.css("background-repeat", "no-repeat");
        itemView.css("text-align", "center");
        itemView.css("line-height", itemSize+ "px");
        itemView.css("font-weight", "900");
        itemView.css("font-size", itemSize * 0.25 + "px");
        itemView.text(eval("price" + (i + 1)) + yuanText[Language.areaFlag]);
    }
}

function ON_START_REMEMBER2() {
    Record.passremember();
    Record.startremember();
    TITLE_TEXT.html(remember2Text[Language.areaFlag]);
    Button.refresh(Language.get("button_next_text"), Game.clickremember);
    var temp1 = Config.rememberTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.start(time, Game.exercise);

    var marginTop = (CONTENT_HEIGHT - moneyHeight) / 2;
    var marginLeft = (CONTENT_WIDTH - moneyWidth) / 2;
    var moneyMargin = 35 * showZoom;

    $("#goodContent").remove();
    for (var i = 0; i < payList.length; i++) {
        moneyView = $("<div/>").appendTo(CONTENT);
        moneyView.attr("class", "moneyView");
        moneyView.css("position", "absolute");
        moneyView.css("width", moneyWidth + "px");
        moneyView.css("height", moneyHeight + "px");
        var deviation = moneyMargin * (i - (payList.length - 1) / 2);
        moneyView.css("top", marginTop + deviation + "px");
        moneyView.css("left", marginLeft + 2 * deviation + "px");
        moneyView.css("background-image", "url(game_zhaolingqian/money_" + payList[i] + ".png)");
        moneyView.css("background-size", moneyWidth + "px " + moneyHeight + "px");
    }
}

var ON_START_ANSWER = function() {
    TITLE_TEXT.html(answerText[Language.areaFlag]);
    $(".moneyView").remove();
    Button.show();
    Button.refresh(Language.get("ok"), checkAnswer);

    var money2Content = $("<div/>").appendTo(CONTENT);
    var contentWidth = money2Width * money2List.length + money2Margin * (money2List.length - 1);
    var contentHeight = money2Height + money2MarginTop + countButtonSize;
    money2Content.css("width", contentWidth + "px");
    money2Content.css("height", contentHeight + "px");
    money2Content.css("margin-top", (CONTENT_HEIGHT - contentHeight) / 2 + "px");
    money2Content.css("margin-left", (CONTENT_WIDTH - contentWidth) / 2 + "px");

    for (var i = 0; i < money2List.length; i++) {
        var money2View = $("<div/>").appendTo(money2Content);
        money2View.css("width", money2Width + "px");
        money2View.css("height", money2Height + "px");
        if (i != 0) {
            money2View.css("margin-left", money2Margin + "px");
        }
        money2View.css("margin-bottom", money2MarginTop + "px");
        money2View.css("float", "left");
        money2View.css("background-image", "url(game_zhaolingqian/money2_" + money2List[i] + ".png)");
        money2View.css("background-size", money2Width + "px " + money2Height + "px");

        var increaseButton = $("<div/>").appendTo(money2View);
        increaseButton.attr("money", money2List[i]);
        increaseButton.css("width", money2Width + "px");
        increaseButton.css("height", money2Height / 2 + "px");
        increaseButton.attr("class", "moneyview");
        increaseButton.mousedown(increaseCount);

        var decreaseButton = $("<div/>").appendTo(money2View);
        decreaseButton.attr("money", money2List[i]);
        decreaseButton.css("width", money2Width + "px");
        decreaseButton.css("height", money2Height / 2 + "px");
        decreaseButton.attr("class", "moneyview");
        decreaseButton.mousedown(decreaseCount);
    }

    for (var i = 0; i < money2List.length; i++) {
        var decreaseButton = $("<div/>").appendTo(money2Content);
        decreaseButton.attr("money", money2List[i]);
        decreaseButton.css("width", countButtonSize + "px");
        decreaseButton.css("height", countButtonSize + "px");
        if (i != 0) {
            decreaseButton.css("margin-left", countMargin + money2Margin + "px");
        } else {
            decreaseButton.css("margin-left", countMargin + "px");
        }
        decreaseButton.css("float", "left");
        decreaseButton.css("line-height", countButtonSize + "px");
        decreaseButton.css("font-size", countButtonSize + "px");
        decreaseButton.css("background-image", "url(game_zhaolingqian/decrease.png)");
        decreaseButton.css("background-size", countButtonSize + "px " + countButtonSize + "px");
        decreaseButton.attr("class", "buttonview");
        decreaseButton.mousedown(decreaseCount);

        var countView = $("<div/>").appendTo(money2Content);
        countView.attr("class", "countView");
        countView.attr("id", "countView_" + money2List[i]);
        countView.css("width", countNumberSize + "px");
        countView.css("height", countButtonSize + "px");
        countView.css("background", "#fff");
        countView.css("text-align", "center");
        countView.css("line-height", countButtonSize + "px");
        countView.css("font-size", countButtonSize * 0.8 + "px");
        countView.css("float", "left");
        countView.text(0 + "");

        var increaseButton = $("<div/>").appendTo(money2Content);
        increaseButton.attr("money", money2List[i]);
        increaseButton.css("width", countButtonSize + "px");
        increaseButton.css("height", countButtonSize + "px");
        increaseButton.css("margin-right", countMargin + "px");
        increaseButton.css("float", "left");
        increaseButton.css("line-height", countButtonSize + "px");
        increaseButton.css("font-size", countButtonSize + "px");
        increaseButton.css("background-image", "url(game_zhaolingqian/increase.png)");
        increaseButton.css("background-size", countButtonSize + "px " + countButtonSize + "px");
        increaseButton.attr("class", "buttonview");
        increaseButton.mousedown(increaseCount);
    }
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {}

var ON_TASK_END = function() {}

var changeFlag = -1;
function decreaseCount() {
    var item = $(this);
    var money = item.attr("money");
    var numberView = $("#countView_" + money);
    var count = parseInt(numberView.text());
    if (count > 0) {
        count --;
    }
    numberView.text(count + "");

    if (item.hasClass("moneyview")) {
        clearTimeout(changeFlag);
        item.css("background", "rgba(200, 60, 60, 0.3)");
        changeFlag = setTimeout(function(){
            item.css("background", "");
        }, 200);
    }
}

function increaseCount() {
    var item = $(this);
    var money = item.attr("money");
    var numberView = $("#countView_" + money);
    var count = parseInt(numberView.text());
    if (count < 10) {
        count ++;
    }
    numberView.text(count + "");

    if (item.hasClass("moneyview")) {
        clearTimeout(changeFlag);
        item.css("background", "rgba(60, 180, 60, 0.3)");
        changeFlag = setTimeout(function(){
            item.css("background", "");
        }, 200);
    }
}

function checkAnswer() {
    var total = 0;
    var countList = $(".countView");
    var totalCount = 0;
    for (var i = 0; i < countList.length; i++) {
        var count = parseInt($(countList[i]).text());
        if (count != 0) {
            total += count * money2List[i];
            totalCount += count;
        }
    }
    if (total == pay - price && totalCount == chargeCount) {
        Game.right();
    } else {
        Game.wrong();
    }
}

$(document).ready(function() {
    var image = new Image();
    image.src = "game_zhaolingqian/good.png";
    image = new Image();
    image.src = "game_zhaolingqian/money_5.png";
    image = new Image();
    image.src = "game_zhaolingqian/money_10.png";
    image = new Image();
    image.src = "game_zhaolingqian/money_20.png";
    image = new Image();
    image.src = "game_zhaolingqian/money_50.png";
    image = new Image();
    image.src = "game_zhaolingqian/money2_1.png";
    image = new Image();
    image.src = "game_zhaolingqian/money2_5.png";
    image = new Image();
    image.src = "game_zhaolingqian/money2_10.png";
    image = new Image();
    image.src = "game_zhaolingqian/money2_20.png";
    image = new Image();
    image.src = "game_zhaolingqian/money2_50.png";
});
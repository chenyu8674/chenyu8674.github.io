Config.titleText = ["物品重叠记忆", "", ""];
Config.contentText = ["屏幕将依次出现两组物品，请记住哪些物品在这两组中都出现过，并在之后选出它们。", "", ""];
Config.exerciseText = ["请选出<tex class='alarm'>在两组中都出现过</tex>的物品", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 10, 15, 15, 20]; //观察记忆界面每级的等待时间
Config.exerciseTime = [20, 20, 25, 30, 30]; //做题界面每级的等待时间

var ON_GET_SIZE = function(width, height) {}

var colorList;
var randomIndex;
var numberList1;
var numberList2;
var numberList3;
var numberCount; //展现数字数量
var answerCount; //正确答案数量
var clickCount;

var ON_START_PLAY = function(level) {
    numberList1 = [];
    numberList2 = [];
    numberList3 = [];
    clickCount = 0;

    numberCount = Math.floor(level * 1.4 + 1);
    answerCount = level;

    var numberRange = [0, ALL_IMAGE.length - 1];
    for (var i = 0; i < numberCount; i++) {
        var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], numberList1);
        numberList1.push(ranNumber);
        numberList3.push(ranNumber);
    }
    for (var i = 0; i < numberCount; i++) {
        if (i < answerCount) {
            numberList2[i] = numberList1[i];
        } else {
            var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], numberList1, numberList2);
            numberList2.push(ranNumber);
            numberList3.push(ranNumber);
        }
    }
    while (numberList3.length < numberCount * 2) {
        var ranNumber = getrandomnumberexcept(numberRange[0], numberRange[1], numberList3);
        numberList3.push(ranNumber);
    }
    randomIndex = getrandomnumber(1, 5);
}

var remember1Text = ["请观察<tex class='alarm'>第一组</tex>物品", "", ""];
var remember2Text = ["请观察<tex class='alarm'>第二组</tex>物品", "", ""];

var ON_START_REMEMBER = function() {
    TITLE_TEXT.html(remember1Text[Language.areaFlag]);
    var blockList = [];
    for (var i = numberList1.length - 1; i >= 0; i--) {
        var imgName = ALL_IMAGE[numberList1[i]];
        imgName = imgName.split("|");
        blockList.push("game_wupin/" + imgName[1] + randomIndex + ".png");
    }
    Ball.add(blockList, blockList);

    Button.refresh(Language.get("button_next_text"), ON_START_REMEMBER2);
    var temp1 = Config.rememberTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.start(time, ON_START_REMEMBER2);
}

function ON_START_REMEMBER2() {
    Record.passremember();
    Record.startremember();
    TITLE_TEXT.html(remember2Text[Language.areaFlag]);
    $(".ball").remove();
    var blockList = [];
    for (var i = numberList2.length - 1; i >= 0; i--) {
        var imgName = ALL_IMAGE[numberList2[i]];
        imgName = imgName.split("|");
        blockList.push("game_wupin/" + imgName[1] + randomIndex + ".png");
    }
    Ball.add(blockList, blockList);
    Button.refresh(Language.get("button_next_text"), Game.clickremember);
    var temp1 = Config.rememberTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.start(time, Game.exercise);
}

var ON_START_ANSWER = function() {
    $(".ball").remove();
    var blockList = [];
    for (var i = numberList3.length - 1; i >= 0; i--) {
        var imgName = ALL_IMAGE[numberList3[i]];
        imgName = imgName.split("|");
        blockList.push("game_wupin/" + imgName[1] + randomIndex + ".png");
    }
    Ball.add(blockList, blockList);
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var id = item.attr("id");
    for (var i = 0; i < ALL_IMAGE.length; i++) {
        var name = ALL_IMAGE[i];
        name = name.split("|");
        name = name[1];
        if (id == "game_wupin/" + name + randomIndex + ".png") {
            id = i;
            break;
        }
    }
    clickCount++;
    if (checknumberisinarray(id, numberList1) && checknumberisinarray(id, numberList2)) {
        var img = $("<img/>").appendTo(item);
        img.css("width", item.css("width"));
        img.css("height", item.css("height"));
        img.attr("src", "img/right.png");
        img.attr("class", "right_mark");
        item.unbind("mousedown");
        Record.clickright();
        if (clickCount == answerCount) {
            $(".right_mark").hide();
            Game.right();
        }
    } else {
        Record.clickwrong();
        Game.wrong();
    }
}

var ON_TASK_END = function() {}

var ALL_IMAGE = ["杯子|bz", "贝壳|bk", "笔|b", "冰淇淋|bj", "菠萝|bl", "茶壶|ch", "橙子|cz", "锤子|chz", "打火机|hj", "大蒜|ds", "大象|dx", "刀|d", "灯|de", "笛子|di", "电脑|dn", "电视|dis", "熨斗|yd", "耳机|ej", "飞机|fj", "风筝|fz", "钢琴|gq", "狗|g", "古筝|gz", "柜子|gzz", "锅|gu", "海豚|ht", "海星|hx", "汉堡|hb", "蝴蝶|hd", "鸡|j", "吉他|jt", "剪刀|jd", "键盘|jp", "柿子椒|qj", "领结|lj", "录音机|lyj", "螺丝钉|lsd", "猫|m", "猫头鹰|mt", "帽子|mz", "门|mn", "猕猴桃|mht", "面包|mb", "灭火器|mh", "摩托车|mtc", "南瓜|ng", "柠檬|nm", "螃蟹|px", "盆|p", "啤酒|pj", "葡萄|pt", "汽车|qc", "钳子|qiz", "枪|q", "桥|qq", "巧克力|qkl", "茄子|qz", "蜻蜓|qt", "球|qi", "沙发|sf", "沙漏|sl", "上衣|sy", "勺子|sz", "手表|sb", "手电|sd", "手机|sj", "手套|st", "梳子|shz", "鼠标|shb", "锁|su", "坦克|tk", "土豆|td", "兔子|t", "拖把|tb", "袜子|wz", "碗|w", "望远镜|wyj", "卫生纸|wsz", "西红柿|xhs", "吸尘器|xcq", "显微镜|xwj", "相机|xj", "香蕉|xij", "鞋|x", "牙刷|ys", "眼镜|yj", "羊|y", "洋葱|yc", "椅子|yz", "鹦鹉|yw", "鹰|yy", "鱼|yu", "雨伞|yus", "玉米|ym", "郁金香|yjx", "浴缸|yg", "纸箱|zx", "指南针|znz", "子弹|zd", "自行车|zxc"];

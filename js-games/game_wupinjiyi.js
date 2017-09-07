Config.titleText = ["物品记忆", "", ""];
Config.contentText = ["屏幕中将依次出现两组物品，请记住第一组中出现的所有物品，并在第二组中选出它们。", "", ""];
Config.hasRememberView = true; //是否有观察记忆界面
Config.rememberTime = [10, 12, 14, 16, 18]; //观察记忆界面每级的等待时间
Config.exerciseTime = [10, 12, 14, 16, 18]; //做题界面每级的等待时间

var answerCount = 0;
var totalCount = 0;
var randomIndex;
var clickCount;
var answerList = [];
var totalList = [];
var colorList;

var ON_GET_SIZE = function(width, height) {}

var ON_START_PLAY = function(level) {
    answerCount = level + 1;
    totalCount = level * 2 + 2;
    Config.rememberText = ["请记住以下<tex class='alarm'>" + answerCount + "个</tex>物品", "", ""];
    Config.exerciseText = ["请点击选出之前出现的<tex class='alarm'>" + answerCount + "个</tex>物品", "", ""];

    clickCount = 0;
    answerList = [];
    totalList = [];

    var numberRange = [0, ALL_IMAGE.length - 1];
    while (answerList.length < answerCount) {
        var ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        while (checknumberisinarray(ranNumber, answerList)) {
            ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        }
        answerList.push(ranNumber);
        totalList.push(ranNumber);
    }
    while (totalList.length < totalCount) {
        var ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        while (checknumberisinarray(ranNumber, totalList)) {
            ranNumber = getrandomnumber(numberRange[0], numberRange[1]);
        }
        totalList.push(ranNumber);
    }
    randomIndex = getrandomnumber(1, 5);
}

var ON_START_REMEMBER = function() {
    var blockList = [];
    for (var i = answerList.length - 1; i >= 0; i--) {
        var imgName = ALL_IMAGE[answerList[i]];
        imgName = imgName.split("|");
        blockList.push("game_wupin/" + imgName[1] + randomIndex + ".png");
    }
    Ball.add(blockList, blockList);
}

var ON_START_ANSWER = function() {
    clearcontent();
    var blockList = [];
    for (var i = totalList.length - 1; i >= 0; i--) {
        var imgName = ALL_IMAGE[totalList[i]];
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
    var img = $("<img/>").appendTo(item);
    img.css("width", item.css("width"));
    img.css("height", item.css("height"));
    img.attr("src", "img/right.png");
    img.attr("class", "right_mark");
    item.unbind("mousedown");
    if (checknumberisinarray(id, answerList)) {
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

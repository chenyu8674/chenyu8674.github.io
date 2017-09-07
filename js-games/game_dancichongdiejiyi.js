Config.titleText = ["单词重叠记忆", "", ""];
Config.contentText = ["屏幕将依次出现两组单词，请记住哪些单词在这两组中都出现过，并在之后选出它们。", "", ""];
Config.exerciseText = ["请选出<tex class='alarm'>在两组中都出现过</tex>的单词", "", ""];
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

    numberCount = Math.floor(level * 1.2 + 1);
    answerCount = level;

    var numberRange = [0, ALL_WORD.length - 1];
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

var remember1Text = ["请观察<tex class='alarm'>第一组</tex>单词", "", ""];
var remember2Text = ["请观察<tex class='alarm'>第二组</tex>单词", "", ""];

var ON_START_REMEMBER = function() {
    TITLE_TEXT.html(remember1Text[Language.areaFlag]);
    creatcolorlist(Game.level, numberList1.length);
    var width = 260 - numberList1.length * 5;
    var height = width / 2;
    Ball.add(colorList, numberList1, width, height);
    doball();
    for (var i = 0; i < numberList1.length; i++) {
        numberList1[i] = ALL_WORD[numberList1[i]];
    }
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
    creatcolorlist(Game.level, numberList2.length);
    var width = 260 - numberList2.length * 5;
    var height = width / 2;
    Ball.add(colorList, numberList2, width, height);
    doball();
    for (var i = 0; i < numberList2.length; i++) {
        numberList2[i] = ALL_WORD[numberList2[i]];
    }
    Button.refresh(Language.get("button_next_text"), Game.clickremember);
    var temp1 = Config.rememberTime;
    var temp2 = Game.level - 1;
    var time = temp1[temp2] * 1000;
    TimeBar.start(time, Game.exercise);
}

var ON_START_ANSWER = function() {
    $(".ball").remove();
    creatcolorlist(Game.level, numberList3.length);
    var width = 260 - numberList3.length * 5;
    var height = width / 2;
    Ball.add(colorList, numberList3, width, height);
    doball();
    for (var i = 0; i < numberList3.length; i++) {
        numberList3[i] = ALL_WORD[numberList3[i]];
    }
}

var ON_ANSWER_RIGHT = function() {}

var ON_ANSWER_WRONG = function() {}

var ON_LEVEL_UP = function() {}

var ON_LEVEL_CONTINUE = function() {}

var ON_LEVEL_DOWN = function() {}

var ON_ITEM_CLICK = function(item) {
    item = $(item);
    var id = item.attr("id");
    var word = parseInt(id.replace("ball", ""));
    word = ALL_WORD[word];
    clickCount++;
    if (checknumberisinarray(word, numberList1) && checknumberisinarray(word, numberList2)) {
        item.css("background", "#999999");
        item.unbind("mousedown");
        Record.clickright();
        if (clickCount == answerCount) {
            Game.right();
        }
    } else {
        Record.clickwrong();
        Game.wrong();
    }
}

var ON_TASK_END = function() {}

function creatcolorlist(level, length) {
    colorList = [];
    if (level == 1) {
        for (var i = 0; i < length; i++) {
            colorList[i] = COLOR_RED;
        }
    } else if (level == 2) {
        var color = getrandomcolor();
        for (var i = 0; i < length; i++) {
            colorList[i] = color;
        }
    } else if (level == 3) {
        var color = getrandomcolor();
        for (var i = 0; i < length; i++) {
            colorList[i] = color;
        }
    } else if (level == 4) {
        for (var i = 0; i < length; i++) {
            colorList[i] = getrandomcolor();
        }
    } else if (level == 5) {
        for (var i = 0; i < length; i++) {
            colorList[i] = getrandomcolor();
        }
    }
}

function doball() {
    $(".ball").css("border-radius", "10px");
    $(".ball").css("font-size", Ball.textSize * 2 / 3 + "px");
    var ballList = $(".ball");
    for (var i = 0; i < ballList.length; i++) {
        var number = parseInt($(ballList[i]).text());
        $(ballList[i]).text(ALL_WORD[number]);
    }
}

var ALL_WORD = ["爱戴", "爱慕", "安抚", "安排", "安适", "安慰", "安稳", "安详", "安置", "暗礁", "暗示", "遨游", "熬夜", "傲骨", "傲慢", "奥妙", "懊悔", "把柄", "摆渡", "败笔", "拜望", "颁发", "伴随", "傍晚", "包袱", "包容", "暴怒", "卑鄙", "悲哀", "悲惨", "悲凉", "悲伤", "悲痛", "蓓蕾", "奔驰", "奔丧", "本色", "笨拙", "逼迫", "比较", "比拟", "鄙视", "鄙夷", "必须", "必需", "毕竟", "庇护", "碧波", "碧绿", "避讳", "编造", "匾额", "辨别", "辩论", "标本", "标致", "濒临", "播撒", "驳斥", "博学", "薄弱", "捕获", "捕捉", "哺育", "布告", "布局", "布置", "步骤", "擦拭", "猜测", "猜想", "采集", "彩虹", "参天", "惭愧", "惨淡", "苍白", "苍茫", "操劳", "测验", "恻隐", "策划", "参差", "差别", "刹那", "差使", "差事", "拆散", "搀扶", "颤抖", "敞开", "敞亮", "畅游", "巢穴", "嘲笑", "潮汛", "炒作", "尘雾", "沉淀", "沉浸", "沉静", "沉默", "沉醉", "陈列", "衬托", "称职", "称赞", "呈报", "诚挚", "乘客", "惩罚", "嗤笑", "痴心", "迟疑", "斥责", "崇拜", "崇尚", "筹备", "出局", "出炉", "处理", "触及", "触觉", "穿戴", "穿梭", "传媒", "传奇", "喘息", "创意", "淳朴", "戳穿", "绰号", "刺耳", "粗犷", "猝然", "簇拥", "脆弱", "存储", "打盹", "打量", "打扰", "打造", "带领", "待遇", "怠慢", "逮住", "逮捕", "单薄", "单调", "耽误", "胆怯", "淡薄", "淡漠", "荡漾", "灯笼", "低调", "低谷", "堤岸", "提防", "底细", "抵御", "颠簸", "典范", "典质", "惦记", "奠定", "雕刻", "调查", "跌倒", "叮嘱", "鼎盛", "订正", "抖擞", "陡峭", "督学", "端午", "端详", "端正", "断言", "对决", "踱步", "躲藏", "发髻", "烦恼", "繁星", "反悔", "仿佛", "非议", "绯红", "翡翠", "氛围", "分泌", "分歧", "吩咐", "愤然", "风度", "风气", "封锁", "烽烟", "讽刺", "伏案", "俘虏", "符合", "福音", "抚摸", "抚慰", "负载", "附和", "赋闲", "赋予", "覆盖", "概率", "干脆", "干涸", "干燥", "感动", "感化", "感激", "感慨", "高贵", "高尚", "告慰", "歌颂", "格局", "隔壁", "隔阂", "隔膜", "公道", "工夫", "功夫", "恭敬", "贡品", "共识", "勾留", "沟壑", "构建", "古朴", "鼓励", "故意", "顾客", "怪癖", "关照", "观光", "观望", "惯例", "光景", "广袤", "规矩", "规模", "过分", "海归", "海选", "害羞", "酣睡", "寒噤", "豪迈", "浩荡", "呵护", "合适", "何尝", "和蔼", "和谐", "和煦", "哄笑", "烘托", "红润", "厚重", "忽略", "互动", "滑稽", "缓慢", "涣散", "荒废", "荒凉", "荒唐", "慌忙", "黄昏", "黄晕", "惶惑", "惶恐", "恍惚", "谎言", "回旋", "悔改", "毁灭", "活泼", "豁达", "饥饿", "机械", "积攒", "畸形", "即使", "汲水", "极端", "急躁", "脊梁", "记载", "忌讳", "既然", "寂静", "寂寞", "寄托", "祭祀", "家眷", "艰苦", "监督", "煎熬", "剪裁", "简陋", "检索", "健壮", "鉴赏", "讲究", "骄傲", "娇贵", "娇嫩", "焦虑", "侥幸", "皎洁", "较量", "教诲", "接触", "揭露", "诘责", "拮据", "捷报", "竭力", "解剖", "介意", "经营", "惊诧", "惊愕", "惊奇", "精通", "精致", "颈椎", "警醒", "径自", "竞赛", "竟然", "敬重", "境况", "境遇", "静谧", "静默", "居然", "鞠躬", "举措", "拒绝", "聚集", "聚拢", "捐献", "绝境", "倔强", "均匀", "开创", "开端", "开辟", "慨叹", "凯旋", "刊载", "考查", "考察", "坎坷", "咳嗽", "可惜", "渴望", "克隆", "恳切", "空灵", "恐怖", "恐吓", "跨越", "宽敞", "宽广", "宽阔", "宽恕", "宽慰", "亏空", "魁梧", "扩散", "阔别", "阔绰", "蜡烛", "褴褛", "懒散", "狼狈", "朗润", "浪漫", "牢靠", "黎明", "理念", "礼拜", "理智", "厉害", "联袂", "脸颊", "良心", "亮点", "晾晒", "嘹亮", "料理", "裂痕", "伶仃", "伶俐", "领悟", "流露", "留恋", "笼罩", "镂空", "落成", "落第", "履行", "麻木", "卖弄", "脉络", "蔓延", "忙碌", "茂盛", "魅力", "萌芽", "蒙蔽", "弥漫", "秘诀", "秘密", "勉强", "缅怀", "敏捷", "模糊", "模拟", "没收", "陌生", "谋略", "谋生", "模样", "目睹", "牧童", "难免", "恼怒", "脑髓", "嫩绿", "嫩芽", "匿名", "鸟瞰", "宁静", "虐待", "偶然", "偶像", "攀登", "攀谈", "攀援", "蹒跚", "盼望", "泡影", "胚胎", "陪伴", "赔偿", "佩服", "蓬勃", "碰撞", "霹雳", "疲倦", "脾气", "僻静", "缥缈", "瞥见", "品位", "品味", "品行", "凭借", "凭空", "屏蔽", "凄然", "期盼", "奇观", "奇迹", "奇妙", "歧视", "歧途", "旗帜", "乞丐", "祈祷", "绮丽", "气概", "气息", "气质", "恰巧", "迁居", "牵挂", "谦逊", "强硬", "强壮", "强迫", "桥梁", "翘首", "翘起", "惬意", "轻捷", "轻松", "轻易", "倾斜", "倾注", "清澈", "清脆", "清凉", "清亮", "情调", "情境", "情趣", "晴朗", "求索", "屈服", "雀跃", "热闹", "任性", "仍然", "弱势", "日益", "柔和", "锐利", "锐气", "霎时", "筛选", "伤痕", "赏识", "折本", "涉猎", "深情", "深思", "深渊", "神奇", "神气", "神情", "审查", "审问", "升腾", "生涯", "盛大", "胜景", "失望", "失踪", "湿润", "时辰", "试验", "首饰", "书籍", "熟识", "熟悉", "双赢", "爽快", "爽朗", "瞬间", "宿营", "肃静", "锁定", "琐屑", "叹息", "探索", "倘若", "逃窜", "陶醉", "剔除", "剔透", "天资", "挑拣", "调节", "调解", "调整", "同窗", "偷懒", "湍急", "推辞", "推荐", "推卸", "颓唐", "托付", "脱身", "妥帖", "拓展", "宛如", "婉言", "婉约", "惋惜", "网络", "惘然", "忘却", "委屈", "伟岸", "未必", "蔚蓝", "慰问", "温和", "温暖", "温情", "温柔", "污秽", "污染", "呜咽", "无端", "无聊", "舞弊", "惜别", "犀利", "膝盖", "袭击", "细菌", "细腻", "细致", "狭隘", "闲散", "闲适", "闲暇", "相处", "相宜", "详细", "享受", "响亮", "消费", "消耗", "消瘦", "萧索", "协调", "写照", "泄气", "心计", "心绪", "辛苦", "新潮", "新鲜", "新颖", "信奉", "信服", "信赖", "星宿", "兴致", "幸亏", "修长", "修葺", "羞耻", "羞愧", "秀气", "袖珍", "虚荣", "絮叨", "絮语", "轩敞", "喧闹", "悬崖", "炫耀", "勋章", "寻觅", "殉职", "延伸", "严寒", "严厉", "严肃", "俨然", "掩藏", "洋溢", "样本", "摇晃", "摇篮", "钥匙", "夜幕", "衣冠", "依赖", "依稀", "遗漏", "疑惑", "屹立", "异地", "驿站", "意境", "意愿", "阴晦", "吟诵", "隐蔽", "隐瞒", "迎合", "应酬", "应和", "映衬", "硬件", "庸俗", "踊跃", "优待", "幽静", "悠久", "悠然", "悠闲", "悠扬", "犹豫", "邮戳", "邮购", "游逛", "游览", "游弋", "迂腐", "愚蠢", "愚昧", "郁闷", "预测", "预防", "预料", "寓所", "渊博", "原谅", "元宵", "阅历", "云霄", "允许", "酝酿", "暂时", "赞赏", "责备", "增添", "憎恶", "眨眼", "摘抄", "粘贴", "绽放", "掌故", "掌柜", "涨红", "障碍", "招呼", "招惹", "朝气", "照顾", "照管", "照例", "照料", "照应", "遮蔽", "折磨", "侦探", "珍藏", "珍贵", "珍奇", "珍惜", "珍稀", "珍重", "真谛", "斟酌", "阵容", "镇定", "震怒", "振作", "赈灾", "争辩", "争鸣", "征服", "挣扎", "蒸腾", "整修", "正宗", "支撑", "脂肪", "执拗", "直径", "至爱", "治学", "质朴", "智慧", "稚气", "咒骂", "昼夜", "皱纹", "主创", "主宰", "嘱咐", "嘱托", "伫立", "贮藏", "著名", "著作", "专利", "转瞬", "赚钱", "壮观", "壮举", "追溯", "追随", "着落", "琢磨", "姿势", "姿态", "资格", "滋润", "滋养", "字帖", "自诩", "恣意", "钻营", "尊贵", "尊敬", "尊重", "遵命", "遵守", "遵循"];

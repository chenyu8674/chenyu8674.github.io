/** 地图一览 **/
let dictionary_map;
$(document).ready(function () {
    dictionary_map = new_map();
});

function new_map() {
    let map = [];

    map["丹莫罗"] = {
        type: 1, min: 1, max: 12,
        x: 754, y: 630, area: [[23, 32, 86, 64], [21, 64, 36, 80]],
        monster: ["雪豹幼崽", "霜鬃巨魔新兵", "雪怪幼崽",
            "雪豹", "冬狼", "冰爪熊", "霜鬃先知", "霜鬃暗法师", "石腭断骨者", "雪怪", "麻疯侏儒", "黑铁间谍"],
        rare: ["饥饿的雪怪", "霜鬃长老", "游荡的冰爪熊"],
        elite: ["瓦加什"]
    }

    map["艾尔文森林"] = {
        type: 1, min: 1, max: 10,
        x: 778, y: 752, area: [[32, 40, 86, 87], [21, 58, 32, 94]],
        monster: ["兔子", "鹿",
            "迪菲亚暴徒", "迪菲亚流浪巫师", "狗头人矿工", "狗头人地卜师", "鱼人潜伏者", "石皮野猪", "森林蜘蛛", "森林灰狼", "森林熊幼崽"],
        rare: ["监工纳尔格", "狡猾的莫加尼", "母蜘蛛"],
        elite: ["霍格"]
    }

    map["泰达希尔"] = {
        type: 1, min: 1, max: 11,
        x: 147, y: 267, area: [34, 28, 68, 78],
        monster: ["蟾蜍", "鹿",
            "树林蜘蛛", "树林毒蜘蛛", "夜刃豹", "沼精", "林精碎木者", "恶灵劣魔", "暗魂劣魔", "瘤背战士", "瘤背萨满祭司"],
        rare: ["瑟雷基尔", "格雷莫尔", "恶臭的黑苔兽"],
        elite: ["奥肯斯古尔"]
    }

    map["杜隆塔尔"] = {
        type: 1, min: 1, max: 10,
        x: 274, y: 563, area: [35, 12, 60, 80],
        monster: ["野兔", "蝰蛇",
            "巨钳龙虾人", "厚壳龙虾人", "钢鬃野猪人", "钢鬃斥候", "科卡尔苦工", "硬甲蝎", "毒尾蝎", "血爪锐齿龙", "雷霆蜥蜴"],
        rare: ["科卡尼斯", "吉欧洛德·杂斑", "死亡毒蝎"],
        elite: ["斯考恩"]
    }

    map["莫高雷"] = {
        type: 1, min: 1, max: 10,
        x: 183, y: 652, area: [31, 9, 65, 89],
        monster: ["草原土拨鼠", "平原陆行鸟",
            "刺背野猪人", "刺背萨满祭司", "刺背斗猪", "消瘦的猛鹫", "猛鹫", "加拉克半人马", "加拉克前锋", "风险投资公司工人", "风险投资公司监工"],
        rare: ["马兹拉纳其", "执行者埃米尔冈德", "鬼嚎"],
        elite: ["菲兹普罗克主管"]
    }

    map["提瑞斯法林地"] = {
        type: 1, min: 1, max: 12,
        x: 750, y: 394, area: [[40, 28, 86, 72], [28, 44, 40, 72]],
        monster: ["食腐狼幼崽", "无脑的僵尸",
            "血色信徒", "血色战士", "血色狂热者", "暗眼骷髅法师", "游荡的幽灵", "腐烂的古尸", "吸血夜行蝙蝠", "邪恶的夜行蜘蛛", "饥饿的黑暗犬"],
        rare: ["毒针雷萨恩", "痛苦的灵魂", "菲林森特的阴影"],
        elite: ["达高尔队长"]
    }

    map["西部荒野"] = {
        type: 1, min: 9, max: 18,
        x: 738, y: 792, area: [29, 15, 65, 82],
        monster: ["生锈的麦田魔像", "小碎尸鸟",
            "看守傀儡", "收割傀儡", "碎尸鸟", "大碎尸鸟", "河爪豺狼人", "河爪斥候", "河爪秘法师", "迪菲亚走私者", "迪菲亚巡路者", "迪菲亚袭击者"],
        rare: ["乌尔图斯", "利爪队长", "死神4000型"],
        elite: ["克拉文·摩特维克"]
    }

    map["洛克莫丹"] = {
        type: 1, min: 10, max: 18,
        x: 845, y: 625, area: [[22, 22, 42, 78], [58, 22, 80, 78], [22, 12, 70, 22]],
        monster: ["绵羊", "山羊",
            "坑道鼠歹徒", "坑道鼠地卜师", "老黑熊", "灰斑黑熊", "碎石怪先知", "碎石怪击颅者", "黑铁伏击者", "黑铁袭击者", "林木潜伏者"],
        rare: ["纺织者杉达", "大型洛克鳄", "摧毁者埃摩戈"],
        elite: ["卓克苏尔"]
    }

    map["黑海岸"] = {
        type: 1, min: 11, max: 19,
        x: 178, y: 374, area: [[33, 16, 49, 96], [49, 7, 68, 30], [49, 30, 58, 40]],
        monster: ["鹿", "生病的鹿",
            "被诅咒的贵族", "挣扎的贵族", "月夜猛虎", "狂暴蓟熊", "月爪枭兽", "月夜枭兽", "雷鳞战士", "雷鳞巫师", "石巨兽"],
        rare: ["影爪", "利斯林", "残忍的弗拉格莫克"],
        elite: ["折磨者奥利加尔"]
    }

    map["银松森林"] = {
        type: 1, min: 10, max: 20,
        x: 737, y: 436, area: [[41, 37, 67, 82], [36, 12, 77, 37]],
        monster: ["被感染的松鼠",
            "月怒白头狼人", "月怒魔魂狼人", "凶猛的灰斑熊", "杂斑座狼", "鸦爪仆从", "鸦爪勇士", "鸦爪之手", "老迈的湖岸潜藏者", "老迈的湖岸爬行者"],
        rare: ["血牙狼人", "达拉然书记员", "鸦爪摄政者"],
        elite: ["图勒·鸦爪"]
    }

    map["贫瘠之地"] = {
        type: 1, min: 10, max: 33,
        x: 239, y: 542, area: [[37, 6, 64, 52], [40, 52, 53, 87]],
        monster: ["掘地鼠", "草原土拨鼠", "蝰蛇", "瞪羚",
            "巨型平原陆行鸟", "快步斑马", "游荡的长颈鹿", "草原科多兽","长鬃草原狮", "绿洲钳嘴龟", "乱齿土狼", "雷鳞蜥蜴", "赤鳞镰爪龙",
            "南海杀手", "南海私掠者", "钢鬃地卜师", "钢鬃防御者", "科卡尔召雷师", "科卡尔掠夺者", "风险投资公司雇工", "风险投资公司雇佣兵"],
        rare: ["迅鬃斑马", "“跳跃者”塔克", "断矛", "拉索利安", "布拉德雷大使"],
        elite: ["狮王休玛"]
    }

    map["怒焰裂谷"] = {
        type: 5, min: 13, max: 14,
        x: 280, y: 520, area: [61, 7],
        monster: [
            {x: 685, y: 105},
            {name: "强壮的烈焰猎犬", x: 668, y: 152},
            {name: "成年的烈焰猎犬", x: 66, y: 27},
            {name: "成年的烈焰猎犬", x: 656, y: 43},
            {name: "堕落的驯犬人", x: 662, y: 60},
            {name: "阿达罗格", x: 70, y: 65},

            {name: "黑暗萨满助手", x: 64, y: 70},
            {name: "黑暗萨满助手", x: 598, y: 652},
            {name: "黑暗萨满研究者", x: 60, y: 50},
            {x: 60, y: 34},
            {name: "黑暗萨满研究者", x: 59, y: 32},
            {name: "黑暗萨满柯兰萨", x: 545, y: 282},

            {name: "熔岩元素", x: 52, y: 37},
            {name: "怒焰穴居人", x: 50, y: 49},
            {name: "怒焰萨满祭司", x: 483, y: 623},
            {name: "焰喉", x: 408, y: 58},

            {name: "燃刃信徒", x: 333, y: 55},
            {name: "燃刃信徒", x: 325, y: 67},
            {name: "燃刃执行者", x: 316, y: 76},
            {name: "熔岩守卫戈多斯", x: 343, y: 822},
        ]
    }

    map["死亡矿井"] = {
        map: ["死亡矿井1", "死亡矿井2"],
        type: 5, min: 15, max: 16,
        x: 735, y: 825, area: [298, 133],
        drop: [10399, 10403, 10402, 10401, 10400],
        monster: [
            {x: 248, y: 13},
            {name: "迪菲亚掘地工", x: 248, y: 227},
            {name: "迪菲亚掘地工", x: 282, y: 262},
            {x: 245, y: 297},
            {name: "迪菲亚匪徒", x: 25, y: 382},
            {name: "亡灵挖掘者", x: 30, y: 45},
            {name: "亡灵爆破者", x: 352, y: 404},
            {x: 30, y: 45},
            {name: "亡灵爆破者", x: 285, y: 529},
            {name: "格拉布托克", x: 362, y: 614},
            {name: "地精工程师", x: 466, y: 599},
            {x: 487, y: 511},
            {name: "活火", x: 515, y: 503},
            {x: 487, y: 511},
            {x: 475, y: 613},
            {name: "地精工匠", x: 476, y: 667},
            {x: 434, y: 725},
            {name: "地精工匠", x: 442, y: 866},
            {name: "赫利克斯·破甲", x: 502, y: 866},
            {x: 593, y: 876},
            {name: "活火", x: 63, y: 91},
            {x: 654, y: 874},
            {x: 609, y: 819},
            {name: "迈赫米死神原型机", x: 609, y: 787},
            {x: 609, y: 717, next: true},
            {x: 123, y: 88},
            {name: "死神5000", x: 123, y: 758},
            {name: "迪菲亚恶棍", x: 123, y: 64},
            {x: 123, y: 59},
            {name: "迪菲亚法师", x: 20, y: 584},
            {x: 234, y: 575},
            {name: "迪菲亚法师", x: 253, y: 519},
            {x: 37, y: 484},
            {name: "迪菲亚哨兵", x: 407, y: 477},
            {x: 429, y: 380},
            {name: "迪菲亚恶棍", x: 420, y: 342},
            {name: "迪菲亚恶棍", x: 428, y: 245},
            {name: "迪菲亚法师", x: 513, y: 171},
            {name: "迪菲亚法师", x: 565, y: 271},
            {x: 546, y: 300},
            {x: 527, y: 371},
            {x: 528, y: 440},
            {x: 516, y: 440},
            {x: 523, y: 501},
            {x: 545, y: 552},
            {name: "迪菲亚哨兵", x: 545, y: 578},
            {x: 545, y: 552},
            {x: 523, y: 501},
            {x: 516, y: 440},
            {x: 528, y: 440},
            {x: 550, y: 512},
            {name: "迪菲亚塑风师", x: 568, y: 477},
            {name: "迪菲亚塑风师", x: 550, y: 426},
            {x: 541, y: 372},
            {x: 559, y: 315},
            {x: 582, y: 340},
            {x: 584, y: 366},
            {name: "撕心狼将军", x: 604, y: 374},
            {name: "“船长”曲奇", x: 604, y: 449},
            {x: 604, y: 405},
            {name: "梵妮莎·范克里夫", x: 676, y: 399},
        ]
    }

    map["哀嚎洞穴"] = {
        type: 5, min: 16, max: 17,
        x: 239, y: 576, area: [46, 59],
        monster: [
            {name: "大型软浆怪", x: 449, y: 521},
            {name: "大型软浆怪", x: 347, y: 511},
            {x: 351, y: 475},
            {x: 377, y: 455},
            {name: "变异破坏者", x: 373, y: 401},
            {x: 340, y: 389},
            {name: "安娜科德拉", x: 307, y: 431},
            {name: "变异鳄鱼", x: 251, y: 451},
            {name: "尖牙德鲁伊", x: 159, y: 457},
            {name: "尖牙德鲁伊", x: 9, y: 333},
            {x: 117, y: 289},
            {name: "变异巨蟒", x: 137, y: 359},
            {name: "皮萨斯", x: 189, y: 395},
            {name: "变异尖牙风蛇", x: 179, y: 330},
            {x: 169, y: 267},
            {name: "尖牙德鲁伊", x: 145, y: 231},
            {name: "变异巨蟒", x: 5, y: 295},
            {name: "尖牙德鲁伊", x: 8, y: 399},
            {name: "变异尖牙风蛇", x: 9, y: 469},
            {name: "尖牙德鲁伊", x: 119, y: 519},
            {x: 151, y: 529},
            {name: "考布莱恩", x: 159, y: 567},
            {x: 151, y: 529},
            {x: 119, y: 519},
            {x: 9, y: 469},
            {x: 8, y: 399},
            {x: 5, y: 295},
            {x: 145, y: 231},
            {x: 169, y: 267},
            {x: 171, y: 381},
            {x: 117, y: 289},
            {x: 9, y: 333},
            {x: 159, y: 457},
            {x: 251, y: 451},
            {name: "变异鳄鱼", x: 301, y: 361},
            {name: "克雷什", x: 385, y: 351},
            {x: 423, y: 355},
            {x: 519, y: 439},
            {x: 525, y: 589},
            {name: "噩梦软浆怪", x: 505, y: 607},
            {x: 505, y: 641},
            {name: "变异鳄鱼", x: 563, y: 711},
            {x: 549, y: 815},
            {x: 537, y: 865},
            {name: "尖牙德鲁伊", x: 561, y: 881},
            {x: 617, y: 777},
            {name: "斯卡姆", x: 617, y: 739},
            {name: "尖牙德鲁伊", x: 601, y: 641},
            {name: "变异鞭笞者", x: 641, y: 589},
            {x: 679, y: 621},
            {name: "变异剧毒风蛇", x: 711, y: 631},
            {x: 731, y: 687},
            {name: "变异鞭笞者", x: 727, y: 751},
            {x: 691, y: 827},
            {name: "变异蹒跚者", x: 641, y: 835},
            {name: "变异剧毒风蛇", x: 543, y: 769},
            {name: "变异蹒跚者", x: 535, y: 649},
            {x: 563, y: 579},
            {name: "瑟芬迪斯", x: 613, y: 533},
            {name: "永生者沃尔丹", x: 551, y: 465},
            {x: 425, y: 357},
            {x: 383, y: 375},
            {x: 373, y: 401},
            {x: 340, y: 389},
            {x: 307, y: 431},
            {x: 257, y: 385},
            {name: "变异破坏者", x: 267, y: 329},
            {name: "变异守护者", x: 301, y: 303},
            {name: "变异守护者", x: 375, y: 251},
            {x: 369, y: 201},
            {name: "噩梦软浆怪", x: 333, y: 189},
            {name: "吞噬者穆坦努斯", x: 343, y: 135}
        ]
    }

    /*
        map["赤脊山"] = {
            detail: "《石后三兄弟》",
            type: 1,
            x: 83,
            y: 62,
            min: 15,
            max: 25
        }

        map["暮色森林"] = {
            detail: "《狼人传说》",
            type: 1,
            x: 78,
            y: 70,
            min: 18,
            max: 30
        }

        map["祖尔格拉布"] = {
            detail: "\"来吧，凡人！品尝噬灵者的愤怒吧！\"",
            type: 10,
            x: 802,
            y: 79,
            min: 60,
            max: 62
        }

        map["奥妮克希亚的巢穴"] = {
            detail: "\"奥妮克希亚深深地吸了一口气……\"",
            type: 40,
            x: 25,
            y: 70,
            min: 63,
            max: 65
        }

        map["熔火之心"] = {
            detail: "\"让火焰净化一切！\"",
            type: 40,
            x: 80,
            y: 55,
            min: 62,
            max: 64
        }
    */
    return map;
}
/** 地图一览 **/
let dictionary_map;
$(document).ready(function () {
    dictionary_map = new_map();
});

function new_map() {
    let map = [];

    map["艾尔文森林"] = {
        detail: "《闪金镇惊魂》",
        type: 1,
        x: 78,
        y: 63,
        start_x: 27,
        end_x: 85,
        start_y: 40,
        end_y: 90,
        min: 1,
        max: 10,
        monster: ["兔子", "鹿", "迪菲亚暴徒", "迪菲亚流浪巫师", "狗头人矿工", "狗头人地卜师", "鱼人潜伏者", "石皮野猪", "森林蜘蛛", "染病的幼狼", "森林灰狼"],
        rare: ["监工纳尔格", "迪菲亚码头主管", "母蜘蛛"],
        elite: ["霍格"]
    }

    map["西部荒野"] = {
        detail: "《暴风城的粮仓》",
        type: 1,
        x: 74,
        y: 62,
        start_x: 29,
        end_x: 65,
        start_y: 15,
        end_y: 82,
        min: 10,
        max: 20,
        monster: ["生锈的麦田魔像", "看守傀儡", "收割傀儡", "小碎尸鸟", "碎尸鸟", "大碎尸鸟", "河爪豺狼人", "河爪斥候", "河爪秘法师", "迪菲亚走私者", "迪菲亚咒术师", "迪菲亚拳匪"],
        rare: ["乌尔图斯", "利爪队长", "死神4000型"],
        elite: ["克拉文·摩特维克"]
    }

    map["怒焰裂谷"] = {
        type: 5,
        x: 27,
        y: 50,
        start_x: 61,
        start_y: 7,
        min: 7,
        max: 10,
        monster: [
            {name: "强壮的烈焰猎犬", lvl: 7, x: 68, y: 12},
            {name: "成年的烈焰猎犬", lvl: 7, x: 66, y: 27},
            {name: "堕落的驯犬人", lvl: 7, x: 66, y: 59},
            {name: "阿达罗格", lvl: 8, x: 70, y: 65},

            {name: "黑暗萨满助手", lvl: 7, x: 64, y: 70},
            {name: "黑暗萨满助手", lvl: 7, x: 60, y: 65},
            {name: "黑暗萨满助手", lvl: 7, x: 60, y: 50},
            {name: "黑暗萨满研究者", lvl: 7, x: 59, y: 32},
            {name: "黑暗萨满柯兰萨", lvl: 8, x: 54, y: 29},

            {name:"熔岩元素",lvl:8,x:52,y:37},
            {name:"怒焰穴居人",lvl:8,x:50,y:49},
            {name:"怒焰萨满祭司",lvl:8,x:48,y:62},
            {name:"焰喉",lvl:9,x:41,y:58},

            {name:"燃刃术士",lvl:9,x:33,y:55},
            {name:"燃刃信徒",lvl:9,x:32,y:66},
            {name:"燃刃执行者",lvl:9,x:32,y:76},
            {name:"熔岩守卫戈多斯",lvl:10,x:35,y:82}
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

        map["死亡矿井"] = {
            map: ["死亡矿井1", "死亡矿井2"],
            detail: "\"蠢货，我们的事业是正义的！\"",
            type: 5,
            x: 73,
            y: 68,
            min: 17,
            max: 22
        }

        map["祖尔格拉布"] = {
            detail: "\"来吧，凡人！品尝噬灵者的愤怒吧！\"",
            type: 10,
            x: 80.2,
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
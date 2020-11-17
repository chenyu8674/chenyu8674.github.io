/** 地图一览 **/
let dictionary_map = new_map();

function new_map() {
    let map = [];
    let map_info = {};

    map[0] = {
        id:0,
        name:"艾尔文森林",
        map:"elwynnforest",
        detail:"《闪金镇惊魂》",
        type:1,
        x:78,
        y:63,
        min:1,
        max:10
    }

    map[1] = {
        id:1,
        name:"西部荒野",
        map:"westfall",
        detail:"《暴风城的粮仓》",
        type:1,
        x:74,
        y:62,
        min:10,
        max:20
    }

    map[2] = {
        id:2,
        name:"赤脊山",
        map:"redridgemountains",
        detail:"《石后三兄弟》",
        type:1,
        x:83,
        y:62,
        min:15,
        max:25
    }

    map[3] = {
        id:0,
        name:"暮色森林",
        map:"duskwood",
        detail:"《狼人传说》",
        type:1,
        x:78,
        y:70,
        min:18,
        max:30
    }

    map[1001] = {
        id:1001,
        name:"死亡矿井",
        map:"thedeadmines",
        detail:"\"蠢货，我们的事业是正义的！\"",
        type:5,
        x:73,
        y:68,
        min:20,
        max:22
    }

    map[10001] = {
        id:10001,
        name:"祖尔格拉布",
        map:"zulgurub",
        detail:"\"来吧，凡人！品尝噬灵者的愤怒吧！\"",
        type:10,
        x:80.2,
        y:79,
        min:60,
        max:62
    }

    map[10002] = {
        id:10002,
        name:"奥妮克希亚的巢穴",
        map:"onyxiaslair",
        detail:"\"奥妮克希亚深深地吸了一口气……\"",
        type:40,
        x:25,
        y:70,
        min:63,
        max:65
    }

    map[10003] = {
        id:10003,
        name:"熔火之心",
        map:"moltencore",
        detail:"\"让火焰净化一切！\"",
        type:40,
        x:80,
        y:55,
        min:62,
        max:64
    }

    return map;
}
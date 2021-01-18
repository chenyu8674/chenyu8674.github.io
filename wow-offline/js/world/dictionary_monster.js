/** 装备基础属性 **/
let dictionary_monster;
$(document).ready(function () {
    dictionary_monster = new_monster();
});

function new_monster() {
    let monster = {};

    /**
     * species 种族 1-人形 2-野兽 3-亡灵 4-恶魔 5-元素生物 6-龙类 7-机械 8-小动物 9-未知
     * type 类型 0-均衡型 1-战士 2-圣骑士 3-猎人 4-萨满 5-德鲁伊 6-盗贼 7-牧师 8-术士 9-法师 99-特殊
     * rare 怪物阶级 1-爪牙 2-怪物 3-稀有 4-精英 5-首领 6-团队首领
     * multiple 属性倍数
     */
    {
        monster["兔子"] = {species: 8, type: 6, rare: 1}
        monster["鹿"] = {species: 8, type: 0, rare: 1}
        monster["迪菲亚暴徒"] = {species: 1, type: 1, rare: 2}
        monster["迪菲亚流浪巫师"] = {species: 1, type: 9, rare: 2, skill: [dictionary_monster_skill.frost_cast()]}
        monster["狗头人矿工"] = {species: 1, type: 1, rare: 1}
        monster["狗头人地卜师"] = {species: 1, type: 4, rare: 2, skill: [dictionary_monster_skill.natural_cast()]}
        monster["鱼人潜伏者"] = {species: 1, type: 6, rare: 2}
        monster["石皮野猪"] = {species: 2, type: 5, rare: 2, effect:["health_percent+=40"]}
        monster["森林蜘蛛"] = {species: 2, type: 6, rare: 2}
        monster["染病的幼狼"] = {species: 2, type: 0, rare: 1}
        monster["森林灰狼"] = {species: 2, type: 1, rare: 2}

        monster["监工纳尔格"] = {species: 1, type: 1, rare: 3}
        monster["迪菲亚码头主管"] = {species: 1, type: 3, rare: 3}
        monster["母蜘蛛"] = {species: 2, type: 6, rare: 3}

        monster["霍格"] = {species: 1, type: 1, rare: 4, x: 27, y: 90, effect:[]}
    }// 艾尔文森林
    {
        monster["生锈的麦田魔像"] = {species: 7, type: 0, rare: 1, effect:["armor_attack_percent+=100"]}
        monster["看守傀儡"] = {species: 7, type: 2, rare: 2, effect:["armor_attack_percent+=100"]}
        monster["收割傀儡"] = {species: 7, type: 6, rare: 2, effect:["armor_attack_percent+=100"]}
        monster["小碎尸鸟"] = {species: 2, type: 3, rare: 1}
        monster["碎尸鸟"] = {species: 2, type: 5, rare: 2}
        monster["大碎尸鸟"] = {species: 2, type: 1, rare: 2}
        monster["河爪豺狼人"] = {species: 1, type: 0, rare: 2}
        monster["河爪斥候"] = {species: 1, type: 3, rare: 2, skill: [dictionary_monster_skill.multi_shot()]}
        monster["河爪秘法师"] = {species: 1, type: 4, rare: 2, skill: [dictionary_monster_skill.natural_cast(), dictionary_monster_skill.shadow_cast(), dictionary_monster_skill.nature_heal()]}
        monster["迪菲亚走私者"] = {species: 1, type: 6, rare: 2}
        monster["迪菲亚咒术师"] = {species: 1, type: 8, rare: 2, skill: [dictionary_monster_skill.fire_cast()]}
        monster["迪菲亚拳匪"] = {species: 1, type: 1, rare: 2, skill: [dictionary_monster_skill.blood_thirst()]}

        monster["乌尔图斯"] = {species: 2, type: 6, rare: 3}
        monster["利爪队长"] = {species: 1, type: 1, rare: 3}
        monster["死神4000型"] = {species: 7, type: 2, rare: 3, skill: [dictionary_monster_skill.natural_attack()]}

        monster["克拉文·摩特维克"] = {species: 1, type: 6, rare: 4, x: 70, y: 78, effect: ["critical_chance_final+=100","attack_power_percent-=30"]}
    }// 西部荒野
    {
        monster["强壮的烈焰猎犬"] = {species: 3, type: 5, rare: 4}
        monster["成年的烈焰猎犬"] = {species: 3, type: 2, rare: 4, skill: [dictionary_monster_skill.rake()]}
        monster["堕落的驯犬人"] = {species: 1, type: 1, rare: 4, skill: [dictionary_monster_skill.mortal_strike()]}

        monster["阿达罗格"] = {species: 3, type: 3, rare: 5, buffs: [new_buff().rage()], effect:["attack_power_percent-=20"], skill: [dictionary_monster_skill.fire_attack()],
            drop:["环刺护腕|20", "咆哮之口长裤|20", "阿达罗格之牙|20", "焦灼的炽焰猎犬之靴|20", "骨炭护腰|20"]}

        monster["黑暗萨满助手"] = {species: 1, type: 4, rare: 4, effect:["block_chance_final+=30", "block_value=100"], skill: [dictionary_monster_skill.fire_cast()]}
        monster["黑暗萨满研究者"] = {species: 1, type: 4, rare: 4, effect:["damage_fire+=50"], skill: [dictionary_monster_skill.fire_cast()]}

        monster["黑暗萨满柯兰萨"] = {species: 1, type: 4, rare: 5, buffs: [new_buff().rage()], effect:["damage_shadow+=30"], skill: [dictionary_monster_skill.shadow_cast()],
            drop:["黑暗仪式斗篷|25", "破碎图腾之握|25", "黑色元素腕轮|25", "黑暗萨满卫衣|25"]}

        monster["熔岩元素"] = {species: 5, type: 1, rare: 4, effect:["armor_attack_percent+=30"]}
        monster["怒焰穴居人"] = {species: 1, type: 6, rare: 4}
        monster["怒焰萨满祭司"] = {species: 1, type: 4, rare: 4, skill: [dictionary_monster_skill.natural_cast()]}

        monster["焰喉"] = {species: 2, type: 9, rare: 5, buffs: [new_buff().rage()], skill: [dictionary_monster_skill.fire_cast()],
            drop:["焦灼链甲|25", "角质护腕|25", "萤火法袍|25", "甲质腕轮|25"]}

        monster["燃刃术士"] = {species: 1, type: 8, rare: 4, skill: [dictionary_monster_skill.shadow_cast()]}
        monster["燃刃信徒"] = {species: 1, type: 6, rare: 4}
        monster["燃刃执行者"] = {species: 1, type: 1, rare: 4, skill: [dictionary_monster_skill.mortal_strike()]}

        monster["熔岩守卫戈多斯"] = {species: 1, type: 2, rare: 5, buffs: [new_buff().rage()], effect:["attack_power_percent-=40"], skill: [dictionary_monster_skill.bash(), dictionary_monster_skill.physical_attack()],
            drop:["熬心之杖|20", "踏血锁靴|20", "血咒魔刃|20", "无边怒火腰带|20", "戈多斯的碾压之手|20"]}
    }// 怒焰裂谷
    return monster;
}
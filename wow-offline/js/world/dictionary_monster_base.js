/** 装备基础属性 **/
let dictionary_monster_base;
$(document).ready(function () {
    dictionary_monster_base = new_monster();
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
    return monster;
}
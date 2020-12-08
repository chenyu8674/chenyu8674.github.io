/** 装备基础属性 **/
let dictionary_monster_base;
$(document).ready(function () {
    dictionary_monster_base = new_monster();
});

function new_monster() {
    let monster = {};

    /**
     * species 种族 1-人形 2-野兽 3-亡灵 4-恶魔 5-元素生物 6-龙类 7-机械 8-小动物 9-未知
     * type 类型 0-均衡型 1-力量型 2-敏捷型 3-耐力型 4-智力型 5-精神型 9-特殊型
     * rare 怪物阶级 1-爪牙 2-怪物 3-稀有 4-精英 5-首领 6-团队首领
     * multiple 属性倍数
     */
    monster["兔子"] = {name: "兔子", species: 8, type: 0, rare: 1, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["鹿"] = {name: "鹿", species: 8, type: 0, rare: 1, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}

    monster["迪菲亚暴徒"] = {name: "迪菲亚暴徒", species: 1, type: 1, rare: 2, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["迪菲亚流浪巫师"] = {name: "迪菲亚流浪巫师", species: 1, type: 4, rare: 2, multiple: 1, skill: [dictionary_monster_skill.frost_cast()],}
    monster["狗头人矿工"] = {name: "狗头人矿工", species: 1, type: 3, rare: 1, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["狗头人地卜师"] = {name: "狗头人地卜师", species: 1, type: 4, rare: 2, multiple: 1, skill: [dictionary_monster_skill.natural_cast()],}
    monster["鱼人潜伏者"] = {name: "鱼人潜伏者", species: 1, type: 4, rare: 2, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}

    monster["石皮野猪"] = {name: "石皮野猪", species: 2, type: 3, rare: 2, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["森林蜘蛛"] = {name: "森林蜘蛛", species: 2, type: 2, rare: 2, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["染病的幼狼"] = {name: "染病的幼狼", species: 2, type: 0, rare: 1, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["森林灰狼"] = {name: "森林灰狼", species: 2, type: 1, rare: 2, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}

    monster["监工纳尔格"] = {name: "监工纳尔格", species: 1, type: 1, rare: 3, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["迪菲亚码头主管"] = {name: "迪菲亚码头主管", species: 1, type: 0, rare: 3, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}
    monster["母蜘蛛"] = {name: "母蜘蛛", species: 2, type: 2, rare: 3, multiple: 1, skill: [dictionary_monster_skill.physical_attack()],}

    monster["霍格"] = {name: "霍格", species: 1, type: 9, rare: 4, multiple: 1, x: 27, y: 90, skill: [dictionary_monster_skill.physical_attack()],}

    return monster;
}
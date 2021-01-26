/** 怪物属性结算 **/

/**
 * 生成怪物对象
 * @param name 名称
 * @param lvl 等级
 * @param type 类型 0-均衡型 1-力量型 2-敏捷型 3-耐力型 4-智力型 5-精神型
 * @param rare 怪物阶级 1-爪牙 2-怪物 3-稀有 4-精英 5-首领 6-团队首领
 * @param multiple
 * @param effect
 * @param buffs
 * @return {string[]}
 */
function get_new_monster(name, lvl, type, rare, multiple, effect, buffs) {
    let monster = new_role_base();
    if (multiple == null) {
        multiple = 1;
    }
    multiple *= lvl > 10 ? 1.5 : 1 + lvl * 0.05;
    if (buffs == null) {
        buffs = rare >= 5 ? [new_buff().rage()] : [];
    }
    if (effect != null && effect.length > 0) {
        let equipment = {};
        equipment.effect = effect;
        monster.equipments = [equipment];
    } else {
        monster.equipments = [];
    }
    monster.name = name;
    monster.lvl = lvl;
    monster.job = type * 10;
    monster = calculate_base_property(monster);

    monster.buffs = buffs;
    let buff = {};
    buff.T = -1;
    let armor_attack = 0;
    let armor_magic = 0;
    switch (type) {
        case 1:
        case 2:
            armor_attack = 40;
            armor_magic = 10;
            break;
        case 3:
        case 4:
            armor_attack = 30;
            armor_magic = 20;
            break;
        case 5:
        case 6:
            armor_attack = 20;
            armor_magic = 30;
            break;
        case 7:
        case 8:
        case 9:
            armor_attack = 10;
            armor_magic = 40;
            break;
    }
    // 初始护甲
    buff.effect = [
        "armor_attack+=" + Math.ceil(lvl * armor_attack * get_multiple_by_rare(rare) * multiple),
        "armor_magic+=" + Math.ceil(lvl * armor_magic * get_multiple_by_rare(rare) * multiple),
        "health_percent+=20"
    ];
    if (rare >= 5) {
        // 首领怪物增加血量，降低伤害
        buff.effect.push("health_percent+=100");
        buff.effect.push("damage_all-=50");
    }
    monster.buffs.push(buff);
    monster.str = Math.ceil(monster.str * get_multiple_by_rare(rare) * multiple);
    monster.agi = Math.ceil(monster.agi * get_multiple_by_rare(rare) * multiple);
    monster.sta = Math.ceil(monster.sta * get_multiple_by_rare(rare) * multiple);
    monster.int = Math.ceil(monster.int * get_multiple_by_rare(rare) * multiple);
    monster.spr = Math.ceil(monster.spr * get_multiple_by_rare(rare) * multiple);
    return monster;
}

/**
 * 获取怪物类型名称
 */
function get_monster_species_name(species) {
    switch (species) {
        case 1:
            return "人形";
        case 2:
            return "野兽";
        case 3:
            return "亡灵";
        case 4:
            return "恶魔";
        case 5:
            return "元素生物";
        case 6:
            return "龙类";
        case 7:
            return "机械";
        case 8:
            return "小动物";
        case 9:
            return "未知";
    }
}

/**
 * 获取怪物阶级名称
 */
function get_monster_rare_name(rare) {
    switch (rare) {
        case 1:
            return "弱小敌人";
        case 2:
            return "普通敌人";
        case 3:
            return "稀有敌人";
        case 4:
            return "精英";
        case 5:
            return "首领";
        case 6:
            return "团队首领";
    }
}
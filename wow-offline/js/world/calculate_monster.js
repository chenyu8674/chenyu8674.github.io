/** 怪物属性结算 **/

/**
 * 生成怪物对象
 * @param name 名称
 * @param lvl 等级
 * @param type 类型 0-均衡型 1-力量型 2-敏捷型 3-耐力型 4-智力型 5-精神型 9-特殊型
 * @param rare 怪物阶级 1-爪牙 2-弱怪 3-普通怪 4-强怪 5-稀有怪 6-精英怪
 * @param multiple
 * @return {string[]}
 */
function get_new_monster(name, lvl, type, rare, multiple) {
    let monster = new_role_base();
    monster.name = name;
    monster.lvl = lvl;
    switch (type) {
        case 0:
            monster.job = dictionary_job.druid;
            monster = calculate_base_property(monster);
            monster.str += lvl * 0.2;
            monster.agi += lvl * 0.2;
            monster.sta += lvl * 0.2;
            monster.int += lvl * 0.2;
            monster.spr += lvl * 0.2;
            break;
        case 1:
            monster.job = dictionary_job.warrior;
            monster = calculate_base_property(monster);
            monster.str += lvl * 1;
            break;
        case 2:
            monster.job = dictionary_job.rogue;
            monster = calculate_base_property(monster);
            monster.agi += lvl * 1;
            break;
        case 3:
            monster.job = dictionary_job.warrior;
            monster = calculate_base_property(monster);
            monster.sta += lvl * 1;
            break;
        case 4:
            monster.job = dictionary_job.mage;
            monster = calculate_base_property(monster);
            monster.int += lvl * 1;
            break;
        case 5:
            monster.job = dictionary_job.priest;
            monster = calculate_base_property(monster);
            monster.spr += lvl * 1;
            break;
        case 9:
            monster.job = dictionary_job.druid;
            monster = calculate_base_property(monster);
            monster.str += lvl * 2;
            monster.agi += lvl * 2;
            monster.sta += lvl * 2;
            monster.int += lvl * 2;
            monster.spr += lvl * 2;
            break;
    }
    monster.str *= get_multiple_by_rare(rare);
    monster.agi *= get_multiple_by_rare(rare);
    monster.sta *= get_multiple_by_rare(rare);
    monster.int *= get_multiple_by_rare(rare);
    monster.spr *= get_multiple_by_rare(rare);
    monster.str = Math.ceil(monster.str);
    monster.agi = Math.ceil(monster.agi);
    monster.sta = Math.ceil(monster.sta);
    monster.int = Math.ceil(monster.int);
    monster.spr = Math.ceil(monster.spr);
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
            return "爪牙";
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
/** 怪物属性结算 **/

/**
 * 生成怪物对象
 */
function create_monster_by_model(name, lvl) {
    let model = new_monster()[name];
    if (model.multiple == null) {
        model.multiple = 1;
    }
    model.multiple *= lvl > 10 ? 1.5 : 1 + lvl * 0.05;
    if (model.buffs == null) {
        model.buffs = model.rare >= 5 ? [new_buff().rage()] : [];
    }
    let armor_attack = 0;
    let armor_magic = 0;
    switch (model.type) {
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
    let buff = {};
    buff.T = -1;
    buff.effect = [
        "armor_attack+=" + Math.ceil(lvl * armor_attack * get_multiple_by_rare(model.rare) * model.multiple),
        "armor_magic+=" + Math.ceil(lvl * armor_magic * get_multiple_by_rare(model.rare) * model.multiple),
        "health_percent+=20"
    ];
    if (model.rare === 4) {
        // 精英怪物增加血量，降低伤害
        buff.effect.push("health_percent+=50");
        buff.effect.push("cause_damage_percent-=30");
    }
    if (model.rare === 5) {
        // 首领怪物增加血量，降低伤害
        buff.effect.push("health_percent+=100");
        buff.effect.push("cause_damage_percent-=50");
    }
    if (model.rare === 6) {
        // 团队首领怪物增加血量，降低伤害
        buff.effect.push("health_percent+=200");
        buff.effect.push("cause_damage_percent-=70");
    }
    if (model.effect != null && model.effect.length > 0) {
        for (let i = 0; i < model.effect.length; i++) {
            buff.effect.push(model.effect[i]);
        }
    }
    let monster = new_role_base();
    monster.equipments = [];
    monster.name = name;
    monster.lvl = lvl;
    monster.job = model.type * 10;
    monster = calculate_base_property(monster);
    monster.buffs = model.buffs;
    monster.buffs.push(buff);
    monster.str = Math.ceil(monster.str * get_multiple_by_rare(model.rare) * model.multiple);
    monster.agi = Math.ceil(monster.agi * get_multiple_by_rare(model.rare) * model.multiple);
    monster.sta = Math.ceil(monster.sta * get_multiple_by_rare(model.rare) * model.multiple);
    monster.int = Math.ceil(monster.int * get_multiple_by_rare(model.rare) * model.multiple);
    monster.spr = Math.ceil(monster.spr * get_multiple_by_rare(model.rare) * model.multiple);
    monster.detail = model.detail;
    monster.species = model.species;
    monster.rare = model.rare;
    monster.lvl = lvl;
    monster.drop = model.drop;
    monster.skills = [];
    if (model.skills == null) {
        monster.skills = [dictionary_monster_skill.physical_attack()];
    } else {
        if (typeof model.skills === "string" || typeof model.skills.length === "undefined") {
            model.skills = [model.skills];
        }
        for (let i = 0; i < model.skills.length; i++) {
            let skill = model.skills[i];
            if (typeof skill === "string") {
                monster.skills.push(dictionary_monster_skill[skill]());
            } else {
                monster.skills.push(skill);
            }
        }
        if (model.skills.length === 0) {
            monster.skills = [dictionary_monster_skill.physical_attack()];
        }
    }

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
            return "弱小";
        case 2:
            return "普通";
        case 3:
            return "稀有";
        case 4:
            return "精英";
        case 5:
            return "首领";
        case 6:
            return "团队首领";
    }
}
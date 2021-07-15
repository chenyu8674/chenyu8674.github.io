/** 怪物属性结算 **/

/**
 * 生成怪物对象
 */
function create_monster_by_model(name, lvl) {
    let model = new_monster()[name];
    if (model.multiple == null) {
        model.multiple = 1;
    }
    if (model.buffs == null) {
        model.buffs = model.rare >= 5 ? [new_buff().rage()] : [];
    }
    let monster = new_role_base();
    monster.equipments = [];
    monster.name = name;
    monster.lvl = lvl;
    monster.say_start = model.say_start;
    monster.say_end = model.say_end;
    monster.job = model.type;
    if (monster.job < 10) {
        monster.job *= 10;
    }
    // 计算怪物职业加成
    let buff = {};
    buff.T = -1;
    buff.effect = [];
    if (model.effect != null && model.effect.length > 0) {
        for (let i = 0; i < model.effect.length; i++) {
            buff.effect.push(model.effect[i]);
        }
    }
    switch (monster.job) {
        // 1-战士
        case 10:
        case 11:
        case 12:
        case 13:
            buff.effect.push("str_percent+=100");
            buff.effect.push("agi_percent+=50");
            buff.effect.push("sta_percent+=100");
            buff.effect.push("armor_attack+=" + Math.ceil(15 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(5 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 2-圣骑士
        case 20:
        case 21:
        case 22:
        case 23:
            buff.effect.push("str_percent+=60");
            buff.effect.push("agi_percent+=30");
            buff.effect.push("sta_percent+=90");
            buff.effect.push("int_percent+=60");
            buff.effect.push("spr_percent+=60");
            buff.effect.push("armor_attack+=" + Math.ceil(20 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(20 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 3-猎人
        case 30:
        case 31:
        case 32:
        case 33:
            buff.effect.push("str_percent+=80");
            buff.effect.push("agi_percent+=100");
            buff.effect.push("sta_percent+=75");
            buff.effect.push("armor_attack+=" + Math.ceil(15 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(5 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 4-萨满
        case 40:
        case 41:
        case 42:
        case 43:
            buff.effect.push("str_percent+=70");
            buff.effect.push("agi_percent+=50");
            buff.effect.push("sta_percent+=70");
            buff.effect.push("int_percent+=70");
            buff.effect.push("spr_percent+=70");
            buff.effect.push("armor_attack+=" + Math.ceil(15 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(15 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 5-德鲁伊
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
            buff.effect.push("str_percent+=65");
            buff.effect.push("agi_percent+=65");
            buff.effect.push("sta_percent+=65");
            buff.effect.push("int_percent+=65");
            buff.effect.push("spr_percent+=65");
            buff.effect.push("armor_attack+=" + Math.ceil(12 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(8 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 6-盗贼
        case 60:
        case 61:
        case 62:
        case 63:
            buff.effect.push("str_percent+=90");
            buff.effect.push("agi_percent+=100");
            buff.effect.push("sta_percent+=60");
            buff.effect.push("armor_attack+=" + Math.ceil(12 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(8 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 7-牧师
        case 70:
        case 71:
        case 72:
        case 73:
            buff.effect.push("agi_percent+=40");
            buff.effect.push("sta_percent+=65");
            buff.effect.push("int_percent+=80");
            buff.effect.push("spr_percent+=100");
            buff.effect.push("armor_attack+=" + Math.ceil(5 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(15 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 8-术士
        case 80:
        case 81:
        case 82:
        case 83:
            buff.effect.push("agi_percent+=20");
            buff.effect.push("sta_percent+=90");
            buff.effect.push("int_percent+=80");
            buff.effect.push("spr_percent+=30");
            buff.effect.push("armor_attack+=" + Math.ceil(8 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(12 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
        // 9-法师
        case 90:
        case 91:
        case 92:
        case 93:
            buff.effect.push("agi_percent+=30");
            buff.effect.push("sta_percent+=60");
            buff.effect.push("int_percent+=100");
            buff.effect.push("spr_percent+=50");
            buff.effect.push("armor_attack+=" + Math.ceil(8 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            buff.effect.push("armor_magic+=" + Math.ceil(12 * lvl * get_multiple_by_rare(model.rare) * model.multiple));
            break;
    }
    // 血量随机浮动
    if (model.rare <= 4) {
        buff.effect.push("health_percent+=" + (15 + Math.random() * 10).toFixed(2));
    } else {
        buff.effect.push("health_percent+=20");
    }
    // 计算怪物属性
    monster.str = Math.ceil((5 + monster.lvl * 2) * get_multiple_by_rare(model.rare) * model.multiple);
    monster.agi = Math.ceil((5 + monster.lvl * 2) * get_multiple_by_rare(model.rare) * model.multiple);
    monster.sta = Math.ceil((5 + monster.lvl * 2) * get_multiple_by_rare(model.rare) * model.multiple);
    monster.int = Math.ceil((5 + monster.lvl * 2) * get_multiple_by_rare(model.rare) * model.multiple);
    monster.spr = Math.ceil((5 + monster.lvl * 2) * get_multiple_by_rare(model.rare) * model.multiple);
    // 降低低级怪物强度
    buff.effect.push("attr_percent-=" + 3 * (11 - lvl > 0 ? 11 - lvl : 0));
    // 精英/首领怪物增加血量，降低伤害
    if (model.rare === 4) {
        buff.effect.push("health_percent+=60");
        buff.effect.push("cause_damage_percent-=30");
    } else if (model.rare === 5) {
        buff.effect.push("health_percent+=100");
        buff.effect.push("cause_damage_percent-=50");
    } else if (model.rare === 6) {
        buff.effect.push("health_percent+=200");
        buff.effect.push("cause_damage_percent-=70");
    }
    monster.buffs = model.buffs;
    monster.buffs.push(buff);
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
function get_monster_rare_name(rare, percent) {
    if (percent) {
        switch (rare) {
            case 3:
            case 4:
                return "稀有精英";
            case 5:
                return "稀有首领";
            case 6:
                return "稀有团队首领";
        }
    } else {
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
}
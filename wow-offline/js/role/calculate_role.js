/** 战斗属性结算 **/

/**
 * 计算人物基础属性
 */
function calculate_base_property(role_base) {
    let job = 10 * Math.floor(role_base.job / 10);
    role_base.str = Math.floor(dictionary_job.base_property[job][0] + role_base.lvl * dictionary_job.upgrade_property[job][0]);// 力量
    role_base.agi = Math.floor(dictionary_job.base_property[job][1] + role_base.lvl * dictionary_job.upgrade_property[job][1]);// 敏捷
    role_base.sta = Math.floor(dictionary_job.base_property[job][2] + role_base.lvl * dictionary_job.upgrade_property[job][2]);// 耐力
    role_base.int = Math.floor(dictionary_job.base_property[job][3] + role_base.lvl * dictionary_job.upgrade_property[job][3]);// 智力
    role_base.spr = Math.floor(dictionary_job.base_property[job][4] + role_base.lvl * dictionary_job.upgrade_property[job][4]);// 精神
    return role_base;
}

/**
 * 由角色状态生成战斗状态
 */
function get_battle_attribute(role_base, flag) {
    let role_whole = new_role_whole();
    refresh_base_attribute(role_base, role_whole);
    refresh_attribute_equipments(role_whole);
    refresh_attribute_buffs(role_whole);
    refresh_attribute_debuffs(role_whole);
    refresh_battle_attribute(role_whole);
    role_whole.flag = flag;// 设定敌我标识(防止同名对战混淆)
    return role_whole;
}

/**
 * 计算角色属性
 */
function refresh_base_attribute(role_base, role_whole) {
    role_whole.name = role_base.name;
    role_whole.lvl = role_base.lvl;
    role_whole.job = role_base.job;
    role_whole.str = role_base.str;
    role_whole.agi = role_base.agi;
    role_whole.sta = role_base.sta;
    role_whole.int = role_base.int;
    role_whole.spr = role_base.spr;
    role_whole.buffs = role_base.buffs;
    role_whole.debuffs = role_base.debuffs;
    role_whole.dots = role_base.dots;
    role_whole.equipments = role_base.equipments;
    role_whole.items = role_base.items;
    role_whole.skills = role_base.skills;
}

/**
 * 计算装备属性
 */
function refresh_attribute_equipments(role_whole) {
    let battle_equipments = role_whole.equipments;
    if (battle_equipments != null && battle_equipments.length > 0) {
        for (let i = 0; i < battle_equipments.length; i++) {
            let equipments = battle_equipments[i];
            equipments = equipments.effect;
            for (let j = 0; j < equipments.length; j++) {
                let equipment = equipments[j];
                eval("role_whole." + equipment);
            }
        }
    }
}

/**
 * 计算增益属性
 */
function refresh_attribute_buffs(role_whole) {
    let battle_buffs = role_whole.buffs;
    if (battle_buffs != null && battle_buffs.length > 0) {
        for (let i = 0; i < battle_buffs.length; i++) {
            let buffs = battle_buffs[i];
            let effects = buffs.effect;
            for (let j = 0; j < effects.length; j++) {
                let effect = effects[j];
                eval("role_whole." + effect);
            }
            let turn_left = buffs.T;
            if (turn_left > 0) {
                turn_left--;
                if (turn_left === 0) {
                    battle_buffs.splice(i, 1);
                    i--;
                } else {
                    buffs.T = turn_left;
                }
            }
        }
    }
}

/**
 * 计算减益属性
 */
function refresh_attribute_debuffs(role_whole) {
    let battle_debuffs = role_whole.debuffs;
    if (battle_debuffs != null && battle_debuffs.length > 0) {
        for (let i = 0; i < battle_debuffs.length; i++) {
            let debuffs = battle_debuffs[i];
            let effects = debuffs.effect;
            for (let j = 0; j < effects.length; j++) {
                let effect = effects[j];
                eval("role_whole." + effect);
            }
            // 剩余回合-1
            let turn_left = debuffs.T;
            if (turn_left > 0) {
                turn_left--;
                if (turn_left === 0) {
                    battle_debuffs.splice(i, 1);
                    i--;
                } else {
                    debuffs.T = turn_left;
                }
            }
        }
    }
}

/**
 * 计算dot伤害
 */
function refresh_dots(role_whole) {
    let dots = role_whole.dots;
    if (dots != null && dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            let dot = dots[i];
            do_dot(role_whole, dot);
            // 剩余回合-1
            let turn_left = dot.T;
            if (turn_left > 0) {
                turn_left--;
                if (turn_left === 0) {
                    dots.splice(i, 1);
                    i--;
                } else {
                    dot.T = turn_left;
                }
            }
        }
    }
}

/**
 * 清空非常驻增减益属性
 */
function clear_buffs_and_debuffs_and_dots(role) {
    let battle_buffs = role.buffs;
    if (battle_buffs != null && battle_buffs.length > 0) {
        for (let i = 0; i < battle_buffs.length; i++) {
            let buffs = battle_buffs[i];
            let turn_left = buffs.T;
            if (turn_left > 0) {
                battle_buffs.splice(i, 1);
                i--;
            }
        }
    }
    let battle_debuffs = role.debuffs;
    if (battle_debuffs != null && battle_debuffs.length > 0) {
        for (let i = 0; i < battle_debuffs.length; i++) {
            let debuffs = battle_debuffs[i];
            let turn_left = debuffs.T;
            if (turn_left > 0) {
                battle_debuffs.splice(i, 1);
                i--;
            }
        }
    }
    role.dots = [];
}

/**
 * 计算最终属性加成
 */
function refresh_battle_attribute(attribute) {
    attribute.str = Math.round(attribute.str * attribute.str_percent / 100);// 力量
    attribute.str_percent = 100;
    attribute.agi = Math.round(attribute.agi * attribute.agi_percent / 100);// 敏捷
    attribute.agi_percent = 100;
    attribute.sta = Math.round(attribute.sta * attribute.sta_percent / 100);// 耐力
    attribute.sta_percent = 100;
    attribute.int = Math.round(attribute.int * attribute.int_percent / 100);// 智力
    attribute.int_percent = 100;
    attribute.spr = Math.round(attribute.spr * attribute.spr_percent / 100);// 精神
    attribute.spr_percent = 100;

    attribute.max_health_value = Math.round((attribute.max_health_value + attribute.sta * sta_to_health_max) * attribute.health_percent / 100);// 最大生命值
    attribute.health_percent = 100;

    attribute.attack_power = Math.round((attribute.attack_power + attribute.str * str_to_attack_power + attribute.agi * agi_to_attack_power) * attribute.attack_power_percent / 100);// 攻击强度
    attribute.attack_power_percent = 100;
    attribute.magic_power = Math.round((attribute.magic_power + attribute.int * int_to_magic_power + attribute.spr * spr_to_magic_power) * attribute.magic_power_percent / 100);// 法术强度
    attribute.magic_power_percent = 100;
    attribute.heal_power = Math.round((attribute.heal_power + attribute.spr * spr_to_heal_power) * attribute.heal_power_percent / 100);// 治疗强度
    attribute.heal_power_percent = 100;

    attribute.critical_rate = Math.round((attribute.critical_rate + attribute.agi * agi_to_critical_rate) * attribute.critical_rate_percent / 100);// 暴击等级
    attribute.critical_chance_final = Math.round(attribute.critical_chance_final);// 最终暴击率百分比
    attribute.critical_rate_percent = 100;

    attribute.critical_damage = Math.round(attribute.critical_damage + attribute.int * int_to_critical_damage);// 暴击伤害系数

    attribute.hit_rate = Math.round((attribute.hit_rate + attribute.agi * agi_to_hit_rate) * attribute.hit_rate_percent / 100);// 命中等级
    attribute.hit_chance_final = Math.round(attribute.hit_chance_final);// 最终命中率百分比
    attribute.hit_rate_percent = 100;

    attribute.dodge_rate = Math.round((attribute.dodge_rate + attribute.agi * agi_to_dodge_rate) * attribute.dodge_rate_percent / 100);// 闪避等级
    attribute.dodge_chance_final = Math.round(attribute.dodge_chance_final);// 最终闪避率百分比
    attribute.dodge_rate_percent = 100;

    attribute.block_rate = Math.round(attribute.block_rate * attribute.block_rate_percent / 100);// 格挡等级
    attribute.block_chance_final = Math.round(attribute.block_chance_final);// 最终格挡率百分比
    attribute.block_rate_percent = 100;

    attribute.block_value = Math.round((attribute.block_value + attribute.str * str_to_block_value) * attribute.block_value_percent / 100);// 格挡值
    attribute.block_value_percent = 100;

    attribute.armor_attack = Math.round((attribute.armor_attack + attribute.sta * sta_to_armor_attack) * attribute.armor_attack_percent / 100);// 攻击护甲
    attribute.armor_attack_percent = 100;
    attribute.armor_magic = Math.round((attribute.armor_magic + attribute.spr * spr_to_armor_magic) * attribute.armor_magic_percent / 100);// 法术护甲
    attribute.armor_magic_percent = 100;
}

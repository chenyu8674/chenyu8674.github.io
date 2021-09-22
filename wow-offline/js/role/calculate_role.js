/** 战斗属性结算 **/

let role_base_1;// 我方原始状态
let role_status_1;// 我方完整状态
let role_battle_1;// 我方战斗状态
let role_health_1 = 0;// 我方当前血量
let role_shield_1 = 0;// 我方当前护盾

let role_base_2;// 敌方原始状态
let role_status_2;// 敌方完整状态
let role_battle_2;// 敌方战斗状态
let role_health_2 = 0;// 敌方当前血量
let role_shield_2 = 0;// 敌方当前护盾

function calculate_role_1(role_base) {
    role_base_1 = role_base;
    role_status_1 = new_role_whole();
    role_battle_1 = new_role_whole();
    refresh_base_attribute(role_base_1, role_status_1);
    refresh_attribute_equipments(role_status_1);
    refresh_attribute_sets(role_status_1);
    refresh_attribute_buffs(role_status_1);
    refresh_attribute_debuffs(role_status_1);
    refresh_battle_attribute(role_status_1, role_battle_1)
    role_battle_1.flag = "battle_1";
    if (role_health_1 > role_battle_1.max_health_value) {
        role_health_1 = role_battle_1.max_health_value;
    }
    role_battle_1.current_health_value = role_health_1;
    role_battle_1.current_shield_value = role_shield_1;
}

function fill_role_1_health() {
    role_health_1 = role_battle_1.max_health_value;
    role_battle_1.current_health_value = role_health_1;
}

function calculate_role_2(role_base) {
    role_base_2 = role_base;
    role_status_2 = new_role_whole();
    role_battle_2 = new_role_whole();
    refresh_base_attribute(role_base_2, role_status_2);
    refresh_attribute_equipments(role_status_2);
    refresh_attribute_sets(role_status_2);
    refresh_attribute_buffs(role_status_2);
    refresh_attribute_debuffs(role_status_2);
    refresh_battle_attribute(role_status_2, role_battle_2);
    role_battle_2.flag = "battle_2";
    if (role_health_2 > role_battle_2.max_health_value) {
        role_health_2 = role_battle_2.max_health_value;
    }
    role_battle_2.current_health_value = role_health_2;
    role_battle_2.current_shield_value = role_shield_2;
}

function fill_role_2_health() {
    role_health_2 = role_battle_2.max_health_value;
    role_battle_2.current_health_value = role_health_2;
}

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
 * 计算角色属性
 */
function refresh_base_attribute(role_base, role_status) {
    role_status.name = role_base.name;
    role_status.lvl = role_base.lvl;
    role_status.job = role_base.job;
    role_status.str = role_base.str;
    role_status.agi = role_base.agi;
    role_status.sta = role_base.sta;
    role_status.int = role_base.int;
    role_status.spr = role_base.spr;
    role_status.mastery_rate = role_base.lvl * mastery_per_lvl;
    role_status.buffs = role_base.buffs;
    role_status.debuffs = role_base.debuffs;
    role_status.dots = role_base.dots;
    role_status.equipments = role_base.equipments;
    role_status.items = role_base.items;
    role_status.skills = role_base.skills;
    role_status.hit = role_base.hit;
    role_status.money = role_base.money;
}

/**
 * 计算装备属性
 */
function refresh_attribute_equipments(role_status) {
    let battle_equipments = role_status.equipments;
    if (battle_equipments != null && battle_equipments.length > 0) {
        for (let i = 0; i < battle_equipments.length; i++) {
            let equipment = battle_equipments[i];
            equipment = create_equipment_by_model(equipment);
            if (role_status.lvl < equipment.c_lvl) {
                continue;
            }
            if (!check_can_equip(role_status, equipment)) {
                continue;
            }
            let effects = equipment.effect;
            for (let j = 0; j < effects.length; j++) {
                let effect = effects[j];
                eval("role_status." + effect);
            }
        }
    }
}

/**
 * 计算套装属性
 */
function refresh_attribute_sets(role_status) {
    let effects = get_set_effects(role_status);
    for (let j = 0; j < effects.length; j++) {
        let effect = effects[j];
        eval("role_status." + effect);
    }
}

/**
 * 计算增益属性
 */
function refresh_attribute_buffs(role_status) {
    let battle_buffs = role_status.buffs;
    if (battle_buffs != null && battle_buffs.length > 0) {
        for (let i = 0; i < battle_buffs.length; i++) {
            let buffs = battle_buffs[i];
            let effects = buffs.effect;
            for (let j = 0; j < effects.length; j++) {
                let effect = effects[j];
                eval("role_status." + effect);
            }
        }
    }
}

/**
 * 计算减益属性
 */
function refresh_attribute_debuffs(role_status) {
    let battle_debuffs = role_status.debuffs;
    if (battle_debuffs != null && battle_debuffs.length > 0) {
        for (let i = 0; i < battle_debuffs.length; i++) {
            let debuffs = battle_debuffs[i];
            let effects = debuffs.effect;
            for (let j = 0; j < effects.length; j++) {
                let effect = effects[j];
                eval("role_status." + effect);
            }
        }
    }
}

/**
 * 计算最终属性加成
 */
function refresh_battle_attribute(role_status, role_battle) {
    role_battle.name = role_status.name;
    role_battle.lvl = role_status.lvl;
    role_battle.job = role_status.job;
    role_battle.speed_move = role_status.speed_move;
    role_battle.speed_battle = role_status.speed_battle;
    role_battle.speed_resource = role_status.speed_resource;
    role_battle.buffs = role_status.buffs;
    role_battle.debuffs = role_status.debuffs;
    role_battle.dots = role_status.dots;
    role_battle.equipments = role_status.equipments;
    role_battle.items = role_status.items;
    role_battle.skills = role_status.skills;
    role_battle.hit = role_status.hit;
    role_battle.money = role_status.money;

    role_battle.str = Math.round((role_status.str + role_status.attr) * (role_status.str_percent + role_status.attr_percent) / 100);// 力量
    role_battle.str_percent = 100;
    role_battle.agi = Math.round((role_status.agi + role_status.attr) * (role_status.agi_percent + role_status.attr_percent) / 100);// 敏捷
    role_battle.agi_percent = 100;
    role_battle.sta = Math.round((role_status.sta + role_status.attr) * (role_status.sta_percent + role_status.attr_percent) / 100);// 耐力
    role_battle.sta_percent = 100;
    role_battle.int = Math.round((role_status.int + role_status.attr) * (role_status.int_percent + role_status.attr_percent) / 100);// 智力
    role_battle.int_percent = 100;
    role_battle.spr = Math.round((role_status.spr + role_status.attr) * (role_status.spr_percent + role_status.attr_percent) / 100);// 精神
    role_battle.spr_percent = 100;

    role_battle.attr = 0;
    role_battle.attr_percent = 0;

    role_battle.max_health_value = Math.round((role_status.max_health_value + role_battle.sta * sta_to_health_max) * role_status.health_percent / 100);// 最大生命值
    role_battle.health_percent = 100;

    role_battle.attack_power = Math.round((role_status.attack_power + role_battle.str * str_to_attack_power + role_battle.agi * agi_to_attack_power) * role_status.attack_power_percent / 100);// 攻击强度
    role_battle.attack_power_percent = 100;

    role_battle.magic_power = Math.round((role_status.magic_power + role_battle.int * int_to_magic_power + role_battle.spr * spr_to_magic_power) * role_status.magic_power_percent / 100);// 法术强度
    role_battle.magic_power_percent = 100;

    role_battle.heal_power = Math.round((role_status.heal_power + role_battle.spr * spr_to_heal_power) * role_status.heal_power_percent / 100);// 治疗强度
    role_battle.heal_power_percent = 100;

    role_battle.armor_attack = Math.round((role_status.armor_attack + role_status.armor_all + role_battle.sta * sta_to_armor_attack) * (role_status.armor_attack_percent + role_status.armor_all_percent) / 100);// 攻击护甲
    role_battle.armor_attack_percent = 100;
    role_battle.armor_magic = Math.round((role_status.armor_magic + role_status.armor_all + role_battle.spr * spr_to_armor_magic) * (role_status.armor_magic_percent + role_status.armor_all_percent) / 100);// 法术护甲
    role_battle.armor_magic_percent = 100;
    role_battle.armor_all = 0;
    role_battle.armor_all_percent = 0;

    role_battle.hit_rate = Math.round((role_status.hit_rate + role_battle.agi * agi_to_hit_rate + role_battle.int * int_to_hit_rate) * role_status.hit_rate_percent / 100);// 命中等级
    role_battle.hit_chance_final = role_status.hit_chance_final;// 最终命中率百分比
    role_battle.hit_rate_percent = 100;

    role_battle.critical_rate = Math.round((role_status.critical_rate + role_battle.agi * agi_to_critical_rate) * role_status.critical_rate_percent / 100);// 暴击等级
    role_battle.critical_chance_final = role_status.critical_chance_final;// 最终暴击率百分比
    role_battle.critical_rate_percent = 100;

    role_battle.critical_damage = Math.round(role_status.critical_damage + role_battle.int * int_to_critical_damage);// 暴击伤害系数

    role_battle.dodge_rate = Math.round((role_status.dodge_rate + role_battle.agi * agi_to_dodge_rate) * role_status.dodge_rate_percent / 100);// 闪避等级
    role_battle.dodge_chance_final = role_status.dodge_chance_final;// 最终闪避率百分比
    role_battle.dodge_rate_percent = 100;

    role_battle.haste_rate = Math.round(role_status.haste_rate * role_status.haste_rate_percent / 100);// 急速等级
    role_battle.haste_rate_percent = 100;

    role_battle.defend_rate = Math.round(role_status.defend_rate * role_status.defend_rate_percent / 100);// 防御等级
    role_battle.defend_rate_percent = 100;

    role_battle.mastery_rate = Math.round(role_status.mastery_rate * role_status.mastery_rate_percent / 100);// 精通等级
    role_battle.mastery_rate_percent = 100;

    role_battle.resilient_rate = Math.round(role_status.resilient_rate * role_status.resilient_rate_percent / 100);// 韧性等级
    role_battle.resilient_rate_percent = 100;

    role_battle.block_rate = Math.round(role_status.block_rate * role_status.block_rate_percent / 100);// 格挡等级
    role_battle.block_chance_final = role_status.block_chance_final;// 最终格挡率百分比
    role_battle.block_rate_percent = 100;

    role_battle.block_value = Math.round((role_status.block_value + role_battle.str * str_to_block_value) * role_status.block_value_percent / 100);// 格挡值
    role_battle.block_value_percent = 100;

    role_battle.damage_physical = role_status.damage_physical + role_status.damage_all;
    role_battle.damage_fire = role_status.damage_fire + role_status.damage_all;
    role_battle.damage_frost = role_status.damage_frost + role_status.damage_all;
    role_battle.damage_natural = role_status.damage_natural + role_status.damage_all;
    role_battle.damage_arcane = role_status.damage_arcane + role_status.damage_all;
    role_battle.damage_holy = role_status.damage_holy + role_status.damage_all;
    role_battle.damage_shadow = role_status.damage_shadow + role_status.damage_all;
    role_battle.damage_all = 0;

    role_battle.res_physical = role_status.res_physical + role_status.res_all;
    role_battle.res_fire = role_status.res_fire + role_status.res_all;
    role_battle.res_frost = role_status.res_frost + role_status.res_all;
    role_battle.res_natural = role_status.res_natural + role_status.res_all;
    role_battle.res_arcane = role_status.res_arcane + role_status.res_all;
    role_battle.res_holy = role_status.res_holy + role_status.res_all;
    role_battle.res_shadow = role_status.res_shadow + role_status.res_all;
    role_battle.damage_all = 0;

    role_battle.pierce_physical = role_status.pierce_physical + role_status.pierce_all;
    role_battle.pierce_fire = role_status.pierce_fire + role_status.pierce_all;
    role_battle.pierce_frost = role_status.pierce_frost + role_status.pierce_all;
    role_battle.pierce_natural = role_status.pierce_natural + role_status.pierce_all;
    role_battle.pierce_arcane = role_status.pierce_arcane + role_status.pierce_all;
    role_battle.pierce_holy = role_status.pierce_holy + role_status.pierce_all;
    role_battle.pierce_shadow = role_status.pierce_shadow + role_status.pierce_all;
    role_battle.damage_all = 0;

    role_battle.cause_damage_percent = role_status.cause_damage_percent;
    role_battle.taken_damage_percent = role_status.taken_damage_percent;
    role_battle.taken_heal_percent = role_status.taken_heal_percent;
}

/**
 * role深拷贝
 */
function copy_role(role) {
    let copy_role = {};

    copy_role.current_health_value = role.current_health_value;// 当前生命值
    copy_role.current_shield_value = role.current_shield_value;// 伤害护盾

    copy_role.name = role.name;
    copy_role.lvl = role.lvl;
    copy_role.job = role.job;
    copy_role.speed_move = role.speed_move;
    copy_role.speed_battle = role.speed_battle;
    copy_role.speed_resource = role.speed_resource;
    copy_role.buffs = role.buffs;
    copy_role.debuffs = role.debuffs;
    copy_role.dots = role.dots;
    copy_role.equipments = role.equipments;
    copy_role.items = role.items;
    copy_role.skills = role.skills;
    copy_role.hit = role.hit;
    copy_role.money = role.money;

    copy_role.str = role.str;// 力量
    copy_role.str_percent = role.str_percent;
    copy_role.agi = role.agi;// 敏捷
    copy_role.agi_percent = role.agi_percent;
    copy_role.sta = role.sta;// 耐力
    copy_role.sta_percent = role.sta_percent;
    copy_role.int = role.int;// 智力
    copy_role.int_percent = role.int_percent;
    copy_role.spr = role.spr;// 精神
    copy_role.spr_percent = role.spr_percent;

    copy_role.attr = role.attr;
    copy_role.attr_percent = role.attr_percent;

    copy_role.max_health_value = role.max_health_value;// 最大生命值
    copy_role.health_percent = role.health_percent;

    copy_role.attack_power = role.attack_power;// 攻击强度
    copy_role.attack_power_percent = role.attack_power_percent;

    copy_role.magic_power = role.magic_power;// 法术强度
    copy_role.magic_power_percent = role.magic_power_percent;

    copy_role.heal_power = role.heal_power;// 治疗强度
    copy_role.heal_power_percent = role.heal_power_percent;

    copy_role.armor_attack = role.armor_attack;// 攻击护甲
    copy_role.armor_attack_percent = role.armor_attack_percent;
    copy_role.armor_magic = role.armor_magic;// 法术护甲
    copy_role.armor_magic_percent = role.armor_magic_percent;
    copy_role.armor_all = role.armor_all;
    copy_role.armor_all_percent = role.armor_all_percent;

    copy_role.hit_rate = role.hit_rate;// 命中等级
    copy_role.hit_chance_final = role.hit_chance_final;// 最终命中率百分比
    copy_role.hit_rate_percent = role.hit_rate_percent;

    copy_role.critical_rate = role.critical_rate;// 暴击等级
    copy_role.critical_chance_final = role.critical_chance_final;// 最终暴击率百分比
    copy_role.critical_rate_percent = role.critical_rate_percent;

    copy_role.critical_damage = role.critical_damage;// 暴击伤害系数

    copy_role.dodge_rate = role.dodge_rate;// 闪避等级
    copy_role.dodge_chance_final = role.dodge_chance_final;// 最终闪避率百分比
    copy_role.dodge_rate_percent = role.dodge_rate_percent;

    copy_role.haste_rate = role.haste_rate;// 急速等级
    copy_role.haste_rate_percent = role.haste_rate_percent;

    copy_role.defend_rate = role.defend_rate;// 防御等级
    copy_role.defend_rate_percent = role.defend_rate_percent;

    copy_role.mastery_rate = role.mastery_rate;// 精通等级
    copy_role.mastery_rate_percent = role.mastery_rate_percent;

    copy_role.resilient_rate = role.resilient_rate;// 韧性等级
    copy_role.resilient_rate_percent = role.resilient_rate_percent;

    copy_role.block_rate = role.block_rate;// 格挡等级
    copy_role.block_chance_final = role.block_chance_final;// 最终格挡率百分比
    copy_role.block_rate_percent = role.block_rate_percent;

    copy_role.block_value = role.block_value;// 格挡值
    copy_role.block_value_percent = role.block_value_percent;

    copy_role.damage_physical = role.damage_physical;
    copy_role.damage_fire = role.damage_fire;
    copy_role.damage_frost = role.damage_frost;
    copy_role.damage_natural = role.damage_natural;
    copy_role.damage_arcane = role.damage_arcane;
    copy_role.damage_holy = role.damage_holy;
    copy_role.damage_shadow = role.damage_shadow;
    copy_role.damage_all = role.damage_all;

    copy_role.res_physical = role.res_physical;
    copy_role.res_fire = role.res_fire;
    copy_role.res_frost = role.res_frost;
    copy_role.res_natural = role.res_natural;
    copy_role.res_arcane = role.res_arcane;
    copy_role.res_holy = role.res_holy;
    copy_role.res_shadow = role.res_shadow;
    copy_role.res_all = role.res_all;

    copy_role.pierce_physical = role.pierce_physical;
    copy_role.pierce_fire = role.pierce_fire;
    copy_role.pierce_frost = role.pierce_frost;
    copy_role.pierce_natural = role.pierce_natural;
    copy_role.pierce_arcane = role.pierce_arcane;
    copy_role.pierce_holy = role.pierce_holy;
    copy_role.pierce_shadow = role.pierce_shadow;
    copy_role.pierce_all = role.pierce_all;

    copy_role.cause_damage_percent = role.cause_damage_percent;
    copy_role.taken_damage_percent = role.taken_damage_percent;
    copy_role.taken_heal_percent = role.taken_heal_percent;

    return copy_role;
}
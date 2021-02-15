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
    refresh_attribute_sets(role_status_1);
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

    role_battle.res_physical = role_status.res_physical + role_status.res_all;
    role_battle.res_fire = role_status.res_fire + role_status.res_all;
    role_battle.res_frost = role_status.res_frost + role_status.res_all;
    role_battle.res_natural = role_status.res_natural + role_status.res_all;
    role_battle.res_arcane = role_status.res_arcane + role_status.res_all;
    role_battle.res_holy = role_status.res_holy + role_status.res_all;
    role_battle.res_shadow = role_status.res_shadow + role_status.res_all;

    role_battle.pierce_physical = role_status.pierce_physical + role_status.pierce_all;
    role_battle.pierce_fire = role_status.pierce_fire + role_status.pierce_all;
    role_battle.pierce_frost = role_status.pierce_frost + role_status.pierce_all;
    role_battle.pierce_natural = role_status.pierce_natural + role_status.pierce_all;
    role_battle.pierce_arcane = role_status.pierce_arcane + role_status.pierce_all;
    role_battle.pierce_holy = role_status.pierce_holy + role_status.pierce_all;
    role_battle.pierce_shadow = role_status.pierce_shadow + role_status.pierce_all;

    role_battle.cause_damage_percent = role_status.cause_damage_percent;
    role_battle.taken_damage_percent = role_status.taken_damage_percent;
    role_battle.taken_heal_percent = role_status.taken_heal_percent;
}

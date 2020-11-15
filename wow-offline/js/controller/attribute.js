/** 战斗属性结算 **/

/**
 * 更新战斗状态
 */
function refresh_attribute(member, battle, flag) {
    new_base_attribute(battle);
    refresh_base_attribute(member, battle);
    refresh_attribute_equipments(member, flag);
    refresh_attribute_buffs(member, flag);
    refresh_attribute_debuffs(member, flag);
    refresh_battle_attribute(battle);
    if (battle_turn === 1) {
        battle.current_health_point = battle.health_point;// 初始化当前生命值
    }
    battle.flag = flag;// 设定敌我标识(防止同职业对战混淆)
    return battle;
}

/**
 * 计算角色属性
 * @param member
 * @param battle
 */
function refresh_base_attribute(member, battle) {
    battle.name = member.name;
    battle.lvl = member.lvl;
    battle.job = member.job;
    battle.str = member.str;
    battle.agi = member.agi;
    battle.sta = member.sta;
    battle.int = member.int;
    battle.spr = member.spr;
    battle.equipments = member.equipments;
    battle.skills = member.skills;
    battle.buffs = member.buffs;
    battle.debuffs = member.debuffs;
}

/**
 * 计算装备属性
 * @param member
 * @param flag
 */
function refresh_attribute_equipments(member, flag) {
    let battle_equipments = member.equipments;
    if (battle_equipments != null && battle_equipments.length > 0) {
        for (let i = 0; i < battle_equipments.length; i++) {
            let equipments = battle_equipments[i];
            for (let j = 0; j < equipments.length; j++) {
                let equipment = equipments[j];
                eval(flag + "." + equipment);
            }
        }
    }
}

/**
 * 计算增益属性
 * @param member
 * @param flag
 */
function refresh_attribute_buffs(member, flag) {
    let battle_buffs = member.buffs;
    if (battle_buffs != null && battle_buffs.length > 0) {
        for (let i = 0; i < battle_buffs.length; i++) {
            let buffs = battle_buffs[i];
            for (let j = 1; j < buffs.length; j++) {
                let buff = buffs[j];
                eval(flag + "." + buff);
            }
            // 剩余回合-1
            let turn_left = buffs[0];
            if (turn_left > 0) {
                turn_left--;
                if (turn_left === 0) {
                    battle_buffs.splice(i, 1);
                    i--;
                } else {
                    buffs[0] = turn_left;
                }
            }
        }
    }
}

/**
 * 计算减益属性
 * @param member
 * @param flag
 */
function refresh_attribute_debuffs(member, flag) {
    let battle_debuffs = member.debuffs;
    if (battle_debuffs != null && battle_debuffs.length > 0) {
        for (let i = 0; i < battle_debuffs.length; i++) {
            let debuffs = battle_debuffs[i];
            for (let j = 1; j < debuffs.length; j++) {
                let debuff = debuffs[j];
                eval(flag + "." + debuff);
            }
            let turn_left = debuffs[0];
            if (turn_left > 0) {
                turn_left--;
                if (turn_left === 0) {
                    battle_debuffs.splice(i, 1);
                    i--;
                } else {
                    debuffs[0] = turn_left;
                }
            }
        }
    }
}

/**
 * 计算最终属性加成
 * @param attribute
 * @return {{}}
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

    attribute.health_point = Math.round((attribute.health_point + attribute.sta * sta_to_health_max) * attribute.health_percent / 100);// 最大生命值
    attribute.health_percent = 100;

    attribute.attack_power = Math.round((attribute.attack_power + attribute.str * str_to_attack_power) * attribute.attack_power_percent / 100);// 攻击强度
    attribute.attack_power_percent = 100;
    attribute.magic_power = Math.round((attribute.magic_power+attribute.int * int_to_magic_power) * attribute.magic_power_percent / 100);// 法术强度
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
    attribute.armor_magic = Math.round((attribute.armor_magic+ attribute.spr * spr_to_armor_magic) * attribute.armor_magic_percent / 100);// 法术护甲
    attribute.armor_magic_percent = 100;
}

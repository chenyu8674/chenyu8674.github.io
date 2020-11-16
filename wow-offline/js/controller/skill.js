/** 技能结算 **/

let m_skill_states = [];// 技能状态存储

/**
 * 技能状态初始化
 */
function init_skill_states() {
    m_skill_states = [];
}

/**
 * 新建技能状态对象
 * @param flag 施放者标记
 * @param id 技能id
 * @param last_turn 上次施放回合
 * @return {{}}
 */
function skill_state(flag, id, last_turn) {
    let skill_state = {};
    skill_state.flag = flag;
    skill_state.id = id;
    skill_state.last_turn = last_turn;// 上次施放回合
    return skill_state;
}

/**
 * 注册技能状态
 * @param state
 */
function regist_skill_state(state) {
    m_skill_states[state.flag + state.id] = state;
}

/**
 * 获取技能状态
 * @param flag
 * @param id
 * @return {*}
 */
function get_skill_state(flag, id) {
    return m_skill_states[flag + id];
}

/**
 * 计算常规攻击
 * @param attacker 攻击者obj
 * @param target 目标obj
 * @param skill_name 技能名称
 * @param damage_percent 技能伤害系数
 * @param attack_type 攻击类型，1攻击（以攻击强度结算） 2法术（以法术强度结算）
 * @param element_type 元素类型，10物理 20火焰 30冰霜 40自然 50奥术 60神圣 70暗影
 * @param extra_hit 额外命中率
 * @param extra_critical 额外暴击率
 * @return damage 造成伤害
 * @return is_hit 是否命中
 * @return is_critical 是否暴击
 * @return block_value 格挡数值
 * @return absorb_value 吸收数值
 */
function normal_skill_attack(attacker, target, skill_name, damage_percent,
                             attack_type, element_type, extra_hit, extra_critical) {
    // 计算命中
    extra_hit = extra_hit == null ? 0 : extra_hit;
    let is_hit = Math.random() < calculate_hit(attacker, target) + extra_hit / 100;
    if (!is_hit) {
        battle_log(attacker.name + " 的 " + skill_name + " 未击中 " + target.name);
        return [0, is_hit, false, 0, 0];
    }
    /* 计算增减伤百分比 */
    let dmg;// 攻击者属性伤害百分比
    let res;// 目标属性减伤百分比
    let element;// 属性名称
    switch (element_type) {
        case element_none:
            dmg = 100;
            res = 0;
            element = "无属性";
            break;
        case element_chaos:
            dmg = 100;
            res = 0;
            element = "混乱";
            break;
        case element_physical:
            dmg = attacker.damage_physical;
            res = target.res_physical - attacker.pierce_physical;
            element = "物理";
            break;
        case element_fire:
            dmg = attacker.damage_fire;
            res = target.res_fire - attacker.pierce_fire;
            element = "火焰";
            break;
        case element_frost:
            dmg = attacker.damage_frost;
            res = target.res_frost - -attacker.pierce_frost;
            element = "冰霜";
            break;
        case element_natural:
            dmg = attacker.damage_natural;
            res = target.res_natural - -attacker.pierce_natural;
            element = "自然";
            break;
        case element_arcane:
            dmg = attacker.damage_arcane;
            res = target.res_arcane - -attacker.pierce_arcane;
            element = "奥术";
            break;
        case element_holy:
            dmg = attacker.damage_holy;
            res = target.res_holy - attacker.pierce_holy;
            element = "神圣";
            break;
        case element_dark:
            dmg = attacker.damage_dark;
            res = target.res_dark - attacker.pierce_dark;
            element = "暗影";
            break;
    }
    /* 基础伤害 */
    let damage;
    if (attack_type === type_attack) {
        damage = attacker.attack_power * dmg * damage_percent / 100 / 100;// 基础攻击伤害
        damage *= (1 - calculate_armor_attack(attacker, target));// 计算攻击护甲减伤
    } else {
        damage = attacker.magic_power * dmg * damage_percent / 100 / 100;// 基础法术伤害
        damage *= (1 - calculate_armor_magic(attacker, target));// 计算法术护甲减伤
    }
    // 伤害随机浮动(0.9~1.1)
    damage *= (0.9 + Math.random() * 0.2);
    // 计算暴击
    extra_critical = extra_critical == null ? 0 : extra_critical;
    let is_critical = Math.random() < calculate_critical(attacker, target) + extra_critical / 100;
    if (is_critical) {
        // 计算暴击加成
        damage *= attacker.critical_damage / 100;
    }
    // 计算属性减伤百分比
    damage = damage * (100 - res) / 100;
    // 计算全局受伤百分比
    damage = damage * target.taken_damage_percent / 100;
    if (damage < 0) {
        damage = 0;
    }
    // 计算格挡值
    let is_block = Math.random() < calculate_block(attacker, target);
    let block_value = target.block_value;
    if (is_block) {
        damage = damage - block_value;
        if (damage < 0) {
            block_value += damage;
            damage = 0;
        }
    }
    // 计算伤害吸收
    let absorb_value = 0;
    let shield_point = target.current_shield_point;
    if (damage > 0 && shield_point > 0) {
        if (damage > shield_point) {
            // 伤害吸收护盾被击穿
            damage -= shield_point;
            absorb_value = shield_point;
            target.current_shield_point = 0;
        } else {
            target.current_shield_point -= damage;
            absorb_value = damage;
            damage = 0;
        }
    }
    // 数值取整
    damage = Math.round(damage);
    block_value = Math.round(block_value);
    absorb_value = Math.round(absorb_value);
    // 输出伤害日志
    battle_log(attacker.name
        + " 的 " + skill_name
        + " 击中 " + target.name
        + " 造成 " + damage + " 点 " + element + " 伤害"
        + (is_critical ? " (暴击)" : "")
        + (is_block ? " (" + block_value + "点被格挡)" : "")
        + (absorb_value > 0 ? " (" + absorb_value + "点被吸收)" : "")
    );
    return [damage, is_hit, is_critical, block_value, absorb_value];
}

/**
 * 计算常规治疗
 * @param attacker 攻击者obj
 * @param target 目标obj
 * @param skill_name 技能名称
 * @param heal_percent 技能治疗系数
 * @param extra_critical 额外暴击率
 */
function normal_skill_heal(attacker, target, skill_name, heal_percent, extra_critical) {
    /* 基础治疗 */
    let heal = attacker.magic_power * heal_percent / 100;// 基础治疗
    if (heal < 0) {
        heal = 0;
    }
    // 治疗随机浮动(0.9~1.1)
    heal *= (0.9 + Math.random() * 0.2);
    // 计算暴击
    extra_critical = extra_critical == null ? 0 : extra_critical;
    let is_critical = Math.random() < calculate_critical(attacker, target) + extra_critical / 100;
    if (is_critical) {
        // 计算暴击加成
        heal *= attacker.critical_damage / 100;
    }
    // 计算全局治疗百分比
    heal = heal * attacker.taken_heal_percent / 100;
    // 数值取整
    heal = Math.round(heal);
    // 输出治疗日志
    battle_log(attacker.name
        + " 通过 " + skill_name
        + " 回复 " + heal + " 点生命"
        + (is_critical ? " (暴击)" : "")
    );
    return [heal, is_critical];
}

/**
 * 计算攻击护甲免伤
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_armor_attack(attacker, target) {
    let armor_point = target.armor_attack;
    // 护甲免伤公式：目标护甲值 / (目标护甲值 + 85 * 攻击者等级 + 400)
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

/**
 * 计算法术护甲免伤
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_armor_magic(attacker, target) {
    let armor_point = target.armor_magic;
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

/**
 * 计算命中率
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_hit(attacker, target) {
    let hit_rate = attacker.hit_rate;// 最终命中等级
    let dodge_rate = target.dodge_rate;// 最终闪避等级
    let hit_chance = (hit_rate * hit_coefficient / attacker.lvl + attacker.hit_chance_final);
    let dodge_chance = dodge_rate * dodge_coefficient / target.lvl + target.dodge_chance_final;
    hit_chance = (base_hit_chance + hit_chance - dodge_chance) / 100;
    if (show_detail_log) {
        battle_log("命中率：" + hit_chance * 100);
    }
    return hit_chance;
}

/**
 * 计算暴击率
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_critical(attacker, target) {
    let critical_rate = attacker.critical_rate;// 最终暴击等级
    let critical_chance = (critical_rate * critical_coefficient / attacker.lvl + attacker.critical_chance_final) / 100;
    if (show_detail_log) {
        battle_log("暴击率：" + critical_chance * 100);
    }
    return critical_chance;
}

/**
 * 计算格挡率
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_block(attacker, target) {
    let block_rate = target.block_rate;
    let block_chance = (block_rate * block_coefficient / target.lvl + target.block_chance_final) / 100;
    if (show_detail_log) {
        battle_log("格挡率：" + block_chance * 100);
    }
    return block_chance;
}
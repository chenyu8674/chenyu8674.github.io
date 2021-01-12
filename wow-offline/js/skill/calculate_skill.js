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
 * @return {{}}
 */
function skill_state(flag, id) {
    let skill_state = {};
    skill_state.flag = flag;
    skill_state.id = id;
    skill_state.last_turn = battle_turn;
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
 *
 * @param attacker 攻击者obj
 * @param target 目标obj
 * @param skill_name 技能名称
 * @param damage_percent 技能伤害系数
 * @param attack_type 攻击类型，1攻击（以攻击强度结算） 2法术（以法术强度结算）
 * @param element_type 元素类型，0无属性 10物理 20火焰 30冰霜 40自然 50奥术 60神圣 70暗影 99混乱
 * @param extra_hit 额外命中率
 * @param extra_critical 额外暴击率
 * @param extra_block 额外格挡率
 *
 * @return damage 造成伤害
 * @return attack_type 攻击类型，1攻击（以攻击强度结算） 2法术（以法术强度结算）
 * @return element_type 元素类型，0无属性 10物理 20火焰 30冰霜 40自然 50奥术 60神圣 70暗影 99混乱
 * @return is_hit 是否命中
 * @return is_critical 是否暴击
 * @return block_value 格挡数值
 * @return absorb_value 吸收数值
 */
function normal_skill_attack(attacker, target, skill_name, damage_percent, attack_type, element_type, extra_hit, extra_critical, extra_block, pierce_shield) {
    // 计算命中
    extra_hit = extra_hit == null ? 0 : extra_hit;
    let hit_chance = calculate_hit(attacker, target) + extra_hit / 100;
    if (show_hit_percent_in_log) {
        console.log(attacker.name + "->" + target.name + " " + skill_name + " 命中率：" + hit_chance * 100);
    }
    let is_hit = Math.random() < hit_chance;
    if (!is_hit) {
        let damage_obj = {};
        damage_obj.attacker_name = attacker.name;
        damage_obj.target_name = target.name;
        damage_obj.skill_name = skill_name;
        damage_obj.damage_value = 0;
        damage_obj.attack_type = attack_type;
        damage_obj.element_type = element_type;
        damage_obj.is_hit = false;
        damage_obj.is_critical = false;
        damage_obj.block_value = 0;
        damage_obj.absorb_value = 0;
        return damage_obj;
    }
    /* 计算增减伤百分比 */
    let dmg;// 攻击者属性伤害百分比
    let res;// 目标属性减伤百分比
    switch (element_type) {
        case element_none:
            dmg = 100;
            res = 0;
            break;
        case element_chaos:
            dmg = 100;
            res = 0;
            break;
        case element_physical:
            dmg = attacker.damage_physical;
            res = target.res_physical - attacker.pierce_physical;
            break;
        case element_fire:
            dmg = attacker.damage_fire;
            res = target.res_fire - attacker.pierce_fire;
            break;
        case element_frost:
            dmg = attacker.damage_frost;
            res = target.res_frost - -attacker.pierce_frost;
            break;
        case element_natural:
            dmg = attacker.damage_natural;
            res = target.res_natural - -attacker.pierce_natural;
            break;
        case element_arcane:
            dmg = attacker.damage_arcane;
            res = target.res_arcane - -attacker.pierce_arcane;
            break;
        case element_holy:
            dmg = attacker.damage_holy;
            res = target.res_holy - attacker.pierce_holy;
            break;
        case element_shadow:
            dmg = attacker.damage_shadow;
            res = target.res_shadow - attacker.pierce_shadow;
            break;
    }
    res = res > MAX_RES ? MAX_RES : res;
    // 基础伤害
    let damage_value;
    if (attack_type === type_attack) {
        damage_value = attacker.attack_power * dmg * damage_percent / 100 / 100;// 基础攻击伤害
        damage_value *= (1 - calculate_armor_attack(target));// 计算攻击护甲减伤
    } else {
        damage_value = attacker.magic_power * dmg * damage_percent / 100 / 100;// 基础法术伤害
        damage_value *= (1 - calculate_armor_magic(target));// 计算法术护甲减伤
    }
    // 伤害随机浮动(0.9~1.1)
    damage_value *= (0.9 + Math.random() * 0.2);
    // 每差1级，伤害浮动5%，范围50~200%
    let lvl_percent = (attacker.lvl - target.lvl) * 5;
    if (lvl_percent > 100) {
        lvl_percent = 100;
    }
    if (lvl_percent < -50) {
        lvl_percent = -50;
    }
    damage_value *= (100 + lvl_percent) / 100;
    // 计算暴击
    extra_critical = extra_critical == null ? 0 : extra_critical;
    let critical_chance = calculate_critical(attacker, target) + extra_critical / 100;
    if (show_critical_percent_in_log) {
        console.log(attacker.name + "->" + target.name + " " + skill_name + " 暴击率：" + critical_chance * 100);
    }
    let is_critical = Math.random() < critical_chance;
    if (is_critical) {
        // 计算暴击加成
        damage_value *= attacker.critical_damage / 100;
    }
    // 计算属性减伤百分比
    damage_value = damage_value * (100 - res) / 100;
    // 计算全局受伤百分比
    damage_value = damage_value * target.taken_damage_percent / 100;
    if (damage_value < 0) {
        damage_value = 0;
    }
    // 计算格挡值
    extra_block = extra_block == null ? 0 : extra_block;
    let block_chance = calculate_block(attacker, target) + extra_block / 100;
    if (show_block_percent_in_log) {
        console.log(attacker.name + "->" + target.name + " " + skill_name + " 格挡率：" + block_chance * 100);
    }
    let is_block = Math.random() < block_chance;
    let block_value = target.block_value;
    if (is_block) {
        damage_value = damage_value - block_value;
        if (damage_value < 0) {
            block_value += damage_value;
            damage_value = 0;
        }
    }
    damage_value = Math.round(damage_value);
    // 计算伤害吸收
    let absorb_value = 0;
    let shield_point = target.current_shield_value;
    if (pierce_shield) {
        shield_point = 0;
    }
    if (damage_value > 0 && shield_point > 0) {
        if (damage_value > shield_point) {
            // 伤害吸收护盾被击穿
            damage_value -= shield_point;
            absorb_value = shield_point;
            target.current_shield_value = 0;
        } else {
            target.current_shield_value -= damage_value;
            absorb_value = damage_value;
            damage_value = 0;
        }
    }
    // 数值取整
    block_value = Math.round(block_value);
    absorb_value = Math.round(absorb_value);
    // 生成结果
    let damage_obj = {};
    damage_obj.attacker_name = attacker.name;
    damage_obj.target_name = target.name;
    damage_obj.skill_name = skill_name;
    damage_obj.damage_value = damage_value;
    damage_obj.attack_type = attack_type;
    damage_obj.element_type = element_type;
    damage_obj.is_hit = is_hit;
    damage_obj.is_critical = is_critical;
    damage_obj.block_value = is_block ? block_value : 0;
    damage_obj.absorb_value = absorb_value;
    return damage_obj;
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
    let heal_value = attacker.magic_power * heal_percent / 100;// 基础治疗
    if (heal_value < 0) {
        heal_value = 0;
    }
    // 治疗随机浮动(0.9~1.1)
    heal_value *= (0.9 + Math.random() * 0.2);
    // 计算暴击
    extra_critical = extra_critical == null ? 0 : extra_critical;
    let is_critical = Math.random() < calculate_critical(attacker, target) + extra_critical / 100;
    if (is_critical) {
        // 计算暴击加成
        heal_value *= attacker.critical_damage / 100;
    }
    // 计算全局治疗百分比
    heal_value = heal_value * attacker.taken_heal_percent / 100;
    if (heal_value < 0) {
        heal_value = 0;
    }
    // 数值取整
    heal_value = Math.round(heal_value);
    // 生成结果
    let heal_obj = {};
    heal_obj.attacker_name = attacker.name;
    heal_obj.target_name = target.name;
    heal_obj.skill_name = skill_name;
    heal_obj.heal_value = heal_value;
    heal_obj.is_critical = is_critical;
    return heal_obj;
}

/**
 * 计算定值治疗
 * @param attacker
 * @param target
 * @param skill_name
 * @param heal_value
 * @return {{}}
 */
function flat_skill_heal(attacker, target, skill_name, heal_value) {
    if (heal_value <= 0) {
        heal_value = 0;
    }
    // 生成结果
    let heal_obj = {};
    heal_obj.attacker_name = attacker.name;
    heal_obj.target_name = target.name;
    heal_obj.skill_name = skill_name;
    heal_obj.heal_value = heal_value;
    heal_obj.is_critical = false;
    return heal_obj;
}

/**
 * 计算定值伤害护盾
 * @param attacker
 * @param target
 * @param skill_name
 * @param shield_value
 * @return {{}}
 */
function flat_skill_shield(attacker, target, skill_name, shield_value) {
    if (shield_value <= 0) {
        shield_value = 0;
    }
    // 生成结果
    let shield_obj = {};
    shield_obj.attacker_name = attacker.name;
    shield_obj.target_name = target.name;
    shield_obj.skill_name = skill_name;
    shield_obj.shield_value = shield_value;
    return shield_obj;
}

/**
 * 计算攻击护甲免伤
 * 护甲免伤公式：目标护甲值 / (目标护甲值 + 85 * 等级 + 400)
 * @param target
 * @return {number}
 */
function calculate_armor_attack(target) {
    let armor_point = target.armor_attack;
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

/**
 * 计算法术护甲免伤
 * 护甲免伤公式：目标护甲值 / (目标护甲值 + 85 * 等级 + 400)
 * @param target
 * @return {number}
 */
function calculate_armor_magic(target) {
    let armor_point = target.armor_magic;
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

/**
 * 计算原始命中率
 * @param attacker
 * @return {number}
 */
function calculate_original_hit(attacker) {
    return attacker.hit_rate * hit_coefficient / (attacker.lvl + 5) + attacker.hit_chance_final;
}

/**
 * 计算最终命中率
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_hit(attacker, target) {
    let hit_chance = calculate_original_hit(attacker);
    let dodge_chance = calculate_original_dodge(target);
    let lvl_chance = (attacker.lvl - target.lvl) * 3;// 每差1级，命中率浮动3%
    if (lvl_chance > 30) {
        lvl_chance = 30;
    }
    return (hit_chance - dodge_chance + lvl_chance) / 100;
}

/**
 * 计算原始躲闪率
 * @param target
 * @return {number}
 */
function calculate_original_dodge(target) {
    return target.dodge_rate * dodge_coefficient / (target.lvl + 5) + target.dodge_chance_final;
}

/**
 * 计算原始暴击率
 * @param attacker
 * @return {number}
 */
function calculate_original_critical(attacker) {
    return attacker.critical_rate * critical_coefficient / (attacker.lvl + 5) + attacker.critical_chance_final;
}

/**
 * 计算暴击率
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_critical(attacker, target) {
    let lvl_chance = (attacker.lvl - target.lvl) * 3;// 每差1级，暴击率浮动3%
    if (lvl_chance > 30) {
        lvl_chance = 30;
    }
    return (calculate_original_critical(attacker) + lvl_chance) / 100;
}

/**
 * 计算原始格挡率
 * @param target
 * @return {number}
 */
function calculate_original_block(target) {
    if (!has_equip_shield(target)) {
        return 0;
    } else {
        return target.block_rate * block_coefficient / (target.lvl + 5) + target.block_chance_final;
    }
}

/**
 * 计算格挡率
 * @param attacker
 * @param target
 * @return {number}
 */
function calculate_block(attacker, target) {
    if (!has_equip_shield(target)) {
        return 0;
    } else {
        let lvl_chance = (target.lvl - attacker.lvl) * 3;// 每差1级，格挡率浮动3%
        if (lvl_chance > 30) {
            lvl_chance = 30;
        }
        return (calculate_original_block(target) + lvl_chance) / 100;
    }
}

/**
 * 计算原始精通数值
 * @param attacker
 * @return {number}
 */
function calculate_original_mastery(attacker) {
    return attacker.mastery_rate * mastery_coefficient[attacker.job] / attacker.lvl;
}

/**
 * 计算原始坚韧数值
 * @param attacker
 * @return {number}
 */
function calculate_original_resilient(attacker) {
    return attacker.resilient_rate * resilient_coefficient / attacker.lvl;
}

/**
 * 判断技能是否冷却中
 * @param attacker
 * @param skill
 */
function skill_in_cd(attacker, skill) {
    if (skill.first_turn != null && battle_turn < skill.first_turn) {
        return true;// 未到首次施放回合
    }
    let skill_state = get_skill_state(attacker.flag, skill.id);
    let cooldown = skill.cooldown != null ? skill.cooldown : 1;
    return (skill_state != null && battle_turn - skill_state.last_turn < cooldown);
}

/**
 * 生成技能结果对象
 * @param damage_list 伤害对象列表
 * @param heal_list 治疗对象列表
 * @param shield_list 护盾对象列表
 * @return {{}}
 */
function skill_cast_result(damage_list, heal_list, shield_list) {
    if (damage_list == null) {
        damage_list = [];
    } else if (typeof (damage_list.length) == "undefined") {
        damage_list = [damage_list];
    }
    if (heal_list == null) {
        heal_list = [];
    } else if (typeof (heal_list.length) == "undefined") {
        heal_list = [heal_list];
    }
    if (shield_list == null) {
        shield_list = [];
    } else if (typeof (shield_list.length) == "undefined") {
        shield_list = [shield_list];
    }
    let skill_cast_result = {};
    skill_cast_result.damage_list = damage_list;
    skill_cast_result.heal_list = heal_list;
    skill_cast_result.shield_list = shield_list;
    return skill_cast_result;
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
 * 获取元素种类名称
 * @param element_type
 */
function get_element_name(element_type) {
    switch (element_type) {
        case element_none:
            return "无属性";
        case element_chaos:
            return "混乱";
        case element_physical:
            return "物理";
        case element_fire:
            return "火焰";
        case element_frost:
            return "冰霜";
        case element_natural:
            return "自然";
        case element_arcane:
            return "奥术";
        case element_holy:
            return "神圣";
        case element_shadow:
            return "暗影";
    }
}
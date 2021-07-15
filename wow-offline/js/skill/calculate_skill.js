/** 技能结算 **/

/**
 * 计算技能施放结果
 *
 * @param attacker         施放者对象
 * @param target           被施放者对象
 * @param skill_name       技能名称
 * @param damage_percent   技能伤害系数
 * @param attack_type      攻击类型，1攻击（以攻击强度结算） 2法术（以法术强度结算） 3治疗（以治疗强度结算）
 * @param element_type     元素类型，0无属性 10物理 20火焰 30冰霜 40自然 50奥术 60神圣 70暗影 99混乱
 * @param extra_hit        额外命中率
 * @param extra_critical   额外暴击率
 * @param extra_block      额外格挡率
 * @param is_pierce_shield 是否无视护盾
 *
 * @return attacker_name 施放者名称
 * @return target_name   被施放者名称
 * @return skill_name    技能名称
 * @return attack_type   攻击类型
 * @return element_type  元素类型
 * @return is_hit        是否命中
 * @return is_critical   是否暴击
 * @return damage_value  造成伤害数值
 * @return block_value   被格挡数值
 * @return absorb_value  被吸收数值
 */
function calculate_skill(
    attacker, target, skill_name, damage_percent, attack_type, element_type,
    extra_hit = 0, extra_critical = 0, extra_block = 0, is_pierce_shield = false) {
    // 使用深拷贝对象进行计算
    let calculate_target = copy_role(target);
    calculate_role_before(attacker, calculate_target);
    // 是否命中，混乱伤害必定命中
    let hit_chance = calculate_hit(attacker, calculate_target) + extra_hit;
    if (show_hit_percent_in_log) {
        console.log(attacker.name + "->" + calculate_target.name + " " + skill_name + " 命中率：" + hit_chance);
    }
    let is_hit = element_type === element_chaos ? true : random_percent(hit_chance);
    // 是否暴击
    let critical_chance = calculate_critical(attacker, calculate_target) + extra_critical;
    if (show_critical_percent_in_log) {
        console.log(attacker.name + "->" + calculate_target.name + " " + skill_name + " 暴击率：" + critical_chance);
    }
    let is_critical = random_percent(critical_chance);
    is_critical = is_hit && is_critical;
    // 是否格挡，混乱伤害无法格挡
    let block_chance = element_type === element_chaos ? false : calculate_block(attacker, calculate_target) + extra_block;
    if (show_block_percent_in_log) {
        console.log(attacker.name + "->" + calculate_target.name + " " + skill_name + " 格挡率：" + block_chance);
    }
    let is_block = random_percent(block_chance);
    // 是否穿透护盾，混乱伤害穿透护盾
    is_pierce_shield = element_type === element_chaos || is_pierce_shield;
    // 执行计算
    let result_obj = calculate_skill_result(attacker, calculate_target, skill_name, damage_percent, attack_type, element_type, is_hit, is_critical, is_block, is_pierce_shield);
    // 设置血量和护盾值
    target.current_health_value -= result_obj.damage_value;
    if (target.current_health_value < 0) {
        target.current_health_value = 0;
    }
    target.current_shield_value -= result_obj.absorb_value;
    return result_obj;
}

/**
 * 计算定值伤害施放结果
 */
function calculate_flat_damage(attacker, target, skill_name, damage_value, attack_type, element_type) {
    // 使用深拷贝对象进行计算
    let calculate_target = copy_role(target);
    calculate_role_before(attacker, calculate_target);
    if (damage_value < 0) {
        damage_value = 0;
    }
    // 数值取整
    damage_value = Math.round(damage_value);
    // 生成结果
    let result_obj = {};
    result_obj.attacker_name = attacker.name;
    result_obj.target_name = target.name;
    result_obj.skill_name = skill_name;
    result_obj.attack_type = attack_type;
    result_obj.element_type = element_type;
    result_obj.is_hit = true;
    result_obj.is_critical = false;
    result_obj.damage_value = damage_value;
    result_obj.block_value = false;
    result_obj.absorb_value = false;
    // 输出日志
    damage_log(result_obj);
    // 设置血量和护盾值
    target.current_health_value -= result_obj.damage_value;
    if (target.current_health_value < 0) {
        target.current_health_value = 0;
    }
    target.current_shield_value -= result_obj.absorb_value;
    return result_obj;
}

/**
 * 计算DOT施放结果
 */
function calculate_dot(attacker, target, skill_name, damage_percent, attack_type, element_type) {
    // 使用深拷贝对象进行计算
    let calculate_target = copy_role(target);
    calculate_role_before(attacker, calculate_target);
    // 是否命中
    let is_hit = true;
    // 是否暴击
    let critical_chance = calculate_critical(attacker, calculate_target);
    if (show_critical_percent_in_log) {
        console.log(attacker.name + "->" + calculate_target.name + " " + skill_name + " 暴击率：" + critical_chance);
    }
    let is_critical = random_percent(critical_chance);
    is_critical = is_hit && is_critical;
    // 是否格挡
    let is_block = false;
    // 是否穿透护盾，混乱伤害穿透护盾
    let is_pierce_shield = element_type === element_chaos;
    // 执行计算
    let result_obj = calculate_skill_result(attacker, calculate_target, skill_name, damage_percent, attack_type, element_type, true, is_critical, is_block, is_pierce_shield, true);
    // 设置血量和护盾值
    target.current_health_value -= result_obj.damage_value;
    if (target.current_health_value < 0) {
        target.current_health_value = 0;
    }
    target.current_shield_value -= result_obj.absorb_value;
    return result_obj;
}

/**
 * 受攻击前动态更新角色状态
 */
function calculate_role_before(attacker, target) {
    let hit_list = target.hit;
    if (hit_list != null) {
        for (let i = 0; i < hit_list.length; i++) {
            let hit = hit_list[i];
            if (hit.before != null) {
                hit.before(attacker, target);
            }
        }
    }
}

/**
 * 受攻击后动态更新角色状态
 */
function calculate_role_after(attacker, target, skill_result) {
    let hit_list = target.hit;
    if (hit_list != null) {
        for (let i = 0; i < hit_list.length; i++) {
            let hit = hit_list[i];
            if (hit.after != null) {
                hit.after(attacker, target, skill_result);
            }
        }
    }
}

/**
 * 计算技能效果
 */
function calculate_skill_result(
    attacker, target, skill_name, damage_percent, attack_type, element_type,
    is_hit, is_critical, is_block, is_pierce_shield, is_dot = false) {
    let damage_value = 0;
    let block_value = 0;
    let absorb_value = 0;
    if (is_hit) {
        /* 计算增减伤百分比 */
        let dmg;// 攻击者属性伤害百分比
        let res;// 目标属性减伤百分比
        switch (element_type) {
            case element_none:
                dmg = 100;
                res = 0;
                break;
            // 混乱伤害使用所有类型的伤害加成
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
                res = target.res_frost - attacker.pierce_frost;
                break;
            case element_natural:
                dmg = attacker.damage_natural;
                res = target.res_natural - attacker.pierce_natural;
                break;
            case element_arcane:
                dmg = attacker.damage_arcane;
                res = target.res_arcane - attacker.pierce_arcane;
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
        // 基础伤害，混乱伤害无视护甲
        if (attack_type === type_attack) {
            damage_value = attacker.attack_power * damage_percent / 100;// 基础攻击伤害
            if (element_type !== element_chaos) {
                damage_value *= (1 - calculate_armor_attack(target));// 计算攻击护甲减伤
            }
        } else if (attack_type === type_magic) {
            damage_value = attacker.magic_power * damage_percent / 100;// 基础法术伤害
            if (element_type !== element_chaos) {
                damage_value *= (1 - calculate_armor_magic(target));// 计算法术护甲减伤
            }
        } else if (attack_type === type_heal) {
            damage_value = attacker.heal_power * damage_percent / 100;// 基础治疗伤害
            if (element_type !== element_chaos) {
                damage_value *= (1 - calculate_armor_magic(target));// 计算法术护甲减伤
            }
        }
        // 计算属性减伤百分比
        damage_value *= (dmg - res) / 100;
        // 随机浮动(0.9~1.1)
        damage_value *= 1 + Math.random() * 0.1 - Math.random() * 0.1;
        // 每差1级，伤害浮动3%，范围50~200%
        let lvl_percent = (attacker.lvl - target.lvl) * damage_chance_per_lvl;
        if (lvl_percent > 100) {
            damage_value *= 2;
        } else if (lvl_percent < -50) {
            damage_value *= 0.5;
        } else {
            damage_value *= (100 + lvl_percent) / 100;
        }
        // 计算韧性减伤
        if (is_dot && element_type !== element_chaos) {
            damage_value = damage_value * (100 - calculate_original_resilient_dot(target)) / 100;
        }
        // 计算全局受伤百分比
        damage_value *= target.taken_damage_percent / 100;
        // 整体伤害（仅NPC）
        damage_value *= attacker.cause_damage_percent / 100;
        // 计算暴击
        if (is_critical) {
            let critical_damage = attacker.critical_damage;
            critical_damage = 100 + (critical_damage - 100) * (100 - calculate_original_resilient_cri(target)) / 100;
            damage_value *= critical_damage / 100;
        }
        if (damage_value < 0) {
            damage_value = 0;
        }
        // 计算格挡
        if (is_block) {
            block_value = target.block_value;
            damage_value = damage_value - block_value;
            if (damage_value < 0) {
                block_value += damage_value;
                damage_value = 0;
            }
        }
        // 计算伤害吸收
        let shield_point = is_pierce_shield ? 0 : target.current_shield_value;
        absorb_value = damage_value > shield_point ? shield_point : damage_value;
        damage_value -= absorb_value;
        // 数值取整
        damage_value = Math.round(damage_value);
        block_value = Math.round(block_value);
        absorb_value = Math.round(absorb_value);
    }
    // 生成结果
    let result_obj = {};
    result_obj.attacker_name = attacker.name;
    result_obj.target_name = target.name;
    result_obj.skill_name = skill_name;
    result_obj.attack_type = attack_type;
    result_obj.element_type = element_type;
    result_obj.is_hit = is_hit;
    result_obj.is_critical = is_critical;
    result_obj.damage_value = damage_value;
    result_obj.block_value = block_value;
    result_obj.absorb_value = absorb_value;
    // 输出日志
    if (is_dot) {
        dot_log(result_obj)
    } else if (is_hit) {
        damage_log(result_obj);
    } else {
        miss_log(result_obj);
    }
    return result_obj;
}

/**
 * 计算治疗施放结果
 */
function calculate_heal(attacker, target, skill_name, heal_percent, attack_type, element_type, extra_critical = 0) {
    // 使用深拷贝对象进行计算
    let calculate_target = copy_role(target);
    calculate_role_before(attacker, calculate_target);
    // 是否暴击
    let critical_chance = calculate_critical(attacker, calculate_target) + extra_critical;
    if (show_critical_percent_in_log) {
        console.log(attacker.name + "->" + calculate_target.name + " " + skill_name + " 暴击率：" + critical_chance);
    }
    let is_critical = random_percent(critical_chance);
    // 执行计算
    let result_obj = calculate_heal_result(attacker, calculate_target, skill_name, heal_percent, attack_type, element_type, is_critical);
    // 设置血量
    target.current_health_value += result_obj.heal_value;
    if (target.current_health_value > target.max_health_value) {
        target.current_health_value = target.max_health_value;
    }
    return result_obj;
}

/**
 * 计算HOT施放结果
 */
function calculate_hot(attacker, target, skill_name, heal_percent, attack_type, element_type) {
    // 使用深拷贝对象进行计算
    let calculate_target = copy_role(target);
    calculate_role_before(attacker, calculate_target);
    // 是否暴击
    let critical_chance = calculate_critical(attacker, calculate_target);
    if (show_critical_percent_in_log) {
        console.log(attacker.name + "->" + calculate_target.name + " " + skill_name + " 暴击率：" + critical_chance);
    }
    let is_critical = random_percent(critical_chance);
    // 执行计算
    let result_obj = calculate_heal_result(attacker, calculate_target, skill_name, heal_percent, attack_type, element_type, is_critical, true);
    // 设置血量
    target.current_health_value += result_obj.heal_value;
    if (target.current_health_value > target.max_health_value) {
        target.current_health_value = target.max_health_value;
    }
    return result_obj;
}

/**
 * 计算治疗效果
 */
function calculate_heal_result(attacker, target, skill_name, heal_percent, attack_type, element_type, is_critical, is_hot = false) {
    let heal_value;
    if (attack_type === type_attack) {
        heal_value = attacker.attack_power * heal_percent / 100;
    } else if (attack_type === type_magic) {
        heal_value = attacker.magic_power * heal_percent / 100;
    } else {
        heal_value = attacker.heal_power * heal_percent / 100;
    }
    // 随机浮动(0.9~1.1)
    heal_value *= 1 + Math.random() * 0.1 - Math.random() * 0.1;
    // 计算暴击
    if (is_critical) {
        heal_value *= attacker.critical_damage / 100;
    }
    // 计算全局治疗百分比
    heal_value *= target.taken_heal_percent / 100;
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
    if (is_hot) {
        hot_log(heal_obj)
    } else {
        heal_log(heal_obj);
    }
    return heal_obj;
}

/**
 * 计算定值治疗施放结果
 */
function calculate_flat_heal(attacker, target, skill_name, heal_value) {
    // 使用深拷贝对象进行计算
    let calculate_target = copy_role(target);
    calculate_role_before(attacker, calculate_target);
    // 计算全局治疗百分比
    heal_value *= calculate_target.taken_heal_percent / 100;
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
    heal_obj.is_critical = false;
    // 结算治疗，输出日志
    heal_log(heal_obj);
    if (heal_value > 0) {
        target.current_health_value += heal_value;
        if (target.current_health_value > target.max_health_value) {
            target.current_health_value = target.max_health_value;
        }
    }
    return heal_obj;
}

/**
 * 计算定值护盾施放结果
 */
function calculate_flat_shield(attacker, target, skill_name, shield_value) {
    if (shield_value < 0) {
        shield_value = 0;
    }
    // 生成结果
    let shield_obj = {};
    shield_obj.attacker_name = attacker.name;
    shield_obj.target_name = target.name;
    shield_obj.skill_name = skill_name;
    shield_obj.shield_value = shield_value;
    // 结算护盾，输出日志
    shield_log(shield_obj);
    if (shield_value > 0) {
        target.current_shield_value += shield_value;
    }
    return shield_obj;
}

/**
 * 计算攻击护甲免伤
 * 护甲免伤公式：目标护甲值 / (目标护甲值 + 85 * 等级 + 400)
 */
function calculate_armor_attack(target) {
    let armor_point = target.armor_attack;
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

/**
 * 计算法术护甲免伤
 * 护甲免伤公式：目标护甲值 / (目标护甲值 + 85 * 等级 + 400)
 */
function calculate_armor_magic(target) {
    let armor_point = target.armor_magic;
    return armor_point / (armor_point + 85 * target.lvl + 400);
}

/**
 * 计算原始命中率
 */
function calculate_original_hit(attacker) {
    let original_hit = attacker.hit_rate * hit_coefficient / (attacker.lvl + 5) + attacker.hit_chance_final;
    if (has_equip_two_weapons(attacker)) {
        original_hit -= TWO_HAND_HIT_DECREASE;
    }
    return original_hit;
}

/**
 * 计算最终命中率
 */
function calculate_hit(attacker, target) {
    let hit_chance = calculate_original_hit(attacker);
    let dodge_chance = calculate_original_dodge(target);
    let lvl_chance = (attacker.lvl - target.lvl) * hit_chance_per_lvl;
    if (lvl_chance > 30) {
        lvl_chance = 30;
    }
    if (lvl_chance < -30) {
        lvl_chance = -30;
    }
    return hit_chance - dodge_chance + lvl_chance;
}

/**
 * 计算原始躲闪率
 */
function calculate_original_dodge(target) {
    return target.dodge_rate * dodge_coefficient / (target.lvl + 5) + target.dodge_chance_final;
}

/**
 * 计算原始暴击率
 */
function calculate_original_critical(attacker) {
    return attacker.critical_rate * critical_coefficient / (attacker.lvl + 5) + attacker.critical_chance_final;
}

/**
 * 计算最终暴击率
 */
function calculate_critical(attacker, target) {
    let lvl_chance = (attacker.lvl - target.lvl) * critical_chance_per_lvl;
    if (lvl_chance > 30) {
        lvl_chance = 30;
    }
    if (lvl_chance < -30) {
        lvl_chance = -30;
    }
    return calculate_original_critical(attacker) + lvl_chance;
}

/**
 * 计算原始格挡率
 */
function calculate_original_block(target) {
    if (!has_equip_shield(target)) {
        return 0;
    } else {
        return target.block_rate * block_coefficient / (target.lvl + 5) + target.block_chance_final;
    }
}

/**
 * 计算最终格挡率
 */
function calculate_block(attacker, target) {
    if (!has_equip_shield(target)) {
        return 0;
    } else {
        let original_block = calculate_original_block(target);
        if (original_block > 0) {
            let lvl_chance = (target.lvl - attacker.lvl) * block_chance_per_lvl;
            if (lvl_chance > 30) {
                lvl_chance = 30;
            }
            if (lvl_chance < -30) {
                lvl_chance = -30;
            }
            return original_block + lvl_chance;
        } else {
            return original_block;
        }
    }
}

/**
 * 计算原始精通数值
 */
function calculate_original_mastery(attacker) {
    return attacker.mastery_rate * mastery_coefficient[attacker.job] / mastery_per_lvl / attacker.lvl;
}

/**
 * 计算原始坚韧数值（DOT）
 */
function calculate_original_resilient_dot(attacker) {
    return attacker.resilient_rate * resilient_coefficient / attacker.lvl;
}

/**
 * 计算原始坚韧数值（暴击）
 */
function calculate_original_resilient_cri(attacker) {
    return resilient_multiple * attacker.resilient_rate * resilient_coefficient / attacker.lvl;
}

/**
 * 判断技能是否冷却中
 */
function skill_in_cd(attacker, skill) {
    if (skill.first_turn != null && battle_turn < skill.first_turn) {
        return true;// 未到首次施放回合
    }
    let skill_state = get_skill_state(attacker.flag, skill.name);
    let cooldown = skill.cooldown != null ? skill.cooldown : 1;
    return (skill_state != null && battle_turn - skill_state.last_turn < cooldown);
}

/**
 * 生成技能结果对象
 * @param damage_list 伤害对象列表
 * @param heal_list   治疗对象列表
 * @param shield_list 护盾对象列表
 */
function skill_cast_result(damage_list = [], heal_list = [], shield_list = []) {
    if (damage_list == null) {
        damage_list = [];
    }
    if (heal_list == null) {
        heal_list = [];
    }
    if (shield_list == null) {
        shield_list = [];
    }
    if (typeof (damage_list.length) == "undefined") {
        damage_list = [damage_list];
    }
    if (typeof (heal_list.length) == "undefined") {
        heal_list = [heal_list];
    }
    if (typeof (shield_list.length) == "undefined") {
        shield_list = [shield_list];
    }
    let skill_result = {};
    skill_result.damage_list = damage_list;
    skill_result.heal_list = heal_list;
    skill_result.shield_list = shield_list;
    return skill_result;
}

/**
 * 判断技能造成伤害的次数
 */
function get_damage_count(skill_result) {
    let damage_list = skill_result.damage_list;
    let damage_count = false;
    for (let i = 0; i < damage_list.length; i++) {
        let damage = damage_list[i];
        if (damage.is_hit) {
            damage_count++;
        }
    }
    return damage_count;
}

/**
 * 技能状态存储
 */
let m_skill_states = [];

/**
 * 技能状态初始化
 */
function init_skill_states() {
    m_skill_states = [];
}

/**
 * 新建技能状态对象
 */
function skill_state(flag, name) {
    let skill_state = {};
    skill_state.flag = flag;
    skill_state.name = name;
    skill_state.last_turn = battle_turn;
    return skill_state;
}

/**
 * 注册技能状态
 */
function regist_skill_state(state) {
    m_skill_states[state.flag + state.name] = state;
}

/**
 * 获取技能状态
 */
function get_skill_state(flag, name) {
    return m_skill_states[flag + name];
}

/**
 * 增加技能资源点数
 */
function add_skill_point(attacker, point) {
    if (m_skill_states[attacker.flag + "point"] == null) {
        m_skill_states[attacker.flag + "point"] = point;
    } else {
        m_skill_states[attacker.flag + "point"] += point;
    }
}

/**
 * 设置技能资源点数
 */
function set_skill_point(attacker, point) {
    m_skill_states[attacker.flag + "point"] = point;
}

/**
 * 获取技能资源点数
 */
function get_skill_point(attacker) {
    if (m_skill_states[attacker.flag + "point"] == null) {
        return 0;
    }
    return m_skill_states[attacker.flag + "point"];
}

/**
 * 获取生命值损失比例加成
 * 100%生命->0%
 * 20%生命->100%
 */
function get_health_lack_percent(role) {
    let damage_percent = role.current_health_value / role.max_health_value;
    if (damage_percent < 0.2) {
        damage_percent = 0.2;
    }
    return (1 - damage_percent) / 0.8;
}

/**
 * 获取元素种类名称
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
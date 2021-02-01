/** 战斗控制 **/

let battle_timer = -1;// 回合标识
let turn_time = TURN_TIME;// 回合时间

let battle_time = 1;// 战斗进行次数
let battle_turn = 1;// 当前回合数

let turn_callback;// 回合完成回调
let battle_callback;// 战斗完成回调

/**
 * 是否处于战斗中
 */
function is_in_battle() {
    return battle_callback != null;
}

/**
 * 战斗初始化
 * @param role_1
 * @param role_2
 * @param t_callback
 * @param b_callback
 */
function start_battle(role_1, role_2, t_callback, b_callback) {
    // 战斗初始化
    battle_turn = 1;
    turn_callback = t_callback;
    battle_callback = b_callback;
    init_skill_states();
    // 状态初始化
    role_base_1 = role_1;
    role_base_2 = role_2;
    // 开始回合循环
    clearTimeout(battle_timer);
    battle_timer = setTimeout(turn_loop, 0);
}

/**
 * 技能排序
 * @param role
 */
function sort_role_skills(role) {
    // 删除空技能
    for (let i = 0; i < role.skills.length; i++) {
        if (role.skills[i] == null) {
            role.skills.splice(i, 1);
            i--;
        }
    }
    // 随机打乱技能
    role.skills.sort(function () {
        return Math.random() - 0.5;
    });
    // 技能按优先级排序
    role.skills.sort(function (a, b) {
        let priority_a = a.priority != null ? a.priority : 20;
        let priority_b = b.priority != null ? b.priority : 20;
        return priority_b - priority_a;
    });
}

/**
 * 回合循环
 * @returns {boolean} 战斗是否结束
 */
function turn_loop() {
    battle_log("");
    battle_log("第 " + battle_turn + " 回合");
    // 更新角色属性状态
    calculate_role_1(role_base_1);
    calculate_role_2(role_base_2);
    reduce_role_buffs_and_debuffs(role_base_1);
    reduce_role_buffs_and_debuffs(role_base_2);
    // 更新生命/护盾值
    role_battle_1.current_health_value = role_health_1;
    role_battle_1.current_shield_value = role_shield_1;
    if (battle_turn === 1) {
        if (in_test_mode) {
            role_health_1 = role_battle_1.max_health_value;
            role_shield_1 = 0;
            role_battle_1.current_health_value = role_battle_1.max_health_value;
        }
        role_battle_2.current_health_value = role_battle_2.max_health_value;
    } else {
        role_battle_2.current_health_value = role_health_2;
        role_battle_2.current_shield_value = role_shield_2;
    }
    // 首回合输出双方战斗状态
    if (is_in_local_mode()) {
        if (in_test_mode && battle_turn === 1) {
            if (win_count_1 + win_count_2 === 0) {
                console.log(role_battle_1);
                console.log(role_battle_2);
            }
        } else {
            console.log("===== " + battle_turn)
            console.log(role_battle_1);
            console.log(role_battle_2);
        }
    }
    // 记录胜负
    let winner = 0;
    // 判断敌我施放技能
    let cast_skill_1 = get_cast_skill(role_battle_1, role_battle_2);
    let cast_skill_2 = get_cast_skill(role_battle_2, role_battle_1);
    // 判断出手顺序
    let role_1_first;
    if (cast_skill_1.speed !== cast_skill_2.speed) {
        role_1_first = cast_skill_1.speed > cast_skill_2.speed;
    } else {
        role_1_first = random_percent(100 * Math.pow(role_battle_1.agi, 2) / (Math.pow(role_battle_1.agi, 2) + Math.pow(role_battle_2.agi, 2)));
    }
    // 计算dot伤害
    if (role_1_first) {
        if (winner === 0 && refresh_dots(role_battle_1, role_battle_2)) {
            winner = 1;
        }
        if (winner === 0 && refresh_dots(role_battle_2, role_battle_1)) {
            winner = 2;
        }
    } else {
        if (winner === 0 && refresh_dots(role_battle_2, role_battle_1)) {
            winner = 2;
        }
        if (winner === 0 && refresh_dots(role_battle_1, role_battle_2)) {
            winner = 1;
        }
    }
    if (winner === 0) {
        // 判断敌我装备触发技能
        let equipment_skill_1 = get_equipment_skill(role_battle_1, role_battle_2);
        let equipment_skill_2 = get_equipment_skill(role_battle_2, role_battle_1);
        // 技能施放
        if (role_1_first) {
            if (winner === 0 && do_attack(role_battle_1, cast_skill_1, role_battle_2)) {
                winner = 1;
            }
            if (winner === 0 && cast_skill_1.trigger) {
                for (let i = 0; i < equipment_skill_1.length; i++) {
                    if (do_attack(role_battle_1, equipment_skill_1[i], role_battle_2)) {
                        winner = 1;
                    }
                }
            }
            if (winner === 0 && do_attack(role_battle_2, cast_skill_2, role_battle_1)) {
                winner = 2;
            }
            if (winner === 0 && cast_skill_2.trigger) {
                for (let i = 0; i < equipment_skill_2.length; i++) {
                    if (do_attack(role_battle_2, equipment_skill_2[i], role_battle_1)) {
                        winner = 2;
                    }
                }
            }
        } else {
            if (winner === 0 && do_attack(role_battle_2, cast_skill_2, role_battle_1)) {
                winner = 2;
            }
            if (winner === 0 && cast_skill_2.trigger) {
                for (let i = 0; i < equipment_skill_2.length; i++) {
                    if (do_attack(role_battle_2, equipment_skill_2[i], role_battle_1)) {
                        winner = 2;
                    }
                }
            }
            if (winner === 0 && do_attack(role_battle_1, cast_skill_1, role_battle_2)) {
                winner = 1;
            }
            if (winner === 0 && cast_skill_1.trigger) {
                for (let i = 0; i < equipment_skill_1.length; i++) {
                    if (do_attack(role_battle_1, equipment_skill_1[i], role_battle_2)) {
                        winner = 1;
                    }
                }
            }
        }
    }
    role_health_1 = role_battle_1.current_health_value;
    role_shield_1 = role_battle_1.current_shield_value;
    role_health_2 = role_battle_2.current_health_value;
    role_shield_2 = role_battle_2.current_shield_value;
    if (winner !== 0) {
        clear_buffs_and_debuffs_and_dots(role_battle_1);
        clear_buffs_and_debuffs_and_dots(role_battle_2);
        if (battle_callback != null) {
            role_shield_1 = 0;
            role_battle_1.current_shield_value = 0;
            battle_callback(winner);
            battle_callback = null;
        }
        return true;
    }
    // battle_log(battle_attribute_1.name + "：" + battle_attribute_1.current_health_value + " / " + battle_attribute_1.max_health_value);
    // battle_log(battle_attribute_2.name + "：" + battle_attribute_2.current_health_value + " / " + battle_attribute_2.max_health_value);
    battle_turn++;
    // 100回合不分胜负则判定为平局
    if (battle_turn > 100) {
        clear_buffs_and_debuffs_and_dots(role_battle_1);
        clear_buffs_and_debuffs_and_dots(role_battle_2);
        battle_log("双方平手");
        if (in_test_mode) {
            win_count_1 += 0.5;
            win_count_2 += 0.5;
        }
        if (in_test_mode) {
            check_arena_over();
        }
        if (battle_callback != null) {
            role_shield_1 = 0;
            role_battle_1.current_shield_value = 0;
            battle_callback(0);
            battle_callback = null;
        }
        return true;
    } else {
        // 开始下一回合循环
        clearTimeout(battle_timer);
        battle_timer = setTimeout(turn_loop, turn_time);
        if (turn_callback != null) {
            turn_callback();
        }
        return false;
    }
}

/**
 * 执行dot伤害
 */
function do_dot(attacker, dot, target) {
    let damage_value;
    let dot_obj;
    let drain_obj;
    let hot_obj;
    if (dot.damage != null) {
        // DOT，结算伤害
        dot_obj = calculate_dot_final_damage(attacker, target, dot.name, dot.damage, dot.type);
        damage_value = dot_obj.damage_value;
        target.current_health_value -= damage_value;
        if (target.current_health_value <= 0) {
            target.current_health_value = 0;
        }
    }
    if (dot.heal != null) {
        if (dot.heal < 0) {
            // 根据造成伤害吸血
            drain_obj = {};
            drain_obj.attack_name = attacker.name;
            drain_obj.target_name = target.name;
            drain_obj.skill_name = dot.name;
            drain_obj.drain_value = -damage_value * dot.heal;
            drain_obj.is_critical = dot_obj.is_critical;
            attacker.current_health_value += drain_obj.drain_value;
            if (attacker.current_health_value >= attacker.max_health_value) {
                attacker.current_health_value = attacker.max_health_value;
            }
        } else {
            // HOT，结算治疗
            hot_obj = calculate_hot_final_heal(target, dot.name, dot.heal);
            target.current_health_value += hot_obj.heal_value;
            if (target.current_health_value >= target.max_health_value) {
                target.current_health_value = target.max_health_value;
            }
        }
    }
    if (drain_obj != null) {
        drain_log(drain_obj);
    } else if (dot_obj != null) {
        dot_log(dot_obj);
    }
    if (hot_obj != null) {
        hot_log(hot_obj);
    }
}

/**
 * 判断人物施放技能
 * @param attacker
 * @param target
 */
function get_cast_skill(attacker, target) {
    // 技能排序
    sort_role_skills(attacker);
    let cast_skill = null;
    // 判断施放技能
    let index;
    for (index = 0; index < attacker.skills.length; index++) {
        let skill = attacker.skills[index];
        if (skill.speed == null) {
            skill.speed = 0;
        }
        if (skill.attempt != null) {
            if (skill.attempt(attacker, target)) {
                cast_skill = skill;
                break;
            }
        } else if (!skill_in_cd(attacker, skill)) {
            cast_skill = skill;
            break;
        }
    }
    // 将施放的技能放在最前
    attacker.skills.unshift(cast_skill);
    attacker.skills.splice(index + 1, 1);
    if (cast_skill == null) {
        cast_skill = dictionary_monster_skill.physical_attack();
        cast_skill.trigger = false;
    }
    if (cast_skill.trigger == null) {
        cast_skill.trigger = true;
    }
    return cast_skill;
}

/**
 * 判断装备触发技能
 * @param attacker
 * @param target
 */
function get_equipment_skill(attacker, target) {
    let equipment_skills = [];
    let equipments = attacker.equipments;
    for (let i = 0; i < equipments.length; i++) {
        let equipment = equipments[i];
        if (typeof equipment === "number") {
            equipment = create_static_equipment_model(equipment);
        }
        if (equipment.skill != null) {
            let skill = dictionary_equipment_skill[equipment.skill]();
            if (skill.attempt != null) {
                if (skill.attempt(attacker, target)) {
                    if (random_percent(skill.chance)) {
                        equipment_skills.push(skill);
                    }
                }
            } else if (!skill_in_cd(attacker, skill)) {
                if (random_percent(skill.chance)) {
                    equipment_skills.push(skill);
                }
            }
        }
    }
    return equipment_skills;
}

/**
 * 执行攻击动作
 */
function do_attack(attacker, skill, target) {
    regist_skill_state(skill_state(attacker.flag, skill.name));
    // 技能施放
    let skill_cast_result = skill.cast(attacker, target);
    // 结算伤害
    let damage_list = skill_cast_result.damage_list;
    for (let i = 0; i < damage_list.length; i++) {
        let damage_obj = damage_list[i];
        if (damage_obj == null) {
            continue;
        }
        if (damage_obj.is_hit) {
            damage_log(damage_obj);
        } else {
            miss_log(damage_obj);
        }
        let damage_value = damage_obj.damage_value;
        target.current_health_value -= damage_value;
        if (target.current_health_value < 0) {
            target.current_health_value = 0;
        }
    }
    // 结算治疗
    let heal_list = skill_cast_result.heal_list;
    for (let i = 0; i < heal_list.length; i++) {
        let heal_obj = heal_list[i];
        if (heal_obj == null) {
            continue;
        }
        heal_log(heal_obj);
        let heal_value = heal_obj.heal_value;
        if (heal_value > 0) {
            attacker.current_health_value += heal_value;
            if (attacker.current_health_value > attacker.max_health_value) {
                attacker.current_health_value = attacker.max_health_value;
            }
        }
    }
    // 结算护盾
    let shield_list = skill_cast_result.shield_list;
    for (let i = 0; i < shield_list.length; i++) {
        let shield_obj = shield_list[i];
        if (shield_obj == null) {
            continue;
        }
        shield_log(shield_obj);
        let shield_value = shield_obj.shield_value;
        if (shield_value > 0) {
            attacker.current_shield_value += shield_value;
        }
    }
    // 战败判定
    if (is_death(target)) {
        if (in_test_mode) {
            if (role_battle_2.current_health_value <= 0) {
                win_count_1++;
            } else {
                win_count_2++;
            }
            check_arena_over();
        }
        return true;
    } else {
        return false;
    }
}

/**
 * 判断目标是否战败
 */
function is_death(role) {
    if (role.current_health_value <= 0) {
        battle_log("");
        battle_log(role.name + " 战败");
        return true;
    } else {
        return false;
    }
}

/**
 * 增减益剩余回合-1
 */
function reduce_role_buffs_and_debuffs(role_battle) {
    let battle_buffs = role_battle.buffs;
    if (battle_buffs != null && battle_buffs.length > 0) {
        for (let i = 0; i < battle_buffs.length; i++) {
            let buffs = battle_buffs[i];
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
    let battle_debuffs = role_battle.debuffs;
    if (battle_debuffs != null && battle_debuffs.length > 0) {
        for (let i = 0; i < battle_debuffs.length; i++) {
            let debuffs = battle_debuffs[i];
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
 * 清空非常驻增减益属性
 */
function clear_buffs_and_debuffs_and_dots(role_battle) {
    let battle_buffs = role_battle.buffs;
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
    let battle_debuffs = role_battle.debuffs;
    if (battle_debuffs != null && battle_debuffs.length > 0) {
        for (let i = 0; i < battle_debuffs.length; i++) {
            battle_debuffs.splice(i, 1);
            i--;
        }
    }
    let battle_dots = role_battle.dots;
    if (battle_dots != null && battle_dots.length > 0) {
        for (let i = 0; i < battle_dots.length; i++) {
            battle_dots.splice(i, 1);
            i--;
        }
    }
}

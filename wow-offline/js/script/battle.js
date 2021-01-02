/** 战斗控制 **/

let battle_timer = -1;// 回合标识
let turn_time = is_in_local_mode() ? 10 : 1000;// 回合时间

let role_base_1;// 我方原始状态
let role_base_2;// 敌方原始状态

let role_battle_1;// 我方战斗状态
let role_health_1;// 我方当前血量
let role_shield_1;// 我方当前护盾
let role_battle_2;// 敌方战斗状态
let role_health_2;// 敌方当前血量
let role_shield_2;// 敌方当前护盾

let battle_time = 1;// 战斗进行次数
let battle_turn = 1;// 当前回合数

let turn_callback;// 回合完成回调
let battle_callback;// 战斗完成回调

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
    init_skill_states();
    // 状态初始化
    role_base_1 = role_1;
    role_base_2 = role_2;
    role_health_1 = current_health_value;
    role_shield_1 = current_shield_value;
    role_health_2 = 0;
    role_shield_2 = 0;
    turn_callback = t_callback;
    battle_callback = b_callback;
    // 开始回合循环
    clearTimeout(battle_timer);
    battle_timer = setTimeout(turn_loop, 0);
}

/**
 * 终止战斗
 */
function stop_battle() {
    clearTimeout(battle_timer);
}

/**
 * 回合循环
 * @returns {boolean} 战斗是否结束
 */
function turn_loop() {
    // 随机打乱技能
    role_base_1.skills.sort(function () {
        return (0.5 - Math.random());
    });
    role_base_2.skills.sort(function () {
        return (0.5 - Math.random());
    });
    // 技能按优先级排序
    role_base_1.skills.sort(function (a, b) {
        let priority_a = a.priority != null ? a.priority : 20;
        let priority_b = b.priority != null ? b.priority : 20;
        return priority_b - priority_a;
    });
    role_base_2.skills.sort(function (a, b) {
        let priority_a = a.priority != null ? a.priority : 20;
        let priority_b = b.priority != null ? b.priority : 20;
        return priority_b - priority_a;
    });
    battle_log("");
    battle_log("第 " + battle_turn + " 回合");
    // 更新战斗状态
    role_battle_1 = get_battle_attribute(role_base_1, "battle_1");
    role_battle_2 = get_battle_attribute(role_base_2, "battle_2");
    // 设置生命值
    role_battle_1.current_health_value = current_health_value;
    role_battle_1.current_shield_value = current_shield_value;
    if (battle_turn === 1) {
        if (in_test_mode) {
            current_health_value = role_battle_1.max_health_value;
            current_shield_value = 0;
            role_battle_1.current_health_value = role_battle_1.max_health_value;
        }
        role_battle_2.current_health_value = role_battle_2.max_health_value;
    } else {
        role_battle_2.current_health_value = role_health_2;
        role_battle_2.current_shield_value = role_shield_2;
    }
    // 首回合输出双方战斗状态
    if (is_in_local_mode() && battle_turn === 1) {
        if (in_test_mode) {
            if (win_count_1 + win_count_2 === 0) {
                console.log(role_battle_1);
                console.log(role_battle_2);
            }
        } else {
            console.log(role_battle_1);
            console.log(role_battle_2);
        }
    }
    // 计算dot伤害
    refresh_dots(role_battle_1);
    refresh_dots(role_battle_2);
    // 判断敌我施放技能
    let skill_1, skill_2;
    for (let i = 0; i < role_battle_1.skills.length; i++) {
        let skill = role_battle_1.skills[i];
        if (skill.attempt != null) {
            if (skill.attempt(role_battle_1, role_battle_2)) {
                skill_1 = skill;
                break;
            }
        } else if (!skill_in_cd(role_battle_1, skill)) {
            skill_1 = skill;
            break;
        }
    }
    for (let i = 0; i < role_battle_2.skills.length; i++) {
        let skill = role_battle_2.skills[i];
        if (skill.attempt != null) {
            if (skill.attempt(role_battle_2, role_battle_1)) {
                skill_2 = skill;
                break;
            }
        } else if (!skill_in_cd(role_battle_2, skill)) {
            skill_2 = skill;
            break;
        }
    }
    // 判断出手顺序
    let winner = 0;
    if (Math.random() < role_battle_1.agi / (role_battle_1.agi + role_battle_2.agi)) {
        if (do_attack(role_battle_1, skill_1, role_battle_2)) {
            winner = 1;
        }
        if (winner === 0 && do_attack(role_battle_2, skill_2, role_battle_1)) {
            winner = 2;
        }
    } else {
        if (do_attack(role_battle_2, skill_2, role_battle_1)) {
            winner = 2;
        }
        if (winner === 0 && do_attack(role_battle_1, skill_1, role_battle_2)) {
            winner = 1;
        }
    }
    current_health_value = role_battle_1.current_health_value;
    current_shield_value = role_battle_1.current_shield_value;
    role_health_2 = role_battle_2.current_health_value;
    role_shield_2 = role_battle_2.current_shield_value;
    if (winner !== 0) {
        clear_buffs_and_debuffs_and_dots(role_battle_1);
        clear_buffs_and_debuffs_and_dots(role_battle_2);
        if (battle_callback != null) {

            battle_callback(winner);
        }
        return true;
    }
    // battle_log(battle_attribute_1.name + "：" + battle_attribute_1.current_health_value + " / " + battle_attribute_1.max_health_value);
    // battle_log(battle_attribute_2.name + "：" + battle_attribute_2.current_health_value + " / " + battle_attribute_2.max_health_value);
    // 100回合不分胜负则判定为平局
    battle_turn++;
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
            battle_callback(0);
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
function do_dot(role, dot) {
    let dot_obj = {};
    dot_obj.target_name = role.name;
    dot_obj.skill_name = dot.name;
    dot_obj.damage_value = dot.damage;
    dot_obj.element_type = get_element_name(dot.type);
    dot_log(dot_obj);
    role.current_health_value -= dot_obj.damage_value;
    if (role.current_health_value < 0) {
        role.current_health_value = 0;
    }
}

/**
 * 执行攻击动作
 */
function do_attack(attacker, skill, target) {
    regist_skill_state(skill_state(attacker.flag, skill.id));
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
        battle_log(role.name + " 战败");
        return true;
    } else {
        return false;
    }
}
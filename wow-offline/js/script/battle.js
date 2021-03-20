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
        turn_time = TURN_TIME * 100 / role_battle_1.speed_battle;
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
        } else if (battle_turn === 1) {
            console.log(role_battle_1);
            console.log(role_battle_2);
        }
    }
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
    while (true) {
        // 计算dot伤害
        if (role_1_first) {
            if (refresh_dots(role_battle_1, role_battle_2)) break;
            if (refresh_dots(role_battle_2, role_battle_1)) break;
        } else {
            if (refresh_dots(role_battle_2, role_battle_1)) break;
            if (refresh_dots(role_battle_1, role_battle_2)) break;
        }
        // 判断敌我装备触发技能
        let equipment_skill_1 = get_equipment_skill(role_battle_1, role_battle_2);
        let equipment_skill_2 = get_equipment_skill(role_battle_2, role_battle_1);
        // 技能施放
        if (role_1_first) {
            if (do_skill(role_battle_1, cast_skill_1, role_battle_2)) break;
            if (cast_skill_1.trigger) {
                for (let i = 0; i < equipment_skill_1.length; i++) {
                    if (do_skill(role_battle_1, equipment_skill_1[i], role_battle_2)) break;
                }
            }
            if (do_skill(role_battle_2, cast_skill_2, role_battle_1)) break;
            if (cast_skill_2.trigger) {
                for (let i = 0; i < equipment_skill_2.length; i++) {
                    if (do_skill(role_battle_2, equipment_skill_2[i], role_battle_1)) break;
                }
            }
        } else {
            if (do_skill(role_battle_2, cast_skill_2, role_battle_1)) break;
            if (cast_skill_2.trigger) {
                for (let i = 0; i < equipment_skill_2.length; i++) {
                    if (do_skill(role_battle_2, equipment_skill_2[i], role_battle_1)) break;
                }
            }
            if (do_skill(role_battle_1, cast_skill_1, role_battle_2)) break;
            if (cast_skill_1.trigger) {
                for (let i = 0; i < equipment_skill_1.length; i++) {
                    if (do_skill(role_battle_1, equipment_skill_1[i], role_battle_2)) break;
                }
            }
        }
        break;
    }
    role_health_1 = role_battle_1.current_health_value;
    role_shield_1 = role_battle_1.current_shield_value;
    role_health_2 = role_battle_2.current_health_value;
    role_shield_2 = role_battle_2.current_shield_value;
    let winner = get_winner(true);
    if (winner !== 0) {
        clear_buffs_debuffs_dots(role_battle_1);
        clear_buffs_debuffs_dots(role_battle_2);
        if (battle_callback != null) {
            role_shield_1 = 0;
            role_battle_1.current_shield_value = 0;
            battle_callback(winner);
            battle_callback = null;
        }
        return true;
    }
    battle_turn++;
    // 100回合不分胜负则判定为平局
    if (battle_turn > 100) {
        clear_buffs_debuffs_dots(role_battle_1);
        clear_buffs_debuffs_dots(role_battle_2);
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
 * 判断人物施放技能
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
 * 判断胜利者 0-平手，1-胜利，2-失败
 */
function get_winner(log = false) {
    if (role_battle_2.current_health_value <= 0 && role_battle_1.current_health_value > 0) {
        if (log) {
            battle_log(role_battle_2.name + " 战败");
        }
        return 1;
    }
    if (role_battle_1.current_health_value <= 0 && role_battle_2.current_health_value > 0) {
        if (log) {
            battle_log(role_battle_1.name + " 战败");
        }
        return 2;
    }
    return 0;
}

/**
 * 执行DOT
 */
function refresh_dots(attacker, target) {
    let dots = target.dots;
    if (dots != null && dots.length > 0) {
        for (let i = 0; i < dots.length; i++) {
            let dot = dots[i];
            if (dot.type === "dot") {
                let result_obj = calculate_dot(attacker, target, dot.name, dot.power_percent, dot.attack_type, dot.element_type);
                if (dot.drain > 0) {
                    let heal_value = result_obj.damage_value;
                    calculate_flat_heal(attacker, attacker, dot.name, heal_value);
                }
            } else if (dot.type === "hot") {
                calculate_hot(target, target, dot.name, dot.power_percent, dot.attack_type, dot.element_type);
            }
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
    // 战败判定
    let winner = get_winner();
    if (in_test_mode) {
        if (winner === 1) {
            win_count_1++;
            check_arena_over();
        }
        if (winner === 2) {
            win_count_2++;
            check_arena_over();
        }
    }
    return winner !== 0;
}

/**
 * 判断装备触发技能
 */
function get_equipment_skill(attacker, target) {
    let equipment_skills = [];
    let equipments = attacker.equipments;
    for (let i = 0; i < equipments.length; i++) {
        let equipment = equipments[i];
        equipment = get_equipment_by_model(equipment)[1];
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
 * 执行技能
 */
function do_skill(attacker, skill, target) {
    regist_skill_state(skill_state(attacker.flag, skill.name));
    // 技能施放
    let skill_result = skill.cast(attacker, target);
    // 战败判定
    let winner = get_winner();
    if (winner === 0) {
        calculate_role_after(attacker, target, skill_result);
    }
    if (in_test_mode) {
        if (winner === 1) {
            win_count_1++;
            check_arena_over();
        }
        if (winner === 2) {
            win_count_2++;
            check_arena_over();
        }
    }
    return winner !== 0;
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
function clear_buffs_debuffs_dots(role_battle) {
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
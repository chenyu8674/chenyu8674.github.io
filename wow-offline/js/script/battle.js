/** 战斗控制 **/

let battle_timer = -1;// 回合标识
let turn_time = 1000;// 回合时间

let battle_member_1;// 我方原始状态
let battle_member_2;// 敌方原始状态

let battle_attribute_1;// 我方战斗状态
let battle_attribute_2;// 敌方战斗状态

let battle_turn = 1;// 当前回合数

/**
 * 战斗初始化
 * @param member1
 * @param member2
 */
function init_battle(member1, member2) {
    // 战斗初始化
    battle_turn = 1;
    init_skill_states();
    // 状态初始化
    battle_member_1 = member1;
    battle_attribute_1 = {};
    battle_member_2 = member2;
    battle_attribute_2 = {};
    // 技能按优先级排序
    battle_member_1.skills.sort(
        function (a, b) {
            return b.priority - a.priority;
        });
    battle_member_2.skills.sort(
        function (a, b) {
            return b.priority - a.priority;
        });
    // 开始回合循环
    clearTimeout(battle_timer);
    turn_loop();
}

/**
 * 回合循环
 * @returns {boolean} 战斗是否结束
 */
function turn_loop() {
    // 100回合不分胜负则判定为平局
    if (battle_turn === 100) {
        battle_log("双方平手");
        win_count_1 += 0.5;
        win_count_2 += 0.5;
        if (in_test_mode) {
            check_arena_over();
        }
        return true;
    }
    battle_log("第 " + battle_turn + " 回合");
    // 更新战斗状态
    refresh_attribute(battle_member_1, battle_attribute_1, "battle_attribute_1");
    refresh_attribute(battle_member_2, battle_attribute_2, "battle_attribute_2");
    // 首回合输出双方战斗状态
    if (battle_turn === 1 && win_count_1 === 0 && win_count_2 === 0) {
        console.log(battle_attribute_1);
        console.log(battle_attribute_2);
    }
    // 判断敌我施放技能
    let skill_1, skill_2;
    for (let i = 0; i < battle_attribute_1.skills.length; i++) {
        if (battle_attribute_1.skills[i].attempt == null ||
            battle_attribute_1.skills[i].attempt(battle_attribute_1, battle_attribute_2)) {
            skill_1 = battle_attribute_1.skills[i];
            break;
        }
    }
    for (let i = 0; i < battle_attribute_2.skills.length; i++) {
        if (battle_attribute_2.skills[i].attempt == null ||
            battle_attribute_2.skills[i].attempt(battle_attribute_2, battle_attribute_1)) {
            skill_2 = battle_attribute_2.skills[i];
            break;
        }
    }
    // 判断出手顺序
    if (Math.random() < battle_attribute_1.agi / (battle_attribute_1.agi + battle_attribute_2.agi)) {
        if (do_attack(battle_attribute_1, skill_1, battle_attribute_2, "win_count_1")) {
            return true;
        }
        if (do_attack(battle_attribute_2, skill_2, battle_attribute_1, "win_count_2")) {
            return true;
        }
    } else {
        if (do_attack(battle_attribute_2, skill_2, battle_attribute_1, "win_count_2")) {
            return true;
        }
        if (do_attack(battle_attribute_1, skill_1, battle_attribute_2, "win_count_1")) {
            return true;
        }
    }
    battle_log(battle_attribute_1.name + "：" + battle_attribute_1.current_health_point + " / " + battle_attribute_1.health_point);
    battle_log(battle_attribute_2.name + "：" + battle_attribute_2.current_health_point + " / " + battle_attribute_2.health_point);
    battle_log("");
    battle_turn++;
    // 开始下一回合循环
    clearTimeout(battle_timer);
    battle_timer = setTimeout(turn_loop, turn_time);
    return false;
}

/**
 * 执行攻击动作
 */
function do_attack(battle_1, skill, battle_2, win_count) {
    // 技能施放
    let skill_cast_result = skill.cast(battle_1, battle_2);
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
        battle_2.current_health_point -= damage_value;
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
            battle_1.current_health_point += heal_value;
            if (battle_1.current_health_point > battle_1.health_point) {
                battle_1.current_health_point = battle_1.health_point;
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
            battle_1.current_shield_point += shield_value;
        }
    }
    // 战败判定
    if (is_death(battle_2)) {
        eval(win_count + "++");
        if (!in_test_mode || win_count_1 + win_count_2 === battle_time) {
            result_log();
        }
        if (in_test_mode) {
            check_arena_over();
        }
        return true;
    }
    return false;
}

/**
 * 判断目标是否战败
 * @param member
 * @return {boolean} 是否战败
 */
function is_death(member) {
    if (member.current_health_point <= 0) {
        member.current_health_point = 0;
        battle_log(member.name + " 战败");
        battle_log("");
        return true;
    } else {
        return false;
    }
}
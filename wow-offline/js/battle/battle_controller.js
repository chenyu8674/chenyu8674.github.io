// 战斗控制

let battle_timer = -1;
let turn_time = 1000;// 回合时间

let battle_character;// 我方原始状态
let battle_enemy;// 敌方原始状态

let battle_attribute_character;// 我方最终战斗状态
let battle_attribute_enemy;// 敌方最终战斗状态

let battle_turn = 1;

function init_battle(character, enemy) {
    battle_character = character;
    battle_enemy = enemy;
    battle_turn = 1;

    // 按技能优先级排序
    battle_character.skills.sort(
        function (a, b) {
            return b.priority - a.priority;
        });
    battle_enemy.skills.sort(
        function (a, b) {
            return b.priority - a.priority;
        });
    init_skill_states();

    clearTimeout(battle_timer);
    battle_timer = setTimeout(turn_loop, 0);
    log("");
}

function refresh_attribute() {
    let battle_health_character = 0;
    let battle_shield_character = 0;
    let battle_health_enemy = 0;
    let battle_shield_enemy = 0;
    if (battle_turn !== 1) {
        battle_health_character = battle_attribute_character.current_health_point;
        battle_shield_character = battle_attribute_character.current_shield_point;
        battle_health_enemy = battle_attribute_enemy.current_health_point;
        battle_shield_enemy = battle_attribute_enemy.current_shield_point;
    }

    battle_attribute_character = setup_attribute();
    battle_attribute_character.equipments = battle_character.equipments;
    battle_attribute_character.skills = battle_character.skills;
    battle_attribute_character.buffs = battle_character.buffs;
    battle_attribute_character.debuffs = battle_character.debuffs;

    battle_attribute_enemy = setup_attribute();
    battle_attribute_enemy.equipments = battle_enemy.equipments;
    battle_attribute_enemy.skills = battle_enemy.skills;
    battle_attribute_enemy.buffs = battle_enemy.buffs;
    battle_attribute_enemy.debuffs = battle_enemy.debuffs;

    if (battle_turn !== 1) {
        battle_attribute_character.current_health_point = battle_health_character;
        battle_attribute_character.current_shield_point = battle_shield_character;
        battle_attribute_enemy.current_health_point = battle_health_enemy;
        battle_attribute_enemy.current_shield_point = battle_shield_enemy;
    }

    refresh_attribute_character();// 计算角色属性加成
    refresh_attribute_equipments();// 计算装备属性加成
    refresh_attribute_buffs();// 计算增益属性加成
    refresh_attribute_debuffs();// 计算减益属性加成
    refresh_final_attribute();// 计算最终属性加成

    refresh_attribute_enemy();// 计算敌方属性加成
    refresh_attribute_enemy_equipments();// 计算装备属性加成
    refresh_attribute_enemy_buffs();// 计算敌方增益属性加成
    refresh_attribute_enemy_debuffs();// 计算敌方减益属性加成
    refresh_final_attribute_enemy();// 计算敌方最终属性加成

    // 设定敌我标识(防止同职业对战混淆)
    battle_attribute_character.flag = "character";
    battle_attribute_enemy.flag = "enemy";
}

/**
 * 每回合的内容执行
 * @returns {boolean} 战斗是否结束
 */
function turn_loop() {
    refresh_attribute();
    if (battle_turn === 1 && win_count_1 === 0 && win_count_2 === 0) {
        console.log(battle_attribute_character);
        console.log(battle_attribute_enemy);
        console.log("");
    }

    log("第 " + battle_turn + " 回合");
    battle_turn++;

    // 判断施放技能
    let skill, enemy_skill;
    for (let i = 0; i < battle_attribute_character.skills.length; i++) {
        if (battle_attribute_character.skills[i].attempt == null ||
            battle_attribute_character.skills[i].attempt(battle_attribute_character, battle_attribute_enemy)) {
            skill = battle_attribute_character.skills[i];// 我方技能
            break;
        }
    }
    for (let i = 0; i < battle_attribute_enemy.skills.length; i++) {
        if (battle_attribute_enemy.skills[i].attempt == null ||
            battle_attribute_enemy.skills[i].attempt(battle_attribute_enemy, battle_attribute_character)) {
            enemy_skill = battle_attribute_enemy.skills[i];// 我方技能
            break;
        }
    }

    // 判断出手顺序
    if (Math.random() < battle_attribute_character.agi / (battle_attribute_character.agi + battle_attribute_enemy.agi)) {
        // 我方先攻
        let damage1 = skill.cast(battle_attribute_character, battle_attribute_enemy);// 造成伤害
        battle_attribute_enemy.current_health_point -= damage1;
        if (is_death(battle_attribute_enemy)) {
            win_count_1++;
            if (in_test_mode) {
                check_arena_over();
            }
            return true;
        }
        let damage2 = enemy_skill.cast(battle_attribute_enemy, battle_attribute_character);// 敌方造成伤害
        battle_attribute_character.current_health_point -= damage2;
        if (is_death(battle_attribute_character)) {
            win_count_2++;
            if (in_test_mode) {
                check_arena_over();
            }
            return true;
        }
    } else {
        // 敌方先攻
        let damage2 = enemy_skill.cast(battle_attribute_enemy, battle_attribute_character);// 敌方造成伤害
        battle_attribute_character.current_health_point -= damage2;
        if (is_death(battle_attribute_character)) {
            win_count_2++;
            if (in_test_mode) {
                check_arena_over();
            }
            return true;
        }
        let damage1 = skill.cast(battle_attribute_character, battle_attribute_enemy);// 造成伤害
        battle_attribute_enemy.current_health_point -= damage1;
        if (is_death(battle_attribute_enemy)) {
            win_count_1++;
            if (in_test_mode) {
                check_arena_over();
            }
            return true;
        }
    }
    log(battle_attribute_character.name + "：" + battle_attribute_character.current_health_point + " / " + battle_attribute_character.health_point);
    log(battle_attribute_enemy.name + "：" + battle_attribute_enemy.current_health_point + " / " + battle_attribute_enemy.health_point);
    log("");
    battle_timer = setTimeout(turn_loop, turn_time);
    return false;
}

function is_death(member) {
    if (member.current_health_point < 0) {
        member.current_health_point = 0;
    }
    if (member.current_health_point <= 0) {
        log(member.name + " 战败");
        return true;
    } else {
        return false;
    }
}

// 计算角色属性加成
function refresh_attribute_character() {
    battle_attribute_character.name = battle_character.name;
    battle_attribute_character.lvl = battle_character.lvl;
    battle_attribute_character.job = battle_character.job;
    battle_attribute_character.str += battle_character.str;
    battle_attribute_character.agi += battle_character.agi;
    battle_attribute_character.sta += battle_character.sta;
    battle_attribute_character.int += battle_character.int;
    battle_attribute_character.spr += battle_character.spr;
}

// 计算装备属性加成
function refresh_attribute_equipments() {
    let battle_equipments = battle_character.equipments;
    if (battle_equipments != null && battle_equipments.length > 0) {
        for (let i = 0; i < battle_equipments.length; i++) {
            let equipments = battle_equipments[i];
            for (let j = 0; j < equipments.length; j++) {
                let equipment = equipments[j];
                eval("battle_attribute_character." + equipment);
            }
        }
    }
}

// 计算增益属性加成
function refresh_attribute_buffs() {
    let battle_buffs = battle_character.buffs;
    if (battle_buffs != null && battle_buffs.length > 0) {
        for (let i = 0; i < battle_buffs.length; i++) {
            let buffs = battle_buffs[i];
            for (let j = 1; j < buffs.length; j++) {
                let buff = buffs[j];
                eval("battle_attribute_character." + buff);
            }
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

// 计算减益属性加成
function refresh_attribute_debuffs() {
    let battle_debuffs = battle_character.debuffs;
    if (battle_debuffs != null && battle_debuffs.length > 0) {
        for (let i = 0; i < battle_debuffs.length; i++) {
            let debuffs = battle_debuffs[i];
            for (let j = 1; j < debuffs.length; j++) {
                let debuff = debuffs[j];
                eval("battle_attribute_character." + debuff);
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

// 计算最终属性加成
function refresh_final_attribute() {
    battle_attribute_character = get_battle_attribute(battle_attribute_character);
    if (battle_turn === 1) {
        battle_attribute_character.current_health_point = battle_attribute_character.health_point;
    }
}

// 计算敌方属性加成
function refresh_attribute_enemy() {
    battle_attribute_enemy.name = battle_enemy.name;
    battle_attribute_enemy.lvl = battle_enemy.lvl;
    battle_attribute_enemy.job = battle_enemy.job;
    battle_attribute_enemy.str += battle_enemy.str;
    battle_attribute_enemy.agi += battle_enemy.agi;
    battle_attribute_enemy.sta += battle_enemy.sta;
    battle_attribute_enemy.int += battle_enemy.int;
    battle_attribute_enemy.spr += battle_enemy.spr;
}

// 计算敌方装备属性加成
function refresh_attribute_enemy_equipments() {
    let battle_enemy_equipments = battle_enemy.equipments;
    if (battle_enemy_equipments != null && battle_enemy_equipments.length > 0) {
        for (let i = 0; i < battle_enemy_equipments.length; i++) {
            let equipments = battle_enemy_equipments[i];
            for (let j = 0; j < equipments.length; j++) {
                let equipment = equipments[j];
                eval("battle_attribute_enemy." + equipment);
            }
        }
    }
}

// 计算敌方增益属性加成
function refresh_attribute_enemy_buffs() {
    let battle_enemy_buffs = battle_enemy.buffs;
    if (battle_enemy_buffs != null && battle_enemy_buffs.length > 0) {
        for (let i = 0; i < battle_enemy_buffs.length; i++) {
            let buffs = battle_enemy_buffs[i];
            for (let j = 1; j < buffs.length; j++) {
                let buff = buffs[j];
                eval("battle_attribute_enemy." + buff);
            }
            let turn_left = buffs[0];
            if (turn_left > 0) {
                turn_left--;
                if (turn_left === 0) {
                    battle_enemy_buffs.splice(i, 1);
                    i--;
                } else {
                    buffs[0] = turn_left;
                }
            }
        }
    }
}

// 计算敌方减益属性加成
function refresh_attribute_enemy_debuffs() {
    let battle_enemy_debuffs = battle_enemy.debuffs;
    if (battle_enemy_debuffs != null && battle_enemy_debuffs.length > 0) {
        for (let i = 0; i < battle_enemy_debuffs.length; i++) {
            let debuffs = battle_enemy_debuffs[i];
            for (let j = 1; j < debuffs.length; j++) {
                let debuff = debuffs[j];
                eval("battle_attribute_enemy." + debuff);
            }
            let turn_left = debuffs[0];
            if (turn_left > 0) {
                turn_left--;
                if (turn_left === 0) {
                    battle_enemy_debuffs.splice(i, 1);
                    i--;
                } else {
                    debuffs[0] = turn_left;
                }
            }
        }
    }
}

// 计算敌方最终属性加成
function refresh_final_attribute_enemy() {
    battle_attribute_enemy = get_battle_attribute(battle_attribute_enemy);
    if (battle_turn === 1) {
        battle_attribute_enemy.current_health_point = battle_attribute_enemy.health_point;
    }
}

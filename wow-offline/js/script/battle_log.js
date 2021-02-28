/** 战斗日志输出 **/

let battle_log_text = [];

function battle_log_clear() {
    battle_log_text = [];
    $("#test_log").html("");
    $("#battle_log").html("");
}

function battle_log(str) {
    if (battle_time !== 1) {
        return;
    }
    if (str == null) {
        str = "";
    }
    let log_view;
    if (in_test_mode) {
        battle_log_text.push(str);
        if (battle_log_text.length > MAX_LOG) {
            battle_log_text.splice(0, 1);
        }
        log_view = $("#test_log");
        log_view.html(battle_log_text.join("<br/>"));
    } else {
        log_view = $("#battle_log");
        if (str.length === 0 && log_view.children().length > 0) {
            log_view.append("<br/>");
        } else {
            log_view.append("<div>" + str + "</div>");
        }
        if (log_view.children().length > MAX_LOG) {
            log_view.children().first().remove();
        }
    }
    log_view.scrollTop(log_view[0].scrollHeight);
}

/**
 * 输出整体战斗结果
 */
function result_log() {
    battle_log("");
    battle_log(role_battle_1.name + "(" + win_count_1 + ")：" + Math.round(win_count_1 / battle_time * 1000) / 10 + "%");
    battle_log(role_battle_2.name + "(" + win_count_2 + ")：" + Math.round(win_count_2 / battle_time * 1000) / 10 + "%");
    battle_log("");
}

/**
 * 输出未命中日志
 * @param damage_obj
 */
function miss_log(damage_obj) {
    battle_log(damage_obj.attacker_name
        + " 的 " + damage_obj.skill_name
        + " 未击中 " + damage_obj.target_name);
}

/**
 * 输出伤害日志
 * @param damage_obj
 */
function damage_log(damage_obj) {
    let element_name = get_element_name(damage_obj.element_type);
    battle_log(damage_obj.attacker_name
        + " 的 " + damage_obj.skill_name
        + " 击中 " + damage_obj.target_name
        + " 造成 " + damage_obj.damage_value + " 点 " + element_name + " 伤害"
        + (damage_obj.is_critical ? " (暴击)" : "")
        + (damage_obj.block_value > 0 ? " (" + damage_obj.block_value + "点被格挡)" : "")
        + (damage_obj.absorb_value > 0 ? " (" + damage_obj.absorb_value + "点被吸收)" : "")
    );
}

/**
 * 输出dot日志
 */
function dot_log(dot_obj) {
    let element_name = get_element_name(dot_obj.element_type);
    battle_log(dot_obj.target_name
        + " 因 " + dot_obj.skill_name
        + " 受到 " + dot_obj.damage_value + " 点 " + element_name + " 伤害"
        + (dot_obj.is_critical ? " (暴击)" : "")
        + (dot_obj.absorb_value > 0 ? " (" + dot_obj.absorb_value + "点被吸收)" : "")
    );
}

/**
 * 输出drain日志
 */
function drain_log(drain_obj) {
    battle_log(drain_obj.attack_name
        + " 因 " + drain_obj.skill_name
        + " 回复 " + drain_obj.drain_value + " 点生命"
    );
}

/**
 * 输出hot日志
 */
function hot_log(hot_obj) {
    battle_log(hot_obj.target_name
        + " 因 " + hot_obj.skill_name
        + " 回复 " + hot_obj.heal_value + " 点生命"
        + (hot_obj.is_critical ? " (暴击)" : "")
    );
}

/**
 * 输出治疗日志
 * @param heal_obj
 */
function heal_log(heal_obj) {
    battle_log(heal_obj.attacker_name
        + " 通过 " + heal_obj.skill_name
        + " 回复 " + heal_obj.heal_value + " 点生命"
        + (heal_obj.is_critical ? " (暴击)" : "")
    );
}

/**
 * 输出伤害护盾日志
 * @param shield_obj
 */
function shield_log(shield_obj) {
    battle_log(shield_obj.attacker_name
        + " 通过 " + shield_obj.skill_name
        + " 获得 " + shield_obj.shield_value + " 点伤害吸收护盾"
    );
}
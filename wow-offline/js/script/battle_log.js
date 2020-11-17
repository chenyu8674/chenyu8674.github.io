/** 战斗日志输出 **/

let battle_log_text = "";

function battle_log_clear() {
    battle_log_text = "";
    $("#test_log").html("");
}

function battle_log(str) {
    battle_log_text += str + "<br />";
    if (battle_time === 1) {
        let log_view = $("#test_log");
        log_view.html(battle_log_text);
        log_view.scrollTop(log_view[0].scrollHeight);
    }
}

/**
 * 输出整体战斗结果
 */
function result_log() {
    battle_log("");
    battle_log(battle_attribute_1.name + "(" + win_count_1 + ")：" + Math.round(win_count_1 / battle_time * 1000) / 10 + "%");
    battle_log(battle_attribute_2.name + "(" + win_count_2 + ")：" + Math.round(win_count_2 / battle_time * 1000) / 10 + "%");
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
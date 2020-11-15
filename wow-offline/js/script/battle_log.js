/** 战斗日志输出 **/

let battle_log_text = "";

function battle_log_clear() {
    battle_log_text = "";
    $("#log").html("");
}

function battle_log(str) {
    battle_log_text += str + "<br />";
    if (battle_time === 1) {
        let log_view = $("#log");
        log_view.html(battle_log_text);
        log_view.scrollTop(log_view[0].scrollHeight);
    }
}

function result_log() {
    battle_log("");
    battle_log(battle_attribute_1.name + "(" + win_count_1 + ")：" + Math.round(win_count_1 / battle_time * 1000) / 10 + "%");
    battle_log(battle_attribute_2.name + "(" + win_count_2 + ")：" + Math.round(win_count_2 / battle_time * 1000) / 10 + "%");
}
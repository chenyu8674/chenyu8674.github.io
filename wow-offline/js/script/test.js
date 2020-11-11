let warrior_1 = load_character(m_job.warrior_1, MAX_EXP);
warrior_1.buffs = [m_buff.warrior_1];
warrior_1.debuffs = [];
warrior_1.equipments = [m_equipment.test_two_hand_sword, m_equipment.test_armor];
warrior_1.skills = [m_skill.warrior_1_1(), m_skill.warrior_1_2()];

let warrior_2 = load_character(m_job.warrior_2, MAX_EXP);
warrior_2.buffs = [m_buff.warrior_2];
warrior_2.debuffs = [];
warrior_2.equipments = [m_equipment.test_one_hand_sword, m_equipment.test_one_hand_sword, m_equipment.test_armor];
warrior_2.skills = [m_skill.warrior_2_1(), m_skill.warrior_2_2()];

let warrior_3 = load_character(m_job.warrior_3, MAX_EXP);
warrior_3.buffs = [m_buff.warrior_3];
warrior_3.debuffs = [];
warrior_3.equipments = [m_equipment.test_one_hand_sword, m_equipment.test_shield, m_equipment.test_armor];
warrior_3.skills = [m_skill.warrior_3_1(), m_skill.warrior_3_2()];

function do_test() {
    arena(warrior_1, warrior_3, 1);
}

let win_count_1 = 0;
let win_count_2 = 0;

function arena(member_1, member_2, battle_time) {
    win_count_1 = 0;
    win_count_2 = 0;
    for (let i = 0; i < battle_time; i++) {
        init_battle(member_1, member_2);
        while (!turn_loop()) {
        }
    }
    log("");
    log(member_1.name + "(" + win_count_1 + ")：" + Math.round(win_count_1 / battle_time * 1000) / 10 + "%");
    log(member_2.name + "(" + win_count_2 + ")：" + Math.round(win_count_2 / battle_time * 1000) / 10 + "%");
}

function start_arena() {
    log_text = "";
    $("#log").html("");
    let member_1 = $("#member_1").val();
    let member_2 = $("#member_2").val();
    let battle_time = $("#battle_time").val();
    eval("arena(" + member_1 + "," + member_2 + "," + battle_time + ")");
    $("#log").html(log_text);
}
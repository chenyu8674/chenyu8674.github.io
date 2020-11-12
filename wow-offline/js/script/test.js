let warrior_1 = function() {
    let warrior_1 = load_character(m_job.warrior_1, MAX_EXP);
    warrior_1.buffs = [m_buff.warrior_1];
    warrior_1.debuffs = [];
    warrior_1.equipments = [m_equipment.test_two_hand_sword_str, m_equipment.test_armor];
    warrior_1.skills = [m_skill.warrior_1_1(), m_skill.warrior_1_2()];
    return warrior_1;
}

let warrior_2 = function() {
    let warrior_2 = load_character(m_job.warrior_2, MAX_EXP);
    warrior_2.buffs = [m_buff.warrior_2];
    warrior_2.debuffs = [];
    warrior_2.equipments = [m_equipment.test_one_hand_sword_str, m_equipment.test_one_hand_sword_str, m_equipment.test_armor];
    warrior_2.skills = [m_skill.warrior_2_1(), m_skill.warrior_2_2()];
    return warrior_2;
}

let warrior_3 = function() {
    let warrior_3 = load_character(m_job.warrior_3, MAX_EXP);
    warrior_3.buffs = [m_buff.warrior_3];
    warrior_3.debuffs = [];
    warrior_3.equipments = [m_equipment.test_one_hand_sword_str, m_equipment.test_shield, m_equipment.test_armor];
    warrior_3.skills = [m_skill.warrior_3_1(), m_skill.warrior_3_2()];
    return warrior_3;
}

let paladin_1 = function() {
    let paladin_1 = load_character(m_job.paladin_1, MAX_EXP);
    paladin_1.buffs = [m_buff.paladin_1];
    paladin_1.debuffs = [];
    paladin_1.equipments = [m_equipment.test_one_hand_sword_int, m_equipment.test_shield, m_equipment.test_armor];
    paladin_1.skills = [m_skill.paladin_1_1(), m_skill.paladin_1_2()];
    return paladin_1;
}

let mage_2 = function() {
    let mage_2 = load_character(m_job.mage_2, MAX_EXP);
    mage_2.buffs = [m_buff.warrior_2];
    mage_2.debuffs = [];
    mage_2.equipments = [m_equipment.test_one_hand_sword_int, m_equipment.test_book, m_equipment.test_cloth];
    mage_2.skills = [m_skill.mage_2_1(), m_skill.mage_2_2()];
    return mage_2;
}

let test_monster = function() {
    let test_monster = load_character(m_job.test_monster, MAX_EXP);
    test_monster.buffs = [];
    test_monster.debuffs = [];
    test_monster.equipments = [m_equipment.test_monster];
    test_monster.skills = [m_skill.warrior_1_1(), m_skill.paladin_1_2()];
    return test_monster;
}

let member_1;
let member_2;
let win_count_1 = 0;
let win_count_2 = 0;
let battle_time = 0;

function arena(member1, member2, times) {
    member_1 = member1;
    member_2 = member2;
    if (member_1.name === member_2.name) {
        member_1.name += "1";
        member_2.name += "2";
    }
    win_count_1 = 0;
    win_count_2 = 0;
    battle_time = times;
    init_battle(member_1, member_2);
    console.log(1);
}

function check_arena_over() {
    if (win_count_1 + win_count_2 === battle_time) {
        log("");
        log(member_1.name + "(" + win_count_1 + ")：" + Math.round(win_count_1 / battle_time * 1000) / 10 + "%");
        log(member_2.name + "(" + win_count_2 + ")：" + Math.round(win_count_2 / battle_time * 1000) / 10 + "%");
        $("#log").html(log_text);
        let h = $("body").height() - $(window).height() + 100;
        $(window).scrollTop(h);
    } else {
        console.log(win_count_1 + win_count_2 + 1);
        init_battle(member_1, member_2);
    }
}

function start_arena() {
    log_text = "";
    $("#log").html("");
    let member1 = $("#member_1").val();
    let member2 = $("#member_2").val();
    let time = $("#battle_time").val()
    if (time === "1") {
        turn_time = 1000;
    } else {
        turn_time = 0;
    }
    eval("arena(" + member1 + "()," + member2 + "()," + time + ")");
}

let log_text = "";

function log(str) {
    log_text += str + "<br />";
    if (battle_time === 1) {
        $("#log").html(log_text);
        let h = $("body").height() - $(window).height() + 100;
        $(window).scrollTop(h);
    }
}
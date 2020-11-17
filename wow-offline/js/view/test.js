/** 战斗测试 **/

let view_test;

$(document).ready(function () {
    view_test = $("#view_test");
    hide_view_test();
});

function show_view_test() {
    view_test.show();
}

function hide_view_test() {
    view_test.hide();
}

let member_1;
let member_2;
let win_count_1 = 0;
let win_count_2 = 0;
let battle_time = 0;

function start_arena() {
    battle_log_clear();
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
}

function check_arena_over() {
    if ((win_count_1 + win_count_2) % 10 === 0) {
        console.log(win_count_1 + win_count_2);
    }
    if (win_count_1 + win_count_2 === battle_time) {
        let log_view = $("#test_log");
        log_view.html(battle_log_text);
        log_view.scrollTop(log_view[0].scrollHeight);
    } else {
        init_battle(member_1, member_2);
    }
}

let test_two_hand_sword_str = create_equipment("test_two_hand_sword_str", MAX_LVL, MAX_LVL);
let test_two_hand_bow = create_equipment("test_two_hand_bow", MAX_LVL, MAX_LVL);
let test_one_hand_sword_str = create_equipment("test_one_hand_sword_str", MAX_LVL, MAX_LVL);
let test_one_hand_sword_int = create_equipment("test_one_hand_sword_int", MAX_LVL, MAX_LVL);
let test_shield_str = create_equipment("test_shield_str", MAX_LVL, MAX_LVL);
let test_shield_int = create_equipment("test_shield_int", MAX_LVL, MAX_LVL);
let test_book = create_equipment("test_book", MAX_LVL, MAX_LVL);
let test_armor = create_equipment("test_armor", MAX_LVL, MAX_LVL);
let test_chain = create_equipment("test_chain", MAX_LVL, MAX_LVL);
let test_leather = create_equipment("test_leather", MAX_LVL, MAX_LVL);
let test_cloth = create_equipment("test_cloth", MAX_LVL, MAX_LVL);

let warrior_1 = function () {
    let warrior_1 = load_character(dictionary_job.warrior_1, MAX_EXP);
    warrior_1.buffs = [dictionary_buff.warrior_1];
    warrior_1.debuffs = [];
    warrior_1.equipments = [test_two_hand_sword_str, test_armor];
    warrior_1.skills = [dictionary_skill.warrior_1_1(), dictionary_skill.warrior_1_2()];
    return warrior_1;
}

let warrior_2 = function () {
    let warrior_2 = load_character(dictionary_job.warrior_2, MAX_EXP);
    warrior_2.buffs = [dictionary_buff.warrior_2];
    warrior_2.debuffs = [];
    warrior_2.equipments = [test_one_hand_sword_str, test_one_hand_sword_str, test_armor];
    warrior_2.skills = [dictionary_skill.warrior_2_1(), dictionary_skill.warrior_2_2()];
    return warrior_2;
}

let warrior_3 = function () {
    let warrior_3 = load_character(dictionary_job.warrior_3, MAX_EXP);
    warrior_3.buffs = [dictionary_buff.warrior_3];
    warrior_3.debuffs = [];
    warrior_3.equipments = [test_one_hand_sword_str, test_shield_str, test_armor];
    warrior_3.skills = [dictionary_skill.warrior_3_1(), dictionary_skill.warrior_3_2()];
    return warrior_3;
}

let paladin_1 = function () {
    let paladin_1 = load_character(dictionary_job.paladin_1, MAX_EXP);
    paladin_1.buffs = [dictionary_buff.paladin_1];
    paladin_1.debuffs = [];
    paladin_1.equipments = [test_one_hand_sword_int, test_shield_int, test_armor];
    paladin_1.skills = [dictionary_skill.paladin_1_1(), dictionary_skill.paladin_1_2()];
    return paladin_1;
}

let paladin_2 = function () {
    let paladin_2 = load_character(dictionary_job.paladin_2, MAX_EXP);
    paladin_2.buffs = [dictionary_buff.paladin_2];
    paladin_2.debuffs = [];
    paladin_2.equipments = [test_one_hand_sword_str, test_shield_str, test_armor];
    paladin_2.skills = [dictionary_skill.paladin_2_1(), dictionary_skill.paladin_2_2()];
    return paladin_2;
}

let paladin_3 = function () {
    let paladin_3 = load_character(dictionary_job.paladin_3, MAX_EXP);
    paladin_3.buffs = [dictionary_buff.paladin_3];
    paladin_3.debuffs = [];
    paladin_3.equipments = [test_two_hand_sword_str, test_armor];
    paladin_3.skills = [dictionary_skill.paladin_3_1(), dictionary_skill.paladin_3_2()];
    return paladin_3;
}

let hunter_1 = function () {
    let hunter_1 = load_character(dictionary_job.hunter_1, MAX_EXP);
    hunter_1.buffs = [dictionary_buff.hunter_1];
    hunter_1.debuffs = [];
    hunter_1.equipments = [test_two_hand_bow, test_leather];
    hunter_1.skills = [dictionary_skill.hunter_1_1(), dictionary_skill.hunter_1_2()];
    return hunter_1;
}

let mage_2 = function () {
    let mage_2 = load_character(dictionary_job.mage_2, MAX_EXP);
    mage_2.buffs = [dictionary_buff.warrior_2];
    mage_2.debuffs = [];
    mage_2.equipments = [test_one_hand_sword_int, test_book, test_cloth];
    mage_2.skills = [dictionary_skill.mage_2_1(), dictionary_skill.mage_2_2()];
    return mage_2;
}

let test_monster = function () {
    let test_monster = load_character(dictionary_job.test_monster, MAX_EXP);
    test_monster.buffs = [];
    test_monster.debuffs = [];
    test_monster.equipments = [dictionary_equipment.test_monster];
    test_monster.skills = [dictionary_skill.mage_2_1(), dictionary_skill.mage_2_2(), dictionary_skill.paladin_1_2()];
    return test_monster;
}
/** 战斗测试界面 **/

let view_test;

$(document).ready(function () {
    view_test = $("#view_test");
    hide_view_test();
});

function show_view_test() {
    view_test.show();
    hide_view_bar();
}

function hide_view_test() {
    view_test.hide();
}

let attribute_base_1;
let attribute_base_2;
let win_count_1 = 0;
let win_count_2 = 0;

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
    in_test_mode = true;
    attribute_base_1 = member1;
    attribute_base_2 = member2;
    if (attribute_base_1.name === attribute_base_2.name) {
        attribute_base_1.name += "1";
        attribute_base_2.name += "2";
    }
    win_count_1 = 0;
    win_count_2 = 0;
    battle_time = times;
    start_battle(attribute_base_1, attribute_base_2);
}

function check_arena_over() {
    if ((win_count_1 + win_count_2) % 10 === 0) {
        console.log(win_count_1 + win_count_2);
    }
    if (win_count_1 + win_count_2 === battle_time) {
        in_test_mode = false;
        result_log();
        let log_view = $("#test_log");
        log_view.html(battle_log_text);
        log_view.scrollTop(log_view[0].scrollHeight);
    } else {
        start_battle(attribute_base_1, attribute_base_2);
    }
}

let warrior_1 = function () {
    let warrior_1 = create_character(11, MAX_EXP);
    warrior_1.buffs = [dictionary_buff[11]];
    warrior_1.debuffs = [];
    warrior_1.equipments = [
        create_equipment("test_two_hand_sword_str", MAX_LVL, MAX_LVL),
        create_equipment("test_armor", MAX_LVL, MAX_LVL)
    ];
    warrior_1.skills = dictionary_player_skill[11];
    return warrior_1;
}

let warrior_2 = function () {
    let warrior_2 = create_character(12, MAX_EXP);
    warrior_2.buffs = [dictionary_buff[12]];
    warrior_2.debuffs = [];
    warrior_2.equipments = [
        create_equipment("test_one_hand_sword_str", MAX_LVL, MAX_LVL),
        create_equipment("test_one_hand_sword_str", MAX_LVL, MAX_LVL),
        create_equipment("test_armor", MAX_LVL, MAX_LVL)
    ];
    warrior_2.skills = dictionary_player_skill[12];
    return warrior_2;
}

let warrior_3 = function () {
    let warrior_3 = create_character(13, MAX_EXP);
    warrior_3.buffs = [dictionary_buff[13]];
    warrior_3.debuffs = [];
    warrior_3.equipments = [
        create_equipment("test_one_hand_sword_str", MAX_LVL, MAX_LVL),
        create_equipment("test_shield_str", MAX_LVL, MAX_LVL),
        create_equipment("test_armor", MAX_LVL, MAX_LVL)
    ];
    warrior_3.skills = dictionary_player_skill[13];
    return warrior_3;
}

let paladin_1 = function () {
    let paladin_1 = create_character(21, MAX_EXP);
    paladin_1.buffs = [dictionary_buff[21]];
    paladin_1.debuffs = [];
    paladin_1.equipments = [
        create_equipment("test_one_hand_sword_int", MAX_LVL, MAX_LVL),
        create_equipment("test_shield_int", MAX_LVL, MAX_LVL),
        create_equipment("test_armor", MAX_LVL, MAX_LVL)
    ];
    paladin_1.skills = dictionary_player_skill[21];
    return paladin_1;
}

let paladin_2 = function () {
    let paladin_2 = create_character(22, MAX_EXP);
    paladin_2.buffs = [dictionary_buff[22]];
    paladin_2.debuffs = [];
    paladin_2.equipments = [
        create_equipment("test_one_hand_sword_str", MAX_LVL, MAX_LVL),
        create_equipment("test_shield_str", MAX_LVL, MAX_LVL),
        create_equipment("test_armor", MAX_LVL, MAX_LVL)
    ];
    paladin_2.skills = dictionary_player_skill[22];
    return paladin_2;
}

let paladin_3 = function () {
    let paladin_3 = create_character(23, MAX_EXP);
    paladin_3.buffs = [dictionary_buff[23]];
    paladin_3.debuffs = [];
    paladin_3.equipments = [
        create_equipment("test_two_hand_sword_str", MAX_LVL, MAX_LVL),
        create_equipment("test_armor", MAX_LVL, MAX_LVL)
    ];
    paladin_3.skills = dictionary_player_skill[23];
    return paladin_3;
}

let hunter_1 = function () {
    let hunter_1 = create_character(31, MAX_EXP);
    hunter_1.buffs = [dictionary_buff[31]];
    hunter_1.debuffs = [];
    hunter_1.equipments = [
        create_equipment("test_two_hand_bow", MAX_LVL, MAX_LVL),
        create_equipment("test_chain", MAX_LVL, MAX_LVL)
    ];
    hunter_1.skills = dictionary_player_skill[31];
    return hunter_1;
}

let hunter_2 = function () {
    let hunter_2 = create_character(32, MAX_EXP);
    hunter_2.buffs = [dictionary_buff[32]];
    hunter_2.debuffs = [];
    hunter_2.equipments = [
        create_equipment("test_two_hand_bow", MAX_LVL, MAX_LVL),
        create_equipment("test_chain", MAX_LVL, MAX_LVL)
    ];
    hunter_2.skills = dictionary_player_skill[32];
    return hunter_2;
}

let hunter_3 = function () {
    let hunter_3 = create_character(33, MAX_EXP);
    hunter_3.buffs = [dictionary_buff[33]];
    hunter_3.debuffs = [];
    hunter_3.equipments = [
        create_equipment("test_two_hand_bow", MAX_LVL, MAX_LVL),
        create_equipment("test_chain", MAX_LVL, MAX_LVL)
    ];
    hunter_3.skills = dictionary_player_skill[33];
    return hunter_3;
}

let mage_2 = function () {
    let mage_2 = create_character(92, MAX_EXP);
    mage_2.buffs = [dictionary_buff[12]];
    mage_2.debuffs = [];
    mage_2.equipments = [
        create_equipment("test_one_hand_sword_int", MAX_LVL, MAX_LVL),
        create_equipment("test_book", MAX_LVL, MAX_LVL),
        create_equipment("test_cloth", MAX_LVL, MAX_LVL)
    ];
    mage_2.skills = dictionary_player_skill[92];
    return mage_2;
}
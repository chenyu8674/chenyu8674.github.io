/** 存档管理 **/

let character_list = [];

let current_character;
let current_health_value = 0;
let current_shield_value = 0;

/**
 * 角色初始化（新建）
 * @param job
 * @param flag
 * @param name
 * @return {*}
 */
function new_character(job, flag, name) {
    let character = load_character(job, 0, name);
    character.buffs = eval("[dictionary_buff." + flag + "]");
    character.debuffs = [];
    character.equipments = [];
    character.equipments.push(create_equipment("newbee_shirt", 1, 1));
    // 新手装备
    switch (job) {
        case 11:
            character.equipments.push(create_equipment("newbee_two_hand_sword_str", 1, 1));
            break;
        case 12:
            character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
            character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
            break;
        case 13:
            character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
            character.equipments.push(create_equipment("newbee_shield_str", 1, 1));
            break;
        case 21:
            character.equipments.push(create_equipment("newbee_one_hand_sword_int", 1, 1));
            character.equipments.push(create_equipment("newbee_shield_str", 1, 1));
            break;
        case 22:
            character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
            character.equipments.push(create_equipment("newbee_shield_str", 1, 1));
            break;
        case 23:
            character.equipments.push(create_equipment("newbee_two_hand_sword_str", 1, 1));
            break;
    }
    character.skills = eval("[dictionary_player_skill." + flag + "_1(), dictionary_player_skill." + flag + "_2()]");
    return character;
}

/**
 * 角色初始化（读档）
 * @param job
 * @param exp
 * @param name
 * @return {*}
 */
function load_character(job, exp, name) {
    let character = new_role_base();
    character.job = job;
    character.name = dictionary_job.job_name[job];
    character = add_experience(character, exp);
    character = calculate_base_property(character);
    if (name != null) {
        character.name = name;
    }
    return character;
}
/** 存档管理 **/

let character_list = [];

let current_character;
let current_index = 0;

let current_health_value = 0;
let current_shield_value = 0;

$(document).ready(function () {
    if (!window.localStorage) {
        alert("不支持存档，请更换浏览器访问");
        return false;
    }
    // load_data();
    if (current_character != null) {
        // 有存档数据时，直接进入地图页
        hide_view_character();
        show_view_map();
    }
});

function release_data() {
    if (confirm('警告！确认删除存档数据？')) {
        localStorage.clear();
        location.reload();
    }
}

/**
 * 保存角色（存档）
 */
function save_data() {
    let save_character = {};
    save_character.name = current_character.name;
    save_character.job = current_character.job;
    save_character.exp = current_character.exp;
    save_character.equipments = current_character.equipments;
    character_list[current_index] = save_character;
    let json = JSON.stringify(character_list);
    localStorage.setItem("character_list", json);
}

/**
 * 角色初始化（读档）
 * @return {*}
 */
function load_data() {
    let character_list = JSON.parse(localStorage.getItem("character_list"));
    if (character_list == null || character_list.length === 0) {
        // 无存档
        return;
    }
    let character_obj = character_list[current_index];
    create_character(character_obj.job, character_obj.exp, character_obj.name);
    current_character.equipments = character_obj.equipments;
    save_data();
}

/**
 * 角色初始化（新建）
 * @param job
 * @param exp
 * @param name
 */
function create_character(job, exp, name) {
    current_character = new_role_base();
    current_character.job = job;
    if (name != null) {
        current_character.name = name;
    } else {
        current_character.name = dictionary_job.job_name[job];
    }
    add_experience(exp);
    current_character = calculate_base_property(current_character);
    current_character.skills = dictionary_player_skill[job];
    current_character.buffs = [dictionary_buff[job]];
    current_character.debuffs = [];
    current_character.dots = [];
    current_character.equipments = [];
    if (exp === 0) {
        // 新手装备
        current_character.equipments.push(create_equipment("newbee_shirt", 1, 1));
        switch (job) {
            case 11:
                current_character.equipments.push(create_equipment("newbee_two_hand_sword_str", 1, 1));
                break;
            case 12:
                current_character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
                current_character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
                break;
            case 13:
                current_character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
                current_character.equipments.push(create_equipment("newbee_shield_str", 1, 1));
                break;
            case 21:
                current_character.equipments.push(create_equipment("newbee_one_hand_sword_int", 1, 1));
                current_character.equipments.push(create_equipment("newbee_shield_str", 1, 1));
                break;
            case 22:
                current_character.equipments.push(create_equipment("newbee_one_hand_sword_str", 1, 1));
                current_character.equipments.push(create_equipment("newbee_shield_str", 1, 1));
                break;
            case 23:
                current_character.equipments.push(create_equipment("newbee_two_hand_sword_str", 1, 1));
                break;
        }
    }
    save_data();
    // 刷新状态栏
    role_battle_1 = get_battle_attribute(current_character, "battle_1");
    role_battle_1.current_health_value = role_battle_1.max_health_value;
    current_health_value = role_battle_1.max_health_value;
    refresh_current_status();
    return current_character;
}

/**
 * 获得经验
 * @param exp
 * @return {*}
 */
function add_experience(exp) {
    current_character.exp += exp;
    if (current_character.exp > MAX_EXP) {
        current_character.exp = MAX_EXP;
    }
    current_character.lvl = get_level(current_character.exp);
    save_data();
}
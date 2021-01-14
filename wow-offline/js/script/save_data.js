/** 存档管理 **/

let character_list = [];

let current_character;
let current_index = 0;

$(document).ready(function () {
    if (!window.localStorage) {
        alert("不支持存档，请更换浏览器访问");
        return false;
    }
    load_data();
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
    save_character.items = current_character.items;
    save_character.money = current_character.money;
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
    current_character.items = character_obj.items;
    current_character.money = character_obj.money;
    // 刷新状态栏
    calculate_role_1(current_character);
    fill_role_1_health();
    refresh_current_status();
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
    // if (current_character.exp === 0) {
    //     add_experience(MAX_EXP);
    // }
    current_character = calculate_base_property(current_character);
    current_character.skills = dictionary_player_skill[job];
    current_character.skills.push(dictionary_equipment_skill.fire_of_sulfuras());
    current_character.buffs = [dictionary_buff[job]];
    current_character.debuffs = [];
    current_character.dots = [];
    current_character.equipments = [];
    current_character.items = [];
    current_character.money = 0;
    if (is_in_local_mode()) {
        current_character.money = 99999999;
    }
    if (exp === 0) {
        // 新手装备
        current_character.equipments.push("新手衬衫");
        switch (job) {
            case 11:
            case 23:
                current_character.equipments.push("训练双手剑");
                current_character.equipments.push("训练胸铠");
                break;
            case 12:
                current_character.equipments.push("训练单手剑");
                current_character.equipments.push("训练单手剑");
                current_character.equipments.push("训练胸铠");
                break;
            case 13:
            case 22:
                current_character.equipments.push("训练单手剑");
                current_character.equipments.push("训练盾牌");
                current_character.equipments.push("训练胸铠");
                break;
            case 21:
                current_character.equipments.push("训练单手锤");
                current_character.equipments.push("训练盾牌");
                current_character.equipments.push("训练胸铠");
                break;
            case 31:
            case 32:
            case 33:
                current_character.equipments.push("训练之弓");
                current_character.equipments.push("训练链甲");
                break;
        }
    }

    // for (let i = 0; i < MAX_ITEMS - 1; i++) {
    //     push_equipment();
    // }
    // let equipment = "阿什坎迪，兄弟会之剑";
    // current_character.items.push(equipment);

    // 刷新状态栏
    calculate_role_1(current_character);
    fill_role_1_health();
    refresh_current_status();
    return current_character;
}

/**
 * 添加测试装备
 */
function push_equipment() {
    let model = create_random_equipment_model(current_character.lvl, 6, null, 1);
    current_character.items.push(model);
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
}
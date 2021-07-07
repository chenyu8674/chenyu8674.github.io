/** 存档管理 **/

let character_list = [];
let bank_item_list = [];
let bank_money = 0;

let current_character;
let current_index = 0;

$(document).ready(function () {
    if (!window.localStorage) {
        alert("不支持存档，请更换浏览器访问");
        return;
    }
    load_data();
    if (character_list == null || character_list.length === 0) {
        show_view_character_create();
    } else {
        show_view_character_select();
    }
});

// 当前版本号
let CURRENT_VERSION = 1.00000001;

/**
 * 从localStorage读取存档
 */
function load_data() {
    let save_data = JSON.parse(localStorage.getItem("save_data"));
    if (save_data == null || save_data.version == null || Math.floor(save_data.version) < Math.floor(CURRENT_VERSION)) {
        save_data = {};
        save_data.version = CURRENT_VERSION;
        save_data.bank_item_list = [];
        save_data.character_list = [];
    }
    bank_item_list = save_data.bank_item_list;
    if (bank_item_list == null) {
        bank_item_list = [];
    }
    bank_money = save_data.bank_money;
    if (bank_money == null) {
        bank_money = 0;
    }
    character_list = save_data.character_list;
}

/**
 * 清空localStorage存档
 */
function release_data() {
    if (confirm('警告！确认删除存档数据？')) {
        localStorage.clear();
        location.reload();
    }
}

/**
 * 加载角色
 */
function load_character() {
    let character_obj = character_list[current_index];
    create_character(character_obj.job, character_obj.exp, character_obj.name);
    current_character.equipments = character_obj.equipments;
    current_character.items = character_obj.items;
    current_character.banks = character_obj.banks == null ? [] : character_obj.banks;
    current_character.money = character_obj.money;
    // 刷新状态栏
    calculate_role_1(current_character);
    fill_role_1_health();
    refresh_current_status();
    // 进入地图页
    hide_view_character_create();
    show_view_map();
}

/**
 * 保存角色（存档）
 */
function save_data() {
    let save_character = {};
    save_character.name = current_character.name;
    save_character.job = current_character.job;
    save_character.exp = current_character.exp;
    clear_empty_item(current_character.equipments);
    save_character.equipments = current_character.equipments;
    clear_empty_item(current_character.items);
    save_character.items = current_character.items;
    clear_empty_item(current_character.banks);
    save_character.banks = current_character.banks;
    save_character.money = current_character.money;
    character_list[current_index] = save_character;
    let save_data = {};
    clear_empty_item(bank_item_list);
    save_data.version = CURRENT_VERSION;
    save_data.bank_item_list = bank_item_list;
    save_data.bank_money = bank_money;
    save_data.character_list = character_list;
    let json = JSON.stringify(save_data);
    localStorage.setItem("save_data", json);
}

/**
 * 清除列表末尾空项，节省存储空间
 */
function clear_empty_item(list) {
    for (let i = list.length - 1; i >= 0; i--) {
        let item = list[i];
        if (item == null) {
            list.splice(i, 1);
        } else {
            break;
        }
    }
}

/**
 * 角色初始化（新建）
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
    if (is_in_local_mode() || is_vip()) {
        if (current_character.exp === 0) {
            add_experience(20000);
        }
    }
    current_character = calculate_base_property(current_character);
    current_character.skills = dictionary_player_skill[job];
    current_character.hit = dictionary_player_hit[job];
    let buff = dictionary_buff[job];
    current_character.buffs = buff.T < 0 ? [buff] : [];
    current_character.debuffs = [];
    current_character.dots = [];
    current_character.equipments = [];
    current_character.items = [];
    current_character.banks = [];
    current_character.money = 0;
    if (is_in_local_mode()) {
        // 添加测试装备
        for (let i = 0; i < MAX_ITEMS - 10; i++) {
            let param = {};
            param.c_lvl = current_character.lvl;
            param.rare = 5;
            let model = get_random_equipment_model(param);
            model.affix[1] = 0;
            model.affix[2] = 34;
            current_character.items.push(model);
        }
    }
    if (is_vip()) {
        current_character.money = 1000000;
    }
    if (exp === 0) {
        if (is_vip()) {
            current_character.equipments.push(33);
            current_character.equipments.push(34);
        } else {
            current_character.equipments.push(31);
            current_character.equipments.push(32);
        }
        switch (job) {
            case 11:
            case 23:
                current_character.equipments.push(11);
                current_character.equipments.push(24);
                break;
            case 12:
                current_character.equipments.push(12);
                current_character.equipments.push(12);
                current_character.equipments.push(24);
                break;
            case 13:
            case 22:
                current_character.equipments.push(12);
                current_character.equipments.push(14);
                current_character.equipments.push(24);
                break;
            case 21:
                current_character.equipments.push(13);
                current_character.equipments.push(14);
                current_character.equipments.push(24);
                break;
            case 31:
            case 32:
                current_character.equipments.push(15);
                current_character.equipments.push(23);
                break;
            case 41:
            case 43:
                current_character.equipments.push(17);
                current_character.equipments.push(23);
                break;
            case 33:
            case 42:
                current_character.equipments.push(19);
                current_character.equipments.push(19);
                current_character.equipments.push(23);
                break;
            case 51:
            case 54:
                current_character.equipments.push(17);
                current_character.equipments.push(22);
                break;
            case 52:
            case 53:
                current_character.equipments.push(16);
                current_character.equipments.push(22);
                break;
            case 61:
            case 62:
            case 63:
                current_character.equipments.push(18);
                current_character.equipments.push(18);
                current_character.equipments.push(22);
                break;
            case 71:
            case 72:
            case 73:
            case 81:
            case 82:
            case 83:
            case 91:
            case 92:
            case 93:
                current_character.equipments.push(17);
                current_character.equipments.push(21);
                break;
        }
    }

    current_character.items.push(19019);
    current_character.items.push(17182);
    current_character.items.push(22589);
    current_character.items.push(12939);
    current_character.items.push(12940);

    // 刷新状态栏
    calculate_role_1(current_character);
    fill_role_1_health();
    refresh_current_status();
    return current_character;
}

/**
 * 是否为测试角色
 */
function is_vip() {
    // return is_in_local_mode() || current_character.name === "GHOST"
    return true;
}

/**
 * 获得经验
 */
function add_experience(exp) {
    current_character.exp += exp;
    if (current_character.exp > MAX_EXP) {
        current_character.exp = MAX_EXP;
    }
    current_character.lvl = get_level(current_character.exp);
}
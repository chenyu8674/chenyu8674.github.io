let view_equipment;
let view_current_items;

let current_tab = 1;
let current_status_tab_1;
let current_status_tab_2;

function show_view_equipment() {
    view_equipment.show();
    refresh_current_items();
}

function hide_view_equipment() {
    view_equipment.hide();
}

$(document).ready(function () {
    view_equipment = $("#view_equipment");
    view_current_items = $("#current_items");
    current_status_tab_1 = $("#current_status_tab_1");
    current_status_tab_2 = $("#current_status_tab_2");
    current_status_tab_1.click(function () {
        current_tab = 1;
        refresh_current_status_1();
        current_status_tab_1.attr("class", "status_tab_click");
        current_status_tab_2.attr("class", "status_tab_normal");
    });
    current_status_tab_2.click(function () {
        current_tab = 2;
        refresh_current_status_2();
        current_status_tab_2.attr("class", "status_tab_click");
        current_status_tab_1.attr("class", "status_tab_normal");
    });
    $("#current_pack_bag").click(function () {
        pack_bag();
        refresh_current_items();
        save_data();
    });
    hide_view_equipment();
});

function pack_bag() {
    current_character.items.sort(function (a, b) {
        if (a == null) {
            return 1;
        }
        if (b == null) {
            return -1;
        }
        if (a.pos !== b.pos) {
            return a.pos - b.pos;
        }
        if (a.type !== b.type) {
            return a.type - b.type;
        }
        if (a.rare !== b.rare) {
            return a.rare - b.rare;
        }
        return a.icon > b.icon ? 1 : -1;
    });
}

function refresh_current_status() {
    let role_whole = role_battle_1;
    refresh_current_equipment();
    refresh_current_items();

    let job_flag = dictionary_job.job_flag[10 * Math.floor(role_whole.job / 10)];
    $("#current_equipments_icon").attr("src", "img/job/" + job_flag + ".png");
    $("#current_status_name").text(role_whole.name);
    $("#current_status_job").text("等级 " + role_whole.lvl + " " + dictionary_job.job_name[role_whole.job]);
    refresh_current_status_exp();
    $("#current_status_area_2").html(
        "承受伤害：" + role_whole.taken_damage_percent + "%<br/>" +
        "承受治疗：" + role_whole.taken_heal_percent + "%<br/>"
    );
    if (current_tab === 1) {
        current_status_tab_1.click();
    } else {
        current_status_tab_2.click();
    }
}

function refresh_current_status_exp() {
    let role_whole = role_battle_1;
    let lvl = current_character.lvl;
    let exp_percent = get_exp_percent(lvl, current_character.exp);
    let exp = Math.round(exp_percent * LVL_EXP[lvl - 1]);
    let exp_max = LVL_EXP[lvl - 1];
    $("#current_status_area_1").html(
        "生命值：" + role_whole.current_health_value + "/" + role_whole.max_health_value + "<br/>" +
        "护盾值：" + role_whole.current_shield_value + "<br/>" +
        "经验值：" + (lvl >= MAX_LVL ? LVL_EXP[MAX_LVL - 1] + "/" + LVL_EXP[MAX_LVL - 1] : exp + "/" + exp_max)
    );
}

function refresh_current_status_1() {
    let role = role_battle_1;
    let role_html = "";
    role_html += "力量：" + role.str + "<br/>";
    role_html += "敏捷：" + role.agi + "<br/>";
    role_html += "耐力：" + role.sta + "<br/>";
    role_html += "智力：" + role.int + "<br/>";
    role_html += "精神：" + role.spr + "<br/>";
    role_html += "<br/>";
    role_html += "攻击强度：" + role.attack_power + "<br/>";
    role_html += "法术强度：" + role.magic_power + "<br/>";
    role_html += "治疗强度：" + role.heal_power + "<br/>";
    role_html += "<br/>";
    role_html += "攻击护甲：" + role.armor_attack + "<br/>";
    role_html += "攻击减伤：" + (calculate_armor_attack(role) * 100).toFixed(2) + "%<br/>";
    role_html += "法术护甲：" + role.armor_magic + "<br/>";
    role_html += "法术减伤：" + (calculate_armor_magic(role) * 100).toFixed(2) + "%<br/>";
    role_html += "<br/>";
    role_html += "命中等级：" + role.hit_rate + "<br/>";
    role_html += "命中几率：" + calculate_original_hit(role).toFixed(2) + "%<br/>";
    role_html += "暴击等级：" + role.critical_rate + "<br/>";
    role_html += "暴击几率：" + calculate_original_critical(role).toFixed(2) + "%<br/>";
    role_html += "暴击伤害：" + role.critical_damage + "%<br/>";
    role_html += "闪避等级：" + role.dodge_rate + "<br/>";
    role_html += "闪避几率：" + calculate_original_dodge(role).toFixed(2) + "%<br/>";
    if (has_equip_shield(role)) {
        let block_chance = calculate_original_block(role).toFixed(2);
        role_html += "格挡等级：" + role.block_rate + "<br/>";
        role_html += "格挡几率：" + block_chance + "%<br/>";
        role_html += "盾格挡值：" + role.block_value + "<br/>";
    }
    $("#current_status").html(role_html);
}

function refresh_current_status_2() {
    let role = role_battle_1;
    let role_html = "";
    role_html += "物理伤害：" + role.damage_physical + "%<br/>";
    role_html += "火焰伤害：" + role.damage_fire + "%<br/>";
    role_html += "冰霜伤害：" + role.damage_frost + "%<br/>";
    role_html += "自然伤害：" + role.damage_natural + "%<br/>";
    role_html += "奥术伤害：" + role.damage_arcane + "%<br/>";
    role_html += "神圣伤害：" + role.damage_holy + "%<br/>";
    role_html += "暗影伤害：" + role.damage_shadow + "%<br/>";
    role_html += "<br/>";
    role_html += "物理抗性：" + role.res_physical + "<br/>";
    role_html += "火焰抗性：" + role.res_fire + "<br/>";
    role_html += "冰霜抗性：" + role.res_frost + "<br/>";
    role_html += "自然抗性：" + role.res_natural + "<br/>";
    role_html += "奥术抗性：" + role.res_arcane + "<br/>";
    role_html += "神圣抗性：" + role.res_holy + "<br/>";
    role_html += "暗影抗性：" + role.res_shadow + "<br/>";
    role_html += "<br/>";
    role_html += "物理穿透：" + role.pierce_physical + "<br/>";
    role_html += "火焰穿透：" + role.pierce_fire + "<br/>";
    role_html += "冰霜穿透：" + role.pierce_frost + "<br/>";
    role_html += "自然穿透：" + role.pierce_natural + "<br/>";
    role_html += "奥术穿透：" + role.pierce_arcane + "<br/>";
    role_html += "神圣穿透：" + role.pierce_holy + "<br/>";
    role_html += "暗影穿透：" + role.pierce_shadow + "<br/>";
    $("#current_status").html(role_html);
}

/**
 * 显示装备介绍
 */
function show_equipment_info(equipment, x, y) {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.attr('id', 'equipment_info');
    info.addClass("info_window");
    info.css("position", "fixed");
    info.css("left", x + "px");
    info.css("top", y + "px");
    let rare_color = eval("color_rare_" + equipment.rare);
    info.append("<p style='font-weight:bold;color:" + rare_color + "'>" + equipment.name + "</p>");
    info.append("<p style='color:goldenrod'>物品等级：" + equipment.e_lvl + "</p>");
    let can_equip = check_can_equip(equipment);
    let can_not = can_equip ? "" : " style='color:red'";
    info.append("<p" + can_not + ">" + get_type_name_by_rare(equipment.rare) + "的 " + equipment.type_name + "</p>");
    for (let i = 0; i < equipment.effect.length; i++) {
        let effect = equipment.effect[i];
        effect = effect.split("+=");
        if (effect[1] === 0) {
            continue;
        }
        let text = effect[1] + " " + dictionary_attribute_name[effect[0]];
        if (effect[1] > 0) {
            text = "+" + text;
        }
        text = text.replace(" %", "% ");
        info.append("<p>" + text + "</p>");
    }
    can_not = current_character.lvl >= equipment.c_lvl ? "" : " style='color:red'";
    info.append("<p" + can_not + ">需要等级：" + equipment.c_lvl + "</p>");
    info.append("<span style='font-size: 10px;'>" + get_money_html(get_equipment_price(equipment), 10) + "</span>");
    $("body").append(info);
    if (info.offset().top + info.outerHeight() > view_equipment.outerHeight() + 5) {
        info.css("top", view_equipment.outerHeight() - info.outerHeight() - 5 + "px");
    }
}

/**
 * 隐藏装备介绍
 */
function hide_equipment_info() {
    $("#equipment_info").remove();
}

/**
 * 绘制装备栏
 */
function refresh_current_equipment() {
    let role = role_battle_1;
    let cell_old = $(".equipment");
    cell_old.css("border-color", "slategray");
    cell_old.css("background-image", "");
    cell_old.css("box-shadow", "");
    cell_old.off('mouseenter').unbind('mouseleave');
    cell_old.off('contextmenu');
    let equipments = role.equipments;
    let ring_count = 0;
    let trinket_count = 0;
    let weapon_count = 0;
    for (let i = 0; i < equipments.length; i++) {
        let equipment = equipments[i];
        let pos_new = equipment.pos;
        let rare = equipment.rare;
        let icon = equipment.icon;
        if (equipment.pos === 13) {
            pos_new += ring_count;
            ring_count++;
        }
        if (equipment.pos === 14) {
            pos_new += 1 + trinket_count;
            trinket_count++;
        }
        if (equipment.pos === 15) {
            pos_new += 2 + weapon_count;
            weapon_count++;
        }
        if (equipment.pos === 16) {
            pos_new = 18;
        }
        let cell = $("#current_equipments_" + pos_new);
        let rare_color = eval("color_rare_" + rare);
        cell.css("border-color", rare_color);
        cell.css("box-shadow", "0 0 10px inset " + rare_color);
        cell.css("background-image", "url(./img/equipment/" + icon + ".jpg)");
        cell.hover(function () {
            let view = $(this);
            show_equipment_info(equipment, view[0].offsetWidth + view.offset().left, view[0].offsetHeight + view.offset().top);
        }, function () {
            hide_equipment_info();
        });
        // 右键点击事件，卸下装备
        cell.contextmenu(function (e) {
            e.preventDefault();
            take_off_equipment(equipment);
        });
    }
    let off_hand = $("#current_equipments_18");
    if (has_equip_two_hand_weapon()) {
        off_hand.css("background-image", $("#current_equipments_17").css("background-image"));
        off_hand.addClass("gray");
    } else {
        off_hand.removeClass("gray");
    }
}

/**
 * 绘制物品栏
 */
function refresh_current_items() {
    view_current_items.empty();
    let items = current_character.items;
    for (let i = 0; i < MAX_ITEMS; i++) {
        let item = items[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        cell.css("left", 11 + (i % 10) * 58 + "px");
        cell.css("top", 11 + Math.floor(i / 10) * 58 + "px");
        if (item != null) {
            let rare_color = eval("color_rare_" + item.rare);
            cell.css("border-color", rare_color);
            cell.css("box-shadow", "0 0 10px inset " + rare_color);
            cell.css("background-image", "url(./img/equipment/" + item.icon + ".jpg)");
            cell.hover(function () {
                let view = $(this);
                show_equipment_info(item, view[0].offsetWidth + view.offset().left, view[0].offsetHeight + view.offset().top);
            }, function () {
                hide_equipment_info();
            });
            // 右键点击事件，穿上装备
            cell.contextmenu(function (e) {
                e.preventDefault();
                equip_equipment(i);
            });
        }
        view_current_items.append(cell);
    }
    $("#current_money").html(get_money_html(current_character.money, 20));
}

/**
 * 获取指定位置已装备的数量
 * @param pos 13戒指 14饰品 15主手 16副手
 * @return {number}
 */
function get_equipment_count_by_pos(pos) {
    let count = 0;
    let equipments = current_character.equipments;
    for (let j = 0; j < equipments.length; j++) {
        let equipment = equipments[j];
        if (equipment.pos === pos) {
            count++;
        }
    }
    return count;
}

/**
 * 是否装备了盾牌
 * @return {boolean}
 */
function has_equip_shield(role) {
    let equipments = role.equipments;
    for (let j = 0; j < equipments.length; j++) {
        let equipment = equipments[j];
        if (equipment.type === 41) {
            return true;
        }
    }
    return false;
}

/**
 * 是否装备了双手武器
 * @return {boolean}
 */
function has_equip_two_hand_weapon() {
    let equipments = current_character.equipments;
    for (let j = 0; j < equipments.length; j++) {
        let equipment = equipments[j];
        if (equipment.pos === 15 && is_in_array(equipment.type, [21, 22, 23, 24, 25, 31, 32, 33])) {
            return true;
        }
    }
    return false;
}

/**
 * 获取背包中空格数量
 * @return {number}
 */
function get_item_empty_count() {
    let count = 0;
    let items = current_character.items;
    for (let k = 0; k < MAX_ITEMS; k++) {
        if (items[k] == null) {
            count++;
        }
    }
    return count;
}

/**
 * 判断是否为双持职业
 */
function can_equip_two_weapons() {
    let job = 10 * Math.floor(current_character.job / 10);
    return is_in_array(job, [10, 40, 60]);
}

/**
 * 尝试从背包穿上装备
 * @param index 背包位置
 */
function equip_equipment(index) {
    let items = current_character.items;
    let item = items[index];
    if (current_character.lvl < item.c_lvl) {
        return;// 等级不够
    }
    if (!check_can_equip(item)) {
        return;// 装备类型与职业不符
    }
    if (item.pos === 15 && is_in_array(item.type, [21, 22, 23, 24, 25, 31, 32, 33])
        && get_equipment_count_by_pos(15) >= 1 && get_equipment_count_by_pos(16) >= 1
        && get_item_empty_count() === 0) {
        return;// 双手武器替换主副手，背包无空格
    }
    hide_equipment_info();

    let equipments = current_character.equipments;
    let equipment_exchange_1 = null;// 将被替换的装备1
    let equipment_exchange_2 = null;// 将被替换的装备2（换上双手武器时）

    if (item.pos === 13 || item.pos === 14) {
        // 戒指，饰品
        let count = get_equipment_count_by_pos(item.pos);
        if (count === 2) {
            for (let j = 0; j < equipments.length; j++) {
                let equipment = equipments[j];
                if (equipment.pos === item.pos) {
                    equipment_exchange_1 = equipment;
                    equipments[j] = item;
                    break;
                }
            }
        } else {
            equipments.push(item);
        }
    } else if (item.pos === 15 && !has_equip_two_hand_weapon() && is_in_array(item.type, [11, 12, 13, 14, 15]) && can_equip_two_weapons() && get_equipment_count_by_pos(15) === 1 && get_equipment_count_by_pos(16) === 0) {
        // 双持职业副手为空时装备单手武器
        equipments.push(item);
    } else if (item.pos === 16 && get_equipment_count_by_pos(15) === 2) {
        // 双持时装备副手
        for (let j = equipments.length - 1; j >= 0; j--) {
            let equipment = equipments[j];
            if (equipment.pos === 15) {
                equipment_exchange_1 = equipment;
                equipments.splice(j, 1);
                break;
            }
        }
        equipments.push(item);
    } else if (item.pos === 15 && is_in_array(item.type, [21, 22, 23, 24, 25, 31, 32, 33])) {
        // 装备双手武器
        for (let j = 0; j < equipments.length; j++) {
            let equipment = equipments[j];
            if (equipment.pos === 15 || equipment.pos === 16) {
                if (equipment_exchange_1 == null) {
                    equipment_exchange_1 = equipment;
                } else {
                    equipment_exchange_2 = equipment;
                }
                equipments.splice(j, 1);
                j--;
            }
        }
        equipments.push(item);
    } else if (item.pos === 16 && get_equipment_count_by_pos(15) === 1 && has_equip_two_hand_weapon()) {
        // 装备双手武器时装备副手
        for (let j = 0; j < equipments.length; j++) {
            let equipment = equipments[j];
            if (equipment.pos === 15) {
                equipment_exchange_1 = equipment;
                equipments.splice(j, 1);
                break;
            }
        }
        equipments.push(item);
    } else {
        for (let j = 0; j < equipments.length; j++) {
            let equipment = equipments[j];
            if (equipment.pos === item.pos) {
                equipment_exchange_1 = equipment;
                equipments.splice(j, 1);
                break;
            }
        }
        equipments.push(item);
    }

    items[index] = null;
    for (let k = 0; k < MAX_ITEMS; k++) {
        if (items[k] == null && equipment_exchange_1 != null) {
            items[k] = equipment_exchange_1;
            equipment_exchange_1 = null;
        } else if (items[k] == null && equipment_exchange_2 != null) {
            items[k] = equipment_exchange_2;
            equipment_exchange_2 = null;
        }
    }
    role_battle_1 = get_battle_attribute(current_character, "battle_1");
    if (current_health_value > role_battle_1.max_health_value) {
        current_health_value = role_battle_1.max_health_value;
    }
    role_battle_1.current_health_value = current_health_value;
    refresh_current_status();
    refresh_battle_status(true);
    save_data();
}

/**
 * 尝试卸下指定装备
 * @param equipment 尝试卸下的装备
 */
function take_off_equipment(equipment) {
    if (get_item_empty_count() === 0) {
        return;// 背包已满
    }
    hide_equipment_info();
    let equipments = current_character.equipments;
    for (let j = 0; j < equipments.length; j++) {
        if (equipments[j] === equipment) {
            equipments.splice(j, 1);
            break;
        }
    }
    let items = current_character.items;
    for (let k = 0; k < MAX_ITEMS; k++) {
        if (items[k] == null) {
            items[k] = equipment;
            break;
        }
    }
    role_battle_1 = get_battle_attribute(current_character, "battle_1");
    if (current_health_value > role_battle_1.max_health_value) {
        current_health_value = role_battle_1.max_health_value;
    }
    role_battle_1.current_health_value = current_health_value;
    refresh_current_status();
    refresh_battle_status(true);
    save_data();
}

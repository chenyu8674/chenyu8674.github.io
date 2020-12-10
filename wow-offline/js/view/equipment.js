let view_equipment;
let view_current_items

$(document).ready(function () {
    view_equipment = $("#view_equipment");
    view_current_items = $("#current_items");
    hide_view_equipment();
});

function show_view_equipment() {
    view_equipment.show();
}

function hide_view_equipment() {
    view_equipment.hide();
}

function refresh_current_status(role) {
    let role_whole;
    if (role == null) {
        role_whole = role_battle_1;
    }
    // console.log(role_whole);
    refresh_current_equipment(role_whole);
    refresh_current_items(role_whole);
    let role_html = "";
    role_html += role_whole.name + "<br/>";
    role_html += "等级 " + role_whole.lvl + " " + dictionary_job.job_name[role_whole.job] + "<br/>";
    role_html += "生命值：" + role_whole.current_health_value + "/" + role_whole.max_health_value + "<br/>";
    role_html += "护盾值：" + role_whole.current_shield_value + "<br/>";
    role_html += "<br/>";
    role_html += "力量：" + role_whole.str + "<br/>";
    role_html += "敏捷：" + role_whole.agi + "<br/>";
    role_html += "耐力：" + role_whole.sta + "<br/>";
    role_html += "智力：" + role_whole.int + "<br/>";
    role_html += "精神：" + role_whole.spr + "<br/>";
    role_html += "<br/>";
    role_html += "攻击强度：" + role_whole.attack_power + "<br/>";
    role_html += "法术强度：" + role_whole.magic_power + "<br/>";
    role_html += "治疗强度：" + role_whole.heal_power + "<br/>";
    role_html += "<br/>";
    role_html += "命中等级：" + role_whole.hit_rate + "<br/>";
    role_html += "命中率：" + calculate_original_hit(role_whole).toFixed(2) + "%<br/>";
    role_html += "暴击等级：" + role_whole.critical_rate + "<br/>";
    role_html += "暴击率：" + calculate_original_critical(role_whole).toFixed(2) + "%<br/>";
    role_html += "暴击伤害：" + role_whole.critical_damage + "%<br/>";
    role_html += "闪避等级：" + role_whole.dodge_rate + "<br/>";
    role_html += "闪避率：" + calculate_original_dodge(role_whole).toFixed(2) + "%<br/>";
    let block_chance = calculate_original_block(role_whole).toFixed(2);
    role_html += "格挡等级：" + role_whole.block_rate + "<br/>";
    role_html += "格挡率：" + block_chance + "%<br/>";
    if (block_chance > 0) {
        role_html += "格挡值：" + role_whole.block_value + "<br/>";
    }
    role_html += "<br/>";
    role_html += "攻击护甲：" + role_whole.armor_attack + "<br/>";
    role_html += "攻击减伤：" + (calculate_armor_attack(role_whole) * 100).toFixed(2) + "%<br/>";
    role_html += "法术护甲：" + role_whole.armor_magic + "<br/>";
    role_html += "法术减伤：" + (calculate_armor_magic(role_whole) * 100).toFixed(2) + "%<br/>";
    role_html += "<br/>";
    role_html += "伤害比例：" + role_whole.taken_damage_percent + "%<br/>";
    role_html += "治疗比例：" + role_whole.taken_heal_percent + "%<br/>";
    role_html += "<br/>";
    role_html += "物理伤害：" + role_whole.damage_physical + "%<br/>";
    role_html += "火焰伤害：" + role_whole.damage_fire + "%<br/>";
    role_html += "冰霜伤害：" + role_whole.damage_frost + "%<br/>";
    role_html += "自然伤害：" + role_whole.damage_natural + "%<br/>";
    role_html += "奥术伤害：" + role_whole.damage_arcane + "%<br/>";
    role_html += "神圣伤害：" + role_whole.damage_holy + "%<br/>";
    role_html += "暗影伤害：" + role_whole.damage_shadow + "%<br/>";
    role_html += "<br/>";
    role_html += "物理抗性：" + role_whole.res_physical + "%<br/>";
    role_html += "火焰抗性：" + role_whole.res_fire + "%<br/>";
    role_html += "冰霜抗性：" + role_whole.res_frost + "%<br/>";
    role_html += "自然抗性：" + role_whole.res_natural + "%<br/>";
    role_html += "奥术抗性：" + role_whole.res_arcane + "%<br/>";
    role_html += "神圣抗性：" + role_whole.res_holy + "%<br/>";
    role_html += "暗影抗性：" + role_whole.res_shadow + "%<br/>";
    role_html += "<br/>";
    role_html += "物理穿透：" + role_whole.pierce_physical + "%<br/>";
    role_html += "火焰穿透：" + role_whole.pierce_fire + "%<br/>";
    role_html += "冰霜穿透：" + role_whole.pierce_frost + "%<br/>";
    role_html += "自然穿透：" + role_whole.pierce_natural + "%<br/>";
    role_html += "奥术穿透：" + role_whole.pierce_arcane + "%<br/>";
    role_html += "神圣穿透：" + role_whole.pierce_holy + "%<br/>";
    role_html += "暗影穿透：" + role_whole.pierce_shadow + "%<br/>";
    role_html += "<br/>";
    $("#current_status").html(role_html);
    return role_html;
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
    info.append("<p" + can_not + ">" + equipment.type_name + "</p>");
    for (let i = 0; i < equipment.effect.length; i++) {
        let effect = equipment.effect[i];
        effect = effect.split("+=");
        let text = effect[1] + " " + dictionary_attribute_name[effect[0]];
        text = text.replace(" %", "% ");
        info.append("<p>+" + text + "</p>");
    }
    can_not = current_character.lvl >= equipment.e_lvl ? "" : " style='color:red'";
    info.append("<p" + can_not + ">需要等级：" + equipment.c_lvl + "</p>");
    $("body").append(info);
}

/**
 * 隐藏装备介绍
 */
function hide_equipment_info() {
    $("#equipment_info").remove();
}

/**
 * 生成装备栏
 * @param role
 */
function refresh_current_equipment(role) {
    let cell_old = $(".cell");
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
            equipment_take_off(equipment);
        });
    }
}

/**
 * 生成物品栏
 * @param role
 */
function refresh_current_items(role) {
    view_current_items.empty();
    let items = role.items;
    for (let i = 0; i < MAX_ITEMS; i++) {
        let item = items[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        view_current_items.append(cell);
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
                if (current_character.lvl < item.e_lvl) {
                    return;
                }
                if (!check_can_equip(item)) {
                    return;
                }
                hide_equipment_info();
                let equipments = current_character.equipments;
                let equipment_exchange = null;// 将被替换的装备

                // 戒指，饰品
                if (item.pos === 13 || item.pos === 14) {
                    let count = get_equipment_count_by_pos(item.pos);
                    if (count === 2) {
                        for (let j = 0; j < equipments.length; j++) {
                            let equipment = equipments[j];
                            if (equipment.pos === item.pos) {
                                equipment_exchange = equipment;
                                equipments[j] = item;
                                break;
                            }
                        }
                    } else {
                        equipments.push(item);
                    }
                } else {
                    for (let j = 0; j < equipments.length; j++) {
                        let equipment = equipments[j];
                        if (equipment.pos === item.pos) {
                            equipment_exchange = equipment;
                            equipments.splice(j, 1);
                            break;
                        }
                    }
                    equipments.push(item);
                }

                items[i] = null;
                for (let k = 0; k < MAX_ITEMS; k++) {
                    if (items[k] == null) {
                        items[k] = equipment_exchange;
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
            });
        }
    }
}

/**
 * 获取指定位置已装备的数量
 * @param pos
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
 * 卸下装备
 * @param equipment
 */
function equipment_take_off(equipment) {
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
}

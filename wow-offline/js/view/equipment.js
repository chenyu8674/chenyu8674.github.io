let view_equipment;
let view_current_items;

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
    console.log(role_whole)
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
    role_html += "命中率：" + calculate_original_hit(role_whole).toFixed(2) + "%<br/>";
    role_html += "暴击率：" + calculate_original_critical(role_whole).toFixed(2) + "%<br/>";
    role_html += "躲闪率：" + calculate_original_dodge(role_whole).toFixed(2) + "%<br/>";
    let block_chance = calculate_original_block(role_whole).toFixed(2);
    role_html += "格挡率：" + block_chance + "%<br/>";
    if (block_chance > 0) {
        role_html += "格挡值：" + role_whole.block_value + "<br/>";
    }
    role_html += "<br/>";
    role_html += "攻击护甲：" + role_whole.armor_attack + "<br/>";
    role_html += "攻击减伤：" + (calculate_armor_attack(role_whole) * 100).toFixed(2) + "<br/>";
    role_html += "法术护甲：" + role_whole.armor_magic + "<br/>";
    role_html += "法术减伤：" + (calculate_armor_magic(role_whole) * 100).toFixed(2) + "<br/>";
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
    role_html += "暗影伤害：" + role_whole.damage_dark + "%<br/>";
    role_html += "<br/>";
    role_html += "物理抗性：" + role_whole.res_physical + "%<br/>";
    role_html += "火焰抗性：" + role_whole.res_fire + "%<br/>";
    role_html += "冰霜抗性：" + role_whole.res_frost + "%<br/>";
    role_html += "自然抗性：" + role_whole.res_natural + "%<br/>";
    role_html += "奥术抗性：" + role_whole.res_arcane + "%<br/>";
    role_html += "神圣抗性：" + role_whole.res_holy + "%<br/>";
    role_html += "暗影抗性：" + role_whole.res_dark + "%<br/>";
    role_html += "<br/>";
    role_html += "物理穿透：" + role_whole.pierce_physical + "%<br/>";
    role_html += "火焰穿透：" + role_whole.pierce_fire + "%<br/>";
    role_html += "冰霜穿透：" + role_whole.pierce_frost + "%<br/>";
    role_html += "自然穿透：" + role_whole.pierce_natural + "%<br/>";
    role_html += "奥术穿透：" + role_whole.pierce_arcane + "%<br/>";
    role_html += "神圣穿透：" + role_whole.pierce_holy + "%<br/>";
    role_html += "暗影穿透：" + role_whole.pierce_dark + "%<br/>";
    role_html += "<br/>";
    $("#current_status").html(role_html);
    return role_html;
}

/**
 * 生成装备栏
 * @param role
 */
function refresh_current_equipment(role) {
    let cell_old = $(".cell");
    cell_old.css("border-color", "slategray");
    cell_old.css("background-image", "");
    let equipments = role.equipments;
    let ring_count = 0;
    let trinket_count = 0;
    let weapon_count = 0;
    for (let i = 0; i < equipments.length; i++) {
        let equipment = equipments[i];
        let pos = equipment.pos;
        let rare = equipment.rare;
        let icon = equipment.icon;
        if (pos === 13) {
            pos += ring_count;
            ring_count++;
        }
        if (pos === 14) {
            pos += 1 + trinket_count;
            trinket_count++;
        }
        if (pos === 15) {
            pos += 2 + weapon_count;
            weapon_count++;
        }
        if (pos === 16) {
            pos = 18;
        }
        let cell = $("#current_equipments_" + pos);
        let rare_color = eval("color_rare_" + rare);
        cell.css("border-color", rare_color);
        cell.css("box-shadow", "0 0 10px inset " + rare_color);
        cell.css("background-image", "url(./img/equipment/" + icon + ".jpg)");
        cell.hover(function () {
            show_equipment_info(equipment, cell[0].offsetWidth + getLeft(cell[0]), cell[0].offsetHeight + getTop(cell[0]));
        }, function () {
            hide_equipment_info();
        });
    }
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
    info.append("<p style='color:goldenrod'>需要等级" + equipment.c_lvl + " 物品等级" + equipment.e_lvl + "</p>");
    info.append("<p>" + equipment.type_name + "</p>");
    for (let i = 0; i < equipment.effect.length; i++) {
        let effect = equipment.effect[i];
        effect = effect.split("+=");
        info.append("<p>+" + effect[1] + " " + dictionary_attribute_name[effect[0]] + "</p>");
    }
    view_equipment.append(info);
}

/**
 * 隐藏装备介绍
 */
function hide_equipment_info() {
    $("#equipment_info").remove();
}

/**
 * 生成物品栏
 * @param role
 */
function refresh_current_items(role) {
    view_current_items.empty();
    let items = role.items;
    for (let i = 0; i < 100; i++) {
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
                show_equipment_info(item, cell[0].offsetWidth + getLeft(cell[0]), cell[0].offsetHeight + getTop(cell[0]));
            }, function () {
                hide_equipment_info();
            });
        }
    }
}

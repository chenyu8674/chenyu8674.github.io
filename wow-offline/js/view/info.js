/**
 * 隐藏信息栏
 */
function hide_info() {
    $(".info_window").remove();
}

/**
 * 显示地图介绍
 * @param map_info
 */
function show_map_info(map_info) {
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("left", 1600 * map_info.x / 100 + 25 + "px");
    info.css("top", 900 * map_info.y / 100 + 25 + "px");
    if (map_info.type === 1) {
        info.append("<p style='color:" + color_rare_3 + "'>练级地图</p>");
        info.append("<p>" + map_info.name + "</p>");// 地图名称
        info.append("<p>怪物等级：" + map_info.min + "~" + map_info.max + "</p>");// 怪物等级
    }
    if (map_info.type === 5) {
        info.append("<p style='color:" + color_rare_4 + "'>小队副本</p>");
        info.append("<p>" + map_info.name + "</p>");// 地图名称
        info.append("<p>怪物等级：" + map_info.min + "~" + map_info.max + "</p>");// 怪物等级
    }
    if (map_info.type === 10) {
        info.append("<p style='color:" + color_rare_5 + "'>小型团队副本</p>");
        info.append("<p>" + map_info.name + "</p>");//
        info.append("<p>掉落等级：" + map_info.min + "~" + map_info.max + "</p>");// 掉落等级
    }
    if (map_info.type === 40) {
        info.append("<p style='color:" + color_rare_6 + "'>大型团队副本</p>");
        info.append("<p>" + map_info.name + "</p>");// 地图名称
        info.append("<p>掉落等级：" + map_info.min + "~" + map_info.max + "</p>");// 掉落等级
    }
    info.css("min-width", "120px");
    if (map_info.detail != null) {
        info.append("<p style='color:goldenrod'>" + map_info.detail + "</p>");// 地图介绍
    }
    view_map.append(info);
}

/**
 * 显示休息说明
 */
function show_heal_info() {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("left", "57px");
    info.css("top", "610px");
    info.append("<p style='color:goldenrod'>食用补给</p>");
    info.append("<p>每秒回复10%最大生命值</p>");
    info.append("<p>进食时必须保持坐姿</p>");
    info.append("<p style='color:goldenrod'>大吉大利，今晚吃鸡</p>");
    battle_map.append(info);
}

/**
 * 显示攻击说明
 */
function show_attack_info() {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("right", "57px");
    info.css("top", "610px");
    info.append("<p style='color:goldenrod'>前进！</p>");
    info.append("<p>向下个敌人发起攻击</p>");
    battle_map.append(info);
}

/**
 * 显示玩家介绍
 */
function show_player_info() {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("left", player_x + 1.5 + "%");
    info.css("top", player_y + 1.5 + "%");
    info.append("<p>" + current_character.name + "</p>");
    info.append("<p style='color:goldenrod'>lv " + current_character.lvl + " " + dictionary_job.job_name[current_character.job] + "</p>");
    battle_map.append(info);
}

/**
 * 显示怪物介绍
 */
function show_monster_info(index) {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    let monster = map_monster_list[index];
    info.css("left", monster.x + 1.5 + "%");
    info.css("top", monster.y + 1.5 + "%");
    info.append("<p>" + monster.name + "</p>");
    info.append("<p style='color:" + eval("color_rare_" + monster.rare) + "'>" + get_monster_rare_name(monster.rare) + "</p>");
    info.append("<p style='color:goldenrod'>lv " + monster.lvl + " " + get_monster_species_name(monster.species) + "</p>");
    battle_map.append(info);
}

/**
 * 显示装备介绍
 */
function show_equipment_info(equipment, x, y) {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("left", x + "px");
    info.css("top", y + "px");
    info.css("max-width", "250px");
    equipment = create_equipment_by_model(equipment);
    let rare_color = eval("color_rare_" + equipment.rare);
    // 装备名称
    info.append("<p style='font-weight:bold;color:" + rare_color + "'>" + equipment.name + "</p>");
    // 物品等级
    info.append("<p style='color:goldenrod'>物品等级：" + equipment.e_lvl + "</p>");
    let can_equip = check_can_equip(equipment);
    let can_not = can_equip ? "" : " style='color:red'";
    // 装备品质+类型
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
        let color = "";
        if (is_in_array(equipment.pos, [1, 3, 4, 5, 8, 9, 10, 11, 12]) && i < 2) {
            color = " style='color:lightblue'"
        } else if (equipment.pos === 15) {
            if ((text.indexOf(dictionary_attribute_name.attack_power) > 0 || text.indexOf(dictionary_attribute_name.magic_power) > 0 || text.indexOf(dictionary_attribute_name.heal_power) > 0) && i < 2) {
                color = " style='color:lightblue'"
            }
        } else if (equipment.pos === 16) {
            if (equipment.type === 41 && i < 2) {
                color = " style='color:lightblue'"
            }
        }
        // 装备属性
        info.append("<p" + color + ">" + text + "</p>");
    }
    can_not = current_character.lvl >= equipment.c_lvl ? "" : " style='color:red'";
    // 需要等级
    info.append("<p" + can_not + ">需要等级：" + equipment.c_lvl + "</p>");
    if (equipment.skill != null) {
        // 附加技能
        let skill = equipment.skill;
        info.append("<p style='color:" + color_rare_3 + "'>击中时可能：" + skill.detail + "</p>");
    }
    if (equipment.detail != null) {
        // 文字介绍
        info.append("<p style='color:goldenrod'>" + equipment.detail + "</p>");
    }
    // 售价
    info.append("<span style='font-size: 10px;'>" + get_money_html(get_equipment_price(equipment), 10) + "</span>");
    $("body").append(info);
    if (info.offset().top + info.outerHeight() > view_equipment.outerHeight() + 5) {
        info.css("top", view_equipment.outerHeight() - info.outerHeight() - 5 + "px");
    }
}

function set_bar_info_hover(view, html) {
    view.hover(function () {
        show_bar_info(view, html);
    }, function () {
        hide_info();
    });
}

/**
 * 显示文字介绍
 */
function show_bar_info(view, html) {
    let x = view[0].offsetWidth + view.offset().left;
    let y = view[0].offsetHeight + view.offset().top;
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("font-size", "15px");
    info.css("letter-spacing", "2px");
    info.css("line-height", "20px");
    info.css("margin-top", "-3px");
    info.css("left", (x - 66) + "px");
    info.css("top", y + "px");
    info.css("width", "54px");
    info.css("text-align", "center");
    info.css("padding", "5px 3px 6px 3px");
    info.css("border", "3px solid gray");
    info.css("border-radius", "6px");
    info.css("background-color", "rgba(0, 0, 0, 0.6)");
    info.append(html);
    $("body").append(info);
}

function set_info_hover(view, html, item) {
    if (item == null) {
        item = view;
    }
    view.hover(function () {
        show_text_info(item, html);
    }, function () {
        hide_info();
    });
}

/**
 * 显示文字介绍
 */
function show_text_info(view, html) {
    let x = view[0].offsetWidth + view.offset().left;
    let y = view[0].offsetHeight + view.offset().top;
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("font-size", "15px");
    info.css("padding-right", "10px");
    info.css("line-height", "25px");
    info.css("left", x + "px");
    info.css("top", y + "px");
    info.append(html);
    $("body").append(info);
}
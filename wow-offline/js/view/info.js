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
    let x = 1600 * map_info.x / 100 + 12;
    let y = 900 * map_info.y / 100 + 12;
    info.css("left", x + "px");
    info.css("top", y + "px");
    if (map_info.type === 1) {
        info.append("<div>" + map_info.name + "</div>");
        info.append("<div style='color:" + color_rare_3 + "'>探索地图</div>");
        info.append("<div style='color:goldenrod'>怪物等级：" + map_info.min + "~" + map_info.max + "</div>");// 怪物等级
    }
    if (map_info.type === 5) {
        info.append("<div>" + map_info.name + "</div>");
        info.append("<div style='color:" + color_rare_4 + "'>小队副本</div>");
        info.append("<div style='color:goldenrod'>怪物等级：" + map_info.min + "~" + map_info.max + "</div>");// 怪物等级
    }
    if (map_info.type === 10) {
        info.append("<div>" + map_info.name + "</div>");
        info.append("<div style='color:" + color_rare_5 + "'>小型团队副本</div>");
        info.append("<div style='color:goldenrod'>掉落等级：" + map_info.min + "~" + map_info.max + "</div>");// 掉落等级
    }
    if (map_info.type === 40) {
        info.append("<div>" + map_info.name + "</div>");
        info.append("<div style='color:" + color_rare_6 + "'>大型团队副本</div>");
        info.append("<div style='color:goldenrod'>掉落等级：" + map_info.min + "~" + map_info.max + "</div>");// 掉落等级
    }
    info.css("min-width", "120px");
    if (map_info.detail != null) {
        info.append("<div style='color:lightgray;margin-top:5px;line-height:17px;'>" + map_info.detail + "</div>");// 地图介绍
    }
    view_map.append(info);
    if (y + info.outerHeight() > window_margin_top + window_height - 5) {
        info.css("top", window_margin_top + window_height - info.outerHeight() - 5 + "px");
    }
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
    info.append("<div>" + current_character.name + "</div>");
    info.append("<div style='color:goldenrod'>lv " + current_character.lvl + " " + dictionary_job.job_name[current_character.job] + "</div>");
    battle_map.append(info);
}

/**
 * 显示怪物介绍
 */
function show_monster_info(view, index) {
    let monster = map_monster_list[index];
    if (monster.name == null) {
        return;
    }
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    let x = view[0].offsetWidth + view.offset().left - window_margin_left;
    let y = view[0].offsetHeight + view.offset().top - window_margin_top;
    info.css("left", x - 5 + "px");
    info.css("top", y - 5 + "px");
    info.css("padding-right", "10px");
    info.append("<div style='height:25px;font-size:12px;font-weight:bold;'>" + monster.name + "</div>");
    info.append("<div style='color:" + eval("color_rare_" + monster.rare) + "'>" + get_monster_rare_name(monster.rare, monster.percent) + "</div>");
    info.append("<div style='color:goldenrod'>lv " + monster.lvl + " " + get_monster_species_name(monster.species) + "</div>");
    if (monster.detail != null) {
        info.append("<div style='color:lightgray;margin-top:5px;line-height:17px;'>" + monster.detail + "</div>");
    }
    window_view.append(info);
}

/**
 * 显示装备介绍
 */
function show_equipment_info(view, model) {
    let x = view[0].offsetWidth + view.offset().left - window_margin_left;
    let y = view[0].offsetHeight + view.offset().top - window_margin_top;
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("left", x + "px");
    info.css("top", y + "px");
    let equipment = create_equipment_by_model(model);
    let rare_color = eval("color_rare_" + equipment.rare);
    // 装备名称
    info.append("<div style='height:25px;font-size:12px;font-weight:bold;color:" + rare_color + "'>" + equipment.name + "</div>");
    // 装备绑定
    if (equipment.bind !== 0) {
        if (equipment.bind === 1) {
            info.append("<div>装备后绑定</div>");
        } else {
            info.append("<div>已绑定</div>");
        }
    }
    let can_equip = check_can_equip(current_character, equipment);
    let can_not = can_equip ? "" : " style='color:red'";
    // 装备品质+类型
    info.append("<div" + can_not + ">" + get_type_name_by_rare(equipment.rare) + "的 " + equipment.type_name + "</div>");
    // 空行
    info.append("<div style='height:3px;'></div>");
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
            // 装备护甲属性
            color = " style='color:lightblue'"
        } else if (equipment.pos === 15) {
            if ((text.indexOf(dictionary_attribute_name.attack_power) > 0 || text.indexOf(dictionary_attribute_name.magic_power) > 0 || text.indexOf(dictionary_attribute_name.heal_power) > 0) && i < 2) {
                // 武器强度属性
                color = " style='color:lightblue'"
            }
        } else if (equipment.pos === 16) {
            if (i < 2) {
                // 盾牌护甲属性
                color = " style='color:lightblue'"
            }
        }
        // 装备属性
        info.append("<div" + color + ">" + text + "</div>");
    }
    // 空行
    info.append("<div style='height:3px;'></div>");
    can_not = current_character.lvl >= equipment.c_lvl ? "" : " style='color:red'";
    // 需要等级
    info.append("<div" + can_not + ">需要等级：" + equipment.c_lvl + "</div>");
    // 物品等级
    info.append("<div>物品等级：" + equipment.e_lvl + "</div>");
    if (equipment.skill != null) {
        // 附加技能
        let skill = equipment.skill;
        info.append("<div style='color:" + color_rare_3 + ";margin-top:5px;margin-bottom:5px;line-height:17px;'>攻击时可能：" + skill.detail + "</div>");
    }
    if (equipment.sets != null) {
        // 套装信息
        let sets_name = equipment.sets;
        let sets = dictionary_sets[sets_name];
        let equipments = sets.equipments;
        let effects = sets.effects;
        let count_equip = 0;
        let count_total = equipments.length;
        for (let i = 0; i < equipments.length; i++) {
            let equipment = equipments[i];
            if (is_equip_equipment(current_character, equipment)) {
                count_equip++;
            }
        }
        info.append("<div style='height:10px'></div>");
        info.append("<div style='color:goldenrod'>" + sets_name + "（" + count_equip + "/" + count_total + "）" + "</div>");
        for (let i = 0; i < equipments.length; i++) {
            let equipment = equipments[i];
            let color = is_equip_equipment(current_character, equipment) ? color_rare_3 : color_rare_1;
            equipment = create_equipment_by_model(equipment);
            info.append("<div style='color:" + color + "'>" + equipment.name + "</div>");
        }
        info.append("<div style='height:10px'></div>");
        for (let i = 0; i < effects.length; i++) {
            let effect = effects[i];
            if (effect == null) {
                continue;
            }
            let color = count_equip > i ? color_rare_3 : color_rare_1;
            let attr_string = "";
            for (let j = 0; j < effect.length; j++) {
                let attr = effect[j];
                attr = get_main_effect(attr);
                attr = attr.split("+=");
                if (attr[1] === 0) {
                    continue;
                }
                let text = attr[1] + " " + dictionary_attribute_name[attr[0]];
                if (attr[1] > 0) {
                    text = "+" + text;
                }
                text = text.replace(" %", "% ");
                if (j > 0) {
                    attr_string += "，";
                }
                attr_string += text;
            }
            info.append("<div style='color:" + color + "'>套装(" + (i + 1) + ")：" + attr_string + "</div>");
        }
        info.append("<div style='height:10px'></div>");
    }
    if (equipment.detail != null) {
        // 文字介绍
        info.append("<div style='color:goldenrod'>" + equipment.detail + "</div>");
    }
    // 售价
    info.append("<span style='font-size: 10px;'>" + get_money_html(get_equipment_price(equipment), 10) + "</span>");
    window_view.append(info);
    if (y + info.outerHeight() > window_margin_top + window_height - 5) {
        info.css("top", window_margin_top + window_height - info.outerHeight() - 5 + "px");
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
 * 显示菜单栏文字介绍
 */
function show_bar_info(view, html) {
    let x = view[0].offsetWidth + view.offset().left - window_margin_left;
    let y = view[0].offsetHeight + view.offset().top - window_margin_top;
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
    window_view.append(info);
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
    let x = view[0].offsetWidth + view.offset().left - window_margin_left;
    let y = view[0].offsetHeight + view.offset().top - window_margin_top;
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("left", x + "px");
    info.css("top", y + "px");
    info.append(html);
    window_view.append(info);
    if (y + info.outerHeight() > window_margin_top + window_height - 5) {
        info.css("top", window_margin_top + window_height - info.outerHeight() - 5 + "px");
    }
}
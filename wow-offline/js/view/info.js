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
    info.attr('id', 'map_info');
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
    info.attr('id', 'self_heal_info');
    info.addClass("info_window");
    info.css("position", "absolute");
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
    info.attr('id', 'attack_next_info');
    info.addClass("info_window");
    info.css("position", "absolute");
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
    info.attr('id', 'player_info');
    info.addClass("info_window");
    info.css("position", "absolute");
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
    info.attr('id', 'monster_info');
    info.addClass("info_window");
    info.css("position", "absolute");
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
    if (equipment.detail != null) {
        info.append("<p style='color:goldenrod'>" + equipment.detail + "</p>");
    }
    info.append("<span style='font-size: 10px;'>" + get_money_html(get_equipment_price(equipment), 10) + "</span>");
    $("body").append(info);
    if (info.offset().top + info.outerHeight() > view_equipment.outerHeight() + 5) {
        info.css("top", view_equipment.outerHeight() - info.outerHeight() - 5 + "px");
    }
}

/**
 * 显示商店介绍
 */
function show_shop_info(html, x, y) {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.attr('id', 'equipment_info');
    info.addClass("info_window");
    info.css("position", "fixed");
    info.css("font-size", "15px");
    info.css("left", x + "px");
    info.css("top", y + "px");
    info.append(html);
    $("body").append(info);
}

/**
 * 显示文字介绍
 */
function show_text_info(html, x, y) {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.addClass("info_window");
    info.css("position", "fixed");
    info.css("font-size", "15px");
    info.css("padding-right", "10px");
    info.css("line-height", "25px");
    info.css("left", x + "px");
    info.css("top", y + "px");
    info.append(html);
    $("body").append(info);
}
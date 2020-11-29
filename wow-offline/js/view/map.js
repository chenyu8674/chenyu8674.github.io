/** 地图界面 **/

let view_map;

$(document).ready(function () {
    view_map = $("#view_map");
});


function show_view_map() {
    view_map.show();
    draw_map();
    show_view_bar();
}

function hide_view_map() {
    view_map.hide();
}


/**
 * 绘制地图点
 */
function draw_map() {
    let current_lvl = current_character == null ? 1 : current_character.lvl;
    for (let i = 0; i < dictionary_map.length; i++) {
        let map_info = dictionary_map[i];
        if (map_info == null) {
            continue;
        }
        if (map_info.min > current_lvl) {
            continue;
        }
        let dot = $("<div></div>");
        if (map_info.type === 1) {
            dot.addClass("map_dot normal");
        }
        if (map_info.type === 5) {
            dot.addClass("map_dot instance");
        }
        if (map_info.type === 10) {
            dot.addClass("map_dot raid_10");
        }
        if (map_info.type === 40) {
            dot.addClass("map_dot raid_40");
        }
        dot.css("left", 1600 * map_info.x / 100 + "px");
        dot.css("top", 900 * map_info.y / 100 + "px");
        dot.hover(function () {
            show_map_info(i);
        }, function () {
            hide_map_info(i);
        });
        dot.click(function () {
            show_battle_view(map_info);
        });
        view_map.append(dot);
    }
}

/**
 * 显示地图介绍
 * @param index
 */
function show_map_info(index) {
    let info = $("<div></div>");
    info.attr('id', 'map_info');
    info.addClass("info_window");
    let map_info = dictionary_map[index];
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
    info.append("<p style='color:goldenrod'>" + map_info.detail + "</p>");// 地图介绍
    view_map.append(info);
}

/**
 * 隐藏地图介绍
 */
function hide_map_info() {
    $("#map_info").remove();
}
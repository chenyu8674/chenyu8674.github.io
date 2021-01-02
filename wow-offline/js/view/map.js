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
    for (let map in dictionary_map) {
        let map_info = dictionary_map[map];
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
        map_info.name = map;
        dot.hover(function () {
            show_map_info(map_info);
        }, function () {
            hide_info();
        });
        dot.click(function () {
            show_battle_view(map_info);
        });
        view_map.append(dot);
    }
}
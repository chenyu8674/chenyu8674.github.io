/** 地图绘制 **/

let view_map;

$(document).ready(function () {
    view_map = $("#view_map");
    draw_map();
});

/**
 * 绘制地图点
 */
function draw_map() {
    for (let i = 0; i < dictionary_map.length; i++) {
        let map_info = dictionary_map[i];
        if (map_info == null) {
            continue;
        }
        let dot = $("<div></div>");
        if (map_info[3] === 1) {
            dot.addClass("map_dot normal");
        }
        if (map_info[3] === 5) {
            dot.addClass("map_dot instance");
        }
        if (map_info[3] === 10) {
            dot.addClass("map_dot raid_10");
        }
        if (map_info[3] === 40) {
            dot.addClass("map_dot raid_40");
        }
        dot.css("left", 1600 * map_info[4] / 100 + "px");
        dot.css("top", 900 * map_info[5] / 100 + "px");
        dot.hover(function () {
            show_map_info(i);
        }, function () {
            hide_map_info(i);
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
    info.css("left", 1600 * map_info[4] / 100 + 25 + "px");
    info.css("top", 900 * map_info[5] / 100 + 25 + "px");
    if (map_info[3] === 1) {
        info.append("<p style='color:forestgreen'>练级地图</p>");
        info.append("<p>" + map_info[1] + "</p>");// 地图名称
        info.append("<p>怪物等级：" + map_info[6] + "~" + map_info[7] + "</p>");// 怪物等级
    }
    if (map_info[3] === 5) {
        info.append("<p style='color:dodgerblue'>小队副本</p>");
        info.append("<p>" + map_info[1] + "</p>");// 地图名称
        info.append("<p>怪物等级：" + map_info[6] + "~" + map_info[7] + "</p>");// 怪物等级
    }
    if (map_info[3] === 10) {
        info.append("<p style='color:rebeccapurple'>小型团队副本</p>");
        info.append("<p>" + map_info[1] + "</p>");// 地图名称
    }
    if (map_info[3] === 40) {
        info.append("<p style='color:darkorange'>大型团队副本</p>");
        info.append("<p>" + map_info[1] + "</p>");// 地图名称
    }
    info.append("<p style='color:goldenrod'>" + map_info[2] + "</p>");// 地图介绍
    view_map.append(info);
}

/**
 * 隐藏地图介绍
 */
function hide_map_info() {
    $("#map_info").remove();
}
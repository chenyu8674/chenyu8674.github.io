/** 地图绘制 **/

let view_battle;
let battle_map;

$(document).ready(function () {
    view_battle = $("#view_battle");
    battle_map = $("#battle_map");
});

function show_view_battle() {
    view_battle.show();
}

function hide_view_battle() {
    view_battle.hide();
}

function show_battle_view(map_info) {
    show_view_battle();
    view_battle.click(function () {
        hide_view_battle();
    });
    battle_map.attr("src", "img/map/" + map_info.map + ".jpg");
}
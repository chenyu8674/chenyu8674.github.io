let view_bar;

$(document).ready(function () {
    view_bar = $("#view_bar");
    hide_view_bar();
    init_view_icon_click();
});

function show_view_bar() {
    view_bar.show();
}

function hide_view_bar() {
    view_bar.hide();
}

function hide_all_view() {
    hide_view_bar();
    hide_view_battle();
    hide_view_equipment();
    hide_view_shop();
    hide_view_character();
    hide_view_map();
    hide_view_test();
}

function init_view_icon_click() {
    $("#bar_map").click(function () {
        hide_all_view();
        show_view_map();
    });
    $("#bar_equipment").click(function () {
        if (view_equipment.is(":visible")) {
            hide_view_equipment();
        } else {
            hide_view_shop();
            show_view_equipment();
        }
    });
    $("#bar_shop").click(function () {
        if (view_shop.is(":visible")) {
            hide_view_shop();
        } else {
            hide_view_equipment();
            show_view_shop();
        }
    });
    $("#bar_character").click(function () {
        // hide_all_view();
        // show_view_character();
        release_data();
    });
    $("#bar_test").click(function () {
        hide_all_view();
        show_view_test();
    });
    $("#bar_setting").click(function () {
        hide_all_view();
        show_view_setting();
    });
}
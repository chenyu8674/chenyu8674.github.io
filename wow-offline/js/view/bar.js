let view_bar;

$(document).ready(function () {
    view_bar = $("#view_bar");
    hide_view_bar();
    init_view_icon_click();

    set_bar_info_hover($("#bar_map"), "地图");
    set_bar_info_hover($("#bar_equipment"), "装备");
    set_bar_info_hover($("#bar_shop"), "商店");
    set_bar_info_hover($("#bar_bank"), "银行");
    set_bar_info_hover($("#bar_talent"), "天赋");
    set_bar_info_hover($("#bar_character"), "存档");
    set_bar_info_hover($("#bar_test"), "测试");
    set_bar_info_hover($("#bar_setting"), "设置");
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
    hide_view_character_create();
    hide_view_map();
    hide_view_test();
}

function is_front_view_show() {
    return view_equipment.is(":visible") || view_shop.is(":visible") || view_bank.is(":visible") || view_talent.is(":visible");
}

function hide_front_view() {
    hide_view_equipment();
    hide_view_shop();
    hide_view_bank();
    hide_view_talent();
}

function init_view_icon_click() {
    $("#bar_map").click(function () {
        if (view_battle.is(":visible") && is_front_view_show()) {
            hide_front_view();
        } else {
            if (is_in_battle()) {
                return;
            }
            hide_all_view();
            show_view_map();
        }
    });
    $("#bar_equipment").click(function () {
        if (view_equipment.is(":visible")) {
            hide_view_equipment();
        } else {
            hide_front_view();
            show_view_equipment();
        }
    });
    $("#bar_shop").click(function () {
        if (view_shop.is(":visible")) {
            hide_view_shop();
        } else {
            hide_front_view();
            show_view_shop();
        }
    });
    $("#bar_bank").click(function () {
        if (view_bank.is(":visible")) {
            hide_view_bank();
        } else {
            hide_front_view();
            show_view_bank();
        }
    });
    $("#bar_talent").click(function () {
        if (view_talent.is(":visible")) {
            hide_view_talent();
        } else {
            hide_front_view();
            show_view_talent();
        }
    });
    $("#bar_character").click(function () {
        if (is_in_battle()) {
            return;
        }
        hide_front_view();
        show_view_character_select(true);
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
let view_shop;
let view_shop_items;

$(document).ready(function () {
    view_shop = $("#view_shop");
    view_shop_items = $("#shop_items");
    hide_view_shop();
});

function show_view_shop() {
    view_shop.show();
    refresh_shop_items();
}

function hide_view_shop() {
    view_shop.hide();
}

/**
 * 绘制物品栏
 */
function refresh_shop_items() {
    view_shop_items.empty();
    let items = current_character.items;
    for (let i = 0; i < MAX_ITEMS; i++) {
        let item = items[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        cell.css("left", 11 + (i % 10) * 58 + "px");
        cell.css("top", 11 + Math.floor(i / 10) * 58 + "px");
        if (item != null) {
            let rare_color = eval("color_rare_" + item.rare);
            cell.css("border-color", rare_color);
            cell.css("box-shadow", "0 0 10px inset " + rare_color);
            cell.css("background-image", "url(./img/equipment/" + item.icon + ".jpg)");
            cell.hover(function () {
                let view = $(this);
                show_equipment_info(item, view[0].offsetWidth + view.offset().left, view[0].offsetHeight + view.offset().top);
            }, function () {
                hide_equipment_info();
            });
            // 右键点击事件，穿上装备
            cell.contextmenu(function (e) {
                e.preventDefault();
                sell_equipment(i);
            });
        }
        view_shop_items.append(cell);
    }
}

/**
 * 卖掉物品
 * @param index 背包位置
 */
function sell_equipment(index) {
    hide_equipment_info();
    let items = current_character.items;
    items[index] = null;
    refresh_shop_items();
    refresh_current_items();
    save_data();
}

let view_shop;
let view_shop_items;

$(document).ready(function () {
    view_shop = $("#view_shop");
    view_shop_items = $("#shop_items");
    hide_view_shop();
    $("#shop_pack_bag").click(function () {
        pack_bag();
        refresh_shop_items();
        save_data();
    });
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
            // 右键点击事件，卖出装备
            cell.contextmenu(function (e) {
                e.preventDefault();
                sell_equipment(i);
            });
        }
        view_shop_items.append(cell);
    }
    $("#shop_money").html(get_money_html(current_character.money, 20));
}

/**
 * 卖掉物品
 * @param index 背包位置
 */
function sell_equipment(index) {
    hide_equipment_info();
    let items = current_character.items;
    let item = items[index];
    current_character.money += get_equipment_price(item);
    items[index] = null;
    refresh_shop_items();
    save_data();
}

function get_money_html(money, text_size) {
    let copper = money % 100;
    let silver = (money - copper) % 10000 / 100;
    let gold = (money - silver * 100 - copper) / 10000;
    let html = "";
    let font_size = text_size * 1.6;
    if (gold > 0) {
        html += gold + "<span style='font-size: " + font_size + "px' class='money_gold'>●</span>";
    }
    if (silver > 0) {
        html += silver + "<span style='font-size: " + font_size + "px' class='money_silver'>●</span>";
    }
    html += copper + "<span style='font-size: " + font_size + "px' class='money_copper'>●</span>";
    return html;
}
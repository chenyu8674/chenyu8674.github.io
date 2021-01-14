let view_shop;
let shop_view;
let view_shop_items;

$(document).ready(function () {
    view_shop = $("#view_shop");
    shop_view = $("#shop_view");
    view_shop_items = $("#shop_items");
    hide_view_shop();
    let shop_pack_bag = $("#shop_pack_bag")
    shop_pack_bag.click(function () {
        pack_bag();
        refresh_shop_items();
        save_data();
    });
    let shop_clear_bag = $("#shop_clear_bag");
    shop_clear_bag.click(function () {
        let items = current_character.items;
        for (let i = 0; i < MAX_ITEMS; i++) {
            let item = items[i];
            if (typeof item === "string") {
                item = create_static_equipment_model(new_equipment()[item]);
            }
            if (item != null && item.rare < 4) {
                sell_equipment(i, true);
            }
        }
        refresh_shop_items();
        save_data();
    });
    set_info_hover(shop_pack_bag, "为背包物品排序");
    set_info_hover(shop_clear_bag, "售出所有精良以下的装备");
});

function show_view_shop() {
    view_shop.show();
    create_shop_view();
    refresh_shop_items();
}

function hide_view_shop() {
    view_shop.hide();
}

/**
 * 生成商店界面
 */
function create_shop_view() {
    shop_view.empty();
    for (let i = 0; i < 14; i++) {
        let shop_item = $("<div></div>");
        shop_item.addClass("shop_item");
        shop_item.css("top", 20 + 86 * (i % 7) + "px");
        shop_item.css("left", 20 + 266 * Math.floor(i / 7) + "px");
        shop_view.append(shop_item);
        let cell = $("<div></div>");
        cell.addClass("shop_icon");
        shop_item.append(cell);
        let shop_name = $("<div></div>");
        shop_name.addClass("shop_name");
        let name = "神秘";
        let type;
        let icon;
        let price;
        let pos;
        switch (i) {
            case 0:
                name += "头盔";
                type = "头部装备";
                icon = 16;
                price = 8;
                pos = 1;
                break;
            case 1:
                name += "肩甲";
                type = "肩部装备";
                icon = 16;
                price = 8;
                pos = 3;
                break;
            case 2:
                name += "衣服";
                type = "胸部装备";
                icon = 16;
                price = 10;
                pos = 4;
                break;
            case 3:
                name += "护腕";
                type = "腕部装备";
                icon = 16;
                price = 6;
                pos = 8;
                break;
            case 4:
                name += "项链";
                type = "项链";
                icon = 17;
                price = 6;
                pos = 2;
                break;
            case 5:
                name += "戒指";
                type = "戒指";
                icon = 17;
                price = 6;
                pos = 13;
                break;
            case 6:
                name += "武器";
                type = "武器";
                icon = 15;
                price = 30;
                pos = 15;
                break;
            case 7:
                name += "手套";
                type = "手部装备";
                icon = 16;
                price = 8;
                pos = 9;
                break;
            case 8:
                name += "腰带";
                type = "腰部装备";
                icon = 16;
                price = 6;
                pos = 10;
                break;
            case 9:
                name += "裤子";
                type = "腿部装备";
                icon = 16;
                price = 10;
                pos = 11;
                break;
            case 10:
                name += "靴子";
                type = "脚部装备";
                icon = 16;
                price = 8;
                pos = 12;
                break;
            case 11:
                name += "披风";
                type = "披风";
                icon = 17;
                price = 6;
                pos = 5;
                break;
            case 12:
                name += "饰品";
                type = "饰品";
                icon = 17;
                price = 6;
                pos = 14;
                break;
            case 13:
                name += "副手";
                type = "副手装备";
                icon = 15;
                price = 15;
                pos = 16;
                break;
        }
        cell.css("background-image", "url(./img/icon/inv_misc_bag_" + icon + ".png)");
        shop_name.text(name);
        shop_item.append(shop_name);
        let shop_price = $("<div></div>");
        shop_price.addClass("shop_price");
        price = Math.round(price * Math.pow(current_character.lvl + 5, 2.2064));
        if (price > 1000) {
            // 10银以上时铜币为0
            price = Math.floor(price / 100) * 100;
        }
        shop_price.html(get_money_html(price, 20));
        shop_item.append(shop_price);
        let html = "<div>" + "获得一件随机" + type + "</div>"
            + "<div><span style='color: " + color_rare_3 + "'>" + get_type_name_by_rare(3) + "</span>：60%&emsp;"
            + "<span style='color: " + color_rare_5 + "'>" + get_type_name_by_rare(5) + "</span>：9%</div>"
            + "<div><span style='color: " + color_rare_4 + "'>" + get_type_name_by_rare(4) + "</span>：30%&emsp;"
            + "<span style='color: " + color_rare_6 + "'>" + get_type_name_by_rare(6) + "</span>：1%</div>"
        set_info_hover(shop_item, html, cell);
        // 右键点击事件，购买装备
        shop_item.contextmenu(function (e) {
            e.preventDefault();
            buy_equipment(pos, price);
        });
    }
}

/**
 * 从商店购买装备
 * @param pos
 * @param price
 */
function buy_equipment(pos, price) {
    if (current_character.money < price) {
        return;
    }
    if (get_item_empty_count() === 0) {
        return;
    }
    current_character.money -= price;
    let rare = 100 * Math.random();
    if (rare <= 60) {
        rare = 3;// 60%
    } else if (rare <= 90) {
        rare = 4;// 30%
    } else if (rare <= 99) {
        rare = 5;// 9%
    } else {
        rare = 6;// 1%
    }
    let model = create_random_equipment_model(current_character.lvl, rare, pos);
    let items = current_character.items;
    for (let k = 0; k < MAX_ITEMS; k++) {
        if (items[k] == null) {
            items[k] = model;
            break;
        }
    }
    refresh_shop_items();
    save_data();
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
            if (typeof item === "string") {
                // 生成固定装备model
                item = create_static_equipment_model(new_equipment()[item]);
            }
            let rare_color = eval("color_rare_" + item.rare);
            cell.css("border-color", rare_color);
            cell.css("box-shadow", "0 0 10px inset " + rare_color);
            cell.css("background-image", "url(./img/equipment/" + item.icon + ".jpg)");
            cell.hover(function () {
                let view = $(this);
                show_equipment_info(item, view[0].offsetWidth + view.offset().left, view[0].offsetHeight + view.offset().top);
            }, function () {
                hide_info();
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
 * @param not_save 不进行存储
 */
function sell_equipment(index, not_save) {
    hide_info();
    let items = current_character.items;
    let item = items[index];
    if (typeof item === "string") {
        // 生成固定装备model
        item = create_static_equipment_model(new_equipment()[item]);
    }
    current_character.money += get_equipment_price(item);
    items[index] = null;
    refresh_shop_items();
    if (!not_save) {
        save_data();
    }
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
    if (copper > 0 || (gold === 0 && silver === 0)) {
        html += copper + "<span style='font-size: " + font_size + "px' class='money_copper'>●</span>";
    }
    return html;
}
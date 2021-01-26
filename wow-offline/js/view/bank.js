let view_bank;
let bank_view;
let bank_items;

$(document).ready(function () {
    view_bank = $("#view_bank");
    bank_view = $("#bank_view");
    bank_items = $("#bank_items");
    hide_view_bank();
    let bank_pack_bank = $("#bank_pack_bank");
    bank_pack_bank.click(function () {
        pack_bank();
        refresh_bank_view();
        save_data();
    });
    set_info_hover(bank_pack_bank, "为银行物品排序");
    let bank_pack_bag = $("#bank_pack_bag");
    bank_pack_bag.click(function () {
        pack_bag();
        refresh_bank_items();
        save_data();
    });
    set_info_hover(bank_pack_bag, "为背包物品排序");
});

function show_view_bank() {
    view_bank.show();
    refresh_bank_view();
    refresh_bank_items();
}

function hide_view_bank() {
    view_bank.hide();
}

/**
 * 绘制银行栏
 */
function refresh_bank_view() {
    bank_view.empty();
    for (let i = 0; i < MAX_ITEMS; i++) {
        let item = bank_item_list[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        cell.css("left", 11 + (i % 10) * 58 + "px");
        cell.css("top", 11 + Math.floor(i / 10) * 58 + "px");
        if (item != null) {
            let item_name;
            if (typeof item === "number") {
                // 生成固定装备model
                item_name = item;
                item = create_static_equipment_model(item);
            }
            let rare_color = eval("color_rare_" + item.rare);
            cell.css("border-color", rare_color);
            cell.css("box-shadow", "0 0 10px inset " + rare_color);
            cell.css("background-image", "url(./img/equipment/" + item.icon + ".jpg)");
            cell.hover(function () {
                let view = $(this);
                show_equipment_info(view, item);
            }, function () {
                hide_info();
            });
            // 右键点击事件，取出装备
            cell.contextmenu(function (e) {
                e.preventDefault();
                if (get_item_empty_count() > 0) {
                    hide_info();
                    let items = current_character.items;
                    for (let k = 0; k < MAX_ITEMS; k++) {
                        if (items[k] == null) {
                            items[k] = item_name != null ? item_name : item;
                            break;
                        }
                    }
                    bank_item_list[i] = null;
                    refresh_bank_view();
                    refresh_bank_items();
                    save_data();
                }
            });
        }
        bank_view.append(cell);
    }
}

/**
 * 绘制物品栏
 */
function refresh_bank_items() {
    bank_items.empty();
    let items = current_character.items;
    for (let i = 0; i < MAX_ITEMS; i++) {
        let item = items[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        cell.css("left", 11 + (i % 10) * 58 + "px");
        cell.css("top", 11 + Math.floor(i / 10) * 58 + "px");
        if (item != null) {
            let item_name;
            if (typeof item === "number") {
                // 生成固定装备model
                item_name = item;
                item = create_static_equipment_model(item);
            }
            let rare_color = eval("color_rare_" + item.rare);
            cell.css("border-color", rare_color);
            cell.css("box-shadow", "0 0 10px inset " + rare_color);
            cell.css("background-image", "url(./img/equipment/" + item.icon + ".jpg)");
            cell.hover(function () {
                let view = $(this);
                show_equipment_info(view, item);
            }, function () {
                hide_info();
            });
            // 右键点击事件，存入装备
            cell.contextmenu(function (e) {
                e.preventDefault();
                if (get_bank_empty_count() > 0) {
                    hide_info();
                    for (let k = 0; k < MAX_ITEMS; k++) {
                        if (bank_item_list[k] == null) {
                            bank_item_list[k] = item_name != null ? item_name : item;
                            break;
                        }
                    }
                    items[i] = null;
                    refresh_bank_view();
                    refresh_bank_items();
                    save_data();
                }
            });
        }
        bank_items.append(cell);
    }
    $("#bank_money").html(get_money_html(current_character.money, 20));
}

/**
 * 获取银行空格数量
 * @return {number}
 */
function get_bank_empty_count() {
    let count = 0;
    for (let k = 0; k < MAX_BANKS; k++) {
        if (bank_item_list[k] == null) {
            count++;
        }
    }
    return count;
}

/**
 * 整理银行
 */
function pack_bank() {
    bank_item_list.sort(function (a, b) {
        if (a == null) {
            return 1;
        }
        if (b == null) {
            return -1;
        }
        if (typeof a === "number") {
            a = create_static_equipment_model(a);
        }
        if (typeof b === "number") {
            b = create_static_equipment_model(b);
        }
        if (a.pos !== b.pos) {
            return a.pos - b.pos;
        }
        if (a.type !== b.type) {
            return a.type - b.type;
        }
        if (a.rare !== b.rare) {
            return a.rare - b.rare;
        }
        return a.icon > b.icon ? 1 : -1;
    });
}

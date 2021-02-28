let view_bank;
let bank_view;
let bank_items;
let bank_type = 0;// 0个人，1公共

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
    let bank_personal = $("#bank_personal");
    let bank_public = $("#bank_public");
    bank_personal.click(function () {
        bank_personal.attr("class", "bank_selected");
        bank_public.attr("class", "bank_normal");
        bank_type = 0;
        refresh_bank_view();
    });
    bank_public.click(function () {
        bank_public.attr("class", "bank_selected");
        bank_personal.attr("class", "bank_normal");
        bank_type = 1;
        refresh_bank_view();
    });
    let bank_money_set = $("#bank_money_set");
    bank_money_set.click(function () {
        let money = prompt("输入要存入的金钱（铜币）：");
        money = Number(money);
        if (money && money <= current_character.money) {
            current_character.money -= money;
            bank_money += money;
            save_data();
            $("#bank_money_bank").html(get_money_html(bank_money, 20));
            $("#bank_money").html(get_money_html(current_character.money, 20));
        } else {
            alert("超过当前现金上限");
        }
    });
    let bank_money_get = $("#bank_money_get");
    bank_money_get.click(function () {
        let money = prompt("输入要取出的金钱（铜币）：");
        money = Number(money);
        if (money && money <= bank_money) {
            current_character.money += money;
            bank_money -= money;
            save_data();
            $("#bank_money_bank").html(get_money_html(bank_money, 20));
            $("#bank_money").html(get_money_html(current_character.money, 20));
        } else {
            alert("超过银行存款上限");
        }
    });
});

function show_view_bank() {
    view_bank.show();
    $("#bank_personal").click();
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
    let bank_list = bank_type === 0 ? current_character.banks : bank_item_list;
    for (let i = 0; i < MAX_ITEMS; i++) {
        let model = bank_list[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        cell.css("left", 11 + (i % 10) * 58 + "px");
        cell.css("top", 11 + Math.floor(i / 10) * 58 + "px");
        if (model != null) {
            let item = get_equipment_by_model(model)[1];
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
                            items[k] = model;
                            break;
                        }
                    }
                    bank_list[i] = null;
                    refresh_bank_view();
                    refresh_bank_items();
                    save_data();
                }
            });
        }
        bank_view.append(cell);
    }
    let bank_money_bank = $("#bank_money_bank");
    if (bank_type === 0) {
        $("#bank_money_set").hide();
        $("#bank_money_get").hide();
        bank_money_bank.hide();
    } else {
        $("#bank_money_set").show();
        $("#bank_money_get").show();
        bank_money_bank.show();
        bank_money_bank.html(get_money_html(bank_money, 20));
    }
}

/**
 * 绘制物品栏
 */
function refresh_bank_items() {
    bank_items.empty();
    let items = current_character.items;
    for (let i = 0; i < MAX_ITEMS; i++) {
        let model = items[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        cell.css("left", 11 + (i % 10) * 58 + "px");
        cell.css("top", 11 + Math.floor(i / 10) * 58 + "px");
        if (model != null) {
            let item = get_equipment_by_model(model)[1];
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
                if (bank_type === 1 && item.bind !== 0 && item.bind !== 1) {
                    return;
                }
                if (get_bank_empty_count() > 0) {
                    hide_info();
                    let bank_list = bank_type === 0 ? current_character.banks : bank_item_list;
                    for (let k = 0; k < MAX_BANKS; k++) {
                        if (bank_list[k] == null) {
                            bank_list[k] = model;
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
    let bank_list = bank_type === 0 ? current_character.banks : bank_item_list;
    let count = 0;
    for (let k = 0; k < MAX_BANKS; k++) {
        if (bank_list[k] == null) {
            count++;
        }
    }
    return count;
}

/**
 * 整理银行
 */
function pack_bank() {
    let bank_list = bank_type === 0 ? current_character.banks : bank_item_list;
    bank_list.sort(sort_equipment);
}

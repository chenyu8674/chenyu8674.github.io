/** 人物选择界面 **/
let view_character_select;
let view_character_select_list;

let release_data_timeout;

$(document).ready(function () {
    view_character_select = $("#view_character_select");
    view_character_select_list = $("#view_character_select_list");
    $("#close_character_select_button").click(function () {
        hide_view_character_select();
    });

    let view_character_select_title = $("#view_character_select_title");
    view_character_select_title.mousedown(function () {
        release_data_timeout = setTimeout(function () {
            release_data();
        }, 3000);
    });
    view_character_select_title.mouseup(function () {
        clearTimeout(release_data_timeout);
    });
    view_character_select_title.mouseout(function () {
        clearTimeout(release_data_timeout);
    });
});

function show_view_character_select(close_button) {
    view_character_select.show();
    let close_character_select_button = $("#close_character_select_button");
    if (close_button) {
        close_character_select_button.show();
    } else {
        close_character_select_button.hide();
    }
    hide_view_bar();
    refresh_character_select_view();
}

function hide_view_character_select() {
    view_character_select.hide();
    show_view_bar();
}

function refresh_character_select_view() {
    view_character_select_list.empty();
    let index = 0;
    for (index = 0; index < character_list.length; index++) {
        let i = index;
        let character = character_list[index];

        let character_item = $("<div></div>");
        character_item.addClass("character_item");
        character_item.css("top", 20 + 200 * Math.floor(index / 4) + "px");
        character_item.css("left", 20 + 300 * (index % 4) + "px");

        let character_icon = $("<img/>");
        character_icon.addClass("character_icon");
        let job = 10 * Math.floor(character.job / 10);
        let job_flag = dictionary_job.job_flag[job];
        character_icon.attr("src", "img/job/" + job_flag + ".png");
        character_item.append(character_icon);

        let character_info = $("<div></div>");
        character_info.addClass("character_info");
        let name_html = "<span style='color:goldenrod;line-height:30px;'>" + character.name + "</span><br/>";
        name_html += "<span style='color:" + dictionary_job.job_color[job] + ";'>" + dictionary_job.job_name[character.job] + "</span><br/>";
        let character_lvl = get_level(character.exp)
        name_html += "人物等级：" + character_lvl + "<br/>";
        let equipment_lv = get_equipment_lvl(character);
        name_html += "装备等级：" + equipment_lv + "<br/>";
        character_info.html(name_html);
        character_item.append(character_info);

        let character_load = $("<button>加载</button>");
        character_load.addClass("character_load");
        character_load.click(function () {
            current_index = i;
            load_character();
            hide_view_battle();
            hide_view_character_select();
        });
        character_item.append(character_load);

        let character_delete = $("<button>删除</button>");
        character_delete.addClass("character_delete");
        character_delete.click(function () {
            if (confirm('警告！确认删除人物存档？')) {
                character_list.splice(i, 1);
                let save_data = {};
                save_data.version = CURRENT_VERSION;
                save_data.bank_item_list = bank_item_list;
                save_data.character_list = character_list;
                let json = JSON.stringify(save_data);
                localStorage.setItem("save_data", json);
                location.reload();
            }
        });
        character_item.append(character_delete);

        view_character_select_list.append(character_item);
    }
    // 添加按钮
    let character_item = $("<div></div>");
    character_item.addClass("character_item");
    character_item.css("top", 20 + 200 * Math.floor(index / 4) + "px");
    character_item.css("left", 20 + 300 * (index % 4) + "px");
    character_item.text("新建角色");
    character_item.click(function () {
        current_index = index;
        show_view_character_create(true);
    });
    view_character_select_list.append(character_item);
}
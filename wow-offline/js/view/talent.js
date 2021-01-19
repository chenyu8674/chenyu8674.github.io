let view_talent;

$(document).ready(function () {
    view_talent = $("#view_talent");
});

function show_view_talent() {
    view_talent.show();
    refresh_talent_view();
}

function hide_view_talent() {
    view_talent.hide();
}

function refresh_talent_view() {
    view_talent.empty();
    let job = current_character.job;
    let job_base = 10 * Math.floor(job / 10);
    let job_index = current_character.job % 10 - 1;
    let talent_count = job_base === 50 ? 4 : 3;talent_count
    let item_width = Math.floor(1400 / talent_count) - 50;
    for (let i = 0; i < talent_count; i++) {
        let current_job = job_base + (i + 1);

        let view_job_info = $("<div></div>");
        view_job_info.addClass("view_job_info");
        view_job_info.css("width", item_width + "px");
        view_job_info.css("left", 100 + (item_width + 50) * i + "px");
        if (i === job_index) {
            view_job_info.addClass("view_job_info_select");
        }
        view_job_info.click(function () {
            if (is_in_battle()) {
                return;
            }
            $(".view_job_info").removeClass("view_job_info_select");
            $(this).addClass("view_job_info_select");
            current_character.job = current_job;
            current_character.skills = dictionary_player_skill[current_job];
            current_character.buffs = [dictionary_buff[current_job]];
            calculate_role_1(current_character);
            save_data();
        });
        view_talent.append(view_job_info);

        let view_job_name = $("<div></div>");
        view_job_name.addClass("view_job_name");
        let name = dictionary_job.job_name[current_job];
        view_job_name.text(name.substr(2) + "：" + name.substring(0, 2));
        view_job_name.css("color", dictionary_job.job_color[job_base]);
        view_job_info.append(view_job_name);

        let view_job_info_1 = $("<div></div>");
        view_job_info_1.addClass("view_job_info_1");
        view_job_info_1.css("width", item_width - 40 + "px");
        view_job_info_1.text(dictionary_job.job_info[current_job]);
        view_job_info.append(view_job_info_1);

        let icon_job_skill_1 = $("<div></div>");
        icon_job_skill_1.addClass("icon_job_skill_1");
        icon_job_skill_1.css("background-image", "url('./img/icon/" + dictionary_buff[current_job].icon + ".png')");
        view_job_info.append(icon_job_skill_1);

        let info_job_skill_1 = $("<div></div>");
        info_job_skill_1.addClass("info_job_skill_1");
        info_job_skill_1.css("width", item_width - 125 + "px");
        let buff_name = dictionary_buff[current_job].name;
        let buff_detail = dictionary_buff[current_job].detail;
        info_job_skill_1.html("<span style='color:goldenrod'>" + buff_name + "（天赋加成）</span><br/>" + buff_detail);
        view_job_info.append(info_job_skill_1);

        let icon_job_skill_2 = $("<div></div>");
        icon_job_skill_2.addClass("icon_job_skill_2");
        icon_job_skill_2.css("background-image", "url('./img/icon/" + dictionary_player_skill[current_job][0].icon + ".png')");
        view_job_info.append(icon_job_skill_2);

        let info_job_skill_2 = $("<div></div>");
        info_job_skill_2.addClass("info_job_skill_2");
        info_job_skill_2.css("width", item_width - 125 + "px");
        let skill_name_1 = dictionary_player_skill[current_job][0].name;
        let skill_detail_1 = dictionary_player_skill[current_job][0].detail;
        info_job_skill_2.html("<span style='color:goldenrod'>" + skill_name_1 + "：</span>" + skill_detail_1.replace("<br/>", ""));
        view_job_info.append(info_job_skill_2);

        let icon_job_skill_3 = $("<div></div>");
        icon_job_skill_3.addClass("icon_job_skill_3");
        icon_job_skill_3.css("background-image", "url('./img/icon/" + dictionary_player_skill[current_job][1].icon + ".png')");
        view_job_info.append(icon_job_skill_3);

        let info_job_skill_3 = $("<div></div>");
        info_job_skill_3.addClass("info_job_skill_3");
        info_job_skill_3.css("width", item_width - 125 + "px");
        let skill_name_2 = dictionary_player_skill[current_job][1].name;
        let skill_detail_2 = dictionary_player_skill[current_job][1].detail;
        info_job_skill_3.html("<span style='color:goldenrod'>" + skill_name_2 + "：</span>" + skill_detail_2.replace("<br/>", ""));
        view_job_info.append(info_job_skill_3);
    }
}

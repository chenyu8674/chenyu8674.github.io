/** 人物选择界面 **/
let selected_job_1_name;
let selected_job_1_index;
let selected_job_2_index;
let view_character;

$(document).ready(function () {
    view_character = $("#view_character");
    init_skill_1_click();
    $("#icon_warrior").click();
    $("#create_character").click(function () {
        let name = $("#view_name_input").val();
        if (name.length < 2) {
            alert("角色名称须为2~6字符");
            return;
        }
        if (name.length === 0) {
            name = dictionary_job.job_name[selected_job_1_index + selected_job_2_index];
        }
        let job = selected_job_1_index + selected_job_2_index;
        create_character(job, 0, name);
        save_data();
        hide_view_character();
        show_view_map();
        // show_view_test();
    });
    show_view_character();
});

function show_view_character() {
    view_character.show();
    hide_view_bar();
}

function hide_view_character() {
    view_character.hide();
}

function init_skill_1_click() {
    $(".job_1_icon").click(function () {
        if ($(this).hasClass("gray")) {
            return;
        }
        $(".icon_1_select").removeClass("icon_1_select");
        $(this).addClass("icon_1_select");
        selected_job_1_index = parseInt($(this).attr("index"));
        let job_1 = $(this).attr("id");
        selected_job_1_name = job_1.replace("icon_", "");
        $("#view_character").css("background-image", "url('./img/job/" + selected_job_1_name + ".jpg')");
        init_skill_2();
    });
}

function init_skill_2() {
    let icon_job_2_1 = $("#icon_job_2_1");
    icon_job_2_1.css("background-image", "url('./img/icon/" + dictionary_buff[selected_job_1_index + 1].icon + ".png')");
    $("#icon_job_2_2").css("background-image", "url('./img/icon/" + dictionary_buff[selected_job_1_index + 2].icon + ".png')");
    $("#icon_job_2_3").css("background-image", "url('./img/icon/" + dictionary_buff[selected_job_1_index + 3].icon + ".png')");
    init_skill_2_click();
    icon_job_2_1.click();
}

function init_skill_2_click() {
    $(".job_2_icon").click(function () {
        $(".icon_2_select").removeClass("icon_2_select");
        $(this).addClass("icon_2_select");
        selected_job_2_index = parseInt($(this).attr("index"));
        let name = dictionary_job.job_name[selected_job_1_index + selected_job_2_index];
        let color = dictionary_job.job_color[selected_job_1_index];
        // 职业名称
        let view_job_name = $("#view_job_name");
        view_job_name.text(name.substr(2) + "：" + name.substring(0, 2));
        view_job_name.css("color", color);
        // 专精介绍
        $("#view_job_info_1").text(dictionary_job.job_info[selected_job_1_index + selected_job_2_index]);
        // 技能图标
        $("#icon_job_skill_1").css("background-image", "url('./img/icon/" + dictionary_buff[selected_job_1_index + selected_job_2_index].icon + ".png')");
        $("#icon_job_skill_2").css("background-image", "url('./img/icon/" + dictionary_player_skill[selected_job_1_index + selected_job_2_index][0].icon + ".png')");
        $("#icon_job_skill_3").css("background-image", "url('./img/icon/" + dictionary_player_skill[selected_job_1_index + selected_job_2_index][1].icon + ".png')");
        // 技能介绍
        let buff_name = dictionary_buff[selected_job_1_index + selected_job_2_index].name;
        let buff_detail = dictionary_buff[selected_job_1_index + selected_job_2_index].detail;
        $("#info_job_skill_1").html("<span style='color:goldenrod'>" + buff_name + "（天赋加成）</span><br />" + buff_detail);
        let skill_name_1 = dictionary_player_skill[selected_job_1_index + selected_job_2_index][0].name;
        let skill_detail_1 = dictionary_player_skill[selected_job_1_index + selected_job_2_index][0].detail;
        $("#info_job_skill_2").html("<span style='color:goldenrod'>" + skill_name_1 + "：</span>" + skill_detail_1);
        let skill_name_2 = dictionary_player_skill[selected_job_1_index + selected_job_2_index][1].name;
        let skill_detail_2 = dictionary_player_skill[selected_job_1_index + selected_job_2_index][1].detail;
        $("#info_job_skill_3").html("<span style='color:goldenrod'>" + skill_name_2 + "：</span>" + skill_detail_2);
        // $("#view_name_input").focus();
    });
}

/** 战斗界面 **/

let view_battle;
let battle_map;
let map_info;

$(document).ready(function () {
    view_battle = $("#view_battle");
    battle_map = $("#battle_map");
});

function show_view_battle() {
    view_battle.show();
}

function hide_view_battle() {
    view_battle.hide();
}

let player_x;
let player_y;

let map_monster_list = [];

let target_x = 0;
let target_y = 0;
let target_monster;
let move_step = 0;
let move_timer = 0;
let on_battle = false;

/**
 * 绘制地图
 */
function show_battle_view(info) {
    // 初始化
    map_info = info;
    map_monster_list = [];
    player_x = (map_info.start_x + map_info.end_x) / 2;
    player_y = (map_info.start_y + map_info.end_y) / 2;
    target_x = 0;
    target_y = 0;
    move_step = 0;
    move_timer = 0;
    on_battle = false;
    $("#monster_portrait").hide();

    show_view_battle();
    // view_battle.click(function () {
    //     hide_view_battle();
    // });
    battle_map.css("background-image", "url(\"./img/map/" + map_info.map + ".jpg\")");
    // show_monster_area(map_info);
    show_player_point();
    refresh_monster();
    show_self_heal();
}

let self_heal_timer = 0;

/**
 * 生成绷带图标
 */
function show_self_heal() {
    let self_heal = $("#self_heal");
    self_heal.click(function (e) {
        if (!on_battle) {
            clearTimeout(move_timer);
            battle_log("");
            battle_log(current_character.name + " 开始食用补给");
            clearTimeout(self_heal_timer);
            self_heal_timer = setTimeout(self_heal_loop, 100);
        }
        e.stopPropagation();
        return false;
    });
    self_heal.hover(function () {
        show_self_heal_info();
    }, function () {
        hide_self_heal_info();
    });
}

/**
 * 显示休息说明
 */
function show_self_heal_info() {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.attr('id', 'self_heal_info');
    info.addClass("info_window");
    info.css("position", "absolute");
    info.css("left", "57px");
    info.css("top", "610px");
    info.append("<p style='color:goldenrod'>食用补给</p>");
    info.append("<p>每秒回复10%最大生命值</p>");
    info.append("<p>进食时必须保持坐姿</p>");
    battle_map.append(info);
}

/**
 * 刷新休息说明
 */
function hide_self_heal_info() {
    $("#self_heal_info").remove();
}

function self_heal_loop() {
    current_health_value += Math.round(role_battle_1.max_health_value / 100);
    if (current_health_value >= role_battle_1.max_health_value) {
        current_health_value = role_battle_1.max_health_value;
        battle_log(current_character.name + " 恢复了全部生命");
    } else {
        clearTimeout(self_heal_timer);
        self_heal_timer = setTimeout(self_heal_loop, 100);
    }
    refresh_battle_status(true);
}

/**
 * 生成玩家图标
 */
function show_player_point() {
    $(".player_point").remove();
    let player_point = $("<img/>");
    player_point.addClass("player_point");
    player_point.attr("src", "./img/job/" + Math.round(current_character.job / 10) * 10 + ".png");
    player_point.hover(function () {
        show_player_info();
    }, function () {
        hide_player_info();
    });
    battle_map.append(player_point);
    refresh_player_point();
    // 更新英雄头像状态
    $("#player_portrait").css("background-image", "url(\"./img/job/" + Math.round(current_character.job / 10) * 10 + ".png\")");
    $("#player_name").text(current_character.name);
    role_battle_1 = get_battle_attribute(current_character, "battle_1");
    current_health_value = role_battle_1.max_health_value;
    refresh_battle_status(true);
}

/**
 * 刷新玩家坐标
 */
function refresh_player_point() {
    let player_point = $(".player_point");
    player_point.css("left", player_x + "%");
    player_point.css("top", player_y + "%");
}

/**
 * 显示玩家介绍
 */
function show_player_info() {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.attr('id', 'player_info');
    info.addClass("info_window");
    info.css("position", "absolute");
    info.css("left", player_x + 1.5 + "%");
    info.css("top", player_y + 1.5 + "%");
    info.append("<p>" + current_character.name + "</p>");
    info.append("<p style='color:goldenrod'>lv " + current_character.lvl + " " + dictionary_job.job_name[current_character.job] + "</p>");
    battle_map.append(info);
}

/**
 * 隐藏玩家介绍
 */
function hide_player_info() {
    $("#player_info").remove();
}

/**
 * 绘制怪物刷新区域（调试用）
 */
function show_monster_area(map_info) {
    $("#monster_area").remove();
    let monster_area = $("<div></div>");
    monster_area.attr("id", "monster_area");
    monster_area.css("left", map_info.start_x + "%");
    monster_area.css("top", map_info.start_y + "%");
    monster_area.css("width", map_info.end_x - map_info.start_x + "%");
    monster_area.css("height", map_info.end_y - map_info.start_y + "%");
    battle_map.append(monster_area);
}

/**
 * 显示怪物介绍
 * @param index
 */
function show_monster_info(index) {
    $(".info_window").remove();
    let info = $("<div></div>");
    info.attr('id', 'monster_info');
    info.addClass("info_window");
    info.css("position", "absolute");
    let monster = map_monster_list[index];
    info.css("left", monster.x + 1.5 + "%");
    info.css("top", monster.y + 1.5 + "%");
    info.append("<p>" + monster.name + "</p>");
    info.append("<p style='color:" + eval("color_rare_" + monster.rare) + "'>" + get_monster_rare_name(monster.rare) + "</p>");
    info.append("<p style='color:goldenrod'>lv " + monster.lvl + " " + get_monster_species_name(monster.species) + "</p>");
    battle_map.append(info);
}

/**
 * 隐藏地图介绍
 */
function hide_monster_info() {
    $("#monster_info").remove();
}

/**
 * 判断是否有稀有怪或精英怪
 */
function has_rare_monster(rare) {
    for (let i = 0; i < map_monster_list.length; i++) {
        if (map_monster_list[i].rare === rare) {
            return true;
        }
    }
    return false;
}

/**
 * 判断刷新点是否过近
 */
function has_nearly_monster(x, y) {
    if (Math.abs(player_x - x) <= 10 && Math.abs(player_y - y) <= 10) {
        return true;
    }
    for (let i = 0; i < map_monster_list.length; i++) {
        if (Math.abs(map_monster_list[i].x - x) <= 5 && Math.abs(map_monster_list[i].y - y) <= 5) {
            return true;
        }
    }
    return false;
}

/**
 * 向地图内添加怪物点
 */
function add_monster() {
    let lvl = current_character.lvl;
    if (lvl < map_info.min) {
        lvl = map_info.min;
    }
    if (lvl > map_info.max) {
        lvl = map_info.max;
    }
    let monster_base_list = map_info.monster;
    if (lvl >= map_info.max && !has_rare_monster(4)) {
        // 到达等级上限时，必然刷新精英怪
        monster_base_list = map_info.elite;
    } else if (Math.random() < 5 / 100 && !has_rare_monster(3)) {
        // 5%几率刷新稀有怪（唯一）
        monster_base_list = map_info.rare;
    }
    let random_monster_name = monster_base_list[Math.floor(Math.random() * monster_base_list.length)];
    let monster_obj = dictionary_monster_base[random_monster_name];
    // 生成怪物对象
    let monster = get_new_monster(monster_obj.name, lvl, monster_obj.type, monster_obj.rare, monster_obj.multiple);
    monster.species = monster_obj.species;
    monster.rare = monster_obj.rare;
    monster.lvl = lvl;
    monster.buffs = [];
    monster.debuffs = [];
    monster.equipments = [];
    monster.skills = monster_obj.skill;
    if (monster.rare === 4) {
        monster.x = monster_obj.x;
        monster.y = monster_obj.y;
    } else {
        // 随机放置怪物坐标
        monster.x = map_info.start_x + (map_info.end_x - map_info.start_x) * Math.random();
        monster.y = map_info.start_y + (map_info.end_y - map_info.start_y) * Math.random();
        while (has_nearly_monster(monster.x, monster.y)) {
            monster.x = map_info.start_x + (map_info.end_x - map_info.start_x) * Math.random();
            monster.y = map_info.start_y + (map_info.end_y - map_info.start_y) * Math.random();
        }
    }
    map_monster_list.push(monster);
}

/**
 * 刷新怪物点
 */
function refresh_monster() {
    $(".monster_point").remove();
    while (map_monster_list.length < 10) {
        add_monster(map_info);
    }
    for (let i = 0; i < map_monster_list.length; i++) {
        let monster = map_monster_list[i];
        let monster_point = $("<img/>");
        monster_point.addClass("monster_point");
        monster_point.attr("src", "./img/monster/" + monster.species + ".jpg");
        monster_point.css("left", monster.x + "%");
        monster_point.css("top", monster.y + "%");
        monster_point.css("border-color", eval("color_rare_" + monster.rare));
        monster_point.hover(function () {
            show_monster_info(i);
        }, function () {
            hide_monster_info(i);
        });
        monster_point.click(function (e) {
            if (!on_battle) {
                clearTimeout(self_heal_timer);
                target_x = monster.x;
                target_y = monster.y;
                target_monster = i;
                role_battle_2 = get_battle_attribute(map_monster_list[i], "battle_2");
                role_battle_2.current_health_value = role_battle_2.max_health_value;
                refresh_battle_status(false);
                do_move();
            }
            e.stopPropagation();
            return false;
        });
        battle_map.append(monster_point);
    }
}

/**
 * 玩家移动
 */
function do_move() {
    let move_x = target_x - player_x;
    let move_y = target_y - player_y;
    let move_distance = Math.sqrt(Math.pow(move_x, 2) + Math.pow(move_y, 2));
    move_step = Math.round(move_distance * 100);
    if (move_step === 0) {
        // 原地战斗
        on_battle = true;
        $(".player_point").addClass("on_battle");
        battle_time = 1;
        start_battle(current_character, map_monster_list[target_monster], on_turn_end, on_battle_end);
    } else {
        clearTimeout(move_timer);
        move_timer = setTimeout(move_loop, 10);
    }
}

function move_loop() {
    let move_distance = 10;
    if (move_distance > move_step) {
        move_distance = move_step;
    }
    player_x += (target_x - player_x) * move_distance / move_step;
    player_y += (target_y - player_y) * move_distance / move_step;
    move_step -= move_distance;
    refresh_player_point();
    if (move_step <= 0) {
        // 开始战斗
        on_battle = true;
        $(".player_point").addClass("on_battle");
        battle_time = 1;
        start_battle(current_character, map_monster_list[target_monster], on_turn_end, on_battle_end);
    } else {
        clearTimeout(move_timer);
        move_timer = setTimeout(move_loop, 10);
    }
}

function on_turn_end() {
    refresh_battle_status(false);
}

function on_battle_end(index) {
    on_battle = false;
    $(".player_point").removeClass("on_battle");
    if (index === 1) {
        // 计算经验
        let monster = map_monster_list[target_monster];
        let exp = MONSTER_EXP[monster.lvl - 1] * get_multiple_by_rare(monster.rare);
        exp = Math.round(exp);
        // exp *= 100;
        let old_lvl = current_character.lvl;
        battle_log(current_character.name + " 获得 " + exp + " 点经验");
        add_experience(exp);
        calculate_base_property(current_character);
        if (current_character.lvl > old_lvl) {
            // 升级
            battle_log(current_character.name + " 升到了 " + current_character.lvl + " 级");
            role_battle_1 = get_battle_attribute(current_character, "battle_1");
            current_health_value = role_battle_1.max_health_value;
        }
        refresh_battle_status(false);
        map_monster_list.splice(target_monster, 1);
        refresh_monster();
    } else {
        refresh_battle_status(false);
    }
}

/**
 * 刷新状态区显示
 * @param only_player 只更新玩家区域
 */
function refresh_battle_status(only_player) {
    let max_health_value = role_battle_1.max_health_value;
    let health_value = current_health_value;
    let shield_value = role_battle_1.current_shield_value;
    let health_width = 200 * health_value / max_health_value;
    let player_health_bar = $("#player_health_bar");
    if (health_width >= 200 * 0.7) {
        player_health_bar.css("background-color", "yellowgreen");
    } else if (health_width >= 200 * 0.35) {
        player_health_bar.css("background-color", "goldenrod");
    } else {
        player_health_bar.css("background-color", "darkred");
    }
    player_health_bar.css("width", health_width + "px");
    let player_health_number = $("#player_health_number");
    player_health_number.css("left", health_width + 100 + "px");
    player_health_number.text(health_value + "/" + max_health_value);
    if (shield_value > 0) {
        let shield_width = 1000 * shield_value / max_health_value;
        if (shield_width > 200) {
            shield_width = 200;
        }
        $("#player_shield_bar").css("width", shield_width + "px");
        let player_shield_number = $("#player_shield_number");
        player_shield_number.css("left", shield_width + 100 + "px");
        player_shield_number.text(shield_value);
    } else {
        $("#player_shield_bar").css("width", "0px");
        $("#player_shield_number").text("");
    }
    let exp_percent = get_exp_percent(current_character.lvl, current_character.exp);
    $("#exp_bar").css("width", 927 * exp_percent + "px");
    if (!only_player && role_battle_2 != null) {
        let monster_portrait = $("#monster_portrait");
        monster_portrait.show();
        monster_portrait.css("background-image", "url(\"./img/monster/" + map_monster_list[target_monster].species + ".jpg\")");
        $("#monster_name").text(role_battle_2.name);
        let max_health_value = role_battle_2.max_health_value;
        let health_value = role_battle_2.current_health_value;
        let shield_value = role_battle_2.current_shield_value;
        let health_width = 200 * health_value / max_health_value;
        let monster_health_bar = $("#monster_health_bar");
        if (health_width >= 200 * 0.7) {
            monster_health_bar.css("background-color", "yellowgreen");
        } else if (health_width >= 200 * 0.35) {
            monster_health_bar.css("background-color", "goldenrod");
        } else {
            monster_health_bar.css("background-color", "darkred");
        }
        monster_health_bar.css("width", health_width + "px");
        let monster_health_number = $("#monster_health_number");
        monster_health_number.css("right", health_width + 100 + "px");
        monster_health_number.text(health_value + "/" + max_health_value);
        if (shield_value > 0) {
            let shield_width = 1000 * shield_value / max_health_value;
            if (shield_width > 200) {
                shield_width = 200;
            }
            $("#monster_shield_bar").css("width", shield_width + "px");
            let monster_shield_number = $("#monster_shield_number");
            monster_shield_number.css("right", shield_width + 100 + "px");
            monster_shield_number.text(shield_value);
        } else {
            $("#monster_shield_bar").css("width", "0px");
            $("#monster_shield_number").text("");
        }
    }
}
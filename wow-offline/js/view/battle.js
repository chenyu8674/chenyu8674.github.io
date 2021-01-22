/** 战斗界面 **/

let view_battle;
let battle_map;
let map_info;
let kill_count;

$(document).ready(function () {
    view_battle = $("#view_battle");
    battle_map = $("#battle_map");
});

function show_view_battle() {
    kill_count = 0;
    view_battle.show();
    refresh_battle_status(false);
}

function hide_view_battle() {
    clearTimeout(self_heal_timer);
    clearTimeout(move_timer);
    clearTimeout(battle_timer);
    $("#battle_log").html("");
    role_battle_2 = null;
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
let self_heal_timer = 0;

/**
 * 绘制地图
 */
function show_battle_view(info) {
    // 初始化
    map_info = info;
    map_monster_list = [];
    target_x = 0;
    target_y = 0;
    move_step = 0;
    move_timer = 0;
    on_battle = false;
    $("#monster_portrait").hide();

    show_view_battle();
    let map = map_info.map;
    if (map == null || map.length === 0) {
        map = map_info.name;
    } else {
        map = map[0];
    }
    battle_map.css("background-image", "url(\"./img/map/" + map + ".jpg\")");
    $("#self_heal").show();
    show_heal_icon();
    if (map_info.type === 1) {
        if (is_in_local_mode()) {
            show_monster_area(map_info);
        }
        $("#attack_next").hide();
        player_x = (map_info.start_x + map_info.end_x) / 2;
        player_y = (map_info.start_y + map_info.end_y) / 2;
        refresh_random_monster();
    } else {
        $("#monster_area").hide();
        player_x = map_info.start_x;
        player_y = map_info.start_y;
        $("#attack_next").show();
        refresh_raid_monster();
        show_attack_icon();
    }
    show_player_point();
}

/**
 * 生成绷带图标
 */
function show_heal_icon() {
    let self_heal = $("#self_heal");
    self_heal.unbind("click");
    self_heal.click(function (e) {
        if (!on_battle) {
            clearTimeout(move_timer);
            battle_log("");
            battle_log(current_character.name + " 开始食用补给");
            clearTimeout(self_heal_timer);
            self_heal_timer = setTimeout(heal_loop, 100);
        }
        e.stopPropagation();
        return false;
    });
    self_heal.hover(function () {
        show_text_info(self_heal, "<p style='color:goldenrod'>食用补给</p><p>每秒回复10%最大生命值</p><p>进食时必须保持坐姿</p><p style='color:goldenrod'>大吉大利，今晚吃鸡</p>");
    }, function () {
        hide_info();
    });
}

/**
 * 休息循环执行
 */
function heal_loop() {
    let heal_time = HEAL_TIME;
    if (is_in_local_mode()) {
        heal_time = HEAL_TIME / LOCAL_MULTIPLE;
    }
    role_health_1 += Math.round(role_battle_1.max_health_value * TURN_TIME / HEAL_TIME / 1000);
    if (role_health_1 >= role_battle_1.max_health_value) {
        role_health_1 = role_battle_1.max_health_value;
        battle_log(current_character.name + " 恢复了全部生命");
    } else {
        clearTimeout(self_heal_timer);
        self_heal_timer = setTimeout(heal_loop, TURN_TIME);
    }
    role_battle_1.current_health_value = role_health_1;
    refresh_battle_status(true);
    refresh_current_status();
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
    monster_area.click(hide_monster_area);
}

function hide_monster_area() {
    $("#monster_area").hide();
}

/**
 * 生成玩家图标
 */
function show_player_point() {
    $(".player_point").remove();
    let player_point = $("<img alt='' src='./img/job/" + Math.round(current_character.job / 10) * 10 + ".png'/>");
    player_point.addClass("player_point");
    player_point.hover(function () {
        show_player_info();
    }, function () {
        hide_info();
    });
    battle_map.append(player_point);
    refresh_player_point();
    // 更新英雄头像状态
    $("#player_portrait").css("background-image", "url(\"./img/job/" + Math.round(current_character.job / 10) * 10 + ".png\")");
    $("#player_name").text(current_character.name);
    calculate_role_1(current_character);
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
 * 判断地图内某稀有度怪物数量
 */
function get_monster_count_by_rare(rare) {
    let count = 0;
    for (let i = 0; i < map_monster_list.length; i++) {
        if (map_monster_list[i].rare === rare) {
            count++;
        }
    }
    return count;
}

/**
 * 判断刷新点是否过近
 */
function has_nearly_monster(x, y) {
    let min_distance_x = 6.18;
    let min_distance_y = 9.26;
    if (Math.abs(player_x - x) <= min_distance_x && Math.abs(player_y - y) <= min_distance_y) {
        return true;
    }
    for (let i = 0; i < map_monster_list.length; i++) {
        if (Math.abs(map_monster_list[i].x - x) <= min_distance_x && Math.abs(map_monster_list[i].y - y) <= min_distance_y) {
            return true;
        }
    }
    return false;
}

/**
 * 向练级地图内添加怪物点
 */
function add_random_monster() {
    let lvl = current_character.lvl;
    if (lvl < map_info.min) {
        lvl = map_info.min;
    } else if (lvl > map_info.max) {
        lvl = map_info.max;
    }
    let monster_base_list;
    if (lvl >= map_info.max && get_monster_count_by_rare(4) === 0) {
        // if (get_monster_count_by_rare(4) === 0) {
        // 到达等级上限时，必然刷新精英怪
        monster_base_list = map_info.elite;
    } else if (get_monster_count_by_rare(3) === 0 && (current_character.exp === 0 || (kill_count > 0 && Math.random() < RARE_PERCENT / 100))) {
        // 几率性刷新稀有怪（新角色100%）
        monster_base_list = map_info.rare;
    } else {
        // 刷新普通怪
        monster_base_list = map_info.monster;
    }
    let random_monster_name = monster_base_list[Math.floor(Math.random() * monster_base_list.length)];
    let monster_obj = new_monster()[random_monster_name];
    while (get_monster_count_by_rare(1) >= 3 && monster_obj.rare === 1) {
        // 弱小怪物最多同时存在3个
        random_monster_name = monster_base_list[Math.floor(Math.random() * monster_base_list.length)];
        monster_obj = new_monster()[random_monster_name];
    }
    // 生成怪物对象
    let monster = get_new_monster(random_monster_name, lvl, monster_obj.type, monster_obj.rare, monster_obj.multiple, monster_obj.effect, monster_obj.buffs);
    monster.species = monster_obj.species;
    monster.rare = monster_obj.rare;
    monster.lvl = lvl;
    monster.skills = monster_obj.skill;
    if (monster.skills == null || monster.skills.length === 0) {
        monster.skills = [dictionary_monster_skill.physical_attack()];
    }
    if (monster.rare === 4) {
        monster.x = monster_obj.x;
        monster.y = monster_obj.y;
    } else {
        // 随机放置怪物坐标
        monster.x = map_info.start_x + (map_info.end_x - map_info.start_x) * Math.random();
        monster.y = map_info.start_y + (map_info.end_y - map_info.start_y) * Math.random();
        while (has_nearly_monster(monster.x, monster.y)) {
            // 距离已有怪物过近
            monster.x = map_info.start_x + (map_info.end_x - map_info.start_x) * Math.random();
            monster.y = map_info.start_y + (map_info.end_y - map_info.start_y) * Math.random();
        }
    }
    map_monster_list.push(monster);
}

/**
 * 刷新练级地图怪物点
 */
function refresh_random_monster() {
    $(".monster_point").remove();
    let try_count = 0;
    while (try_count < 100 && map_monster_list.length < 15) {
        try_count++;
        add_random_monster(map_info);
    }
    show_monster_point();
}

/**
 * 刷新副本地图怪物点
 */
function refresh_raid_monster() {
    $(".monster_point").remove();
    for (let i = 0; i < map_info.monster.length; i++) {
        let monster_raid = map_info.monster[i];
        let lvl = monster_raid.lvl;
        let monster_obj = new_monster()[monster_raid.name];
        // 生成怪物对象
        let monster = get_new_monster(monster_raid.name, lvl, monster_obj.type, monster_obj.rare, monster_obj.multiple, monster_obj.effect, monster_obj.buffs);
        monster.species = monster_obj.species;
        monster.rare = monster_obj.rare;
        monster.lvl = lvl;
        monster.skills = monster_obj.skill;
        if (monster.skills == null || monster.skills.length === 0) {
            monster.skills = [dictionary_monster_skill.physical_attack()];
        }
        monster.x = monster_raid.x;
        monster.y = monster_raid.y;
        map_monster_list.push(monster);
    }
    show_monster_point();
}

/**
 * 生成怪物图标
 */
function show_monster_point() {
    for (let i = 0; i < map_monster_list.length; i++) {
        let monster = map_monster_list[i];
        let monster_point = $("<img/>");
        monster_point.addClass("monster_point");
        monster_point.attr("src", "./img/monster/" + monster.species + ".jpg");
        monster_point.css("left", monster.x + "%");
        monster_point.css("top", monster.y + "%");
        monster_point.css("border-color", eval("color_rare_" + monster.rare));
        monster_point.hover(function () {
            monster_point.css("border-color", "goldenrod");
            show_monster_info(i);
        }, function () {
            monster_point.css("border-color", eval("color_rare_" + monster.rare));
            hide_info();
        });
        monster_point.click(function (e) {
            if ((is_in_local_mode() || map_info.type === 1) && !on_battle) {
                clearTimeout(self_heal_timer);
                target_x = monster.x;
                target_y = monster.y;
                target_monster = i;
                calculate_role_2(map_monster_list[i]);
                fill_role_2_health();
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
 * 生成进攻图标
 */
function show_attack_icon() {
    let attack_next = $("#attack_next");
    attack_next.unbind("click");
    attack_next.click(function (e) {
        if (!on_battle) {
            clearTimeout(self_heal_timer);
            target_x = map_monster_list[0].x;
            target_y = map_monster_list[0].y;
            target_monster = 0;
            calculate_role_2(map_monster_list[0]);
            fill_role_2_health();
            refresh_battle_status(false);
            do_move();
        }
        e.stopPropagation();
        return false;
    });
    attack_next.hover(function () {
        show_text_info(attack_next, "<p style='color:goldenrod'>前进！</p><p>向下个敌人发起攻击</p>");
    }, function () {
        hide_info();
    });
}

/**
 * 玩家开始移动
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

/**
 * 玩家移动循环执行
 */
function move_loop() {
    let move_distance = MOVE_DISTANCE;
    if (is_in_local_mode()) {
        move_distance = MOVE_DISTANCE * LOCAL_MULTIPLE;
    }
    if (current_character.job === dictionary_job.druid_2) {
        move_distance *= (1 + dictionary_buff.druid_2().X / 100);
    }
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
        move_timer = setTimeout(move_loop, 5);
    }
}

/**
 * 回合结束回调
 */
function on_turn_end() {
    refresh_current_status();
    refresh_battle_status(false);
}

/**
 * 战斗结束回调
 * @param index 0-平手，1-胜利，2-失败
 */
function on_battle_end(index) {
    role_shield_1 = 0;
    role_battle_1.current_shield_value = 0;
    current_character.debuffs = [];
    current_character.dots = [];
    on_battle = false;
    refresh_current_status();
    $(".player_point").removeClass("on_battle");
    if (index === 1) {
        kill_count++;
        let monster = map_monster_list[target_monster];
        if (map_info.type === 1 && monster.rare === 4) {
            // 练级地图击败精英怪时移位
            player_x += 3;
            player_y += 3;
            refresh_player_point();
        }
        // 计算经验/金钱
        let exp = MONSTER_EXP[monster.lvl - 1] * get_multiple_by_rare(monster.rare);
        // 等级经验惩戒，相差超出3级，每级-10%
        let exp_multiple = Math.abs(current_character.lvl - monster.lvl) - 3;
        exp_multiple = exp_multiple < 0 ? 0 : exp_multiple;
        exp_multiple = 10 - exp_multiple < 0 ? 0 : 10 - exp_multiple;
        exp *= exp_multiple / 10;
        let money = exp * get_multiple_by_rare(monster.rare) * (0.5 + 0.5 * Math.random());
        exp = Math.round(exp * EXP_MULTIPLE);
        money = Math.ceil(money * MONEY_MULTIPLE);
        // 输出金钱拾取
        battle_log(current_character.name + " 拾取了 " + get_money_html(money, 12));
        current_character.money += money;
        $("#current_money").html(get_money_html(current_character.money, 20));
        $("#shop_money").html(get_money_html(current_character.money, 20));
        // 道具掉落判定
        if (monster.rare >= 5) {
            // 副本BOSS掉落
            drop_raid_equipment(monster);
        } else {
            // 小怪随机掉落
            drop_random_equipment(monster);
        }
        // 升级判定
        battle_log(current_character.name + " 获得 " + exp + " 点经验");
        let old_lvl = current_character.lvl;
        add_experience(exp);
        save_data();
        calculate_base_property(current_character);
        if (current_character.lvl > old_lvl) {
            battle_log(current_character.name + " 升到了 " + current_character.lvl + " 级");
            calculate_role_1(current_character);
            refresh_current_status();
        }
        refresh_current_status_exp();
        refresh_battle_status(false);
        // 刷新地图怪物列表
        map_monster_list.splice(target_monster, 1);
        if (map_info.type === 1) {
            refresh_random_monster();
        } else {
            if (map_monster_list.length === 0) {
                // 完成副本
                battle_log("<br/><span style='color:goldenrod'>副本完成</span>");
                $("#self_heal").hide();
                $("#attack_next").hide();
            }
            $(".monster_point").remove();
            show_monster_point();
        }
    } else {
        player_x += 3;
        player_y += 3;
        refresh_player_point();
        $("#self_heal").click();
        refresh_battle_status(false);
    }
}

/**
 * 随机装备掉落计算
 * @param monster
 */
function drop_random_equipment(monster) {
    let lvl = monster.lvl;
    let rare = monster.rare;
    let is_drop = false;
    let multiple = monster.lvl <= 10 ? 1 + 0.3 * (11 - lvl) : 1;
    switch (rare) {
        case 1:
            is_drop = 100 * Math.random() < 5 * multiple * DROP_MULTIPLE;
            break;
        case 2:
            is_drop = 100 * Math.random() < 10 * multiple * DROP_MULTIPLE;
            break;
        case 3:
            is_drop = 100 * Math.random() < 100 * multiple * DROP_MULTIPLE;
            break;
        case 4:
            is_drop = 100 * Math.random() < 50 * multiple * DROP_MULTIPLE;
            break;
    }
    if (is_drop) {
        let model = create_random_equipment_model(lvl);
        put_equipment_to_items(model);
    }
}

/**
 * 副本装备掉落计算
 * @param monster
 */
function drop_raid_equipment(monster) {
    let drop_list = dictionary_monster[monster.name].drop;
    let drop_rate = Math.floor(Math.random() * 100);
    for (let i = 0; i < drop_list.length; i++) {
        let drop = drop_list[i];
        drop = drop.split("|");
        drop_rate -= Number(drop[1]);
        if (drop_rate <= 0) {
            let equipment = drop[0];
            put_equipment_to_items(equipment);
            return;
        }
    }
    alert("掉落计算异常：" + monster.name);
}

/**
 * 将装备拾入背包
 * @param model
 */
function put_equipment_to_items(model) {
    let items = current_character.items;
    for (let i = 0; i < MAX_ITEMS; i++) {
        if (items[i] == null) {
            items[i] = model;
            if (typeof model === "string") {
                // 生成固定装备model
                model = create_static_equipment_model(new_equipment()[model]);
            }
            model = create_equipment_by_model(model);
            let rare_color = eval("color_rare_" + model.rare);
            let id = "item" + new Date().getTime();
            battle_log(current_character.name + " 拾取了 <span id='" + id + "' style='font-weight:bold;color:" + rare_color + "'>[" + model.name + "]</span>");
            refresh_current_status();
            setTimeout(function () {
                let view_label = $("#" + id);
                view_label.hover(function () {
                    let view = $(this);
                    show_equipment_info(model, view[0].offsetWidth + view.offset().left, view[0].offsetHeight + view.offset().top);
                }, function () {
                    hide_info();
                });
            }, 0);
            break;
        }
    }
}

/**
 * 刷新状态区显示
 * @param only_player 只更新玩家区域
 */
function refresh_battle_status(only_player) {
    let max_health_value = role_battle_1.max_health_value;
    let health_value = role_battle_1.current_health_value;
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
    if (!only_player) {
        if (role_battle_2 == null) {
            $("#monster_portrait").hide();
            $("#monster_name").text("");
            $("#monster_health_bar").css("width", "0px");
            $("#monster_health_number").text("");
            $("#monster_shield_bar").css("width", "0px");
            $("#monster_shield_number").text("");
        } else {
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
}
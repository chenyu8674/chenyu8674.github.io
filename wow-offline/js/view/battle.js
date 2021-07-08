/** 战斗界面 **/

let view_battle;
let battle_map;
let map_info;
let kill_count;

let is_auto_battle;

$(document).ready(function () {
    view_battle = $("#view_battle");
    battle_map = $("#battle_map");
    set_key_listener();
});

function show_view_battle() {
    is_auto_battle = false;
    kill_count = 0;
    view_battle.show();
    $("#attack_next").show();
    refresh_battle_status(false);
}

function hide_view_battle() {
    is_auto_battle = false;
    clearTimeout(self_heal_timer);
    clearTimeout(move_timer);
    move_timer = 0;
    clearTimeout(battle_timer);
    battle_callback = null;
    $("#battle_log").html("");
    map_info = null;
    role_battle_2 = null;
    view_battle.hide();
}

function set_key_listener() {
    $(window).keydown(function (event) {
        switch (event.which) {
            case 49:
                // 按键1
                if (view_battle.is(":visible") && !is_front_view_show() && map_monster_list.length > 0) {
                    $("#attack_next").click();
                }
                break;
            case 50:
                // 按键2
                if (view_battle.is(":visible") && !is_front_view_show()) {
                    $("#self_heal").click();
                }
                break;
            default:
                break;
        }
    });
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
let map_index = 0;

/**
 * 绘制地图
 */
function show_battle_view(info) {
    // 初始化
    map_info = info;
    if (typeof map_info.area[0] === "number") {
        map_info.area = [map_info.area];
    }
    for (let i = 0; i < map_info.area.length; i++) {
        let area = map_info.area[i];
        for (let j = 0; j < area.length; j++) {
            if (map_info.area[i][j] > 100) {
                map_info.area[i][j] = map_info.area[i][j] / 10;
            }
        }
    }
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
        map_index = 0;
        map = map[map_index];
    }
    battle_map.css("background-image", "url(\"./img/map/" + map + ".jpg\")");
    $("#self_heal").show();
    show_heal_icon();
    hide_monster_area();
    if (map_info.type === 1) {
        // 练级地图
        if (is_in_local_mode()) {
            show_monster_area(map_info);
        }
        $("#auto_battle").show();
        show_auto_battle();
        player_x = (map_info.area[0][0] + map_info.area[0][2]) / 2;
        player_y = (map_info.area[0][1] + map_info.area[0][3]) / 2;
        refresh_random_monster();
    } else {
        // 副本地图
        $("#auto_battle").hide();
        $("#monster_area").hide();
        player_x = map_info.area[0][0];
        player_y = map_info.area[0][1];
        refresh_raid_monster();
    }
    show_attack_icon();
    show_player_point();
}

/**
 * 生成自动战斗图标
 */
function show_auto_battle() {
    let auto_battle = $("#auto_battle");
    auto_battle.unbind("click");
    auto_battle.click(function (e) {
        if (!is_auto_battle) {
            is_auto_battle = true;
            $("#self_heal").click();
        } else {
            is_auto_battle = false;
        }
        e.stopPropagation();
        return false;
    });
    auto_battle.hover(function () {
        show_text_info(auto_battle, "<div style='color:goldenrod;letter-spacing:1px;'>挂机</div><div>自动索敌、战斗和恢复</div>");
    }, function () {
        hide_info();
    });
}

/**
 * 生成绷带图标
 */
function show_heal_icon() {
    let self_heal = $("#self_heal");
    self_heal.unbind("click");
    self_heal.click(function (e) {
        if (!on_battle && role_health_1 < role_battle_1.max_health_value) {
            clearTimeout(move_timer);
            move_timer = 0;
            battle_log("");
            battle_log(current_character.name + " 开始休息");
            clearTimeout(self_heal_timer);
            self_heal_timer = setTimeout(heal_loop, 10);
        } else if (is_auto_battle) {
            $("#attack_next").click();
        }
        e.stopPropagation();
        return false;
    });
    self_heal.hover(function () {
        show_text_info(self_heal, "<div style='color:goldenrod;letter-spacing:1px;'>休息</div><div>每秒回复10%最大生命值</div><div>进食时必须保持坐姿</div><div style='color:goldenrod'>大吉大利，今晚吃鸡</div>");
    }, function () {
        hide_info();
    });
}

/**
 * 休息循环执行
 */
function heal_loop() {
    role_health_1 += Math.round(role_battle_1.max_health_value * TURN_TIME / HEAL_TIME);
    if (role_health_1 >= role_battle_1.max_health_value) {
        role_health_1 = role_battle_1.max_health_value;
        battle_log(current_character.name + " 恢复了全部生命");
        if (is_auto_battle) {
            $("#attack_next").click();
        }
    } else {
        clearTimeout(self_heal_timer);
        let timeout = TURN_TIME * 100 / role_battle_1.speed_battle;
        self_heal_timer = setTimeout(heal_loop, timeout);
    }
    role_battle_1.current_health_value = role_health_1;
    refresh_battle_status(true);
    refresh_current_status();
}

/**
 * 绘制怪物刷新区域（调试用）
 */
function show_monster_area(map_info) {
    $(".monster_area").remove();
    for (let i = 0; i < map_info.area.length; i++) {
        let area = map_info.area[i];
        let monster_area = $("<div></div>");
        monster_area.attr("class", "monster_area");
        monster_area.css("left", area[0] + "%");
        monster_area.css("top", area[1] + "%");
        monster_area.css("width", area[2] - area[0] + "%");
        monster_area.css("height", area[3] - area[1] + "%");
        battle_map.append(monster_area);
        monster_area.click(hide_monster_area);
    }
}

function hide_monster_area() {
    $(".monster_area").hide();
}

/**
 * 生成玩家图标
 */
function show_player_point() {
    $(".player_point").remove();
    let job = Math.round(current_character.job / 10) * 10;
    let player_point = $("<img alt='' src='./img/job/" + job + ".png'/>");
    player_point.addClass("player_point");
    player_point.addClass("player_point_" + job);
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
 * 判断刷新点是否合法
 */
function is_monster_position_valid(x, y) {
    // 刷新点是否在指定范围内
    let is_in_area = false;
    for (let i = 0; i < map_info.area.length; i++) {
        let area = map_info.area[i];
        if (x >= area[0] && y >= area[1] && x <= area[2] && y <= area[3]) {
            is_in_area = true;
            break;
        }
    }
    if (!is_in_area) {
        return false;
    }
    // 刷新点是否与其他怪物过近
    let zoom = 90;
    let min_distance_x = battle_map[0].offsetHeight / zoom;
    let min_distance_y = battle_map[0].offsetWidth / zoom;
    if (Math.abs(player_x - x) <= min_distance_x && Math.abs(player_y - y) <= min_distance_y) {
        return false;
    }
    for (let i = 0; i < map_monster_list.length; i++) {
        if (Math.abs(map_monster_list[i].x - x) <= min_distance_x && Math.abs(map_monster_list[i].y - y) <= min_distance_y) {
            return false;
        }
    }
    return true;
}

/**
 * 刷新练级地图怪物点
 */
function refresh_random_monster() {
    let add_success = true;
    while (add_success) {
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
        } else if (get_monster_count_by_rare(3) === 0 && (current_character.exp === 0 || (kill_count > 0 && random_percent(RARE_PERCENT)))) {
            // 几率性刷新稀有怪（新角色100%）
            monster_base_list = map_info.rare;
        } else {
            // 刷新普通怪
            monster_base_list = map_info.monster;
        }
        let random_monster_name = random_list(monster_base_list);
        let monster_obj = new_monster()[random_monster_name];
        while (get_monster_count_by_rare(1) >= 3 && monster_obj.rare === 1) {
            // 弱小怪物最多同时存在3个
            random_monster_name = random_list(monster_base_list);
            monster_obj = new_monster()[random_monster_name];
        }
        // 生成怪物对象
        let monster = create_monster_by_model(random_monster_name, lvl);
        add_success = true;
        if (monster.rare === 4) {
            monster.x = monster_obj.x > 100 ? monster_obj.x / 10 : monster_obj.x;
            monster.y = monster_obj.y > 100 ? monster_obj.y / 10 : monster_obj.y;
        } else {
            // 随机放置怪物坐标
            monster.x = 100 * Math.random();
            monster.y = 100 * Math.random();
            let try_count = 0;
            while (try_count < 1000 && !is_monster_position_valid(monster.x, monster.y)) {
                try_count++;
                // 未在刷新区域或距离已有怪物过近
                monster.x = 100 * Math.random();
                monster.y = 100 * Math.random();
            }
            if (try_count >= 1000) {
                add_success = false;
            }
        }
        if (add_success) {
            map_monster_list.push(monster);
        }
    }
    refresh_monster_point();
}

/**
 * 刷新副本地图怪物点
 */
function refresh_raid_monster() {
    $(".monster_point").remove();
    for (let i = 0; i < map_info.monster.length; i++) {
        let monster_raid = map_info.monster[i];
        let monster = {};
        if (monster_raid.name != null) {
            if (monster_raid.percent == null || random_percent(monster_raid.percent)) {
                let lvl;
                monster = dictionary_monster[monster_raid.name];
                if (monster_raid.lvl == null) {
                    lvl = monster.rare >= 5 ? map_info.max : map_info.min;
                } else {
                    lvl = monster_raid.lvl;
                }
                monster = create_monster_by_model(monster_raid.name, lvl);
                monster.percent = monster_raid.percent;
            }
        }
        monster.x = monster_raid.x > 100 ? monster_raid.x / 10 : monster_raid.x;
        monster.y = monster_raid.y > 100 ? monster_raid.y / 10 : monster_raid.y;
        monster.next = monster_raid.next;
        map_monster_list.push(monster);
    }
    refresh_monster_point();
}

/**
 * 生成怪物图标
 */
function refresh_monster_point() {
    $(".passing_point").remove();
    $(".monster_point").remove();
    for (let i = 0; i < map_monster_list.length; i++) {
        let monster = map_monster_list[i];
        if (monster.name == null) {
            // 途经点
            let monster_point = $("<div></div>");
            monster_point.css("left", monster.x + "%");
            monster_point.css("top", monster.y + "%");
            if (is_in_local_mode()) {
                monster_point.addClass("passing_point");
            } else {
                monster_point.css("display", "none");
            }
            monster_point.click(function (e) {
                if ((is_in_local_mode() || map_info.type === 1) && !on_battle) {
                    clearTimeout(self_heal_timer);
                    target_x = monster.x;
                    target_y = monster.y;
                    map_monster_list.splice(0, i);
                    target_monster = 0;
                    calculate_role_2(map_monster_list[0]);
                    refresh_monster_point();
                    do_move();
                }
                e.stopPropagation();
                return false;
            });
            battle_map.append(monster_point);
        } else {
            // 怪物
            let monster_point = $("<img/>");
            monster_point.css("left", monster.x + "%");
            monster_point.css("top", monster.y + "%");
            monster_point.addClass("monster_point");
            monster_point.attr("src", "./img/monster/" + monster.species + ".jpg");
            monster_point.css("border-color", eval("color_rare_" + monster.rare));
            monster_point.hover(function () {
                show_monster_info(monster_point, i);
            }, function () {
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
                    refresh_monster_point();
                    do_move();
                }
                e.stopPropagation();
                return false;
            });
            battle_map.append(monster_point);
        }
        if (monster.next) {
            break;
        }
    }
}

/**
 * 生成进攻图标
 */
function show_attack_icon() {
    let attack_next = $("#attack_next");
    attack_next.unbind("click");
    attack_next.click(function (e) {
        e.stopPropagation();
        attack_next_monster();
        return false;
    });
    attack_next.hover(function () {
        show_text_info(attack_next, "<div style='color:goldenrod;letter-spacing:1px;'>" + (map_info.type === 1 ? "进攻" : "前进") + "！</div><div>向" + (map_info.type === 1 ? "最近的" : "下一个") + "敌人发起攻击</div>");
    }, function () {
        hide_info();
    });
}

/**
 * 进攻
 */
function attack_next_monster() {
    if (on_battle) {
        return;
    }
    clearTimeout(self_heal_timer);
    if (map_info.type !== 1) {
        target_monster = 0;
    } else {
        let nearly_distance = Number.MAX_VALUE;
        for (let i = 0; i < map_monster_list.length; i++) {
            let monster = map_monster_list[i];
            let distance = Math.pow(monster.x - player_x, 2) + Math.pow(monster.y - player_y, 2);
            if (distance < nearly_distance) {
                nearly_distance = distance;
                target_monster = i;
            }
        }
    }
    target_x = map_monster_list[target_monster].x;
    target_y = map_monster_list[target_monster].y;
    calculate_role_2(map_monster_list[target_monster]);
    fill_role_2_health();
    refresh_battle_status(false);
    do_move();
}

/**
 * 是否处于移动中
 */
function is_in_move() {
    return move_timer !== 0;
}

/**
 * 玩家开始移动
 */
function do_move() {
    let move_x = target_x - player_x;
    let move_y = target_y - player_y;
    let move_distance = Math.sqrt(Math.pow(move_x, 2) + Math.pow(move_y, 2));
    move_step = Math.round(move_distance * 100);
    clearTimeout(move_timer);
    move_timer = setTimeout(move_loop, 10);
}

/**
 * 玩家移动循环执行
 */
function move_loop() {
    let move_distance = MOVE_DISTANCE;
    move_distance *= role_battle_1.speed_move / 100;
    if (move_distance > move_step) {
        move_distance = move_step;
    }
    player_x += (target_x - player_x) * move_distance / move_step;
    player_y += (target_y - player_y) * move_distance / move_step;
    move_step -= move_distance;
    refresh_player_point();
    if (move_step <= 0) {
        let monster = map_monster_list[target_monster];
        if (monster.next) {
            map_index++;
            battle_map.css("background-image", "url(\"./img/map/" + map_info.map[map_index] + ".jpg\")");
            map_monster_list.splice(0, 1);
            let monster = map_monster_list[0];
            player_x = monster.x;
            player_y = monster.y;
            refresh_player_point();
            map_monster_list.splice(0, 1);
            refresh_monster_point();
            return;
        }
        if (monster.name == null) {
            // 途经点
            map_monster_list.splice(target_monster, 1);
            refresh_monster_point();
            attack_next_monster();
        } else {
            // 开始战斗
            move_timer = 0;
            on_battle = true;
            $(".player_point").addClass("on_battle");
            battle_time = 1;
            // 战斗开始喊话
            if (monster.say_start) {
                battle_log();
                battle_log("<span style='color:red'>" + monster.name + " 大喊：" + monster.say_start + "</span>");
            }
            start_battle(current_character, monster, on_turn_end, on_battle_end);
        }
    } else {
        clearTimeout(move_timer);
        move_timer = setTimeout(move_loop, 10);
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
    on_battle = false;
    refresh_current_status();
    $(".player_point").removeClass("on_battle");
    if (index === 1) {
        kill_count++;
        let monster = map_monster_list[target_monster];
        if (monster.say_end) {
            battle_log("<span style='color:red'>" + monster.name + " 大喊：" + monster.say_end + "</span>");
        }
        battle_log();
        if (map_info.type === 1 && monster.rare === 4) {
            // 练级地图击败精英怪时移位
            player_x += 3;
            player_y += 3;
            refresh_player_point();
        }
        // 计算经验/金钱
        let exp = MONSTER_EXP[monster.lvl - 1] * get_multiple_by_rare(monster.rare);
        exp *= role_battle_1.speed_resource / 100;
        let money = exp;
        switch (monster.rare) {
            case 1:
                money *= 0.5;
                break;
            case 2:
                money *= 1;
                break;
            case 3:
                money *= 3;
                break;
            case 4:
                money *= 3;
                break;
            case 5:
                money *= 10;
                break;
            case 6:
                money *= 100;
                break;
        }
        money *= 0.5 + 0.5 * Math.random();
        // 等级经验惩戒，相差超出3级，每级-10%
        let exp_multiple = Math.abs(current_character.lvl - monster.lvl) - 3;
        exp_multiple = exp_multiple < 0 ? 0 : exp_multiple;
        exp_multiple = 10 - exp_multiple < 0 ? 0 : 10 - exp_multiple;
        exp *= exp_multiple / 10;
        exp = Math.round(exp * EXP_MULTIPLE);
        money = Math.ceil(money * MONEY_MULTIPLE);
        // 输出金钱拾取
        battle_log(current_character.name + " 拾取了 " + get_money_html(money, 12));
        current_character.money += money;
        $("#current_money").html(get_money_html(current_character.money, 20));
        $("#shop_money").html(get_money_html(current_character.money, 20));
        // 道具掉落判定
        if (monster.rare >= 5 || monster.percent != null) {
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
            let monster_count = 0;
            for (let i = 0; i < map_monster_list.length; i++) {
                let monster = map_monster_list[i];
                if (monster.name != null) {
                    monster_count++;
                }
            }
            if (monster_count <= 0) {
                // 完成副本
                map_monster_list = [];
                refresh_monster_point();
                battle_log("<br/><span style='color:goldenrod'>副本完成</span>");
                $("#attack_next").hide();
            }
            $(".monster_point").remove();
            refresh_monster_point();
        }
    } else {
        player_x += 3;
        player_y += 3;
        refresh_player_point();
        $("#self_heal").click();
        refresh_battle_status(false);
    }
    if (is_auto_battle) {
        $("#self_heal").click();
    }
}

/**
 * 随机装备掉落计算
 * @param monster
 */
function drop_random_equipment(monster) {
    let lvl = monster.lvl;
    let rare = monster.rare;
    let drop_list = [DROP_1, DROP_2, DROP_3, DROP_4, DROP_5, DROP_6];
    let is_drop = random_percent(drop_list[rare - 1] * DROP_MULTIPLE);
    if (is_drop) {
        if (monster.drop != null && random_percent(DROP_MONSTER)) {
            let drop = random_list(monster.drop);
            let equipment = create_static_equipment_model(drop);
            if (equipment.bind == null) {
                // 拾取绑定
                put_equipment_to_items(drop);
            } else {
                put_equipment_to_items([drop, equipment.bind]);
            }
            return;
        }
        if (map_info.drop != null && random_percent(DROP_MAP)) {
            let drop = random_list(map_info.drop);
            let equipment = create_static_equipment_model(drop);
            if (equipment.bind == null) {
                // 拾取绑定
                put_equipment_to_items(drop);
            } else {
                put_equipment_to_items([drop, equipment.bind]);
            }
            return;
        }
        put_equipment_to_items(get_random_equipment_model(lvl));
    }
}

/**
 * 副本装备掉落计算
 * @param monster
 */
function drop_raid_equipment(monster) {
    let test_mode = is_in_local_mode();
    // test_mode = false;
    let drop_list = dictionary_monster[monster.name].drop;
    if (drop_list != null) {
        let drop_rate = 100 * Math.random();
        if (test_mode) {
            drop_rate = 100;
        }
        for (let i = 0; i < drop_list.length; i++) {
            let drop = drop_list[i];
            if (typeof drop === "number") {
                drop_rate -= 100 / drop_list.length;
                if (drop_rate <= 0 || test_mode) {
                    let equipment = create_static_equipment_model(drop);
                    if (equipment.bind == null) {
                        // 拾取绑定
                        put_equipment_to_items(drop);
                    } else {
                        put_equipment_to_items([drop, equipment.bind]);
                    }
                    if (!test_mode) {
                        return;
                    }
                }
            } else {
                drop = drop.split("+");
                drop_rate -= Number(drop[1]);
                if (drop_rate <= 0 || test_mode) {
                    let equipment = Number(drop[0]);
                    put_equipment_to_items(equipment);
                    if (!test_mode) {
                        return;
                    }
                }
            }
        }
    }
    if (!test_mode) {
        drop_random_equipment(monster);
    }
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
            let equipment = create_equipment_by_model(model);
            if (equipment == null) {
                alert("装备数据异常：" + model);
                return;
            }
            let rare_color = eval("color_rare_" + equipment.rare);
            let id = "item" + new Date().getTime();
            battle_log(current_character.name + " 拾取了 <span id='" + id + "' style='font-weight:bold;color:" + rare_color + "'>[" + equipment.name + "]</span>");
            refresh_current_status();
            setTimeout(function () {
                let view_label = $("#" + id);
                view_label.hover(function () {
                    let view = $(this);
                    show_equipment_info(view, model);
                }, function () {
                    hide_info();
                });
            }, 0);
            return;
        }
    }
    battle_log("<span style='color:red'>背包已满</span>");
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
    if (health_width >= 2 * THRESHOLD_HEAL) {
        player_health_bar.css("background-color", "yellowgreen");
    } else if (health_width >= 2 * THRESHOLD_EXECUTE) {
        player_health_bar.css("background-color", "goldenrod");
    } else {
        player_health_bar.css("background-color", "darkred");
    }
    player_health_bar.css("width", health_width + "px");
    let player_health_number = $("#player_health_number");
    player_health_number.css("left", health_width + 100 + "px");
    player_health_number.text(health_value + "/" + max_health_value);
    if (shield_value > 0) {
        let shield_width = 400 * shield_value / max_health_value;
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
            let monster = map_monster_list[target_monster];
            if (monster.name == null) {
                // 途经点
                return;
            }
            let monster_portrait = $("#monster_portrait");
            monster_portrait.show();
            monster_portrait.css("background-image", "url(\"./img/monster/" + monster.species + ".jpg\")");
            $("#monster_name").text(role_battle_2.name);
            let max_health_value = role_battle_2.max_health_value;
            let health_value = role_battle_2.current_health_value;
            let shield_value = role_battle_2.current_shield_value;
            let health_width = 200 * health_value / max_health_value;
            let monster_health_bar = $("#monster_health_bar");
            if (health_width >= 2 * THRESHOLD_HEAL) {
                monster_health_bar.css("background-color", "yellowgreen");
            } else if (health_width >= 2 * THRESHOLD_EXECUTE) {
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
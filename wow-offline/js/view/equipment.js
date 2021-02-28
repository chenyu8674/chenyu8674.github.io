let view_equipment;
let view_current_items;

let current_tab = 1;
let current_status_tab_1;
let current_status_tab_2;

function show_view_equipment() {
    view_equipment.show();
    refresh_current_status();
    refresh_current_items();
}

function hide_view_equipment() {
    view_equipment.hide();
}

$(document).ready(function () {
    view_equipment = $("#view_equipment");
    view_current_items = $("#current_items");
    current_status_tab_1 = $("#current_status_tab_1");
    current_status_tab_2 = $("#current_status_tab_2");
    current_status_tab_1.click(function () {
        current_tab = 1;
        refresh_current_status_1();
        current_status_tab_1.attr("class", "status_tab_click");
        current_status_tab_2.attr("class", "status_tab_normal");
    });
    current_status_tab_2.click(function () {
        current_tab = 2;
        refresh_current_status_2();
        current_status_tab_2.attr("class", "status_tab_click");
        current_status_tab_1.attr("class", "status_tab_normal");
    });
    let current_pack_bag = $("#current_pack_bag");
    current_pack_bag.click(function () {
        pack_bag();
        refresh_current_items();
        save_data();
    });
    hide_view_equipment();
    set_info_hover(current_pack_bag, "为背包物品排序");
});

/**
 * 整理背包
 */
function pack_bag() {
    current_character.items.sort(sort_equipment);
}

/**
 * 刷新人物状态显示
 */
function refresh_current_status() {
    calculate_role_1(role_base_1);
    refresh_current_status_base();
    refresh_current_status_exp();
    refresh_current_equipment();
    refresh_current_items();
    if (current_tab === 1) {
        current_status_tab_1.click();
    } else {
        current_status_tab_2.click();
    }
}

function refresh_current_status_base() {
    let job_flag = dictionary_job.job_flag[10 * Math.floor(current_character.job / 10)];
    $("#current_equipments_icon").attr("src", "img/job/" + job_flag + ".png");
    $("#current_status_name").text(current_character.name);
    $("#current_status_job").text("等级 " + current_character.lvl + " " + dictionary_job.job_name[current_character.job]);
    $("#current_equipment_lvl").text("装备等级 " + get_equipment_lvl(current_character));
    let current_status_area_2 = $("#current_status_area_2");
    current_status_area_2.empty();
    create_status_area_2_line("移动速度：" + role_battle_1.speed_move + "%<br/>",
        "影响角色在地图上的移动速度", current_status_area_2
    );
    create_status_area_2_line("战斗速度：" + role_battle_1.speed_battle + "%<br/>",
        "影响角色战斗和休息速度<br/>当前间隔为 " + (TURN_TIME / 10 / role_battle_1.speed_battle).toFixed(3) + " 秒", current_status_area_2
    );
    create_status_area_2_line("资源获取：" + role_battle_1.speed_resource + "%<br/>",
        "影响角色通过战斗获得的经验和金钱数量", current_status_area_2
    );
}

function refresh_current_status_exp() {
    let lvl = current_character.lvl;
    let exp_percent = get_exp_percent(lvl, current_character.exp);
    let exp = Math.round(exp_percent * LVL_EXP[lvl - 1]);
    let exp_max = LVL_EXP[lvl - 1];
    let current_status_area_1 = $("#current_status_area_1");
    current_status_area_1.empty();
    create_status_area_1_line("生命值：" + role_battle_1.current_health_value + "/" + role_battle_1.max_health_value + "<br/>",
        "当前/最大生命值", current_status_area_1
    );
    create_status_area_1_line("护盾值：" + role_battle_1.current_shield_value + "<br/>",
        "当前护盾值", current_status_area_1
    );
    let exp_total = lvl >= MAX_LVL ? LVL_EXP[MAX_LVL - 1] : exp_max;
    if (exp_total >= 1000000) {
        exp_total = Math.round(exp_total / 1000) + "K"
    }
    let exp_current = lvl >= MAX_LVL ? LVL_EXP[MAX_LVL - 1] : exp;
    if (exp_total.indexOf("K") > 0 && exp_current >= 10000) {
        exp_current = Math.round(exp_current / 1000) + "K"
    }
    create_status_area_1_line("经验值：" + exp_current + "/" + exp_total + "<br/>",
        "当前/升级所需经验值", current_status_area_1
    );
}

function create_status_area_1_line(show, info, view) {
    let line = $("<div>" + show + "</div>");
    line.css("float", "left");
    line.css("margin-right", "100px");
    line.hover(function () {
        line.css("color", "goldenrod");
        show_text_info($(this), info);
    }, function () {
        line.css("color", "whitesmoke");
        hide_info();
    });
    view.append(line);
}

function create_status_area_2_line(show, info, view) {
    let line = $("<div>" + show + "</div>");
    line.css("float", "left");
    line.hover(function () {
        line.css("color", "goldenrod");
        show_text_info($(this), info);
    }, function () {
        line.css("color", "whitesmoke");
        hide_info();
    });
    view.append(line);
}

function create_status_line(show, info) {
    let line = $("<div>" + show + "</div>");
    line.css("float", "left");
    line.css("padding-right", "10px");
    if (show.length > 0) {
        line.css("margin-right", "30px");
    } else {
        line.css("height", "15px");
        line.css("margin-right", "150px");
    }
    line.hover(function () {
        line.css("color", "goldenrod");
        show_text_info($(this), info);
    }, function () {
        line.css("color", "whitesmoke");
        hide_info();
    });
    $("#current_status").append(line);
}

function refresh_current_status_1() {
    let current_status = $("#current_status");
    current_status.empty();
    current_status.attr("class", "current_status_1");
    create_status_line("力量：" + role_battle_1.str,
        role_base_1.str + "+" + (role_status_1.str + role_status_1.attr - role_base_1.str) + " (" + (role_status_1.str_percent + role_status_1.attr_percent) + "%)<br/>"
        + "每点提高" + str_to_attack_power + "攻击强度，" + str_to_block_value + "格挡值"
    );
    create_status_line("敏捷：" + role_battle_1.agi,
        role_base_1.agi + "+" + (role_status_1.agi + role_status_1.attr - role_base_1.agi) + " (" + (role_status_1.agi_percent + role_status_1.attr_percent) + "%)<br/>"
        + "每点提高" + agi_to_attack_power + "攻击强度，" + agi_to_hit_rate + "命中等级，" + agi_to_critical_rate + "暴击等级，" + agi_to_dodge_rate + "闪避等级"
    );
    create_status_line("耐力：" + role_battle_1.sta,
        role_base_1.sta + "+" + (role_status_1.sta + role_status_1.attr - role_base_1.sta) + " (" + (role_status_1.sta_percent + role_status_1.attr_percent) + "%)<br/>"
        + "每点提高" + sta_to_health_max + "最大生命值，" + sta_to_armor_attack + "攻击护甲"
    );
    create_status_line("智力：" + role_battle_1.int,
        role_base_1.int + "+" + (role_status_1.int + role_status_1.attr - role_base_1.int) + " (" + (role_status_1.int_percent + role_status_1.attr_percent) + "%)<br/>"
        + "每点提高" + int_to_magic_power + "法术强度，" + int_to_hit_rate + "命中等级，" + int_to_critical_damage + "%暴击伤害"
    );
    create_status_line("精神：" + role_battle_1.spr,
        role_base_1.spr + "+" + (role_status_1.spr + role_status_1.attr - role_base_1.spr) + " (" + (role_status_1.spr_percent + role_status_1.attr_percent) + "%)<br/>"
        + "每点提高" + spr_to_heal_power + "治疗强度，" + spr_to_magic_power + "法术强度，" + spr_to_armor_magic + "法术护甲"
    );
    create_status_line("", "");
    create_status_line("攻击强度：" + role_battle_1.attack_power,
        (role_battle_1.str * str_to_attack_power + role_battle_1.agi * agi_to_attack_power) + "+" + role_status_1.attack_power + " (" + role_status_1.attack_power_percent + "%)<br/>"
        + "影响技能造成的攻击效果"
    );
    create_status_line("法术强度：" + role_battle_1.magic_power,
        (role_battle_1.int * int_to_magic_power + role_battle_1.spr * spr_to_magic_power) + "+" + role_status_1.magic_power + " (" + role_status_1.magic_power_percent + "%)<br/>"
        + "影响技能造成的法术效果"
    );
    create_status_line("治疗强度：" + role_battle_1.heal_power,
        (role_battle_1.spr * spr_to_heal_power) + "+" + role_status_1.heal_power + " (" + role_status_1.heal_power_percent + "%)<br/>"
        + "影响技能造成的治疗效果"
    );
    create_status_line("", "");
    create_status_line("攻击护甲：" + role_battle_1.armor_attack,
        (role_battle_1.sta * sta_to_armor_attack) + "+" + (role_status_1.armor_attack + role_status_1.armor_all) + " (" + (role_status_1.armor_attack_percent + role_status_1.armor_all_percent) + "%)<br/>"
        + "受到的攻击伤害减少 " + (calculate_armor_attack(role_battle_1) * 100).toFixed(2) + "%"
    );
    create_status_line("法术护甲：" + role_battle_1.armor_magic,
        (role_battle_1.spr * spr_to_armor_magic) + "+" + (role_status_1.armor_magic + role_status_1.armor_all) + " (" + (role_status_1.armor_magic_percent + role_status_1.armor_all_percent) + "%)<br/>"
        + "受到的法术伤害减少 " + (calculate_armor_magic(role_battle_1) * 100).toFixed(2) + "%"
    );
    create_status_line("", "");
    create_status_line("命中等级：" + role_battle_1.hit_rate,
        (role_battle_1.agi * agi_to_hit_rate + role_battle_1.int * int_to_hit_rate) + "+" + role_status_1.hit_rate + " (" + role_status_1.critical_rate_percent + "%)<br/>"
        + "命中几率提高 " + (calculate_original_hit(role_battle_1) - role_battle_1.hit_chance_final).toFixed(2) + "%"
    );
    create_status_line("命中几率：" + calculate_original_hit(role_battle_1).toFixed(2) + "%",
        "技能命中目标的基础几率<br/>受到双方等级与目标闪避率的影响"
    );
    create_status_line("暴击等级：" + role_battle_1.critical_rate,
        role_battle_1.agi * agi_to_critical_rate + "+" + role_status_1.critical_rate + " (" + role_status_1.critical_rate_percent + "%)<br/>"
        + "暴击几率提高 " + (calculate_original_critical(role_battle_1) - role_battle_1.critical_chance_final).toFixed(2) + "%"
    );
    create_status_line("暴击几率：" + calculate_original_critical(role_battle_1).toFixed(2) + "%",
        "技能造成暴击的几率<br/>受到双方等级的影响"
    );
    create_status_line("暴击伤害：" + role_battle_1.critical_damage + "%",
        Math.round(150 + role_battle_1.int * int_to_critical_damage) + "+" + (role_status_1.critical_damage - 150) + "%<br/>"
        + "造成的暴击伤害的百分比"
    );
    create_status_line("闪避等级：" + role_battle_1.dodge_rate,
        role_battle_1.agi * agi_to_dodge_rate + "+" + role_status_1.dodge_rate + " (" + role_status_1.dodge_rate_percent + "%)<br/>"
        + "闪避几率提高 " + (calculate_original_dodge(role_battle_1) - role_battle_1.dodge_chance_final).toFixed(2) + "%"
    );
    create_status_line("闪避几率：" + calculate_original_dodge(role_battle_1).toFixed(2) + "%",
        "闪避目标技能的几率<br/>受到双方等级的影响"
    );
    if (has_equip_shield(current_character)) {
        create_status_line("格挡等级：" + role_battle_1.block_rate,
            role_status_1.block_rate + " (" + role_status_1.block_rate_percent + "%)<br/>"
            + "格挡几率提高 " + (calculate_original_block(role_battle_1) - role_battle_1.block_chance_final).toFixed(2) + "%"
        );
        create_status_line("格挡几率：" + calculate_original_block(role_battle_1).toFixed(2) + "%",
            "格挡目标技能的几率<br/>受到双方等级的影响"
        );
        create_status_line("盾格挡值：" + role_battle_1.block_value,
            role_battle_1.str * str_to_block_value + "+" + role_status_1.block_value + " (" + role_status_1.block_value_percent + "%)<br/>"
            + "格挡目标技能时减少受到的伤害"
        );
    }
    create_status_line("", "");
    create_status_line("精通等级：" + role_battle_1.mastery_rate,
        (role_battle_1.lvl * mastery_per_lvl) + "+" + (role_status_1.mastery_rate - role_battle_1.lvl * mastery_per_lvl) + " (" + role_status_1.mastery_rate_percent + "%)<br/>"
        + get_mastery_html()
    );
    let resilient_dot = calculate_original_resilient_dot(role_battle_1).toFixed(2);
    let resilient_cri = calculate_original_resilient_cri(role_battle_1).toFixed(2);
    create_status_line("韧性等级：" + role_battle_1.resilient_rate,
        role_status_1.resilient_rate + " (" + role_status_1.resilient_rate_percent + "%)<br/>"
        + "受到的持续伤害" + (resilient_dot >= 0 ? "减少" : "增加") + " " + (resilient_dot >= 0 ? resilient_dot : -resilient_dot) + "%<br/>"
        + "被暴击时受到的额外伤害" + (resilient_cri >= 0 ? "减少" : "增加") + " " + (resilient_cri >= 0 ? resilient_cri : -resilient_cri) + "%<br/>"
    );
}

function get_mastery_html() {
    let mastery_percent = calculate_original_mastery(role_battle_1).toFixed(2);
    switch (role_battle_1.job) {
        case 11:
            return "装备双手武器且致死打击命中时，" + mastery_percent + "%几率触发一次压制";
        case 12:
            return "嗜血的生命回复效果提高" + mastery_percent + "%";
        case 13:
            return "施放破甲时，获得" + mastery_percent + "%格挡值的伤害护盾";
        case 21:
            return "神圣震击获得" + mastery_percent + "%治疗强度的伤害加成";
        case 22:
            return "清算造成的神圣伤害的" + mastery_percent + "%转化为生命回复";
        case 23:
            return "命令圣印的触发几率提高" + mastery_percent + "%";
        case 31:
            return "施放多重射击和狂野怒火时，" + mastery_percent + "%几率进行一次额外攻击";
        case 32:
            return "奥术射击命中时，" + mastery_percent + "%几率重置瞄准射击的冷却时间";
        case 33:
            return "猛禽一击受到的闪避率加成提高" + mastery_percent + "%";
        case 41:
            return "施放元素掌握时，额外获得" + mastery_percent + "%伤害穿透";
        case 42:
            return "风怒武器的触发几率提高" + mastery_percent + "%";
        case 43:
            return "施放治疗波可使所有护甲提高" + mastery_percent + "%，持续5回合";
        case 51:
            return "月火术和阳炎术造成的持续伤害提高" + mastery_percent + "%";
        case 52:
            return "凶猛撕咬从每个连击点获得的伤害加成提高" + mastery_percent + "%";
        case 53:
            return "槌击造成伤害的" + mastery_percent + "%转化为伤害护盾";
        case 61:
            return "冷血状态下的背刺强化为伏击，伤害提高" + mastery_percent + "%";
        case 62:
            return "邪恶攻击命中时，" + mastery_percent + "%几率获得一个额外的连击点";
        case 63:
            return "割裂造成伤害的" + mastery_percent + "%转化为生命回复";
        case 54:
            return "战斗开始时召唤树人作战，每回合从目标吸取" + mastery_percent + "%治疗强度的生命";
        case 81:
            return "吸取生命的效果提高" + mastery_percent + "%";
        case 82:
            return "顺劈斩命中时，" + mastery_percent + "%几率附加伤害加深效果";
        case 83:
            return "暗影箭命中时，" + mastery_percent + "%几率施放燃烧，结算献祭的剩余伤害并重置其冷却时间";
        case 91:
            return "施放唤醒时，" + mastery_percent + "%几率使效果提高50%";
        case 92:
            return "未暴击的火焰法术使暴击率提高" + mastery_percent + "%，叠加至造成暴击为止";
        case 93:
            return "每层寒冰箭的附加效果使目标的所有伤害额外降低" + mastery_percent + "%";
        default:
            return "（施工中）技能效果提高" + mastery_percent + "%";
    }
}

function refresh_current_status_2() {
    let current_status = $("#current_status");
    current_status.empty();
    current_status.attr("class", "current_status_2");

    create_status_line("承受伤害：" + role_battle_1.taken_damage_percent + "%",
        "受到的所有伤害的总百分比"
    );
    create_status_line("承受治疗：" + role_battle_1.taken_heal_percent + "%",
        "受到的所有治疗的总百分比"
    );
    create_status_line("", "");
    create_status_line("物理伤害：" + role_battle_1.damage_physical + "%",
        "物理伤害的总百分比"
    );
    create_status_line("火焰伤害：" + role_battle_1.damage_fire + "%",
        "火焰伤害的总百分比"
    );
    create_status_line("冰霜伤害：" + role_battle_1.damage_frost + "%",
        "冰霜伤害的总百分比"
    );
    create_status_line("自然伤害：" + role_battle_1.damage_natural + "%",
        "自然伤害的总百分比"
    );
    create_status_line("奥术伤害：" + role_battle_1.damage_arcane + "%",
        "奥术伤害的总百分比"
    );
    create_status_line("神圣伤害：" + role_battle_1.damage_holy + "%",
        "神圣伤害的总百分比"
    );
    create_status_line("暗影伤害：" + role_battle_1.damage_shadow + "%",
        "暗影伤害的总百分比"
    );
    create_status_line("", "");
    create_status_line("物理抗性：" + role_battle_1.res_physical + "%",
        "对物理伤害的抗性百分比<br/>战斗中最高按 " + MAX_RES + "% 结算"
    );
    create_status_line("火焰抗性：" + role_battle_1.res_fire + "%",
        "对火焰伤害的抗性百分比<br/>战斗中最高按 " + MAX_RES + "% 结算"
    );
    create_status_line("冰霜抗性：" + role_battle_1.res_frost + "%",
        "对冰霜伤害的抗性百分比<br/>战斗中最高按 " + MAX_RES + "% 结算"
    );
    create_status_line("自然抗性：" + role_battle_1.res_natural + "%",
        "对自然伤害的抗性百分比<br/>战斗中最高按 " + MAX_RES + "% 结算"
    );
    create_status_line("奥术抗性：" + role_battle_1.res_arcane + "%",
        "对奥术伤害的抗性百分比<br/>战斗中最高按 " + MAX_RES + "% 结算"
    );
    create_status_line("神圣抗性：" + role_battle_1.res_holy + "%",
        "对神圣伤害的抗性百分比<br/>战斗中最高按 " + MAX_RES + "% 结算"
    );
    create_status_line("暗影抗性：" + role_battle_1.res_shadow + "%",
        "对暗影伤害的抗性百分比<br/>战斗中最高按 " + MAX_RES + "% 结算"
    );
    create_status_line("", "");
    create_status_line("物理穿透：" + role_battle_1.pierce_physical + "%",
        "物理伤害抵消目标抗性的百分比"
    );
    create_status_line("火焰穿透：" + role_battle_1.pierce_fire + "%",
        "火焰伤害抵消目标抗性的百分比"
    );
    create_status_line("冰霜穿透：" + role_battle_1.pierce_frost + "%",
        "冰霜伤害抵消目标抗性的百分比"
    );
    create_status_line("自然穿透：" + role_battle_1.pierce_natural + "%",
        "自然伤害抵消目标抗性的百分比"
    );
    create_status_line("奥术穿透：" + role_battle_1.pierce_arcane + "%",
        "奥术伤害抵消目标抗性的百分比"
    );
    create_status_line("神圣穿透：" + role_battle_1.pierce_holy + "%",
        "神圣伤害抵消目标抗性的百分比"
    );
    create_status_line("暗影穿透：" + role_battle_1.pierce_shadow + "%",
        "暗影伤害抵消目标抗性的百分比"
    );
}

/**
 * 绘制装备栏
 */
function refresh_current_equipment() {
    let cell_old = $(".equipment");
    cell_old.css("border-color", "slategray");
    cell_old.css("background-image", "");
    cell_old.css("box-shadow", "");
    cell_old.off('mouseenter').unbind('mouseleave');
    cell_old.off('contextmenu');
    let equipments = current_character.equipments;
    let ring_count = 0;
    let trinket_count = 0;
    let weapon_count = 0;
    for (let i = 0; i < equipments.length; i++) {
        let equipment = equipments[i];
        // 装备后绑定
        if (typeof equipment[0] === "number" && equipment[1] === 1) {
            equipments[i] = equipment[0];
        } else if (equipment.bind === 1) {
            delete equipment.bind;
        }
        let list = get_equipment_by_model(equipment);
        let equipment_name = list[0];
        equipment = list[1];
        let check_equipment = create_equipment_by_model(equipment);
        let pos_new = check_equipment.pos;
        let rare = check_equipment.rare;
        let icon = check_equipment.icon;
        if (check_equipment.pos === 13) {
            pos_new += ring_count;
            ring_count++;
        }
        if (check_equipment.pos === 14) {
            pos_new += 1 + trinket_count;
            trinket_count++;
        }
        if (check_equipment.pos === 15) {
            pos_new += 2 + weapon_count;
            weapon_count++;
        }
        if (check_equipment.pos === 16) {
            pos_new = 18;
        }
        let cell = $("#current_equipments_" + pos_new);
        let rare_color = eval("color_rare_" + rare);
        cell.css("border-color", rare_color);
        cell.css("box-shadow", "0 0 10px inset " + rare_color);
        cell.css("background-image", "url(./img/equipment/" + icon + ".jpg)");
        cell.hover(function () {
            let view = $(this);
            show_equipment_info(view, equipment);
        }, function () {
            hide_info();
        });
        // 右键点击事件，卸下装备
        cell.contextmenu(function (e) {
            e.preventDefault();
            take_off_equipment(equipment_name != null ? equipment_name : equipment);
        });
    }
    let off_hand = $("#current_equipments_18");
    if (has_equip_two_hand_weapon()) {
        off_hand.css("background-image", $("#current_equipments_17").css("background-image"));
        off_hand.addClass("gray");
    } else {
        off_hand.removeClass("gray");
    }
}

/**
 * 绘制物品栏
 */
function refresh_current_items() {
    view_current_items.empty();
    let items = current_character.items;
    for (let i = 0; i < MAX_ITEMS; i++) {
        let item = items[i];
        let cell = $("<div></div>");
        cell.addClass("item");
        cell.css("left", 11 + (i % 10) * 58 + "px");
        cell.css("top", 11 + Math.floor(i / 10) * 58 + "px");
        if (item != null) {
            item = get_equipment_by_model(item)[1];
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
            // 右键点击事件，穿上装备
            cell.contextmenu(function (e) {
                e.preventDefault();
                equip_equipment(i);
            });
        }
        view_current_items.append(cell);
    }
    $("#current_money").html(get_money_html(current_character.money, 20));
}

/**
 * 获取指定位置已装备的数量
 * @param pos 13戒指 14饰品 15主手 16副手
 * @return {number}
 */
function get_equipment_count_by_pos(pos) {
    let count = 0;
    let equipments = current_character.equipments;
    for (let j = 0; j < equipments.length; j++) {
        let equipment = equipments[j];
        equipment = create_equipment_by_model(equipment);
        if (equipment.pos === pos) {
            count++;
        }
    }
    return count;
}

/**
 * 是否装备了盾牌
 * @return {boolean}
 */
function has_equip_shield(role) {
    if (role.name !== current_character.name) {
        // 怪物
        return true;
    }
    let equipments = role.equipments;
    for (let j = 0; j < equipments.length; j++) {
        let equipment = equipments[j];
        equipment = create_equipment_by_model(equipment);
        if (equipment.type === 41) {
            return true;
        }
    }
    return false;
}

/**
 * 是否装备了双手武器
 * @return {boolean}
 */
function has_equip_two_hand_weapon(role) {
    if (role == null) {
        role = current_character;
    }
    let equipments = role.equipments;
    for (let j = 0; j < equipments.length; j++) {
        let module = equipments[j];
        let equipment = create_equipment_by_model(module);
        if (equipment.pos === 15 && is_in_array(equipment.type, [21, 22, 23, 24, 25, 31, 32, 33])) {
            return true;
        }
    }
    return false;
}

/**
 * 获取背包中空格数量
 * @return {number}
 */
function get_item_empty_count() {
    let count = 0;
    let items = current_character.items;
    for (let k = 0; k < MAX_ITEMS; k++) {
        if (items[k] == null) {
            count++;
        }
    }
    return count;
}

/**
 * 判断是否为双持职业
 */
function can_equip_two_weapons() {
    return is_in_array(current_character.job, [10, 11, 12, 13, 33, 42, 60, 61, 62, 63]);
}

/**
 * 尝试从背包穿上装备
 * @param index 背包位置
 */
function equip_equipment(index) {
    if (is_in_battle()) {
        return;// 战斗中
    }
    let items = current_character.items;
    let item = items[index];
    let list = get_equipment_by_model(item);
    let item_name = list[0];
    item = list[1];
    if (current_character.lvl < item.c_lvl) {
        return;// 等级不够
    }
    let check_equipment = create_equipment_by_model(item);
    if (!check_can_equip(current_character, check_equipment)) {
        return;// 装备类型与职业不符
    }
    if (check_equipment.bind === 1 && !confirm("该装备将于装备之后绑定")) {
        return;// 装备后绑定
    }
    if (check_equipment.pos === 15 && is_in_array(check_equipment.type, [21, 22, 23, 24, 25, 31, 32, 33])
        && get_equipment_count_by_pos(15) + get_equipment_count_by_pos(16) >= 2
        && get_item_empty_count() === 0) {
        return;// 双手武器替换主副手，背包无空格
    }
    hide_info();

    let equipments = current_character.equipments;
    let equipment_exchange_1 = null;// 将被替换的装备1
    let equipment_exchange_2 = null;// 将被替换的装备2（换上双手武器时）

    if (check_equipment.pos === 13 || check_equipment.pos === 14) {
        // 戒指，饰品
        let count = get_equipment_count_by_pos(check_equipment.pos);
        if (count === 2) {
            for (let j = 0; j < equipments.length; j++) {
                let equipment = equipments[j];
                let list = get_equipment_by_model(equipment);
                let equipment_name = list[0];
                equipment = list[1];
                if (create_equipment_by_model(equipment).pos === check_equipment.pos) {
                    equipment_exchange_1 = equipment_name != null ? equipment_name : equipment;
                    equipments[j] = item;
                    break;
                }
            }
        } else {
            equipments.push(item_name != null ? item_name : item);
        }
    } else if (check_equipment.pos === 15 && !has_equip_two_hand_weapon() && is_in_array(check_equipment.type, [11, 12, 13, 14, 15]) && can_equip_two_weapons() && get_equipment_count_by_pos(15) === 1 && get_equipment_count_by_pos(16) === 0) {
        // 双持职业副手为空时装备单手武器
        equipments.push(item_name != null ? item_name : item);
    } else if (check_equipment.pos === 16 && get_equipment_count_by_pos(15) === 2) {
        // 双持时装备副手
        for (let j = equipments.length - 1; j >= 0; j--) {
            let equipment = equipments[j];
            let list = get_equipment_by_model(equipment);
            let equipment_name = list[0];
            equipment = list[1];
            if (create_equipment_by_model(equipment).pos === 15) {
                equipment_exchange_1 = equipment_name != null ? equipment_name : equipment;
                equipments.splice(j, 1);
                break;
            }
        }
        equipments.push(item_name != null ? item_name : item);
    } else if (check_equipment.pos === 15 && is_in_array(check_equipment.type, [21, 22, 23, 24, 25, 31, 32, 33])) {
        // 装备双手武器
        for (let j = 0; j < equipments.length; j++) {
            let equipment = equipments[j];
            let list = get_equipment_by_model(equipment);
            let equipment_name = list[0];
            equipment = list[1];
            if (create_equipment_by_model(equipment).pos === 15 || create_equipment_by_model(equipment).pos === 16) {
                if (equipment_exchange_1 == null) {
                    equipment_exchange_1 = equipment_name != null ? equipment_name : equipment;
                } else {
                    equipment_exchange_2 = equipment_name != null ? equipment_name : equipment;
                }
                equipments.splice(j, 1);
                j--;
            }
        }
        equipments.push(item_name != null ? item_name : item);
    } else if (check_equipment.pos === 16 && get_equipment_count_by_pos(15) === 1 && has_equip_two_hand_weapon()) {
        // 装备双手武器时装备副手
        for (let j = 0; j < equipments.length; j++) {
            let equipment = equipments[j];
            let list = get_equipment_by_model(equipment);
            let equipment_name = list[0];
            equipment = list[1];
            if (create_equipment_by_model(equipment).pos === 15) {
                equipment_exchange_1 = equipment_name != null ? equipment_name : equipment;
                equipments.splice(j, 1);
                break;
            }
        }
        equipments.push(item_name != null ? item_name : item);
    } else {
        for (let j = 0; j < equipments.length; j++) {
            let equipment = equipments[j];
            let list = get_equipment_by_model(equipment);
            let equipment_name = list[0];
            equipment = list[1];
            if (create_equipment_by_model(equipment).pos === check_equipment.pos) {
                equipment_exchange_1 = equipment_name != null ? equipment_name : equipment;
                equipments.splice(j, 1);
                break;
            }
        }
        equipments.push(item_name != null ? item_name : item);
    }

    items[index] = null;
    for (let k = 0; k < MAX_ITEMS; k++) {
        if (items[k] == null && equipment_exchange_1 != null) {
            items[k] = equipment_exchange_1;
            equipment_exchange_1 = null;
        } else if (items[k] == null && equipment_exchange_2 != null) {
            items[k] = equipment_exchange_2;
            equipment_exchange_2 = null;
        }
    }
    calculate_role_1(current_character);
    refresh_current_status();
    refresh_battle_status(true);
    save_data();
}

/**
 * 尝试卸下指定装备
 * @param equipment 尝试卸下的装备
 */
function take_off_equipment(equipment) {
    if (is_in_battle()) {
        return;// 战斗中
    }
    if (get_item_empty_count() === 0) {
        return;// 背包已满
    }
    hide_info();
    let list = get_equipment_by_model(equipment);
    let equipment_name = list[0];
    equipment = list[1];
    let equipments = current_character.equipments;
    for (let j = 0; j < equipments.length; j++) {
        if (equipments[j] === (equipment_name != null ? equipment_name : equipment)) {
            equipments.splice(j, 1);
            break;
        }
    }
    let items = current_character.items;
    for (let k = 0; k < MAX_ITEMS; k++) {
        if (items[k] == null) {
            items[k] = equipment_name != null ? equipment_name : equipment;
            break;
        }
    }
    calculate_role_1(current_character);
    refresh_current_status();
    refresh_battle_status(true);
    save_data();
}

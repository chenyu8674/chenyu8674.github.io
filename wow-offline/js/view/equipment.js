let view_equipment;

$(document).ready(function () {
    view_equipment = $("#view_equipment");
    hide_view_bar();
});

function show_view_equipment() {
    view_equipment.show();
}

function hide_view_equipment() {
    view_equipment.hide();
}

function refresh_current_status(role) {
    let role_whole;
    if (role == null) {
        role_whole = role_battle_1;
    }
    let role_html = "";
    role_html += role_whole.name + "<br/>";
    role_html += "等级 " + role_whole.lvl + " " + dictionary_job.job_name[role_whole.job] + "<br/>";
    role_html += "生命值：" + role_whole.current_health_value + "/" + role_whole.max_health_value + "<br/>";
    role_html += "护盾值：" + role_whole.current_shield_value + "<br/>";
    role_html += "<br/>";
    role_html += "力量：" + role_whole.str + "<br/>";
    role_html += "敏捷：" + role_whole.agi + "<br/>";
    role_html += "耐力：" + role_whole.sta + "<br/>";
    role_html += "智力：" + role_whole.int + "<br/>";
    role_html += "精神：" + role_whole.spr + "<br/>";
    role_html += "<br/>";
    role_html += "攻击强度：" + role_whole.attack_power + "<br/>";
    role_html += "法术强度：" + role_whole.magic_power + "<br/>";
    role_html += "治疗强度：" + role_whole.heal_power + "<br/>";
    role_html += "<br/>";
    role_html += "命中率：" + calculate_original_hit(role_whole).toFixed(2) + "%<br/>";
    role_html += "暴击率：" + calculate_original_critical(role_whole).toFixed(2) + "%<br/>";
    role_html += "躲闪率：" + calculate_original_dodge(role_whole).toFixed(2) + "%<br/>";
    role_html += "格挡率：" + calculate_original_block(role_whole).toFixed(2) + "%<br/>";
    role_html += "格挡值：" + role_whole.block_value + "<br/>";
    role_html += "<br/>";
    role_html += "攻击护甲：" + role_whole.armor_attack + "<br/>";
    role_html += "攻击减伤：" + (calculate_armor_attack(role_whole) * 100).toFixed(2) + "<br/>";
    role_html += "法术护甲：" + role_whole.armor_magic + "<br/>";
    role_html += "法术减伤：" + (calculate_armor_magic(role_whole) * 100).toFixed(2) + "<br/>";
    role_html += "<br/>";
    role_html += "伤害比例：" + role_whole.taken_damage_percent + "%<br/>";
    role_html += "治疗比例：" + role_whole.taken_heal_percent + "%<br/>";
    role_html += "<br/>";
    role_html += "物理伤害：" + role_whole.damage_physical + "%<br/>";
    role_html += "火焰伤害：" + role_whole.damage_fire + "%<br/>";
    role_html += "冰霜伤害：" + role_whole.damage_frost + "%<br/>";
    role_html += "自然伤害：" + role_whole.damage_natural + "%<br/>";
    role_html += "奥术伤害：" + role_whole.damage_arcane + "%<br/>";
    role_html += "神圣伤害：" + role_whole.damage_holy + "%<br/>";
    role_html += "暗影伤害：" + role_whole.damage_dark + "%<br/>";
    role_html += "<br/>";
    role_html += "物理抗性：" + role_whole.res_physical + "%<br/>";
    role_html += "火焰抗性：" + role_whole.res_fire + "%<br/>";
    role_html += "冰霜抗性：" + role_whole.res_frost + "%<br/>";
    role_html += "自然抗性：" + role_whole.res_natural + "%<br/>";
    role_html += "奥术抗性：" + role_whole.res_arcane + "%<br/>";
    role_html += "神圣抗性：" + role_whole.res_holy + "%<br/>";
    role_html += "暗影抗性：" + role_whole.res_dark + "%<br/>";
    role_html += "<br/>";
    role_html += "物理穿透：" + role_whole.pierce_physical + "%<br/>";
    role_html += "火焰穿透：" + role_whole.pierce_fire + "%<br/>";
    role_html += "冰霜穿透：" + role_whole.pierce_frost + "%<br/>";
    role_html += "自然穿透：" + role_whole.pierce_natural + "%<br/>";
    role_html += "奥术穿透：" + role_whole.pierce_arcane + "%<br/>";
    role_html += "神圣穿透：" + role_whole.pierce_holy + "%<br/>";
    role_html += "暗影穿透：" + role_whole.pierce_dark + "%<br/>";
    role_html += "<br/>";
    $("#current_status").html(role_html);
    return role_html;
}

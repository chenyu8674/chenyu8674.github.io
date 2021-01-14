/** 属性名称一览 **/
let dictionary_attribute_name;
$(document).ready(function () {
    dictionary_attribute_name = new_attribute_name();
});

function new_attribute_name() {
    let name = {};

    name.max_health_value = "最大生命值";
    name.health_percent = "%最大生命值";
    name.str = "力量";
    name.str_percent = "%力量";
    name.agi = "敏捷";
    name.agi_percent = "%敏捷";
    name.sta = "耐力";
    name.sta_percent = "%耐力";
    name.int = "智力";
    name.int_percent = "%智力";
    name.spr = "精神";
    name.spr_percent = "%精神";
    name.attack_power = "攻击强度";
    name.attack_power_percent = "%攻击强度";
    name.magic_power = "法术强度";
    name.magic_power_percent = "%法术强度";
    name.heal_power = "治疗强度";
    name.heal_power_percent = "%治疗强度";
    name.critical_rate = "暴击等级";
    name.critical_rate_percent = "%暴击等级";
    name.critical_chance_final = "%暴击率";
    name.critical_damage = "%暴击伤害";
    name.hit_rate = "命中等级";
    name.hit_rate_percent = "%命中等级";
    name.hit_chance_final = "%命中率";
    name.dodge_rate = "闪避等级";
    name.dodge_rate_percent = "%闪避等级";
    name.dodge_chance_final = "%闪避率";
    name.block_rate = "格挡等级";
    name.block_rate_percent = "%格挡等级";
    name.block_chance_final = "%格挡率";
    name.block_value = "格挡值";
    name.block_value_percent = "%格挡值";
    name.mastery_rate = "精通等级";
    name.mastery_rate_percent = "%精通等级";
    name.resilient_rate = "韧性等级";
    name.resilient_rate_percent = "%韧性等级";
    name.armor_attack = "攻击护甲";
    name.armor_attack_percent = "%攻击护甲";
    name.armor_magic = "法术护甲";
    name.armor_magic_percent = "%法术护甲";
    name.damage_physical = "%物理伤害";
    name.damage_fire = "%火焰伤害";
    name.damage_frost = "%冰霜伤害";
    name.damage_natural = "%自然伤害";
    name.damage_arcane = "%奥术伤害";
    name.damage_holy = "%神圣伤害";
    name.damage_shadow = "%暗影伤害";
    name.res_physical = "物理抗性";
    name.res_fire = "火焰抗性";
    name.res_frost = "冰霜抗性";
    name.res_natural = "自然抗性";
    name.res_arcane = "奥术抗性";
    name.res_holy = "神圣抗性";
    name.res_shadow = "暗影抗性";
    name.pierce_physical = "物理穿透";
    name.pierce_fire = "火焰穿透";
    name.pierce_frost = "冰霜穿透";
    name.pierce_natural = "自然穿透";
    name.pierce_arcane = "奥术穿透";
    name.pierce_holy = "神圣穿透";
    name.pierce_shadow = "暗影穿透";
    name.taken_damage_percent = "%受到伤害";
    name.taken_heal_percent = "%受到治疗";

    return name;
}
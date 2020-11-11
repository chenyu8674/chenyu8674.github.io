// 最终战斗属性
function get_battle_attribute(attribute) {
    let battle_attribute = {};

    battle_attribute.name = attribute.name;
    battle_attribute.lvl = attribute.lvl;
    battle_attribute.job = attribute.job;

    battle_attribute.equipments = attribute.equipments;
    battle_attribute.skills = attribute.skills;
    battle_attribute.buffs = attribute.buffs;
    battle_attribute.debuffs = attribute.debuffs;

    // 攻击强度、格挡值
    battle_attribute.str = Math.round(attribute.str * attribute.str_percent / 100);// 力量

    // 出手顺序，命中等级、暴击等级、闪避等级
    battle_attribute.agi = Math.round(attribute.agi * attribute.agi_percent / 100);// 敏捷

    // 最大生命值、物理护甲
    battle_attribute.sta = Math.round(attribute.sta * attribute.sta_percent / 100);// 耐力

    // 法术强度、暴击伤害
    battle_attribute.int = Math.round(attribute.int * attribute.int_percent / 100);// 智力

    // 治疗强度、元素护甲
    battle_attribute.spr = Math.round(attribute.spr * attribute.spr_percent / 100);// 精神

    battle_attribute.current_shield_point = attribute.current_shield_point;
    battle_attribute.current_health_point = attribute.current_health_point;
    battle_attribute.health_point = Math.round((attribute.health_point + battle_attribute.sta * sta_to_health_max) * attribute.health_percent / 100);// 最大生命值

    battle_attribute.attack_power = Math.round((attribute.attack_power + battle_attribute.str * str_to_attack_power) * attribute.attack_power_percent / 100);// 攻击强度

    battle_attribute.magic_power = Math.round((attribute.magic_power+battle_attribute.int * int_to_magic_power) * attribute.magic_power_percent / 100);// 法术强度

    battle_attribute.heal_power = Math.round((attribute.heal_power + battle_attribute.spr * spr_to_heal_power) * attribute.heal_power_percent / 100);// 治疗强度

    battle_attribute.critical_rate = Math.round((attribute.critical_rate + battle_attribute.agi * agi_to_critical_rate) * attribute.critical_rate_percent / 100);// 暴击等级
    battle_attribute.critical_chance_final = Math.round(attribute.critical_chance_final);// 最终暴击率百分比

    battle_attribute.critical_damage = Math.round(attribute.critical_damage + battle_attribute.int * int_to_critical_damage);// 暴击伤害系数

    battle_attribute.hit_rate = Math.round((attribute.hit_rate + battle_attribute.agi * agi_to_hit_rate) * attribute.hit_rate_percent / 100);// 命中等级
    battle_attribute.hit_chance_final = Math.round(attribute.hit_chance_final);// 最终命中率百分比

    battle_attribute.dodge_rate = Math.round((attribute.dodge_rate + battle_attribute.agi * agi_to_dodge_rate) * attribute.dodge_rate_percent / 100);// 闪避等级
    battle_attribute.dodge_chance_final = Math.round(attribute.dodge_chance_final);// 最终闪避率百分比

    battle_attribute.block_rate = Math.round(attribute.block_rate * attribute.block_rate_percent / 100);// 格挡等级
    battle_attribute.block_chance_final = Math.round(attribute.block_chance_final);// 最终格挡率百分比

    battle_attribute.block_value = Math.round((attribute.block_value + battle_attribute.str * str_to_block_value) * attribute.block_value_percent / 100);// 格挡值

    battle_attribute.armor_attack = Math.round((attribute.armor_attack + battle_attribute.sta * sta_to_armor_attack) * attribute.armor_attack_percent / 100);// 攻击护甲
    battle_attribute.armor_magic = Math.round((attribute.armor_magic+ battle_attribute.spr * spr_to_armor_magic) * attribute.armor_magic_percent / 100);// 法术护甲

    battle_attribute.damage_physical = Math.round(attribute.damage_physical);// 物理伤害百分比
    battle_attribute.damage_fire = Math.round(attribute.damage_fire);// 火焰伤害百分比
    battle_attribute.damage_frost = Math.round(attribute.damage_frost);// 冰霜伤害百分比
    battle_attribute.damage_natural = Math.round(attribute.damage_natural);// 自然伤害百分比
    battle_attribute.damage_arcane = Math.round(attribute.damage_arcane);// 奥术伤害百分比
    battle_attribute.damage_holy = Math.round(attribute.damage_holy);// 神圣伤害百分比
    battle_attribute.damage_dark = Math.round(attribute.damage_dark);// 暗影伤害百分比

    battle_attribute.res_physical = Math.round(attribute.res_physical);// 物理减伤百分比
    battle_attribute.res_fire = Math.round(attribute.res_fire);// 火焰减伤百分比
    battle_attribute.res_frost = Math.round(attribute.res_frost);// 冰霜减伤百分比
    battle_attribute.res_natural = Math.round(attribute.res_natural);// 自然减伤百分比
    battle_attribute.res_arcane = Math.round(attribute.res_arcane);// 奥术减伤百分比
    battle_attribute.res_holy = Math.round(attribute.res_holy);// 神圣减伤百分比
    battle_attribute.res_dark = Math.round(attribute.res_dark);// 暗影减伤百分比

    battle_attribute.pierce_physical = Math.round(attribute.pierce_physical);// 物理穿透百分比
    battle_attribute.pierce_fire = Math.round(attribute.pierce_fire);// 火焰穿透百分比
    battle_attribute.pierce_frost = Math.round(attribute.pierce_frost);// 冰霜穿透百分比
    battle_attribute.pierce_natural = Math.round(attribute.pierce_natural);// 自然穿透百分比
    battle_attribute.pierce_arcane = Math.round(attribute.pierce_arcane);// 奥术穿透百分比
    battle_attribute.pierce_holy = Math.round(attribute.pierce_holy);// 神圣穿透百分比
    battle_attribute.pierce_dark = Math.round(attribute.pierce_dark);// 暗影穿透百分比

    battle_attribute.taken_damage_percent = Math.round(attribute.taken_damage_percent);// 全局受伤百分比
    battle_attribute.taken_heal_percent = Math.round(attribute.taken_heal_percent);// 全局受治疗百分比

    return battle_attribute;
}

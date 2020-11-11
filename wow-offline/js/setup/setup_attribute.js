// 战斗属性
function setup_attribute() {
    let attribute = {};

    attribute.name = "";
    attribute.lvl = 0;
    attribute.job = 0;

    attribute.current_shield_point = 0;// 伤害护盾
    attribute.current_health_point = 0;// 当前生命值
    attribute.health_point = 100;// 最大生命值
    attribute.health_percent = 100;// 生命值百分比

    // 攻击强度、格挡值
    attribute.str = 0;// 力量
    attribute.str_percent = 100;// 力量百分比

    // 出手顺序，命中等级、暴击等级、闪避等级
    attribute.agi = 0;// 敏捷
    attribute.agi_percent = 100;// 敏捷百分比

    // 最大生命值、物理护甲
    attribute.sta = 0;// 耐力
    attribute.sta_percent = 100;// 耐力百分比

    // 法术强度、暴击伤害
    attribute.int = 0;// 智力
    attribute.int_percent = 100;// 智力百分比

    // 治疗强度、元素护甲
    attribute.spr = 0;// 精神
    attribute.spr_percent = 100;// 精神百分比

    attribute.attack_power = 0;// 攻击强度
    attribute.attack_power_percent = 100;// 攻击强度百分比

    attribute.magic_power = 0;// 法术强度
    attribute.magic_power_percent = 100;// 法术强度百分比

    attribute.heal_power = 0;// 治疗强度
    attribute.heal_power_percent = 100;// 法术强度百分比

    attribute.critical_rate = 0;// 暴击等级
    attribute.critical_rate_percent = 100;// 暴击等级百分比
    attribute.critical_chance_final = 5;// 最终暴击率百分比

    attribute.critical_damage = 150;// 暴击伤害系数

    attribute.hit_rate = 0;// 命中等级
    attribute.hit_rate_percent = 100;// 命中等级百分比
    attribute.hit_chance_final = 5;// 最终命中率百分比

    attribute.dodge_rate = 0;// 闪避等级
    attribute.dodge_rate_percent = 100;// 闪避等级百分比
    attribute.dodge_chance_final = 5;// 最终闪避率百分比

    attribute.block_rate = 0;// 格挡等级
    attribute.block_rate_percent = 100;// 格挡等级百分比
    attribute.block_chance_final = 0;// 最终格挡率百分比

    attribute.block_value = 0;// 格挡值
    attribute.block_value_percent = 100;// 格挡值百分比

    attribute.armor_attack = 0;// 攻击护甲
    attribute.armor_attack_percent = 100;// 攻击护甲百分比
    attribute.armor_magic = 0;// 法术护甲
    attribute.armor_magic_percent = 100;// 法术护甲百分比

    attribute.damage_physical = 100;// 物理伤害百分比
    attribute.damage_fire = 100;// 火焰伤害百分比
    attribute.damage_frost = 100;// 冰霜伤害百分比
    attribute.damage_natural = 100;// 自然伤害百分比
    attribute.damage_arcane = 100;// 奥术伤害百分比
    attribute.damage_holy = 100;// 神圣伤害百分比
    attribute.damage_dark = 100;// 暗影伤害百分比

    attribute.res_physical = 0;// 物理减伤百分比
    attribute.res_fire = 0;// 火焰减伤百分比
    attribute.res_frost = 0;// 冰霜减伤百分比
    attribute.res_natural = 0;// 自然减伤百分比
    attribute.res_arcane = 0;// 奥术减伤百分比
    attribute.res_holy = 0;// 神圣减伤百分比
    attribute.res_dark = 0;// 暗影减伤百分比

    attribute.pierce_physical = 0;// 物理穿透百分比
    attribute.pierce_fire = 0;// 火焰穿透百分比
    attribute.pierce_frost = 0;// 冰霜穿透百分比
    attribute.pierce_natural = 0;// 自然穿透百分比
    attribute.pierce_arcane = 0;// 奥术穿透百分比
    attribute.pierce_holy = 0;// 神圣穿透百分比
    attribute.pierce_dark = 0;// 暗影穿透百分比

    attribute.taken_damage_percent = 100;// 全局受伤百分比
    attribute.taken_heal_percent = 100;// 全局受治疗百分比

    return attribute;
}

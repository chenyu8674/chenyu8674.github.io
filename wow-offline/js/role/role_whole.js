/** 基础战斗属性 **/
function new_role_whole() {
    let role_whole = {};
    role_whole.name = "";
    role_whole.lvl = 0;
    role_whole.job = 0;

    role_whole.move_speed = 100;// 移动速度

    role_whole.current_health_value = 0;// 当前生命值
    role_whole.current_shield_value = 0;// 伤害护盾

    role_whole.max_health_value = 200;// 最大生命值
    role_whole.health_percent = 100;// 最大生命值百分比

    // 攻击强度、格挡值
    role_whole.str = 0;// 力量
    role_whole.str_percent = 100;// 力量百分比

    // 出手顺序，命中等级、暴击等级、闪避等级
    role_whole.agi = 0;// 敏捷
    role_whole.agi_percent = 100;// 敏捷百分比

    // 最大生命值、物理护甲
    role_whole.sta = 0;// 耐力
    role_whole.sta_percent = 100;// 耐力百分比

    // 法术强度、暴击伤害
    role_whole.int = 0;// 智力
    role_whole.int_percent = 100;// 智力百分比

    // 治疗强度、元素护甲
    role_whole.spr = 0;// 精神
    role_whole.spr_percent = 100;// 精神百分比

    role_whole.attack_power = 0;// 攻击强度
    role_whole.attack_power_percent = 100;// 攻击强度百分比

    role_whole.magic_power = 0;// 法术强度
    role_whole.magic_power_percent = 100;// 法术强度百分比

    role_whole.heal_power = 0;// 治疗强度
    role_whole.heal_power_percent = 100;// 法术强度百分比

    role_whole.armor_attack = 0;// 攻击护甲
    role_whole.armor_attack_percent = 100;// 攻击护甲百分比
    role_whole.armor_magic = 0;// 法术护甲
    role_whole.armor_magic_percent = 100;// 法术护甲百分比
    role_whole.armor_all = 0;// 所有护甲
    role_whole.armor_all_percent = 0;// 所有护甲百分比

    role_whole.hit_rate = 0;// 命中等级
    role_whole.hit_rate_percent = 100;// 命中等级百分比
    role_whole.hit_chance_final = 95;// 最终命中率百分比

    role_whole.dodge_rate = 0;// 闪避等级
    role_whole.dodge_rate_percent = 100;// 闪避等级百分比
    role_whole.dodge_chance_final = 5;// 最终闪避率百分比

    role_whole.critical_rate = 0;// 暴击等级
    role_whole.critical_rate_percent = 100;// 暴击等级百分比
    role_whole.critical_chance_final = 5;// 最终暴击率百分比
    role_whole.critical_damage = 150;// 暴击伤害系数

    role_whole.mastery_rate = 0;// 精通等级
    role_whole.mastery_rate_percent = 100;// 精通等级百分比

    role_whole.resilient_rate = 0;// 韧性等级
    role_whole.resilient_rate_percent = 100;// 韧性等级百分比

    role_whole.block_rate = 0;// 格挡等级
    role_whole.block_rate_percent = 100;// 格挡等级百分比
    role_whole.block_chance_final = 0;// 最终格挡率百分比

    role_whole.block_value = 0;// 格挡值
    role_whole.block_value_percent = 100;// 格挡值百分比

    role_whole.damage_all = 0;// 全部伤害百分比
    role_whole.damage_physical = 100;// 物理伤害百分比
    role_whole.damage_fire = 100;// 火焰伤害百分比
    role_whole.damage_frost = 100;// 冰霜伤害百分比
    role_whole.damage_natural = 100;// 自然伤害百分比
    role_whole.damage_arcane = 100;// 奥术伤害百分比
    role_whole.damage_holy = 100;// 神圣伤害百分比
    role_whole.damage_shadow = 100;// 暗影伤害百分比

    role_whole.res_all = 0;// 全部减伤百分比
    role_whole.res_physical = 0;// 物理减伤百分比
    role_whole.res_fire = 0;// 火焰减伤百分比
    role_whole.res_frost = 0;// 冰霜减伤百分比
    role_whole.res_natural = 0;// 自然减伤百分比
    role_whole.res_arcane = 0;// 奥术减伤百分比
    role_whole.res_holy = 0;// 神圣减伤百分比
    role_whole.res_shadow = 0;// 暗影减伤百分比

    role_whole.pierce_all = 0;// 全部穿透百分比
    role_whole.pierce_physical = 0;// 物理穿透百分比
    role_whole.pierce_fire = 0;// 火焰穿透百分比
    role_whole.pierce_frost = 0;// 冰霜穿透百分比
    role_whole.pierce_natural = 0;// 自然穿透百分比
    role_whole.pierce_arcane = 0;// 奥术穿透百分比
    role_whole.pierce_holy = 0;// 神圣穿透百分比
    role_whole.pierce_shadow = 0;// 暗影穿透百分比

    role_whole.taken_damage_percent = 100;// 全局受伤百分比
    role_whole.taken_heal_percent = 100;// 全局受治疗百分比

    return role_whole;
}
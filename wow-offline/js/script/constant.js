/** 常量定义 **/

// 等级上限
let MAX_LVL = 60;
// 经验上限
let MAX_EXP = 0;
// 最大抗性
let MAX_RES = 75;
// 最大包裹数量
let MAX_ITEMS = 100;
// 稀有怪刷新率
let RARE_PERCENT = 5;
// 战斗记录行数上限
let MAX_LOG = 200;

/** 装备参数 **/

let ARMOR_ATTACK_1 = 2;
let ARMOR_ATTACK_2 = 4;
let ARMOR_ATTACK_3 = 6;
let ARMOR_ATTACK_4 = 8;
let ARMOR_MAGIC_1 = 8;
let ARMOR_MAGIC_2 = 6;
let ARMOR_MAGIC_3 = 4;
let ARMOR_MAGIC_4 = 2;

/** 系统设置 **/

let show_hit_percent_in_log = false;// 输出命中几率
let show_critical_percent_in_log = false;// 输出暴击几率
let show_block_percent_in_log = false;// 输出格挡几率
let in_test_mode = false;// 测试模式

/** 攻击类型 **/

let type_attack = 1;// 攻击
let type_cast = 2;// 施法

/** 伤害属性类型 **/

element_none = 0;// 无属性
element_physical = 10;// 物理
element_fire = 20;// 火焰
element_frost = 30;// 冰霜
element_natural = 40;// 自然
element_arcane = 50;// 奥术
element_holy = 60;// 神圣
element_shadow = 70;// 暗影
element_chaos = 99;// 混乱

/** 阶级对应颜色 **/
color_rare_6 = "darkorange";
color_rare_5 = "rebeccapurple";
color_rare_4 = "dodgerblue";
color_rare_3 = "forestgreen";
color_rare_2 = "whitesmoke";
color_rare_1 = "darkgray";

/** 主属性对其他属性的转化值 **/

let str_to_attack_power = 2;
let str_to_block_value = 0.5;

let agi_to_attack_power = 1;
let agi_to_hit_rate = 2;
let agi_to_critical_rate = 1;
let agi_to_dodge_rate = 2;

let sta_to_health_max = 10;
let sta_to_armor_attack = 2;

let int_to_magic_power = 2;
let int_to_critical_damage = 0.3;

let spr_to_heal_power = 2;
let spr_to_magic_power = 1;
let spr_to_armor_magic = 2;

/** 副属性转化系数 **/

let hit_coefficient = 1.5;// 命中等级转化系数
let dodge_coefficient = 1.5;// 躲闪等级转化系数
let base_hit_chance = 90;// 基础命中率

let critical_coefficient = 1;// 暴击等级转化系数

let block_coefficient = 1;// 格挡等级转化系数

/**
 * 阶级系数
 * @param rare
 */
function get_multiple_by_rare(rare) {
    switch (rare) {
        case 1:
            return 0.5;
        case 2:
            return 0.8;
        case 3:
            return 1;
        case 4:
            return 1.2;
        case 5:
            return 1.4;
        case 6:
            return 2;
    }
}

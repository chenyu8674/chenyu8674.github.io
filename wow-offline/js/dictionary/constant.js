/** 常量定义 **/

let max_res = 75;// 最大抗性(无加成)
let max_res_over = 90;// 最大抗性(有加成)

/** 系统设置 **/

let show_detail_log = true;// 显示详细战斗过程
let in_test_mode = true;// 测试模式

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
element_dark = 70;// 暗影
element_chaos = 99;// 混乱

/** 主属性对其他属性的转化值 **/

let str_to_attack_power = 2;
let str_to_block_value = 0.5;

let agi_to_hit_rate = 2;
let agi_to_critical_rate = 2;
let agi_to_dodge_rate = 2;

let sta_to_health_max = 15;
let sta_to_armor_attack = 2;

let int_to_magic_power = 2;
let int_to_critical_damage = 0.3;

let spr_to_heal_power = 2;
let spr_to_armor_magic = 2;

/** 副属性转化系数 **/

let hit_coefficient = 2;// 命中等级转化系数
let dodge_coefficient = 2;// 躲闪等级转化系数
let base_hit_chance = 85;// 基础命中率

let critical_coefficient = 2;// 暴击等级转化系数

let block_coefficient = 2;// 格挡等级转化系数
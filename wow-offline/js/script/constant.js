/** 常量定义 **/

// 等级上限
let MAX_LVL = 20;
// 最大抗性
let MAX_RES = 75;
// 最大包裹数量
let MAX_ITEMS = 100;
// 最大银行空格数量
let MAX_BANKS = 100;
// 战斗记录行数上限
let MAX_LOG = 200;
// 稀有怪刷新率
let RARE_PERCENT = 5;
// 怪物专属装备掉率
let DROP_MONSTER = 5;
// 地图专属装备掉率
let DROP_MAP = 5;
// 普通怪物掉率
let DROP_1 = 5;
let DROP_2 = 10;
let DROP_3 = 100;
let DROP_4 = 50;
let DROP_5 = 100;
let DROP_6 = 100;


/** 装备参数 **/

let ARMOR_ATTACK_1 = 1.5;// 布甲攻击护甲系数
let ARMOR_ATTACK_2 = 3;// 皮甲攻击护甲系数
let ARMOR_ATTACK_3 = 4.5;// 锁甲攻击护甲系数
let ARMOR_ATTACK_4 = 6;// 板甲攻击护甲系数
let ARMOR_ATTACK_5 = 6;// 盾牌攻击护甲系数
let ARMOR_MAGIC_1 = 3;// 布甲法术护甲系数
let ARMOR_MAGIC_2 = 2.25;// 皮甲法术护甲系数
let ARMOR_MAGIC_3 = 1.5;// 锁甲法术护甲系数
let ARMOR_MAGIC_4 = 0.75;// 板甲法术护甲系数
let ARMOR_MAGIC_5 = 0.75;// 盾牌法术护甲系数

let MULTIPLE_1 = 1;// 头盔属性系数
let MULTIPLE_2 = 0.6;// 项链属性系数
let MULTIPLE_3 = 0.75;// 护肩属性系数
let MULTIPLE_4 = 1;// 胸甲属性系数
let MULTIPLE_5 = 0.6;// 披风属性系数
let MULTIPLE_8 = 0.6;// 护腕属性系数
let MULTIPLE_9 = 0.75;// 手套属性系数
let MULTIPLE_10 = 0.75;// 腰带属性系数
let MULTIPLE_11 = 1;// 腿甲属性系数
let MULTIPLE_12 = 0.75;// 靴子属性系数
let MULTIPLE_13 = 0.6;// 戒指属性系数
let MULTIPLE_14 = 1;// 饰物属性系数
let MULTIPLE_15_1 = 0.45;// 单手属性系数
let MULTIPLE_15_2 = 1;// 双手属性系数
let MULTIPLE_16 = 0.6;// 副手属性系数

let WEAPON_ATTACK_1 = 4;// 单手强度系数
let WEAPON_ATTACK_2 = 7;// 双手强度系数
let WEAPON_ATTACK_3 = 2;// 副手手强度系数

/** 系统设置 **/

let show_hit_percent_in_log = false;// 输出命中几率
let show_critical_percent_in_log = false;// 输出暴击几率
let show_block_percent_in_log = false;// 输出格挡几率
let in_test_mode = false;// 测试模式

/** 攻击类型 **/

let type_attack = 1;// 攻击
let type_magic = 2;// 法术
let type_heal = 3;// 治疗
let type_other = 4;// 其他

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
color_rare_7 = "#e5cc80";
color_rare_6 = "#ff8000";
color_rare_5 = "#9345ff";
color_rare_4 = "#0070dd";
color_rare_3 = "#1eff00";
color_rare_2 = "#ffffff";
color_rare_1 = "#9d9d9d";

/** 主属性对其他属性的转化值 **/

let str_to_attack_power = 2;
let str_to_block_value = 0.5;

let agi_to_attack_power = 1;
let agi_to_hit_rate = 1;
let agi_to_critical_rate = 1;
let agi_to_dodge_rate = 1;

let sta_to_health_max = 10;
let sta_to_armor_attack = 2;

let int_to_magic_power = 2;
let int_to_hit_rate = 1;
let int_to_critical_damage = 0.2;

let spr_to_heal_power = 2;
let spr_to_magic_power = 0.5;
let spr_to_armor_magic = 2;

/** 副属性转化系数 **/

let hit_coefficient = 2;// 命中等级转化系数
let dodge_coefficient = 2.2;// 躲闪等级转化系数

let critical_coefficient = 2.5;// 暴击等级转化系数

let block_coefficient = 2.5;// 格挡等级转化系数

let resilient_coefficient = 4;// 韧性等级转化系数（dot）
let resilient_multiple = 2;// 韧性等级转化系数（暴击）

let mastery_per_lvl = 5;// 每级附加精通等级

/* 精通等级转化系数 */

let mastery_coefficient = [];
mastery_coefficient[11] = 2;
mastery_coefficient[12] = 6;
mastery_coefficient[13] = 4;
mastery_coefficient[21] = 2;
mastery_coefficient[22] = 5;
mastery_coefficient[23] = 4;
mastery_coefficient[31] = 6;
mastery_coefficient[32] = 4;
mastery_coefficient[33] = 6;
mastery_coefficient[41] = 5;
mastery_coefficient[42] = 1;
mastery_coefficient[43] = 4;
mastery_coefficient[51] = 4;
mastery_coefficient[52] = 2;
mastery_coefficient[53] = 2;
mastery_coefficient[54] = 2;
mastery_coefficient[61] = 20;
mastery_coefficient[62] = 4;
mastery_coefficient[63] = 4;
mastery_coefficient[91] = 4;
mastery_coefficient[92] = 4;
mastery_coefficient[93] = 1;
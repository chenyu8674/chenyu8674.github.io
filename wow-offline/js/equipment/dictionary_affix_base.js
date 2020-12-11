/** 装备基础属性 **/
let dictionary_affix_base
$(document).ready(function () {
    dictionary_affix_base = new_affix()
})

function new_affix() {
    let affix = {}
    // 位置 * 1000 + 倾向 * 100 + 类型
    // 头盔
    affix[1101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[1201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[1102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[1202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[1103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[1203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[1104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[1204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 项链
    affix[2199] = function (lvl, rare, multiple) {return []}
    affix[2299] = function (lvl, rare, multiple) {return []}
    // 肩膀
    affix[3101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[3201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[3102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[3202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[3103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[3203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[3104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[3204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 胸甲
    affix[4101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[4201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[4102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[4202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[4103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[4203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[4104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[4204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 披风
    affix[5101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix[5201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(1, lvl, rare, multiple)]}
    // 衬衫
    affix[6199] = function (lvl, rare, multiple) {return []}
    affix[6299] = function (lvl, rare, multiple) {return []}
    // 战袍
    affix[7199] = function (lvl, rare, multiple) {return []}
    affix[7299] = function (lvl, rare, multiple) {return []}
    // 手腕
    affix[8101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[8201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[8102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[8202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[8103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[8203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[8104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[8204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 手套
    affix[9101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[9201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[9102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[9202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[9103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[9203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[9104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[9204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 腰带
    affix[10101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[10201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[10102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[10202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[10103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[10203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[10104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[10204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 腿甲
    affix[11101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[11201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[11102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[11202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[11103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[11203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[11104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[11204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 鞋子
    affix[12101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[12201] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)]}
    affix[12102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[12202] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)]}
    affix[12103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[12203] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)]}
    affix[12104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    affix[12204] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple), "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)]}
    // 戒指
    affix[13199] = function (lvl, rare, multiple) {return []}
    affix[13299] = function (lvl, rare, multiple) {return []}
    // 饰品
    affix[14199] = function (lvl, rare, multiple) {return []}
    affix[14299] = function (lvl, rare, multiple) {return []}
    /*
 * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
 * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
 * 31-弓 32-弩 33-枪
 * 41-盾牌 42-副手
     */
    // 匕首
    affix[15111] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15211] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 拳套
    affix[15112] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15212] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 单手斧
    affix[15113] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15213] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 单手锤
    affix[15114] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15214] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 单手剑
    affix[15115] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15215] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 长柄
    affix[15121] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15221] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 法杖
    affix[15122] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15222] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 双手斧
    affix[15123] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15223] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 双手锤
    affix[15124] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15224] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 双手剑
    affix[15125] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15225] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 弓
    affix[15131] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15231] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 弩
    affix[15132] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15232] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 枪
    affix[15133] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix[15233] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    // 盾牌
    affix[16141] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(20, lvl, rare, multiple), "armor_magic+=" + get_effect_value(20, lvl, rare, multiple), "block_chance_final+=" + (19 + get_effect_value(0.3, lvl, rare, multiple)), "block_value+=" + (6 + get_effect_value(4, lvl, rare, multiple))]}
    affix[16241] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(20, lvl, rare, multiple), "armor_magic+=" + get_effect_value(20, lvl, rare, multiple), "block_chance_final+=" + (19 + get_effect_value(0.3, lvl, rare, multiple)), "block_value+=" + (6 + get_effect_value(4, lvl, rare, multiple))]}
    // 副手
    affix[16142] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix[16242] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(1, lvl, rare, multiple)]}
    // 物理板甲（全套）
    affix[104] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(60, lvl, rare, multiple), "armor_magic+=" + get_effect_value(15, lvl, rare, multiple)]}
    // 物理锁甲（全套）
    affix[103] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(45, lvl, rare, multiple), "armor_magic+=" + get_effect_value(30, lvl, rare, multiple)]}
    // 物理皮甲（全套）
    affix[102] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(30, lvl, rare, multiple), "armor_magic+=" + get_effect_value(45, lvl, rare, multiple)]}
    // 法系布甲（全套）
    affix[101] = function (lvl, rare, multiple) {return ["armor_attack+=" + get_effect_value(15, lvl, rare, multiple), "armor_magic+=" + get_effect_value(60, lvl, rare, multiple)]}

    return affix
}
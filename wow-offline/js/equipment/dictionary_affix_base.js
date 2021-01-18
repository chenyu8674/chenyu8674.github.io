/** 装备基础属性 **/
let dictionary_affix_base
$(document).ready(function () {
    dictionary_affix_base = new_affix()
})

function new_affix() {
    // 位置 * 1000 + 倾向 * 100 + 类型
    let affix = {}
    // 布甲
    affix[1101] = affix[1201] = affix[3101] = affix[3201] = affix[4101] = affix[4201] = affix[8101] = affix[8201] =
        affix[9101] = affix[9201] = affix[10101] = affix[10201] = affix[11101] = affix[11201] = affix[12101] = affix[12201] =
            function (lvl, rare, multiple) {
                return [
                    "armor_attack+=" + get_effect_value(ARMOR_ATTACK_1, lvl, rare, multiple),
                    "armor_magic+=" + get_effect_value(ARMOR_MAGIC_1, lvl, rare, multiple)
                ]
            }
    // 皮甲
    affix[1102] = affix[1202] = affix[3102] = affix[3202] = affix[4102] = affix[4202] = affix[8102] = affix[8202] =
        affix[9102] = affix[9202] = affix[10102] = affix[10202] = affix[11102] = affix[11202] = affix[12102] = affix[12202] =
            function (lvl, rare, multiple) {
                return [
                    "armor_attack+=" + get_effect_value(ARMOR_ATTACK_2, lvl, rare, multiple),
                    "armor_magic+=" + get_effect_value(ARMOR_MAGIC_2, lvl, rare, multiple)
                ]
            }
    // 锁甲
    affix[1103] = affix[1203] = affix[3103] = affix[3203] = affix[4103] = affix[4203] = affix[8103] = affix[8203] =
        affix[9103] = affix[9203] = affix[10103] = affix[10203] = affix[11103] = affix[11203] = affix[12103] = affix[12203] =
            function (lvl, rare, multiple) {
                return [
                    "armor_attack+=" + get_effect_value(ARMOR_ATTACK_3, lvl, rare, multiple),
                    "armor_magic+=" + get_effect_value(ARMOR_MAGIC_3, lvl, rare, multiple)
                ]
            }
    // 板甲
    affix[1104] = affix[1204] = affix[3104] = affix[3204] = affix[4104] = affix[4204] = affix[8104] = affix[8204] =
        affix[9104] = affix[9204] = affix[10104] = affix[10204] = affix[11104] = affix[11204] = affix[12104] = affix[12204] =
            function (lvl, rare, multiple) {
                return [
                    "armor_attack+=" + get_effect_value(ARMOR_ATTACK_4, lvl, rare, multiple),
                    "armor_magic+=" + get_effect_value(ARMOR_MAGIC_4, lvl, rare, multiple)
                ]
            }
    // 项链/衬衫/战袍/戒指/饰品
    affix[2199] = affix[2299] = affix[6199] = affix[6299] = affix[7199] = affix[7299] = affix[13199] = affix[13299] = affix[14199] = affix[14299] =
        function (lvl, rare, multiple) {
            return []
        }
    // 披风
    affix[5101] = affix[5201] =
        function (lvl, rare, multiple) {
            return [
                "armor_attack+=" + get_effect_value(1, lvl, rare, multiple),
                "armor_magic+=" + get_effect_value(1, lvl, rare, multiple)
            ]
        }
    // 单手攻击武器
    // 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
    affix[15111] = affix[15112] = affix[15113] = affix[15114] = affix[15115] =
        function (lvl, rare, multiple) {
            return [
                "attack_power+=" + (WEAPON_ATTACK_ + get_effect_value(WEAPON_ATTACK_, lvl, rare, multiple))
            ]
        }
    // 单手法术武器
    // 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
    affix[15211] = affix[15212] = affix[15213] = affix[15214] = affix[15215] =
        function (lvl, rare, multiple) {
            return [
                "magic_power+=" + (WEAPON_ATTACK_ + get_effect_value(WEAPON_ATTACK_, lvl, rare, multiple)),
                "heal_power+=" + (WEAPON_ATTACK_ + get_effect_value(WEAPON_ATTACK_, lvl, rare, multiple))
            ]
        }
    // 双手攻击武器
    // 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
    affix[15121] = affix[15122] = affix[15221] = affix[15123] = affix[15223] = affix[15124] = affix[15224] = affix[15125] = affix[15225] =
        affix[15131] = affix[15231] = affix[15132] = affix[15232] = affix[15133] = affix[15233] =
            function (lvl, rare, multiple) {
                return [
                    "attack_power+=" + (WEAPON_ATTACK_ * 2 + get_effect_value(WEAPON_ATTACK_, lvl, rare, multiple))
                ]
            }
    // 双手法术武器
    // 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
    affix[15222] =
        function (lvl, rare, multiple) {
            return [
                "magic_power+=" + (WEAPON_ATTACK_ * 2 + get_effect_value(WEAPON_ATTACK_, lvl, rare, multiple)),
                "heal_power+=" + (WEAPON_ATTACK_ * 2 + get_effect_value(WEAPON_ATTACK_, lvl, rare, multiple))
            ]
        }
    // 盾牌
    affix[16141] = affix[16241] = function (lvl, rare, multiple) {
        return [
            "armor_attack+=" + get_effect_value(20, lvl, rare, multiple),
            "armor_magic+=" + get_effect_value(5, lvl, rare, multiple),
            "block_chance_final+=" + (19 + get_effect_value(0.2, lvl, rare, multiple)),
            "block_value+=" + (6 + get_effect_value(4, lvl, rare, multiple))
        ]
    }
    // 副手法器
    affix[16142] = affix[16242] = function (lvl, rare, multiple) {
        return [
            "magic_power+=" + get_effect_value(1, lvl, rare, multiple)
        ]
    }

    return affix
}
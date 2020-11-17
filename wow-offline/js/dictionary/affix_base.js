/** 装备基础属性 **/
let dictionary_affix = new_affix();

/**
 * 生成属性词条
 * @param X 基础系数
 * @param lvl 装备等级
 * @param rare 装备稀有度
 * @param multiple 属性倍率
 */
function get_effect_point(X, lvl, rare, multiple) {
    /**
     * 稀有度
     * 1-灰 2-白 3-绿 4-蓝 5-紫 6-橙
     */
    switch (rare) {
        case 1:
            multiple *= 0.5;
            break;
        case 2:
            multiple *= 0.8;
            break;
        case 3:
            multiple *= 1;
            break;
        case 4:
            multiple *= 1.2;
            break;
        case 5:
            multiple *= 1.4;
            break;
        case 6:
            multiple *= 1.8;
            break;
    }
    return Math.ceil(lvl * multiple * X);
}

function new_affix() {
    let affix = {}
    /**
     * 稀有度
     * 1-灰 2-白 3-绿 4-蓝 5-紫 6-橙
     *
     * 装备位置
     * 左：01-头盔 02-项链 03-肩膀 04-胸甲 05-披风 06-衬衫 07-战袍 08-手腕
     * 右：09-手套 10-腰带 11-腿甲 12-鞋子 13-戒指 14-饰品
     * 下：15-主手 16-副手
     *
     * 装备类型（非武器）
     * 00-其他
     * 01-布甲 02-皮甲 03-锁甲 04-板甲
     *
     * 装备类型（武器）
     * 00-其他
     * 11-匕首 12-拳套 13-单手斧 14-单手锤 15-单手剑
     * 21-长柄 22-法杖 23-双手斧 24-双手锤 25-双手剑
     * 31-弓 32-弩 33-枪
     * 41-盾牌 42-副手
     */

    // 衬衫
    affix[6] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "armor_attack+=" + get_effect_point(0.1, lvl, rare, multiple),
            "armor_magic+=" + get_effect_point(0.1, lvl, rare, multiple)
        ];
    };

    // 物理单手剑
    affix[115] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "attack_power+=" + get_effect_point(3, lvl, rare, multiple)
        ];
    };

    // 施法单手剑
    affix[215] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "magic_power+=" + get_effect_point(3, lvl, rare, multiple)
        ];
    };

    // 物理双手剑
    affix[125] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "attack_power+=" + get_effect_point(3, lvl, rare, multiple)
        ];
    };

    // 双手弓
    affix[131] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "attack_power+=" + get_effect_point(3, lvl, rare, multiple)
        ];
    };

    // 物理盾牌
    affix[141] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "armor_attack+=" + get_effect_point(10, lvl, rare, multiple)
        ];
    };

    // 法系盾牌
    affix[241] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "armor_magic+=" + get_effect_point(10, lvl, rare, multiple)
        ];
    };

    // 法系副手
    affix[242] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "magic_power+=" + get_effect_point(1, lvl, rare, multiple)
        ];
    };

    // 物理板甲（全套）
    affix[104] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "armor_attack+=" + get_effect_point(60, lvl, rare, multiple),
            "armor_magic+=" + get_effect_point(15, lvl, rare, multiple)
        ];
    };

    // 物理锁甲（全套）
    affix[103] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "armor_attack+=" + get_effect_point(45, lvl, rare, multiple),
            "armor_magic+=" + get_effect_point(30, lvl, rare, multiple)
        ];
    };

    // 物理皮甲（全套）
    affix[102] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "armor_attack+=" + get_effect_point(30, lvl, rare, multiple),
            "armor_magic+=" + get_effect_point(45, lvl, rare, multiple)
        ];
    };

    // 法系布甲（全套）
    affix[201] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "armor_attack+=" + get_effect_point(15, lvl, rare, multiple),
            "armor_magic+=" + get_effect_point(60, lvl, rare, multiple)
        ];
    };

    return affix;
}
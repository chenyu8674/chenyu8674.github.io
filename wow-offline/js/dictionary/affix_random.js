/** 装备随机词缀 **/
let dictionary_affix_random = new_affix_random();

function new_affix_random() {
    let affix = {}

    affix["雄鹰"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "int+=" + get_effect_point(0.4, lvl, rare, multiple),
            "sta+=" + get_effect_point(0.6, lvl, rare, multiple)
        ];
    };

    affix["灵猴"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "agi+=" + get_effect_point(0.4, lvl, rare, multiple),
            "sta+=" + get_effect_point(0.6, lvl, rare, multiple)
        ];
    };

    affix["野熊"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "str+=" + get_effect_point(0.4, lvl, rare, multiple),
            "sta+=" + get_effect_point(0.6, lvl, rare, multiple)
        ];
    };

    affix["巨猿"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "str+=" + get_effect_point(0.4, lvl, rare, multiple),
            "int+=" + get_effect_point(0.4, lvl, rare, multiple)
        ];
    };

    affix["猎鹰"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "agi+=" + get_effect_point(0.4, lvl, rare, multiple),
            "int+=" + get_effect_point(0.4, lvl, rare, multiple)
        ];
    };

    affix["野猪"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "str+=" + get_effect_point(0.4, lvl, rare, multiple),
            "spr+=" + get_effect_point(0.4, lvl, rare, multiple)
        ];
    };

    affix["夜枭"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "int+=" + get_effect_point(0.4, lvl, rare, multiple),
            "spr+=" + get_effect_point(0.4, lvl, rare, multiple)
        ];
    };

    affix["巨鲸"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "int+=" + get_effect_point(0.4, lvl, rare, multiple),
            "sta+=" + get_effect_point(0.6, lvl, rare, multiple)
        ];
    };

    affix["孤狼"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "agi+=" + get_effect_point(0.4, lvl, rare, multiple),
            "spr+=" + get_effect_point(0.4, lvl, rare, multiple)
        ];
    };

    affix["猛虎"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "str+=" + get_effect_point(0.4, lvl, rare, multiple),
            "agi+=" + get_effect_point(0.4, lvl, rare, multiple)
        ];
    };

    affix["力量"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "str+=" + get_effect_point(1, lvl, rare, multiple)
        ];
    };

    affix["敏捷"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "agi+=" + get_effect_point(1, lvl, rare, multiple)
        ];
    };

    affix["耐力"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "sta+=" + get_effect_point(1, lvl, rare, multiple)
        ];
    };

    affix["智力"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "int+=" + get_effect_point(1, lvl, rare, multiple)
        ];
    };

    affix["精神"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "spr+=" + get_effect_point(1, lvl, rare, multiple)
        ];
    };

    affix["能量"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "attack_power+=" + get_effect_point(3, lvl, rare, multiple)
        ];
    };

    affix["专注"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "magic_power+=" + get_effect_point(2.5, lvl, rare, multiple)
        ];
    };

    affix["治疗"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "heal_power+=" + get_effect_point(2.5, lvl, rare, multiple)
        ];
    };

    affix["火焰惩戒"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "damage_fire+=" + get_effect_point(0.1, lvl, rare, multiple)
        ];
    };

    affix["火焰穿透"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "pierce_fire+=" + get_effect_point(0.1, lvl, rare, multiple)
        ];
    };

    affix["火焰抗性"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "res_fire+=" + get_effect_point(0.1, lvl, rare, multiple)
        ];
    };

    affix["打击"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "str+=" + get_effect_point(0.3, lvl, rare, multiple),
            "agi+=" + get_effect_point(0.3, lvl, rare, multiple),
            "sta+=" + get_effect_point(0.3, lvl, rare, multiple),
            "hit_rate+=" + get_effect_point(0.4, lvl, rare, multiple)
        ];
    };

    affix["巫术"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "int+=" + get_effect_point(0.5, lvl, rare, multiple),
            "sta+=" + get_effect_point(0.3, lvl, rare, multiple),
            "magic_power+=" + get_effect_point(0.4, lvl, rare, multiple),
            "hit_rate+=" + get_effect_point(0.2, lvl, rare, multiple)
        ];
    };

    affix["恢复"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "int+=" + get_effect_point(0.3, lvl, rare, multiple),
            "spr+=" + get_effect_point(0.3, lvl, rare, multiple),
            "sta+=" + get_effect_point(0.3, lvl, rare, multiple),
            "heal_power+=" + get_effect_point(0.4, lvl, rare, multiple),
            "critical_rate+=" + get_effect_point(0.2, lvl, rare, multiple)
        ];
    };

    affix["暴击"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "critical_rate+=" + get_effect_point(1, lvl, rare, multiple),
        ];
    };

    affix["命中"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "hit_rate+=" + get_effect_point(1, lvl, rare, multiple),
        ];
    };

    affix["闪避"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "dodge_rate+=" + get_effect_point(1, lvl, rare, multiple),
        ];
    };

    affix["格挡"] = function (lvl, rare, multiple) {
        multiple = multiple == null ? 1 : multiple;
        return [
            "block_rate+=" + get_effect_point(1, lvl, rare, multiple),
            "block_value+=" + get_effect_point(2, lvl, rare, multiple),
        ];
    };

    return affix;
}
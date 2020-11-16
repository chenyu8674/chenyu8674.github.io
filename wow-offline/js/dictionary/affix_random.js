/** 词缀一览 **/
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
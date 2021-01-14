/** 装备随机词缀 **/
let dictionary_affix_prefix;
let dictionary_affix_prefix_length = 0;
$(document).ready(function () {
    dictionary_affix_prefix = new_affix_prefix();
    dictionary_affix_prefix_length = dictionary_affix_prefix.length;
})

function new_affix_prefix() {
    let affix = [];

    affix[0] = "巨人";
    affix["巨人"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[1] = "猫鼬";
    affix["猫鼬"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[2] = "庞大";
    affix["庞大"] = function (lvl, rare, multiple) {return ["sta+=" + get_effect_value(0.6, lvl, rare, multiple)]}
    // affix[3] = "专注";
    // affix["专注"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    // affix[4] = "启发";
    // affix["启发"] = function (lvl, rare, multiple) {return ["spr+=" + get_effect_value(0.4, lvl, rare, multiple)]}

    affix[5] = "猛虎";
    affix["猛虎"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "agi+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[6] = "野熊";
    affix["野熊"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    // affix[7] = "巨猿";
    // affix["巨猿"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "int+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    // affix[8] = "野猪";
    // affix["野猪"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "spr+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[9] = "灵猴";
    affix["灵猴"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    // affix[10] = "猎鹰";
    // affix["猎鹰"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.2, lvl, rare, multiple), "int+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    // affix[11] = "孤狼";
    // affix["孤狼"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.2, lvl, rare, multiple), "spr+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    // affix[12] = "雄鹰";
    // affix["雄鹰"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    // affix[13] = "夜枭";
    // affix["夜枭"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.2, lvl, rare, multiple), "spr+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    // affix[14] = "巨鲸";
    // affix["巨鲸"] = function (lvl, rare, multiple) {return ["spr+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.3, lvl, rare, multiple)]}

    return affix;
}
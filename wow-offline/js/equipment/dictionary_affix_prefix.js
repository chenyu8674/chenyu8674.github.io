/** 装备随机词缀 **/
let dictionary_affix_prefix;
let dictionary_affix_prefix_length = 0;
$(document).ready(function () {
    dictionary_affix_prefix = new_affix_prefix()
    for (let affix in dictionary_affix_prefix) {
        dictionary_affix_prefix_length++;
    }
})

function new_affix_prefix() {
    let affix = {};

    affix["巨人"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.6, lvl, rare, multiple)]}
    affix["猫鼬"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.6, lvl, rare, multiple)]}
    affix["庞大"] = function (lvl, rare, multiple) {return ["sta+=" + get_effect_value(0.6, lvl, rare, multiple)]}
    affix["专注"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.6, lvl, rare, multiple)]}
    affix["启发"] = function (lvl, rare, multiple) {return ["spr+=" + get_effect_value(0.6, lvl, rare, multiple)]}

    affix["猛虎"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.3, lvl, rare, multiple), "agi+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix["野熊"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.3, lvl, rare, multiple), "sta+=" + get_effect_value(0.35, lvl, rare, multiple)]}
    affix["巨猿"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.3, lvl, rare, multiple), "int+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix["野猪"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.3, lvl, rare, multiple), "spr+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix["灵猴"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.3, lvl, rare, multiple), "sta+=" + get_effect_value(0.35, lvl, rare, multiple)]}
    affix["猎鹰"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.3, lvl, rare, multiple), "int+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix["孤狼"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.3, lvl, rare, multiple), "spr+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix["雄鹰"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.3, lvl, rare, multiple), "sta+=" + get_effect_value(0.35, lvl, rare, multiple)]}
    affix["夜枭"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.3, lvl, rare, multiple), "spr+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix["巨鲸"] = function (lvl, rare, multiple) {return ["spr+=" + get_effect_value(0.3, lvl, rare, multiple), "sta+=" + get_effect_value(0.35, lvl, rare, multiple)]}

    return affix;
}
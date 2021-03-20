/** 装备随机词缀 **/
let dictionary_affix_prefix;
let dictionary_affix_prefix_length = 0;
$(document).ready(function () {
    dictionary_affix_prefix = new_affix_prefix();
    dictionary_affix_prefix_length = dictionary_affix_prefix.length;
})

function new_affix_prefix() {
    let affix = [];

    affix[0] = function(surely) {return surely || Math.random() <= 0 ? "测试" : null};
    affix["测试"] = function (lvl, rare, multiple) {return ["main+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.2, lvl, rare, multiple)]}

    affix[1] = function(surely) {return surely || Math.random() <= 0.8 ? "巨人" : null};
    affix["巨人"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[2] = function(surely) {return surely || Math.random() <= 0.8 ? "猫鼬" : null};
    affix["猫鼬"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[3] = function(surely) {return surely || Math.random() <= 0.8 ? "庞大" : null};
    affix["庞大"] = function (lvl, rare, multiple) {return ["sta+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[4] = function(surely) {return surely || Math.random() <= 0.8 ? "专注" : null};
    affix["专注"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[5] = function(surely) {return surely || Math.random() <= 0.8 ? "启发" : null};
    affix["启发"] = function (lvl, rare, multiple) {return ["spr+=" + get_effect_value(0.4, lvl, rare, multiple)]}

    affix[6] = function(surely) {return surely || Math.random() <= 1 ? "猛虎" : null};
    affix["猛虎"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "agi+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[7] = function(surely) {return surely || Math.random() <= 1 ? "野熊" : null};
    affix["野熊"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[8] = function(surely) {return surely || Math.random() <= 0.2 ? "巨猿" : null};
    affix["巨猿"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "int+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[9] = function(surely) {return surely || Math.random() <= 0.2 ? "野猪" : null};
    affix["野猪"] = function (lvl, rare, multiple) {return ["str+=" + get_effect_value(0.2, lvl, rare, multiple), "spr+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[10] = function(surely) {return surely || Math.random() <= 1 ? "灵猴" : null};
    affix["灵猴"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[11] = function(surely) {return surely || Math.random() <= 0.2 ? "猎鹰" : null};
    affix["猎鹰"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.2, lvl, rare, multiple), "int+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[12] = function(surely) {return surely || Math.random() <= 0.2 ? "孤狼" : null};
    affix["孤狼"] = function (lvl, rare, multiple) {return ["agi+=" + get_effect_value(0.2, lvl, rare, multiple), "spr+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[13] = function(surely) {return surely || Math.random() <= 0.8 ? "雄鹰" : null};
    affix["雄鹰"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[14] = function(surely) {return surely || Math.random() <= 0.8 ? "夜枭" : null};
    affix["夜枭"] = function (lvl, rare, multiple) {return ["int+=" + get_effect_value(0.2, lvl, rare, multiple), "spr+=" + get_effect_value(0.2, lvl, rare, multiple)]}
    affix[15] = function(surely) {return surely || Math.random() <= 0.8 ? "巨鲸" : null};
    affix["巨鲸"] = function (lvl, rare, multiple) {return ["spr+=" + get_effect_value(0.2, lvl, rare, multiple), "sta+=" + get_effect_value(0.2, lvl, rare, multiple)]}

    return affix;
}
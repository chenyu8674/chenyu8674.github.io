/** 装备随机词缀 **/
let dictionary_affix_suffix;
let dictionary_affix_suffix_length = 0;
$(document).ready(function () {
    dictionary_affix_suffix = new_affix_suffix()
    for (let affix in dictionary_affix_suffix) {
        dictionary_affix_suffix_length++;
    }
    create_dictionary_affix();
})

function new_affix_suffix() {
    let affix = {};

    affix["能量"] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix["专注"] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(3, lvl, rare, multiple)]}
    affix["治疗"] = function (lvl, rare, multiple) {return ["heal_power+=" + get_effect_value(4, lvl, rare, multiple)]}

    affix["物理惩戒"] = function (lvl, rare, multiple) {return ["damage_physical+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["物理穿透"] = function (lvl, rare, multiple) {return ["pierce_physical+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["物理抗性"] = function (lvl, rare, multiple) {return ["res_physical+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["火焰惩戒"] = function (lvl, rare, multiple) {return ["damage_fire+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["火焰穿透"] = function (lvl, rare, multiple) {return ["pierce_fire+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["火焰抗性"] = function (lvl, rare, multiple) {return ["res_fire+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["冰霜惩戒"] = function (lvl, rare, multiple) {return ["damage_frost+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["冰霜穿透"] = function (lvl, rare, multiple) {return ["pierce_frost+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["冰霜抗性"] = function (lvl, rare, multiple) {return ["res_frost+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["自然惩戒"] = function (lvl, rare, multiple) {return ["damage_natural+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["自然穿透"] = function (lvl, rare, multiple) {return ["pierce_natural+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["自然抗性"] = function (lvl, rare, multiple) {return ["res_natural+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["奥术惩戒"] = function (lvl, rare, multiple) {return ["damage_arcane+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["奥术穿透"] = function (lvl, rare, multiple) {return ["pierce_arcane+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["奥术抗性"] = function (lvl, rare, multiple) {return ["res_arcane+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["神圣惩戒"] = function (lvl, rare, multiple) {return ["damage_holy+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["神圣穿透"] = function (lvl, rare, multiple) {return ["pierce_holy+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["神圣抗性"] = function (lvl, rare, multiple) {return ["res_holy+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["暗影惩戒"] = function (lvl, rare, multiple) {return ["damage_shadow+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["暗影穿透"] = function (lvl, rare, multiple) {return ["pierce_shadow+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["暗影抗性"] = function (lvl, rare, multiple) {return ["res_shadow+=" + get_effect_value(0.08, lvl, rare, multiple)]}

    affix["暴击"] = function (lvl, rare, multiple) {return ["critical_rate+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix["命中"] = function (lvl, rare, multiple) {return ["hit_rate+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix["闪避"] = function (lvl, rare, multiple) {return ["dodge_rate+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix["格挡"] = function (lvl, rare, multiple) {return ["block_rate+=" + get_effect_value(1, lvl, rare, multiple), "block_value+=" + get_effect_value(1, lvl, rare, multiple)]}

    return affix;
}
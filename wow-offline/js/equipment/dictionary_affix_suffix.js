/** 装备随机词缀 **/
let dictionary_affix_suffix;
let dictionary_affix_suffix_length = 0;
$(document).ready(function () {
    dictionary_affix_suffix = new_affix_suffix()
    for (let affix in dictionary_affix_suffix) {
        dictionary_affix_suffix_length++;
    }
})

function new_affix_suffix() {
    let affix = {};

    affix["冲击"] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(1.5, lvl, rare, multiple)]}
    affix["能量"] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(1.5, lvl, rare, multiple)]}
    affix["复苏"] = function (lvl, rare, multiple) {return ["heal_power+=" + get_effect_value(2, lvl, rare, multiple)]}

    affix["重击"] = function (lvl, rare, multiple) {return ["critical_rate+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix["暴虐"] = function (lvl, rare, multiple) {return ["critical_damage+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix["精准"] = function (lvl, rare, multiple) {return ["hit_rate+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix["灵巧"] = function (lvl, rare, multiple) {return ["dodge_rate+=" + get_effect_value(1, lvl, rare, multiple)]}
    affix["坚守"] = function (lvl, rare, multiple) {return ["block_rate+=" + get_effect_value(1, lvl, rare, multiple), "block_value+=" + get_effect_value(0.5, lvl, rare, multiple)]}

    affix["锋利"] = function (lvl, rare, multiple) {return ["damage_physical+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    // affix["物理穿透"] = function (lvl, rare, multiple) {return ["pierce_physical+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["强固"] = function (lvl, rare, multiple) {return ["res_physical+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["烈日"] = function (lvl, rare, multiple) {return ["damage_fire+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    // affix["火焰穿透"] = function (lvl, rare, multiple) {return ["pierce_fire+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["阻燃"] = function (lvl, rare, multiple) {return ["res_fire+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["寒霜"] = function (lvl, rare, multiple) {return ["damage_frost+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    // affix["冰霜穿透"] = function (lvl, rare, multiple) {return ["pierce_frost+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["保暖"] = function (lvl, rare, multiple) {return ["res_frost+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["愤怒"] = function (lvl, rare, multiple) {return ["damage_natural+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    // affix["自然穿透"] = function (lvl, rare, multiple) {return ["pierce_natural+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["平静"] = function (lvl, rare, multiple) {return ["res_natural+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["奔腾"] = function (lvl, rare, multiple) {return ["damage_arcane+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    // affix["奥术穿透"] = function (lvl, rare, multiple) {return ["pierce_arcane+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["秩序"] = function (lvl, rare, multiple) {return ["res_arcane+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["天罚"] = function (lvl, rare, multiple) {return ["damage_holy+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    // affix["神圣穿透"] = function (lvl, rare, multiple) {return ["pierce_holy+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["弑神"] = function (lvl, rare, multiple) {return ["res_holy+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["午夜"] = function (lvl, rare, multiple) {return ["damage_shadow+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    // affix["暗影穿透"] = function (lvl, rare, multiple) {return ["pierce_shadow+=" + get_effect_value(0.08, lvl, rare, multiple)]}
    affix["黎明"] = function (lvl, rare, multiple) {return ["res_shadow+=" + get_effect_value(0.08, lvl, rare, multiple)]}

    return affix;
}
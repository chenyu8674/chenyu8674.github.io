/** 装备随机词缀 **/
let dictionary_affix_suffix;
let dictionary_affix_suffix_length = 0;

$(document).ready(function () {
    dictionary_affix_suffix = new_affix_suffix();
    for (let affix in dictionary_affix_suffix) {
        dictionary_affix_suffix_length++;
    }
})

function new_affix_suffix() {
    let affix = {};

    affix[0] = "冲击";
    affix["冲击"] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    // affix[1] = "能量";
    // affix["能量"] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    // affix[2] = "复苏";
    // affix["复苏"] = function (lvl, rare, multiple) {return ["heal_power+=" + get_effect_value(0.4, lvl, rare, multiple)]}

    affix[3] = "致命";
    affix["致命"] = function (lvl, rare, multiple) {return ["critical_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[4] = "暴虐";
    affix["暴虐"] = function (lvl, rare, multiple) {return ["critical_damage+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.1, lvl, rare, multiple))]}
    affix[5] = "精准";
    affix["精准"] = function (lvl, rare, multiple) {return ["hit_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[6] = "灵巧";
    affix["灵巧"] = function (lvl, rare, multiple) {return ["dodge_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}

    affix[7] = "锋利";
    affix["锋利"] = function (lvl, rare, multiple) {return ["damage_physical+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[8] = "碾压";
    affix["碾压"] = function (lvl, rare, multiple) {return ["pierce_physical+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[9] = "坚硬";
    affix["坚硬"] = function (lvl, rare, multiple) {return ["res_physical+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[10] = "烈日";
    affix["烈日"] = function (lvl, rare, multiple) {return ["damage_fire+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[11] = "熔化";
    affix["熔化"] = function (lvl, rare, multiple) {return ["pierce_fire+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[12] = "阻燃";
    affix["阻燃"] = function (lvl, rare, multiple) {return ["res_fire+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[13] = "寒霜";
    affix["寒霜"] = function (lvl, rare, multiple) {return ["damage_frost+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[14] = "刺骨";
    affix["刺骨"] = function (lvl, rare, multiple) {return ["pierce_frost+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[15] = "保暖";
    affix["保暖"] = function (lvl, rare, multiple) {return ["res_frost+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[16] = "愤怒";
    affix["愤怒"] = function (lvl, rare, multiple) {return ["damage_natural+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[17] = "腐蚀";
    affix["腐蚀"] = function (lvl, rare, multiple) {return ["pierce_natural+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[18] = "平静";
    affix["平静"] = function (lvl, rare, multiple) {return ["res_natural+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[19] = "奔腾";
    affix["奔腾"] = function (lvl, rare, multiple) {return ["damage_arcane+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[20] = "失控";
    affix["失控"] = function (lvl, rare, multiple) {return ["pierce_arcane+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[21] = "秩序";
    affix["秩序"] = function (lvl, rare, multiple) {return ["res_arcane+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[22] = "神威";
    affix["神威"] = function (lvl, rare, multiple) {return ["damage_holy+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[23] = "天谴";
    affix["天谴"] = function (lvl, rare, multiple) {return ["pierce_holy+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[24] = "弑神";
    affix["弑神"] = function (lvl, rare, multiple) {return ["res_holy+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[25] = "午夜";
    affix["午夜"] = function (lvl, rare, multiple) {return ["damage_shadow+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[26] = "深渊";
    affix["深渊"] = function (lvl, rare, multiple) {return ["pierce_shadow+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[27] = "黎明";
    affix["黎明"] = function (lvl, rare, multiple) {return ["res_shadow+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}

    affix[28] = "坚守";
    affix["坚守"] = function (lvl, rare, multiple) {return ["block_rate+=" + get_effect_value(0.6, lvl, rare, multiple), "block_value+=" + get_effect_value(0.6, lvl, rare, multiple)]}
    return affix;
}
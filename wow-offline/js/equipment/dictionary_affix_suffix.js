/** 装备随机词缀 **/
let dictionary_affix_suffix;
let dictionary_affix_suffix_length = 0;

$(document).ready(function () {
    dictionary_affix_suffix = new_affix_suffix();
    dictionary_affix_suffix_length = dictionary_affix_suffix.length;
})

function new_affix_suffix() {
    let affix = [];

    affix[0] = function(surely) {return surely || Math.random() <= 1 ? "冲击" : null};
    affix["冲击"] = function (lvl, rare, multiple) {return ["attack_power+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix[1] = function(surely) {return surely || Math.random() <= 0.5 ? "能量" : null};
    affix["能量"] = function (lvl, rare, multiple) {return ["magic_power+=" + get_effect_value(0.3, lvl, rare, multiple)]}
    affix[2] = function(surely) {return surely || Math.random() <= 0.5 ? "复苏" : null};
    affix["复苏"] = function (lvl, rare, multiple) {return ["heal_power+=" + get_effect_value(0.4, lvl, rare, multiple)]}

    affix[3] = function(surely) {return surely || Math.random() <= 1 ? "致命" : null};
    affix["致命"] = function (lvl, rare, multiple) {return ["critical_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[4] = function(surely) {return surely || Math.random() <= 1 ? "暴虐" : null};
    affix["暴虐"] = function (lvl, rare, multiple) {return ["critical_damage+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.1, lvl, rare, multiple))]}
    affix[5] = function(surely) {return surely || Math.random() <= 1 ? "精准" : null};
    affix["精准"] = function (lvl, rare, multiple) {return ["hit_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[6] = function(surely) {return surely || Math.random() <= 1 ? "灵巧" : null};
    affix["灵巧"] = function (lvl, rare, multiple) {return ["dodge_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[28] = function(surely) {return surely || Math.random() <= 0 ? "工匠" : null};
    affix["工匠"] = function (lvl, rare, multiple) {return ["mastery_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}
    affix[29] = function(surely) {return surely || Math.random() <= 0 ? "坚韧" : null};
    affix["坚韧"] = function (lvl, rare, multiple) {return ["resilient_rate+=" + get_effect_value(0.4, lvl, rare, multiple)]}

    affix[7] = function(surely) {return surely || Math.random() <= 0.1 ? "锋利" : null};
    affix["锋利"] = function (lvl, rare, multiple) {return ["damage_physical+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[8] = function(surely) {return surely || Math.random() <= 0.1 ? "碾压" : null};
    affix["碾压"] = function (lvl, rare, multiple) {return ["pierce_physical+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[9] = function(surely) {return surely || Math.random() <= 0.1 ? "坚硬" : null};
    affix["坚硬"] = function (lvl, rare, multiple) {return ["res_physical+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[10] = function(surely) {return surely || Math.random() <= 0.1 ? "烈日" : null};
    affix["烈日"] = function (lvl, rare, multiple) {return ["damage_fire+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[11] = function(surely) {return surely || Math.random() <= 0.1 ? "熔化" : null};
    affix["熔化"] = function (lvl, rare, multiple) {return ["pierce_fire+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[12] = function(surely) {return surely || Math.random() <= 0.1 ? "阻燃" : null};
    affix["阻燃"] = function (lvl, rare, multiple) {return ["res_fire+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[13] = function(surely) {return surely || Math.random() <= 0.1 ? "寒霜" : null};
    affix["寒霜"] = function (lvl, rare, multiple) {return ["damage_frost+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[14] = function(surely) {return surely || Math.random() <= 0.1 ? "刺骨" : null};
    affix["刺骨"] = function (lvl, rare, multiple) {return ["pierce_frost+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[15] = function(surely) {return surely || Math.random() <= 0.1 ? "保暖" : null};
    affix["保暖"] = function (lvl, rare, multiple) {return ["res_frost+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[16] = function(surely) {return surely || Math.random() <= 0.1 ? "愤怒" : null};
    affix["愤怒"] = function (lvl, rare, multiple) {return ["damage_natural+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[17] = function(surely) {return surely || Math.random() <= 0.1 ? "腐蚀" : null};
    affix["腐蚀"] = function (lvl, rare, multiple) {return ["pierce_natural+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[18] = function(surely) {return surely || Math.random() <= 0.1 ? "平静" : null};
    affix["平静"] = function (lvl, rare, multiple) {return ["res_natural+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[19] = function(surely) {return surely || Math.random() <= 0.1 ? "奔腾" : null};
    affix["奔腾"] = function (lvl, rare, multiple) {return ["damage_arcane+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[20] = function(surely) {return surely || Math.random() <= 0.1 ? "失控" : null};
    affix["失控"] = function (lvl, rare, multiple) {return ["pierce_arcane+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[21] = function(surely) {return surely || Math.random() <= 0.1 ? "秩序" : null};
    affix["秩序"] = function (lvl, rare, multiple) {return ["res_arcane+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[22] = function(surely) {return surely || Math.random() <= 0.1 ? "神威" : null};
    affix["神威"] = function (lvl, rare, multiple) {return ["damage_holy+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[23] = function(surely) {return surely || Math.random() <= 0.1 ? "天谴" : null};
    affix["天谴"] = function (lvl, rare, multiple) {return ["pierce_holy+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[24] = function(surely) {return surely || Math.random() <= 0.1 ? "弑神" : null};
    affix["弑神"] = function (lvl, rare, multiple) {return ["res_holy+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[25] = function(surely) {return surely || Math.random() <= 0.1 ? "午夜" : null};
    affix["午夜"] = function (lvl, rare, multiple) {return ["damage_shadow+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[26] = function(surely) {return surely || Math.random() <= 0.1 ? "深渊" : null};
    affix["深渊"] = function (lvl, rare, multiple) {return ["pierce_shadow+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}
    affix[27] = function(surely) {return surely || Math.random() <= 0.1 ? "黎明" : null};
    affix["黎明"] = function (lvl, rare, multiple) {return ["res_shadow+=" + (get_effect_value(2, 1, 1, multiple) + get_effect_value(0.05, lvl, rare, multiple))]}

    affix[100] = function(surely) {return surely || Math.random() <= 0.5 ? "坚守" : null};
    affix["坚守"] = function (lvl, rare, multiple) {return ["block_rate+=" + get_effect_value(0.6, lvl, rare, multiple), "block_value+=" + get_effect_value(0.6, lvl, rare, multiple)]}
    return affix;
}
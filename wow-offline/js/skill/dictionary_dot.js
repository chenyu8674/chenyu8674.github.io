/** DEBUFF一览 **/
let dictionary_dot;
$(document).ready(function () {
    dictionary_dot = new_dot();
});

function new_dot() {
    let dot = {};

    dot.hunter_3 = function (damage) {
        let dot = {};
        dot.name = "爆炸陷阱";
        dot.damage = damage;
        dot.T = 4;
        dot.type = element_fire;
        dot.icon = "spell_fire_selfdestruct";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.shaman_1_1 = function (damage) {
        let dot = {};
        dot.name = "灼热图腾";
        dot.damage = damage;
        dot.T = -1;
        dot.type = element_fire;
        dot.icon = "spell_fire_searingtotem";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.shaman_1_2 = function (damage) {
        let dot = {};
        dot.name = "烈焰震击";
        dot.damage = damage;
        dot.T = 3;
        dot.type = element_fire;
        dot.icon = "spell_fire_flameshock";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.shaman_3 = function (heal) {
        let dot = {};
        dot.name = "治疗之泉";
        dot.heal = heal;
        dot.T = -1;
        dot.type = element_natural;
        dot.icon = "inv_spear_04";
        dot.detail = "回合开始时，回复 " + dot.damage + " 点生命";
        return dot;
    }

    dot.druid_1_1 = function (damage) {
        let dot = {};
        dot.name = "月火术";
        dot.damage = damage;
        dot.T = 2;
        dot.type = element_arcane;
        dot.icon = "spell_nature_starfall";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_1_2 = function (damage) {
        let dot = {};
        dot.name = "阳炎术";
        dot.damage = damage;
        dot.T = 2;
        dot.type = element_natural;
        dot.icon = "ability_mage_firestarter";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_2 = function (damage) {
        let dot = {};
        dot.name = "扫击";
        dot.damage = damage;
        dot.T = 3;
        dot.type = element_physical;
        dot.icon = "ability_druid_disembowel";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_4_1 = function (damage) {
        let dot = {};
        dot.name = "树人";
        dot.damage = damage;
        dot.heal = -1;
        dot.T = -1;
        dot.type = element_natural;
        dot.icon = "ability_druid_forceofnature";
        dot.detail = "回合开始时，吸取 " + dot.damage + " 点生命";
        return dot;
    }

    dot.druid_4_2 = function (heal) {
        let dot = {};
        dot.name = "愈合";
        dot.heal = heal;
        dot.T = 5;
        dot.icon = "spell_nature_resistnature";
        dot.detail = "回合开始时，回复 " + dot.heal + " 点生命";
        return dot;
    }

    dot.rogue_3 = function (damage, heal) {
        let dot = {};
        dot.name = "割裂";
        dot.damage = damage;
        dot.heal = -heal;
        dot.T = 3;
        dot.type = element_physical;
        dot.icon = "ability_rogue_rupture";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.physical = function (damage, turn) {
        let dot = {};
        dot.name = "流血";
        dot.damage = damage;
        dot.T = turn;
        dot.type = element_physical;
        dot.icon = "spell_shadow_lifedrain";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.heal = function (heal, turn) {
        let dot = {};
        dot.name = "回复";
        dot.heal = heal;
        dot.T = turn;
        dot.icon = "spell_nature_rejuvenation";
        dot.detail = "回合开始时，回复 " + dot.heal + " 点生命";
        return dot;
    }

    dot.fire = function (damage, turn) {
        let dot = {};
        dot.name = "点燃";
        dot.damage = damage;
        dot.T = turn;
        dot.type = element_fire;
        dot.icon = "spell_fire_fire";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.frost = function (damage, turn) {
        let dot = {};
        dot.name = "霜冻";
        dot.damage = damage;
        dot.T = turn;
        dot.type = element_frost;
        dot.icon = "spell_frost_frostshock";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.natural = function (damage, turn) {
        let dot = {};
        dot.name = "中毒";
        dot.damage = damage;
        dot.T = turn;
        dot.type = element_natural;
        dot.icon = "inv_misc_slime_01";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.arcane = function (damage, turn) {
        let dot = {};
        dot.name = "奥术流失";
        dot.damage = damage;
        dot.T = turn;
        dot.type = element_arcane;
        dot.icon = "spell_shadow_teleport";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.holy = function (damage, turn) {
        let dot = {};
        dot.name = "圣光审判";
        dot.damage = damage;
        dot.T = turn;
        dot.type = element_holy;
        dot.icon = "spell_holy_searinglight";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.shadow = function (damage, turn) {
        let dot = {};
        dot.name = "暗影灼烧";
        dot.damage = damage;
        dot.T = turn;
        dot.type = element_shadow;
        dot.icon = "spell_shadow_abominationexplosion";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    return dot;
}
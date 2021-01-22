/** DEBUFF一览 **/
let dictionary_dot;
$(document).ready(function () {
    dictionary_dot = new_dot();
});

function new_dot() {
    let dot = {};

    dot.fire_of_sulfuras = function (damage) {
        let dot = {};
        dot.id = 20001;// Id
        dot.name = "萨弗拉斯之怒";// 名称
        dot.T = 5;
        dot.damage = damage;
        dot.type = element_fire;
        dot.icon = "Spell_Fire_SelfDestruct";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.rake = function (damage) {
        let dot = {};
        dot.id = 11004;// Id
        dot.name = "撕裂";// 名称
        dot.T = 3;
        dot.damage = damage;
        dot.type = element_physical;
        dot.icon = "ability_druid_disembowel";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.hunter_3 = function (damage) {
        let dot = {};
        dot.id = 33;// Id
        dot.name = "爆炸陷阱";// 名称
        dot.T = 4;
        dot.damage = damage;
        dot.type = element_fire;
        dot.icon = "Spell_Fire_SelfDestruct";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_1_1 = function (damage) {
        let dot = {};
        dot.id = 511;// Id
        dot.name = "月火术";// 名称
        dot.T = 2;
        dot.damage = damage;
        dot.type = element_arcane;
        dot.icon = "spell_nature_starfall";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_1_2 = function (damage) {
        let dot = {};
        dot.id = 512;// Id
        dot.name = "阳炎术";// 名称
        dot.T = 2;
        dot.damage = damage;
        dot.type = element_natural;
        dot.icon = "spell_nature_starfall";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_2 = function (damage) {
        let dot = {};
        dot.id = 52;// Id
        dot.name = "扫击";// 名称
        dot.T = 3;
        dot.damage = damage;
        dot.type = element_physical;
        dot.icon = "ability_druid_disembowel";
        dot.detail = "回合开始时，受到 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_4_1_1 = function (damage) {
        let dot = {};
        dot.id = 5411;// Id
        dot.name = "树人攻击";// 名称
        dot.T = -1;
        dot.damage = damage;
        dot.type = element_physical;
        dot.icon = "ability_druid_forceofnature";
        dot.detail = "树人攻击目标，造成 " + dot.damage + " 点 " + get_element_name(dot.type) + " 伤害";
        return dot;
    }

    dot.druid_4_1_2 = function (heal) {
        let dot = {};
        dot.id = 5412;// Id
        dot.name = "自然之力";// 名称
        dot.T = -1;
        dot.heal = heal;
        dot.icon = "ability_druid_forceofnature";
        dot.detail = "树人攻击目标时，回复 " + dot.damage + " 点生命";
        return dot;
    }

    dot.druid_4_2 = function (heal) {
        let dot = {};
        dot.id = 542;// Id
        dot.name = "愈合";// 名称
        dot.T = 5;
        dot.heal = heal;
        dot.icon = "spell_nature_resistnature";
        dot.detail = "回合开始时，回复 " + dot.heal + " 点生命";
        return dot;
    }

    return dot;
}
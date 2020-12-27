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

    return dot;
}
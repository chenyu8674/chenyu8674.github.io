/** DOT、HOT一览 **/
let dictionary_dot;
$(document).ready(function () {
    dictionary_dot = new_dot();
});

function new_dot() {
    let dot = {};

    /**
     * 通用DOT
     */
    dot.dot = function (name, icon, power_percent, attack_type, element_type, turn, drain) {
        let dot = {};
        dot.type = "dot";
        dot.name = name;
        dot.icon = icon;
        dot.power_percent = power_percent;
        dot.attack_type = attack_type;
        dot.element_type = element_type;
        dot.T = turn;
        dot.drain = drain ? drain : 0;
        let attack_name = attack_type === type_attack ? "攻击" : (attack_type === type_magic ? "法术" : "治疗");
        dot.detail = "回合开始时，受到" + dot.power_percent + "%" + attack_name + "强度的" + get_element_name(dot.element_type) + "伤害";
        return dot;
    }

    /**
     * 通用HOT
     */
    dot.hot = function (name, icon, power_percent, attack_type, element_type, turn) {
        let hot = {};
        hot.type = "hot";
        hot.name = name;
        hot.icon = icon;
        hot.power_percent = power_percent;
        hot.attack_type = attack_type;
        hot.element_type = element_type;
        hot.T = turn;
        let attack_name = attack_type === type_attack ? "攻击" : (attack_type === type_magic ? "法术" : "治疗");
        hot.detail = "回合开始时，回复" + hot.power_percent + "%" + attack_name + "强度的生命";
        return hot;
    }

    return dot;
}
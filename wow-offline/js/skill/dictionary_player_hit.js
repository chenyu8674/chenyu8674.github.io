/** 受击处理一览 **/
let dictionary_player_hit;
$(document).ready(function () {
    dictionary_player_hit = new_player_hit();
});

function new_player_hit() {
    let hit = {};

    hit.shaman_1 = function () {
        let hit = {};
        hit.after = function (attacker, target, skill_result) {
            let damage_count = get_damage_count(skill_result);
            damage_count = damage_count > 3 ? 3 : damage_count;
            for (let i = 0; i < damage_count; i++) {
                let mastery_percent = calculate_original_mastery(target);
                calculate_skill(target, attacker, "闪电之盾", mastery_percent, type_magic, element_natural);
            }
        };
        return hit;
    };
    hit[41] = [hit.shaman_1()];

    hit.priest_1 = function () {
        let hit = {};
        hit.before = function (attacker, target) {
            let damage_percent = get_health_lack_percent(target);
            target.taken_damage_percent -= dictionary_buff.priest_1().X * damage_percent;
        };
        return hit;
    };
    hit[71] = [hit.priest_1()];

    hit.priest_2 = function () {
        let hit = {};
        hit.after = function (attacker, target, skill_result) {
            if (get_damage_count(skill_result) > 0) {
                let buff = dictionary_buff.priest_2();
                calculate_heal(target, target, buff.name, buff.X * get_health_lack_percent(target));
            }
        };
        return hit;
    };
    hit[72] = [hit.priest_2()];

    return hit;
}
/** DEBUFF一览 **/
let dictionary_debuff;
$(document).ready(function () {
    dictionary_debuff = new_debuff();
});

function new_debuff() {
    let debuff = {};

    debuff.warrior_1 = function () {
        let debuff = {};
        debuff.name = "致死打击";
        debuff.T = 3;
        debuff.X = 30;
        debuff.icon = "ability_warrior_savageblow";
        debuff.detail = "受到治疗-" + debuff.X + "%";
        debuff.effect = [
            "taken_heal_percent-=" + debuff.X
        ];
        return debuff;
    }

    debuff.warrior_3 = function () {
        let debuff = {};
        debuff.name = "破甲";
        debuff.T = 5;
        debuff.X = 4;
        debuff.icon = "ability_warrior_sunder";
        debuff.detail = "物理抗性-" + debuff.X;
        debuff.effect = [
            "res_physical-=" + debuff.X
        ];
        return debuff;
    }

    debuff.shaman_1_1 = function (X) {
        let debuff = {};
        debuff.name = "地震术";
        debuff.T = 3;
        debuff.X = X;
        debuff.icon = "spell_nature_earthshock";
        debuff.detail = "所有抗性-" + X + "%";
        debuff.effect = [
            "res_all-=" + X
        ];
        return debuff;
    }

    debuff.shaman_1_2 = function (X) {
        let debuff = {};
        debuff.name = "冰霜震击";
        debuff.T = 3;
        debuff.X = X;
        debuff.icon = "spell_frost_frostshock";
        debuff.detail = "所有伤害-" + X + "%";
        debuff.effect = [
            "damage_all-=" + X
        ];
        return debuff;
    }

    debuff.rogue_1 = function (X) {
        let debuff = {};
        debuff.name = "肾击";
        debuff.T = 4;
        debuff.X = X;
        debuff.icon = "ability_rogue_kidneyshot";
        debuff.detail = "所有伤害-" + X + "%";
        debuff.effect = [
            "damage_all-=" + X
        ];
        return debuff;
    }

    debuff.rogue_3 = function (X) {
        let debuff = {};
        debuff.name = "出血";
        debuff.T = 3;
        debuff.X = X;
        debuff.icon = "spell_shadow_lifedrain";
        debuff.detail = "韧性等级-" + X;
        debuff.effect = [
            "resilient_rate-=" + X
        ];
        return debuff;
    }

    debuff.warlock_1 = function () {
        let debuff = {};
        debuff.name = "虚弱诅咒";
        debuff.T = -1;
        debuff.X = 20;
        debuff.icon = "spell_shadow_curseofmannoroth";
        debuff.detail = "所有伤害-" + debuff.X + "%";
        debuff.effect = [
            "damage_all-=" + debuff.X
        ];
        return debuff;
    }

    debuff.warlock_2 = function () {
        let debuff = {};
        debuff.name = "鲁莽诅咒";
        debuff.T = -1;
        debuff.X = 20;
        debuff.icon = "spell_shadow_unholystrength";
        debuff.detail = "物理抗性-" + debuff.X;
        debuff.effect = [
            "res_physical-=" + debuff.X
        ];
        return debuff;
    }

    debuff.warlock_2_2 = function (X, T) {
        let debuff = {};
        debuff.name = "伤害加深";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = "spell_frost_stun";
        debuff.detail = "受到的伤害+" + X + "%";
        debuff.effect = [
            "taken_damage_percent+=" + X
        ];
        return debuff;
    }

    debuff.warlock_3 = function () {
        let debuff = {};
        debuff.name = "元素诅咒";
        debuff.T = -1;
        debuff.X = 20;
        debuff.icon = "spell_shadow_chilltouch";
        debuff.detail = "暗影和火焰抗性-" + debuff.X;
        debuff.effect = [
            "res_shadow-=" + debuff.X,
            "res_fire-=" + debuff.X
        ];
        return debuff;
    }

    debuff.mage_3 = function (X) {
        let debuff = {};
        debuff.name = "刺骨";
        debuff.T = 3;
        debuff.X = 5;
        debuff.Y = X == null ? debuff.X : X;
        debuff.icon = "spell_frost_frostarmor";
        debuff.detail = "所有伤害-" + debuff.Y + "%";
        debuff.effect = [
            "damage_all-=" + debuff.Y
        ];
        return debuff;
    }

    debuff.damage_all_decrease = function (X, T) {
        let debuff = {};
        debuff.name = "伤害降低";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = "spell_frost_frostnova";
        debuff.detail = "所有伤害-" + debuff.X + "%";
        debuff.effect = [
            "damage_all-=" + debuff.X
        ];
        return debuff;
    }

    debuff.hit_chance_percent_decrease = function (X, T) {
        let debuff = {};
        debuff.name = "致盲";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = "spell_shadow_mindsteal";
        debuff.detail = "命中率-" + debuff.X + "%";
        debuff.effect = [
            "hit_chance_percent-=" + debuff.X
        ];
        return debuff;
    }

    debuff.attack_power_decrease = function (X, T) {
        let debuff = {};
        debuff.name = "残废";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = "spell_nature_cyclone";
        debuff.detail = "攻击强度-" + X;
        debuff.effect = [
            "attack_power-=" + X
        ];
        return debuff;
    }

    debuff.taken_damage_percent_increase = function (X, T) {
        let debuff = {};
        debuff.name = "伤害加深";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = "spell_frost_stun";
        debuff.detail = "受到的伤害+" + X + "%";
        debuff.effect = [
            "taken_damage_percent+=" + X
        ];
        return debuff;
    }

    debuff.taken_heal_percent_decrease = function (X, T) {
        let debuff = {};
        debuff.name = "治疗降低";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = "ability_warrior_savageblow";
        debuff.detail = "受到治疗-" + X + "%";
        debuff.effect = [
            "taken_heal_percent-=" + X
        ];
        return debuff;
    }

    debuff.armor_all_decrease = function (X, T) {
        let debuff = {};
        debuff.name = "护甲降低";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = "spell_shadow_vampiricaura";
        debuff.detail = "所有护甲-" + X + "%";
        debuff.effect = [
            "armor_all_percent-=" + X
        ];
        return debuff;
    }

    debuff.sunder = function () {
        let debuff = {};
        debuff.name = "物理抗性降低";
        debuff.T = 6;
        debuff.X = 3;
        debuff.icon = "Ability_Warrior_Sunder";
        debuff.detail = "物理抗性-" + debuff.X;
        debuff.effect = [
            "res_physical-=" + debuff.X
        ];
        return debuff;
    }

    debuff[21992] = function () {
        let debuff = {};
        debuff.name = "雷霆之怒";
        debuff.T = 5;
        debuff.X = 20;
        debuff.icon = "spell_nature_cyclone";
        debuff.detail = "所有伤害-" + debuff.X + "%";
        debuff.effect = [
            "damage_all-=" + debuff.X
        ];
        return debuff;
    }

    return debuff;
}
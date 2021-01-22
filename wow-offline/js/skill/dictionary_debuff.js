/** DEBUFF一览 **/
let dictionary_debuff;
$(document).ready(function () {
    dictionary_debuff = new_debuff();
});

function new_debuff() {
    let debuff = {};

    debuff.warrior_1 = function () {
        let debuff = {};
        debuff.id = 11;// Id
        debuff.name = "致死打击";// 名称
        debuff.T = 3;
        debuff.X = 30;
        debuff.icon = "Ability_Warrior_SavageBlow";
        debuff.detail = "受到的治疗-" + debuff.X + "%";
        debuff.effect = [
            "taken_heal_percent-=" + debuff.X
        ];
        return debuff;
    }

    debuff.warrior_3 = function () {
        let debuff = {};
        debuff.id = 13;// Id
        debuff.name = "破甲";// 名称
        debuff.T = 6;
        debuff.X = 3;
        debuff.icon = "Ability_Warrior_Sunder";
        debuff.detail = "物理抗性-" + debuff.X;
        debuff.effect = [
            "res_physical-=" + debuff.X
        ];
        return debuff;
    }

    debuff.rage_of_thunder = function () {
        let debuff = {};
        debuff.id = 20003;// Id
        debuff.name = "雷霆之怒";// 名称
        debuff.T = 5;
        debuff.X = 20;
        debuff.icon = "spell_nature_cyclone";
        debuff.detail = "造成的所有伤害降低" + debuff.X + "%";
        debuff.effect = [
            "attack_power_percent-=" + debuff.X,
            "magic_power_percent-=" + debuff.X
        ];
        return debuff;
    }

    return debuff;
}
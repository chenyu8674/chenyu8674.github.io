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
        debuff.detail = "受到治疗-" + debuff.X + "%";
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

    debuff.mage_3 = function (X) {
        let debuff = {};
        debuff.id = 93;// Id
        debuff.name = "刺骨";// 名称
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

    debuff.sunder = function () {
        let debuff = {};
        debuff.id = 11006;// Id
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

    debuff[21992] = function () {
        let debuff = {};
        debuff.name = "雷霆之怒";// 名称
        debuff.T = 5;
        debuff.X = 20;
        debuff.icon = "spell_nature_cyclone";
        debuff.detail = "所有伤害-" + debuff.X + "%";
        debuff.effect = [
            "damage_all-=" + debuff.X
        ];
        return debuff;
    }

    debuff[18381] = function () {
        let debuff = {};
        debuff.name = "残废术";// 名称
        debuff.T = 3;
        debuff.X = 15;
        debuff.icon = "spell_nature_cyclone";
        debuff.detail = "攻击强度-" + debuff.X;
        debuff.effect = [
            "attack_power-=" + debuff.X
        ];
        return debuff;
    }

    return debuff;
}
/** 技能一览 **/
let dictionary_equipment_skill;
$(document).ready(function () {
    dictionary_equipment_skill = new_equipment_skill();
});

function new_equipment_skill() {
    let skill = {};

    skill[21162] = function () {
        let skill = {};
        skill.name = "萨弗拉斯之怒";
        skill.type = type_attack;
        skill.chance = 20;
        skill.cooldown = 5;
        skill.priority = 0;
        skill.X = 100;
        skill.Y = 20;
        skill.Z = 5;
        skill.icon = "spell_fire_selfdestruct";
        skill.detail = "以炎魔之力焚烧目标，造成" + skill.X + "%攻击强度的火焰伤害，并使其每回合受到" + skill.Y + "%攻击强度的火焰伤害，持续" + skill.Z + "回合。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.skills[0].type === type_attack;
        }
        skill.cast = function (attacker, target) {
            let damage_obj_x = calculate_skill_attack(attacker, target, "<span style='color:" + color_rare_6 + "'>" + skill.name + "</span>", skill.X, type_attack, element_fire);
            if (damage_obj_x.is_hit) {
                let dot_damage = calculate_dot_base_damage(attacker, target, skill.Y, type_attack);
                target.dots.push(new_dot().fire(dot_damage, skill.Z));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }

    skill[28148] = function () {
        let skill = {};
        skill.name = "麦迪文的回响";
        skill.type = type_magic;
        skill.chance = 20;
        skill.cooldown = 5;
        skill.priority = 0;
        skill.icon = "ability_mage_potentspirit";
        skill.detail = "重复前一个施放的法术。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.skills[0].type === type_magic;
        }
        skill.cast = function (attacker, target) {
            let cast_skill = attacker.skills[0];
            battle_log("<span style='color:" + color_rare_6 + "'>麦迪文的低语萦绕耳边……</span>");
            return cast_skill.cast(attacker, target);
        };
        return skill;
    }

    skill[21992] = function () {
        let skill = {};
        skill.name = "雷霆之怒";
        skill.type = type_attack;
        skill.chance = 20;
        skill.cooldown = 5;
        skill.priority = 0;
        skill.X = 100;
        skill.icon = "spell_nature_cyclone";
        skill.detail = "以雷霆之力冲击目标，造成" + skill.X + "%攻击强度的自然伤害，并使其造成的所有伤害降低" + dictionary_debuff[21992]().X + "%，持续" + dictionary_debuff[21992]().T + "回合。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.skills[0].type === type_attack;
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, "<span style='color:" + color_rare_6 + "'>" + skill.name + "</span>", skill.X, type_attack, element_natural);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff()[21992]());
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill[18381] = function () {
        let skill = {};
        skill.name = "残废术";
        skill.type = type_magic;
        skill.chance = 50;
        skill.cooldown = 5;
        skill.X = 15;
        skill.Y = 3;
        skill.icon = "spell_nature_cyclone";
        skill.detail = "使目标的攻击强度降低" + skill.X + "点，持续" + skill.Y + "回合。";
        skill.cast = function (attacker, target) {
            target.debuffs.push(new_debuff().attack_power_decrease(skill.X, skill.Y));
            battle_log(attacker.name + "施放了 " + skill.name);
            return skill_cast_result([], [], []);
        };
        return skill;
    }

    return skill;
}
/** 技能一览 **/
let dictionary_equipment_skill;
$(document).ready(function () {
    dictionary_equipment_skill = new_equipment_skill();
});

function new_equipment_skill() {
    let skill = {};

    skill.fire_of_sulfuras = function () {
        let skill = {};
        skill.id = 20001;// Id
        skill.name = "萨弗拉斯之怒";// 名称
        skill.type = type_attack;
        skill.chance = 2;// 触发几率
        skill.cooldown = 5;// 冷却
        skill.priority = 0;// 优先级 0触发 10低 20中 30高 50特殊 99强制
        skill.X = 100;
        skill.Y = 20;
        skill.icon = "spell_fire_selfdestruct";
        skill.detail = "以炎魔之力焚烧目标，造成" + skill.X + "%攻击强度的火焰伤害，并使其每回合受到" + skill.Y + "%攻击强度的火焰伤害，持续" + dictionary_dot.fire_of_sulfuras().T + "回合。";
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return attacker.skills[0].type === type_attack;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = calculate_skill_attack(attacker, target, "<span style='color:" + color_rare_6 + "'>" + skill.name + "</span>", skill.X, type_attack, element_fire);
            if (damage_obj_x.is_hit) {
                let dot_damage = calculate_dot_base_damage(attacker, target, skill.Y, type_attack);
                target.dots.push(new_dot().fire_of_sulfuras(dot_damage));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }

    skill.echo_of_medivh = function () {
        let skill = {};
        skill.id = 20002;// Id
        skill.name = "麦迪文的回响";// 名称
        skill.type = type_cast;
        skill.chance = 2;// 触发几率
        skill.cooldown = 5;// 冷却
        skill.priority = 0;// 优先级 0触发 10低 20中 30高 50特殊 99强制
        skill.icon = "ability_mage_potentspirit";
        skill.detail = "重复前一个施放的法术。";// 判断技能可用
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return attacker.skills[0].type === type_cast;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let cast_skill = attacker.skills[0];
            battle_log("<span style='color:" + color_rare_6 + "'>麦迪文的回响萦绕耳旁……</span>");
            return cast_skill.cast(attacker, target);
        };
        return skill;
    }

    skill.rage_of_thunder = function () {
        let skill = {};
        skill.id = 20003;// Id
        skill.name = "雷霆之怒";// 名称
        skill.type = type_attack;
        skill.chance = 2;// 触发几率
        skill.cooldown = 5;// 冷却
        skill.priority = 0;// 优先级 0触发 10低 20中 30高 50特殊 99强制
        skill.X = 100;
        skill.icon = "spell_nature_cyclone";
        skill.detail = "以雷霆之力冲击目标，造成" + skill.X + "%攻击强度的自然伤害，并使其造成的所有伤害降低" + dictionary_debuff.rage_of_thunder().X + "%，持续" + dictionary_debuff.rage_of_thunder().T + "回合。";
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return attacker.skills[0].type === type_attack;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, "<span style='color:" + color_rare_6 + "'>" + skill.name + "</span>", skill.X, type_attack, element_natural);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().rage_of_thunder());
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    return skill;
}
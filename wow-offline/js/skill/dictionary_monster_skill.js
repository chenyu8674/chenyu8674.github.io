/** 技能一览 **/
let dictionary_monster_skill;
$(document).ready(function () {
    dictionary_monster_skill = new_monster_skill();
});

function new_monster_skill() {
    let skill = {};

    skill.physical_attack = function () {
        let skill = {};
        skill.id = 10110;// Id
        skill.name = "攻击";// 名称，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的物理伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.fire_attack = function () {
        let skill = {};
        skill.id = 10120;// Id
        skill.name = "火焰打击";// 名称
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的火焰伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.frost_attack = function () {
        let skill = {};
        skill.id = 10130;// Id
        skill.name = "寒冰打击";// 名称
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的冰霜伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_frost);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.natural_attack = function () {
        let skill = {};
        skill.id = 10140;// Id
        skill.name = "闪电打击";// 名称
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的自然伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_natural);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.arcane_attack = function () {
        let skill = {};
        skill.id = 10150;// Id
        skill.name = "奥术打击";// 名称
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的奥术伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_arcane);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.holy_attack = function () {
        let skill = {};
        skill.id = 10160;// Id
        skill.name = "神圣打击";// 名称
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的神圣伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_holy);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.shadow_attack = function () {
        let skill = {};
        skill.id = 10170;// Id
        skill.name = "暗影打击";// 名称
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的暗影伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_shadow);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.fire_cast = function () {
        let skill = {};
        skill.id = 10220;// Id
        skill.name = "火球术";// 名称
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的火焰伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.frost_cast = function () {
        let skill = {};
        skill.id = 10230;// Id
        skill.name = "寒冰箭";// 名称
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的冰霜伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_frost);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.natural_cast = function () {
        let skill = {};
        skill.id = 10240;// Id
        skill.name = "闪电箭";// 名称
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的自然伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_natural);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.arcane_cast = function () {
        let skill = {};
        skill.id = 10250;// Id
        skill.name = "奥术冲击";// 名称
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的奥术伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_arcane);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.holy_cast = function () {
        let skill = {};
        skill.id = 10260;// Id
        skill.name = "惩击";// 名称
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的神圣伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_holy);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.shadow_cast = function () {
        let skill = {};
        skill.id = 10270;// Id
        skill.name = "暗影箭";// 名称
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的暗影伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_shadow);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.nature_heal = function () {
        let skill = {};
        skill.id = 10340;// Id
        skill.name = "治疗波";// 名称
        skill.cooldown = 3;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 100;
        skill.Y = 50;
        skill.detail = "使自己回复" + skill.X + "%治疗强度的的生命。";
        // 判断技能可用
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.Y;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let heal_obj = calculate_skill_heal(attacker, target, skill.name, skill.X);
            return skill_cast_result([], heal_obj);
        };
        return skill;
    }

    skill.mortal_strike = function () {
        let skill = {};
        skill.id = 11001;// Id
        skill.name = "致死打击";// 名称
        skill.X = 100;
        skill.icon = "ability_warrior_savageblow";
        skill.detail = "一次邪恶的攻击，对目标造成" + skill.X + "%攻击强度的物理伤害，并使其受到的治疗降低" + dictionary_debuff.warrior_1().X + "%，持续" + dictionary_debuff.warrior_1().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warrior_1());
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.multi_shot = function () {
        let skill = {};
        skill.id = 11002;// Id
        skill.name = "多重射击";// 名称
        skill.X = 30;
        skill.Y = 2;
        skill.Z = 5;
        skill.icon = "ability_upgrademoonglaive";
        skill.detail = "发射多枚箭矢，对目标造成随机" + skill.Y + "~" + skill.Z + "次" + skill.X + "%攻击强度的物理伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_count = Math.round(skill.Y + Math.random() * (skill.Z - skill.Y));
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
                damage_list.push(damage_obj);
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    }

    skill.blood_thirst = function () {
        let skill = {};
        skill.id = 11003;// Id
        skill.name = "嗜血";// 名称
        skill.X = 100;
        skill.Y = 15;
        skill.icon = "spell_nature_bloodlust";
        skill.detail = "在嗜血的狂乱中攻击目标，对其造成" + skill.X + "%攻击强度的物理伤害，并使自己回复造成伤害" + skill.Y + "%的生命。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            let heal_obj = null;
            if (damage_obj.is_hit) {
                let heal_value = Math.round(damage_obj.damage_value * 10 * attacker.taken_heal_percent / 100 / 100);
                heal_obj = calculate_flat_heal(attacker, target, skill.name, heal_value);
            }
            return skill_cast_result(damage_obj, heal_obj);
        };
        return skill;
    }

    skill.rake = function () {
        let skill = {};
        skill.id = 11004;// Id
        skill.name = "撕裂";// 名称
        skill.X = 80;
        skill.Y = 30;
        skill.icon = "ability_druid_disembowel";
        skill.detail = "撕裂敌人的肉体，造成" + skill.X + "%攻击强度的物理伤害，并使目标每回合受到" + skill.Y + "%攻击强度的物理伤害，持续" + dictionary_dot.rake().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            if (damage_obj_x.is_hit) {
                let damage_obj_y = calculate_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_physical, 999, -999, -999, true);
                target.dots.push(new_dot().rake(damage_obj_y.damage_value));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }

    skill.bash = function () {
        let skill = {};
        skill.id = 11005;// Id
        skill.name = "猛击";// 名称
        skill.cooldown = 4;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 200;
        skill.icon = "ability_warrior_decisivestrike";
        skill.detail = "猛击目标，造成" + skill.X + "%攻击强度的物理伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    return skill;
}
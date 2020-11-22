/** 技能一览 **/
let dictionary_monster_skill;
$(document).ready(function () {
    dictionary_monster_skill = new_monster_skill();
});

function new_monster_skill() {
    let skill = {};

    skill.physical_attack = function () {
        let skill = {};
        skill.id = 110;// Id
        skill.name = "攻击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    };

    skill.fire_cast = function () {
        let skill = {};
        skill.id = 220;// Id
        skill.name = "火球术";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级
        skill.X = 100;
        skill.detail = "对目标施法造成" + skill.X + "%法术强度的火焰伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_fire);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    };

    skill.frost_cast = function () {
        let skill = {};
        skill.id = 230;// Id
        skill.name = "寒冰箭";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级
        skill.X = 100;
        skill.detail = "对目标施法造成" + skill.X + "%法术强度的冰霜伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_frost);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    };

    skill.natural_cast = function () {
        let skill = {};
        skill.id = 240;// Id
        skill.name = "闪电箭";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级
        skill.X = 100;
        skill.detail = "对目标施法造成" + skill.X + "%法术强度的自然伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_natural);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    };

    skill.arcane_cast = function () {
        let skill = {};
        skill.id = 250;// Id
        skill.name = "奥术冲击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级
        skill.X = 100;
        skill.detail = "对目标施法造成" + skill.X + "%法术强度的奥术伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_arcane);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    };

    skill.holy_cast = function () {
        let skill = {};
        skill.id = 260;// Id
        skill.name = "惩击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级
        skill.X = 100;
        skill.detail = "对目标施法造成" + skill.X + "%法术强度的神圣伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_holy);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    };

    skill.shadow_cast = function () {
        let skill = {};
        skill.id = 270;// Id
        skill.name = "惩击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级
        skill.X = 100;
        skill.detail = "对目标施法造成" + skill.X + "%法术强度的暗影伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_shadow);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    };

    return skill;
}
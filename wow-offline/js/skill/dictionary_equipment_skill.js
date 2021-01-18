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
        skill.chance = 20;// 触发几率
        skill.cooldown = 5;// 冷却
        skill.priority = 0;// 优先级 0触发 10低 20中 30高 50特殊 99强制
        skill.X = 100;
        skill.Y = 20;
        skill.icon = "spell_fire_selfdestruct";
        skill.detail = "以炎魔之力焚烧目标，造成" + skill.X + "%攻击强度的火焰伤害，并使其每回合受到" + skill.Y + "%攻击强度的火焰伤害，持续" + dictionary_dot.fire_of_sulfuras().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_fire);
            if (damage_obj_x.is_hit) {
                let damage_obj_y = normal_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_fire, 999, -999, -999);
                target.dots.push(new_dot().fire_of_sulfuras(damage_obj_y.damage_value));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }

    return skill;
}
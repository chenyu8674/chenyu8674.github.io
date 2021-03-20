/** 技能一览 **/
let dictionary_monster_skill;
$(document).ready(function () {
    dictionary_monster_skill = new_monster_skill();
});

function new_monster_skill() {
    let skill = {};

    skill.physical_attack = skill["物攻"] = skill["攻击"] = function () {
        let skill = {};
        skill.name = "攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.fire_attack = skill["火攻"] = function () {
        let skill = {};
        skill.name = "火焰攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的火焰伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.frost_attack = skill["冰攻"] = function () {
        let skill = {};
        skill.name = "寒冰攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的冰霜伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_frost);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.natural_attack = skill["电攻"] = function () {
        let skill = {};
        skill.name = "闪电攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的自然伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.arcane_attack = skill["奥攻"] = function () {
        let skill = {};
        skill.name = "奥术攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的奥术伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_arcane);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.holy_attack = skill["圣攻"] = function () {
        let skill = {};
        skill.name = "神圣攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的神圣伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_holy);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.shadow_attack = skill["暗攻"] = function () {
        let skill = {};
        skill.name = "暗影攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的暗影伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_shadow);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.fire_cast = skill["火法"] = function () {
        let skill = {};
        skill.name = "火球术";
        skill.type = type_magic;
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的火焰伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.frost_cast = skill["冰法"] = function () {
        let skill = {};
        skill.name = "寒冰箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的冰霜伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_frost);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.natural_cast = skill["电法"] = function () {
        let skill = {};
        skill.name = "闪电箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的自然伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.arcane_cast = skill["奥法"] = function () {
        let skill = {};
        skill.name = "奥术箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的奥术伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_arcane);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.holy_cast = skill["圣法"] = function () {
        let skill = {};
        skill.name = "圣光箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的神圣伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_holy);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.shadow_cast = skill["暗法"] = function () {
        let skill = {};
        skill.name = "暗影箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的暗影伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_shadow);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.chaos_cast = skill["混法"] = function () {
        let skill = {};
        skill.name = "混乱箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.detail = "对目标施法，造成" + skill.X + "%法术强度的混乱伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_chaos);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.nature_heal = skill["自疗"] = skill["治疗波"] = function () {
        let skill = {};
        skill.name = "治疗波";
        skill.type = type_heal;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 100;
        skill.P = 70;
        skill.detail = "回复" + skill.X + "%治疗强度的的生命。";
        // 判断技能可用
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.P;
        }
        skill.cast = function (attacker) {
            let heal_obj = calculate_heal(attacker, attacker, skill.name, skill.X);
            return skill_cast_result([], heal_obj);
        };
        return skill;
    }

    skill.nature_hot = skill["回春"] = skill["回春术"] = function () {
        let skill = {};
        skill.name = "回春术";
        skill.type = type_heal;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 40;
        skill.T = 5;
        skill.detail = "每回合回复" + skill.X + "%治疗强度的的生命，持续" + skill.Y + "回合。";
        // 判断技能可用
        skill.cast = function (attacker) {
            attacker.dots.push(new_dot().hot(skill.name, skill.icon, skill.X, type_heal, element_natural, skill.T));
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result();
        };
        return skill;
    }

    skill["痛击"] = function () {
        let skill = {};
        skill.name = "痛击";
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 20;
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，有" + skill.Y + "%几率攻击两次。";
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            damage_list.push(damage_obj);
            if (random_percent(skill.Y)) {
                damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
                damage_list.push(damage_obj);
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    };

    skill["刺穿护甲"] = function () {
        let skill = {};
        skill.name = "刺穿护甲";
        skill.type = type_magic;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 75;
        skill.T = 5;
        skill.icon = "spell_shadow_vampiricaura"
        skill.detail = "使目标的所有护甲降低" + skill.X + "%，持续" + skill.Y + "回合。";
        skill.cast = function (attacker, target) {
            target.debuffs.push(new_debuff().armor_all_decrease(skill.X, skill.T));
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result();
        };
        return skill;
    }

    skill["精灵之火"] = function () {
        let skill = {};
        skill.name = "精灵之火";
        skill.type = type_magic;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 30;
        skill.X = 30;
        skill.T = 999;
        skill.icon = "spell_nature_faeriefire"
        skill.detail = "使目标的所有护甲降低" + skill.X + "%。";
        skill.cast = function (attacker, target) {
            target.debuffs.push(new_debuff().armor_all_decrease(skill.X, skill.T));
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result();
        };
        return skill;
    }

    skill["致盲"] = function () {
        let skill = {};
        skill.name = "致盲";
        skill.type = type_magic;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 30;
        skill.T = 3;
        skill.icon = "spell_shadow_mindsteal"
        skill.detail = "使目标的命中率降低" + skill.X + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            target.debuffs.push(new_debuff().hit_chance_percent_decrease(skill.X, skill.T));
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result();
        };
        return skill;
    }

    skill["冰霜新星"] = function () {
        let skill = {};
        skill.name = "冰霜新星";
        skill.type = type_magic;
        skill.cooldown = 4;
        skill.priority = 30;
        skill.X = 50;
        skill.Y = 80;
        skill.T = 1;
        skill.icon = "spell_frost_frostnova"
        skill.detail = "造成" + skill.X + "%法术强度的冰霜伤害，并使目标造成的伤害-" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_frost);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().damage_all_decrease(skill.Y, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["践踏"] = function () {
        let skill = {};
        skill.name = "践踏";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.priority = 30;
        skill.X = 50;
        skill.Y = 80;
        skill.T = 1;
        skill.icon = "ability_warstomp"
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，并使目标造成的伤害-" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().damage_all_decrease(skill.Y, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["凿击"] = function () {
        let skill = {};
        skill.name = "凿击";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.priority = 30;
        skill.X = 50;
        skill.Y = 80;
        skill.T = 1;
        skill.icon = "spell_frost_frostnova"
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，并使目标造成的伤害-" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().damage_all_decrease(skill.Y, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["战争践踏"] = function () {
        let skill = {};
        skill.name = "战争践踏";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 50;
        skill.T = 1;
        skill.icon = "spell_nature_thunderclap"
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，并使目标造成的伤害-" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().damage_all_decrease(skill.Y, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["雷霆一击"] = function () {
        let skill = {};
        skill.name = "雷霆一击";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 50;
        skill.T = 1;
        skill.icon = "spell_nature_thunderclap"
        skill.detail = "造成" + skill.X + "%攻击强度的自然伤害，并使目标造成的伤害-" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().damage_all_decrease(skill.Y, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["致死打击"] = function () {
        let skill = {};
        skill.name = "致死打击";
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 50;
        skill.T = 1;
        skill.icon = "ability_warrior_savageblow"
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，并使目标受到的治疗效果-" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().taken_heal_percent_decrease(skill.Y, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["冲锋"] = function () {
        let skill = {};
        skill.name = "冲锋";
        skill.type = type_attack;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 99;
        skill.X = 100;
        skill.Y = 50;
        skill.T = 1;
        skill.speed = 2;
        skill.icon = "ability_warrior_charge";
        skill.detail = "向目标冲锋，造成" + skill.X + "%攻击强度的物理伤害，并使目标受到的伤害+" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().taken_damage_percent_increase(skill.Y, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["挥砍"] = function () {
        let skill = {};
        skill.name = "挥砍";
        skill.type = type_attack;
        skill.cooldown = 3;
        skill.priority = 30;
        skill.X = 150;
        skill.icon = "ability_warrior_cleave";
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["英勇打击"] = function () {
        let skill = {};
        skill.name = "英勇打击";
        skill.type = type_attack;
        skill.cooldown = 3;
        skill.priority = 30;
        skill.X = 150;
        skill.icon = "ability_rogue_ambush";
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["撕咬"] = function () {
        let skill = {};
        skill.name = "撕咬";
        skill.type = type_attack;
        skill.cooldown = 3;
        skill.priority = 30;
        skill.X = 150;
        skill.icon = "ability_racial_cannibalize";
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["伏击"] = function () {
        let skill = {};
        skill.name = "伏击";
        skill.type = type_attack;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 99;
        skill.X = 150;
        skill.Y = 50;
        skill.speed = 3;
        skill.icon = "ability_rogue_ambush";
        skill.detail = "伏击目标，造成" + skill.X + "%攻击强度的物理伤害，暴击率提高" + skill.Y + "%。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical, 0, skill.Y);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["寒冰爪"] = function () {
        let skill = {};
        skill.name = "寒冰爪";
        skill.type = type_attack;
        skill.cooldown = 3;
        skill.priority = 30;
        skill.X = 150;
        skill.icon = "spell_frost_iceclaw";
        skill.detail = "造成" + skill.X + "%攻击强度的冰霜伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_frost);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["岩浆喷吐"] = function () {
        let skill = {};
        skill.name = "岩浆喷吐";
        skill.type = type_magic;
        skill.cooldown = 3;
        skill.priority = 30;
        skill.X = 150;
        skill.icon = "spell_shaman_lavasurge";
        skill.detail = "造成" + skill.X + "%法术强度的火焰伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["熔岩爆裂"] = function () {
        let skill = {};
        skill.name = "熔岩爆裂";
        skill.type = type_magic;
        skill.cooldown = 3;
        skill.priority = 30;
        skill.X = 150;
        skill.icon = "spell_shaman_lavaburst";
        skill.detail = "造成" + skill.X + "%法术强度的火焰伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["黏性炸弹"] = function () {
        let skill = {};
        skill.name = "黏性炸弹";
        skill.type = type_attack;
        skill.cooldown = 6;
        skill.priority = 30;
        skill.X = 200;
        skill.icon = "spell_shadow_mindbomb";
        skill.detail = "向目标投掷炸弹，造成" + skill.X + "%攻击强度的火焰伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["吸血"] = function () {
        let skill = {};
        skill.name = "吸血";
        skill.type = type_attack;
        skill.cooldown = 2;
        skill.first_turn = 2;
        skill.priority = 30;
        skill.X = 100;
        skill.icon = "ability_racial_cannibalize";
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，并回复等量的生命。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            let heal_obj = null;
            if (damage_obj.is_hit) {
                heal_obj = calculate_flat_heal(attacker, target, skill.name, damage_obj.damage_value);
            }
            return skill_cast_result(damage_obj, heal_obj);
        };
        return skill;
    }

    skill["盾牌猛击"] = function () {
        let skill = {};
        skill.name = "盾牌猛击";
        skill.type = type_attack;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 100;
        skill.icon = "inv_shield_05";
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，并获得" + skill.Y + "%格挡值的伤害护盾。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            let shield_value = Math.round(attacker.block_value * skill.Y / 100);
            let shield_obj = calculate_flat_shield(attacker, target, skill.name, shield_value);
            return skill_cast_result(damage_obj, null, shield_obj);
        };
        return skill;
    }

    skill["多重射击"] = function () {
        let skill = {};
        skill.name = "多重射击";
        skill.type = type_attack;
        skill.X = 30;
        skill.Y = 2;
        skill.Z = 5;
        skill.icon = "ability_upgrademoonglaive";
        skill.detail = "造成随机" + skill.Y + "~" + skill.Z + "次" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_count = Math.round(skill.Y + Math.random() * (skill.Z - skill.Y));
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
                damage_list.push(damage_obj);
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    }

    skill["撕裂"] = function () {
        let skill = {};
        skill.name = "撕裂";
        skill.type = type_attack;
        skill.cooldown = 5;
        skill.X = 30;
        skill.T = 5;
        skill.icon = "ability_gouge";
        skill.detail = "使目标每回合受到" + skill.X + "%攻击强度的物理伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, skill.type, element_physical, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["毒药"] = function () {
        let skill = {};
        skill.name = "毒药";
        skill.type = type_attack;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 30;
        skill.T = 5;
        skill.icon = "ability_upgrademoonglaive";
        skill.detail = "使目标每回合受到" + skill.X + "%攻击强度的自然伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, skill.type, element_natural, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["暗影风暴"] = function () {
        let skill = {};
        skill.name = "暗影风暴";
        skill.type = type_magic;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 30;
        skill.T = 5;
        skill.icon = "spell_shadow_shadowfury";
        skill.detail = "使目标每回合受到" + skill.X + "%法术强度的暗影伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_shadow);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, skill.type, element_shadow, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["献祭"] = function () {
        let skill = {};
        skill.name = "献祭";
        skill.type = type_magic;
        skill.cooldown = 8;
        skill.priority = 30;
        skill.X = 20;
        skill.T = 8;
        skill.icon = "spell_fire_immolation";
        skill.detail = "使目标每回合受到" + skill.X + "%法术强度的火焰伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, skill.type, element_fire, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["暗言术：痛"] = function () {
        let skill = {};
        skill.name = "暗言术：痛";
        skill.type = type_magic;
        skill.cooldown = 8;
        skill.priority = 30;
        skill.X = 20;
        skill.T = 8;
        skill.icon = "spell_shadow_shadowfury";
        skill.detail = "使目标每回合受到" + skill.X + "%法术强度的暗影伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_shadow);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, skill.type, element_shadow, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["撕心"] = function () {
        let skill = {};
        skill.name = "撕心";
        skill.type = type_attack;
        skill.X = 25;
        skill.T = 5;
        skill.icon = "ability_gouge";
        skill.detail = "使目标每回合受到" + skill.X + "%攻击强度的物理伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, skill.type, element_physical, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["直取要害"] = function () {
        let skill = {};
        skill.name = "直取要害";
        skill.type = type_attack;
        skill.priority = 99;
        skill.X = 100;
        skill.Y = 100;
        skill.T = 1;
        skill.speed = 2;
        skill.icon = "ability_warrior_charge";
        skill.detail = "向目标冲锋，造成" + skill.X + "%攻击强度的物理伤害，并使目标受到的伤害提高" + skill.Y + "%，持续" + skill.T + "回合。";
        skill.attempt = function (attacker) {
            let health_percent = attacker.current_health_value * 100 / attacker.max_health_value;
            let skill_point = get_skill_point(attacker);
            if (health_percent <= 100 && skill_point < 10) {
                add_skill_point(attacker, 1);
                return true;
            }
            if (health_percent <= 75 && skill_point < 20) {
                add_skill_point(attacker, 1);
                return true;
            }
            if (health_percent <= 50 && skill_point < 30) {
                add_skill_point(attacker, 1);
                return true;
            }
            if (health_percent <= 25 && skill_point < 40) {
                add_skill_point(attacker, 1);
                return true;
            }
            return false;
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical, 999);
            target.debuffs.push(new_debuff().taken_damage_percent_increase(skill.Y, skill.T));
            add_skill_point(attacker, 10);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["战斗怒吼"] = function () {
        let skill = {};
        skill.name = "战斗怒吼";
        skill.type = type_magic;
        skill.cooldown = 6;
        skill.priority = 40;
        skill.X = 30;
        skill.T = 6;
        skill.icon = "ability_warrior_battleshout";
        skill.detail = "攻击强度提高" + skill.X + "%，持续" + skill.Y + "回合。";
        skill.cast = function (attacker) {
            attacker.buffs.push(new_buff().attack_power_percent_increase(skill.X, skill.T));
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result();
        };
        return skill;
    }

    skill["安全限制离线"] = function () {
        let skill = {};
        skill.name = "安全限制离线";
        skill.type = type_other;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 99;
        skill.X = 100;
        skill.T = 999;
        skill.P = 35;
        skill.icon = "spell_fire_totemofwrath";
        skill.detail = "生命值低于" + skill.P + "%时解除安全限制，攻击强度提高" + skill.X + "%。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.P;
        }
        skill.cast = function (attacker) {
            attacker.buffs.push(new_buff().attack_power_percent_increase(skill.X, skill.T));
            battle_log(attacker.name + " 施放了 " + "<span style='color:red'>" + skill.name + "</span>");
            return skill_cast_result();
        };
        return skill;
    }

    skill["闪避"] = function () {
        let skill = {};
        skill.name = "闪避";
        skill.type = type_other;
        skill.cooldown = 6;
        skill.priority = 30;
        skill.speed = 1;
        skill.X = 50;
        skill.T = 2;
        skill.icon = "ability_whirlwind";
        skill.detail = "闪避率提高" + skill.X + "%，持续" + skill.T + "回合。";
        skill.cast = function (attacker) {
            attacker.dodge_chance_final += skill.X;
            attacker.buffs.push(new_buff().dodge_chance_final_increase(skill.X, skill.T));
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result();
        };
        return skill;
    }

    skill["炽热火焰"] = function () {
        let skill = {};
        skill.name = "炽热火焰";
        skill.type = type_other;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 99;
        skill.X = 20;
        skill.T = -1;
        skill.P = 50;
        skill.icon = "spell_fire_selfdestruct";
        skill.detail = "点燃战场，使敌方每回合受到" + skill.X + "%攻击强度的火焰伤害。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.P;
        }
        skill.cast = function (attacker, target) {
            target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, type_attack, element_fire, skill.T));
            battle_log(attacker.name + " 施放了 " + "<span style='color:red'>" + skill.name + "</span>");
            return skill_cast_result();
        };
        return skill;
    }

    skill["烈焰之拳"] = function () {
        let skill = {};
        skill.name = "烈焰之拳";
        skill.type = type_attack;
        skill.cooldown = 2;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的火焰伤害";
        skill.icon = "spell_fire_immolation";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill["寒冰之拳"] = function () {
        let skill = {};
        skill.name = "寒冰之拳";
        skill.type = type_attack;
        skill.cooldown = 2;
        skill.X = 100;
        skill.detail = "攻击目标，造成" + skill.X + "%攻击强度的冰霜伤害";
        skill.icon = "spell_fire_blueimmolation";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_frost);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill["烈焰绽放"] = function () {
        let skill = {};
        skill.name = "烈焰绽放";
        skill.type = type_magic;
        skill.cooldown = 2;
        skill.priority = 30;
        skill.X = 50;
        skill.T = 3;
        skill.P = 50;
        skill.icon = "spell_fire_immolation";
        skill.detail = "使目标每回合受到" + skill.X + "%法术强度的火焰伤害，持续" + skill.T + "回合。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.P;
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, type_attack, element_fire, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill["寒冰绽放"] = function () {
        let skill = {};
        skill.name = "寒冰绽放";
        skill.type = type_magic;
        skill.cooldown = 2;
        skill.priority = 30;
        skill.X = 50;
        skill.T = 3;
        skill.P = 50;
        skill.icon = "spell_fire_blueimmolation";
        skill.detail = "使目标每回合受到" + skill.X + "%法术强度的冰霜伤害，持续" + skill.T + "回合。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.P;
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_frost);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, type_attack, element_frost, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    return skill;
}
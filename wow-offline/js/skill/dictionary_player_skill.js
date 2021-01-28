/** 技能一览 **/
let dictionary_player_skill;
$(document).ready(function () {
    dictionary_player_skill = new_player_skill();
});

function new_player_skill() {
    let skill = {};

    skill.warrior_1_1 = function () {
        let skill = {};
        skill.id = 111;// Id
        skill.name = "致死打击";// 名称
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_warrior_savageblow";
        skill.detail = "一次邪恶的攻击，对目标造成" + skill.X + "%攻击强度的物理伤害，并使其受到的治疗降低" + dictionary_debuff.warrior_1().X + "%，持续" + dictionary_debuff.warrior_1().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let extra_hit = 0;
            if (get_skill_point(attacker) > 0) {
                // 已在压制流程中判定为命中
                extra_hit = 999;
                set_skill_point(attacker, 0);
            }
            let damage_list = [];
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical, extra_hit);
            damage_list.push(damage_obj);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warrior_1());
                let mastery_percent = calculate_original_mastery(attacker);
                if (has_equip_two_hand_weapon(attacker) && random_percent(mastery_percent)) {
                    let skill = dictionary_player_skill.warrior_1_2();
                    let damage_obj_2 = calculate_skill_attack(attacker, target, skill.name + "（精通）", skill.X, type_attack, element_physical, 999, skill.Y, -999);
                    damage_list.push(damage_obj_2);
                }
            }
            return skill_cast_result(damage_list, [], []);
        };
        return skill;
    }

    skill.warrior_1_2 = function () {
        let skill = {};
        skill.id = 112;// Id
        skill.name = "压制";// 名称
        skill.type = type_attack;
        skill.cooldown = 3;// 冷却
        skill.priority = 30;// 优先级 0触发 10低 20中 30高 50特殊 99强制
        skill.X = 120;
        skill.Y = 25;
        skill.icon = "ability_meleedamage";
        skill.detail = "在攻击被闪避后立刻对目标进行压制，造成" + skill.X + "%攻击强度的物理伤害。<br/>压制无法被闪避或格挡，且暴击率提高" + skill.Y + "%。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            let is_hit = random_percent(calculate_hit(attacker, target));
            if (is_hit) {
                // 提前判断致死打击的命中情况，命中则添加标记
                add_skill_point(attacker, 1);
                return false;
            } else {
                // 未命中则触发压制
                return true;
            }
        };
        // 技能施放调用
        skill.cast = function (attacker, target) {
            battle_log(target.name + " 闪避了 " + attacker.name + " 的攻击");
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical, 999, skill.Y, -999);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[11] = [skill.warrior_1_1(), skill.warrior_1_2()];

    skill.warrior_2_1 = function () {
        let skill = {};
        skill.id = 121;// Id
        skill.name = "嗜血";// 名称
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 15;
        skill.icon = "spell_nature_bloodlust";
        skill.detail = "在嗜血的狂乱中攻击目标，对其造成" + skill.X + "%攻击强度的物理伤害，并使自己回复造成伤害" + skill.Y + "%的生命。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            let heal_obj = null;
            if (damage_obj.is_hit) {
                let heal_value = damage_obj.damage_value * 10 * attacker.taken_heal_percent / 100 / 100;
                let mastery_percent = calculate_original_mastery(attacker);
                heal_value *= (100 + mastery_percent) / 100;
                heal_obj = calculate_flat_heal(attacker, target, skill.name, Math.round(heal_value));
            }
            return skill_cast_result([damage_obj], [heal_obj], []);
        };
        return skill;
    }

    skill.warrior_2_2 = function () {
        let skill = {};
        skill.id = 122;// Id
        skill.name = "斩杀";// 名称
        skill.type = type_attack;
        skill.priority = 99;// 优先级
        skill.X = 35;
        skill.Y = 150;
        skill.Z = 50;
        skill.icon = "inv_sword_48";
        skill.detail = "尝试终结受伤的目标，对其造成" + skill.Y + "%攻击强度的物理伤害，且暴击率提高" + skill.Z + "%。<br/>仅能在目标生命值低于" + skill.X + "%时使用。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            return target.current_health_value * 100 / target.max_health_value <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_physical, 0, skill.Z);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[12] = [skill.warrior_2_1(), skill.warrior_2_2()];

    skill.warrior_3_1 = function () {
        let skill = {};
        skill.id = 131;// Id
        skill.name = "破甲";// 名称
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_warrior_sunder";
        skill.detail = "击碎目标的护甲，对其造成" + skill.X + "%攻击强度的物理伤害，并使目标的物理抗性-" + dictionary_debuff.warrior_3().X + "，持续" + dictionary_debuff.warrior_3().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warrior_3());
            }
            let shield_obj = [];
            if (has_equip_shield(attacker)) {
                let mastery_percent = calculate_original_mastery(attacker);
                let shield_value = Math.round(attacker.block_value * mastery_percent / 100);
                shield_obj = [calculate_flat_shield(attacker, target, skill.name, shield_value)];
            }
            return skill_cast_result([damage_obj], [], shield_obj);
        };
        return skill;
    }

    skill.warrior_3_2 = function () {
        let skill = {};
        skill.id = 132;// Id
        skill.name = "盾牌猛击";// 名称
        skill.type = type_attack;
        skill.cooldown = 5;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 100;
        skill.Y = 150;
        skill.icon = "inv_shield_05";
        skill.detail = "持盾猛击目标，造成" + skill.X + "%攻击强度的物理伤害，并获得" + skill.Y + "%格挡值的伤害护盾。<br/>必须装备盾牌才可使用。";
        // 判断技能可用
        skill.attempt = function (attacker) {
            if (!has_equip_shield(attacker)) {
                return false;
            }
            return !skill_in_cd(attacker, skill);
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            let shield_value = Math.round(attacker.block_value * skill.Y / 100);
            let shield_obj = calculate_flat_shield(attacker, target, skill.name, shield_value);
            return skill_cast_result([damage_obj], [], [shield_obj]);
        };
        return skill;
    }
    skill[13] = [skill.warrior_3_1(), skill.warrior_3_2()];

    skill.paladin_1_1 = function () {
        let skill = {};
        skill.id = 211;// Id
        skill.name = "神圣震击";// 名称
        skill.type = type_magic;
        skill.X = 80;
        skill.Y = 50;
        skill.icon = "spell_holy_heal02";
        skill.detail = "在目标身上引发圣光爆发，对其造成" + skill.X + "%法术强度的神圣伤害，并使自己回复" + skill.Y + "%治疗强度的的生命。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let damage_percent = (attacker.magic_power * skill.X + attacker.heal_power * mastery_percent) / (attacker.magic_power * skill.X);
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X * damage_percent, type_magic, element_holy);
            let heal_obj = calculate_skill_heal(attacker, target, skill.name, skill.Y);
            return skill_cast_result([damage_obj], [heal_obj], []);
        };
        return skill;
    }

    skill.paladin_1_2 = function () {
        let skill = {};
        skill.id = 212;// Id
        skill.name = "圣疗术";// 名称
        skill.type = type_magic;
        skill.cooldown = Number.MAX_VALUE;// 冷却
        skill.priority = 99;// 优先级
        skill.X = 35;
        skill.Y = 300;
        skill.icon = "spell_holy_layonhands";
        skill.detail = "使用神圣力量使自己脱离濒死状态，回复" + skill.Y + "%治疗强度的生命。<br/>生命值低于" + skill.X + "%时可用，每场战斗限一次。";
        // 判断技能可用
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let heal_obj = calculate_skill_heal(attacker, target, skill.name, skill.Y);
            return skill_cast_result([], [heal_obj], []);
        };
        return skill;
    }
    skill[21] = [skill.paladin_1_1(), skill.paladin_1_2()];

    skill.paladin_2_1 = function () {
        let skill = {};
        skill.id = 221;// Id
        skill.name = "清算";// 名称
        skill.name_2 = "攻击";// 名称
        skill.type = type_attack;
        skill.X = 80;
        skill.Y = 80;
        skill.icon = "spell_holy_blessingofstrength";
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害，并对其进行清算，根据自己损失的生命值造成最高" + skill.Y + "%攻击强度的神圣伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_obj = calculate_skill_attack(attacker, target, skill.name_2, skill.X, type_attack, element_physical);
            damage_list.push(damage_obj);
            let damage_percent = attacker.current_health_value / attacker.max_health_value;
            if (damage_percent < 0.2) {
                damage_percent = 0.2;// 20%时到达最大伤害
            }
            damage_percent = (1 - damage_percent) / 0.8;
            let heal_list = [];
            if (damage_percent > 0) {
                damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.Y * damage_percent, type_attack, element_holy);
                damage_list.push(damage_obj);
                if (damage_obj.is_hit) {
                    let mastery_percent = calculate_original_mastery(attacker);
                    let heal_value = damage_obj.damage_value * mastery_percent * attacker.taken_heal_percent / 100 / 100;
                    heal_list = [calculate_flat_heal(attacker, target, skill.name, Math.round(heal_value))];
                }
            }
            return skill_cast_result(damage_list, heal_list, []);
        };
        return skill;
    }

    skill.paladin_2_2 = function () {
        let skill = {};
        skill.id = 222;// Id
        skill.name = "圣盾术";// 名称
        skill.type = type_other;
        skill.trigger = false;
        skill.cooldown = Number.MAX_VALUE;// 冷却
        skill.priority = 99;// 优先级
        skill.X = 35;
        skill.icon = "spell_holy_divineintervention";
        skill.detail = "使用神圣力量使自己免疫所有伤害，持续" + dictionary_buff.paladin_2_2().T + "回合。<br/>生命值低于" + skill.X + "%时可用，每场战斗限一次。";
        // 判断技能可用
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            if (attacker.current_health_value * 100 / attacker.max_health_value <= skill.X) {
                attacker.agi = Number.MAX_VALUE;// 必然先手施放
                return true;
            } else {
                return false;
            }
        }
        // 技能施放调用
        skill.cast = function (attacker) {
            attacker.taken_damage_percent -= dictionary_buff.paladin_2_2().X;// 当前回合免疫伤害
            attacker.buffs.push(new_buff().paladin_2_2());
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result([], [], []);
        };
        return skill;
    }
    skill[22] = [skill.paladin_2_1(), skill.paladin_2_2()];

    skill.paladin_3_1 = function () {
        let skill = {};
        skill.id = 231;// Id
        skill.name = "命令圣印";// 名称
        skill.name_2 = "攻击";// 名称
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 40;
        skill.Z = 80;
        skill.icon = "ability_warrior_innerrage";
        skill.detail = "将武器灌注神圣之力，对目标造成" + skill.X + "%攻击强度的物理伤害，并有" + skill.Y + "%几率额外造成" + skill.Z + "%攻击强度的神圣伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_1 = calculate_skill_attack(attacker, target, skill.name_2, skill.X, type_attack, element_physical);
            let damage_list = [damage_obj_1];
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(skill.Y + mastery_percent)) {
                let damage_obj_2 = calculate_skill_attack(attacker, target, skill.name, skill.Z, type_attack, element_holy, 999);
                damage_list.push(damage_obj_2);
            }
            return skill_cast_result(damage_list, [], []);
        };
        return skill;
    }

    skill.paladin_3_2 = function () {
        let skill = {};
        skill.id = 232;// Id
        skill.name = "愤怒之锤";// 名称
        skill.type = type_attack;
        skill.cooldown = Number.MAX_VALUE;// 冷却
        skill.priority = 99;// 优先级
        skill.X = 35;
        skill.Y = 300;
        skill.icon = "ability_thunderclap";
        skill.detail = "使用神圣力量制裁受伤的目标，造成" + skill.Y + "%攻击强度的神圣伤害，无法被闪避。<br/>目标生命值低于" + skill.X + "%时可用，每场战斗限一次。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return target.current_health_value * 100 / target.max_health_value <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_holy, 999);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[23] = [skill.paladin_3_1(), skill.paladin_3_2()];

    skill.hunter_1_1 = function () {
        let skill = {};
        skill.id = 311;// Id
        skill.name = "多重射击";// 名称
        skill.type = type_attack;
        skill.X = 30;
        skill.Y = 2;
        skill.Z = 5;
        skill.icon = "ability_upgrademoonglaive";
        skill.detail = "发射多枚箭矢，对目标造成随机" + skill.Y + "~" + skill.Z + "次" + skill.X + "%攻击强度的物理伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_count = Math.round(skill.Y + Math.random() * (skill.Z - skill.Y));
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(mastery_percent)) {
                damage_count++;
            }
            let hit_count = 0;
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
                damage_list.push(damage_obj);
                hit_count += damage_obj.is_hit ? 1 : 0;
            }
            let heal_value = Math.round(hit_count * attacker.max_health_value * dictionary_buff[31].X * attacker.taken_heal_percent / 100 / 100);
            let heal_obj = calculate_flat_heal(attacker, target, skill.name, heal_value);
            return skill_cast_result(damage_list, [heal_obj], []);
        };
        return skill;
    }

    skill.hunter_1_2 = function () {
        let skill = {};
        skill.id = 312;// Id
        skill.name = "狂野怒火";// 名称
        skill.type = type_attack;
        skill.cooldown = 4;// 冷却
        skill.first_turn = 4;// 首次施放回合
        skill.priority = 30;// 优先级
        skill.X = 75;
        skill.Y = 2;
        skill.Z = 5;
        skill.icon = "ability_druid_ferociousbite";
        skill.detail = "使自己和宠物进入狂怒状态，根据当前损失的生命值，对目标造成" + skill.Y + "~" + skill.Z + "次" + skill.X + "%攻击强度的物理伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_count;
            let hit_count = 0;
            let damage_percent = attacker.current_health_value / attacker.max_health_value;
            if (damage_percent <= 0.2) {
                damage_count = 5;
            } else if (damage_percent <= 0.45) {
                damage_count = 4;
            } else if (damage_percent <= 0.75) {
                damage_count = 3;
            } else {
                damage_count = 2;
            }
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(mastery_percent)) {
                damage_count++;
            }
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
                damage_list.push(damage_obj);
                hit_count += damage_obj.is_hit ? 1 : 0;
            }
            let heal_value = Math.round(hit_count * attacker.max_health_value * dictionary_buff[31].X * attacker.taken_heal_percent / 100 / 100);
            let heal_obj = calculate_flat_heal(attacker, target, skill.name, heal_value);
            return skill_cast_result(damage_list, [heal_obj], []);
        };
        return skill;
    }
    skill[31] = [skill.hunter_1_1(), skill.hunter_1_2()];

    skill.hunter_2_1 = function () {
        let skill = {};
        skill.id = 321;// Id
        skill.name = "奥术射击";// 名称
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_impalingbolt";
        skill.detail = "一次快速的射击，对目标造成" + skill.X + "%攻击强度的奥术伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_arcane);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                if (random_percent(mastery_percent)) {
                    damage_obj.skill_name += "(精通)";
                    let skill = dictionary_player_skill.hunter_2_2();
                    let skill_state = get_skill_state(attacker.flag, skill.id);
                    if (skill_state != null) {
                        skill_state.last_turn -= skill.cooldown;
                    }
                }
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.hunter_2_2 = function () {
        let skill = {};
        skill.id = 322;// Id
        skill.name = "瞄准射击";// 名称
        skill.type = type_attack;
        skill.cooldown = 5;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 120;
        skill.Y = 200;
        skill.icon = "inv_spear_07";
        skill.detail = "精确瞄准后进行一次强力的射击，对目标造成" + skill.X + "%攻击强度的物理伤害，该伤害根据战斗回合数最多提高" + skill.Y + "%。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_percent = battle_turn / 5;
            if (damage_percent > skill.Y / 100) {
                damage_percent = skill.Y / 100;
            }
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X * (1 + damage_percent), type_attack, element_physical);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[32] = [skill.hunter_2_1(), skill.hunter_2_2()];

    skill.hunter_3_1 = function () {
        let skill = {};
        skill.id = 331;// Id
        skill.name = "猛禽一击";// 名称
        skill.type = type_attack;
        skill.X = 80;
        skill.Y = 100;
        skill.icon = "inv_sword_05";
        skill.detail = "一次强力的攻击，对目标造成" + skill.X + "%攻击强度的物理伤害。该次攻击的伤害、命中率和暴击率提高闪避率的" + skill.Y + "%。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let dodge = calculate_original_dodge(attacker);
            let mastery_percent = calculate_original_mastery(attacker);
            dodge *= (skill.Y + mastery_percent) / skill.Y;
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X * (1 + dodge * skill.Y / 100 / 100), type_attack, element_physical, dodge * skill.Y / 100, dodge * skill.Y / 100);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.hunter_3_2 = function () {
        let skill = {};
        skill.id = 332;// Id
        skill.name = "爆炸陷阱";// 名称
        skill.type = type_attack;
        skill.cooldown = 5;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 50;
        skill.Y = 50;
        skill.icon = "spell_fire_selfdestruct";
        skill.detail = "使目标落入火焰陷阱，造成" + skill.X + "%攻击强度的火焰伤害，并使其每回合受到" + skill.Y + "%攻击强度的火焰伤害，持续" + dictionary_dot.hunter_3().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_fire);
            if (damage_obj_x.is_hit) {
                let dot_damage = calculate_dot_base_damage(attacker, target, skill.Y, type_attack);
                target.dots.push(new_dot().hunter_3(dot_damage));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }
    skill[33] = [skill.hunter_3_1(), skill.hunter_3_2()];

    skill.druid_1_1 = function () {
        let skill = {};
        skill.id = 511;// Id
        skill.name = "月火术";// 名称
        skill.type = type_magic;
        skill.cooldown = 2;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 40;
        skill.Y = 40;
        skill.icon = "spell_nature_starfall";
        skill.detail = "召唤一束月光灼烧敌人，造成" + skill.X + "%法术强度的奥术伤害，并使其每回合受到" + skill.Y + "%法术强度的奥术伤害，持续" + dictionary_dot.druid_1_1().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = calculate_skill_attack(attacker, target, skill.name, skill.X, type_magic, element_arcane);
            if (damage_obj_x.is_hit) {
                let dot_damage = calculate_dot_base_damage(attacker, target, skill.Y, type_magic);
                let mastery_percent = calculate_original_mastery(attacker);
                dot_damage *= (100 + mastery_percent) / 100;
                target.dots.push(new_dot().druid_1_1(dot_damage));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }

    skill.druid_1_2 = function () {
        let skill = {};
        skill.id = 512;// Id
        skill.name = "阳炎术";// 名称
        skill.type = type_magic;
        skill.cooldown = 2;// 冷却
        skill.first_turn = 2;// 首次释放回合
        skill.priority = 30;// 优先级
        skill.X = 40;
        skill.Y = 40;
        skill.icon = "ability_mage_firestarter";
        skill.detail = "召唤一束日光灼烧敌人，造成" + skill.X + "%法术强度的自然伤害，并使其每回合受到" + skill.Y + "%法术强度的自然伤害，持续" + dictionary_dot.druid_1_2().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = calculate_skill_attack(attacker, target, skill.name, skill.X, type_magic, element_natural);
            if (damage_obj_x.is_hit) {
                let dot_damage = calculate_dot_base_damage(attacker, target, skill.Y, type_magic);
                let mastery_percent = calculate_original_mastery(attacker);
                dot_damage *= (100 + mastery_percent) / 100;
                target.dots.push(new_dot().druid_1_2(dot_damage));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }
    skill[51] = [skill.druid_1_1(), skill.druid_1_2()];

    skill.druid_2_1 = function () {
        let skill = {};
        skill.id = 521;// Id
        skill.name = "扫击";// 名称
        skill.type = type_attack;
        skill.X = 40;
        skill.Y = 30;
        skill.icon = "ability_druid_disembowel";
        skill.detail = "撕裂目标，造成" + skill.X + "%攻击强度的物理伤害，并使其每回合受到" + skill.Y + "%攻击强度的物理伤害，持续" + dictionary_dot.druid_2().T + "回合。命中时获得一个连击点。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            if (damage_obj_x.is_hit) {
                let dot_damage = calculate_dot_base_damage(attacker, target, skill.Y, type_attack);
                target.dots.push(new_dot().druid_2(dot_damage));
                add_skill_point(attacker, 1);
                damage_obj_x.skill_name += "(" + get_skill_point(attacker) + ")";
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }

    skill.druid_2_2 = function () {
        let skill = {};
        skill.id = 522;// Id
        skill.name = "凶猛撕咬";// 名称
        skill.type = type_attack;
        skill.cooldown = 4;// 冷却
        skill.first_turn = 4;// 首次释放回合
        skill.priority = 30;// 优先级
        skill.X = 100;
        skill.Y = 30;
        skill.icon = "ability_druid_ferociousbite";
        skill.detail = "终结技，撕咬目标造成" + skill.X + "%攻击强度的物理伤害。每个消耗的连击点使总伤害提高" + skill.Y + "%。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            // 计算连击加成
            let damage_count = get_skill_point(attacker);
            let mastery_percent = calculate_original_mastery(attacker);
            let damage_obj = calculate_skill_attack(attacker, target, skill.name + "(" + damage_count + ")", skill.X + (skill.Y + mastery_percent) * damage_count, type_attack, element_physical);
            if (damage_obj.is_hit) {
                set_skill_point(attacker, 0);
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[52] = [skill.druid_2_1(), skill.druid_2_2()];

    skill.druid_3_1 = function () {
        let skill = {};
        skill.id = 531;// Id
        skill.name = "槌击";// 名称
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 50;
        skill.icon = "ability_druid_maul";
        skill.detail = "重殴目标，造成" + skill.X + "%攻击强度的物理伤害，并根据造成的伤害获得怒气。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            let shield_obj = [];
            if (damage_obj.damage_value > 0) {
                let rage = Math.round(100 * damage_obj.damage_value / attacker.max_health_value);
                if (rage > 0) {
                    add_skill_point(attacker, rage);
                    if (get_skill_point(attacker) > 100) {
                        set_skill_point(attacker, 100);
                    }
                    damage_obj.skill_name += "(" + get_skill_point(attacker) + ")";
                }
                let mastery_percent = calculate_original_mastery(attacker);
                let shield_value = Math.round(damage_obj.damage_value * mastery_percent / 100);
                shield_obj = [calculate_flat_shield(attacker, target, skill.name, shield_value)];
            }
            return skill_cast_result(damage_obj, [], shield_obj);
        };
        return skill;
    }

    skill.druid_3_2 = function () {
        let skill = {};
        skill.id = 532;// Id
        skill.name = "狂暴回复";// 名称
        skill.type = type_other;
        skill.trigger = false;
        skill.cooldown = 5;// 冷却
        skill.first_turn = 3;// 首次施放回合
        skill.priority = 30;// 优先级
        skill.X = 70;
        skill.Y = 0.5;
        skill.icon = "ability_bullrush";
        skill.detail = "将全部怒气转化为生命，每点消耗的怒气回复" + skill.Y + "%最大生命值。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return get_skill_point(attacker) > 0 && attacker.current_health_value * 100 / attacker.max_health_value <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            // 计算怒气加成
            let damage_count = get_skill_point(attacker);
            let heal_value = target.max_health_value * damage_count * skill.Y / 100;
            let heal_obj = calculate_flat_heal(attacker, target, skill.name, Math.round(heal_value));
            set_skill_point(attacker, 0);
            heal_obj.skill_name += "(" + damage_count + ")";
            return skill_cast_result([], [heal_obj], []);
        };
        return skill;
    }
    skill[53] = [skill.druid_3_1(), skill.druid_3_2()];

    skill.druid_4_1 = function () {
        let skill = {};
        skill.id = 541;// Id
        skill.name = "愤怒";// 名称
        skill.name_2 = "自然之力";// 名称
        skill.type = type_magic;
        skill.N = 3;
        skill.X = 60;
        skill.icon = "spell_nature_abolishmagic";
        skill.detail = "向目标投掷一个能量球，造成" + skill.Y + "%法术强度的自然伤害。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            new_player_skill().druid_4_3().cast(attacker, target);
            return !skill_in_cd(attacker, skill);
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_magic, element_natural);
            return skill_cast_result(damage_obj, [], []);
        }
        return skill;
    }

    skill.druid_4_2 = function () {
        let skill = {};
        skill.id = 542;// Id
        skill.name = "愈合";// 名称
        skill.name_2 = "自然之力";// 名称
        skill.type = type_magic;
        skill.cooldown = 5;// 冷却
        skill.priority = 30;// 优先级
        skill.N = 3;
        skill.X = 70;
        skill.Y = 50;
        skill.Z = 10;
        skill.icon = "spell_nature_resistnature";
        skill.detail = "使用自然力量愈合伤口，回复" + skill.Y + "%治疗强度的生命，之后每回合回复" + skill.Z + "%治疗强度的生命，持续" + dictionary_dot.druid_4_2().T + "回合。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            new_player_skill().druid_4_3().cast(attacker, target);
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let heal_obj_1 = calculate_skill_heal(attacker, target, skill.name, skill.Y);
            let heal_obj_2 = calculate_hot_base_heal(attacker, skill.Z);
            attacker.dots.push(new_dot().druid_4_2(heal_obj_2));
            return skill_cast_result([], [heal_obj_1], []);
        };
        return skill;
    }
    skill[54] = [skill.druid_4_1(), skill.druid_4_2()];


    skill.druid_4_3 = function () {
        let skill = {};
        skill.id = 543;// Id
        skill.name = "自然之力";// 名称
        skill.type = type_other;
        skill.priority = 99;// 优先级
        skill.X = 3;
        skill.icon = "ability_druid_forceofnature";
        skill.detail = "战斗开始时召唤3个树人，每个树人每回合根据精通等级从敌方吸取生命。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            if (get_skill_point(attacker) === 0) {
                set_skill_point(attacker, skill.X);
                let mastery_percent = calculate_original_mastery(attacker);
                let dot_damage = calculate_dot_base_damage(attacker, target, mastery_percent, type_heal);
                for (let i = 0; i < skill.X; i++) {
                    target.dots.push(new_dot().druid_4_1(dot_damage));
                }
                battle_log(attacker.name + " 施放了 " + skill.name);
            }
            return skill_cast_result([], [], []);
        };
        return skill;
    }

    skill.mage_1_1 = function () {
        let skill = {};
        skill.id = 911;// Id
        skill.name = "奥术飞弹";// 名称
        skill.type = type_magic;
        skill.X = 5;
        skill.Y = 20;
        skill.Z = 10;
        skill.icon = "spell_nature_starfall";
        skill.detail = "向目标射出" + skill.X + "发奥术飞弹，每发造成" + skill.Y + "%法术强度的奥术伤害并消耗一层奥术强化，施放时每层奥术强化使伤害提高" + skill.Z + "%。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (battle_turn === 1) {
                new_player_skill().mage_1_2().cast(attacker, target);
            }
            return !skill_in_cd(attacker, skill);
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let skill_1_2 = new_player_skill().mage_1_2();
            let damage_list = [];
            for (let i = 0; i < skill.X; i++) {
                let point = get_skill_point(attacker);
                if (point > 0) {
                    add_skill_point(attacker, -1);
                }
                let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.Y * (1 + point * skill_1_2.Y / 100), type_magic, element_arcane, 0, skill.Y);
                damage_obj.skill_name += "(" + point + ")";
                damage_list.push(damage_obj);
            }
            return skill_cast_result(damage_list, [], []);
        };
        return skill;
    }

    skill.mage_1_2 = function () {
        let skill = {};
        skill.id = 912;// Id
        skill.name = "唤醒";// 名称
        skill.type = type_other;
        skill.cooldown = 4;// 冷却
        skill.first_turn = 4;// 首次施放回合
        skill.priority = 30;// 优先级
        skill.X = 10;
        skill.Y = 5;
        skill.icon = "spell_nature_purge";
        skill.detail = "聚集奥术能量，获得" + skill.X + "层奥术强化并回复" + (skill.X * 2) + "%最大生命值。战斗开始时自动施放一次。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let point = skill.X;
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(mastery_percent)) {
                point += skill.Y;
            }
            add_skill_point(attacker, point);
            battle_log(attacker.name + " 施放了 " + skill.name + "(" + get_skill_point(attacker) + ")");
            let heal_value = attacker.max_health_value * point * 2 / 100;
            let heal_obj = calculate_flat_heal(attacker, target, skill.name, Math.round(heal_value));
            return skill_cast_result([], [heal_obj], []);
        };
        return skill;
    }
    skill[91] = [skill.mage_1_1(), skill.mage_1_2()];

    skill.mage_2_1 = function () {
        let skill = {};
        skill.id = 921;// Id
        skill.name = "火球术";// 名称
        skill.type = type_magic;
        skill.X = 100;
        skill.icon = "spell_fire_flamebolt";
        skill.detail = "发射一枚火球攻击目标，造成" + skill.X + "%法术强度的火焰伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_magic, element_fire);
            if (damage_obj.is_critical) {
                add_skill_point(attacker, 1);
                let battle_buffs = attacker.buffs;
                if (battle_buffs != null && battle_buffs.length > 0) {
                    for (let i = 0; i < battle_buffs.length; i++) {
                        if (battle_buffs[i].id === dictionary_buff.mage_2_2().id) {
                            battle_buffs.splice(i, 1);
                            i--;
                        }
                    }
                }
            } else {
                let mastery_percent = calculate_original_mastery(attacker);
                attacker.buffs.push(new_buff().mage_2_2(mastery_percent.toFixed(2)));
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.mage_2_2 = function () {
        let skill = {};
        skill.id = 922;// Id
        skill.name = "炎爆术";// 名称
        skill.type = type_magic;
        skill.priority = 30;// 优先级
        skill.X = 200;
        skill.icon = "spell_fire_fireball02";
        skill.detail = "火焰法术暴击后可用，发射一枚巨大的火球，对目标造成" + skill.X + "%法术强度的火焰伤害。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return get_skill_point(attacker) > 0;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            set_skill_point(attacker, 0);
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_magic, element_fire);
            if (damage_obj.is_critical) {
                add_skill_point(attacker, 1);
                let battle_buffs = attacker.buffs;
                if (battle_buffs != null && battle_buffs.length > 0) {
                    for (let i = 0; i < battle_buffs.length; i++) {
                        if (battle_buffs[i].id === dictionary_buff.mage_2_2().id) {
                            battle_buffs.splice(i, 1);
                            i--;
                        }
                    }
                }
            } else {
                let mastery_percent = calculate_original_mastery(attacker);
                attacker.buffs.push(new_buff().mage_2_2(mastery_percent.toFixed(2)));
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[92] = [skill.mage_2_1(), skill.mage_2_2()];

    skill.mage_3_1 = function () {
        let skill = {};
        skill.id = 931;// Id
        skill.name = "寒冰箭";// 名称
        skill.type = type_magic;
        skill.X = 100;
        skill.icon = "spell_frost_frostbolt02";
        skill.detail = "向敌人射出一支寒冰箭，造成" + skill.X + "%法术强度的冰霜伤害，并使其造成的伤害降低" + dictionary_debuff.mage_3().X + "%，持续" + dictionary_debuff.mage_3().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill_attack(attacker, target, skill.name, skill.X, type_magic, element_frost, 0, skill.Y);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                target.debuffs.push(new_debuff().mage_3(dictionary_debuff.mage_3().X + mastery_percent));
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.mage_3_2 = function () {
        let skill = {};
        skill.id = 932;// Id
        skill.name = "寒冰护体";// 名称
        skill.type = type_other;
        skill.cooldown = 5;// 冷却
        skill.priority = 30;// 优先级
        skill.speed = 1;// 施放速度
        skill.X = 100;
        skill.icon = "spell_ice_lament";
        skill.detail = "召唤寒冰护盾围绕自己，获得" + skill.X + "%法术强度的伤害护盾。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let shield_value = Math.round(attacker.magic_power * skill.X / 100);
            let shield_obj = calculate_flat_shield(attacker, target, skill.name, shield_value);
            return skill_cast_result([], [], [shield_obj]);
        };
        return skill;
    }
    skill[93] = [skill.mage_3_1(), skill.mage_3_2()];

    return skill;
}
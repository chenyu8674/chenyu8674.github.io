/** 技能一览 **/
let dictionary_player_skill;
$(document).ready(function () {
    dictionary_player_skill = new_player_skill();
});

/**
 * 优先级 0触发 10低 20中 30高 50特殊 99强制
 */

function new_player_skill() {
    let skill = {};

    skill.warrior_1_1 = function () {
        let skill = {};
        skill.name = "致死打击";
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_warrior_savageblow";
        skill.detail = "一次邪恶的攻击，对目标造成" + skill.X + "%攻击强度的物理伤害，并使其受到的治疗降低" + dictionary_debuff.warrior_1().X + "%，持续" + dictionary_debuff.warrior_1().T + "回合。";
        skill.cast = function (attacker, target) {
            let extra_hit = 0;
            if (get_skill_point(attacker) > 0) {
                // 已在压制流程中判定为命中
                extra_hit = 999;
                set_skill_point(attacker, 0);
            }
            let damage_list = [];
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical, extra_hit);
            damage_list.push(damage_obj);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warrior_1());
                let mastery_percent = calculate_original_mastery(attacker);
                if (has_equip_two_hand_weapon(attacker) && random_percent(mastery_percent)) {
                    let skill = dictionary_player_skill.warrior_1_2();
                    let damage_obj_2 = calculate_skill(attacker, target, skill.name + "(精通)", skill.X, skill.type, element_physical, 999, skill.Y, -999);
                    damage_list.push(damage_obj_2);
                }
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    }

    skill.warrior_1_2 = function () {
        let skill = {};
        skill.name = "压制";
        skill.type = type_attack;
        skill.cooldown = 3;
        skill.priority = 30;
        skill.X = 150;
        skill.Y = 25;
        skill.icon = "ability_meleedamage";
        skill.detail = "攻击被目标闪避后立刻对其进行压制，造成" + skill.X + "%攻击强度的物理伤害，无法被闪避或格挡，且暴击率提高" + skill.Y + "%。";
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;
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
        skill.cast = function (attacker, target) {
            battle_log(target.name + " 闪避了 " + attacker.name + " 的攻击");
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical, 999, skill.Y, -999);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[11] = [skill.warrior_1_1(), skill.warrior_1_2()];

    skill.warrior_2_1 = function () {
        let skill = {};
        skill.name = "嗜血";
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 20;
        skill.icon = "spell_nature_bloodlust";
        skill.detail = "在嗜血的狂乱中攻击目标，对其造成" + skill.X + "%攻击强度的物理伤害，并使自己回复造成伤害" + skill.Y + "%的生命。";
        skill.cast = function (attacker, target) {
            let damage_percent = get_health_lack_percent(attacker);
            let mastery_percent = calculate_original_mastery(attacker);
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X * (100 + mastery_percent * damage_percent) / 100, skill.type, element_physical);
            let heal_obj = null;
            if (damage_obj.is_hit) {
                let heal_value = damage_obj.damage_value * skill.Y / 100;
                heal_obj = calculate_flat_heal(attacker, attacker, skill.name, Math.round(heal_value));
            }
            return skill_cast_result(damage_obj, heal_obj);
        };
        return skill;
    }

    skill.warrior_2_2 = function () {
        let skill = {};
        skill.name = "斩杀";
        skill.type = type_attack;
        skill.priority = 99;
        skill.X = 150;
        skill.Y = 50;
        skill.icon = "inv_sword_48";
        skill.detail = "尝试终结受伤的目标，对其造成" + skill.X + "%攻击强度的物理伤害，且暴击率提高" + skill.Y + "%。仅能在目标生命值低于" + THRESHOLD_EXECUTE + "%时使用。";
        skill.attempt = function (attacker, target) {
            return target.current_health_value * 100 / target.max_health_value <= THRESHOLD_EXECUTE;
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical, 0, skill.Y);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[12] = [skill.warrior_2_1(), skill.warrior_2_2()];

    skill.warrior_3_1 = function () {
        let skill = {};
        skill.name = "破甲";
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_warrior_sunder";
        skill.detail = "击碎目标的护甲，对其造成" + skill.X + "%攻击强度的物理伤害，并使目标的物理抗性-" + dictionary_debuff.warrior_3().X + "，持续" + dictionary_debuff.warrior_3().T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warrior_3());
            }
            let shield_obj = [];
            if (has_equip_shield(attacker)) {
                let mastery_percent = calculate_original_mastery(attacker);
                let shield_value = Math.round(attacker.block_value * mastery_percent / 100);
                shield_obj = [calculate_flat_shield(attacker, attacker, skill.name, shield_value)];
            }
            return skill_cast_result(damage_obj, null, shield_obj);
        };
        return skill;
    }

    skill.warrior_3_2 = function () {
        let skill = {};
        skill.name = "盾牌猛击";
        skill.type = type_attack;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 100;
        skill.icon = "inv_shield_05";
        skill.detail = "持盾猛击目标，造成" + skill.X + "%攻击强度的物理伤害，并获得" + skill.Y + "%格挡值的伤害护盾。必须装备盾牌才可使用。";
        skill.attempt = function (attacker) {
            if (!has_equip_shield(attacker)) {
                return false;
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            let shield_value = Math.round(attacker.block_value * skill.Y / 100);
            let shield_obj = calculate_flat_shield(attacker, attacker, skill.name, shield_value);
            return skill_cast_result(damage_obj, null, shield_obj);
        };
        return skill;
    }
    skill[13] = [skill.warrior_3_1(), skill.warrior_3_2()];

    skill.paladin_1_1 = function () {
        let skill = {};
        skill.name = "神圣震击";
        skill.type = type_magic;
        skill.X = 80;
        skill.Y = 20;
        skill.icon = "spell_holy_heal02";
        skill.detail = "在目标身上引发圣光爆发，对其造成" + skill.X + "%法术强度的神圣伤害，并为自己回复" + skill.Y + "%治疗强度的的生命。";
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let damage_percent = (attacker.magic_power * skill.X + attacker.heal_power * mastery_percent) / (attacker.magic_power * skill.X);
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X * damage_percent, skill.type, element_holy);
            let heal_obj = calculate_heal(attacker, attacker, skill.name, skill.Y);
            return skill_cast_result(damage_obj, heal_obj);
        };
        return skill;
    }

    skill.paladin_1_2 = function () {
        let skill = {};
        skill.name = "圣疗术";
        skill.type = type_heal;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 99;
        skill.X = 300;
        skill.icon = "spell_holy_layonhands";
        skill.detail = "使用神圣力量使自己脱离濒死状态，回复" + skill.X + "%治疗强度的生命。生命值低于" + THRESHOLD_EXECUTE + "%时可用，每场战斗限一次。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= THRESHOLD_EXECUTE;
        }
        skill.cast = function (attacker) {
            let heal_obj = calculate_heal(attacker, attacker, skill.name, skill.X);
            return skill_cast_result(null, heal_obj);
        };
        return skill;
    }
    skill[21] = [skill.paladin_1_1(), skill.paladin_1_2()];

    skill.paladin_2_1 = function () {
        let skill = {};
        skill.name = "清算";
        skill.name_2 = "攻击";
        skill.type = type_attack;
        skill.X = 80;
        skill.Y = 80;
        skill.icon = "spell_holy_blessingofstrength";
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害，同时对其进行清算，根据损失的生命值造成最高" + skill.Y + "%攻击强度的神圣伤害。";
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_obj = calculate_skill(attacker, target, skill.name_2, skill.X, skill.type, element_physical);
            damage_list.push(damage_obj);
            let damage_percent = get_health_lack_percent(attacker);
            let shield_obj;
            if (damage_percent > 0) {
                damage_obj = calculate_skill(attacker, target, skill.name, skill.Y * damage_percent, skill.type, element_holy);
                damage_list.push(damage_obj);
                if (damage_obj.is_hit) {
                    let mastery_percent = calculate_original_mastery(attacker);
                    let shield_value = Math.round(damage_obj.damage_value * mastery_percent / 100);
                    shield_obj = [calculate_flat_shield(attacker, attacker, skill.name, shield_value)];
                }
            }
            return skill_cast_result(damage_list, shield_obj);
        };
        return skill;
    }

    skill.paladin_2_2 = function () {
        let skill = {};
        skill.name = "圣盾术";
        skill.type = type_other;
        skill.trigger = false;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 99;
        skill.speed = 5;
        skill.icon = "spell_holy_divineintervention";
        skill.detail = "使用神圣力量使自己免疫所有伤害，持续" + dictionary_buff.paladin_2_2().T + "回合。生命值低于" + THRESHOLD_EXECUTE + "%时可用，每场战斗限一次。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= THRESHOLD_EXECUTE;
        }
        skill.cast = function (attacker) {
            attacker.taken_damage_percent -= dictionary_buff.paladin_2_2().X;// 当前回合免疫伤害
            attacker.buffs.push(new_buff().paladin_2_2());
            battle_log(attacker.name + " 施放了 " + skill.name);
            return skill_cast_result();
        };
        return skill;
    }
    skill[22] = [skill.paladin_2_1(), skill.paladin_2_2()];

    skill.paladin_3_1 = function () {
        let skill = {};
        skill.name = "命令圣印";
        skill.name_2 = "攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 40;
        skill.Z = 80;
        skill.icon = "ability_warrior_innerrage";
        skill.detail = "将武器灌注神圣之力，对目标造成" + skill.X + "%攻击强度的物理伤害，并有" + skill.Y + "%几率额外造成" + skill.Z + "%攻击强度的神圣伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj_1 = calculate_skill(attacker, target, skill.name_2, skill.X, skill.type, element_physical);
            let damage_list = [damage_obj_1];
            let mastery_percent = calculate_original_mastery(attacker);
            if (damage_obj_1.is_hit && random_percent(skill.Y + mastery_percent)) {
                let damage_obj_2 = calculate_skill(attacker, target, skill.name, skill.Z, skill.type, element_holy, 999);
                damage_list.push(damage_obj_2);
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    }

    skill.paladin_3_2 = function () {
        let skill = {};
        skill.name = "愤怒之锤";
        skill.type = type_attack;
        skill.cooldown = Number.MAX_VALUE;
        skill.priority = 99;
        skill.X = 300;
        skill.icon = "ability_thunderclap";
        skill.detail = "使用神圣力量制裁受伤的目标，造成" + skill.X + "%攻击强度的神圣伤害，无法被闪避和格挡。目标生命值低于" + THRESHOLD_EXECUTE + "%时可用，每场战斗限一次。";
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return target.current_health_value * 100 / target.max_health_value <= THRESHOLD_EXECUTE;
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_holy, 999, 0, -999);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[23] = [skill.paladin_3_1(), skill.paladin_3_2()];

    skill.hunter_1_1 = function () {
        let skill = {};
        skill.name = "多重射击";
        skill.type = type_attack;
        skill.X = 30;
        skill.Y = 2;
        skill.Z = 5;
        skill.icon = "ability_upgrademoonglaive";
        skill.detail = "发射多枚箭矢，对目标造成随机" + skill.Y + "~" + skill.Z + "次" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_count = Math.round(skill.Y + Math.random() * (skill.Z - skill.Y));
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(mastery_percent)) {
                damage_count++;
            }
            let hit_count = 0;
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
                damage_list.push(damage_obj);
                hit_count += damage_obj.is_hit ? 1 : 0;
            }
            let heal_value = Math.round(hit_count * attacker.max_health_value * dictionary_buff[31].X / 100);
            let heal_obj = calculate_flat_heal(attacker, attacker, skill.name, heal_value);
            return skill_cast_result(damage_list, heal_obj);
        };
        return skill;
    }

    skill.hunter_1_2 = function () {
        let skill = {};
        skill.name = "狂野怒火";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 75;
        skill.Y = 5;
        skill.icon = "ability_druid_ferociousbite";
        skill.detail = "使自己和宠物进入狂怒状态，根据当前损失的生命值对目标造成最多" + skill.Y + "次" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_count;
            let hit_count = 0;
            let damage_percent = attacker.current_health_value / attacker.max_health_value;
            damage_count = skill.Z - Math.floor(damage_percent / 0.25);
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(mastery_percent)) {
                damage_count++;
            }
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
                damage_list.push(damage_obj);
                hit_count += damage_obj.is_hit ? 1 : 0;
            }
            let heal_value = Math.round(hit_count * attacker.max_health_value * dictionary_buff[31].X / 100);
            let heal_obj = calculate_flat_heal(attacker, attacker, skill.name, heal_value);
            return skill_cast_result(damage_list, heal_obj);
        };
        return skill;
    }
    skill[31] = [skill.hunter_1_1(), skill.hunter_1_2()];

    skill.hunter_2_1 = function () {
        let skill = {};
        skill.name = "奥术射击";
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_impalingbolt";
        skill.detail = "一次快速的射击，对目标造成" + skill.X + "%攻击强度的奥术伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_arcane);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                if (random_percent(mastery_percent)) {
                    damage_obj.skill_name += "(精通)";
                    let skill = dictionary_player_skill.hunter_2_2();
                    let skill_state = get_skill_state(attacker.flag, skill.name);
                    if (skill_state != null) {
                        skill_state.last_turn -= skill.cooldown;
                    }
                }
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.hunter_2_2 = function () {
        let skill = {};
        skill.name = "瞄准射击";
        skill.type = type_attack;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 120;
        skill.Y = 200;
        skill.icon = "inv_spear_07";
        skill.detail = "精确瞄准后进行一次强力的射击，对目标造成" + skill.X + "%攻击强度的物理伤害，该伤害根据战斗回合数最多提高" + skill.Y + "%。";
        skill.cast = function (attacker, target) {
            let damage_percent = battle_turn / 5;
            if (damage_percent > skill.Y / 100) {
                damage_percent = skill.Y / 100;
            }
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X * (1 + damage_percent), skill.type, element_physical);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[32] = [skill.hunter_2_1(), skill.hunter_2_2()];

    skill.hunter_3_1 = function () {
        let skill = {};
        skill.name = "猛禽一击";
        skill.type = type_attack;
        skill.X = 80;
        skill.Y = 100;
        skill.icon = "inv_sword_05";
        skill.detail = "一次强力的攻击，对目标造成" + skill.X + "%攻击强度的物理伤害。该次攻击的伤害、命中率和暴击率提高闪避率的" + skill.Y + "%。";
        skill.cast = function (attacker, target) {
            let dodge = calculate_original_dodge(attacker);
            let mastery_percent = calculate_original_mastery(attacker);
            dodge *= (skill.Y + mastery_percent) / skill.Y;
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X * (1 + dodge * skill.Y / 100 / 100), skill.type, element_physical, dodge * skill.Y / 100, dodge * skill.Y / 100);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.hunter_3_2 = function () {
        let skill = {};
        skill.name = "爆炸陷阱";
        skill.type = type_attack;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 50;
        skill.Y = 50;
        skill.T = 4;
        skill.icon = "spell_fire_selfdestruct";
        skill.detail = "使目标落入火焰陷阱，造成" + skill.X + "%攻击强度的火焰伤害，并使其每回合受到" + skill.Y + "%攻击强度的火焰伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.Y, skill.type, element_fire, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[33] = [skill.hunter_3_1(), skill.hunter_3_2()];

    skill.shaman_1_1 = function () {
        let skill = {};
        skill.name = "元素震击";
        skill.name_1 = "地震术";
        skill.name_2 = "冰霜震击";
        skill.name_3 = "烈焰震击";
        skill.type = type_magic;
        skill.X = 100;
        skill.Y = 10;
        skill.T = 3;
        skill.icon = "spell_nature_elementalprecision_1";
        skill.detail = "依次对目标造成" + skill.X + "%法术强度的自然/冰霜/火焰伤害，并附加抗性降低/伤害降低/点燃效果。";
        skill.cast = function (attacker, target) {
            let damage_count = get_skill_point(attacker);
            let damage_obj;
            if (damage_count % 3 === 0) {
                damage_obj = calculate_skill(attacker, target, skill.name_1, skill.X, skill.type, element_natural);
                if (damage_obj.is_hit) {
                    target.debuffs.push(new_debuff().shaman_1_1(skill.Y));
                }
            }
            if (damage_count % 3 === 1) {
                damage_obj = calculate_skill(attacker, target, skill.name_2, skill.X, skill.type, element_frost);
                if (damage_obj.is_hit) {
                    target.debuffs.push(new_debuff().shaman_1_2(skill.Y));
                }
            }
            if (damage_count % 3 === 2) {
                damage_obj = calculate_skill(attacker, target, skill.name_3, skill.X, skill.type, element_fire);
                if (damage_obj.is_hit) {
                    target.dots.push(new_dot().dot(skill.name_3, skill.icon, skill.Y, skill.type, element_fire, skill.T));
                }
            }
            add_skill_point(attacker, 1);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.shaman_1_2 = function () {
        let skill = {};
        skill.name = "元素掌握";
        skill.name_1 = "地震术";
        skill.name_2 = "冰霜震击";
        skill.name_3 = "烈焰震击";
        skill.type = type_magic;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.icon = "spell_nature_wispheal";
        skill.detail = "凝聚元素之力，同时释放所有种类的元素震击，不会造成附加效果。";
        skill.attempt = function (attacker, target) {
            if (battle_turn === 1) {
                // 灼热图腾
                let buff = dictionary_buff.shaman_1();
                target.dots.push(new_dot().dot(buff.name, buff.icon, buff.X, type_magic, element_fire, buff.T));
                battle_log(attacker.name + " 施放了 " + buff.name);
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            let damage_list = [];
            damage_list.push(calculate_skill(attacker, target, skill.name_1, skill.X, skill.type, element_natural));
            damage_list.push(calculate_skill(attacker, target, skill.name_2, skill.X, skill.type, element_frost));
            damage_list.push(calculate_skill(attacker, target, skill.name_3, skill.X, skill.type, element_fire));
            return skill_cast_result(damage_list);
        };
        return skill;
    };
    skill[41] = [skill.shaman_1_1(), skill.shaman_1_2()];

    skill.shaman_2_1 = function () {
        let skill = {};
        skill.name = "风怒打击";
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "spell_nature_cyclone";
        skill.detail = "以狂怒之力打击目标，造成" + skill.X + "%攻击强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let windfury_percent = dictionary_buff.shaman_2().X + mastery_percent;
            let damage_list = [];
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            damage_list.push(damage_obj);
            while (random_percent(windfury_percent)) {
                damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
                damage_list.push(damage_obj);
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    };

    skill.shaman_2_2 = function () {
        let skill = {};
        skill.name = "风暴打击";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.icon = "spell_holy_sealofmight";
        skill.detail = "以雷暴之力打击目标，造成2次" + skill.X + "%攻击强度的自然伤害。";
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let windfury_percent = dictionary_buff.shaman_2().X + mastery_percent;
            let damage_list = [];
            let damage_obj_1 = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            damage_list.push(damage_obj_1);
            let damage_obj_2 = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            damage_list.push(damage_obj_2);
            while (random_percent(windfury_percent)) {
                damage_obj_1 = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
                damage_list.push(damage_obj_1);
            }
            while (random_percent(windfury_percent)) {
                damage_obj_2 = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
                damage_list.push(damage_obj_2);
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    };
    skill[42] = [skill.shaman_2_1(), skill.shaman_2_2()];

    skill.shaman_3_1 = function () {
        let skill = {};
        skill.name = "闪电箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.icon = "spell_nature_lightning";
        skill.detail = "向目标射出闪电箭，造成" + skill.X + "%法术强度的自然伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.shaman_3_2 = function () {
        let skill = {};
        skill.name = "治疗波";
        skill.type = type_heal;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 120;
        skill.icon = "spell_nature_magicimmunity";
        skill.detail = "施放高效的治疗能量波，回复" + skill.X + "%治疗强度的的生命。";
        skill.attempt = function (attacker) {
            if (battle_turn === 1) {
                // 治疗之泉图腾
                let buff = dictionary_buff.shaman_3();
                attacker.dots.push(new_dot().hot(buff.name, buff.icon, buff.X, type_heal, element_natural, buff.T));
                battle_log(attacker.name + " 施放了 " + buff.name);
            }
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return attacker.current_health_value * 100 / attacker.max_health_value <= THRESHOLD_HEAL;
        }
        skill.cast = function (attacker) {
            let heal_obj = calculate_heal(attacker, attacker, skill.name, skill.X);
            let mastery_percent = calculate_original_mastery(attacker);
            attacker.buffs.push(new_buff().shaman_3_2(mastery_percent));
            return skill_cast_result([], heal_obj);
        };
        return skill;
    };
    skill[43] = [skill.shaman_3_1(), skill.shaman_3_2()];

    skill.druid_1_1 = function () {
        let skill = {};
        skill.name = "月火术";
        skill.type = type_magic;
        skill.cooldown = 2;
        skill.priority = 30;
        skill.X = 40;
        skill.Y = 40;
        skill.T = 2;
        skill.icon = "spell_nature_starfall";
        skill.detail = "召唤一束月光灼烧目标，造成" + skill.X + "%法术强度的奥术伤害，并使其每回合受到" + skill.Y + "%法术强度的奥术伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_arcane);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.Y * (100 + mastery_percent) / 100, skill.type, element_arcane, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.druid_1_2 = function () {
        let skill = {};
        skill.name = "阳炎术";
        skill.type = type_magic;
        skill.cooldown = 2;
        skill.first_turn = 2;
        skill.priority = 30;
        skill.X = 40;
        skill.Y = 40;
        skill.T = 2;
        skill.icon = "ability_mage_firestarter";
        skill.detail = "召唤一束日光灼烧目标，造成" + skill.X + "%法术强度的自然伤害，并使其每回合受到" + skill.Y + "%法术强度的自然伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.Y * (100 + mastery_percent) / 100, skill.type, element_natural, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[51] = [skill.druid_1_1(), skill.druid_1_2()];

    skill.druid_2_1 = function () {
        let skill = {};
        skill.name = "扫击";
        skill.type = type_attack;
        skill.X = 50;
        skill.Y = 20;
        skill.T = 3;
        skill.icon = "ability_druid_disembowel";
        skill.detail = "撕裂目标，造成" + skill.X + "%攻击强度的物理伤害，并使其每回合受到" + skill.Y + "%攻击强度的物理伤害，持续" + skill.T + "回合。命中时获得一个连击点。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.Y, skill.type, element_physical, skill.T));
                add_skill_point(attacker, 1);
                damage_obj.skill_name += "(" + get_skill_point(attacker) + ")";
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.druid_2_2 = function () {
        let skill = {};
        skill.name = "凶猛撕咬";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 50;
        skill.icon = "ability_druid_ferociousbite";
        skill.detail = "终结技，撕咬目标造成" + skill.X + "%攻击强度的物理伤害。每个消耗的连击点使总伤害提高" + skill.Y + "%。";
        skill.cast = function (attacker, target) {
            // 计算连击加成
            let damage_count = get_skill_point(attacker);
            let mastery_percent = calculate_original_mastery(attacker);
            let damage_obj = calculate_skill(attacker, target, skill.name + "(" + damage_count + ")", skill.X + skill.Y * damage_count, skill.type, element_physical, 0, mastery_percent * damage_count);
            set_skill_point(attacker, 0);
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[52] = [skill.druid_2_1(), skill.druid_2_2()];

    skill.druid_3_1 = function () {
        let skill = {};
        skill.name = "槌击";
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_druid_maul";
        skill.detail = "重殴目标，造成" + skill.X + "%攻击强度的物理伤害，并根据造成的伤害获得怒气。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            let shield_obj = [];
            if (damage_obj.damage_value > 0) {
                let rage = Math.round(100 * damage_obj.damage_value / attacker.max_health_value);
                if (rage > 0) {
                    add_skill_point(attacker, rage);
                    if (get_skill_point(attacker) > 100) {
                        set_skill_point(attacker, 100);
                    }
                }
                let mastery_percent = calculate_original_mastery(attacker);
                let shield_value = Math.round(damage_obj.damage_value * mastery_percent / 100);
                shield_obj = [calculate_flat_shield(attacker, attacker, skill.name, shield_value)];
            }
            battle_log("当前怒气：" + get_skill_point(attacker));
            return skill_cast_result(damage_obj, null, shield_obj);
        };
        return skill;
    }

    skill.druid_3_2 = function () {
        let skill = {};
        skill.name = "狂暴回复";
        skill.type = type_other;
        skill.trigger = false;
        skill.cooldown = 5;
        skill.first_turn = 3;
        skill.priority = 30;
        skill.X = 0.5;
        skill.icon = "ability_bullrush";
        skill.detail = "将全部怒气转化为生命，每点消耗的怒气回复" + skill.X + "%最大生命值。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return get_skill_point(attacker) > 0 && attacker.current_health_value * 100 / attacker.max_health_value <= THRESHOLD_HEAL;
        }
        skill.cast = function (attacker, target) {
            // 计算怒气加成
            let damage_count = get_skill_point(attacker);
            let heal_value = attacker.max_health_value * damage_count * skill.X / 100;
            let heal_obj = calculate_flat_heal(attacker, attacker, skill.name + "(" + get_skill_point(attacker) + ")", Math.round(heal_value));
            set_skill_point(attacker, 0);
            heal_obj.skill_name += "(" + damage_count + ")";
            return skill_cast_result(null, heal_obj);
        };
        return skill;
    }
    skill[53] = [skill.druid_3_1(), skill.druid_3_2()];

    skill.druid_4_1 = function () {
        let skill = {};
        skill.name = "愤怒";
        skill.name_2 = "自然之力";
        skill.type = type_magic;
        skill.X = 80;
        skill.icon = "spell_nature_abolishmagic";
        skill.detail = "向目标投掷一个能量球，造成" + skill.X + "%法术强度的自然伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_natural);
            return skill_cast_result(damage_obj);
        }
        return skill;
    }

    skill.druid_4_2 = function () {
        let skill = {};
        skill.name = "愈合";
        skill.name_2 = "自然之力";
        skill.type = type_heal;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 30;
        skill.Y = 20;
        skill.Z = 1;
        skill.T = 5;
        skill.T_2 = -1;
        skill.icon = "spell_nature_resistnature";
        skill.icon_2 = "ability_druid_forceofnature";
        skill.detail = "使用自然力量愈合伤口，回复" + skill.X + "%治疗强度的生命，之后每回合回复" + skill.Y + "%治疗强度的生命，持续" + skill.T + "回合。";
        skill.attempt = function (attacker, target) {
            if (battle_turn === 1) {
                // 召唤树人
                let mastery_percent = calculate_original_mastery(attacker);
                target.dots.push(new_dot().dot(skill.name_2, skill.icon_2, mastery_percent, skill.type, element_natural, skill.T_2, skill.Z));
                battle_log(attacker.name + " 施放了 " + skill.name_2);
            }
            if (skill_in_cd(attacker, skill)) {
                return false;
            } else {
                return attacker.current_health_value * 100 / attacker.max_health_value <= THRESHOLD_HEAL;
            }
        }
        skill.cast = function (attacker) {
            let heal_obj = calculate_heal(attacker, attacker, skill.name, skill.X);
            attacker.dots.push(new_dot().hot(skill.name, skill.icon, skill.Y, skill.type, element_natural, skill.T));
            return skill_cast_result(null, heal_obj);
        };
        return skill;
    }
    skill[54] = [skill.druid_4_1(), skill.druid_4_2()];

    skill.rogue_1_1 = function () {
        let skill = {};
        skill.name = "背刺";
        skill.name_1 = "伏击";
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "ability_backstab";
        skill.detail = "从背后攻击目标，造成" + skill.X + "%攻击强度的物理伤害。命中时获得一个连击点。";
        skill.cast = function (attacker, target) {
            let damage_count = get_skill_point(attacker);
            let damage_obj;
            if (has_equip_dagger(attacker) && (battle_turn === 1 || damage_count >= 100)) {
                // 施放伏击
                set_skill_point(attacker, 0);
                let mastery_percent = calculate_original_mastery(attacker);
                damage_obj = calculate_skill(attacker, target, skill.name_1, skill.X * (100 + mastery_percent) / 100, skill.type, element_physical, 50);
            } else {
                // 施放背刺
                damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            }
            if (damage_obj.is_hit) {
                add_skill_point(attacker, 1);
                damage_obj.skill_name += "(" + get_skill_point(attacker) + ")";
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.rogue_1_2 = function () {
        let skill = {};
        skill.name = "肾击";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 50;
        skill.Y = 10;
        skill.Z = 10;
        skill.T = 4;
        skill.icon = "ability_rogue_kidneyshot";
        skill.detail = "终结技，对目标造成" + skill.X + "%攻击强度的物理伤害，并使其造成的伤害降低" + skill.Y + "%，持续" + skill.T + "回合。每个消耗的连击点使减伤效果提高" + skill.Z + "%。";
        skill.attempt = function (attacker) {
            if (battle_turn === 1) {
                attacker.critical_chance_final += dictionary_buff.rogue_1().X;
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            let damage_count = get_skill_point(attacker);
            let damage_obj = calculate_skill(attacker, target, skill.name + "(" + damage_count + ")", skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().rogue_1(skill.Y + skill.Z * damage_count));
            }
            attacker.buffs.push(new_buff().rogue_1());
            set_skill_point(attacker, 100);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };
    skill[61] = [skill.rogue_1_1(), skill.rogue_1_2()];

    skill.rogue_2_1 = function () {
        let skill = {};
        skill.name = "邪恶攻击";
        skill.type = type_attack;
        skill.X = 100;
        skill.icon = "spell_shadow_ritualofsacrifice";
        skill.detail = "凶狠地攻击目标，造成" + skill.X + "%攻击强度的物理伤害。命中时获得一个连击点。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                add_skill_point(attacker, random_percent(mastery_percent) ? 2 : 1);
                damage_obj.skill_name += "(" + get_skill_point(attacker) + ")";
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.rogue_2_2 = function () {
        let skill = {};
        skill.name = "剔骨";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 50;
        skill.icon = "ability_rogue_eviscerate";
        skill.detail = "终结技，攻击目标的要害，造成" + skill.X + "%攻击强度的物理伤害。每个消耗的连击点使总伤害提高" + skill.Y + "%。";
        skill.attempt = function (attacker) {
            if (battle_turn === 1) {
                attacker.attack_power_percent += dictionary_buff.rogue_2().X;
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            // 计算连击加成
            let damage_count = get_skill_point(attacker);
            let damage_obj = calculate_skill(attacker, target, skill.name + "(" + damage_count + ")", skill.X + skill.Y * damage_count, skill.type, element_physical);
            attacker.buffs.push(new_buff().rogue_2());
            set_skill_point(attacker, 0);
            return skill_cast_result(damage_obj);
        };
        return skill;
    };
    skill[62] = [skill.rogue_2_1(), skill.rogue_2_2()];

    skill.rogue_3_1 = function () {
        let skill = {};
        skill.name = "出血";
        skill.type = type_attack;
        skill.X = 100;
        skill.Y = 1;
        skill.icon = "spell_shadow_lifedrain";
        skill.detail = "令目标流血不止，造成" + skill.X + "%攻击强度的物理伤害，且韧性等级降低" + (current_character == null ? 1 : current_character.lvl) * skill.Y + "点（受人物等级影响），持续" + dictionary_debuff.rogue_3().T + "回合。命中时获得一个连击点。";
        skill.attempt = function (attacker) {
            if (battle_turn === 1) {
                attacker.dodge_chance_final += dictionary_buff.rogue_3().X;
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                let resilient_rate = attacker.lvl * skill.Y;
                target.debuffs.push(new_debuff().rogue_3(resilient_rate));
                add_skill_point(attacker, 1);
                damage_obj.skill_name += "(" + get_skill_point(attacker) + ")";
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.rogue_3_2 = function () {
        let skill = {};
        skill.name = "割裂";
        skill.type = type_attack;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 50;
        skill.Y = 30;
        skill.T = 3;
        skill.icon = "ability_rogue_rupture";
        skill.detail = "终结技，在目标身上撕出伤口，使其每回合受到" + skill.X + "%攻击强度的物理伤害，持续" + skill.T + "回合。每个消耗的连击点使总伤害提高" + skill.Y + "%。";
        skill.cast = function (attacker, target) {
            // 计算连击加成
            let damage_count = get_skill_point(attacker);
            let damage_percent = skill.X * (100 + skill.Y * damage_count) / 100;
            let mastery_percent = calculate_original_mastery(attacker);
            target.dots.push(new_dot().dot(skill.name, skill.icon, damage_percent, skill.type, element_physical, skill.T, mastery_percent / 100));
            battle_log(attacker.name + " 施放了 " + skill.name + "(" + damage_count + ")");
            attacker.buffs.push(new_buff().rogue_3());
            set_skill_point(attacker, 0);
            return skill_cast_result();
        };
        return skill;
    };
    skill[63] = [skill.rogue_3_1(), skill.rogue_3_2()];

    skill.priest_1_1 = function () {
        let skill = {};
        skill.name = "苦修";
        skill.type = type_magic;
        skill.X = 5;
        skill.Y = 20;
        skill.Z = 50;
        skill.icon = "spell_holy_penance";
        skill.detail = "发射" + skill.X + "道" + skill.Y + "%治疗强度的神圣之光，生命值低于" + skill.Z + "%时对自身造成治疗，反之对目标造成伤害。";
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let damage_list = [];
            for (let i = 0; i < skill.X; i++) {
                if (attacker.current_health_value / attacker.max_health_value * 100 <= THRESHOLD_EXECUTE) {
                    calculate_heal(attacker, attacker, skill.name, skill.Y);
                    if (random_percent(mastery_percent)) {
                        let damage_obj = calculate_skill(attacker, target, skill.name + "(精通)", skill.Y, skill.type, element_holy);
                        damage_list.push(damage_obj);
                    }
                } else {
                    let damage_obj = calculate_skill(attacker, target, skill.name, skill.Y, skill.type, element_holy);
                    damage_list.push(damage_obj);
                    if (random_percent(mastery_percent)) {
                        calculate_heal(attacker, attacker, skill.name + "(精通)", skill.Y);
                    }
                }
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    };

    skill.priest_1_2 = function () {
        let skill = {};
        skill.name = "真言术：盾";
        skill.type = type_magic;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.speed = 1;
        skill.X = 100;
        skill.icon = "spell_holy_powerwordshield";
        skill.detail = "为自身施加神圣护盾，获得" + skill.X + "%治疗强度的伤害护盾。";
        skill.cast = function (attacker) {
            let shield_value = Math.round(attacker.heal_power * skill.X / 100);
            let shield_obj = calculate_flat_shield(attacker, attacker, skill.name, shield_value);
            return skill_cast_result(null, null, shield_obj);
        };
        return skill;
    };
    skill[71] = [skill.priest_1_1(), skill.priest_1_2()];

    skill.priest_2_1 = function () {
        let skill = {};
        skill.name = "神圣之火";
        skill.type = type_magic;
        skill.cooldown = 2;
        skill.X = 50;
        skill.Y = 30;
        skill.T = 2;
        skill.icon = "spell_holy_searinglight";
        skill.detail = "召唤神圣烈焰吞噬目标，造成" + skill.X + "%法术强度的神圣伤害，并使其每回合受到" + skill.Y + "%法术强度的神圣伤害，持续" + skill.T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_holy);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.Y, skill.type, element_holy, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    };

    skill.priest_2_2 = function () {
        let skill = {};
        skill.name = "快速治疗";
        skill.type = type_heal;
        skill.cooldown = 2;
        skill.first_turn = 2;
        skill.priority = 30;
        skill.X = 80;
        skill.icon = "spell_holy_flashheal";
        skill.detail = "施放迅捷的治疗法术，回复" + skill.X + "%治疗强度的生命。";
        skill.cast = function (attacker) {
            let heal_obj = calculate_heal(attacker, attacker, skill.name, skill.X);
            let shield_obj;
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(mastery_percent)) {
                shield_obj = calculate_flat_shield(attacker, attacker, skill.name, heal_obj.heal_value);
            }
            return skill_cast_result([], heal_obj, shield_obj);
        };
        return skill;
    };
    skill[72] = [skill.priest_2_1(), skill.priest_2_2()];

    skill.priest_3_1 = function () {
        let skill = {};
        skill.name = "精神鞭笞";
        skill.type = type_magic;
        skill.X = 80;
        skill.Y = 100;
        skill.icon = "spell_shadow_siphonmana";
        skill.detail = "折磨目标的精神，造成随机" + skill.X + "%~" + skill.Y + "%法术强度的暗影伤害，并使其造成的伤害降低" + dictionary_debuff.priest_3().X + "%，持续" + dictionary_debuff.priest_3().T + "回合。";
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let is_chaos = random_percent(mastery_percent);
            let element = is_chaos ? element_chaos : element_shadow;
            let element_damage = is_chaos ? 1 : (attacker.damage_shadow + attacker.pierce_shadow) / 100;
            let damage_percent = is_chaos ? skill.Y : skill.X + (skill.Y - skill.X) * Math.random();
            let damage_obj = calculate_skill(attacker, target, skill.name, damage_percent * element_damage, skill.type, element);
            let heal_obj = null;
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().priest_3(dictionary_debuff.priest_3().X));
                let buff = dictionary_buff.priest_3();
                let damage_percent = get_health_lack_percent(attacker);
                let heal_value = damage_obj.damage_value * buff.X / 100 * damage_percent;
                heal_obj = calculate_flat_heal(attacker, attacker, buff.name, heal_value);
            }
            return skill_cast_result(damage_obj, heal_obj);
        };
        return skill;
    };

    skill.priest_3_2 = function () {
        let skill = {};
        skill.name = "心灵震爆";
        skill.type = type_magic;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 200;
        skill.icon = "spell_shadow_unholyfrenzy";
        skill.detail = "召唤暗影能量震慑目标的意识，造成随机" + skill.X + "%~" + skill.Y + "%法术强度的暗影伤害。";
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let is_chaos = random_percent(mastery_percent);
            let element = is_chaos ? element_chaos : element_shadow;
            let element_damage = is_chaos ? 1 : (attacker.damage_shadow + attacker.pierce_shadow) / 100;
            let damage_percent = is_chaos ? skill.Y : skill.X + (skill.Y - skill.X) * Math.random();
            let damage_obj = calculate_skill(attacker, target, skill.name, damage_percent * element_damage, skill.type, element);
            let heal_obj = null;
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().priest_3(dictionary_debuff.priest_3().X));
                let buff = dictionary_buff.priest_3();
                let damage_percent = get_health_lack_percent(attacker);
                let heal_value = damage_obj.damage_value * buff.X / 100 * damage_percent;
                heal_obj = calculate_flat_heal(attacker, attacker, buff.name, heal_value);
            }
            return skill_cast_result(damage_obj, heal_obj);
        };
        return skill;
    };
    skill[73] = [skill.priest_3_1(), skill.priest_3_2()];

    skill.warlock_1_1 = function () {
        let skill = {};
        skill.name = "腐蚀术";
        skill.type = type_magic;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.X = 30;
        skill.T = 5;
        skill.icon = "spell_shadow_abominationexplosion";
        skill.detail = "使用暗影之力腐蚀目标，使其每回合受到" + skill.X + "%法术强度的暗影伤害，持续" + skill.T + "回合。";
        skill.attempt = function (attacker, target) {
            if (battle_turn === 1) {
                let debuff = new_debuff().warlock_1();
                target.debuffs.push(debuff);
                target.damage_physical -= debuff.X;
                target.damage_fire -= debuff.X;
                target.damage_frost -= debuff.X;
                target.damage_natural -= debuff.X;
                target.damage_arcane -= debuff.X;
                target.damage_holy -= debuff.X;
                target.damage_shadow -= debuff.X;
                battle_log(attacker.name + " 施放了 " + debuff.name);
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_shadow);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.X, skill.type, element_shadow, skill.T - 1));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.warlock_1_2 = function () {
        let skill = {};
        skill.name = "吸取生命";
        skill.type = type_magic;
        skill.X = 50;
        skill.Y = 100;
        skill.icon = "spell_shadow_lifedrain02";
        skill.detail = "吸取目标的生命力，对其造成" + skill.X + "%法术强度的暗影伤害，并回复等量的生命。";
        skill.cast = function (attacker, target) {
            let mastery_percent = calculate_original_mastery(attacker);
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X * (1 + mastery_percent / 100), skill.type, element_shadow);
            let heal_obj = [];
            if (damage_obj.is_hit) {
                heal_obj = calculate_flat_heal(attacker, attacker, skill.name, damage_obj.damage_value * skill.Y / 100);
            }
            return skill_cast_result(damage_obj, heal_obj);
        };
        return skill;
    }
    skill[81] = [skill.warlock_1_1(), skill.warlock_1_2()];

    skill.warlock_2_1 = function () {
        let skill = {};
        skill.name = "顺劈斩";
        skill.type = type_magic;
        skill.X = 100;
        skill.Y = 100;
        skill.T = 1;
        skill.icon = "ability_warrior_cleave";
        skill.detail = "使用武器横扫目标，对其造成" + skill.X + "%法术强度的物理伤害。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                if (random_percent(mastery_percent)) {
                    let debuff = new_debuff().warlock_2_2(skill.Y, skill.T)
                    target.debuffs.push(debuff);
                    damage_obj.skill_name += "(" + debuff.name + ")";
                }
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.warlock_2_2 = function () {
        let skill = {};
        skill.name = "拦截";
        skill.name_2 = "恶魔变身";
        skill.type = type_magic;
        skill.cooldown = 4;
        skill.priority = 30;
        skill.X = 100;
        skill.Y = 100;
        skill.T = 1;
        skill.speed = 2;
        skill.icon = "ability_rogue_sprint";
        skill.detail = "向目标冲锋，造成" + skill.X + "%法术强度的物理伤害。同时附加伤害加深效果，使目标下一回合受到的伤害提高" + skill.Y + "%。";
        skill.attempt = function (attacker, target) {
            if (battle_turn === 1) {
                battle_log(attacker.name + " 施放了 " + skill.name_2);
                let debuff = new_debuff().warlock_2();
                target.debuffs.push(debuff);
                target.res_physical -= debuff.X;
                battle_log(attacker.name + " 施放了 " + debuff.name);
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warlock_2_2(skill.Y, skill.T));
            }
            damage_obj.attacker_name += " 的 恶魔卫士";
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[82] = [skill.warlock_2_1(), skill.warlock_2_2()];

    skill.warlock_3_1 = function () {
        let skill = {};
        skill.name = "暗影箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.icon = "spell_shadow_shadowbolt";
        skill.detail = "向目标射出一支暗影箭，造成" + skill.X + "%法术强度的暗影伤害。";
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_shadow);
            damage_list.push(damage_obj);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                if (random_percent(mastery_percent)) {
                    let dots = target.dots;
                    let skill = dictionary_player_skill.warlock_3_2();
                    for (let i = 0; i < dots.length; i++) {
                        let dot = dots[i];
                        if (dot.name === skill.name) {
                            damage_obj = calculate_dot(attacker, target, skill.name_2, dot.power_percent * dot.T, dot.attack_type, element_fire);
                            damage_list.push(damage_obj);
                            let skill_state = get_skill_state(attacker.flag, skill.name);
                            if (skill_state != null) {
                                skill_state.last_turn -= skill.cooldown;
                            }
                            dots.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    }

    skill.warlock_3_2 = function () {
        let skill = {};
        skill.name = "献祭";
        skill.name_2 = "燃烧";
        skill.type = type_magic;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.speed = 1;
        skill.X = 50;
        skill.Y = 40;
        skill.T = 5;
        skill.icon = "spell_fire_immolation";
        skill.detail = "灼烧目标，对其造成" + skill.X + "%法术强度的火焰伤害，并使其每回合受到" + skill.Y + "%法术强度的火焰伤害，持续" + skill.T + "回合。";
        skill.attempt = function (attacker, target) {
            if (battle_turn === 1) {
                let debuff = new_debuff().warlock_3();
                target.debuffs.push(debuff);
                target.res_fire -= debuff.X;
                target.res_shadow -= debuff.X;
                battle_log(attacker.name + " 施放了 " + debuff.name);
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            if (damage_obj.is_hit) {
                target.dots.push(new_dot().dot(skill.name, skill.icon, skill.Y, skill.type, element_fire, skill.T));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[83] = [skill.warlock_3_1(), skill.warlock_3_2()];

    skill.mage_1_1 = function () {
        let skill = {};
        skill.name = "奥术飞弹";
        skill.type = type_magic;
        skill.X = 5;
        skill.Y = 20;
        skill.Z = 10;
        skill.icon = "spell_nature_starfall";
        skill.detail = "向目标射出" + skill.X + "发奥术飞弹，每发造成" + skill.Y + "%法术强度的奥术伤害并消耗一层奥术强化，施放时每层奥术强化使伤害提高" + skill.Z + "%。";
        skill.cast = function (attacker, target) {
            let skill_1_2 = new_player_skill().mage_1_2();
            let damage_list = [];
            for (let i = 0; i < skill.X; i++) {
                let point = get_skill_point(attacker);
                if (point > 0) {
                    add_skill_point(attacker, -1);
                }
                let damage_obj = calculate_skill(attacker, target, skill.name, skill.Y * (1 + point * skill_1_2.X / 100), skill.type, element_arcane);
                damage_obj.skill_name += "(" + point + ")";
                damage_list.push(damage_obj);
            }
            return skill_cast_result(damage_list);
        };
        return skill;
    }

    skill.mage_1_2 = function () {
        let skill = {};
        skill.name = "唤醒";
        skill.type = type_other;
        skill.cooldown = 4;
        skill.first_turn = 4;
        skill.priority = 30;
        skill.X = 10;
        skill.icon = "spell_nature_purge";
        skill.detail = "聚集奥术能量，获得" + skill.X + "层奥术强化并回复" + (skill.X * 2) + "%最大生命值。战斗开始时自动施放一次。";
        skill.attempt = function (attacker, target) {
            if (battle_turn === 1) {
                new_player_skill().mage_1_2().cast(attacker, target);
            }
            return !skill_in_cd(attacker, skill);
        }
        skill.cast = function (attacker) {
            let point = skill.X;
            let mastery_percent = calculate_original_mastery(attacker);
            if (random_percent(mastery_percent)) {
                point += skill.X / 2;
                point = Math.round(point);
            }
            add_skill_point(attacker, point);
            battle_log(attacker.name + " 施放了 " + skill.name + "(" + get_skill_point(attacker) + ")");
            let heal_value = attacker.max_health_value * point * 2 / 100;
            let heal_obj = calculate_flat_heal(attacker, attacker, skill.name, Math.round(heal_value));
            return skill_cast_result(null, heal_obj);
        };
        return skill;
    }
    skill[91] = [skill.mage_1_1(), skill.mage_1_2()];

    skill.mage_2_1 = function () {
        let skill = {};
        skill.name = "火球术";
        skill.type = type_magic;
        skill.X = 100;
        skill.Y = 20;
        skill.icon = "spell_fire_flamebolt";
        skill.detail = "发射一枚火球攻击目标，造成" + skill.X + "%法术强度的火焰伤害，且暴击率提高" + skill.Y + "%。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire, 0, skill.Y);
            if (damage_obj.is_critical) {
                add_skill_point(attacker, 1);
                let battle_buffs = attacker.buffs;
                if (battle_buffs != null && battle_buffs.length > 0) {
                    for (let i = 0; i < battle_buffs.length; i++) {
                        if (battle_buffs[i].name === dictionary_buff.mage_2_2().name) {
                            battle_buffs.splice(i, 1);
                            i--;
                        }
                    }
                }
            } else {
                let mastery_percent = calculate_original_mastery(attacker);
                attacker.buffs.push(new_buff().mage_2_2(mastery_percent.toFixed(2)));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.mage_2_2 = function () {
        let skill = {};
        skill.name = "炎爆术";
        skill.type = type_magic;
        skill.priority = 30;
        skill.X = 200;
        skill.icon = "spell_fire_fireball02";
        skill.detail = "火焰法术暴击后可用，发射一枚巨大的火球，对目标造成" + skill.X + "%法术强度的火焰伤害。";
        skill.attempt = function (attacker) {
            if (skill_in_cd(attacker, skill)) {
                return false;
            }
            return get_skill_point(attacker) > 0;
        }
        skill.cast = function (attacker, target) {
            set_skill_point(attacker, 0);
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_fire);
            if (damage_obj.is_critical) {
                add_skill_point(attacker, 1);
                let battle_buffs = attacker.buffs;
                if (battle_buffs != null && battle_buffs.length > 0) {
                    for (let i = 0; i < battle_buffs.length; i++) {
                        if (battle_buffs[i].name === dictionary_buff.mage_2_2().name) {
                            battle_buffs.splice(i, 1);
                            i--;
                        }
                    }
                }
            } else {
                let mastery_percent = calculate_original_mastery(attacker);
                attacker.buffs.push(new_buff().mage_2_2(mastery_percent.toFixed(2)));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }
    skill[92] = [skill.mage_2_1(), skill.mage_2_2()];

    skill.mage_3_1 = function () {
        let skill = {};
        skill.name = "寒冰箭";
        skill.type = type_magic;
        skill.X = 100;
        skill.icon = "spell_frost_frostbolt02";
        skill.detail = "向目标射出一支寒冰箭，造成" + skill.X + "%法术强度的冰霜伤害，并使其造成的伤害降低" + dictionary_debuff.mage_3().X + "%，持续" + dictionary_debuff.mage_3().T + "回合。";
        skill.cast = function (attacker, target) {
            let damage_obj = calculate_skill(attacker, target, skill.name, skill.X, skill.type, element_frost);
            if (damage_obj.is_hit) {
                let mastery_percent = calculate_original_mastery(attacker);
                target.debuffs.push(new_debuff().mage_3(dictionary_debuff.mage_3().X + mastery_percent));
            }
            return skill_cast_result(damage_obj);
        };
        return skill;
    }

    skill.mage_3_2 = function () {
        let skill = {};
        skill.name = "寒冰护体";
        skill.type = type_other;
        skill.cooldown = 5;
        skill.priority = 30;
        skill.speed = 1;
        skill.X = 100;
        skill.icon = "spell_ice_lament";
        skill.detail = "召唤寒冰护盾围绕自己，获得" + skill.X + "%法术强度的伤害护盾。";
        skill.cast = function (attacker) {
            let shield_value = Math.round(attacker.magic_power * skill.X / 100);
            let shield_obj = calculate_flat_shield(attacker, attacker, skill.name, shield_value);
            return skill_cast_result(null, null, shield_obj);
        };
        return skill;
    }
    skill[93] = [skill.mage_3_1(), skill.mage_3_2()];

    return skill;
}
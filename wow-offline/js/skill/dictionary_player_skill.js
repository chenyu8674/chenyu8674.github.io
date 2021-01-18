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
        skill.name = "致死打击";// 名称 10低 20中 30高 50特殊 99强制
        skill.X = 100;
        skill.icon = "ability_warrior_savageblow";
        skill.detail = "一次邪恶的攻击，对目标造成" + skill.X + "%攻击强度的物理伤害，并使其受到的治疗降低" + dictionary_debuff.warrior_1().X + "%，持续" + dictionary_debuff.warrior_1().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let extra_hit = 0;
            if (m_skill_states[attacker.flag] === dictionary_player_skill.warrior_1_2().id) {
                // 已在压制流程中判定为命中
                extra_hit = 999;
                m_skill_states[attacker.flag] = null;
            }
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical, extra_hit);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warrior_1());
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.warrior_1_2 = function () {
        let skill = {};
        skill.id = 112;// Id
        skill.name = "压制";// 名称
        skill.cooldown = 3;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 120;
        skill.Y = 25;
        skill.icon = "ability_meleedamage";
        skill.detail = "在目标躲闪之后立刻进行压制，对其造成" + skill.X + "%攻击强度的物理伤害。<br/>压制无法被躲闪或格挡，且暴击率提高" + skill.Y + "%。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            let is_hit = Math.random() < calculate_hit(attacker, target);
            if (is_hit) {
                // 提前判断致死打击的命中情况，命中则添加标记
                m_skill_states[attacker.flag] = skill.id;
                return false;
            } else {
                // 未命中则触发压制
                return true;
            }
        };
        // 技能施放调用
        skill.cast = function (attacker, target) {
            battle_log(target.name + " 躲闪了 " + attacker.name + " 的攻击");
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical, 999, skill.Y, -999);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[11] = [skill.warrior_1_1(), skill.warrior_1_2()];

    skill.warrior_2_1 = function () {
        let skill = {};
        skill.id = 121;// Id
        skill.name = "嗜血";// 名称
        skill.X = 100;
        skill.Y = 15;
        skill.icon = "spell_nature_bloodlust";
        skill.detail = "在嗜血的狂乱中攻击目标，对其造成" + skill.X + "%攻击强度的物理伤害，并使自己回复造成伤害" + skill.Y + "%的生命。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            let heal_obj = null;
            if (damage_obj.is_hit) {
                let heal_value = Math.round(damage_obj.damage_value * 10 * attacker.taken_heal_percent / 100 / 100);
                heal_obj = flat_skill_heal(attacker, target, skill.name, heal_value);
            }
            return skill_cast_result([damage_obj], [heal_obj], []);
        };
        return skill;
    }

    skill.warrior_2_2 = function () {
        let skill = {};
        skill.id = 122;// Id
        skill.name = "斩杀";// 名称
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
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_physical, 0, skill.Z);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[12] = [skill.warrior_2_1(), skill.warrior_2_2()];

    skill.warrior_3_1 = function () {
        let skill = {};
        skill.id = 131;// Id
        skill.name = "破甲";// 名称
        skill.X = 100;
        skill.icon = "ability_warrior_sunder";
        skill.detail = "击碎目标的护甲，对其造成" + skill.X + "%攻击强度的物理伤害，并使目标的物理抗性-" + dictionary_debuff.warrior_3().X + "，持续" + dictionary_debuff.warrior_3().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            if (damage_obj.is_hit) {
                target.debuffs.push(new_debuff().warrior_3());
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.warrior_3_2 = function () {
        let skill = {};
        skill.id = 132;// Id
        skill.name = "盾牌猛击";// 名称
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
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            let shield_value = Math.round(attacker.block_value * skill.Y / 100);
            let shield_obj = flat_skill_shield(attacker, target, skill.name, shield_value);
            return skill_cast_result([damage_obj], [], [shield_obj]);
        };
        return skill;
    }
    skill[13] = [skill.warrior_3_1(), skill.warrior_3_2()];

    skill.paladin_1_1 = function () {
        let skill = {};
        skill.id = 211;// Id
        skill.name = "神圣震击";// 名称
        skill.X = 80;
        skill.Y = 50;
        skill.icon = "spell_holy_heal02";
        skill.detail = "在目标身上引发圣光爆发，对其造成" + skill.X + "%法术强度的神圣伤害，并使自己回复" + skill.Y + "%治疗强度的的生命。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_holy);
            let heal_obj = normal_skill_heal(attacker, target, skill.name, skill.Y);
            return skill_cast_result([damage_obj], [heal_obj], []);
        };
        return skill;
    }

    skill.paladin_1_2 = function () {
        let skill = {};
        skill.id = 212;// Id
        skill.name = "圣疗术";// 名称
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
            let heal_obj = normal_skill_heal(attacker, target, skill.name, skill.Y);
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
        skill.X = 80;
        skill.Y = 80;
        skill.icon = "spell_holy_blessingofstrength";
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害，并对其进行清算，根据自己损失的生命值造成最高" + skill.Y + "%攻击强度的神圣伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_list = [];
            let damage_obj = normal_skill_attack(attacker, target, skill.name_2, skill.X, type_attack, element_physical);
            damage_list.push(damage_obj);
            let damage_percent = attacker.current_health_value / attacker.max_health_value;
            if (damage_percent < 0.2) {
                damage_percent = 0.2;// 20%时到达最大伤害
            }
            damage_percent = (1 - damage_percent) / 0.8;
            console.log(damage_percent);
            if (damage_percent > 0) {
                damage_obj = normal_skill_attack(attacker, target, skill.name, skill.Y * damage_percent, type_attack, element_holy);
                damage_list.push(damage_obj);
            }
            return skill_cast_result(damage_list, [], []);
        };
        return skill;
    }

    skill.paladin_2_2 = function () {
        let skill = {};
        skill.id = 222;// Id
        skill.name = "圣盾术";// 名称
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
        skill.X = 100;
        skill.Y = 40;
        skill.Z = 80;
        skill.icon = "ability_warrior_innerrage";
        skill.detail = "将武器灌注神圣之力，对目标造成" + skill.X + "%攻击强度的物理伤害，并有" + skill.Y + "%几率额外造成" + skill.Z + "%攻击强度的神圣伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_1 = normal_skill_attack(attacker, target, skill.name_2, skill.X, type_attack, element_physical);
            let damage_list = [damage_obj_1];
            if (Math.random() < skill.Y / 100) {
                let damage_obj_2 = normal_skill_attack(attacker, target, skill.name, skill.Z, type_attack, element_holy, 999);
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
        skill.cooldown = Number.MAX_VALUE;// 冷却
        skill.priority = 99;// 优先级
        skill.X = 35;
        skill.Y = 300;
        skill.icon = "spell_holy_sealofmight";
        skill.detail = "使用神圣力量制裁受伤的目标，造成" + skill.Y + "%攻击强度的神圣伤害，无法被躲闪。<br/>目标生命值低于" + skill.X + "%时可用，每场战斗限一次。";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (skill_in_cd(attacker, skill)) {
                return false;// 冷却中
            }
            return target.current_health_value * 100 / target.max_health_value <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_holy, 999);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[23] = [skill.paladin_3_1(), skill.paladin_3_2()];

    skill.hunter_1_1 = function () {
        let skill = {};
        skill.id = 311;// Id
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
            let hit_count = 0;
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
                damage_list.push(damage_obj);
                hit_count += damage_obj.is_hit ? 1 : 0;
            }
            let heal_value = Math.round(hit_count * attacker.max_health_value * dictionary_buff[31].X * attacker.taken_heal_percent / 100 / 100);
            let heal_obj = flat_skill_heal(attacker, target, skill.name, heal_value);
            return skill_cast_result(damage_list, [heal_obj], []);
        };
        return skill;
    }

    skill.hunter_1_2 = function () {
        let skill = {};
        skill.id = 312;// Id
        skill.name = "狂野怒火";// 名称
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
            for (let i = 0; i < damage_count; i++) {
                let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
                damage_list.push(damage_obj);
                hit_count += damage_obj.is_hit ? 1 : 0;
            }
            let heal_value = Math.round(hit_count * attacker.max_health_value * dictionary_buff[31].X * attacker.taken_heal_percent / 100 / 100);
            let heal_obj = flat_skill_heal(attacker, target, skill.name, heal_value);
            return skill_cast_result(damage_list, [heal_obj], []);
        };
        return skill;
    }
    skill[31] = [skill.hunter_1_1(), skill.hunter_1_2()];

    skill.hunter_2_1 = function () {
        let skill = {};
        skill.id = 321;// Id
        skill.name = "奥术射击";// 名称
        skill.X = 120;
        skill.icon = "ability_impalingbolt";
        skill.detail = "一次快速的射击，对目标造成" + skill.X + "%攻击强度的奥术伤害。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_arcane);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.hunter_2_2 = function () {
        let skill = {};
        skill.id = 322;// Id
        skill.name = "瞄准射击";// 名称
        skill.cooldown = 4;// 冷却
        skill.first_turn = 4;// 首次施放回合
        skill.priority = 30;// 优先级
        skill.X = 150;
        skill.Y = 200;
        skill.icon = "inv_spear_07";
        skill.detail = "精确瞄准后进行一次强力的射击，对目标造成" + skill.X + "%攻击强度的物理伤害，该伤害根据战斗回合数最多提高" + skill.Y + "%。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_percent = battle_turn / 5;
            if (damage_percent > skill.Y / 100) {
                damage_percent = skill.Y / 100;
            }
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X * (1 + damage_percent), type_attack, element_physical);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[32] = [skill.hunter_2_1(), skill.hunter_2_2()];

    skill.hunter_3_1 = function () {
        let skill = {};
        skill.id = 331;// Id
        skill.name = "猛禽一击";// 名称
        skill.X = 80;
        skill.Y = 100;
        skill.icon = "ability_meleedamage";
        skill.detail = "一次强力的攻击，对目标造成" + skill.X + "%攻击强度的物理伤害。该次攻击的伤害、命中率和暴击率提高躲闪率的" + skill.Y + "%。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let dodge = calculate_original_dodge(attacker);
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X * (1 + dodge / 100), type_attack, element_physical, dodge, dodge);
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.hunter_3_2 = function () {
        let skill = {};
        skill.id = 332;// Id
        skill.name = "爆炸陷阱";// 名称
        skill.cooldown = 5;// 冷却
        skill.priority = 30;// 优先级
        skill.X = 80;
        skill.Y = 30;
        skill.icon = "spell_fire_selfdestruct";
        skill.detail = "使目标落入火焰陷阱，造成" + skill.X + "%攻击强度的火焰伤害，并使目标每回合受到" + skill.Y + "%攻击强度的火焰伤害，持续" + dictionary_dot.hunter_3().T + "回合。";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj_x = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_fire);
            if (damage_obj_x.is_hit) {
                let damage_obj_y = normal_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_fire, 999, -999, -999);
                target.dots.push(new_dot().hunter_3(damage_obj_y.damage_value));
            }
            return skill_cast_result(damage_obj_x, [], []);
        };
        return skill;
    }
    skill[33] = [skill.hunter_3_1(), skill.hunter_3_2()];

    skill.mage_2_1 = function () {
        let skill = {};
        skill.id = 921;// Id
        skill.name = "灼烧";// 名称
        skill.X = 80;
        skill.Y = 50;
        skill.icon = "spell_fire_soulburn";
        skill.detail = "灼烧目标造成" + skill.X + "法术强度的火焰伤害，暴击率提高" + skill.Y + "%，暴击时在目标身上留下一层余烬";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_obj = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_fire, 0, skill.Y);
            if (damage_obj.is_critical) {
                if (m_skill_states[attacker.flag] == null) {
                    m_skill_states[attacker.flag] = 1;
                } else {
                    m_skill_states[attacker.flag]++;
                }
                battle_log("当前余烬：" + m_skill_states[attacker.flag]);
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }

    skill.mage_2_2 = function () {
        let skill = {};
        skill.id = 922;// Id
        skill.name = "点燃";// 名称
        skill.cooldown = 4;// 冷却
        skill.first_turn = 4;// 首次释放回合
        skill.priority = 30;// 优先级
        skill.X = 100;
        skill.Y = 20;
        skill.Z = 10;
        skill.icon = "spell_fire_incinerate";
        skill.detail = "引爆所有余烬造成" + skill.X + "法术强度的火焰伤害，每层余烬会使总伤害提高" + skill.Y + "%，暴击率提高" + skill.Z + "%";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_count = 0;
            // 计算余烬加成
            if (m_skill_states[attacker.flag] != null) {
                damage_count = m_skill_states[attacker.flag];
            }
            let damage_obj = normal_skill_attack(attacker, target, skill.name + "(" + damage_count + ")", skill.X + skill.Y * damage_count, type_cast, element_fire, 0, skill.Z * damage_count);
            if (damage_obj.is_hit) {
                m_skill_states[attacker.flag] = null;
            }
            return skill_cast_result(damage_obj, [], []);
        };
        return skill;
    }
    skill[92] = [skill.mage_2_1(), skill.mage_2_2()];

    return skill;
}
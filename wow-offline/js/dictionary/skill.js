/** 技能一览 **/
let dictionary_skill = new_skill();

function new_skill() {
    let skill = {};

    skill.physical_attack = function () {
        let skill = {};
        skill.id = 1;// Id
        skill.name = "攻击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.detail = "攻击目标造成" + skill.X + "攻击强度的物理伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            return damage[0];
        };
        return skill;
    };

    skill.holy_cast = function () {
        let skill = {};
        skill.id = 2;// Id
        skill.name = "圣击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.detail = "对目标施法造成" + skill.X + "法术强度的神圣伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_holy);
            return damage[0];
        };
        return skill;
    };

    skill.warrior_1_1 = function () {
        let skill = {};
        skill.id = 111;// Id
        skill.name = "致死打击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，并使其受到的治疗降低" + dictionary_debuff.warrior_1_X + "%，持续" + dictionary_debuff.warrior_1_T + "回合";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let extra_hit = 0;
            if (m_skill_states[attacker.flag] === dictionary_skill.warrior_1_2().id) {
                // 已在压制流程中判定为命中
                extra_hit = 999;
                m_skill_states[attacker.flag] = null;
            }
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical, extra_hit);
            if (damage[1]) {
                target.debuffs.push(new_debuff().warrior_1);
            }
            return damage[0];
        };
        return skill;
    }

    skill.warrior_1_2 = function () {
        let skill = {};
        skill.id = 112;// Id
        skill.name = "压制";// 名称
        skill.cooldown = 3;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.Y = 100;
        skill.detail = "若攻击被躲闪，则压制目标造成" + skill.X + "%攻击强度的物理伤害，无法闪避且必然暴击";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(attacker.flag, skill.id);
            if (skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown) {
                return false;// 冷却中
            } else {
                let is_hit = Math.random() < calculate_hit(attacker, target);
                if (is_hit) {
                    // 判定为命中
                    m_skill_states[attacker.flag] = skill.id;
                    return false;
                } else {
                    return true;
                }
            }
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(attacker.flag, skill.id, battle_turn));
            battle_log(target.name + " 躲闪了 " + attacker.name + " 的攻击");
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical, 999, skill.Y);
            return damage[0];
        };
        return skill;
    }

    skill.warrior_2_1 = function () {
        let skill = {};
        skill.id = 121;// Id
        skill.name = "嗜血";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 90;
        skill.Y = 15;
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害，并回复造成伤害" + skill.Y + "%的生命";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            if (damage[1]) {
                let heal = Math.round(damage[0] * 10 * attacker.taken_heal_percent / 100 / 100);
                if (heal > 0) {
                    battle_log(attacker.name + " 通过 " + skill.name + " 回复 " + heal + " 点生命");
                    attacker.current_health_point += heal;
                    if (attacker.current_health_point > attacker.health_point) {
                        attacker.current_health_point = attacker.health_point;
                    }
                }
            }
            return damage[0];
        };
        return skill;
    }

    skill.warrior_2_2 = function () {
        let skill = {};
        skill.id = 122;// Id
        skill.name = "斩杀";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 30;
        skill.Y = 150;
        skill.Z = 50;
        skill.detail = "目标生命值低于" + skill.X + "%时可用，造成" + skill.Y + "%攻击强度的物理伤害，暴击率提高" + skill.Z + "%";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            return target.current_health_point * 100 / target.health_point <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_physical, 0, skill.Z);
            return damage[0];
        };
        return skill;
    }

    skill.warrior_3_1 = function () {
        let skill = {};
        skill.id = 131;// Id
        skill.name = "破甲";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 20;// 优先级
        skill.X = 100;
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害，并使其物理抗性-" + dictionary_debuff.warrior_3_X + "，持续" + dictionary_debuff.warrior_3_T + "回合";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            if (damage[1]) {
                target.debuffs.push(new_debuff().warrior_3);
            }
            return damage[0];
        };
        return skill;
    }

    skill.warrior_3_2 = function () {
        let skill = {};
        skill.id = 132;// Id
        skill.name = "盾牌猛击";// 名称
        skill.cooldown = 5;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.Y = 100;
        skill.detail = "盾击目标造成" + skill.X + "%攻击强度的物理伤害，并获得格挡值" + skill.Y + "%的伤害吸收护盾";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(attacker.flag, skill.id);
            return !(skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown);
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(attacker.flag, skill.id, battle_turn));
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
            let shield_point = Math.round(attacker.block_value * skill.Y * attacker.taken_heal_percent / 100 / 100);
            if (shield_point > 0) {
                attacker.current_shield_point += shield_point;
                battle_log(attacker.name + " 获得 " + shield_point + " 点伤害吸收护盾");
            }
            return damage[0];
        };
        return skill;
    }

    skill.paladin_1_1 = function () {
        let skill = {};
        skill.id = 211;// Id
        skill.name = "神圣震击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.Y = 50;
        skill.detail = "召唤圣光震击目标造成" + skill.X + "%法术强度的神圣伤害，并回复" + skill.Y + "%治疗强度的的生命";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_holy);
            let heal = normal_skill_heal(attacker, target, skill.name, skill.Y);
            if (heal[0] > 0) {
                attacker.current_health_point += heal[0];
                if (attacker.current_health_point > attacker.health_point) {
                    attacker.current_health_point = attacker.health_point;
                }
            }
            return damage[0];
        };
        return skill;
    }

    skill.paladin_1_2 = function () {
        let skill = {};
        skill.id = 212;// Id
        skill.name = "圣疗术";// 名称
        skill.cooldown = Number.MAX_VALUE;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 25;
        skill.Y = 300;
        skill.detail = "生命值低于" + skill.X + "%时可用，回复" + skill.Y + "%治疗强度的生命，每场战斗限一次";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(attacker.flag, skill.id);
            if (skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown) {
                return false;// 冷却中
            } else {
                return attacker.current_health_point * 100 / attacker.health_point <= skill.X;
            }
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(attacker.flag, skill.id, battle_turn));
            let heal = normal_skill_heal(attacker, target, skill.name, skill.Y);
            if (heal[0] > 0) {
                attacker.current_health_point += heal[0];
                if (attacker.current_health_point > attacker.health_point) {
                    attacker.current_health_point = attacker.health_point;
                }
            }
            return 0;
        };
        return skill;
    }

    skill.paladin_2_1 = function () {
        let skill = {};
        skill.id = 221;// Id
        skill.name = "清算";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 20;// 优先级
        skill.X = 80;
        skill.Y = 100;
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害，该伤害根据损失生命值最多提高" + skill.Y + "%";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_percent = 1 - attacker.current_health_point / attacker.health_point;
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X * (1 + damage_percent), type_attack, element_physical);
            return damage[0];
        };
        return skill;
    }

    skill.paladin_2_2 = function () {
        let skill = {};
        skill.id = 222;// Id
        skill.name = "圣疗术";// 名称
        skill.cooldown = Number.MAX_VALUE;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 35;
        skill.detail = "生命值低于" + skill.X + "%时召唤圣盾免疫所有伤害" + dictionary_buff.paladin_2_2_T + "回合，每场战斗限一次";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(attacker.flag, skill.id);
            if (skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown) {
                return false;// 冷却中
            } else {
                return attacker.current_health_point * 100 / attacker.health_point <= skill.X;
            }
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(attacker.flag, skill.id, battle_turn));
            attacker.buffs.push(new_buff().paladin_2_2);
            battle_log(attacker.name + " 施放了 圣盾");
            return 0;
        };
        return skill;
    }

    skill.paladin_3_1 = function () {
        let skill = {};
        skill.id = 231;// Id
        skill.name = "命令圣印";// 名称
        skill.name_2 = "攻击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.Y = 30;
        skill.Z = 70;
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，" + skill.Y + "%几率额外造成" + skill.Z + "%攻击强度的神圣伤害";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage1 = normal_skill_attack(attacker, target, skill.name_2, skill.X, type_attack, element_physical);
            let damage2 = [0];
            if (Math.random() < 30 / 100) {
                damage2 = normal_skill_attack(attacker, target, skill.name, skill.Z, type_attack, element_holy);
            }
            return damage1[0] + damage2[0];
        };
        return skill;
    }

    skill.paladin_3_2 = function () {
        let skill = {};
        skill.id = 232;// Id
        skill.name = "愤怒之锤";// 名称
        skill.cooldown = Number.MAX_VALUE;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 30;
        skill.Y = 300;
        skill.detail = "目标生命值低于" + skill.X + "%时可用，造成" + skill.Y + "%攻击强度的神圣伤害，每场战斗限一次";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(attacker.flag, skill.id);
            if (skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown) {
                return false;// 冷却中
            } else {
                return target.current_health_point * 100 / target.health_point <= skill.X;
            }
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(attacker.flag, skill.id, battle_turn));
            let damage = normal_skill_attack(attacker, target, skill.name, skill.Y, type_attack, element_holy, 999);
            return damage[0];
        };
        return skill;
    }

    // 多重射击：造成X%攻击强度的物理伤害，随机重复Y~Z次
    skill.hunter_1_1 = function () {
        let skill = {};
        skill.id = 311;// Id
        skill.name = "多重射击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 35;
        skill.Y = 2;
        skill.Z = 5;
        skill.detail = "造成" + skill.X + "%攻击强度的物理伤害，随机重复" + skill.Y + "~" + skill.Z + "次";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage_total = 0;
            let damage_count = Math.round(skill.Y + Math.random() * (skill.Z - skill.Y));
            for (let i = 0; i < damage_count; i++) {
                let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, element_physical);
                damage_total += damage[0];
            }
            return damage_total;
        };
        return skill;
    }

    // 杀戮命令：每隔X回合使用，造成Y%攻击强度的物理伤害，根据损失生命值最多重复Z次
    skill.hunter_1_2 = function () {

    }

    // 奥术射击：造成X%攻击强度的奥术伤害
    skill.hunter_2_1 = function () {

    }

    // 瞄准射击：造成X%攻击强度的物理伤害，战斗回合数越久伤害越高
    skill.hunter_2_2 = function () {

    }

    // 猛禽一击：造成X%攻击强度的物理伤害，并使躲闪率提高Y%，持续Z回合
    skill.hunter_3_1 = function () {

    }

    // 猫鼬撕咬：造成X%攻击强度的物理伤害，该次攻击的伤害受到Y%闪避率的加成";
    skill.hunter_3_2 = function () {

    }

    skill.mage_2_1 = function () {
        let skill = {};
        skill.id = 921;// Id
        skill.name = "灼烧";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 80;
        skill.Y = 30;
        skill.detail = "灼烧目标造成" + skill.X + "法术强度的火焰伤害，该次攻击的暴击率提高" + skill.Y + "%，暴击时在目标身上留下一层余烬";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, element_fire, 0, skill.Y);
            if (damage[2]) {
                if (m_skill_states[attacker.flag] == null) {
                    m_skill_states[attacker.flag] = 1;
                } else {
                    m_skill_states[attacker.flag]++;
                }
                battle_log("余烬层数：" + m_skill_states[attacker.flag]);
            }
            return damage[0];
        };
        return skill;
    }

    skill.mage_2_2 = function () {
        let skill = {};
        skill.id = 922;// Id
        skill.name = "燃火";// 名称
        skill.cooldown = 4;// 冷却
        skill.first_turn = 4;// 首次释放回合
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.Y = 20;
        skill.Z = 10;
        skill.detail = "引爆所有余烬造成" + skill.X + "法术强度的火焰伤害，每层余烬会使总伤害提高" + skill.Y + "%，暴击率提高" + skill.Z + "%";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            if (battle_turn < skill.first_turn) {
                return false;
            }
            let skill_state = get_skill_state(attacker.flag, skill.id);
            return !(skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown);
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(attacker.flag, skill.id, battle_turn));
            let damage_count = 0;
            // 计算余烬加成
            if (m_skill_states[attacker.flag] != null) {
                damage_count = m_skill_states[attacker.flag];
            }
            let damage = normal_skill_attack(attacker, target, skill.name + "(" + damage_count + ")", skill.X + skill.Y * damage_count, type_cast, element_fire, 0, skill.Z * damage_count);
            if (damage[1]) {
                m_skill_states[attacker.flag] = null;
            }
            return damage[0];
        };
        return skill;
    }

    return skill;
}
// 职业技能
function setup_skill() {
    let skill = {};

    let type_attack = 1;
    let type_cast = 2;

    /**
     * 计算常规攻击
     * @param attacker 攻击者obj
     * @param target 目标obj
     * @param skill_name 技能名称
     * @param damage_percent 技能伤害系数
     * @param attack_type 攻击类型，1攻击（以攻击强度结算） 2法术（以法术强度结算）
     * @param element_type 元素类型，10物理 20火焰 30冰霜 40自然 50奥术 60神圣 70暗影
     * @param extra_hit 额外命中率
     * @param extra_critical 额外暴击率
     * @return damage 造成伤害
     * @return is_hit 是否命中
     * @return is_critical 是否暴击
     * @return block_value 格挡数值
     * @return absorb_value 吸收数值
     */
    function normal_skill_attack(attacker, target, skill_name, damage_percent,
                                 attack_type, element_type, extra_hit, extra_critical) {
        // 计算命中
        extra_hit = extra_hit == null ? 0 : extra_hit;
        let is_hit = Math.random() < calculate_hit(attacker, target) + extra_hit / 100;
        if (!is_hit) {
            log(attacker.name + " 的 " + skill_name + " 未击中 " + target.name);
            return [0, is_hit, false, 0, 0];
        }
        /* 计算增减伤百分比 */
        let dmg;// 攻击者属性伤害百分比
        let res;// 目标属性减伤百分比
        switch (element_type) {
            case m_element.physical:
                dmg = attacker.damage_physical;
                res = target.res_physical - attacker.pierce_physical;
                break;
            case m_element.fire:
                dmg = attacker.damage_fire;
                res = target.res_fire - attacker.pierce_fire;
                break;
            case m_element.frost:
                dmg = attacker.damage_frost;
                res = target.res_frost - -attacker.pierce_frost;
                break;
            case m_element.natural:
                dmg = attacker.damage_natural;
                res = target.res_natural - -attacker.pierce_natural;
                break;
            case m_element.arcane:
                dmg = attacker.damage_arcane;
                res = target.res_arcane - -attacker.pierce_arcane;
                break;
            case m_element.holy:
                dmg = attacker.damage_holy;
                res = target.res_holy - attacker.pierce_holy;
                break;
            case m_element.dark:
                dmg = attacker.damage_dark;
                res = target.res_dark - attacker.pierce_dark;
                break;
        }
        /* 基础伤害 */
        let damage;
        if (attack_type === type_attack) {
            damage = attacker.attack_power * dmg * damage_percent / 100 / 100;// 基础攻击伤害
            damage *= (1 - calculate_armor_attack(attacker, target));// 计算攻击护甲减伤
        } else {
            damage = attacker.magic_power * dmg * damage_percent / 100 / 100;// 基础法术伤害
            damage *= (1 - calculate_armor_magic(attacker, target));// 计算法术护甲减伤
        }
        if (damage < 0) {
            damage = 0;
        }
        // 伤害随机浮动(0.9~1.1)
        damage *= (0.9 + Math.random() * 0.2);
        // 计算暴击
        extra_critical = extra_critical == null ? 0 : extra_critical;
        let is_critical = Math.random() < calculate_critical(attacker, target) + extra_critical / 100;
        if (is_critical) {
            // 计算暴击加成
            damage *= attacker.critical_damage / 100;
        }
        // 计算属性减伤百分比
        damage = damage * (100 - res) / 100;
        // 计算格挡值
        let is_block = Math.random() < calculate_block(attacker, target);
        let block_value = target.block_value;
        if (is_block) {
            damage = damage - block_value;
            if (damage < 0) {
                block_value += damage;
                damage = 0;
            }
        }
        // 计算全局受伤百分比
        damage = damage * target.taken_damage_percent / 100;
        // 计算伤害吸收
        let absorb_value = 0;
        let shield_point = target.current_shield_point;
        if (damage > 0 && shield_point > 0) {
            if (damage > shield_point) {
                // 伤害吸收护盾被击穿
                damage -= shield_point;
                absorb_value = shield_point;
                target.current_shield_point = 0;
            } else {
                target.current_shield_point -= damage;
                absorb_value = damage;
                damage = 0;
            }
        }
        // 数值取整
        damage = Math.round(damage);
        block_value = Math.round(block_value);
        absorb_value = Math.round(absorb_value);
        // 伤害日志
        log(attacker.name
            + " 的 " + skill_name
            + " 击中 " + target.name
            + " 造成 " + damage + " 点伤害"
            + (is_critical ? " (暴击)" : "")
            + (is_block ? " (" + block_value + "点被格挡)" : "")
            + (absorb_value > 0 ? " (" + absorb_value + "点被吸收)" : "")
        );
        return [damage, is_hit, is_critical, block_value, absorb_value];
    }

    /**
     * 计算常规治疗
     * @param attacker 攻击者obj
     * @param target 目标obj
     * @param skill_name 技能名称
     * @param heal_percent 技能治疗系数
     * @param extra_critical 额外暴击率
     */
    function normal_skill_heal(attacker, target, skill_name, heal_percent, extra_critical) {
        /* 基础治疗 */
        let heal = attacker.magic_power * heal_percent / 100;// 基础治疗
        if (heal < 0) {
            heal = 0;
        }
        // 治疗随机浮动(0.9~1.1)
        heal *= (0.9 + Math.random() * 0.2);
        // 计算暴击
        extra_critical = extra_critical == null ? 0 : extra_critical;
        let is_critical = Math.random() < calculate_critical(attacker, target) + extra_critical / 100;
        if (is_critical) {
            // 计算暴击加成
            heal *= attacker.critical_damage / 100;
        }
        // 计算全局治疗百分比
        heal = heal * attacker.taken_heal_percent / 100;
        // 数值取整
        heal = Math.round(heal);
        // 伤害日志
        log(attacker.name
            + " 通过 " + skill_name
            + " 回复 " + heal + " 点生命"
            + (is_critical ? " (暴击)" : "")
        );
        return [heal, is_critical];
    }

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
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, m_element.physical);
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
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, m_element.holy);
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
        skill.detail = "攻击目标造成" + skill.X + "攻击强度的物理伤害，并使其受到的治疗降低" + m_debuff.warrior_1_X + "%，持续" + m_debuff.warrior_1_T + "回合";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let extra_hit = 0;
            if (m_skill_states[attacker.flag] === m_skill.warrior_1_2().id) {
                // 已在压制流程中判定为命中
                extra_hit = 999;
                m_skill_states[attacker.flag] = null;
            }
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, m_element.physical, extra_hit);
            if (damage[1]) {
                target.debuffs.push(setup_debuff().warrior_1);
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
        skill.Y = 50;
        skill.detail = "若攻击被躲闪，则压制目标造成" + skill.X + "攻击强度的物理伤害，该次攻击无法躲闪且暴击率提高" + skill.Y + "%";
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
            log(target.name + " 躲闪了 " + attacker.name + " 的攻击");
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, m_element.physical, 999, skill.Y);
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
        skill.detail = "攻击目标造成" + skill.X + "攻击强度的物理伤害，并回复造成伤害" + skill.Y + "%的生命";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, m_element.physical);
            if (damage[1]) {
                let heal = Math.round(damage * 10 * attacker.taken_heal_percent / 100 / 100);
                if (heal > 0) {
                    log(attacker.name + " 通过 " + skill.name + " 回复 " + heal + " 点生命");
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
        skill.detail = "目标生命值低于" + skill.X + "%时才可使用，攻击目标造成" + skill.Y + "%攻击强度的物理伤害，该次攻击的暴击率提高" + skill.Z + "%";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            return target.current_health_point * 100 / target.health_point <= skill.X;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.Y, type_attack, m_element.physical, 0, skill.Z);
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
        skill.detail = "攻击目标造成" + skill.X + "%攻击强度的物理伤害，并使其物理抗性-" + m_debuff.warrior_3_X + "，持续" + m_debuff.warrior_3_T + "回合";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, m_element.physical);
            if (damage[1]) {
                target.debuffs.push(setup_debuff().warrior_3);
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
        skill.Y = 50;
        skill.detail = "用盾牌重击目标造成" + skill.X + "%攻击强度的物理伤害，并获得造成伤害" + skill.Y + "%的伤害吸收护盾";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(attacker.flag, skill.id);
            return !(skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown);
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(attacker.flag, skill.id, battle_turn));
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_attack, m_element.physical);
            if (damage[0] > 0) {
                let shield_point = Math.round(damage * skill.Y * attacker.taken_heal_percent / 100 / 100);
                if (shield_point > 0) {
                    attacker.current_shield_point += shield_point;
                    log(attacker.name + " 获得了 " + shield_point + "点伤害吸收护盾");
                }
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
        skill.detail = "召唤圣光震击目标造成" + skill.X + "法术强度的神圣伤害，并回复" + skill.Y + "%治疗强度的的生命";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, m_element.holy);
            let heal = normal_skill_heal(attacker, target, skill.name, skill.Y);
            if (heal > 0) {
                attacker.current_health_point += heal;
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
        skill.X = 20;
        skill.Y = 300;
        skill.detail = "生命值低于" + skill.X + "%时回复" + skill.Y + "%治疗强度的生命，每场战斗限一次";
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
            if (heal > 0) {
                attacker.current_health_point += heal;
                if (attacker.current_health_point > attacker.health_point) {
                    attacker.current_health_point = attacker.health_point;
                }
            }
            return 0;
        };
        return skill;
    }

    // 清算：造成X%攻击强度+Y%损失生命值的物理伤害
    skill.paladin_2_1 = function () {
    }

    // 圣盾术：生命值低于X%时免疫伤害Y回合，每场战斗限一次
    skill.paladin_2_2 = function () {
    }

    // 命令圣印：造成X%攻击强度的物理伤害,其中Y%的几率造成神圣伤害
    skill.paladin_3_1 = function () {
    }

    // 愤怒之锤：敌方生命值低于X%时才可使用，造成Y%攻击强度的神圣伤害，每场战斗限一次
    skill.paladin_3_2 = function () {
    }

    skill.mage_2_1 = function () {
        let skill = {};
        skill.id = 921;// Id
        skill.name = "火球术";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        skill.X = 100;
        skill.Y = 20;
        skill.detail = "召唤火球燃烧目标造成" + skill.X + "法术强度的火焰伤害，该次攻击的暴击率提高" + skill.Y + "%，暴击时在目标身上留下一层余烬";
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, skill.X, type_cast, m_element.fire, 0, skill.Y);
            if (damage[2]) {
                if (m_skill_states[attacker.flag] == null) {
                    m_skill_states[attacker.flag] = 1;
                } else {
                    m_skill_states[attacker.flag]++;
                }
                log("余烬层数：" + m_skill_states[attacker.flag]);
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
        skill.Y = 50;
        skill.detail = "引爆所有余烬造成" + skill.X + "法术强度的火焰伤害，每层余烬会使总伤害提高" + skill.Y + "%";
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            log(battle_turn)
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
            let damage = normal_skill_attack(attacker, target, skill.name + "(" + damage_count + ")", skill.X + skill.Y * damage_count, type_cast, m_element.fire);
            if (damage[1]) {
                m_skill_states[attacker.flag] = null;
            }
            return damage[0];
        };
        return skill;
    }

    return skill;
}

let m_skill = setup_skill();
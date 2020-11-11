// 职业技能
function setup_skill() {
    let skill = {};

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
     */
    function normal_skill_attack(attacker, target, skill_name, damage_percent,
                                 attack_type, element_type, extra_hit, extra_critical) {
        // 计算命中
        extra_hit = extra_hit == null ? 0 : extra_hit;
        let is_hit = Math.random() < calculate_hit(attacker, target) + extra_hit / 100;
        if (!is_hit) {
            log(attacker.name + " 的 " + skill_name + " 未击中 " + target.name);
            return 0;
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
        if (attack_type === 1) {
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
        let block_point = target.block_value;
        if (is_block) {
            damage = damage - block_point;
            if (damage < 0) {
                block_point += damage;
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
        block_point = Math.round(block_point);
        absorb_value = Math.round(absorb_value);
        // 伤害日志
        log(attacker.name
            + " 的 " + skill_name
            + " 击中 " + target.name
            + " 造成 " + damage + " 点伤害"
            + (is_critical ? " (暴击)" : "")
            + (is_block ? " (" + block_point + "点被格挡)" : "")
            + (absorb_value > 0 ? " (" + absorb_value + "点被吸收)" : ""))
        return damage;
    }

    // 物理攻击
    skill.physical_attack = function () {
        let skill = {};
        skill.id = 1;// Id
        skill.name = "攻击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        // 技能施放调用
        skill.cast = function (attacker, target) {
            return normal_skill_attack(attacker, target, skill.name, 100, 1, m_element.physical);
        };
        return skill;
    };

    // 圣光法术
    skill.holy_cast = function () {
        let skill = {};
        skill.id = 2;// Id
        skill.name = "惩击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 10;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        // 技能施放调用
        skill.cast = function (attacker, target) {
            return normal_skill_attack(attacker, target, skill.name, 100, 2, m_element.holy);
        };
        return skill;
    };

    // 致死打击：造成X%攻击强度的物理伤害
    skill.warrior_1_1 = function () {
        let skill = {};
        skill.id = 111;// Id
        skill.name = "致死打击";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let extra_hit = 0;
            if (m_skill_states["last_skill"] === m_skill.warrior_1_2().id) {
                // 已在压制流程中判定为命中
                extra_hit = 200;
                m_skill_states["last_skill"] = null;
            }
            let damage = normal_skill_attack(attacker, target, skill.name, 100, 1, m_element.physical, extra_hit);
            return damage;
        };
        return skill;
    }

    // 压制：若敌人触发闪避，则忽视闪避并造成X%攻击强度的物理伤害
    skill.warrior_1_2 = function () {
        let skill = {};
        skill.id = 112;// Id
        skill.name = "压制";// 名称
        skill.cooldown = 3;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(skill.id);
            if (skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown) {
                // 冷却中
                return false;
            } else {
                let is_hit = Math.random() < calculate_hit(attacker, target);
                if (is_hit) {
                    m_skill_states["last_skill"] = skill.id;
                    return false;
                } else {
                    return true;
                }
            }
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            // 初始化
            regist_skill_state(skill_state(skill.id, battle_turn));
            log(target.name + " 躲闪了 " + attacker.name + " 的攻击");
            let damage = normal_skill_attack(attacker, target, skill.name, 100, 1, m_element.physical, 200, 50);
            return damage;
        };
        return skill;
    }

    // 嗜血：造成X%攻击强度的物理伤害，并回复造成伤害Y%的生命
    skill.warrior_2_1 = function () {
        let skill = {};
        skill.id = 121;// Id
        skill.name = "嗜血";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 30;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, 100, 1, m_element.physical);
            if (damage > 0) {
                let heal = Math.round(damage * 10 / 100);
                log(attacker.name
                    + " 通过 " + skill.name
                    + " 回复 " + heal + " 点生命");
                attacker.current_health_point += heal;
                if (attacker.current_health_point > attacker.health_point) {
                    attacker.current_health_point = attacker.health_point;
                }
            }
            return damage;
        };
        return skill;
    }

    // 斩杀：敌方生命值低于X%时才可使用，造成Y%攻击强度的物理伤害
    skill.warrior_2_2 = function () {
        let skill = {};
        skill.id = 122;// Id
        skill.name = "斩杀";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            return target.current_health_point * 100 / target.health_point <= 30;
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, 200, 1, m_element.physical, 0, 50);
            return damage;
        };
        return skill;
    }

    // 破甲：造成X%攻击强度的物理伤害，并使敌方物理抗性-Y，最多叠加Z次
    skill.warrior_3_1 = function () {
        let skill = {};
        skill.id = 131;// Id
        skill.name = "破甲";// 名称
        skill.cooldown = 1;// 冷却
        skill.priority = 20;// 优先级
        // 技能施放调用
        skill.cast = function (attacker, target) {
            let damage = normal_skill_attack(attacker, target, skill.name, 100, 1, m_element.physical);
            if (damage > 0) {
                target.debuffs.push(setup_debuff().warrior_3);
            }
            return damage;
        };
        return skill;
    }

    // 盾牌猛击：每隔X回合使用，造成Y%攻击强度的物理伤害，并获得造成伤害Z%的伤害吸收护盾
    skill.warrior_3_2 = function () {
        let skill = {};
        skill.id = 132;// Id
        skill.name = "盾牌猛击";// 名称
        skill.cooldown = 5;// 冷却
        skill.priority = 50;// 优先级，10极低 20低 30普通 40高 50极高 99强制
        // 判断技能可用
        skill.attempt = function (attacker, target) {
            let skill_state = get_skill_state(skill.id);
            if (skill_state != null && battle_turn - skill_state.last_turn < skill.cooldown) {
                // 冷却中
                return false;
            } else {
                return true;
            }
        }
        // 技能施放调用
        skill.cast = function (attacker, target) {
            regist_skill_state(skill_state(skill.id, battle_turn));
            let damage = normal_skill_attack(attacker, target, skill.name, 100, 1, m_element.physical);
            let shield_point = Math.round(damage * 50 / 100);
            attacker.current_shield_point += shield_point;
            log(attacker.name + " 获得了 " + shield_point + "点伤害吸收护盾");
            return damage;
        };
        return skill;
    }

    return skill;
}

let m_skill = setup_skill();
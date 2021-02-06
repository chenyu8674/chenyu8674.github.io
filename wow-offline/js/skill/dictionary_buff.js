/** BUFF一览 **/
let dictionary_buff;
$(document).ready(function () {
    dictionary_buff = new_buff();
});

function new_buff() {
    let buff = {};

    // 武器
    buff.warrior_1 = function () {
        let buff = {};
        buff.name = "战斗姿态";
        buff.T = -1;
        buff.X = 5;
        buff.Y = 5;
        buff.Z = 5;
        buff.icon = "ability_warrior_offensivestance";
        buff.detail = "命中率+" + buff.X + "%，物理伤害+" + buff.Y + "%，物理穿透+" + buff.Z + "%";
        buff.effect = [
            "hit_chance_final+=" + buff.X,
            "damage_physical+=" + buff.Y,
            "pierce_physical+=" + buff.Z
        ];
        return buff;
    }
    buff[11] = buff.warrior_1();

    // 狂暴
    buff.warrior_2 = function () {
        let buff = {};
        buff.name = "狂暴姿态";
        buff.T = -1;
        buff.X = 5;
        buff.Y = 50;
        buff.Z = 5;
        buff.icon = "ability_racial_avatar";
        buff.detail = "暴击率+" + buff.X + "%，暴击伤害+" + buff.Y + "%，承受伤害+" + buff.Z + "%";
        buff.effect = [
            "critical_chance_final+=" + buff.X,
            "critical_damage+=" + buff.Y,
            "taken_damage_percent+=" + buff.Z
        ];
        return buff;
    }
    buff[12] = buff.warrior_2();

    // 防御
    buff.warrior_3 = function () {
        let buff = {};
        buff.name = "防御姿态";
        buff.T = -1;
        buff.X = 5;
        buff.Y = 10;
        buff.Z = -5;
        buff.icon = "ability_warrior_defensivestance";
        buff.detail = "格挡率+" + buff.X + "%，格挡值+" + buff.Y + "%，承受伤害" + buff.Z + "%";
        buff.effect = [
            "block_chance_final+=" + buff.X,
            "block_value_percent+=" + buff.Y,
            "taken_damage_percent+=" + buff.Z
        ];
        return buff;
    }
    buff[13] = buff.warrior_3();

    // 神圣
    buff.paladin_1 = function () {
        let buff = {};
        buff.name = "智慧祝福";
        buff.T = -1;
        buff.X = 20;
        buff.Y = 5;
        buff.icon = "spell_holy_sealofwisdom";
        buff.detail = "智力+" + buff.X + "%，暴击率+" + buff.Y + "%";
        buff.effect = [
            "int_percent+=" + buff.X,
            "critical_chance_final+=" + buff.Y
        ];
        return buff;
    }
    buff[21] = buff.paladin_1();

    // 防护
    buff.paladin_2 = function () {
        let buff = {};
        buff.name = "王者祝福";
        buff.T = -1;
        buff.X = 10;
        buff.Y = 5;
        buff.icon = "spell_magic_magearmor";
        buff.detail = "所有属性+" + buff.X + "%，格挡率+" + buff.Y + "%";
        buff.effect = [
            "str_percent+=" + buff.X,
            "agi_percent+=" + buff.X,
            "sta_percent+=" + buff.X,
            "int_percent+=" + buff.X,
            "spr_percent+=" + buff.X,
            "block_chance_final+=" + buff.Y
        ];
        return buff;
    }
    buff[22] = buff.paladin_2();

    buff.paladin_2_2 = function () {
        let buff = {};
        buff.name = "圣盾术";
        buff.T = 2;
        buff.X = 999;
        buff.icon = "Spell_Holy_DivineIntervention";
        buff.detail = "免疫伤害，持续" + buff.T + "回合";
        buff.effect = [
            "taken_damage_percent-=" + buff.X
        ];
        return buff;
    }

    // 惩戒
    buff.paladin_3 = function () {
        let buff = {};
        buff.name = "力量祝福";
        buff.T = -1;
        buff.X = 20;
        buff.Y = 5;
        buff.icon = "spell_holy_fistofjustice";
        buff.detail = "力量+" + buff.X + "%，命中率+" + buff.Y + "%";
        buff.effect = [
            "str_percent+=" + buff.X,
            "hit_chance_final+=" + buff.Y
        ];
        return buff;
    }
    buff[23] = buff.paladin_3();

    // 兽王
    buff.hunter_1 = function () {
        let buff = {};
        buff.name = "野性守护";
        buff.T = -1;
        buff.X = 1;
        buff.icon = "spell_nature_protectionformnature";
        buff.detail = "猎人技能命中目标时，回复" + buff.X + "%最大生命值";
        buff.effect = [];
        return buff;
    }
    buff[31] = buff.hunter_1();

    // 射击
    buff.hunter_2 = function () {
        let buff = {};
        buff.name = "雄鹰守护";
        buff.T = -1;
        buff.X = 15;
        buff.icon = "spell_nature_ravenform";
        buff.detail = "攻击强度+" + buff.X + "%";
        buff.effect = [
            "attack_power_percent+=" + buff.X
        ];
        return buff;
    }
    buff[32] = buff.hunter_2();

    // 生存
    buff.hunter_3 = function () {
        let buff = {};
        buff.name = "灵猴守护";
        buff.T = -1;
        buff.X = 15;
        buff.icon = "ability_hunter_aspectofthemonkey";
        buff.detail = "闪避等级+" + buff.X + "%，可以双持和使用部分双手武器";
        buff.effect = [
            "dodge_rate_percent+=" + buff.X
        ];
        return buff;
    }
    buff[33] = buff.hunter_3();

    // 元素
    buff.shaman_1 = function () {
        let buff = {};
        buff.name = "灼热图腾";
        buff.T = -1;
        buff.X = 20;
        buff.icon = "spell_fire_searingtotem";
        buff.detail = "回合开始时，造成" + buff.X + "%法术强度的火焰伤害";
        buff.effect = [];
        return buff;
    }
    buff[41] = buff.shaman_1();

    // 增强
    buff.shaman_2 = function () {
        let buff = {};
        buff.name = "风怒图腾";
        buff.T = -1;
        buff.X = 20;
        buff.icon = "spell_nature_windfury";
        buff.detail = "攻击命中时，" + buff.X + "%几率进行一次额外攻击，可以双持和使用部分双手武器";
        buff.effect = [];
        return buff;
    }
    buff[42] = buff.shaman_2();

    // 恢复
    buff.shaman_3 = function () {
        let buff = {};
        buff.name = "治疗之泉图腾";
        buff.T = -1;
        buff.X = 20;
        buff.icon = "inv_spear_04";
        buff.detail = "回合开始时，回复" + buff.X + "%治疗强度的生命";
        buff.effect = [];
        return buff;
    }
    buff[43] = buff.shaman_3();

    buff.shaman_3_2 = function (X) {
        let buff = {};
        buff.name = "先祖治疗";
        buff.T = 5;
        buff.X = X;
        buff.icon = "spell_nature_magicimmunity";
        buff.detail = "所有护甲+" + buff.X + "%";
        buff.effect = [
            "armor_all_percent+=" + buff.X
        ];
        return buff;
    }
    // 平衡
    buff.druid_1 = function () {
        let buff = {};
        buff.name = "枭兽形态";
        buff.T = -1;
        buff.X = 100;
        buff.Y = 25;
        buff.icon = "spell_nature_forceofnature";
        buff.detail = "所有护甲+" + buff.X + "%，智力+" + buff.Y + "%";
        buff.effect = [
            "armor_all_percent+=" + buff.X,
            "int_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[51] = buff.druid_1();

    // 野性
    buff.druid_2 = function () {
        let buff = {};
        buff.name = "猎豹形态";
        buff.T = -1;
        buff.X = 40;
        buff.Y = 25;
        buff.icon = "ability_druid_catform";
        buff.detail = "移动速度+" + buff.X + "%，敏捷+" + buff.Y + "%";
        buff.effect = [
            "move_speed+=" + buff.X,
            "agi_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[52] = buff.druid_2();

    // 守护
    buff.druid_3 = function () {
        let buff = {};
        buff.name = "巨熊形态";
        buff.T = -1;
        buff.X = 200;
        buff.Y = 25;
        buff.icon = "ability_racial_bearform";
        buff.detail = "所有护甲+" + buff.X + "%，耐力+" + buff.Y + "%";
        buff.effect = [
            "armor_all_percent+=" + buff.X,
            "sta_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[53] = buff.druid_3();

    // 恢复
    buff.druid_4 = function () {
        let buff = {};
        buff.name = "生命之树形态";
        buff.T = -1;
        buff.X = 50;
        buff.Y = 25;
        buff.icon = "ability_druid_treeoflife";
        buff.detail = "所有护甲+" + buff.X + "%，精神+" + buff.Y + "%";
        buff.effect = [
            "armor_all_percent+=" + buff.X,
            "spr_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[54] = buff.druid_4();

    // 刺杀
    buff.rogue_1 = function () {
        let buff = {};
        buff.name = "冷血";
        buff.T = 1;
        buff.X = 50;
        buff.icon = "spell_ice_lament";
        buff.detail = "进入战斗或施放终结技后，暴击率提高" + buff.X + "%，持续" + buff.T + "回合";
        buff.effect = [
            "critical_chance_final+=" + buff.X
        ];
        return buff;
    }
    buff[61] = buff.rogue_1();

    // 战斗
    buff.rogue_2 = function () {
        let buff = {};
        buff.name = "冲动";
        buff.T = 1;
        buff.X = 50;
        buff.icon = "spell_shadow_shadowworddominate";
        buff.detail = "进入战斗或施放终结技后，攻击强度提高" + buff.X + "%，持续" + buff.T + "回合";
        buff.effect = [
            "attack_power_percent+=" + buff.X
        ];
        return buff;
    }
    buff[62] = buff.rogue_2();

    // 敏锐
    buff.rogue_3 = function () {
        let buff = {};
        buff.name = "消失";
        buff.T = 1;
        buff.X = 50;
        buff.icon = "ability_vanish";
        buff.detail = "进入战斗或施放终结技后，闪避率提高" + buff.X + "%，持续" + buff.T + "回合";
        buff.effect = [
            "dodge_chance_final+=" + buff.X
        ];
        return buff;
    }
    buff[63] = buff.rogue_3();

    // 奥法
    buff.mage_1 = function () {
        let buff = {};
        buff.name = "魔甲术";
        buff.T = -1;
        buff.X = 20;
        buff.Y = 10;
        buff.icon = "spell_magearmor";
        buff.detail = "所有抗性+" + buff.X + "%，最大生命+" + buff.Y + "%";
        buff.effect = [
            "res_all+=" + buff.X,
            "health_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[91] = buff.mage_1();

    // 火法
    buff.mage_2 = function () {
        let buff = {};
        buff.name = "火甲术";
        buff.T = -1;
        buff.X = 20;
        buff.Y = 10;
        buff.icon = "ability_mage_moltenarmor";
        buff.detail = "闪避率+" + buff.X + "%，暴击率+" + buff.Y + "%";
        buff.effect = [
            "dodge_chance_final+=" + buff.X,
            "critical_chance_final+=" + buff.Y
        ];
        return buff;
    }
    buff[92] = buff.mage_2();

    buff.mage_2_2 = function (X) {
        let buff = {};
        buff.name = "火焰精通";
        buff.T = Number.MAX_VALUE;
        buff.X = X;
        buff.icon = "spell_fire_incinerate";
        buff.detail = "暴击率+" + buff.X + "%";
        buff.effect = [
            "critical_chance_final+=" + buff.X
        ];
        return buff;
    }

    // 冰法
    buff.mage_3 = function () {
        let buff = {};
        buff.name = "冰甲术";
        buff.T = -1;
        buff.X = 100;
        buff.Y = 10;
        buff.icon = "spell_frost_frostarmor02";
        buff.detail = "所有护甲+" + buff.X + "%，精通等级+" + buff.Y + "%";
        buff.effect = [
            "armor_all_percent+=" + buff.X,
            "mastery_rate_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[93] = buff.mage_3();

    buff.rage = function () {
        let buff = {};
        buff.name = "首领狂暴";
        buff.T = -1;
        buff.X = 5;
        buff.icon = "ability_racial_bloodrage";
        buff.detail = "伤害每回合提升" + buff.X + "%";
        buff.effect = [
            "damage_all+=battle_turn*" + buff.X
        ];
        return buff;
    }

    buff.attack_power_percent_increase = function (X, T, icon = "ability_warrior_battleshout") {
        let debuff = {};
        debuff.name = "强攻";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = icon;
        debuff.detail = "攻击强度+" + X + "%";
        debuff.effect = [
            "attack_power_percent+=" + X
        ];
        return debuff;
    }

    buff.dodge_chance_final_increase = function (X, T, icon = "ability_warrior_battleshout") {
        let debuff = {};
        debuff.name = "闪避";
        debuff.T = T;
        debuff.X = X;
        debuff.icon = icon;
        debuff.detail = "闪避率+" + X + "%";
        debuff.effect = [
            "dodge_chance_final+=" + X
        ];
        return debuff;
    }

    return buff;
}
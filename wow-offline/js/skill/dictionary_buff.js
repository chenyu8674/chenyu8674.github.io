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
        buff.id = 11;// Id
        buff.name = "战斗姿态";// 名称
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
        buff.id = 12;// Id
        buff.name = "狂暴姿态";// 名称
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
        buff.id = 13;// Id
        buff.name = "防御姿态";// 名称
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
        buff.id = 21;// Id
        buff.name = "智慧祝福";// 名称
        buff.T = -1;
        buff.X = 20;
        buff.Y = 5;
        buff.icon = "spell_holy_sealofwisdom";
        buff.detail = "智力+" + buff.X + "%";
        buff.effect = [
            "int_percent+=" + buff.X
        ];
        return buff;
    }
    buff[21] = buff.paladin_1();

    // 防护
    buff.paladin_2 = function () {
        let buff = {};
        buff.id = 22;// Id
        buff.name = "王者祝福";// 名称
        buff.T = -1;
        buff.X = 10;
        buff.Y = 5;
        buff.icon = "spell_magic_magearmor";
        buff.detail = "所有属性+" + buff.X + "%，格挡率+" + buff.X + "%";
        buff.effect = [
            "str_percent+=" + buff.X,
            "agi_percent+=" + buff.X,
            "sta_percent+=" + buff.X,
            "int_percent+=" + buff.X,
            "spr_percent+=" + buff.X,
            "block_chance_final+=" + buff.X
        ];
        return buff;
    }
    buff[22] = buff.paladin_2();

    buff.paladin_2_2 = function () {
        let buff = {};
        buff.id = 222;// Id
        buff.name = "圣盾术";// 名称
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
        buff.id = 23;// Id
        buff.name = "力量祝福";// 名称
        buff.T = -1;
        buff.X = 20;
        buff.Y = 5;
        buff.icon = "spell_holy_fistofjustice";
        buff.detail = "力量+" + buff.X + "%";
        buff.effect = [
            "str_percent+=" + buff.X
        ];
        return buff;
    }
    buff[23] = buff.paladin_3();

    // 兽王
    buff.hunter_1 = function () {
        let buff = {};
        buff.id = 31;// Id
        buff.name = "野性守护";// 名称
        buff.T = -1;
        buff.X = 1;
        buff.icon = "spell_nature_protectionformnature";
        buff.detail = "每次命中目标时，回复" + buff.X + "%最大生命值";
        buff.effect = [
        ];
        return buff;
    }
    buff[31] = buff.hunter_1();

    // 射击
    buff.hunter_2 = function () {
        let buff = {};
        buff.id = 32;// Id
        buff.name = "雄鹰守护";// 名称
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
        buff.id = 32;// Id
        buff.name = "灵猴守护";// 名称
        buff.T = -1;
        buff.X = 15;
        buff.icon = "ability_hunter_aspectofthemonkey";
        buff.detail = "闪避等级+" + buff.X + "%";
        buff.effect = [
            "dodge_rate_percent+=" + buff.X
        ];
        return buff;
    }
    buff[33] = buff.hunter_3();

    // 平衡
    buff.druid_1 = function () {
        let buff = {};
        buff.id = 51;// Id
        buff.name = "枭兽形态";// 名称
        buff.T = -1;
        buff.X = 100;
        buff.Y = 25;
        buff.icon = "spell_nature_forceofnature";
        buff.detail = "护甲+" + buff.X + "%，智力+" + buff.Y + "%";
        buff.effect = [
            "armor_attack_percent+=" + buff.X,
            "armor_magic_percent+=" + buff.X,
            "int_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[51] = buff.druid_1();

    // 野性
    buff.druid_2 = function () {
        let buff = {};
        buff.id = 52;// Id
        buff.name = "猎豹形态";// 名称
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
        buff.id = 52;// Id
        buff.name = "巨熊形态";// 名称
        buff.T = -1;
        buff.X = 200;
        buff.Y = 25;
        buff.icon = "ability_racial_bearform";
        buff.detail = "护甲+" + buff.X + "%，耐力+" + buff.Y + "%";
        buff.effect = [
            "armor_attack_percent+=" + buff.X,
            "armor_magic_percent+=" + buff.X,
            "sta_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[53] = buff.druid_3();

    // 恢复
    buff.druid_4 = function () {
        let buff = {};
        buff.id = 52;// Id
        buff.name = "生命之树形态";// 名称
        buff.T = -1;
        buff.X = 100;
        buff.Y = 25;
        buff.icon = "ability_druid_treeoflife";
        buff.detail = "护甲+" + buff.X + "%，精神+" + buff.Y + "%";
        buff.effect = [
            "armor_attack_percent+=" + buff.X,
            "armor_magic_percent+=" + buff.X,
            "spr_percent+=" + buff.Y
        ];
        return buff;
    }
    buff[54] = buff.druid_4();

    // 狂暴
    buff.mage_2 = function () {
        let buff = {};
        buff.id = 12;// Id
        buff.name = "狂暴姿态";// 名称
        buff.T = -1;
        buff.X = 5;
        buff.Y = 50;
        buff.Z = 5;
        buff.icon = "ability_racial_avatar";
        buff.detail = "暴击率+" + buff.X + "%，暴击伤害+" + buff.Y + "%，受到伤害+" + buff.Z + "%";
        buff.effect = [
            "critical_chance_final+=" + buff.X,
            "critical_damage+=" + buff.Y,
            "taken_damage_percent+=" + buff.Z
        ];
        return buff;
    }
    buff[92] = buff.mage_2();

    buff.rage = function () {
        let buff = {};
        buff.id = 10001;// Id
        buff.name = "首领狂暴";// 名称
        buff.T = -1;
        buff.X = 5;
        buff.icon = "ability_racial_bloodrage";
        buff.detail = "伤害每回合提升" + buff.X + "%";
        buff.effect = [
            "attack_power_percent+=battle_turn*" + buff.X,
            "magic_power_percent+=battle_turn*" + buff.X,
        ];
        return buff;
    }

    return buff;
}
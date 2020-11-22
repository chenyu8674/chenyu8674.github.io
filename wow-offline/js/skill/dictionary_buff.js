/** BUFF一览 **/
let dictionary_buff;
$(document).ready(function () {
    dictionary_buff = new_buff();
});

function new_buff() {
    let buff = {};

    // 武器
    buff.warrior_1_T = -1;// 持续回合，-1为永久
    buff.warrior_1_X = 10;
    buff.warrior_1_Y = 5;
    buff.warrior_1_name = "战斗姿态";
    buff.warrior_1_detail = "物理穿透+" + buff.warrior_1_X + "，命中率+" + buff.warrior_1_Y + "%";
    buff.warrior_1 = [
        buff.warrior_1_T,
        "pierce_physical+=" + buff.warrior_1_X,
        "hit_chance_final+=" + buff.warrior_1_Y
    ];

    // 狂暴
    buff.warrior_2_T = -1;// 持续回合，-1为永久
    buff.warrior_2_X = 5;
    buff.warrior_2_Y = 50;
    buff.warrior_2_Z = 5;
    buff.warrior_2_name = "狂暴姿态";
    buff.warrior_2_detail = "暴击率+" + buff.warrior_2_X + "%，暴击伤害+" + buff.warrior_2_Y + "%，受到伤害+" + buff.warrior_2_Z + "%";
    buff.warrior_2 = [
        buff.warrior_2_T,
        "critical_chance_final+=" + buff.warrior_2_X,
        "critical_damage+=" + buff.warrior_2_Y,
        "taken_damage_percent+=" + buff.warrior_2_Z
    ];

    // 防御
    buff.warrior_3_T = -1;// 持续回合，-1为永久
    buff.warrior_3_X = 5;
    buff.warrior_3_Y = 10;
    buff.warrior_3_name = "防御姿态";
    buff.warrior_3_detail = "格挡率+" + buff.warrior_3_X + "%，格挡值+" + buff.warrior_3_Y + "%";
    buff.warrior_3 = [
        buff.warrior_3_T,
        "block_chance_final+=" + buff.warrior_3_X,
        "block_value_percent+=" + buff.warrior_3_Y
    ];

    // 神圣
    // 智慧祝福：智力+X%
    buff.paladin_1_T = -1;// 持续回合，-1为永久
    buff.paladin_1_X = 20;
    buff.paladin_1_name = "智慧祝福";
    buff.paladin_1_detail = "智力+" + buff.paladin_1_X + "%";
    buff.paladin_1 = [
        buff.paladin_1_T,
        "int_percent+=" + buff.paladin_1_X
    ];

    // 防护
    // 王者祝福：所有属性+X%
    buff.paladin_2_T = -1;// 持续回合，-1为永久
    buff.paladin_2_X = 10;
    buff.paladin_2_name = "王者祝福";
    buff.paladin_2_detail = "所有属性+" + buff.paladin_2_X + "%";
    buff.paladin_2 = [
        buff.paladin_2_T,
        "str_percent+=" + buff.paladin_2_X,
        "agi_percent+=" + buff.paladin_2_X,
        "sta_percent+=" + buff.paladin_2_X,
        "int_percent+=" + buff.paladin_2_X,
        "spr_percent+=" + buff.paladin_2_X
    ];

    // 圣盾术：免疫伤害，持续Y回合X
    buff.paladin_2_2_T = 2;// 持续回合，-1为永久
    buff.paladin_2_2_X = 999;
    buff.paladin_2_2 = [
        buff.paladin_2_2_T,
        "taken_damage_percent-=" + buff.paladin_2_2_X
    ];

    // 惩戒
    // 力量祝福：力量+X%
    buff.paladin_3_T = -1;// 持续回合，-1为永久
    buff.paladin_3_X = 20;
    buff.paladin_3_name = "力量祝福";
    buff.paladin_3_detail = "力量+" + buff.paladin_3_X + "%";
    buff.paladin_3 = [
        buff.paladin_3_T,
        "str_percent+=" + buff.paladin_3_X
    ];

    // 兽王
    // 自然守护：每次命中目标时，回复X%的最大生命值
    buff.hunter_1_T = -1;// 持续回合，-1为永久
    buff.hunter_1_X = 2;
    buff.hunter_1_name = "自然守护";
    buff.hunter_1_detail = "每次命中目标时，回复" + buff.hunter_1_X + "%最大生命值";
    buff.hunter_1 = [
        buff.hunter_1_T,
        "health_percent+=0"
    ];

    // 射击
    // 雄鹰守护：攻击强度百分比+X%
    buff.hunter_2_T = -1;// 持续回合，-1为永久
    buff.hunter_2_X = 15;
    buff.hunter_2_name = "雄鹰守护";
    buff.hunter_2_detail = "攻击强度百分比+" + buff.hunter_2_X + "%";
    buff.hunter_2 = [
        buff.hunter_2_T,
        "attack_power_percent+=" + buff.hunter_2_X
    ];

    // 生存
    // 灵猴守护：闪避等级百分比+X%
    buff.hunter_3_T = -1;// 持续回合，-1为永久
    buff.hunter_3_X = 15;
    buff.hunter_3_name = "灵猴守护";
    buff.hunter_3_detail = "闪避等级百分比+" + buff.hunter_3_X + "%";
    buff.hunter_3 = [
        buff.hunter_3_T,
        "dodge_rate_percent+=" + buff.hunter_3_X
    ];

    // 猛禽一击：躲闪率提高X%，持续Y回合
    buff.hunter_3_3_T = 5;// 持续回合，-1为永久
    buff.hunter_3_3_X = 3;
    buff.hunter_3_3 = [
        buff.hunter_3_3_T,
        "dodge_chance_final+=" + buff.hunter_3_3_X
    ];

    return buff;
}
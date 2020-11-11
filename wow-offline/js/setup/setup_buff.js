// 增益
function setup_buff() {
    let buff = {};

    // 武器
    // 战斗姿态：物理穿透百分比+X，最终命中率百分比+Y
    buff.warrior_1_T = -1;// 持续回合，-1为永久
    buff.warrior_1_X = 10;
    buff.warrior_1_Y = 5;
    buff.warrior_1 = [
        buff.warrior_1_T,
        "pierce_physical += " + buff.warrior_1_X,
        "hit_chance_final += " + buff.warrior_1_Y
    ];

    // 狂暴
    // 狂暴姿态：最终暴击率百分比+X，暴击伤害系数+Y，全局受伤百分比+Z
    buff.warrior_2_T = -1;// 持续回合，-1为永久
    buff.warrior_2_X = 5;
    buff.warrior_2_Y = 50;
    buff.warrior_2_Z = 5;
    buff.warrior_2 = [
        buff.warrior_2_T,
        "critical_chance_final += " + buff.warrior_2_X,
        "critical_damage += " + buff.warrior_2_Y,
        "taken_damage_percent += " + buff.warrior_2_Z
    ];

    // 防御
    // 防御姿态：最终格挡率百分比+X，格挡值百分比+Y
    buff.warrior_3_T = -1;// 持续回合，-1为永久
    buff.warrior_3_X = 5;
    buff.warrior_3_Y = 10;
    buff.warrior_3 = [
        buff.warrior_3_T,
        "block_chance_final += " + buff.warrior_3_X,
        "block_value_percent += " + buff.warrior_3_Y
    ];

    // 神圣
    // 智慧祝福：智力+X%
    buff.paladin_1_T = -1;// 持续回合，-1为永久
    buff.paladin_1_X = 15;
    buff.paladin_1 = [
        buff.paladin_1_T,
        "int_percent += " + buff.paladin_1_X
    ];

    // 防护
    // 王者祝福：所有属性+X%
    buff.paladin_2_T = -1;// 持续回合，-1为永久
    buff.paladin_2_X = 5;
    buff.paladin_2 = [
        buff.paladin_2_T,
        "str_percent += " + buff.paladin_2_X,
        "agi_percent += " + buff.paladin_2_X,
        "sta_percent += " + buff.paladin_2_X,
        "int_percent += " + buff.paladin_2_X,
        "spr_percent += " + buff.paladin_2_X
    ];

    // 惩戒
    // 力量祝福：力量+X%
    buff.paladin_3_T = -1;// 持续回合，-1为永久
    buff.paladin_3_X = 15;
    buff.paladin_3 = [
        buff.paladin_3_T,
        "str_percent += " + buff.paladin_3_X
    ];

    return buff;
}

let m_buff = setup_buff();